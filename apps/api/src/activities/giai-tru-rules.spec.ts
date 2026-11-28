import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_GIAI_TRU } from './giai-tru-rules';

const key = (rule: (typeof QUY_TAC_GIAI_TRU)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  return d.loai;
};

describe('GIAI_TRU Q11 source lock', () => {
  it('production khớp Hán exact 12 Nên và loại Thiên Nguyện Việt p852 thêm sai', () => {
    const nen = QUY_TAC_GIAI_TRU.filter((r) => r.tacDong === TacDongDungSu.NEN)
      .map(key)
      .sort();
    expect(nen).toEqual(
      [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_XA,
        MaYeuTo.NGUYET_AN,
        MaYeuTo.TU_TUONG,
        MaYeuTo.THOI_DUC,
        MaYeuTo.GIAI_THAN,
        MaYeuTo.NGU_LY,
      ]
        .map((ma) => 'YEU_TO:' + ma)
        .concat(['TRUC:' + ThapNhiTruc.TRU, 'TRUC:' + ThapNhiTruc.KHAI])
        .sort(),
    );
    expect(nen).not.toContain('YEU_TO:' + MaYeuTo.THIEN_NGUYEN);
  });

  it('khớp Hán exact 15 Kị, không biến Nguyệt Phá/Nguyệt Hại thành baseline', () => {
    const ky = QUY_TAC_GIAI_TRU.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toEqual(
      [
        'TRUC:' + ThapNhiTruc.KIEN,
        'TRUC:' + ThapNhiTruc.BINH,
        'TRUC:' + ThapNhiTruc.THU,
        ...[
          MaYeuTo.TU_THAN,
          MaYeuTo.KIEP_SAT,
          MaYeuTo.TAI_SAT,
          MaYeuTo.NGUYET_SAT,
          MaYeuTo.NGUYET_HINH,
          MaYeuTo.NGUYET_YEM,
          MaYeuTo.DAI_THOI,
          MaYeuTo.DU_HOA,
          MaYeuTo.THIEN_LAI,
          MaYeuTo.TU_KHI,
          MaYeuTo.TU_PHE,
          MaYeuTo.NGU_MO,
        ].map((ma) => 'YEU_TO:' + ma),
      ].sort(),
    );
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.NGUYET_PHA);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.NGUYET_HAI);
  });

  it('mọi contribution giữ Việt + Hán provenance verified', () => {
    for (const rule of QUY_TAC_GIAI_TRU) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
