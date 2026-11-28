import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_NAP_TAI } from './nap-tai-rules';

const key = (rule: (typeof QUY_TAC_NAP_TAI)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  return d.loai;
};

describe('NAP_TAI Q11 source lock', () => {
  it('khớp exact 12 Nên của 納財', () => {
    expect(
      QUY_TAC_NAP_TAI.filter((r) => r.tacDong === TacDongDungSu.NEN)
        .map(key)
        .sort(),
    ).toEqual(
      [
        ...[
          MaYeuTo.MAU_THUONG,
          MaYeuTo.THIEN_NGUYEN,
          MaYeuTo.NGUYET_AN,
          MaYeuTo.TU_TUONG,
          MaYeuTo.THOI_DUC,
          MaYeuTo.DAN_NHAT,
          MaYeuTo.TAM_HOP,
          MaYeuTo.LUC_HOP,
          MaYeuTo.NGU_PHU,
          MaYeuTo.THIEN_THUONG,
        ].map((ma) => 'YEU_TO:' + ma),
        'TRUC:' + ThapNhiTruc.MAN,
        'TRUC:' + ThapNhiTruc.THU,
      ].sort(),
    );
  });

  it('khớp exact 16 Kị; không có Thu/Bế/Ngũ Mộ/Trường-Đoản trong baseline', () => {
    const ky = QUY_TAC_NAP_TAI.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toEqual(
      [
        'TRUC:' + ThapNhiTruc.BINH,
        ...[
          MaYeuTo.NGUYET_PHA,
          MaYeuTo.DAI_HAO,
          MaYeuTo.KIEP_SAT,
          MaYeuTo.TAI_SAT,
          MaYeuTo.NGUYET_SAT,
          MaYeuTo.NGUYET_HINH,
          MaYeuTo.NGUYET_HAI,
          MaYeuTo.NGUYET_YEM,
          MaYeuTo.DAI_THOI,
          MaYeuTo.THIEN_LAI,
          MaYeuTo.TIEU_HAO,
          MaYeuTo.TU_HAO,
          MaYeuTo.TU_PHE,
          MaYeuTo.TU_CUNG,
          MaYeuTo.CUU_KHONG,
        ].map((ma) => 'YEU_TO:' + ma),
      ].sort(),
    );
    expect(ky).not.toContain('TRUC:' + ThapNhiTruc.THU);
    expect(ky).not.toContain('TRUC:' + ThapNhiTruc.BE);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.NGU_MO);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.TRUONG_TINH);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.DOAN_TINH);
  });

  it('mọi baseline rule giữ Việt p857 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_NAP_TAI) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
