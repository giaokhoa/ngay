import { describe, expect, it } from 'vitest';

import { DUONG_DAN } from './routes';

describe('DUONG_DAN', () => {
  it('có route trang chủ, cưới hỏi và di chuyển', () => {
    expect(DUONG_DAN.TRANG_CHU).toBe('/');
    expect(DUONG_DAN.CUOI_HOI).toBe('/cuoi-hoi');
    expect(DUONG_DAN.DI_CHUYEN).toBe('/di-chuyen');
  });
});
