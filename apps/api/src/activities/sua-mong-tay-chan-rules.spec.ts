import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_SUA_MONG_TAY_CHAN } from './sua-mong-tay-chan-rules';

const key = (rule: (typeof QUY_TAC_SUA_MONG_TAY_CHAN)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  return d.loai;
};

describe('SUA_MONG_TAY_CHAN Q11 source lock', () => {
  it('khớp exact 3 Nên của 整手足甲', () => {
    const nen = QUY_TAC_SUA_MONG_TAY_CHAN.filter((r) => r.tacDong === TacDongDungSu.NEN)
      .map(key)
      .sort();
    expect(nen).toEqual(
      ['TRUC:' + ThapNhiTruc.TRU, 'YEU_TO:' + MaYeuTo.GIAI_THAN, 'YEU_TO:' + MaYeuTo.NGU_LY].sort(),
    );
  });

  it('khớp exact 13 Kị gồm sáu ngày âm 1/6/15/19/21/23', () => {
    const ky = QUY_TAC_SUA_MONG_TAY_CHAN.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toEqual(
      [
        'TRUC:' + ThapNhiTruc.KIEN,
        ...[
          MaYeuTo.NGUYET_PHA,
          MaYeuTo.KIEP_SAT,
          MaYeuTo.TAI_SAT,
          MaYeuTo.NGUYET_SAT,
          MaYeuTo.NGUYET_HINH,
          MaYeuTo.NGUYET_YEM,
        ].map((ma) => 'YEU_TO:' + ma),
        ...[1, 6, 15, 19, 21, 23].map((ngay) => 'NGAY_AM:' + ngay),
      ].sort(),
    );
  });

  it('không kéo ngày Đinh hay các Kị của vertical khác vào baseline', () => {
    const all = new Set(QUY_TAC_SUA_MONG_TAY_CHAN.map(key));
    for (const absent of [
      'CAN_NGAY:DINH',
      'TRUC:' + ThapNhiTruc.BINH,
      'TRUC:' + ThapNhiTruc.THU,
      'YEU_TO:' + MaYeuTo.TU_PHE,
      'YEU_TO:' + MaYeuTo.NGU_MO,
      'YEU_TO:' + MaYeuTo.VO_LOC,
    ]) {
      expect(all.has(absent)).toBe(false);
    }
  });

  it('mọi rule giữ Việt + Hán provenance verified', () => {
    for (const rule of QUY_TAC_SUA_MONG_TAY_CHAN) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
