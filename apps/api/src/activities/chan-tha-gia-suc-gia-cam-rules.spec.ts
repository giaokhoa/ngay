import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM } from './chan-tha-gia-suc-gia-cam-rules';

function key(rule: (typeof QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  throw new Error('Unexpected condition ' + d.loai);
}

describe('CHAN_THA_GIA_SUC_GIA_CAM Q11 source lock', () => {
  it('khớp exact 13 Nên của 牧養', () => {
    expect(
      QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM.filter((r) => r.tacDong === TacDongDungSu.NEN)
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
        'YEU_TO:' + MaYeuTo.NGUYET_AN,
        'YEU_TO:' + MaYeuTo.TU_TUONG,
        'YEU_TO:' + MaYeuTo.THOI_DUC,
        'YEU_TO:' + MaYeuTo.DAN_NHAT,
        'TRUC:' + ThapNhiTruc.KHAI,
        'YEU_TO:' + MaYeuTo.NGU_PHU,
      ].sort(),
    );
  });

  it('khớp exact 13 Kị, giữ riêng Bình/Tử Thần và có Nguyệt Hại', () => {
    expect(
      QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM.filter((r) => r.tacDong === TacDongDungSu.KY)
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

  it('không kéo Tử Khí, Địa Hỏa, Cửu Tiêu hay thổ blockers của 栽種 sang 牧養', () => {
    const all = QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM.map(key);
    for (const factor of [
      MaYeuTo.TU_KHI,
      MaYeuTo.DIA_HOA,
      MaYeuTo.CUU_KHAM,
      MaYeuTo.THO_PHU,
      MaYeuTo.THO_PHU_TIN,
      MaYeuTo.DIA_NANG,
    ]) {
      expect(all).not.toContain('YEU_TO:' + factor);
    }
  });

  it('mọi baseline rule giữ Việt p861 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
