import { describe, expect, it } from 'vitest';

import { taoUrlXemCuoiHoi } from './date-selection';

describe('taoUrlXemCuoiHoi', () => {
  it('giữ instant ISO và timezone IANA trong query', () => {
    const url = taoUrlXemCuoiHoi(new Date('2026-11-27T05:00:00.000Z'), 'Asia/Ho_Chi_Minh');

    const parsed = new URL(url, 'https://ngay.local');
    expect(parsed.pathname).toBe('/date-selection/cuoi-hoi');
    expect(parsed.searchParams.get('thoiDiem')).toBe('2026-11-27T05:00:00.000Z');
    expect(parsed.searchParams.get('muiGio')).toBe('Asia/Ho_Chi_Minh');
  });
});
