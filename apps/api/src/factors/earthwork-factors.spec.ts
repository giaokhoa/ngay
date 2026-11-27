import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

const VONG_60_CAN_CHI: readonly CanChi[] = Array.from({ length: 60 }, (_, i) => ({
  can: THIEN_CAN_THEO_THU_TU[i % 10]!,
  chi: DIA_CHI_THEO_THU_TU[i % 12]!,
}));

const ORACLE_THO_PHU_TIN: Readonly<Record<DiaChi, DiaChi>> = {
  [DAN]: SUU,
  [MAO]: TI,
  [THIN]: DAU,
  [TI]: DAN,
  [NGO]: NGO,
  [MUI]: TUAT,
  [THAN]: MAO,
  [DAU]: MUI,
  [TUAT]: HOI,
  [HOI]: THIN,
  [TY]: THAN,
  [SUU]: TY,
};

const ORACLE_DIA_NANG: Readonly<Record<DiaChi, ReadonlySet<string>>> = {
  [DAN]: tap([CANH, TY], [CANH, NGO]),
  [MAO]: tap([AT, MUI], [QUY, SUU]),
  [THIN]: tap([GIAP, TY], [NHAM, NGO]),
  [TI]: tap([KY, MAO], [KY, DAU]),
  [NGO]: tap([NHAM, TUAT], [GIAP, THIN]),
  [MUI]: tap([BINH, THIN], [BINH, TUAT]),
  [THAN]: tap([DINH, TI], [DINH, HOI]),
  [DAU]: tap([BINH, DAN], [BINH, THAN]),
  [TUAT]: tap([TAN, SUU], [TAN, MUI]),
  [HOI]: tap([MAU, DAN], [MAU, THAN]),
  [TY]: tap([TAN, MAO], [TAN, DAU]),
  [SUU]: tap([QUY, DAU], [AT, MAO]),
};

describe('Thổ Phù 土符 — independent 12 x 12 oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = ORACLE_THO_PHU_TIN[chiThang] === chiNgay;

      it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'} Tho Phu 土符`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: ThienCan.GIAP,
          chiNgay,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.THO_PHU_TIN)).toBe(nenCo);
      });
    }
  }

  it('mỗi tháng có đúng một Chi ngày', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      expect(
        DIA_CHI_THEO_THU_TU.filter((chiNgay) => ORACLE_THO_PHU_TIN[chiThang] === chiNgay),
      ).toHaveLength(1);
    }
  });
});

describe('Địa Nang — corrected Q6 table, 12 months x full 60 cycle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = ORACLE_DIA_NANG[chiThang].has(khoa(canChi.can, canChi.chi));

      it(`${chiThang} / ${canChi.can} ${canChi.chi}: ${nenCo ? 'co' : 'khong co'} Dia Nang`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.DIA_NANG)).toBe(nenCo);
      });
    }

    it(`${chiThang}: corrected source has exactly two Can Chi`, () => {
      expect(ORACLE_DIA_NANG[chiThang].size).toBe(2);
    });
  }

  it('guards corrected entries against old transmitted Lịch lệ errors', () => {
    expect(ORACLE_DIA_NANG[MAO].has(khoa(AT, MUI))).toBe(true);
    expect(ORACLE_DIA_NANG[MAO].has(khoa(QUY, MUI))).toBe(false);

    expect(ORACLE_DIA_NANG[THIN].has(khoa(NHAM, NGO))).toBe(true);
    expect(ORACLE_DIA_NANG[THIN].has(khoa(GIAP, DAN))).toBe(false);

    expect(ORACLE_DIA_NANG[TI].has(khoa(KY, DAU))).toBe(true);
    expect(ORACLE_DIA_NANG[TI].has(khoa(KY, SUU))).toBe(false);

    expect(ORACLE_DIA_NANG[MUI]).toEqual(tap([BINH, THIN], [BINH, TUAT]));
  });
});

describe('earthwork factor provenance', () => {
  const service = new TinhYeuToNgayService();

  it.each([
    [MaYeuTo.THO_PHU_TIN, DAN, GIAP, SUU],
    [MaYeuTo.DIA_NANG, DAN, CANH, TY],
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

function tap(...items: readonly [ThienCan, DiaChi][]): ReadonlySet<string> {
  return new Set(items.map(([can, chi]) => khoa(can, chi)));
}

function khoa(can: ThienCan, chi: DiaChi): string {
  return `${can}:${chi}`;
}
