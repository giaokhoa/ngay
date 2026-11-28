import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_CAU_Y_TRI_BENH } from './cau-y-tri-benh-rules';

const key = (rule: (typeof QUY_TAC_CAU_Y_TRI_BENH)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  return d.loai;
};

describe('CAU_Y_TRI_BENH Q11 source lock', () => {
  it('khớp exact 15 Nên của 求醫療病', () => {
    const nen = QUY_TAC_CAU_Y_TRI_BENH.filter((r) => r.tacDong === TacDongDungSu.NEN)
      .map(key)
      .sort();
    expect(nen).toEqual(
      [
        ...[
          MaYeuTo.THIEN_DUC,
          MaYeuTo.NGUYET_DUC,
          MaYeuTo.THIEN_DUC_HOP,
          MaYeuTo.NGUYET_DUC_HOP,
          MaYeuTo.THIEN_XA,
          MaYeuTo.NGUYET_AN,
          MaYeuTo.TU_TUONG,
          MaYeuTo.THOI_DUC,
          MaYeuTo.DICH_MA,
          MaYeuTo.THIEN_Y,
          MaYeuTo.GIAI_THAN,
          MaYeuTo.NGU_LY,
        ].map((ma) => 'YEU_TO:' + ma),
        'TRUC:' + ThapNhiTruc.TRU,
        'TRUC:' + ThapNhiTruc.PHA,
        'TRUC:' + ThapNhiTruc.KHAI,
      ].sort(),
    );
  });

  it('khớp exact 22 Kị, gồm Mùi / âm 15 / Sóc-Huyền-Vọng', () => {
    const ky = QUY_TAC_CAU_Y_TRI_BENH.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toEqual(
      [
        'TRUC:' + ThapNhiTruc.KIEN,
        'TRUC:' + ThapNhiTruc.BINH,
        'TRUC:' + ThapNhiTruc.THU,
        'TRUC:' + ThapNhiTruc.MAN,
        'TRUC:' + ThapNhiTruc.BE,
        ...[
          MaYeuTo.TU_THAN,
          MaYeuTo.KIEP_SAT,
          MaYeuTo.TAI_SAT,
          MaYeuTo.NGUYET_SAT,
          MaYeuTo.NGUYET_HINH,
          MaYeuTo.NGUYET_HAI,
          MaYeuTo.NGUYET_YEM,
          MaYeuTo.DAI_THOI,
          MaYeuTo.DU_HOA,
          MaYeuTo.THIEN_LAI,
          MaYeuTo.TU_KHI,
          MaYeuTo.TU_PHE,
          MaYeuTo.NGU_MO,
          MaYeuTo.VANG_VONG,
          MaYeuTo.SOC_HUYEN_VONG,
        ].map((ma) => 'YEU_TO:' + ma),
        'CHI_NGAY:' + DiaChi.MUI,
        'NGAY_AM:15',
      ].sort(),
    );
  });

  it('Thiên Hậu dùng identity alias Dịch Mã, không tạo factor song song', () => {
    const nen = new Set(
      QUY_TAC_CAU_Y_TRI_BENH.filter((r) => r.tacDong === TacDongDungSu.NEN).map(key),
    );
    expect(nen.has('YEU_TO:' + MaYeuTo.DICH_MA)).toBe(true);
  });

  it('mọi baseline rule giữ Việt + Hán provenance verified', () => {
    for (const rule of QUY_TAC_CAU_Y_TRI_BENH) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
