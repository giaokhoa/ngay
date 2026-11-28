import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_NHAN_NAP_GIA_SUC } from './nhan-nap-gia-suc-rules';

function key(rule: (typeof QUY_TAC_NHAN_NAP_GIA_SUC)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  throw new Error('Unexpected condition ' + d.loai);
}

describe('NHAN_NAP_GIA_SUC Q11 source lock', () => {
  it('khớp exact 13 Nên của 納畜', () => {
    expect(
      QUY_TAC_NHAN_NAP_GIA_SUC.filter((r) => r.tacDong === TacDongDungSu.NEN)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.THIEN_DUC,
        'YEU_TO:' + MaYeuTo.NGUYET_DUC,
        'YEU_TO:' + MaYeuTo.THIEN_DUC_HOP,
        'YEU_TO:' + MaYeuTo.NGUYET_DUC_HOP,
        'YEU_TO:' + MaYeuTo.THIEN_XA,
        'YEU_TO:' + MaYeuTo.MAU_THUONG,
        'YEU_TO:' + MaYeuTo.THIEN_NGUYEN,
        'YEU_TO:' + MaYeuTo.DAN_NHAT,
        'YEU_TO:' + MaYeuTo.TAM_HOP,
        'TRUC:' + ThapNhiTruc.THU,
        'YEU_TO:' + MaYeuTo.LUC_HOP,
        'YEU_TO:' + MaYeuTo.NGU_PHU,
        'YEU_TO:' + MaYeuTo.THIEN_THUONG,
      ].sort(),
    );
  });

  it('khớp exact 13 Kị, giống Kị 牧養', () => {
    expect(
      QUY_TAC_NHAN_NAP_GIA_SUC.filter((r) => r.tacDong === TacDongDungSu.KY)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.NGUYET_PHA,
        'TRUC:' + ThapNhiTruc.BINH,
        'YEU_TO:' + MaYeuTo.TU_THAN,
        'YEU_TO:' + MaYeuTo.KIEP_SAT,
        'YEU_TO:' + MaYeuTo.TAI_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_HINH,
        'YEU_TO:' + MaYeuTo.NGUYET_HAI,
        'YEU_TO:' + MaYeuTo.NGUYET_YEM,
        'YEU_TO:' + MaYeuTo.DAI_THOI,
        'YEU_TO:' + MaYeuTo.THIEN_LAI,
        'YEU_TO:' + MaYeuTo.TU_PHE,
        'YEU_TO:' + MaYeuTo.NGU_MO,
      ].sort(),
    );
  });

  it('Trường/Đoản Tinh là Q10-only supplemental, không pollute baseline Q11', () => {
    const all = QUY_TAC_NHAN_NAP_GIA_SUC.map(key);
    expect(all).not.toContain('YEU_TO:' + MaYeuTo.TRUONG_TINH);
    expect(all).not.toContain('YEU_TO:' + MaYeuTo.DOAN_TINH);
  });

  it('mọi baseline rule giữ Việt p861–862 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_NHAN_NAP_GIA_SUC) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
