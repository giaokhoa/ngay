import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

const ORACLE: Readonly<
  Record<MaYeuTo.DAI_THOI | MaYeuTo.THIEN_LAI | MaYeuTo.VANG_VONG, Readonly<Record<DiaChi, DiaChi>>>
> = {
  [MaYeuTo.DAI_THOI]: {
    [DAN]: MAO,
    [MAO]: TY,
    [THIN]: DAU,
    [TI]: NGO,
    [NGO]: MAO,
    [MUI]: TY,
    [THAN]: DAU,
    [DAU]: NGO,
    [TUAT]: MAO,
    [HOI]: TY,
    [TY]: DAU,
    [SUU]: NGO,
  },
  [MaYeuTo.THIEN_LAI]: {
    [DAN]: DAU,
    [MAO]: NGO,
    [THIN]: MAO,
    [TI]: TY,
    [NGO]: DAU,
    [MUI]: NGO,
    [THAN]: MAO,
    [DAU]: TY,
    [TUAT]: DAU,
    [HOI]: NGO,
    [TY]: MAO,
    [SUU]: TY,
  },
  [MaYeuTo.VANG_VONG]: {
    [DAN]: DAN,
    [MAO]: TI,
    [THIN]: THAN,
    [TI]: HOI,
    [NGO]: MAO,
    [MUI]: NGO,
    [THAN]: DAU,
    [DAU]: TY,
    [TUAT]: THIN,
    [HOI]: MUI,
    [TY]: TUAT,
    [SUU]: SUU,
  },
};

const MA = [MaYeuTo.DAI_THOI, MaYeuTo.THIEN_LAI, MaYeuTo.VANG_VONG] as const;

describe('Q6 wedding blockers — independent 12 x 12 oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const ma of MA) {
    describe(ma, () => {
      for (const chiThang of DIA_CHI_THEO_THU_TU) {
        for (const chiNgay of DIA_CHI_THEO_THU_TU) {
          const nenCo = ORACLE[ma][chiThang] === chiNgay;

          it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'} ${ma}`, () => {
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
  }

  it('mỗi factor có đúng một Chi ngày trong mỗi tháng', () => {
    for (const ma of MA) {
      for (const chiThang of DIA_CHI_THEO_THU_TU) {
        expect(
          DIA_CHI_THEO_THU_TU.filter((chiNgay) => ORACLE[ma][chiThang] === chiNgay),
        ).toHaveLength(1);
      }
    }
  });
});

describe('Vãng Vong identity guard', () => {
  it('oracle is month-branch based, not solar-term-offset based', () => {
    expect(ORACLE[MaYeuTo.VANG_VONG][DAN]).toBe(DAN);
    expect(ORACLE[MaYeuTo.VANG_VONG][MAO]).toBe(TI);
    expect(ORACLE[MaYeuTo.VANG_VONG][THIN]).toBe(THAN);
  });
});
