import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { Mua } from '../calendar/domain/season';
import { tinhMuaTheoChiThang } from '../calendar/season';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { AT, MAU, NHAM, TAN } = ThienCan;

const VONG_60_CAN_CHI: readonly CanChi[] = Array.from({ length: 60 }, (_, i) => ({
  can: THIEN_CAN_THEO_THU_TU[i % 10]!,
  chi: DIA_CHI_THEO_THU_TU[i % 12]!,
}));

const ORACLE_TU_HAO: Readonly<Record<Mua, string>> = {
  [Mua.XUAN]: khoa(NHAM, TY),
  [Mua.HA]: khoa(AT, MAO),
  [Mua.THU]: khoa(MAU, NGO),
  [Mua.DONG]: khoa(TAN, DAU),
};

const ORACLE_CUU_KHONG: Readonly<Record<DiaChi, DiaChi>> = {
  [DAN]: THIN,
  [MAO]: SUU,
  [THIN]: TUAT,
  [TI]: MUI,
  [NGO]: THIN,
  [MUI]: SUU,
  [THAN]: TUAT,
  [DAU]: MUI,
  [TUAT]: THIN,
  [HOI]: SUU,
  [TY]: TUAT,
  [SUU]: MUI,
};

describe('Tứ Hao 四耗 — independent 12 months x full 60-cycle oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const mua = tinhMuaTheoChiThang(chiThang);

    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = ORACLE_TU_HAO[mua] === khoa(canChi.can, canChi.chi);

      it(`${chiThang} / ${canChi.can} ${canChi.chi}: ${nenCo ? 'co' : 'khong co'} Tu Hao`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.TU_HAO)).toBe(nenCo);
      });
    }
  }

  it('source table has exactly one Tứ Hao Can Chi per season', () => {
    expect(new Set(Object.values(ORACLE_TU_HAO)).size).toBe(4);
  });
});

describe('Cửu Không 九空 — independent 12 x 12 oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = ORACLE_CUU_KHONG[chiThang] === chiNgay;

      it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'} Cuu Khong`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: ThienCan.GIAP,
          chiNgay,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.CUU_KHONG)).toBe(nenCo);
      });
    }
  }

  it('repeats the source sequence Thìn, Sửu, Tuất, Mùi three times', () => {
    expect(DIA_CHI_THEO_THU_TU.map((chiThang) => ORACLE_CUU_KHONG[chiThang])).toEqual([
      TUAT,
      MUI,
      THIN,
      SUU,
      TUAT,
      MUI,
      THIN,
      SUU,
      TUAT,
      MUI,
      THIN,
      SUU,
    ]);
  });
});

describe('KHAI_TRUONG factor provenance', () => {
  const service = new TinhYeuToNgayService();

  it.each([
    [MaYeuTo.TU_HAO, DAN, NHAM, TY],
    [MaYeuTo.CUU_KHONG, DAN, ThienCan.GIAP, THIN],
  ] as const)(
    '%s keeps verified Vietnamese + Hán source refs',
    (ma, chiThang, canNgay, chiNgay) => {
      const factor = service
        .tinh({ chiThang, canNgay, chiNgay, dangThoVuong: false })
        .find((item) => item.ma === ma);

      expect(factor?.nguon).toHaveLength(2);
      expect(factor?.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    },
  );
});

function khoa(can: ThienCan, chi: DiaChi): string {
  return `${can}:${chi}`;
}
