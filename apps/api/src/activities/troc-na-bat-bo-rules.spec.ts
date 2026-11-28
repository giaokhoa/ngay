import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_TROC_NA_BAT_BO } from './troc-na-bat-bo-rules';

function key(rule: (typeof QUY_TAC_TROC_NA_BAT_BO)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  throw new Error('Unexpected condition ' + d.loai);
}

describe('TROC_NA_BAT_BO Q11 source lock', () => {
  it('khớp exact 2 Nên: Chấp nhật, Thu nhật', () => {
    expect(
      QUY_TAC_TROC_NA_BAT_BO.filter((r) => r.tacDong === TacDongDungSu.NEN)
        .map(key)
        .sort(),
    ).toEqual(['TRUC:' + ThapNhiTruc.CHAP, 'TRUC:' + ThapNhiTruc.THU].sort());
  });

  it('khớp exact 1 Kị: Vãng Vong', () => {
    expect(QUY_TAC_TROC_NA_BAT_BO.filter((r) => r.tacDong === TacDongDungSu.KY).map(key)).toEqual([
      'YEU_TO:' + MaYeuTo.VANG_VONG,
    ]);
  });

  it('mọi rule giữ Việt p860 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_TROC_NA_BAT_BO) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
