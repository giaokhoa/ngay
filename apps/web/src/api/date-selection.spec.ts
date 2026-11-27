import { describe, expect, it } from 'vitest';

import {
  taoUrlXemCuoiHoi,
  taoUrlXemDiChuyen,
  taoUrlXemDongTho,
  taoUrlXemKhaiTruong,
  taoUrlXemSuaCungThat,
} from './date-selection';

describe('date-selection URLs', () => {
  it.each([
    ['cuoi-hoi', taoUrlXemCuoiHoi],
    ['di-chuyen', taoUrlXemDiChuyen],
    ['dong-tho', taoUrlXemDongTho],
    ['sua-cung-that', taoUrlXemSuaCungThat],
    ['khai-truong', taoUrlXemKhaiTruong],
  ] as const)('giữ instant ISO và timezone IANA cho %s', (duongDan, taoUrl) => {
    const url = taoUrl(new Date('2026-11-27T05:00:00.000Z'), 'Asia/Ho_Chi_Minh');

    const parsed = new URL(url, 'https://ngay.local');
    expect(parsed.pathname).toBe('/date-selection/' + duongDan);
    expect(parsed.searchParams.get('thoiDiem')).toBe('2026-11-27T05:00:00.000Z');
    expect(parsed.searchParams.get('muiGio')).toBe('Asia/Ho_Chi_Minh');
  });
});
