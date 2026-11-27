import { describe, expect, it } from 'vitest';

import { DUONG_DAN } from './routes';

describe('DUONG_DAN', () => {
  it('có route cho các vertical đã implement', () => {
    expect(DUONG_DAN.TRANG_CHU).toBe('/');
    expect(DUONG_DAN.CUOI_HOI).toBe('/cuoi-hoi');
    expect(DUONG_DAN.DI_CHUYEN).toBe('/di-chuyen');
    expect(DUONG_DAN.DONG_THO).toBe('/dong-tho');
    expect(DUONG_DAN.SUA_CUNG_THAT).toBe('/sua-cung-that');
    expect(DUONG_DAN.KHAI_TRUONG).toBe('/khai-truong');
  });
});
