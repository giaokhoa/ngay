import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_MAY_DO } from './may-do-rules';

const key = (rule: (typeof QUY_TAC_MAY_DO)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  return d.loai;
};

describe('MAY_DO Q11 source lock', () => {
  it('khớp exact 14 Nên của 裁製〈裁衣同〉', () => {
    expect(
      QUY_TAC_MAY_DO.filter((r) => r.tacDong === TacDongDungSu.NEN)
        .map(key)
        .sort(),
    ).toEqual(
      [
        ...[
          MaYeuTo.THIEN_DUC,
          MaYeuTo.NGUYET_DUC,
          MaYeuTo.THIEN_DUC_HOP,
          MaYeuTo.NGUYET_DUC_HOP,
          MaYeuTo.THIEN_XA,
          MaYeuTo.THIEN_NGUYEN,
          MaYeuTo.NGUYET_AN,
          MaYeuTo.TU_TUONG,
          MaYeuTo.THOI_DUC,
          MaYeuTo.VUONG_NHAT,
          MaYeuTo.TAM_HOP,
          MaYeuTo.PHUC_NHAT,
        ].map((ma) => 'YEU_TO:' + ma),
        'TRUC:' + ThapNhiTruc.MAN,
        'TRUC:' + ThapNhiTruc.KHAI,
      ].sort(),
    );
  });

  it('khớp exact 9 Kị Q11, không nhét Trường/Đoản Tinh Q10 vào baseline', () => {
    const ky = QUY_TAC_MAY_DO.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toEqual(
      [
        'YEU_TO:' + MaYeuTo.NGUYET_PHA,
        'TRUC:' + ThapNhiTruc.BINH,
        'TRUC:' + ThapNhiTruc.THU,
        ...[
          MaYeuTo.KIEP_SAT,
          MaYeuTo.TAI_SAT,
          MaYeuTo.NGUYET_SAT,
          MaYeuTo.NGUYET_HINH,
          MaYeuTo.NGUYET_YEM,
          MaYeuTo.TU_PHE,
        ].map((ma) => 'YEU_TO:' + ma),
      ].sort(),
    );
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.TRUONG_TINH);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.DOAN_TINH);
  });

  it('mọi baseline rule giữ Việt p854 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_MAY_DO) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
