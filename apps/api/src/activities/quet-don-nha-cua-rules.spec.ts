import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_QUET_DON_NHA_CUA } from './quet-don-nha-cua-rules';

function key(rule: (typeof QUY_TAC_QUET_DON_NHA_CUA)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  throw new Error('Unexpected condition ' + d.loai);
}

describe('QUET_DON_NHA_CUA Q11 source lock', () => {
  it('khớp exact 宜除日除神', () => {
    expect(QUY_TAC_QUET_DON_NHA_CUA.map(key).sort()).toEqual(
      ['TRUC:' + ThapNhiTruc.TRU, 'YEU_TO:' + MaYeuTo.NGU_LY].sort(),
    );
    expect(QUY_TAC_QUET_DON_NHA_CUA.every((r) => r.tacDong === TacDongDungSu.NEN)).toBe(true);
  });

  it('khóa 忌無 — baseline không có Kị', () => {
    expect(QUY_TAC_QUET_DON_NHA_CUA.filter((r) => r.tacDong === TacDongDungSu.KY)).toHaveLength(0);
  });

  it('mọi rule giữ Việt p859 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_QUET_DON_NHA_CUA) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
