import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_DAT_COI_XAY_GIA } from './dat-coi-xay-gia-rules';

function key(rule: (typeof QUY_TAC_DAT_COI_XAY_GIA)[number]): string {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CAN_NGAY') return 'CAN_NGAY:' + d.can;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  if (d.loai === 'NGAY_AM') return 'NGAY_AM:' + d.ngay;
  return 'THO_VUONG';
}

describe('DAT_COI_XAY_GIA Q11 source lock', () => {
  it('khớp exact 2 Nên của 安碓磑', () => {
    expect(
      QUY_TAC_DAT_COI_XAY_GIA.filter((r) => r.tacDong === TacDongDungSu.NEN)
        .map(key)
        .sort(),
    ).toEqual(['YEU_TO:' + MaYeuTo.TAM_HOP, 'TRUC:' + ThapNhiTruc.KHAI].sort());
  });

  it('khớp exact 11 Kị; Bình/Thu/Bế/Ngũ Mộ không bị kéo từ earthwork', () => {
    const ky = QUY_TAC_DAT_COI_XAY_GIA.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();
    expect(ky).toEqual(
      [
        'YEU_TO:' + MaYeuTo.THO_PHU,
        'YEU_TO:' + MaYeuTo.NGUYET_PHA,
        'YEU_TO:' + MaYeuTo.KIEP_SAT,
        'YEU_TO:' + MaYeuTo.TAI_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_SAT,
        'YEU_TO:' + MaYeuTo.NGUYET_HINH,
        'YEU_TO:' + MaYeuTo.NGUYET_YEM,
        'YEU_TO:' + MaYeuTo.TU_PHE,
        'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
        'YEU_TO:' + MaYeuTo.DIA_NANG,
        'THO_VUONG',
      ].sort(),
    );
    expect(ky).not.toContain('TRUC:' + ThapNhiTruc.BINH);
    expect(ky).not.toContain('TRUC:' + ThapNhiTruc.THU);
    expect(ky).not.toContain('TRUC:' + ThapNhiTruc.BE);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.NGU_MO);
    expect(ky).not.toContain('YEU_TO:' + MaYeuTo.TU_THAN);
  });

  it('mọi rule giữ Việt p859 + Hán Q11 verified', () => {
    for (const rule of QUY_TAC_DAT_COI_XAY_GIA) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
