import { describe, expect, it } from 'vitest';

import { SucKhoeController } from './health.controller';

describe('SucKhoeController', () => {
  it('tra ve trang thai ok', () => {
    const controller = new SucKhoeController();

    expect(controller.kiemTra()).toEqual({ trangThai: 'ok' });
  });
});
