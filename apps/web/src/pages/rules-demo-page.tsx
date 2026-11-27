import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

import {
  BoLocTriThuc,
  KetQuaTimQuyTacTriThuc,
  QuyTacTriThucApi,
  ThongKeTriThuc,
  taiThongKeTriThuc,
  timQuyTacTriThuc,
} from '../api/knowledge';
import { DUONG_DAN } from '../routes';

export function TrangDemoRuleDb() {
  const [stats, setStats] = useState<ThongKeTriThuc | null>(null);
  const [ketQua, setKetQua] = useState<KetQuaTimQuyTacTriThuc | null>(null);
  const [activity, setActivity] = useState('');
  const [layer, setLayer] = useState('');
  const [target, setTarget] = useState('');
  const [book, setBook] = useState('10');
  const [page, setPage] = useState('');
  const [q, setQ] = useState('');
  const [dangTai, setDangTai] = useState(false);
  const [loi, setLoi] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Postgres rule catalog — Ngày';
    const controller = new AbortController();

    void taiThongKeTriThuc(controller.signal)
      .then((value) => {
        setStats(value);
        return timQuyTacTriThuc({ book: 10, limit: 30 }, controller.signal);
      })
      .then(setKetQua)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setLoi(error instanceof Error ? error.message : 'Không tải được Postgres catalog.');
        }
      });

    return () => controller.abort();
  }, []);

  const boLoc = useMemo<BoLocTriThuc>(
    () => ({
      activity: activity || undefined,
      layer: layer === 'Q10' || layer === 'Q11' ? layer : undefined,
      target: target.trim() || undefined,
      book: soDuong(book),
      page: soDuong(page),
      q: q.trim() || undefined,
      limit: 50,
    }),
    [activity, layer, target, book, page, q],
  );

  async function loc(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDangTai(true);
    setLoi(null);

    try {
      setKetQua(await timQuyTacTriThuc(boLoc));
    } catch (error) {
      setKetQua(null);
      setLoi(error instanceof Error ? error.message : 'Không query được Postgres catalog.');
    } finally {
      setDangTai(false);
    }
  }

  return (
    <main className="trang-rules">
      <header className="dau-trang">
        <Link className="thuong-hieu" to={DUONG_DAN.TRANG_CHU}>
          Ngày
        </Link>
        <div>
          <p className="nhan">Phase 6B · PostgreSQL knowledge catalog</p>
          <h1>Rule DB demo</h1>
          <p className="mo-ta">
            Q11, Q10 và provenance được mirror từ rule type-safe hiện tại sang PostgreSQL để query.
            Engine xem ngày vẫn chạy in-memory, không round-trip database.
          </p>
        </div>
      </header>

      {stats ? <BangThongKe stats={stats} /> : null}

      <form className="bo-loc-rules" onSubmit={loc}>
        <label>
          <span>Dụng sự</span>
          <select value={activity} onChange={(event) => setActivity(event.target.value)}>
            <option value="">Tất cả</option>
            {stats?.byActivity.map((item) => (
              <option key={item.code} value={item.code}>
                {item.nameVi} · {item.rules} rules
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Lớp</span>
          <select value={layer} onChange={(event) => setLayer(event.target.value)}>
            <option value="">Q10 + Q11</option>
            <option value="Q10">Q10</option>
            <option value="Q11">Q11</option>
          </select>
        </label>
        <label>
          <span>Target</span>
          <input
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            placeholder="vd. NGUYET_YEM"
          />
        </label>
        <label>
          <span>Quyển</span>
          <input
            inputMode="numeric"
            value={book}
            onChange={(event) => setBook(event.target.value)}
            placeholder="10"
          />
        </label>
        <label>
          <span>Trang</span>
          <input
            inputMode="numeric"
            value={page}
            onChange={(event) => setPage(event.target.value)}
            placeholder="vd. 823"
          />
        </label>
        <label className="bo-loc-text">
          <span>Tìm trong code / mô tả / nguồn</span>
          <input
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="vd. Phục Nhật"
          />
        </label>
        <button type="submit" disabled={dangTai}>
          {dangTai ? 'Đang query…' : 'Query PostgreSQL'}
        </button>
      </form>

      {loi ? <p className="thong-bao-loi">{loi}</p> : null}

      {ketQua ? (
        <section className="ket-qua-rule-db" aria-live="polite">
          <div className="tieu-de-ket-qua-db">
            <div>
              <p className="nhan">SQL result</p>
              <h2>{ketQua.total} rules khớp bộ lọc</h2>
            </div>
            <small>
              Hiển thị {ketQua.items.length} / {ketQua.total}
            </small>
          </div>
          <div className="danh-sach-rule-db">
            {ketQua.items.map((rule) => (
              <RuleDbCard key={rule.activity + ':' + rule.layer + ':' + rule.code} rule={rule} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function BangThongKe({ stats }: { stats: ThongKeTriThuc }) {
  return (
    <section className="thong-ke-db" aria-label="Thống kê PostgreSQL catalog">
      <ThongKe value={stats.activities} label="dụng sự" />
      <ThongKe value={stats.rules} label="rules" />
      <ThongKe value={stats.sources} label="source refs" />
      <ThongKe value={stats.byLayer.Q10 ?? 0} label="Q10 rules" />
      <ThongKe value={stats.byLayer.Q11 ?? 0} label="Q11 rules" />
    </section>
  );
}

function ThongKe({ value, label }: { value: number; label: string }) {
  return (
    <div className="o-thong-ke-db">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function RuleDbCard({ rule }: { rule: QuyTacTriThucApi }) {
  const hanhDong = rule.effect ?? rule.operation ?? rule.kind;

  return (
    <article className="rule-db-card">
      <div className="rule-db-meta">
        <span>{rule.activityNameVi}</span>
        <span>{rule.activityNameHan}</span>
        <strong>{rule.layer}</strong>
        <strong>{hanhDong}</strong>
      </div>
      <h3>{rule.code}</h3>
      {rule.description ? <p>{rule.description}</p> : null}

      {rule.target !== undefined || rule.condition !== undefined ? (
        <details>
          <summary>Target / condition JSONB</summary>
          <pre>
            {JSON.stringify(
              {
                target: rule.target,
                condition: rule.condition,
                precedence: rule.precedence,
              },
              null,
              2,
            )}
          </pre>
        </details>
      ) : null}

      <div className="nguon-db">
        {rule.sources.map((source, index) => (
          <div key={source.sourceType + ':' + source.book + ':' + source.page + ':' + index}>
            <strong>{source.sourceType === 'BAN_VIET' ? 'Bản Việt' : 'Hán bản'}</strong>
            <span>
              Q{source.book}
              {source.page ? ' · tr. ' + source.page : ''}
              {source.section ? ' · ' + source.section : ''}
            </span>
            {source.note ? <small>{source.note}</small> : null}
          </div>
        ))}
      </div>
    </article>
  );
}

function soDuong(value: string): number | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}
