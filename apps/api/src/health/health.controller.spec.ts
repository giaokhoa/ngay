import { ServiceUnavailableException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { KhoTriThucPostgresService } from '../knowledge/knowledge.service';
import { SucKhoeController } from './health.controller';

function taoController(ready = true) {
  const kho = {
    kiemTraKetNoi: vi.fn(async () => ready),
  };

  return {
    controller: new SucKhoeController(kho as unknown as KhoTriThucPostgresService),
    kho,
  };
}

describe('SucKhoeController', () => {
  it('giữ /health backward-compatible', () => {
    expect(taoController().controller.kiemTra()).toEqual({ trangThai: 'ok' });
  });

  it('trả liveness không phụ thuộc Postgres', () => {
    expect(taoController(false).controller.kiemTraSong()).toEqual({ trangThai: 'ok' });
  });

  it('trả readiness khi dependency sẵn sàng hoặc bị disable', async () => {
    const { controller, kho } = taoController(true);

    await expect(controller.kiemTraSanSang()).resolves.toEqual({ trangThai: 'ok' });
    expect(kho.kiemTraKetNoi).toHaveBeenCalledOnce();
  });

  it('trả 503 readiness khi Postgres đã cấu hình nhưng mất kết nối', async () => {
    const { controller } = taoController(false);

    await expect(controller.kiemTraSanSang()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
