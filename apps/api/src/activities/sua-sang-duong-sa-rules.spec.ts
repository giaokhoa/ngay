import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_SUA_SANG_DUONG_SA } from './sua-sang-duong-sa-rules';

function key(rule: (typeof QUY_TAC_SUA_SANG_DUONG_SA)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'THO_VUONG') return 'THO_VUONG';
  throw new Error('Unexpected condition ' + d.loai);
}

describe('SUA_SANG_DUONG_SA Q11 source lock', () => {
  it('khớp exact 1 Nên: Bình nhật', () => {
    expect(
      QUY_TAC_SUA_SANG_DUONG_SA.filter((r) => r.tacDong === TacDongDungSu.NEN).map(key),
    ).toEqual(['TRUC:' + ThapNhiTruc.BINH]);
  });

  it('khớp exact 5 Kị Việt/Hán', () => {
    expect(
      QUY_TAC_SUA_SANG_DUONG_SA.filter((r) => r.tacDong === TacDongDungSu.KY)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.THO_PHU,
        'YEU_TO:' + MaYeuTo.NGUYET_YEM,
        'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
        'YEU_TO:' + MaYeuTo.DIA_NANG,
        'THO_VUONG',
      ].sort(),
    );
  });

  it('không kéo Nguyệt Phá/Tam Sát/Nguyệt Hình/Tứ Phế từ vertical đất khác', () => {
    const all = QUY_TAC_SUA_SANG_DUONG_SA.map(key);
    for (const factor of [
      MaYeuTo.NGUYET_PHA,
      MaYeuTo.KIEP_SAT,
      MaYeuTo.TAI_SAT,
      MaYeuTo.NGUYET_SAT,
      MaYeuTo.NGUYET_HINH,
      MaYeuTo.TU_PHE,
    ]) {
      expect(all).not.toContain('YEU_TO:' + factor);
    }
  });

  it('mọi rule giữ Việt p859 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_SUA_SANG_DUONG_SA) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
