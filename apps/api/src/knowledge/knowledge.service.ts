import { createHash } from 'node:crypto';

import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DanhMucTriThuc, QuyTacTriThuc, taoDanhMucTriThuc } from './knowledge-catalog';
import { KNOWLEDGE_SCHEMA_SQL } from './knowledge-schema';

export interface BoLocQuyTacTriThuc {
  activity?: string;
  layer?: 'Q10' | 'Q11';
  effect?: string;
  target?: string;
  book?: number;
  page?: number;
  q?: string;
  limit?: number;
  offset?: number;
}

export interface NguonTriThucApi {
  sourceType: string;
  volume?: number;
  book: number;
  page?: number;
  section?: string;
  originalName?: string;
  note?: string;
  verified: boolean;
}

export interface QuyTacTriThucApi {
  activity: string;
  activityNameVi: string;
  activityNameHan: string;
  layer: string;
  kind: string;
  code: string;
  effect?: string;
  operation?: string;
  target?: unknown;
  condition?: unknown;
  precedence?: number;
  description?: string;
  sources: readonly NguonTriThucApi[];
}

export interface KetQuaTimQuyTacTriThuc {
  total: number;
  limit: number;
  offset: number;
  items: readonly QuyTacTriThucApi[];
}

interface DongQuyTacDb {
  activity_code: string;
  name_vi: string;
  name_han: string;
  layer: string;
  kind: string;
  code: string;
  effect: string | null;
  operation: string | null;
  target: unknown | null;
  condition: unknown | null;
  precedence: number | null;
  description: string | null;
  sources: NguonTriThucApi[];
}

@Injectable()
export class KhoTriThucPostgresService implements OnModuleInit, OnModuleDestroy {
  private pool?: Pool;

  async onModuleInit(): Promise<void> {
    const databaseUrl = process.env.DATABASE_URL?.trim();
    if (!databaseUrl) return;

    this.pool = new Pool({ connectionString: databaseUrl });
    await this.dongBoTuCode();
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }

  daCauHinh(): boolean {
    return this.pool !== undefined;
  }

  async dongBoTuCode(): Promise<void> {
    const pool = this.layPool();
    const client = await pool.connect();

    try {
      await client.query(KNOWLEDGE_SCHEMA_SQL);
      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock($1)', [2026112794]);

      const catalog = taoDanhMucTriThuc();
      await this.xoaMirrorCu(client);
      await this.chenDanhMuc(client, catalog);

      await client.query(
        `INSERT INTO knowledge_meta(key, value)
         VALUES ('catalog_sync', $1::jsonb)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
        [
          JSON.stringify({
            syncedAt: new Date().toISOString(),
            activities: catalog.hoatDong.length,
            rules: catalog.quyTac.length,
          }),
        ],
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async timQuyTac(boLoc: BoLocQuyTacTriThuc): Promise<KetQuaTimQuyTacTriThuc> {
    const pool = this.layPool();
    const limit = gioiHan(boLoc.limit ?? 50, 1, 200);
    const offset = Math.max(0, boLoc.offset ?? 0);
    const { whereSql, params } = taoWhereSql(boLoc);

    const countResult = await pool.query<{ total: number }>(
      `SELECT count(*)::int AS total
       FROM knowledge_rule r
       JOIN knowledge_activity a ON a.code = r.activity_code
       WHERE ${whereSql}`,
      params,
    );

    const dataParams = [...params, limit, offset];
    const limitIndex = dataParams.length - 1;
    const offsetIndex = dataParams.length;

    const result = await pool.query<DongQuyTacDb>(
      `SELECT
         r.activity_code,
         a.name_vi,
         a.name_han,
         r.layer,
         r.kind,
         r.code,
         r.effect,
         r.operation,
         r.target,
         r.condition,
         r.precedence,
         r.description,
         COALESCE(
           jsonb_agg(
             jsonb_build_object(
               'sourceType', s.source_type,
               'volume', s.volume,
               'book', s.book,
               'page', s.page,
               'section', s.section,
               'originalName', s.original_name,
               'note', s.note,
               'verified', s.verified
             )
             ORDER BY rs.ordinal
           ) FILTER (WHERE s.source_key IS NOT NULL),
           '[]'::jsonb
         ) AS sources
       FROM knowledge_rule r
       JOIN knowledge_activity a ON a.code = r.activity_code
       LEFT JOIN knowledge_rule_source rs
         ON rs.activity_code = r.activity_code
        AND rs.layer = r.layer
        AND rs.rule_code = r.code
       LEFT JOIN knowledge_source s ON s.source_key = rs.source_key
       WHERE ${whereSql}
       GROUP BY
         r.activity_code, a.name_vi, a.name_han, r.layer, r.kind, r.code,
         r.effect, r.operation, r.target, r.condition, r.precedence, r.description
       ORDER BY r.activity_code, r.layer DESC, r.code
       LIMIT $${limitIndex} OFFSET $${offsetIndex}`,
      dataParams,
    );

    return {
      total: countResult.rows[0]?.total ?? 0,
      limit,
      offset,
      items: result.rows.map(doiDongQuyTac),
    };
  }

  async kiemTraKetNoi(): Promise<boolean> {
    if (!this.pool) return true;

    try {
      await this.pool.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  async thongKe(): Promise<{
    configured: true;
    activities: number;
    rules: number;
    sources: number;
    byLayer: Record<string, number>;
    byActivity: readonly { code: string; nameVi: string; rules: number }[];
    syncedAt?: string;
  }> {
    const pool = this.layPool();

    const [counts, layers, activities, meta] = await Promise.all([
      pool.query<{ activities: number; rules: number; sources: number }>(
        `SELECT
           (SELECT count(*)::int FROM knowledge_activity) AS activities,
           (SELECT count(*)::int FROM knowledge_rule) AS rules,
           (SELECT count(*)::int FROM knowledge_source) AS sources`,
      ),
      pool.query<{ layer: string; count: number }>(
        'SELECT layer, count(*)::int AS count FROM knowledge_rule GROUP BY layer ORDER BY layer',
      ),
      pool.query<{ code: string; name_vi: string; rules: number }>(
        `SELECT a.code, a.name_vi, count(r.code)::int AS rules
         FROM knowledge_activity a
         LEFT JOIN knowledge_rule r ON r.activity_code = a.code
         GROUP BY a.code, a.name_vi
         ORDER BY a.code`,
      ),
      pool.query<{ value: { syncedAt?: string } }>(
        "SELECT value FROM knowledge_meta WHERE key = 'catalog_sync'",
      ),
    ]);

    return {
      configured: true,
      activities: counts.rows[0]?.activities ?? 0,
      rules: counts.rows[0]?.rules ?? 0,
      sources: counts.rows[0]?.sources ?? 0,
      byLayer: Object.fromEntries(layers.rows.map((item) => [item.layer, item.count])),
      byActivity: activities.rows.map((item) => ({
        code: item.code,
        nameVi: item.name_vi,
        rules: item.rules,
      })),
      syncedAt: meta.rows[0]?.value.syncedAt,
    };
  }

  private layPool(): Pool {
    if (!this.pool) {
      throw new ServiceUnavailableException(
        'Postgres knowledge catalog chưa được cấu hình. Hãy đặt DATABASE_URL.',
      );
    }
    return this.pool;
  }

  private async xoaMirrorCu(client: PoolClient): Promise<void> {
    await client.query('DELETE FROM knowledge_rule_source');
    await client.query('DELETE FROM knowledge_rule');
    await client.query('DELETE FROM knowledge_source');
    await client.query('DELETE FROM knowledge_activity');
  }

  private async chenDanhMuc(client: PoolClient, catalog: DanhMucTriThuc): Promise<void> {
    for (const activity of catalog.hoatDong) {
      await client.query(
        `INSERT INTO knowledge_activity(code, name_vi, name_han)
         VALUES ($1, $2, $3)`,
        [activity.code, activity.tenViet, activity.tenHan],
      );
    }

    const daChenNguon = new Set<string>();

    for (const rule of catalog.quyTac) {
      await this.chenQuyTac(client, rule);

      for (const [ordinal, source] of rule.nguon.entries()) {
        const sourceKey = khoaNguon(source);

        if (!daChenNguon.has(sourceKey)) {
          await chenNguon(client, sourceKey, source);
          daChenNguon.add(sourceKey);
        }

        await client.query(
          `INSERT INTO knowledge_rule_source(
             activity_code, layer, rule_code, source_key, ordinal
           ) VALUES ($1, $2, $3, $4, $5)`,
          [rule.hoatDong, rule.lop, rule.ma, sourceKey, ordinal],
        );
      }
    }
  }

  private async chenQuyTac(client: PoolClient, rule: QuyTacTriThuc): Promise<void> {
    await client.query(
      `INSERT INTO knowledge_rule(
         activity_code, layer, kind, code, effect, operation,
         target, condition, precedence, description
       ) VALUES (
         $1, $2, $3, $4, $5, $6,
         $7::jsonb, $8::jsonb, $9, $10
       )`,
      [
        rule.hoatDong,
        rule.lop,
        rule.kieu,
        rule.ma,
        rule.tacDong ?? null,
        rule.phepXuLy ?? null,
        rule.mucTieu === undefined ? null : JSON.stringify(rule.mucTieu),
        rule.dieuKien === undefined ? null : JSON.stringify(rule.dieuKien),
        rule.precedence ?? null,
        rule.moTa ?? null,
      ],
    );
  }
}

function taoWhereSql(boLoc: BoLocQuyTacTriThuc): { whereSql: string; params: unknown[] } {
  const clauses: string[] = ['TRUE'];
  const params: unknown[] = [];

  const them = (sql: (index: number) => string, value: unknown): void => {
    params.push(value);
    clauses.push(sql(params.length));
  };

  if (boLoc.activity) them((i) => `r.activity_code = $${i}`, boLoc.activity);
  if (boLoc.layer) them((i) => `r.layer = $${i}`, boLoc.layer);
  if (boLoc.effect) them((i) => `r.effect = $${i}`, boLoc.effect);
  if (boLoc.target) {
    them(
      (i) =>
        `(
          r.target @> jsonb_build_object('ma', $${i}::text)
          OR r.target @> jsonb_build_object('truc', $${i}::text)
          OR r.target @> jsonb_build_object('chi', $${i}::text)
          OR r.target @> jsonb_build_object('loai', $${i}::text)
        )`,
      boLoc.target,
    );
  }

  if (boLoc.book !== undefined) {
    them(
      (i) =>
        `EXISTS (
          SELECT 1
          FROM knowledge_rule_source rsf
          JOIN knowledge_source sf ON sf.source_key = rsf.source_key
          WHERE rsf.activity_code = r.activity_code
            AND rsf.layer = r.layer
            AND rsf.rule_code = r.code
            AND sf.book = $${i}
        )`,
      boLoc.book,
    );
  }

  if (boLoc.page !== undefined) {
    them(
      (i) =>
        `EXISTS (
          SELECT 1
          FROM knowledge_rule_source rsf
          JOIN knowledge_source sf ON sf.source_key = rsf.source_key
          WHERE rsf.activity_code = r.activity_code
            AND rsf.layer = r.layer
            AND rsf.rule_code = r.code
            AND sf.page = $${i}
        )`,
      boLoc.page,
    );
  }

  const q = boLoc.q?.trim();
  if (q) {
    them(
      (i) =>
        `(
          r.code ILIKE '%' || $${i} || '%'
          OR COALESCE(r.description, '') ILIKE '%' || $${i} || '%'
          OR a.name_vi ILIKE '%' || $${i} || '%'
          OR a.name_han ILIKE '%' || $${i} || '%'
          OR EXISTS (
            SELECT 1
            FROM knowledge_rule_source rsq
            JOIN knowledge_source sq ON sq.source_key = rsq.source_key
            WHERE rsq.activity_code = r.activity_code
              AND rsq.layer = r.layer
              AND rsq.rule_code = r.code
              AND (
                COALESCE(sq.section, '') ILIKE '%' || $${i} || '%'
                OR COALESCE(sq.original_name, '') ILIKE '%' || $${i} || '%'
                OR COALESCE(sq.note, '') ILIKE '%' || $${i} || '%'
              )
          )
        )`,
      q,
    );
  }

  return { whereSql: clauses.join(' AND '), params };
}

function doiDongQuyTac(row: DongQuyTacDb): QuyTacTriThucApi {
  return {
    activity: row.activity_code,
    activityNameVi: row.name_vi,
    activityNameHan: row.name_han,
    layer: row.layer,
    kind: row.kind,
    code: row.code,
    effect: row.effect ?? undefined,
    operation: row.operation ?? undefined,
    target: row.target ?? undefined,
    condition: row.condition ?? undefined,
    precedence: row.precedence ?? undefined,
    description: row.description ?? undefined,
    sources: row.sources,
  };
}

function khoaNguon(source: ThamChieuNguon): string {
  return createHash('sha256')
    .update(
      JSON.stringify([
        source.loaiNguon,
        source.tap ?? null,
        source.quyen,
        source.trang ?? null,
        source.muc ?? null,
        source.tenGoc ?? null,
        source.ghiChu ?? null,
        source.daXacMinh,
      ]),
    )
    .digest('hex');
}

async function chenNguon(
  client: PoolClient,
  sourceKey: string,
  source: ThamChieuNguon,
): Promise<void> {
  await client.query(
    `INSERT INTO knowledge_source(
       source_key, source_type, volume, book, page,
       section, original_name, note, verified
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      sourceKey,
      source.loaiNguon,
      source.tap ?? null,
      source.quyen,
      source.trang ?? null,
      source.muc ?? null,
      source.tenGoc ?? null,
      source.ghiChu ?? null,
      source.daXacMinh,
    ],
  );
}

function gioiHan(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

export function laNguonViet(source: NguonTriThucApi): boolean {
  return source.sourceType === LoaiNguon.BAN_VIET;
}
