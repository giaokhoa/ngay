import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_GIAI_THAN } from './q5-giai-than-definition';

const ORACLE: Readonly<Record<DiaChi, DiaChi>> = {
  DAN: DiaChi.THAN,
  MAO: DiaChi.THAN,
  THIN: DiaChi.TUAT,
  TI: DiaChi.TUAT,
  NGO: DiaChi.TY,
  MUI: DiaChi.TY,
  THAN: DiaChi.DAN,
  DAU: DiaChi.DAN,
  TUAT: DiaChi.THIN,
  HOI: DiaChi.THIN,
  TY: DiaChi.NGO,
  SUU: DiaChi.NGO,
};

const service = new TinhYeuToNgayService();

describe('Q5 Giải Thần / 解神', () => {
  it('khớp exact monthly pair sequence cho đủ 12 tháng', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      expect(DINH_NGHIA_GIAI_THAN.chiNgayTheoChiThang[chiThang]).toEqual([ORACLE[chiThang]]);
    }
  });

  it('giữ provenance Việt p462–463 + Hán Q5', () => {
    expect(new Set(DINH_NGHIA_GIAI_THAN.nguon.map((source) => source.loaiNguon))).toEqual(
      new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
    );
    expect(DINH_NGHIA_GIAI_THAN.nguon.every((source) => source.daXacMinh)).toBe(true);
  });

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      it(`${chiThang}/${chiNgay}: FactorsService emits Giải Thần exactly at source position`, () => {
        const codes = service
          .tinh({
            chiThang,
            canNgay: ThienCan.GIAP,
            chiNgay,
            dangThoVuong: false,
          })
          .map((item) => item.ma);
        expect(codes.filter((ma) => ma === MaYeuTo.GIAI_THAN)).toHaveLength(
          ORACLE[chiThang] === chiNgay ? 1 : 0,
        );
      });
    }
  }
});
