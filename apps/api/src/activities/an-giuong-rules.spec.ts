import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_AN_GIUONG } from './an-giuong-rules';

const NEN = new Set(['TRUC:' + ThapNhiTruc.NGUY]);
const KY = new Set([
  'YEU_TO:' + MaYeuTo.NGUYET_PHA,
  'TRUC:' + ThapNhiTruc.BINH,
  'TRUC:' + ThapNhiTruc.THU,
  'TRUC:' + ThapNhiTruc.BE,
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.DAI_THOI,
  'YEU_TO:' + MaYeuTo.THIEN_LAI,
  'YEU_TO:' + MaYeuTo.TU_PHE,
  'YEU_TO:' + MaYeuTo.NGU_MO,
  'CHI_NGAY:' + DiaChi.THAN,
]);

describe('Q11 AN_GIUONG exact rule set', () => {
  it('has exactly 1 Nên and 14 Kị', () => {
    expect(QUY_TAC_AN_GIUONG.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(1);
    expect(QUY_TAC_AN_GIUONG.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(14);
    expect(QUY_TAC_AN_GIUONG).toHaveLength(15);
  });

  it('matches exact Q11 Nên/Kị targets', () => {
    expect(tap(TacDongDungSu.NEN)).toEqual(NEN);
    expect(tap(TacDongDungSu.KY)).toEqual(KY);
  });

  it('keeps ngày Thân as Chi ngày, not a factor', () => {
    expect(KY.has('CHI_NGAY:' + DiaChi.THAN)).toBe(true);
    expect(KY.has('YEU_TO:THAN')).toBe(false);
  });

  it('every Q11 rule keeps verified Vietnamese + Hán provenance', () => {
    for (const rule of QUY_TAC_AN_GIUONG) {
      expect(rule.nguon).toHaveLength(2);
      expect(rule.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});

function tap(tacDong: TacDongDungSu): Set<string> {
  return new Set(
    QUY_TAC_AN_GIUONG.filter((rule) => rule.tacDong === tacDong).map((rule) => {
      const target = rule.dieuKien;
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
    }),
  );
}
