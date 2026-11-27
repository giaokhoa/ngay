import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_AN_TANG } from './an-tang-rules';

const NEN = new Set([
  'YEU_TO:THIEN_DUC',
  'YEU_TO:NGUYET_DUC',
  'YEU_TO:THIEN_DUC_HOP',
  'YEU_TO:NGUYET_DUC_HOP',
  'YEU_TO:THIEN_XA',
  'YEU_TO:THIEN_NGUYEN',
  'YEU_TO:LUC_HOP',
  'YEU_TO:O_PHE',
]);

const KY = new Set([
  'YEU_TO:NGUYET_KIEN',
  'YEU_TO:NGUYET_PHA',
  'TRUC:BINH',
  'TRUC:THU',
  'YEU_TO:KIEP_SAT',
  'YEU_TO:TAI_SAT',
  'YEU_TO:NGUYET_SAT',
  'YEU_TO:NGUYET_HINH',
  'YEU_TO:NGUYET_HAI',
  'YEU_TO:NGUYET_YEM',
  'YEU_TO:TU_PHE',
  'YEU_TO:TU_KY',
  'YEU_TO:TU_CUNG',
  'YEU_TO:NGU_MO',
  'YEU_TO:PHUC_NHAT',
  'YEU_TO:TRONG_NHAT',
]);

describe('Q11 AN_TANG exact rule set', () => {
  it('has exactly 8 Nên and 16 Kị', () => {
    expect(QUY_TAC_AN_TANG.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(8);
    expect(QUY_TAC_AN_TANG.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(16);
    expect(QUY_TAC_AN_TANG).toHaveLength(24);
  });

  it('matches exact Q11 Nên targets', () => {
    expect(tap(TacDongDungSu.NEN)).toEqual(NEN);
  });

  it('matches exact Q11 Kị targets', () => {
    expect(tap(TacDongDungSu.KY)).toEqual(KY);
  });

  it('uses typed Trực Bình/Thu and does not import Phá Thổ/Cải Táng-only targets', () => {
    expect(KY.has('TRUC:' + ThapNhiTruc.BINH)).toBe(true);
    expect(KY.has('TRUC:' + ThapNhiTruc.THU)).toBe(true);
    expect(KY.has('YEU_TO:THO_PHU_TIN')).toBe(false);
    expect(KY.has('YEU_TO:DIA_NANG')).toBe(false);
  });

  it('includes Ô Phệ as Q11 Nên and Phục/Trọng as distinct Kị identities', () => {
    expect(NEN.has('YEU_TO:' + MaYeuTo.O_PHE)).toBe(true);
    expect(KY.has('YEU_TO:' + MaYeuTo.PHUC_NHAT)).toBe(true);
    expect(KY.has('YEU_TO:' + MaYeuTo.TRONG_NHAT)).toBe(true);
  });

  it('every rule keeps verified Việt + Hán Q11 provenance', () => {
    for (const rule of QUY_TAC_AN_TANG) {
      expect(rule.nguon).toHaveLength(2);
      expect(rule.nguon[0]?.trang).toBe(862);
      expect(rule.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});

function tap(tacDong: TacDongDungSu): Set<string> {
  return new Set(
    QUY_TAC_AN_TANG.filter((rule) => rule.tacDong === tacDong).map((rule) => khoa(rule.dieuKien)),
  );
}

function khoa(target: (typeof QUY_TAC_AN_TANG)[number]['dieuKien']): string {
  switch (target.loai) {
    case 'YEU_TO':
      return 'YEU_TO:' + target.ma;
    case 'TRUC':
      return 'TRUC:' + target.truc;
    case 'CHI_NGAY':
      return 'CHI_NGAY:' + target.chi;
    case 'THO_VUONG':
      return 'THO_VUONG';
  }
}
