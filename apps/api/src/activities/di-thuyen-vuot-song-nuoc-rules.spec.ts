import { describe, expect, it } from 'vitest';

import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC } from './di-thuyen-vuot-song-nuoc-rules';

function key(rule: (typeof QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  throw new Error('Unexpected condition ' + d.loai);
}

describe('DI_THUYEN_VUOT_SONG_NUOC Q11 source lock', () => {
  it('khớp exact 0 Nên / 5 Kị của 乘船渡水', () => {
    expect(
      QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC.filter((r) => r.tacDong === TacDongDungSu.NEN),
    ).toHaveLength(0);
    expect(
      QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC.filter((r) => r.tacDong === TacDongDungSu.KY)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.CHIEU_DIEU,
        'YEU_TO:' + MaYeuTo.DAI_THOI,
        'YEU_TO:' + MaYeuTo.BAT_PHONG,
        'YEU_TO:' + MaYeuTo.CUU_KHAM,
        'YEU_TO:' + MaYeuTo.XUC_THUY_LONG,
      ].sort(),
    );
  });

  it('Hàm Trì canonicalize bằng Đại Thời đã source-lock, không tạo identity giả', () => {
    expect(QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC.map(key)).toContain('YEU_TO:' + MaYeuTo.DAI_THOI);
  });

  it('mọi rule giữ Việt p861 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
