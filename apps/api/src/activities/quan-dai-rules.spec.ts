import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { laySaiKhacNguonHan } from '../sources/han-source-discrepancies';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_QUAN_DAI } from './quan-dai-rules';

const HAN_NEN = new Set(['TRUC:' + ThapNhiTruc.DINH]);
const HAN_KY = new Set([
  'YEU_TO:' + MaYeuTo.NGUYET_PHA,
  'TRUC:' + ThapNhiTruc.BINH,
  'TRUC:' + ThapNhiTruc.THU,
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.DAI_THOI,
  'YEU_TO:' + MaYeuTo.THIEN_LAI,
  'YEU_TO:' + MaYeuTo.TU_PHE,
  'YEU_TO:' + MaYeuTo.NGU_MO,
  'CHI_NGAY:' + DiaChi.SUU,
]);
const VIET_KY = new Set([...HAN_KY, 'TRUC:' + ThapNhiTruc.BE]);

describe('Q11 QUAN_DAI source-resolved rule set', () => {
  it('matches Hán Q11: 1 Nên and 13 Kị', () => {
    expect(tap(TacDongDungSu.NEN)).toEqual(HAN_NEN);
    expect(tap(TacDongDungSu.KY)).toEqual(HAN_KY);
    expect(QUY_TAC_QUAN_DAI).toHaveLength(14);
  });

  it('records the exact Việt p848-only Bế nhật instead of silently adding it', () => {
    const actual = tap(TacDongDungSu.KY);
    expect([...VIET_KY].filter((item) => !actual.has(item))).toEqual(['TRUC:BE']);
    expect(laySaiKhacNguonHan('Q11_QUAN_DAI_VIET_THEM_BE_NHAT')).toMatchObject({
      loai: 'VIET_HAN_NOI_DUNG',
      quyen: 11,
      muc: '冠帶',
    });
  });

  it('keeps Sửu as typed Chi ngày and adds Q10 Bách Kị provenance', () => {
    const rule = QUY_TAC_QUAN_DAI.find((item) => item.ma === 'QUAN_DAI_KY_NGAY_SUU');
    expect(rule?.dieuKien).toEqual({ loai: 'CHI_NGAY', chi: DiaChi.SUU });
    expect(rule?.nguon.some((nguon) => nguon.quyen === 10 && nguon.muc === '百忌日')).toBe(true);
  });

  it('all production rules keep verified source provenance', () => {
    for (const rule of QUY_TAC_QUAN_DAI) {
      expect(rule.nguon.length).toBeGreaterThanOrEqual(2);
      expect(rule.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});

function tap(tacDong: TacDongDungSu): Set<string> {
  return new Set(
    QUY_TAC_QUAN_DAI.filter((rule) => rule.tacDong === tacDong).map((rule) => {
      const target = rule.dieuKien;
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
    }),
  );
}
