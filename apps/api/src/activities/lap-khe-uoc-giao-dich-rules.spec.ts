import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_LAP_KHE_UOC_GIAO_DICH } from './lap-khe-uoc-giao-dich-rules';

const key = (rule: (typeof QUY_TAC_LAP_KHE_UOC_GIAO_DICH)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  return d.loai;
};

describe('LAP_KHE_UOC_GIAO_DICH Q11 source lock', () => {
  it('khớp exact 7 Nên của 立劵交易', () => {
    expect(
      QUY_TAC_LAP_KHE_UOC_GIAO_DICH.filter((r) => r.tacDong === TacDongDungSu.NEN)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.THIEN_NGUYEN,
        'YEU_TO:' + MaYeuTo.DAN_NHAT,
        'YEU_TO:' + MaYeuTo.TAM_HOP,
        'TRUC:' + ThapNhiTruc.MAN,
        'YEU_TO:' + MaYeuTo.LUC_HOP,
        'YEU_TO:' + MaYeuTo.NGU_PHU,
        'YEU_TO:' + MaYeuTo.NGU_HOP,
      ].sort(),
    );
  });

  it('khớp exact 19 Kị, có Ngũ Ly nhưng không có Bế nhật', () => {
    const ky = QUY_TAC_LAP_KHE_UOC_GIAO_DICH.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toEqual(
      [
        'TRUC:' + ThapNhiTruc.BINH,
        'TRUC:' + ThapNhiTruc.THU,
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
          MaYeuTo.NGU_MO,
          MaYeuTo.CUU_KHONG,
          MaYeuTo.NGU_LY,
        ].map((ma) => 'YEU_TO:' + ma),
      ].sort(),
    );
    expect(ky).not.toContain('TRUC:' + ThapNhiTruc.BE);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.TRUONG_TINH);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.DOAN_TINH);
  });

  it('mọi baseline rule giữ Việt p857 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_LAP_KHE_UOC_GIAO_DICH) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
