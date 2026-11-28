import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { Mua } from '../calendar/domain/season';
import {
  DINH_NGHIA_O_PHE,
  DINH_NGHIA_O_PHE_DOI,
  DINH_NGHIA_PHUC_NHAT,
  DINH_NGHIA_TRONG_NHAT,
} from '../factors/an-tang-factor-definitions';
import {
  DINH_NGHIA_THIEN_AN,
  DINH_NGHIA_THIEN_NGUYEN,
  DINH_NGHIA_THIEN_XA,
  DINH_NGHIA_THOI_DUC,
  DINH_NGHIA_TU_TUONG,
} from '../factors/fixed-seasonal-factor-definitions';
import { DINH_NGHIA_THIEN_DUC } from '../factors/heavenly-virtue-definition';
import { DINH_NGHIA_MAU_THUONG } from '../factors/maternal-storehouse-definition';
import {
  DINH_NGHIA_NGU_HOP,
  DINH_NGHIA_NGU_LY,
} from '../factors/q5-fixed-branch-factor-definitions';
import { DINH_NGHIA_YEU_TO_THEO_CAN_NGAY } from '../factors/monthly-stem-factor-definitions';
import { DINH_NGHIA_DAN_NHAT, DINH_NGHIA_VUONG_NHAT } from '../factors/moving-factor-definitions';
import {
  DINH_NGHIA_BAT_CHUYEN,
  DINH_NGHIA_NGU_MO,
  DINH_NGHIA_TU_CUNG,
  DINH_NGHIA_TU_KY,
  DINH_NGHIA_TU_PHE,
} from '../factors/q5-wedding-blocker-definitions';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DINH_NGHIA_CUU_KHONG, DINH_NGHIA_TU_HAO } from '../factors/khai-truong-factor-definitions';
import { MaQuaiThienDuc } from '../factors/domain/heavenly-virtue-position';
import { CAC_NGAY_CANDIDATE_VO_LOC } from '../factors/vo-loc-definition';
import { DINH_NGHIA_GIAI_THAN } from '../factors/q5-giai-than-definition';
import { CHI_NGAY_NGU_HU_THEO_MUA } from '../factors/q5-ngu-hu-definition';
import {
  DINH_NGHIA_BAT_PHONG,
  DINH_NGHIA_CUU_KHAM,
  DINH_NGHIA_XUC_THUY_LONG,
} from '../factors/q5-water-travel-factor-definitions';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

const HAN_Q5_MONTHLY_STEMS = {
  [MaYeuTo.NGUYET_DUC]: {
    [DAN]: BINH,
    [MAO]: GIAP,
    [THIN]: NHAM,
    [TI]: CANH,
    [NGO]: BINH,
    [MUI]: GIAP,
    [THAN]: NHAM,
    [DAU]: CANH,
    [TUAT]: BINH,
    [HOI]: GIAP,
    [TY]: NHAM,
    [SUU]: CANH,
  },
  [MaYeuTo.THIEN_DUC_HOP]: {
    [DAN]: NHAM,
    [THIN]: DINH,
    [TI]: BINH,
    [MUI]: KY,
    [THAN]: MAU,
    [TUAT]: TAN,
    [HOI]: CANH,
    [SUU]: AT,
  },
  [MaYeuTo.NGUYET_DUC_HOP]: {
    [DAN]: TAN,
    [MAO]: KY,
    [THIN]: DINH,
    [TI]: AT,
    [NGO]: TAN,
    [MUI]: KY,
    [THAN]: DINH,
    [DAU]: AT,
    [TUAT]: TAN,
    [HOI]: KY,
    [TY]: DINH,
    [SUU]: AT,
  },
  [MaYeuTo.NGUYET_KHONG]: {
    [DAN]: NHAM,
    [MAO]: CANH,
    [THIN]: BINH,
    [TI]: GIAP,
    [NGO]: NHAM,
    [MUI]: CANH,
    [THAN]: BINH,
    [DAU]: GIAP,
    [TUAT]: NHAM,
    [HOI]: CANH,
    [TY]: BINH,
    [SUU]: GIAP,
  },
  [MaYeuTo.NGUYET_AN]: {
    [DAN]: BINH,
    [MAO]: DINH,
    [THIN]: CANH,
    [TI]: KY,
    [NGO]: MAU,
    [MUI]: TAN,
    [THAN]: NHAM,
    [DAU]: QUY,
    [TUAT]: CANH,
    [HOI]: AT,
    [TY]: GIAP,
    [SUU]: TAN,
  },
} as const;

describe('independent Hán Q5 oracle — WYG / Kanripo KR3g0051', () => {
  it('天徳 matches the Hán month sequence including four trigram months', () => {
    expect(DINH_NGHIA_THIEN_DUC.canNgayTheoChiThang).toEqual({
      [DAN]: DINH,
      [THIN]: NHAM,
      [TI]: TAN,
      [MUI]: GIAP,
      [THAN]: QUY,
      [TUAT]: BINH,
      [HOI]: AT,
      [SUU]: CANH,
    });
    expect(
      Object.fromEntries(
        Object.entries(DINH_NGHIA_THIEN_DUC.quaiTheoChiThang).map(([chi, quai]) => [chi, quai?.ma]),
      ),
    ).toEqual({
      [MAO]: MaQuaiThienDuc.KHON,
      [NGO]: MaQuaiThienDuc.CAN_THIEN,
      [DAU]: MaQuaiThienDuc.CAN_SON,
      [TY]: MaQuaiThienDuc.TON,
    });
  });

  it.each(Object.entries(HAN_Q5_MONTHLY_STEMS))(
    '%s matches Hán Q5 month->stem formula',
    (ma, expected) => {
      const actual = DINH_NGHIA_YEU_TO_THEO_CAN_NGAY.find((item) => item.ma === ma);
      expect(actual?.canNgayTheoChiThang).toEqual(expected);
    },
  );

  it('天恩 matches the Hán 15 fixed Can-Chi days', () => {
    expect(DINH_NGHIA_THIEN_AN.canChiNgay.map(khoaCanChi)).toEqual([
      'GIAP:TY',
      'AT:SUU',
      'BINH:DAN',
      'DINH:MAO',
      'MAU:THIN',
      'KY:MAO',
      'CANH:THIN',
      'TAN:TI',
      'NHAM:NGO',
      'QUY:MUI',
      'KY:DAU',
      'CANH:TUAT',
      'TAN:HOI',
      'NHAM:TY',
      'QUY:SUU',
    ]);
  });

  it('天赦 matches 春戊寅 夏甲午 秋戊申 冬甲子', () => {
    expect(
      Object.fromEntries(
        Object.entries(DINH_NGHIA_THIEN_XA.canChiNgayTheoMua).map(([mua, canChi]) => [
          mua,
          khoaCanChi(canChi),
        ]),
      ),
    ).toEqual({
      [Mua.XUAN]: 'MAU:DAN',
      [Mua.HA]: 'GIAP:NGO',
      [Mua.THU]: 'MAU:THAN',
      [Mua.DONG]: 'GIAP:TY',
    });
  });

  it('天願 matches the twelve Hán monthly Can-Chi entries', () => {
    expect(
      Object.fromEntries(
        Object.entries(DINH_NGHIA_THIEN_NGUYEN.canChiNgayTheoChiThang).map(([chi, canChi]) => [
          chi,
          khoaCanChi(canChi),
        ]),
      ),
    ).toEqual({
      [DAN]: 'GIAP:NGO',
      [MAO]: 'GIAP:TUAT',
      [THIN]: 'AT:DAU',
      [TI]: 'BINH:TY',
      [NGO]: 'DINH:SUU',
      [MUI]: 'MAU:NGO',
      [THAN]: 'GIAP:DAN',
      [DAU]: 'BINH:THIN',
      [TUAT]: 'TAN:MAO',
      [HOI]: 'MAU:THIN',
      [TY]: 'GIAP:TY',
      [SUU]: 'QUY:MUI',
    });
  });

  it('母倉 matches the Hán seasonal branches and 土王後 巳午 override', () => {
    expect(DINH_NGHIA_MAU_THUONG.chiNgayTheoMua).toEqual({
      [Mua.XUAN]: [HOI, TY],
      [Mua.HA]: [DAN, MAO],
      [Mua.THU]: [THIN, TUAT, SUU, MUI],
      [Mua.DONG]: [THAN, DAU],
    });
    expect(DINH_NGHIA_MAU_THUONG.chiNgayKhiThoVuong).toEqual([TI, NGO]);
  });

  it('四相 and 時徳 match the Hán seasonal formulas', () => {
    expect(DINH_NGHIA_TU_TUONG.canNgayTheoMua).toEqual({
      [Mua.XUAN]: [BINH, DINH],
      [Mua.HA]: [MAU, KY],
      [Mua.THU]: [NHAM, QUY],
      [Mua.DONG]: [GIAP, AT],
    });
    expect(DINH_NGHIA_THOI_DUC.chiNgayTheoMua).toEqual({
      [Mua.XUAN]: NGO,
      [Mua.HA]: THIN,
      [Mua.THU]: TY,
      [Mua.DONG]: DAN,
    });
  });

  it('九坎 matches the corrected Q5 month sequence', () => {
    expect(
      Object.fromEntries(
        Object.entries(DINH_NGHIA_CUU_KHAM.chiNgayTheoChiThang).map(([month, branches]) => [
          month,
          branches[0],
        ]),
      ),
    ).toEqual({
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
    });
  });

  it('八風 uses the Q5 corrected eight seasonal Can-Chi days', () => {
    expect(
      Object.fromEntries(
        Object.entries(DINH_NGHIA_BAT_PHONG.tapCanChiNgayTheoMua).map(([mua, entries]) => [
          mua,
          entries.map(khoaCanChi),
        ]),
      ),
    ).toEqual({
      [Mua.XUAN]: ['DINH:SUU', 'DINH:TI'],
      [Mua.HA]: ['GIAP:THAN', 'GIAP:THIN'],
      [Mua.THU]: ['DINH:MUI', 'DINH:HOI'],
      [Mua.DONG]: ['GIAP:TUAT', 'GIAP:DAN'],
    });
  });

  it('觸水龍 matches 丙子 癸未 癸丑', () => {
    expect(DINH_NGHIA_XUC_THUY_LONG.canChiNgay.map(khoaCanChi)).toEqual([
      'BINH:TY',
      'QUY:MUI',
      'QUY:SUU',
    ]);
  });

  it('五虚 matches 春巳酉丑 夏申子辰 秋亥卯未 冬寅午戌', () => {
    expect(CHI_NGAY_NGU_HU_THEO_MUA).toEqual({
      [Mua.XUAN]: [TI, DAU, SUU],
      [Mua.HA]: [THAN, TY, THIN],
      [Mua.THU]: [HOI, MAO, MUI],
      [Mua.DONG]: [DAN, NGO, TUAT],
    });
  });

  it('王日 and 民日 match the original Hán positions, not the later swap', () => {
    expect(DINH_NGHIA_VUONG_NHAT.chiNgayTheoMua).toEqual({
      [Mua.XUAN]: DAN,
      [Mua.HA]: TI,
      [Mua.THU]: THAN,
      [Mua.DONG]: HOI,
    });
    expect(DINH_NGHIA_DAN_NHAT.chiNgayTheoMua).toEqual({
      [Mua.XUAN]: NGO,
      [Mua.HA]: DAU,
      [Mua.THU]: TY,
      [Mua.DONG]: MAO,
    });
  });

  it('無禄 locks the exact ten Q5 candidate days without turning them into unconditional blockers', () => {
    expect(CAC_NGAY_CANDIDATE_VO_LOC.map((item) => khoaCanChi(item))).toEqual([
      'GIAP:THIN',
      'AT:TI',
      'CANH:THIN',
      'TAN:TI',
      'BINH:THAN',
      'MAU:TUAT',
      'DINH:HOI',
      'KY:SUU',
      'NHAM:THAN',
      'QUY:HOI',
    ]);
  });

  it('解神 matches 正二申 三四戌 五六子 七八寅 九十辰 十一十二午', () => {
    expect(DINH_NGHIA_GIAI_THAN.chiNgayTheoChiThang).toEqual({
      [DAN]: [THAN],
      [MAO]: [THAN],
      [THIN]: [TUAT],
      [TI]: [TUAT],
      [NGO]: [TY],
      [MUI]: [TY],
      [THAN]: [DAN],
      [DAU]: [DAN],
      [TUAT]: [THIN],
      [HOI]: [THIN],
      [TY]: [NGO],
      [SUU]: [NGO],
    });
  });

  it('五合 / 五離 match Hán Q5 + Q9 fixed branch oracle', () => {
    expect(DINH_NGHIA_NGU_HOP.chiNgay).toEqual([DAN, MAO]);
    expect(DINH_NGHIA_NGU_LY.chiNgay).toEqual([THAN, DAU]);
    expect(DINH_NGHIA_NGU_LY.tenKhac).toContain('Trừ Thần');
  });

  it('九空 matches 正月辰逆行四季', () => {
    expect(DINH_NGHIA_CUU_KHONG.chiNgayTheoChiThang).toEqual({
      [DAN]: [THIN],
      [MAO]: [SUU],
      [THIN]: [TUAT],
      [TI]: [MUI],
      [NGO]: [THIN],
      [MUI]: [SUU],
      [THAN]: [TUAT],
      [DAU]: [MUI],
      [TUAT]: [THIN],
      [HOI]: [SUU],
      [TY]: [TUAT],
      [SUU]: [MUI],
    });
  });

  it('四耗 matches 春壬子 夏乙卯 秋戊午 冬辛酉', () => {
    expect(mapCanChiTheoMua(DINH_NGHIA_TU_HAO.canChiNgayTheoMua)).toEqual({
      [Mua.XUAN]: 'NHAM:TY',
      [Mua.HA]: 'AT:MAO',
      [Mua.THU]: 'MAU:NGO',
      [Mua.DONG]: 'TAN:DAU',
    });
  });

  it('四廢 matches Hán Q5 seasonal Can-Chi pairs', () => {
    expect(
      Object.fromEntries(
        Object.entries(DINH_NGHIA_TU_PHE.tapCanChiNgayTheoMua).map(([mua, values]) => [
          mua,
          values.map(khoaCanChi),
        ]),
      ),
    ).toEqual({
      [Mua.XUAN]: ['CANH:THAN', 'TAN:DAU'],
      [Mua.HA]: ['NHAM:TY', 'QUY:HOI'],
      [Mua.THU]: ['GIAP:DAN', 'AT:MAO'],
      [Mua.DONG]: ['BINH:NGO', 'DINH:TI'],
    });
  });

  it('四忌 and 四窮 match Hán Q5 seasonal Can-Chi days', () => {
    expect(mapCanChiTheoMua(DINH_NGHIA_TU_KY.canChiNgayTheoMua)).toEqual({
      [Mua.XUAN]: 'GIAP:TY',
      [Mua.HA]: 'BINH:TY',
      [Mua.THU]: 'CANH:TY',
      [Mua.DONG]: 'NHAM:TY',
    });
    expect(mapCanChiTheoMua(DINH_NGHIA_TU_CUNG.canChiNgayTheoMua)).toEqual({
      [Mua.XUAN]: 'AT:HOI',
      [Mua.HA]: 'DINH:HOI',
      [Mua.THU]: 'TAN:HOI',
      [Mua.DONG]: 'QUY:HOI',
    });
  });

  it('五墓 matches the Hán monthly grouping', () => {
    expect(
      Object.fromEntries(
        Object.entries(DINH_NGHIA_NGU_MO.canChiNgayTheoChiThang).map(([chi, canChi]) => [
          chi,
          khoaCanChi(canChi),
        ]),
      ),
    ).toEqual({
      [DAN]: 'AT:MUI',
      [MAO]: 'AT:MUI',
      [THIN]: 'MAU:THIN',
      [TI]: 'BINH:TUAT',
      [NGO]: 'BINH:TUAT',
      [MUI]: 'MAU:THIN',
      [THAN]: 'TAN:SUU',
      [DAU]: 'TAN:SUU',
      [TUAT]: 'MAU:THIN',
      [HOI]: 'NHAM:THIN',
      [TY]: 'NHAM:THIN',
      [SUU]: 'MAU:THIN',
    });
  });

  it('八專 matches the five Hán days', () => {
    expect(DINH_NGHIA_BAT_CHUYEN.canChiNgay.map(khoaCanChi)).toEqual([
      'DINH:MUI',
      'KY:MUI',
      'CANH:THAN',
      'GIAP:DAN',
      'QUY:SUU',
    ]);
  });

  it('復日 matches the Hán 12-month stem formula', () => {
    expect(DINH_NGHIA_PHUC_NHAT.canNgayTheoChiThang).toEqual({
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
    });
  });

  it('鳴吠 uses the final Hán 起例/立成 13-day correction', () => {
    expect(DINH_NGHIA_O_PHE.canChiNgay.map(khoaCanChi)).toEqual([
      'GIAP:NGO',
      'BINH:NGO',
      'CANH:NGO',
      'NHAM:NGO',
      'GIAP:THAN',
      'BINH:THAN',
      'CANH:THAN',
      'NHAM:THAN',
      'AT:DAU',
      'DINH:DAU',
      'KY:DAU',
      'TAN:DAU',
      'QUY:DAU',
    ]);
    expect(DINH_NGHIA_O_PHE.canChiNgay.map(khoaCanChi)).not.toContain('CANH:DAN');
    expect(DINH_NGHIA_O_PHE.canChiNgay.map(khoaCanChi)).not.toContain('NHAM:DAN');
  });

  it('鳴吠對 uses the final Hán 起例/立成 11-day correction', () => {
    expect(DINH_NGHIA_O_PHE_DOI.canChiNgay.map(khoaCanChi)).toEqual([
      'BINH:TY',
      'CANH:TY',
      'NHAM:TY',
      'GIAP:DAN',
      'BINH:DAN',
      'CANH:DAN',
      'NHAM:DAN',
      'AT:MAO',
      'DINH:MAO',
      'TAN:MAO',
      'QUY:MAO',
    ]);
    expect(DINH_NGHIA_O_PHE_DOI.canChiNgay.map(khoaCanChi)).not.toContain('GIAP:TY');
    expect(DINH_NGHIA_O_PHE_DOI.canChiNgay.map(khoaCanChi)).not.toContain('GIAP:NGO');
  });

  it('重日 resolves the 己/巳 transcription ambiguity contextually as Tỵ + Hợi', () => {
    expect(DINH_NGHIA_TRONG_NHAT.chiNgay).toEqual([TI, HOI]);
  });
});

function khoaCanChi(value: { can: ThienCan; chi: DiaChi }): string {
  return value.can + ':' + value.chi;
}

function mapCanChiTheoMua(
  value: Readonly<Record<Mua, { can: ThienCan; chi: DiaChi }>>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(value).map(([mua, canChi]) => [mua, khoaCanChi(canChi)]),
  );
}
