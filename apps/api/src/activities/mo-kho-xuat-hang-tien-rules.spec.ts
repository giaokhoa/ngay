import { describe, expect, it } from 'vitest';

import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_MO_KHO_XUAT_HANG_TIEN } from './mo-kho-xuat-hang-tien-rules';

const key = (rule: (typeof QUY_TAC_MO_KHO_XUAT_HANG_TIEN)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  return d.loai;
};

describe('MO_KHO_XUAT_HANG_TIEN Q11 source lock', () => {
  it('khớp exact 5 Nên của 開倉庫出貨財', () => {
    expect(
      QUY_TAC_MO_KHO_XUAT_HANG_TIEN.filter((r) => r.tacDong === TacDongDungSu.NEN)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.NGUYET_AN,
        'YEU_TO:' + MaYeuTo.TU_TUONG,
        'YEU_TO:' + MaYeuTo.THOI_DUC,
        'TRUC:' + ThapNhiTruc.MAN,
        'YEU_TO:' + MaYeuTo.NGU_PHU,
      ].sort(),
    );
  });

  it('canonical hóa 23 tên Kị nguồn thành đúng 22 điều kiện vì 月煞/月虚 đồng identity', () => {
    const ky = QUY_TAC_MO_KHO_XUAT_HANG_TIEN.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toHaveLength(22);
    expect(ky).toEqual(
      [
        'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
        'YEU_TO:' + MaYeuTo.NGUYET_PHA,
        'YEU_TO:' + MaYeuTo.DAI_HAO,
        'TRUC:' + ThapNhiTruc.BINH,
        'TRUC:' + ThapNhiTruc.THU,
        'TRUC:' + ThapNhiTruc.BE,
        'YEU_TO:' + MaYeuTo.KIEP_SAT,
        'YEU_TO:' + MaYeuTo.TAI_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_HINH,
        'YEU_TO:' + MaYeuTo.NGUYET_HAI,
        'YEU_TO:' + MaYeuTo.NGUYET_YEM,
        'YEU_TO:' + MaYeuTo.DAI_THOI,
        'YEU_TO:' + MaYeuTo.THIEN_LAI,
        'YEU_TO:' + MaYeuTo.TIEU_HAO,
        'YEU_TO:' + MaYeuTo.THIEN_TAC,
        'YEU_TO:' + MaYeuTo.TU_HAO,
        'YEU_TO:' + MaYeuTo.TU_PHE,
        'YEU_TO:' + MaYeuTo.TU_CUNG,
        'YEU_TO:' + MaYeuTo.NGU_HU,
        'YEU_TO:' + MaYeuTo.CUU_KHONG,
        'CAN_NGAY:' + ThienCan.GIAP,
      ].sort(),
    );
    expect(ky.filter((item) => item === 'YEU_TO:' + MaYeuTo.NGUYET_SAT)).toHaveLength(1);
  });

  it('mọi baseline rule giữ Việt p858 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_MO_KHO_XUAT_HANG_TIEN) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
