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

const ORACLE_O_PHE = new Set([
  khoa(GIAP, NGO),
  khoa(BINH, NGO),
  khoa(CANH, NGO),
  khoa(NHAM, NGO),
  khoa(GIAP, THAN),
  khoa(BINH, THAN),
  khoa(CANH, THAN),
  khoa(NHAM, THAN),
  khoa(AT, DAU),
  khoa(DINH, DAU),
  khoa(KY, DAU),
  khoa(TAN, DAU),
  khoa(QUY, DAU),
]);

const ORACLE_O_PHE_DOI = new Set([
  khoa(BINH, TY),
  khoa(CANH, TY),
  khoa(NHAM, TY),
  khoa(GIAP, DAN),
  khoa(BINH, DAN),
  khoa(CANH, DAN),
  khoa(NHAM, DAN),
  khoa(AT, MAO),
  khoa(DINH, MAO),
  khoa(TAN, MAO),
  khoa(QUY, MAO),
]);

const ORACLE_PHUC_NHAT: Readonly<Record<DiaChi, ThienCan>> = {
  [DAN]: GIAP,
  [MAO]: AT,
  [THIN]: MAU,
  [TI]: BINH,
  [NGO]: DINH,
  [MUI]: KY,
  [THAN]: CANH,
  [DAU]: TAN,
  [TUAT]: MAU,
  [HOI]: NHAM,
  [TY]: QUY,
  [SUU]: KY,
};

const ORACLE_TRONG_NHAT = new Set<DiaChi>([TI, HOI]);

describe('Ô Phệ 鳴吠 — final 13-day Lập thành oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = ORACLE_O_PHE.has(khoa(canChi.can, canChi.chi));

      it(`${chiThang} / ${canChi.can} ${canChi.chi}: ${nenCo ? 'co' : 'khong co'} O Phe`, () => {
        const result = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
          dangThoVuong: false,
        });

        expect(result.some((factor) => factor.ma === MaYeuTo.O_PHE)).toBe(nenCo);
      });
    }
  }

  it('final source set has exactly 13 days', () => {
    expect(ORACLE_O_PHE.size).toBe(13);
  });

  it('includes Giáp Ngọ from final Lập thành', () => {
    expect(ORACLE_O_PHE.has(khoa(GIAP, NGO))).toBe(true);
  });

  it('rejects Canh Dần and Nhâm Dần from the older transmitted 14-day list', () => {
    expect(ORACLE_O_PHE.has(khoa(CANH, DAN))).toBe(false);
    expect(ORACLE_O_PHE.has(khoa(NHAM, DAN))).toBe(false);
  });
});

describe('Ô Phệ Đối 鳴吠對 — final 11-day Lập thành oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = ORACLE_O_PHE_DOI.has(khoa(canChi.can, canChi.chi));

      it(`${chiThang} / ${canChi.can} ${canChi.chi}: ${nenCo ? 'co' : 'khong co'} O Phe Doi`, () => {
        const result = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
          dangThoVuong: false,
        });
        expect(result.some((factor) => factor.ma === MaYeuTo.O_PHE_DOI)).toBe(nenCo);
      });
    }
  }

  it('final source set has exactly 11 days', () => {
    expect(ORACLE_O_PHE_DOI.size).toBe(11);
  });

  it('includes Canh Dần/Nhâm Dần and excludes transmitted-error Giáp Ngọ', () => {
    expect(ORACLE_O_PHE_DOI.has(khoa(CANH, DAN))).toBe(true);
    expect(ORACLE_O_PHE_DOI.has(khoa(NHAM, DAN))).toBe(true);
    expect(ORACLE_O_PHE_DOI.has(khoa(GIAP, NGO))).toBe(false);
  });

  it('excludes pure-yang Giáp Tý from final 11-day set', () => {
    expect(ORACLE_O_PHE_DOI.has(khoa(GIAP, TY))).toBe(false);
  });
});

describe('Phục Nhật 復日 — independent 12 x 10 month/stem oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const canNgay of THIEN_CAN_THEO_THU_TU) {
      const nenCo = ORACLE_PHUC_NHAT[chiThang] === canNgay;

      it(`${chiThang} / ${canNgay}: ${nenCo ? 'co' : 'khong co'} Phuc Nhat`, () => {
        const result = service.tinh({
          chiThang,
          canNgay,
          chiNgay: DAN,
          dangThoVuong: false,
        });

        expect(result.some((factor) => factor.ma === MaYeuTo.PHUC_NHAT)).toBe(nenCo);
      });
    }
  }

  it('has exactly one Phục stem per lunar month branch', () => {
    expect(Object.keys(ORACLE_PHUC_NHAT)).toHaveLength(12);
  });
});

describe('Trọng Nhật 重日 — independent 12 x 12 branch oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = ORACLE_TRONG_NHAT.has(chiNgay);

      it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'} Trong Nhat`, () => {
        const result = service.tinh({
          chiThang,
          canNgay: GIAP,
          chiNgay,
          dangThoVuong: false,
        });

        expect(result.some((factor) => factor.ma === MaYeuTo.TRONG_NHAT)).toBe(nenCo);
      });
    }
  }

  it('matches only Tỵ and Hợi', () => {
    expect([...ORACLE_TRONG_NHAT]).toEqual([TI, HOI]);
  });
});

describe('AN_TANG factor provenance', () => {
  const service = new TinhYeuToNgayService();

  it.each([
    [MaYeuTo.O_PHE, DAN, GIAP, NGO],
    [MaYeuTo.O_PHE_DOI, DAN, CANH, DAN],
    [MaYeuTo.PHUC_NHAT, DAN, GIAP, DAN],
    [MaYeuTo.TRONG_NHAT, DAN, GIAP, TI],
  ] as const)('%s keeps verified Việt + Hán refs', (ma, chiThang, canNgay, chiNgay) => {
    const factor = service
      .tinh({ chiThang, canNgay, chiNgay, dangThoVuong: false })
      .find((item) => item.ma === ma);

    expect(factor?.nguon).toHaveLength(2);
    expect(factor?.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
  });
});

function khoa(can: ThienCan, chi: DiaChi): string {
  return `${can}:${chi}`;
}
