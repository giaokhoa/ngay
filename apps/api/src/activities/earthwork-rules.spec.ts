import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from './earthwork-rules';

const KY_CHUNG = new Set([
  'YEU_TO:NGUYET_KIEN',
  'YEU_TO:THO_PHU',
  'YEU_TO:NGUYET_PHA',
  'TRUC:BINH',
  'TRUC:THU',
  'TRUC:BE',
  'YEU_TO:KIEP_SAT',
  'YEU_TO:TAI_SAT',
  'YEU_TO:NGUYET_SAT',
  'YEU_TO:NGUYET_HINH',
  'YEU_TO:NGUYET_YEM',
  'YEU_TO:DAI_THOI',
  'YEU_TO:THIEN_LAI',
  'YEU_TO:TU_PHE',
  'YEU_TO:NGU_MO',
  'YEU_TO:THO_PHU_TIN',
  'YEU_TO:DIA_NANG',
  'THO_VUONG',
]);

const NEN_DONG_THO = new Set([
  'YEU_TO:THIEN_DUC',
  'YEU_TO:NGUYET_DUC',
  'YEU_TO:THIEN_DUC_HOP',
  'YEU_TO:NGUYET_DUC_HOP',
  'YEU_TO:THIEN_XA',
  'YEU_TO:THIEN_NGUYEN',
  'YEU_TO:NGUYET_AN',
  'YEU_TO:TU_TUONG',
  'YEU_TO:THOI_DUC',
  'YEU_TO:TAM_HOP',
  'TRUC:KHAI',
]);

const NEN_SUA_CUNG_THAT = new Set([
  'YEU_TO:NGUYET_AN',
  'YEU_TO:TU_TUONG',
  'YEU_TO:THOI_DUC',
  'YEU_TO:TAM_HOP',
  'YEU_TO:PHUC_DUC',
  'TRUC:KHAI',
]);

describe('Q11 DONG_THO exact rule set', () => {
  it('has exactly 11 Nên and 18 Kị', () => {
    expect(QUY_TAC_DONG_THO.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(11);
    expect(QUY_TAC_DONG_THO.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(18);
    expect(QUY_TAC_DONG_THO).toHaveLength(29);
  });

  it('matches exact Q11 Nên targets', () => {
    expect(tapTarget(QUY_TAC_DONG_THO, TacDongDungSu.NEN)).toEqual(NEN_DONG_THO);
  });

  it('matches exact Q11 Kị targets including typed Thổ Vượng', () => {
    expect(tapTarget(QUY_TAC_DONG_THO, TacDongDungSu.KY)).toEqual(KY_CHUNG);
  });
});

describe('Q11 SUA_CUNG_THAT exact rule set', () => {
  it('has exactly 6 Nên and 18 Kị', () => {
    expect(QUY_TAC_SUA_CUNG_THAT.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(
      6,
    );
    expect(QUY_TAC_SUA_CUNG_THAT.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(
      18,
    );
    expect(QUY_TAC_SUA_CUNG_THAT).toHaveLength(24);
  });

  it('matches exact Q11 Nên targets', () => {
    expect(tapTarget(QUY_TAC_SUA_CUNG_THAT, TacDongDungSu.NEN)).toEqual(NEN_SUA_CUNG_THAT);
  });

  it('shares the exact 18 Kị targets with DONG_THO', () => {
    expect(tapTarget(QUY_TAC_SUA_CUNG_THAT, TacDongDungSu.KY)).toEqual(KY_CHUNG);
  });
});

describe('earthwork Q11 provenance', () => {
  it.each([[QUY_TAC_DONG_THO], [QUY_TAC_SUA_CUNG_THAT]] as const)(
    'every rule carries verified Vietnamese + Hán source refs',
    (rules) => {
      for (const rule of rules) {
        expect(rule.nguon).toHaveLength(2);
        expect(rule.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
      }
    },
  );

  it('Thổ Phù is not collapsed into Thổ Phủ', () => {
    const ky = QUY_TAC_DONG_THO.filter((rule) => rule.tacDong === TacDongDungSu.KY);
    expect(
      ky.some((rule) => rule.dieuKien.loai === 'YEU_TO' && rule.dieuKien.ma === MaYeuTo.THO_PHU),
    ).toBe(true);
    expect(
      ky.some(
        (rule) => rule.dieuKien.loai === 'YEU_TO' && rule.dieuKien.ma === MaYeuTo.THO_PHU_TIN,
      ),
    ).toBe(true);
  });

  it('Khai/Bình/Thu/Bế remain typed Trực targets', () => {
    expect(NEN_DONG_THO.has('TRUC:' + ThapNhiTruc.KHAI)).toBe(true);
    expect(KY_CHUNG.has('TRUC:' + ThapNhiTruc.BINH)).toBe(true);
    expect(KY_CHUNG.has('TRUC:' + ThapNhiTruc.THU)).toBe(true);
    expect(KY_CHUNG.has('TRUC:' + ThapNhiTruc.BE)).toBe(true);
  });
});

function tapTarget(
  rules: typeof QUY_TAC_DONG_THO | typeof QUY_TAC_SUA_CUNG_THAT,
  tacDong: TacDongDungSu,
): Set<string> {
  return new Set(
    rules.filter((rule) => rule.tacDong === tacDong).map((rule) => khoa(rule.dieuKien)),
  );
}

function khoa(target: (typeof QUY_TAC_DONG_THO)[number]['dieuKien']): string {
  switch (target.loai) {
    case 'YEU_TO':
      return 'YEU_TO:' + target.ma;
    case 'TRUC':
      return 'TRUC:' + target.truc;
    case 'CHI_NGAY':
      return 'CHI_NGAY:' + target.chi;
    case 'CAN_NGAY':
      return 'CAN_NGAY:' + target.can;
    case 'NGAY_AM':
      return 'NGAY_AM:' + target.ngay;
    case 'THO_VUONG':
      return 'THO_VUONG';
  }
}
