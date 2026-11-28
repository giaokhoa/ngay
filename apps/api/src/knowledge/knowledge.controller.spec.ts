import { BadRequestException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { KhoTriThucController } from './knowledge.controller';
import { KhoTriThucPostgresService } from './knowledge.service';

function taoController() {
  const service = {
    daCauHinh: vi.fn(() => true),
    thongKe: vi.fn(async () => ({
      configured: true as const,
      activities: 7,
      rules: 123,
      sources: 45,
      byLayer: { Q10: 100, Q11: 23 },
      byActivity: [],
    })),
    timQuyTac: vi.fn(async () => ({
      total: 0,
      limit: 50,
      offset: 0,
      items: [],
    })),
  };

  return {
    controller: new KhoTriThucController(service as unknown as KhoTriThucPostgresService),
    service,
  };
}

describe('KhoTriThucController', () => {
  it('reports Postgres as query backend without claiming evaluation uses DB', () => {
    const { controller } = taoController();

    expect(controller.status()).toEqual({
      configured: true,
      backend: 'postgres',
      evaluationUsesDatabase: false,
    });
  });

  it('exposes explicit 36-volume Hán source coverage without claiming full-book oracle', () => {
    const { controller } = taoController();
    const coverage = controller.baoPhuNguon();

    expect(coverage.volumes).toBe(36);
    expect(coverage.hanOraclePartialVolumes).toBe(23);
    expect(coverage.unimplementedVolumes).toBe(13);
    expect(coverage.fullVolumeOracleCount).toBe(0);
    expect(coverage.manifest).toHaveLength(36);
    expect(coverage.discrepancies.length).toBeGreaterThanOrEqual(5);
  });

  it('parses rule filters before handing them to Postgres service', async () => {
    const { controller, service } = taoController();

    await controller.timQuyTac('AN_TANG', 'Q10', 'KY', 'PHUC_NHAT', '10', '823', 'Phục', '25', '5');

    expect(service.timQuyTac).toHaveBeenCalledWith({
      activity: 'AN_TANG',
      layer: 'Q10',
      effect: 'KY',
      target: 'PHUC_NHAT',
      book: 10,
      page: 823,
      q: 'Phục',
      limit: 25,
      offset: 5,
    });
  });

  it('rejects invalid layer and numeric filters', () => {
    const { controller } = taoController();

    expect(() => controller.timQuyTac(undefined, 'Q9')).toThrow(BadRequestException);
    expect(() => controller.timQuyTac(undefined, undefined, undefined, undefined, '0')).toThrow(
      BadRequestException,
    );
  });
});
