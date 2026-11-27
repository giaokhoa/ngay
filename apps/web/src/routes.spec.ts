import { describe, expect, it } from 'vitest';

import { DUONG_DAN } from './routes';

describe('DUONG_DAN', () => {
  it('có route trang chủ và cưới hỏi', () => {
    expect(DUONG_DAN.TRANG_CHU).toBe('/');
    expect(DUONG_DAN.CUOI_HOI).toBe('/cuoi-hoi');
  });
});
