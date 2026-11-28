import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_YEN_HOI } from './yen-hoi-rules';

const key = (rule: (typeof QUY_TAC_YEN_HOI)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  return d.loai;
};

describe('YEN_HOI Q11 source lock', () => {
  it('khớp exact 18 Nên / 13 Kị của 宴會〈會親友同〉', () => {
    const nen = QUY_TAC_YEN_HOI.filter((r) => r.tacDong === TacDongDungSu.NEN)
      .map(key)
      .sort();
    const ky = QUY_TAC_YEN_HOI.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();

    expect(nen).toEqual(
      [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_AN,
        MaYeuTo.THIEN_XA,
        MaYeuTo.THIEN_NGUYEN,
        MaYeuTo.NGUYET_AN,
        MaYeuTo.TU_TUONG,
        MaYeuTo.THOI_DUC,
        MaYeuTo.VUONG_NHAT,
        MaYeuTo.DAN_NHAT,
        MaYeuTo.TAM_HOP,
        MaYeuTo.PHUC_DUC,
        MaYeuTo.THIEN_HY,
        MaYeuTo.LUC_HOP,
        MaYeuTo.NGU_HOP,
      ]
        .map((ma) => 'YEU_TO:' + ma)
        .concat('TRUC:' + ThapNhiTruc.KHAI)
        .sort(),
    );
    expect(ky).toEqual(
      [
        MaYeuTo.NGUYET_PHA,
        MaYeuTo.KIEP_SAT,
        MaYeuTo.TAI_SAT,
        MaYeuTo.NGUYET_SAT,
        MaYeuTo.NGUYET_HINH,
        MaYeuTo.NGUYET_HAI,
        MaYeuTo.NGUYET_YEM,
        MaYeuTo.TU_PHE,
        MaYeuTo.NGU_LY,
      ]
        .map((ma) => 'YEU_TO:' + ma)
        .concat(
          'TRUC:' + ThapNhiTruc.BINH,
          'TRUC:' + ThapNhiTruc.THU,
          'TRUC:' + ThapNhiTruc.BE,
          'CHI_NGAY:' + DiaChi.DAU,
        )
        .sort(),
    );
  });

  it('mọi rule giữ exact Việt + Hán provenance', () => {
    for (const rule of QUY_TAC_YEN_HOI) {
      expect(new Set(rule.nguon.map((s) => s.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((s) => s.daXacMinh)).toBe(true);
    }
  });
});
