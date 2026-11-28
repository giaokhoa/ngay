import { describe, expect, it } from 'vitest';

import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_TRONG_TROT } from './trong-trot-rules';

function key(rule: (typeof QUY_TAC_TRONG_TROT)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'THO_VUONG') return 'THO_VUONG';
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  throw new Error('Unsupported condition');
}

describe('TRONG_TROT Q11 source lock', () => {
  it('khớp exact 13 Nên của 栽種', () => {
    expect(
      QUY_TAC_TRONG_TROT.filter((r) => r.tacDong === TacDongDungSu.NEN)
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

  it('khớp exact 21 Kị, giữ riêng Bình/Tử Thần, Nguyệt Yếm/Địa Hỏa và 九焦 alias', () => {
    expect(
      QUY_TAC_TRONG_TROT.filter((r) => r.tacDong === TacDongDungSu.KY)
        .map(key)
        .sort(),
    ).toEqual(
      [
        'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
        'YEU_TO:' + MaYeuTo.THO_PHU,
        'YEU_TO:' + MaYeuTo.NGUYET_PHA,
        'TRUC:' + ThapNhiTruc.BINH,
        'YEU_TO:' + MaYeuTo.TU_THAN,
        'YEU_TO:' + MaYeuTo.KIEP_SAT,
        'YEU_TO:' + MaYeuTo.TAI_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_HINH,
        'YEU_TO:' + MaYeuTo.NGUYET_YEM,
        'YEU_TO:' + MaYeuTo.DIA_HOA,
        'YEU_TO:' + MaYeuTo.DAI_THOI,
        'YEU_TO:' + MaYeuTo.THIEN_LAI,
        'YEU_TO:' + MaYeuTo.TU_KHI,
        'YEU_TO:' + MaYeuTo.TU_PHE,
        'YEU_TO:' + MaYeuTo.NGU_MO,
        'YEU_TO:' + MaYeuTo.CUU_KHAM,
        'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
        'YEU_TO:' + MaYeuTo.DIA_NANG,
        'CAN_NGAY:' + ThienCan.AT,
        'THO_VUONG',
      ].sort(),
    );
  });

  it('mọi baseline rule giữ Việt p861 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_TRONG_TROT) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
