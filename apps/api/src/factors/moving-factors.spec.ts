import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

const ORACLE_DAN_NHAT: Readonly<Record<DiaChi, DiaChi>> = {
  [DAN]: NGO,
  [MAO]: NGO,
  [THIN]: NGO,
  [TI]: DAU,
  [NGO]: DAU,
  [MUI]: DAU,
  [THAN]: TY,
  [DAU]: TY,
  [TUAT]: TY,
  [HOI]: MAO,
  [TY]: MAO,
  [SUU]: MAO,
};

const ORACLE_THIEN_MA: Readonly<Record<DiaChi, DiaChi>> = {
  [DAN]: NGO,
  [MAO]: THAN,
  [THIN]: TUAT,
  [TI]: TY,
  [NGO]: DAN,
  [MUI]: THIN,
  [THAN]: NGO,
  [DAU]: THAN,
  [TUAT]: TUAT,
  [HOI]: TY,
  [TY]: DAN,
  [SUU]: THIN,
};

const ORACLE_QUY_KY: Readonly<Record<DiaChi, DiaChi>> = {
  [DAN]: SUU,
  [MAO]: DAN,
  [THIN]: TY,
  [TI]: SUU,
  [NGO]: DAN,
  [MUI]: TY,
  [THAN]: SUU,
  [DAU]: DAN,
  [TUAT]: TY,
  [HOI]: SUU,
  [TY]: DAN,
  [SUU]: TY,
};

describe.each([
  [MaYeuTo.DAN_NHAT, ORACLE_DAN_NHAT],
  [MaYeuTo.THIEN_MA, ORACLE_THIEN_MA],
  [MaYeuTo.QUY_KY, ORACLE_QUY_KY],
] as const)('%s — independent 12 x 12 oracle', (ma, oracle) => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = oracle[chiThang] === chiNgay;

      it(chiThang + ' / ' + chiNgay + ': ' + (nenCo ? 'có ' : 'không có ') + ma, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: ThienCan.GIAP,
          chiNgay,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === ma)).toBe(nenCo);
      });
    }
  }
});

describe('DI_CHUYEN factor identity guards', () => {
  it('Thiên Mã không alias với Dịch Mã', () => {
    expect(ORACLE_THIEN_MA[DAN]).toBe(NGO);
    expect(ORACLE_THIEN_MA[DAN]).not.toBe(THAN);
  });

  it('Quy Kị lặp theo Mạnh / Trọng / Quý', () => {
    expect([
      ORACLE_QUY_KY[DAN],
      ORACLE_QUY_KY[TI],
      ORACLE_QUY_KY[THAN],
      ORACLE_QUY_KY[HOI],
    ]).toEqual([SUU, SUU, SUU, SUU]);
    expect([ORACLE_QUY_KY[MAO], ORACLE_QUY_KY[NGO], ORACLE_QUY_KY[DAU], ORACLE_QUY_KY[TY]]).toEqual(
      [DAN, DAN, DAN, DAN],
    );
    expect([
      ORACLE_QUY_KY[THIN],
      ORACLE_QUY_KY[MUI],
      ORACLE_QUY_KY[TUAT],
      ORACLE_QUY_KY[SUU],
    ]).toEqual([TY, TY, TY, TY]);
  });
});
