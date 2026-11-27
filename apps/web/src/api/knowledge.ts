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

export interface ThongKeTriThuc {
  configured: true;
  activities: number;
  rules: number;
  sources: number;
  byLayer: Record<string, number>;
  byActivity: readonly { code: string; nameVi: string; rules: number }[];
  syncedAt?: string;
}

export interface BoLocTriThuc {
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

export function taoUrlTimQuyTac(boLoc: BoLocTriThuc): string {
  const params = new URLSearchParams();

  them(params, 'activity', boLoc.activity);
  them(params, 'layer', boLoc.layer);
  them(params, 'effect', boLoc.effect);
  them(params, 'target', boLoc.target);
  them(params, 'book', boLoc.book);
  them(params, 'page', boLoc.page);
  them(params, 'q', boLoc.q);
  them(params, 'limit', boLoc.limit);
  them(params, 'offset', boLoc.offset);

  const query = params.toString();
  return '/knowledge/rules' + (query ? '?' + query : '');
}

export async function taiThongKeTriThuc(signal?: AbortSignal): Promise<ThongKeTriThuc> {
  return fetchJson<ThongKeTriThuc>('/knowledge/stats', signal);
}

export async function timQuyTacTriThuc(
  boLoc: BoLocTriThuc,
  signal?: AbortSignal,
): Promise<KetQuaTimQuyTacTriThuc> {
  return fetchJson<KetQuaTimQuyTacTriThuc>(taoUrlTimQuyTac(boLoc), signal);
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      response.status === 503
        ? 'Postgres knowledge catalog chưa được cấu hình.'
        : text || 'Không tải được dữ liệu knowledge catalog.',
    );
  }

  return (await response.json()) as T;
}

function them(params: URLSearchParams, key: string, value: string | number | undefined): void {
  if (value === undefined || value === '') return;
  params.set(key, String(value));
}
