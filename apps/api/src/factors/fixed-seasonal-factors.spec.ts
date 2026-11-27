import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { Mua } from '../calendar/domain/season';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_YEU_TO_CO_DINH_VA_THEO_MUA } from './fixed-seasonal-factor-definitions';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

const VONG_60_CAN_CHI: readonly CanChi[] = Array.from({ length: 60 }, (_, chiSo) => ({
  can: THIEN_CAN_THEO_THU_TU[chiSo % 10]!,
  chi: DIA_CHI_THEO_THU_TU[chiSo % 12]!,
}));

const ORACLE_THIEN_AN = new Set([
  khoa(GIAP, TY),
  khoa(AT, SUU),
  khoa(BINH, DAN),
  khoa(DINH, MAO),
  khoa(MAU, THIN),
  khoa(KY, MAO),
  khoa(CANH, THIN),
  khoa(TAN, TI),
  khoa(NHAM, NGO),
  khoa(QUY, MUI),
  khoa(KY, DAU),
  khoa(CANH, TUAT),
  khoa(TAN, HOI),
  khoa(NHAM, TY),
  khoa(QUY, SUU),
]);

const ORACLE_MUA_THEO_CHI_THANG: Readonly<Record<DiaChi, Mua>> = {
  [DAN]: Mua.XUAN,
  [MAO]: Mua.XUAN,
  [THIN]: Mua.XUAN,
  [TI]: Mua.HA,
  [NGO]: Mua.HA,
  [MUI]: Mua.HA,
  [THAN]: Mua.THU,
  [DAU]: Mua.THU,
  [TUAT]: Mua.THU,
  [HOI]: Mua.DONG,
  [TY]: Mua.DONG,
  [SUU]: Mua.DONG,
};

const ORACLE_THIEN_XA: Readonly<Record<Mua, string>> = {
  [Mua.XUAN]: khoa(MAU, DAN),
  [Mua.HA]: khoa(GIAP, NGO),
  [Mua.THU]: khoa(MAU, THAN),
  [Mua.DONG]: khoa(GIAP, TY),
};

const ORACLE_THIEN_NGUYEN: Readonly<Record<DiaChi, string>> = {
  [DAN]: khoa(GIAP, NGO),
  [MAO]: khoa(GIAP, TUAT),
  [THIN]: khoa(AT, DAU),
  [TI]: khoa(BINH, TY),
  [NGO]: khoa(DINH, SUU),
  [MUI]: khoa(MAU, NGO),
  [THAN]: khoa(GIAP, DAN),
  [DAU]: khoa(BINH, THIN),
  [TUAT]: khoa(TAN, MAO),
  [HOI]: khoa(MAU, THIN),
  [TY]: khoa(GIAP, TY),
  [SUU]: khoa(QUY, MUI),
};

const ORACLE_TU_TUONG: Readonly<Record<Mua, readonly ThienCan[]>> = {
  [Mua.XUAN]: [BINH, DINH],
  [Mua.HA]: [MAU, KY],
  [Mua.THU]: [NHAM, QUY],
  [Mua.DONG]: [GIAP, AT],
};

const ORACLE_THOI_DUC: Readonly<Record<Mua, DiaChi>> = {
  [Mua.XUAN]: NGO,
  [Mua.HA]: THIN,
  [Mua.THU]: TY,
  [Mua.DONG]: DAN,
};

describe('Thiên Ân — fixed Can Chi oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const canChi of VONG_60_CAN_CHI) {
    const nenCo = ORACLE_THIEN_AN.has(khoa(canChi.can, canChi.chi));

    it(`${canChi.can} ${canChi.chi}: ${nenCo ? 'co' : 'khong co'} THIEN_AN`, () => {
      const ketQua = service.tinh({
        chiThang: DAN,
        canNgay: canChi.can,
        chiNgay: canChi.chi,
      });

      expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.THIEN_AN)).toBe(nenCo);
    });
  }
});

describe('Thiên Xá — season x 60 Can Chi oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const mua = ORACLE_MUA_THEO_CHI_THANG[chiThang];
    const mongDoi = ORACLE_THIEN_XA[mua];

    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = khoa(canChi.can, canChi.chi) === mongDoi;

      it(`${chiThang} / ${canChi.can} ${canChi.chi}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.THIEN_XA)).toBe(nenCo);
      });
    }
  }
});

describe('Thiên Nguyện — 12 months x 60 Can Chi oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const mongDoi = ORACLE_THIEN_NGUYEN[chiThang];

    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = khoa(canChi.can, canChi.chi) === mongDoi;

      it(`${chiThang} / ${canChi.can} ${canChi.chi}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.THIEN_NGUYEN)).toBe(nenCo);
      });
    }
  }
});

describe('Tứ Tướng — season x 10 stems oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const mua = ORACLE_MUA_THEO_CHI_THANG[chiThang];

    for (const canNgay of THIEN_CAN_THEO_THU_TU) {
      const nenCo = ORACLE_TU_TUONG[mua].includes(canNgay);

      it(`${chiThang} / ${canNgay}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay,
          chiNgay: SUU,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.TU_TUONG)).toBe(nenCo);
      });
    }
  }
});

describe('Thời Đức — season x 12 branches oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const mua = ORACLE_MUA_THEO_CHI_THANG[chiThang];

    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = ORACLE_THOI_DUC[mua] === chiNgay;

      it(`${chiThang} / ${chiNgay}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: CANH,
          chiNgay,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.THOI_DUC)).toBe(nenCo);
      });
    }
  }
});

describe('Quyển 5 fixed/seasonal provenance', () => {
  it('mọi definition có bản Việt và Hán bản đã xác minh', () => {
    for (const dinhNghia of DINH_NGHIA_YEU_TO_CO_DINH_VA_THEO_MUA) {
      const loaiNguon = new Set(dinhNghia.nguon.map((nguon) => nguon.loaiNguon));

      expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
      expect(dinhNghia.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });

  it('registry đúng 5 factor trong batch #21', () => {
    expect(DINH_NGHIA_YEU_TO_CO_DINH_VA_THEO_MUA.map((dinhNghia) => dinhNghia.ma)).toEqual([
      MaYeuTo.THIEN_AN,
      MaYeuTo.THIEN_XA,
      MaYeuTo.THIEN_NGUYEN,
      MaYeuTo.TU_TUONG,
      MaYeuTo.THOI_DUC,
    ]);
  });
});

function khoa(can: ThienCan, chi: DiaChi): string {
  return `${can}_${chi}`;
}
