import { describe, expect, it } from 'vitest';

import { DUONG_DAN } from './routes';

describe('DUONG_DAN', () => {
  it('co duong dan trang chu', () => {
    expect(DUONG_DAN.TRANG_CHU).toBe('/');
  });
});
