import { describe, expect, it } from 'vitest';

import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_CHINH_DUNG_CAT_TOC } from './chinh-dung-cat-toc-rules';

const key = (rule: (typeof QUY_TAC_CHINH_DUNG_CAT_TOC)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  return d.loai;
};

describe('CHINH_DUNG_CAT_TOC Q11 source lock', () => {
  it('khớp exact 3 Nên của 整容剃頭', () => {
    const nen = QUY_TAC_CHINH_DUNG_CAT_TOC.filter((r) => r.tacDong === TacDongDungSu.NEN)
      .map(key)
      .sort();
    expect(nen).toEqual(
      ['TRUC:' + ThapNhiTruc.TRU, 'YEU_TO:' + MaYeuTo.GIAI_THAN, 'YEU_TO:' + MaYeuTo.NGU_LY].sort(),
    );
  });

  it('khớp exact 10 Kị gồm ngày Đinh và ngày âm 12/15', () => {
    const ky = QUY_TAC_CHINH_DUNG_CAT_TOC.filter((r) => r.tacDong === TacDongDungSu.KY)
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
        'CAN_NGAY:' + ThienCan.DINH,
        'NGAY_AM:12',
        'NGAY_AM:15',
      ].sort(),
    );
  });

  it('không kéo nhầm Bình/Thu/Tứ Phế/Ngũ Mộ hay các special calendar days vào baseline', () => {
    const all = new Set(QUY_TAC_CHINH_DUNG_CAT_TOC.map(key));
    for (const keyKhongCo of [
      'TRUC:' + ThapNhiTruc.BINH,
      'TRUC:' + ThapNhiTruc.THU,
      'YEU_TO:' + MaYeuTo.TU_PHE,
      'YEU_TO:' + MaYeuTo.NGU_MO,
      'YEU_TO:' + MaYeuTo.VO_LOC,
      'YEU_TO:' + MaYeuTo.TU_LY,
      'YEU_TO:' + MaYeuTo.TU_TUYET,
      'YEU_TO:' + MaYeuTo.HOI_NHAT,
    ]) {
      expect(all.has(keyKhongCo)).toBe(false);
    }
  });

  it('mọi rule giữ Việt + Hán provenance verified', () => {
    for (const rule of QUY_TAC_CHINH_DUNG_CAT_TOC) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
