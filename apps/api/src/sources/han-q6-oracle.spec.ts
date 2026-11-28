import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import {
  DINH_NGHIA_DIA_NANG,
  DINH_NGHIA_THO_PHU_TIN,
} from '../factors/earthwork-factor-definitions';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DINH_NGHIA_YEU_TO_THEO_CHI_THANG } from '../factors/factor-definitions';
import { DINH_NGHIA_QUY_KY, DINH_NGHIA_THIEN_MA } from '../factors/moving-factor-definitions';
import { DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6 } from '../factors/q6-ritual-factor-definitions';
import { DINH_NGHIA_BLOCKER_CUOI_HOI_QUYEN_6 } from '../factors/q6-wedding-blocker-definitions';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

type BangHanQ6 = Readonly<Record<DiaChi, readonly DiaChi[]>>;

const HAN_Q6: Readonly<Partial<Record<MaYeuTo, BangHanQ6>>> = {
  [MaYeuTo.TAM_HOP]: {
    [DAN]: [NGO, TUAT],
    [MAO]: [MUI, HOI],
    [THIN]: [TY, THAN],
    [TI]: [SUU, DAU],
    [NGO]: [DAN, TUAT],
    [MUI]: [MAO, HOI],
    [THAN]: [TY, THIN],
    [DAU]: [SUU, TI],
    [TUAT]: [DAN, NGO],
    [HOI]: [MAO, MUI],
    [TY]: [THIN, THAN],
    [SUU]: [TI, DAU],
  },
  [MaYeuTo.DICH_MA]: {
    [DAN]: [THAN],
    [MAO]: [TI],
    [THIN]: [DAN],
    [TI]: [HOI],
    [NGO]: [THAN],
    [MUI]: [TI],
    [THAN]: [DAN],
    [DAU]: [HOI],
    [TUAT]: [THAN],
    [HOI]: [TI],
    [TY]: [DAN],
    [SUU]: [HOI],
  },
  [MaYeuTo.KIEP_SAT]: {
    [DAN]: [HOI],
    [MAO]: [THAN],
    [THIN]: [TI],
    [TI]: [DAN],
    [NGO]: [HOI],
    [MUI]: [THAN],
    [THAN]: [TI],
    [DAU]: [DAN],
    [TUAT]: [HOI],
    [HOI]: [THAN],
    [TY]: [TI],
    [SUU]: [DAN],
  },
  [MaYeuTo.TAI_SAT]: {
    [DAN]: [TY],
    [MAO]: [DAU],
    [THIN]: [NGO],
    [TI]: [MAO],
    [NGO]: [TY],
    [MUI]: [DAU],
    [THAN]: [NGO],
    [DAU]: [MAO],
    [TUAT]: [TY],
    [HOI]: [DAU],
    [TY]: [NGO],
    [SUU]: [MAO],
  },
  [MaYeuTo.NGUYET_SAT]: {
    [DAN]: [SUU],
    [MAO]: [TUAT],
    [THIN]: [MUI],
    [TI]: [THIN],
    [NGO]: [SUU],
    [MUI]: [TUAT],
    [THAN]: [MUI],
    [DAU]: [THIN],
    [TUAT]: [SUU],
    [HOI]: [TUAT],
    [TY]: [MUI],
    [SUU]: [THIN],
  },
  [MaYeuTo.NGUYET_HINH]: {
    [DAN]: [TI],
    [MAO]: [TY],
    [THIN]: [THIN],
    [TI]: [THAN],
    [NGO]: [NGO],
    [MUI]: [SUU],
    [THAN]: [DAN],
    [DAU]: [DAU],
    [TUAT]: [MUI],
    [HOI]: [HOI],
    [TY]: [MAO],
    [SUU]: [TUAT],
  },
  [MaYeuTo.NGUYET_HAI]: {
    [DAN]: [TI],
    [MAO]: [THIN],
    [THIN]: [MAO],
    [TI]: [DAN],
    [NGO]: [SUU],
    [MUI]: [TY],
    [THAN]: [HOI],
    [DAU]: [TUAT],
    [TUAT]: [DAU],
    [HOI]: [THAN],
    [TY]: [MUI],
    [SUU]: [NGO],
  },
  [MaYeuTo.LUC_HOP]: {
    [DAN]: [HOI],
    [MAO]: [TUAT],
    [THIN]: [DAU],
    [TI]: [THAN],
    [NGO]: [MUI],
    [MUI]: [NGO],
    [THAN]: [TI],
    [DAU]: [THIN],
    [TUAT]: [MAO],
    [HOI]: [DAN],
    [TY]: [SUU],
    [SUU]: [TY],
  },
  [MaYeuTo.NGU_PHU]: {
    [DAN]: [HOI],
    [MAO]: [DAN],
    [THIN]: [TI],
    [TI]: [THAN],
    [NGO]: [HOI],
    [MUI]: [DAN],
    [THAN]: [TI],
    [DAU]: [THAN],
    [TUAT]: [HOI],
    [HOI]: [DAN],
    [TY]: [TI],
    [SUU]: [THAN],
  },
  [MaYeuTo.THIEN_THUONG]: {
    [DAN]: [DAN],
    [MAO]: [SUU],
    [THIN]: [TY],
    [TI]: [HOI],
    [NGO]: [TUAT],
    [MUI]: [DAU],
    [THAN]: [THAN],
    [DAU]: [MUI],
    [TUAT]: [NGO],
    [HOI]: [TI],
    [TY]: [THIN],
    [SUU]: [MAO],
  },
  [MaYeuTo.THIEN_TAC]: {
    [DAN]: [SUU],
    [MAO]: [TY],
    [THIN]: [HOI],
    [TI]: [TUAT],
    [NGO]: [DAU],
    [MUI]: [THAN],
    [THAN]: [MUI],
    [DAU]: [NGO],
    [TUAT]: [TI],
    [HOI]: [THIN],
    [TY]: [MAO],
    [SUU]: [DAN],
  },
};

describe('independent Hán Q6 oracle — WYG / Kanripo KR3g0051', () => {
  it.each(Object.entries(HAN_Q6))('%s matches Hán Q6 month->day-branch table', (ma, expected) => {
    const actual = DINH_NGHIA_YEU_TO_THEO_CHI_THANG.find((item) => item.ma === ma);

    expect(actual?.chiNgayTheoChiThang).toEqual(expected);
  });

  it('covers every implemented core Q6 definition', () => {
    expect(new Set(Object.keys(HAN_Q6))).toEqual(
      new Set(DINH_NGHIA_YEU_TO_THEO_CHI_THANG.map((item) => item.ma)),
    );
  });
});

const HAN_Q6_RITUAL_MONTHLY: Readonly<Record<string, BangHanQ6>> = {
  [MaYeuTo.PHO_HO]: {
    [DAN]: [THAN],
    [MAO]: [DAN],
    [THIN]: [DAU],
    [TI]: [MAO],
    [NGO]: [TUAT],
    [MUI]: [THIN],
    [THAN]: [HOI],
    [DAU]: [TI],
    [TUAT]: [TY],
    [HOI]: [NGO],
    [TY]: [SUU],
    [SUU]: [MUI],
  },
  [MaYeuTo.PHUC_SINH]: {
    [DAN]: [DAU],
    [MAO]: [MAO],
    [THIN]: [TUAT],
    [TI]: [THIN],
    [NGO]: [HOI],
    [MUI]: [TI],
    [THAN]: [TY],
    [DAU]: [NGO],
    [TUAT]: [SUU],
    [HOI]: [MUI],
    [TY]: [DAN],
    [SUU]: [THAN],
  },
  [MaYeuTo.THANH_TAM]: {
    [DAN]: [HOI],
    [MAO]: [TI],
    [THIN]: [TY],
    [TI]: [NGO],
    [NGO]: [SUU],
    [MUI]: [MUI],
    [THAN]: [DAN],
    [DAU]: [THAN],
    [TUAT]: [MAO],
    [HOI]: [DAU],
    [TY]: [THIN],
    [SUU]: [TUAT],
  },
  [MaYeuTo.ICH_HAU]: {
    [DAN]: [TY],
    [MAO]: [NGO],
    [THIN]: [SUU],
    [TI]: [MUI],
    [NGO]: [DAN],
    [MUI]: [THAN],
    [THAN]: [MAO],
    [DAU]: [DAU],
    [TUAT]: [THIN],
    [HOI]: [TUAT],
    [TY]: [TI],
    [SUU]: [HOI],
  },
  [MaYeuTo.TUC_THE]: {
    [DAN]: [SUU],
    [MAO]: [MUI],
    [THIN]: [DAN],
    [TI]: [THAN],
    [NGO]: [MAO],
    [MUI]: [DAU],
    [THAN]: [THIN],
    [DAU]: [TUAT],
    [TUAT]: [TI],
    [HOI]: [HOI],
    [TY]: [NGO],
    [SUU]: [TY],
  },
};

const HAN_Q6_PRODUCTION_MONTHLY: Readonly<Record<string, BangHanQ6>> = {
  [MaYeuTo.DAI_THOI]: {
    [DAN]: [MAO],
    [MAO]: [TY],
    [THIN]: [DAU],
    [TI]: [NGO],
    [NGO]: [MAO],
    [MUI]: [TY],
    [THAN]: [DAU],
    [DAU]: [NGO],
    [TUAT]: [MAO],
    [HOI]: [TY],
    [TY]: [DAU],
    [SUU]: [NGO],
  },
  [MaYeuTo.THIEN_LAI]: {
    [DAN]: [DAU],
    [MAO]: [NGO],
    [THIN]: [MAO],
    [TI]: [TY],
    [NGO]: [DAU],
    [MUI]: [NGO],
    [THAN]: [MAO],
    [DAU]: [TY],
    [TUAT]: [DAU],
    [HOI]: [NGO],
    [TY]: [MAO],
    [SUU]: [TY],
  },
  [MaYeuTo.VANG_VONG]: {
    [DAN]: [DAN],
    [MAO]: [TI],
    [THIN]: [THAN],
    [TI]: [HOI],
    [NGO]: [MAO],
    [MUI]: [NGO],
    [THAN]: [DAU],
    [DAU]: [TY],
    [TUAT]: [THIN],
    [HOI]: [MUI],
    [TY]: [TUAT],
    [SUU]: [SUU],
  },
  [MaYeuTo.THIEN_MA]: {
    [DAN]: [NGO],
    [MAO]: [THAN],
    [THIN]: [TUAT],
    [TI]: [TY],
    [NGO]: [DAN],
    [MUI]: [THIN],
    [THAN]: [NGO],
    [DAU]: [THAN],
    [TUAT]: [TUAT],
    [HOI]: [TY],
    [TY]: [DAN],
    [SUU]: [THIN],
  },
  [MaYeuTo.QUY_KY]: {
    [DAN]: [SUU],
    [MAO]: [DAN],
    [THIN]: [TY],
    [TI]: [SUU],
    [NGO]: [DAN],
    [MUI]: [TY],
    [THAN]: [SUU],
    [DAU]: [DAN],
    [TUAT]: [TY],
    [HOI]: [SUU],
    [TY]: [DAN],
    [SUU]: [TY],
  },
  [MaYeuTo.THO_PHU_TIN]: {
    [DAN]: [SUU],
    [MAO]: [TI],
    [THIN]: [DAU],
    [TI]: [DAN],
    [NGO]: [NGO],
    [MUI]: [TUAT],
    [THAN]: [MAO],
    [DAU]: [MUI],
    [TUAT]: [HOI],
    [HOI]: [THIN],
    [TY]: [THAN],
    [SUU]: [TY],
  },
};

const HAN_Q6_DIA_NANG = {
  [DAN]: [
    [CANH, TY],
    [CANH, NGO],
  ],
  [MAO]: [
    [AT, MUI],
    [QUY, SUU],
  ],
  [THIN]: [
    [GIAP, TY],
    [NHAM, NGO],
  ],
  [TI]: [
    [KY, MAO],
    [KY, DAU],
  ],
  [NGO]: [
    [NHAM, TUAT],
    [GIAP, THIN],
  ],
  [MUI]: [
    [BINH, THIN],
    [BINH, TUAT],
  ],
  [THAN]: [
    [DINH, TI],
    [DINH, HOI],
  ],
  [DAU]: [
    [BINH, DAN],
    [BINH, THAN],
  ],
  [TUAT]: [
    [TAN, SUU],
    [TAN, MUI],
  ],
  [HOI]: [
    [MAU, DAN],
    [MAU, THAN],
  ],
  [TY]: [
    [TAN, MAO],
    [TAN, DAU],
  ],
  [SUU]: [
    [QUY, DAU],
    [AT, MAO],
  ],
} as const;

function productionQ6Monthly() {
  return [
    ...DINH_NGHIA_BLOCKER_CUOI_HOI_QUYEN_6,
    ...DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6,
    DINH_NGHIA_THIEN_MA,
    DINH_NGHIA_QUY_KY,
    DINH_NGHIA_THO_PHU_TIN,
  ];
}

describe('independent Hán Q6 oracle — ritual monthly factors', () => {
  it.each(Object.entries(HAN_Q6_RITUAL_MONTHLY))(
    '%s matches exact Hán Q6 month→day-branch table',
    (ma, expected) => {
      const actual = DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6.find((item) => item.ma === ma);
      expect(actual?.chiNgayTheoChiThang).toEqual(expected);
    },
  );

  it('covers exactly 福生 聖心 益後 續世 and no inferred 血忌 alias', () => {
    expect(new Set(DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6.map((item) => item.ma))).toEqual(
      new Set([
        MaYeuTo.PHO_HO,
        MaYeuTo.PHUC_SINH,
        MaYeuTo.THANH_TAM,
        MaYeuTo.ICH_HAU,
        MaYeuTo.TUC_THE,
      ]),
    );
    expect(
      DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6.find((item) => item.ma === MaYeuTo.TUC_THE)?.tenKhac,
    ).toEqual([]);
  });
});

describe('independent Hán Q6 oracle — production factors beyond core batch', () => {
  it.each(Object.entries(HAN_Q6_PRODUCTION_MONTHLY))(
    '%s matches explicit Hán Q6 rule',
    (ma, expected) => {
      const actual = productionQ6Monthly().find((item) => item.ma === ma);
      expect(actual?.chiNgayTheoChiThang).toEqual(expected);
    },
  );

  it('地囊 uses the corrected table in 按, not the corrupted 歴例 table', () => {
    const actual = Object.fromEntries(
      Object.entries(DINH_NGHIA_DIA_NANG.tapCanChiNgayTheoChiThang).map(([chiThang, values]) => [
        chiThang,
        values.map((value) => [value.can, value.chi]),
      ]),
    );
    expect(actual).toEqual(HAN_Q6_DIA_NANG);
  });

  it('locks distinguishing Hán vectors that the corrupted 地囊 table gets wrong', () => {
    expect(HAN_Q6_DIA_NANG[MAO]).toContainEqual([AT, MUI]);
    expect(HAN_Q6_DIA_NANG[MAO]).not.toContainEqual([QUY, MUI]);
    expect(HAN_Q6_DIA_NANG[THIN]).toContainEqual([NHAM, NGO]);
    expect(HAN_Q6_DIA_NANG[THIN]).not.toContainEqual([GIAP, DAN]);
    expect(HAN_Q6_DIA_NANG[SUU]).toContainEqual([AT, MAO]);
    expect(HAN_Q6_DIA_NANG[SUU]).not.toContainEqual([AT, MUI]);
  });
});
