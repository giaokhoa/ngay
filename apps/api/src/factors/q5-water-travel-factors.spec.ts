import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { Mua } from '../calendar/domain/season';
import { tinhMuaTheoChiThang } from '../calendar/season';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import {
  DINH_NGHIA_BAT_PHONG,
  DINH_NGHIA_CUU_KHAM,
  DINH_NGHIA_XUC_THUY_LONG,
} from './q5-water-travel-factor-definitions';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, BINH, DINH, QUY } = ThienCan;
const service = new TinhYeuToNgayService();

const CUU_KHAM = {
  [DAN]: THIN,
  [MAO]: TY,
  [THIN]: THAN,
  [TI]: MUI,
  [NGO]: MAO,
  [MUI]: HOI,
  [THAN]: TUAT,
  [DAU]: NGO,
  [TUAT]: DAN,
  [HOI]: SUU,
  [TY]: DAU,
  [SUU]: TI,
} as const;

const BAT_PHONG = {
  [Mua.XUAN]: [
    [DINH, SUU],
    [DINH, TI],
  ],
  [Mua.HA]: [
    [GIAP, THAN],
    [GIAP, THIN],
  ],
  [Mua.THU]: [
    [DINH, MUI],
    [DINH, HOI],
  ],
  [Mua.DONG]: [
    [GIAP, TUAT],
    [GIAP, DAN],
  ],
} as const;

describe('Q5 water-travel factors — 九坎 / 八風 / 觸水龍', () => {
  it('Cửu Khảm khớp exact Việt p442–443 + Hán WYG_005-45b..47a', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      expect(DINH_NGHIA_CUU_KHAM.chiNgayTheoChiThang[chiThang]).toEqual([CUU_KHAM[chiThang]]);
    }
  });

  it('Bát Phong dùng bảng hiệu đính, không dùng Kỷ Dậu/Tân Mùi sai', () => {
    expect(
      Object.fromEntries(
        Object.entries(DINH_NGHIA_BAT_PHONG.tapCanChiNgayTheoMua).map(([mua, entries]) => [
          mua,
          entries.map(({ can, chi }) => `${can}:${chi}`),
        ]),
      ),
    ).toEqual(
      Object.fromEntries(
        Object.entries(BAT_PHONG).map(([mua, entries]) => [
          mua,
          entries.map(([can, chi]) => `${can}:${chi}`),
        ]),
      ),
    );
  });

  it('Xúc Thủy Long khớp 丙子 癸未 癸丑', () => {
    expect(DINH_NGHIA_XUC_THUY_LONG.canChiNgay.map(({ can, chi }) => `${can}:${chi}`)).toEqual([
      `${BINH}:${TY}`,
      `${QUY}:${MUI}`,
      `${QUY}:${SUU}`,
    ]);
  });

  it('giữ Việt + Hán provenance verified', () => {
    for (const def of [DINH_NGHIA_CUU_KHAM, DINH_NGHIA_BAT_PHONG, DINH_NGHIA_XUC_THUY_LONG]) {
      expect(new Set(def.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(def.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });

  it('FactorsService emits Cửu Khảm đúng month->branch', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      for (const chiNgay of DIA_CHI_THEO_THU_TU) {
        const codes = service
          .tinh({ chiThang, canNgay: ThienCan.MAU, chiNgay, dangThoVuong: false })
          .map((item) => item.ma);
        expect(codes.includes(MaYeuTo.CUU_KHAM), `${chiThang}/${chiNgay}`).toBe(
          chiNgay === CUU_KHAM[chiThang],
        );
      }
    }
  });

  it('FactorsService emits Bát Phong only for corrected seasonal Can-Chi pairs', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      const mua = tinhMuaTheoChiThang(chiThang);
      for (const [can, chi] of BAT_PHONG[mua]) {
        const codes = service
          .tinh({ chiThang, canNgay: can, chiNgay: chi, dangThoVuong: false })
          .map((item) => item.ma);
        expect(codes).toContain(MaYeuTo.BAT_PHONG);
      }
    }
  });

  it.each([
    [BINH, TY],
    [QUY, MUI],
    [QUY, SUU],
  ] as const)('FactorsService emits Xúc Thủy Long for %s/%s', (canNgay, chiNgay) => {
    expect(
      service.tinh({ chiThang: DAN, canNgay, chiNgay, dangThoVuong: false }).map((item) => item.ma),
    ).toContain(MaYeuTo.XUC_THUY_LONG);
  });
});
