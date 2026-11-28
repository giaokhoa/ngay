import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_TRANG_TRI_TUONG } from './trang-tri-tuong-rules';

function key(rule: (typeof QUY_TAC_TRANG_TRI_TUONG)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'THO_VUONG') return 'THO_VUONG';
  throw new Error('Unexpected condition ' + d.loai);
}

describe('TRANG_TRI_TUONG Q11 source lock', () => {
  it('production giữ 宜平日 theo Hán Q11 + Q10 dù Việt p859 bị lược', () => {
    const nen = QUY_TAC_TRANG_TRI_TUONG.filter((r) => r.tacDong === TacDongDungSu.NEN);
    expect(nen.map(key)).toEqual(['TRUC:' + ThapNhiTruc.BINH]);
    expect(nen[0]?.nguon.every((source) => source.loaiNguon === LoaiNguon.HAN_BAN)).toBe(true);
    expect(nen[0]?.nguon).toHaveLength(2);
  });

  it('khớp exact 11 Kị Việt/Hán', () => {
    const ky = QUY_TAC_TRANG_TRI_TUONG.filter((r) => r.tacDong === TacDongDungSu.KY);
    expect(ky.map(key).sort()).toEqual(
      [
        'YEU_TO:' + MaYeuTo.THO_PHU,
        'YEU_TO:' + MaYeuTo.NGUYET_PHA,
        'YEU_TO:' + MaYeuTo.KIEP_SAT,
        'YEU_TO:' + MaYeuTo.TAI_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_HINH,
        'YEU_TO:' + MaYeuTo.NGUYET_YEM,
        'YEU_TO:' + MaYeuTo.TU_PHE,
        'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
        'YEU_TO:' + MaYeuTo.DIA_NANG,
        'THO_VUONG',
      ].sort(),
    );
    for (const rule of ky) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });

  it('không kéo Thu/Bế/Ngũ Mộ/Tử Thần từ các vertical đất khác', () => {
    const all = QUY_TAC_TRANG_TRI_TUONG.map(key);
    expect(all).not.toContain('TRUC:' + ThapNhiTruc.THU);
    expect(all).not.toContain('TRUC:' + ThapNhiTruc.BE);
    expect(all).not.toContain('YEU_TO:' + MaYeuTo.NGU_MO);
    expect(all).not.toContain('YEU_TO:' + MaYeuTo.TU_THAN);
  });
});
