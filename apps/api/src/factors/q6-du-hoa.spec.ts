import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_DU_HOA } from './q6-du-hoa-definition';

const ORACLE: Readonly<Record<DiaChi, DiaChi>> = {
  DAN: DiaChi.TI,
  MAO: DiaChi.DAN,
  THIN: DiaChi.HOI,
  TI: DiaChi.THAN,
  NGO: DiaChi.TI,
  MUI: DiaChi.DAN,
  THAN: DiaChi.HOI,
  DAU: DiaChi.THAN,
  TUAT: DiaChi.TI,
  HOI: DiaChi.DAN,
  TY: DiaChi.HOI,
  SUU: DiaChi.THAN,
};

const service = new TinhYeuToNgayService();

describe('Q6 Du Họa / 遊禍', () => {
  it('khớp exact 正月起巳逆行四孟 cho đủ 12 tháng', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      expect(DINH_NGHIA_DU_HOA.chiNgayTheoChiThang[chiThang]).toEqual([ORACLE[chiThang]]);
    }
  });

  it('giữ provenance Việt p499 + Hán Q6', () => {
    expect(new Set(DINH_NGHIA_DU_HOA.nguon.map((source) => source.loaiNguon))).toEqual(
      new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
    );
    expect(DINH_NGHIA_DU_HOA.nguon.every((source) => source.daXacMinh)).toBe(true);
  });

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      it(`${chiThang}/${chiNgay}: FactorsService emits Du Họa exactly once at source position`, () => {
        const codes = service
          .tinh({
            chiThang,
            canNgay: ThienCan.GIAP,
            chiNgay,
            dangThoVuong: false,
          })
          .map((item) => item.ma);
        expect(codes.filter((ma) => ma === MaYeuTo.DU_HOA)).toHaveLength(
          ORACLE[chiThang] === chiNgay ? 1 : 0,
        );
      });
    }
  }
});
