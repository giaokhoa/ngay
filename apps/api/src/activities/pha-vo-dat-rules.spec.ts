import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_PHA_VO_DAT } from './pha-vo-dat-rules';

function key(rule: (typeof QUY_TAC_PHA_VO_DAT)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'THO_VUONG') return 'THO_VUONG';
  throw new Error('Unexpected condition ' + d.loai);
}

describe('PHA_VO_DAT Q11 source lock', () => {
  it('khớp exact 2 Nên: Ô Phệ + Ô Phệ Đối', () => {
    expect(
      QUY_TAC_PHA_VO_DAT.filter((r) => r.tacDong === TacDongDungSu.NEN)
        .map(key)
        .sort(),
    ).toEqual(['YEU_TO:' + MaYeuTo.O_PHE, 'YEU_TO:' + MaYeuTo.O_PHE_DOI].sort());
  });

  it('khớp exact 18 Kị Việt/Hán', () => {
    expect(
      QUY_TAC_PHA_VO_DAT.filter((r) => r.tacDong === TacDongDungSu.KY)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
        'YEU_TO:' + MaYeuTo.THO_PHU,
        'YEU_TO:' + MaYeuTo.NGUYET_PHA,
        'TRUC:' + ThapNhiTruc.BINH,
        'TRUC:' + ThapNhiTruc.THU,
        'YEU_TO:' + MaYeuTo.KIEP_SAT,
        'YEU_TO:' + MaYeuTo.TAI_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_HINH,
        'YEU_TO:' + MaYeuTo.NGUYET_HAI,
        'YEU_TO:' + MaYeuTo.NGUYET_YEM,
        'YEU_TO:' + MaYeuTo.TU_PHE,
        'YEU_TO:' + MaYeuTo.NGU_MO,
        'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
        'YEU_TO:' + MaYeuTo.DIA_NANG,
        'YEU_TO:' + MaYeuTo.PHUC_NHAT,
        'YEU_TO:' + MaYeuTo.TRONG_NHAT,
        'THO_VUONG',
      ].sort(),
    );
  });

  it('mọi Q11 rule giữ Việt p862 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_PHA_VO_DAT) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
