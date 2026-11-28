import { describe, expect, it } from 'vitest';

import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_PHA_NHA_HUY_TUONG } from './pha-nha-huy-tuong-rules';

function key(rule: (typeof QUY_TAC_PHA_NHA_HUY_TUONG)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'THO_VUONG') return 'THO_VUONG';
  throw new Error('Unexpected condition ' + d.loai);
}

describe('PHA_NHA_HUY_TUONG Q11 source lock', () => {
  it('khớp exact 1 Nên: Nguyệt Phá', () => {
    expect(
      QUY_TAC_PHA_NHA_HUY_TUONG.filter((r) => r.tacDong === TacDongDungSu.NEN).map(key),
    ).toEqual(['YEU_TO:' + MaYeuTo.NGUYET_PHA]);
  });

  it('khớp exact 10 Kị Việt/Hán', () => {
    expect(
      QUY_TAC_PHA_NHA_HUY_TUONG.filter((r) => r.tacDong === TacDongDungSu.KY)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
        'YEU_TO:' + MaYeuTo.THO_PHU,
        'YEU_TO:' + MaYeuTo.KIEP_SAT,
        'YEU_TO:' + MaYeuTo.TAI_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_HINH,
        'YEU_TO:' + MaYeuTo.NGUYET_YEM,
        'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
        'YEU_TO:' + MaYeuTo.DIA_NANG,
        'THO_VUONG',
      ].sort(),
    );
  });

  it('mọi Q11 rule giữ Việt p860 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_PHA_NHA_HUY_TUONG) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
