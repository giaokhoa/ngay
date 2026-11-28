import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { SAI_KHAC_NGUON_HAN } from '../sources/han-source-discrepancies';
import { HAN_CORPUS_MANIFEST } from '../sources/han-source-manifest';
import { KhoTriThucPostgresService } from './knowledge.service';

@Controller('knowledge')
export class KhoTriThucController {
  constructor(private readonly kho: KhoTriThucPostgresService) {}

  @Get('status')
  status() {
    return {
      configured: this.kho.daCauHinh(),
      backend: 'postgres',
      evaluationUsesDatabase: false,
    };
  }

  @Get('stats')
  thongKe() {
    return this.kho.thongKe();
  }

  @Get('source-coverage')
  baoPhuNguon() {
    const partial = HAN_CORPUS_MANIFEST.filter(
      (item) => item.trangThai === 'ORACLE_MOT_PHAN',
    ).length;
    const unimplemented = HAN_CORPUS_MANIFEST.filter(
      (item) => item.trangThai === 'CHUA_IMPLEMENT',
    ).length;

    return {
      title: '欽定協紀辨方書',
      volumes: HAN_CORPUS_MANIFEST.length,
      hanOraclePartialVolumes: partial,
      unimplementedVolumes: unimplemented,
      fullVolumeOracleCount: 0,
      discrepancies: SAI_KHAC_NGUON_HAN,
      manifest: HAN_CORPUS_MANIFEST,
    };
  }

  @Get('rules')
  timQuyTac(
    @Query('activity') activity?: string,
    @Query('layer') layer?: string,
    @Query('effect') effect?: string,
    @Query('target') target?: string,
    @Query('book') book?: string,
    @Query('page') page?: string,
    @Query('q') q?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    if (layer !== undefined && layer !== 'Q10' && layer !== 'Q11') {
      throw new BadRequestException('layer phải là Q10 hoặc Q11');
    }

    return this.kho.timQuyTac({
      activity: rongThanhUndefined(activity),
      layer,
      effect: rongThanhUndefined(effect),
      target: rongThanhUndefined(target),
      book: docSoNguyenDuong('book', book),
      page: docSoNguyenDuong('page', page),
      q: rongThanhUndefined(q),
      limit: docSoNguyenDuong('limit', limit),
      offset: docSoNguyenKhongAm('offset', offset),
    });
  }
}

function rongThanhUndefined(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function docSoNguyenDuong(ten: string, value: string | undefined): number | undefined {
  if (value === undefined || value.trim() === '') return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new BadRequestException(ten + ' phải là số nguyên dương');
  }
  return parsed;
}

function docSoNguyenKhongAm(ten: string, value: string | undefined): number | undefined {
  if (value === undefined || value.trim() === '') return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new BadRequestException(ten + ' phải là số nguyên không âm');
  }
  return parsed;
}
