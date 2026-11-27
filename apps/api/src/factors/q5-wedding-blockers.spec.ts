import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { Mua } from '../calendar/domain/season';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

const VONG_60_CAN_CHI: readonly CanChi[] = Array.from({ length: 60 }, (_, i) => ({
  can: THIEN_CAN_THEO_THU_TU[i % 10]!,
  chi: DIA_CHI_THEO_THU_TU[i % 12]!,
}));

const ORACLE_MUA: Readonly<Record<DiaChi, Mua>> = {
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

const ORACLE_TU_PHE: Readonly<Record<Mua, ReadonlySet<string>>> = {
  [Mua.XUAN]: tap([CANH, THAN], [TAN, DAU]),
  [Mua.HA]: tap([NHAM, TY], [QUY, HOI]),
  [Mua.THU]: tap([GIAP, DAN], [AT, MAO]),
  [Mua.DONG]: tap([BINH, NGO], [DINH, TI]),
};

const ORACLE_TU_KY: Readonly<Record<Mua, string>> = {
  [Mua.XUAN]: khoa(GIAP, TY),
  [Mua.HA]: khoa(BINH, TY),
  [Mua.THU]: khoa(CANH, TY),
  [Mua.DONG]: khoa(NHAM, TY),
};

const ORACLE_TU_CUNG: Readonly<Record<Mua, string>> = {
  [Mua.XUAN]: khoa(AT, HOI),
  [Mua.HA]: khoa(DINH, HOI),
  [Mua.THU]: khoa(TAN, HOI),
  [Mua.DONG]: khoa(QUY, HOI),
};

const ORACLE_NGU_MO: Readonly<Record<DiaChi, string>> = {
  [DAN]: khoa(AT, MUI),
  [MAO]: khoa(AT, MUI),
  [THIN]: khoa(MAU, THIN),
  [TI]: khoa(BINH, TUAT),
  [NGO]: khoa(BINH, TUAT),
  [MUI]: khoa(MAU, THIN),
  [THAN]: khoa(TAN, SUU),
  [DAU]: khoa(TAN, SUU),
  [TUAT]: khoa(MAU, THIN),
  [HOI]: khoa(NHAM, THIN),
  [TY]: khoa(NHAM, THIN),
  [SUU]: khoa(MAU, THIN),
};

const ORACLE_BAT_CHUYEN = tap([DINH, MUI], [KY, MUI], [CANH, THAN], [GIAP, DAN], [QUY, SUU]);

describe('Q5 wedding blockers — Tứ Phế', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const mua = ORACLE_MUA[chiThang];

    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = ORACLE_TU_PHE[mua].has(khoa(canChi.can, canChi.chi));

      it(`${chiThang} / ${canChi.can} ${canChi.chi}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.TU_PHE)).toBe(nenCo);
      });
    }
  }
});

describe.each([
  [MaYeuTo.TU_KY, ORACLE_TU_KY],
  [MaYeuTo.TU_CUNG, ORACLE_TU_CUNG],
] as const)('%s — season x 60 oracle', (ma, oracle) => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const mua = ORACLE_MUA[chiThang];

    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = oracle[mua] === khoa(canChi.can, canChi.chi);

      it(`${chiThang} / ${canChi.can} ${canChi.chi}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === ma)).toBe(nenCo);
      });
    }
  }
});

describe('Ngũ Mộ — 12 months x 60 oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = ORACLE_NGU_MO[chiThang] === khoa(canChi.can, canChi.chi);

      it(`${chiThang} / ${canChi.can} ${canChi.chi}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.NGU_MO)).toBe(nenCo);
      });
    }
  }
});

describe('Bát Chuyên — full 60-cycle oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const canChi of VONG_60_CAN_CHI) {
    const nenCo = ORACLE_BAT_CHUYEN.has(khoa(canChi.can, canChi.chi));

    it(`${canChi.can} ${canChi.chi}: ${nenCo ? 'co' : 'khong co'} Bat Chuyen`, () => {
      const ketQua = service.tinh({
        chiThang: DAN,
        canNgay: canChi.can,
        chiNgay: canChi.chi,
        dangThoVuong: false,
      });

      expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.BAT_CHUYEN)).toBe(nenCo);
    });
  }

  it('source-faithful list has exactly five days despite the name Bát Chuyên', () => {
    expect(ORACLE_BAT_CHUYEN.size).toBe(5);
  });
});

function tap(...items: readonly [ThienCan, DiaChi][]): ReadonlySet<string> {
  return new Set(items.map(([can, chi]) => khoa(can, chi)));
}

function khoa(can: ThienCan, chi: DiaChi): string {
  return `${can}:${chi}`;
}
