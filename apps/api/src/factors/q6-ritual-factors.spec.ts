import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6 } from './q6-ritual-factor-definitions';

const service = new TinhYeuToNgayService();
const CODES = [MaYeuTo.PHUC_SINH, MaYeuTo.THANH_TAM, MaYeuTo.ICH_HAU, MaYeuTo.TUC_THE] as const;

const ORACLE: Readonly<Record<(typeof CODES)[number], Readonly<Record<DiaChi, DiaChi>>>> = {
  [MaYeuTo.PHUC_SINH]: {
    DAN: DiaChi.DAU,
    MAO: DiaChi.MAO,
    THIN: DiaChi.TUAT,
    TI: DiaChi.THIN,
    NGO: DiaChi.HOI,
    MUI: DiaChi.TI,
    THAN: DiaChi.TY,
    DAU: DiaChi.NGO,
    TUAT: DiaChi.SUU,
    HOI: DiaChi.MUI,
    TY: DiaChi.DAN,
    SUU: DiaChi.THAN,
  },
  [MaYeuTo.THANH_TAM]: {
    DAN: DiaChi.HOI,
    MAO: DiaChi.TI,
    THIN: DiaChi.TY,
    TI: DiaChi.NGO,
    NGO: DiaChi.SUU,
    MUI: DiaChi.MUI,
    THAN: DiaChi.DAN,
    DAU: DiaChi.THAN,
    TUAT: DiaChi.MAO,
    HOI: DiaChi.DAU,
    TY: DiaChi.THIN,
    SUU: DiaChi.TUAT,
  },
  [MaYeuTo.ICH_HAU]: {
    DAN: DiaChi.TY,
    MAO: DiaChi.NGO,
    THIN: DiaChi.SUU,
    TI: DiaChi.MUI,
    NGO: DiaChi.DAN,
    MUI: DiaChi.THAN,
    THAN: DiaChi.MAO,
    DAU: DiaChi.DAU,
    TUAT: DiaChi.THIN,
    HOI: DiaChi.TUAT,
    TY: DiaChi.TI,
    SUU: DiaChi.HOI,
  },
  [MaYeuTo.TUC_THE]: {
    DAN: DiaChi.SUU,
    MAO: DiaChi.MUI,
    THIN: DiaChi.DAN,
    TI: DiaChi.THAN,
    NGO: DiaChi.MAO,
    MUI: DiaChi.DAU,
    THAN: DiaChi.THIN,
    DAU: DiaChi.TUAT,
    TUAT: DiaChi.TI,
    HOI: DiaChi.HOI,
    TY: DiaChi.NGO,
    SUU: DiaChi.TY,
  },
};

describe('Q6 ritual monthly factors — 福生 聖心 益後 續世', () => {
  for (const ma of CODES) {
    it(`${ma}: exactly one matching day-branch in every month`, () => {
      const definition = DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6.find((item) => item.ma === ma);
      expect(definition).toBeDefined();
      for (const chiThang of DIA_CHI_THEO_THU_TU) {
        expect(definition?.chiNgayTheoChiThang[chiThang]).toEqual([ORACLE[ma][chiThang]]);
      }
    });

    it(`${ma}: verified Việt + Hán provenance`, () => {
      const definition = DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6.find((item) => item.ma === ma)!;
      expect(new Set(definition.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(definition.nguon.every((source) => source.daXacMinh)).toBe(true);
    });
  }

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      it(`${chiThang}/${chiNgay}: FactorsService emits exactly the Q6 ritual identities`, () => {
        const codes = new Set(
          service
            .tinh({
              chiThang,
              canNgay: ThienCan.GIAP,
              chiNgay,
              dangThoVuong: false,
            })
            .map((item) => item.ma),
        );
        for (const ma of CODES) {
          expect(codes.has(ma)).toBe(ORACLE[ma][chiThang] === chiNgay);
        }
      });
    }
  }

  it('does not encode Huyết Kị as an alias of Tục Thế', () => {
    const tucThe = DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6.find((item) => item.ma === MaYeuTo.TUC_THE)!;
    expect(tucThe.tenKhac).toEqual([]);
  });
});
