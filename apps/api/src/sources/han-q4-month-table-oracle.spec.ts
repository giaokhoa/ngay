import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { tinhThapNhiTruc } from '../calendar/twelve-officer';
import { DINH_NGHIA_BAT_TUONG } from '../factors/bat-tuong-definition';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DINH_NGHIA_NGUYET_PHA } from '../factors/monthly-break-definition';
import { DINH_NGHIA_YEU_TO_QUAN_HE_THANG_QUYEN_4 } from '../factors/q4-shared-position-definitions';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

const TRUC_THEO_THU_TU: readonly ThapNhiTruc[] = [
  ThapNhiTruc.KIEN,
  ThapNhiTruc.TRU,
  ThapNhiTruc.MAN,
  ThapNhiTruc.BINH,
  ThapNhiTruc.DINH,
  ThapNhiTruc.CHAP,
  ThapNhiTruc.PHA,
  ThapNhiTruc.NGUY,
  ThapNhiTruc.THANH,
  ThapNhiTruc.THU,
  ThapNhiTruc.KHAI,
  ThapNhiTruc.BE,
];

const HAN_MONTH_POSITIONS = {
  [MaYeuTo.NGUYET_PHA]: {
    [DAN]: THAN,
    [MAO]: DAU,
    [THIN]: TUAT,
    [TI]: HOI,
    [NGO]: TY,
    [MUI]: SUU,
    [THAN]: DAN,
    [DAU]: MAO,
    [TUAT]: THIN,
    [HOI]: TI,
    [TY]: NGO,
    [SUU]: MUI,
  },
  [MaYeuTo.NGUYET_YEM]: {
    [DAN]: TUAT,
    [MAO]: DAU,
    [THIN]: THAN,
    [TI]: MUI,
    [NGO]: NGO,
    [MUI]: TI,
    [THAN]: THIN,
    [DAU]: MAO,
    [TUAT]: DAN,
    [HOI]: SUU,
    [TY]: TY,
    [SUU]: HOI,
  },
  [MaYeuTo.YEM_DOI]: {
    [DAN]: THIN,
    [MAO]: MAO,
    [THIN]: DAN,
    [TI]: SUU,
    [NGO]: TY,
    [MUI]: HOI,
    [THAN]: TUAT,
    [DAU]: DAU,
    [TUAT]: THAN,
    [HOI]: MUI,
    [TY]: NGO,
    [SUU]: TI,
  },
} as const;

const HAN_BAT_TUONG_THANG_DAN = [
  'TAN:HOI',
  'TAN:SUU',
  'TAN:MAO',
  'CANH:TY',
  'CANH:DAN',
  'KY:HOI',
  'KY:SUU',
  'KY:MAO',
  'DINH:HOI',
  'DINH:SUU',
  'DINH:MAO',
  'BINH:TY',
  'BINH:DAN',
] as const;

describe('independent Hán Q4 / 月表 oracle — WYG pinned corpus', () => {
  it('建除十二神 rotates from 建 at the month branch for all 12x12 combinations', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      const thangIndex = DIA_CHI_THEO_THU_TU.indexOf(chiThang);

      for (const chiNgay of DIA_CHI_THEO_THU_TU) {
        const ngayIndex = DIA_CHI_THEO_THU_TU.indexOf(chiNgay);
        const expected = TRUC_THEO_THU_TU[(ngayIndex - thangIndex + 12) % 12];

        expect(tinhThapNhiTruc(chiThang, chiNgay)).toBe(expected);
      }
    }
  });

  it('月破 matches the 12 月表 positions', () => {
    // Q20 WYG 019-2a gives 正月: 月建寅 / 月破申; each monthly table
    // advances the same opposition through Q20-Q31.
    expect(
      Object.fromEntries(
        DIA_CHI_THEO_THU_TU.map((chiThang) => [chiThang, chiTheoTrucPha(chiThang)]),
      ),
    ).toEqual(HAN_MONTH_POSITIONS[MaYeuTo.NGUYET_PHA]);

    expect(DINH_NGHIA_NGUYET_PHA.viTri).toEqual([{ truc: ThapNhiTruc.PHA }]);
  });

  it('月厭 matches Q4 正月戌逆行十二辰 and the 月表 positions', () => {
    expect(layBangQuanHeThang(MaYeuTo.NGUYET_YEM)).toEqual(HAN_MONTH_POSITIONS[MaYeuTo.NGUYET_YEM]);
  });

  it('厭對 matches Q4 正月辰逆行十二辰', () => {
    expect(layBangQuanHeThang(MaYeuTo.YEM_DOI)).toEqual(HAN_MONTH_POSITIONS[MaYeuTo.YEM_DOI]);
  });

  it('陰陽不將 month Dần matches the explicit Hán Q4 list at WYG 004-53a', () => {
    expect(
      DINH_NGHIA_BAT_TUONG.tapCanChiNgayTheoChiThang[DAN].map((item) => item.can + ':' + item.chi),
    ).toEqual(HAN_BAT_TUONG_THANG_DAN);
  });
});

function layBangQuanHeThang(
  ma: MaYeuTo.NGUYET_YEM | MaYeuTo.YEM_DOI,
): Readonly<Record<DiaChi, DiaChi>> {
  const definition = DINH_NGHIA_YEU_TO_QUAN_HE_THANG_QUYEN_4.find((item) => item.ma === ma);

  if (!definition) throw new Error('Thiếu definition ' + ma);

  return Object.fromEntries(
    DIA_CHI_THEO_THU_TU.map((chiThang) => {
      const [chi] = definition.chiNgayTheoChiThang[chiThang] ?? [];
      if (!chi) throw new Error('Thiếu Chi ngày ' + ma + ' / ' + chiThang);
      return [chiThang, chi];
    }),
  ) as Readonly<Record<DiaChi, DiaChi>>;
}

function chiTheoTrucPha(chiThang: DiaChi): DiaChi {
  const index = DIA_CHI_THEO_THU_TU.indexOf(chiThang);
  return DIA_CHI_THEO_THU_TU[(index + 6) % 12]!;
}
