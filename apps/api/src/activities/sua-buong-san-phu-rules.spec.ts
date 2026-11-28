import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_SUA_BUONG_SAN_PHU } from './sua-buong-san-phu-rules';

const key = (rule: (typeof QUY_TAC_SUA_BUONG_SAN_PHU)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'THO_VUONG') return 'THO_VUONG';
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  throw new Error('Điều kiện Q11 không được hỗ trợ trong test key');
};

describe('SUA_BUONG_SAN_PHU Q11 source lock', () => {
  it('khớp exact 1 Nên của 修置産室', () => {
    expect(
      QUY_TAC_SUA_BUONG_SAN_PHU.filter((r) => r.tacDong === TacDongDungSu.NEN).map(key),
    ).toEqual(['TRUC:' + ThapNhiTruc.KHAI]);
  });

  it('khớp exact 21 Kị, giữ riêng Bình/Tử Thần và Thổ Phủ/Thổ Phù', () => {
    expect(
      QUY_TAC_SUA_BUONG_SAN_PHU.filter((r) => r.tacDong === TacDongDungSu.KY)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
        'YEU_TO:' + MaYeuTo.THO_PHU,
        'YEU_TO:' + MaYeuTo.NGUYET_PHA,
        'TRUC:' + ThapNhiTruc.BINH,
        'YEU_TO:' + MaYeuTo.TU_THAN,
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
        'YEU_TO:' + MaYeuTo.TU_KHI,
        'YEU_TO:' + MaYeuTo.TU_PHE,
        'YEU_TO:' + MaYeuTo.NGU_MO,
        'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
        'YEU_TO:' + MaYeuTo.DIA_NANG,
        'THO_VUONG',
      ].sort(),
    );
  });

  it('mọi baseline rule giữ Việt p858 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_SUA_BUONG_SAN_PHU) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
