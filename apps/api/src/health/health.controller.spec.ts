import { describe, expect, it } from 'vitest';

import { SucKhoeController } from './health.controller';

describe('SucKhoeController', () => {
  const controller = new SucKhoeController();

  it('giữ /health backward-compatible', () => {
    expect(controller.kiemTra()).toEqual({ trangThai: 'ok' });
  });

  it('trả liveness', () => {
    expect(controller.kiemTraSong()).toEqual({ trangThai: 'ok' });
  });

  it('trả readiness', () => {
    expect(controller.kiemTraSanSang()).toEqual({ trangThai: 'ok' });
  });
});
