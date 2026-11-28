import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_CAU_PHUC } from './cau-phuc-rules';

const key = (rule: (typeof QUY_TAC_CAU_PHUC)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  return d.loai;
};

describe('CAU_PHUC source-resolved Q11/Q10 contract', () => {
  it('khớp 16 Nên của 祈福', () => {
    const nen = QUY_TAC_CAU_PHUC.filter((rule) => rule.tacDong === TacDongDungSu.NEN)
      .map(key)
      .sort();
    expect(nen).toEqual(
      [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_XA,
        MaYeuTo.THIEN_NGUYEN,
        MaYeuTo.NGUYET_AN,
        MaYeuTo.TU_TUONG,
        MaYeuTo.THOI_DUC,
        MaYeuTo.THIEN_VU,
        MaYeuTo.PHO_HO,
        MaYeuTo.PHUC_SINH,
        MaYeuTo.THANH_TAM,
        MaYeuTo.ICH_HAU,
        MaYeuTo.TUC_THE,
      ]
        .map((ma) => 'YEU_TO:' + ma)
        .concat('TRUC:' + ThapNhiTruc.KHAI)
        .sort(),
    );
  });

  it('khóa 16 Kị named trong Q11 + 3 ngày mở rộng bởi Q10 “等日”', () => {
    const ky = QUY_TAC_CAU_PHUC.filter((rule) => rule.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toEqual(
      [
        'TRUC:' + ThapNhiTruc.KIEN,
        'TRUC:' + ThapNhiTruc.BINH,
        'TRUC:' + ThapNhiTruc.THU,
        ...[
          MaYeuTo.NGUYET_PHA,
          MaYeuTo.KIEP_SAT,
          MaYeuTo.TAI_SAT,
          MaYeuTo.NGUYET_SAT,
          MaYeuTo.NGUYET_HINH,
          MaYeuTo.NGUYET_HAI,
          MaYeuTo.NGUYET_YEM,
          MaYeuTo.DAI_THOI,
          MaYeuTo.DU_HOA,
          MaYeuTo.THIEN_LAI,
          MaYeuTo.TU_PHE,
          MaYeuTo.VO_LOC,
          MaYeuTo.THUONG_SOC,
          MaYeuTo.TU_LY,
          MaYeuTo.TU_TUYET,
          MaYeuTo.HOI_NHAT,
        ].map((ma) => 'YEU_TO:' + ma),
      ].sort(),
    );
  });

  it('mọi rule verified; Tứ Ly/Tuyệt/Hối có thêm Q10 provenance', () => {
    expect(QUY_TAC_CAU_PHUC.every((rule) => rule.nguon.every((source) => source.daXacMinh))).toBe(
      true,
    );
    for (const ma of ['CAU_PHUC_KY_TU_LY', 'CAU_PHUC_KY_TU_TUYET', 'CAU_PHUC_KY_HOI_NHAT']) {
      const rule = QUY_TAC_CAU_PHUC.find((item) => item.ma === ma)!;
      expect(rule.nguon.some((source) => source.quyen === 10)).toBe(true);
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
    }
  });
});
