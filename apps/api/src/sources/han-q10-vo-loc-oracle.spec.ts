import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { TietKhi } from '../calendar/domain/solar-term';
import { MaYeuTo } from '../factors/domain/factor-code';
import { laVoLoc } from '../factors/vo-loc-definition';

const { TY, SUU, DAN, THIN, TI, THAN, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;
const NONE = new Set<MaYeuTo>();
const BASE = {
  chiThang: TUAT,
  canNgay: GIAP,
  chiNgay: THIN,
  dangThoVuong: false,
  canChiNam: { can: CANH, chi: TY },
  canChiThang: { can: BINH, chi: TUAT },
  trungKhiHienHanh: TietKhi.THU_PHAN,
} as const;

describe('independent Hán Q10 oracle — 無禄日 WYG_010-67a..68b', () => {
  it.each([
    [NHAM, THAN, TietKhi.VU_THUY],
    [TAN, TI, TietKhi.COC_VU],
    [CANH, THIN, TietKhi.TIEU_MAN],
    [DINH, HOI, TietKhi.DAI_THU],
    [KY, SUU, TietKhi.DAI_THU],
    [BINH, THAN, TietKhi.XU_THU],
    [MAU, TUAT, TietKhi.XU_THU],
    [AT, TI, TietKhi.SUONG_GIANG],
    [GIAP, THIN, TietKhi.TIEU_TUYET],
  ] as const)('太陽填實: %s%s after %s is not 無禄', (canNgay, chiNgay, trungKhiHienHanh) => {
    expect(laVoLoc({ ...BASE, canNgay, chiNgay, trungKhiHienHanh }, NONE)).toBe(false);
  });

  it.each([
    [GIAP, HOI, KY, SUU],
    [CANH, TI, AT, TI],
    [BINH, DAN, TAN, TI],
    [NHAM, THAN, DINH, HOI],
  ] as const)(
    '歲德合月德合 meeting: %s year / %s month releases %s%s',
    (canNam, chiThang, canNgay, chiNgay) => {
      expect(
        laVoLoc(
          {
            ...BASE,
            chiThang,
            canNgay,
            chiNgay,
            canChiNam: { can: canNam, chi: TY },
            canChiThang: { can: MAU, chi: chiThang },
          },
          NONE,
        ),
      ).toBe(false);
    },
  );

  it.each([
    [CANH, HOI, CANH, THIN],
    [TAN, TI, BINH, THAN],
    [NHAM, DAN, NHAM, THAN],
    [QUY, THAN, MAU, TUAT],
  ] as const)(
    '天德合歲德 meeting: %s year / %s month releases %s%s',
    (canNam, chiThang, canNgay, chiNgay) => {
      expect(
        laVoLoc(
          {
            ...BASE,
            chiThang,
            canNgay,
            chiNgay,
            canChiNam: { can: canNam, chi: TY },
            canChiThang: { can: GIAP, chi: chiThang },
          },
          NONE,
        ),
      ).toBe(false);
    },
  );

  it('癸亥 干支俱盡 remains 無禄 despite every ordinary relief class', () => {
    expect(
      laVoLoc(
        {
          ...BASE,
          chiThang: TY,
          canNgay: QUY,
          chiNgay: HOI,
          canChiNam: { can: QUY, chi: TY },
          canChiThang: { can: QUY, chi: TY },
          trungKhiHienHanh: TietKhi.DONG_CHI,
        },
        new Set([MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC]),
      ),
    ).toBe(true);
  });
});
