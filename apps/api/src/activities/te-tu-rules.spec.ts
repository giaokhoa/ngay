import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_TE_TU } from './te-tu-rules';

const key = (rule: (typeof QUY_TAC_TE_TU)[number]) => {
  const d = rule.dieuKien;
  if (d.loai === 'YEU_TO') return 'YEU_TO:' + d.ma;
  if (d.loai === 'TRUC') return 'TRUC:' + d.truc;
  if (d.loai === 'CHI_NGAY') return 'CHI_NGAY:' + d.chi;
  return d.loai;
};

describe('TE_TU Q11 source lock', () => {
  it('khớp Hán exact 16 Nên / 2 Kị của 祭祀', () => {
    const nen = QUY_TAC_TE_TU.filter((r) => r.tacDong === TacDongDungSu.NEN)
      .map(key)
      .sort();
    const ky = QUY_TAC_TE_TU.filter((r) => r.tacDong === TacDongDungSu.KY)
      .map(key)
      .sort();

    expect(nen).toEqual(
      [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_XA,
        MaYeuTo.THIEN_NGUYEN,
        MaYeuTo.NGUYET_AN,
        MaYeuTo.TU_TUONG,
        MaYeuTo.THOI_DUC,
        MaYeuTo.THIEN_VU,
        MaYeuTo.PHO_HO,
        MaYeuTo.PHUC_SINH,
        MaYeuTo.THANH_TAM,
        MaYeuTo.ICH_HAU,
        MaYeuTo.TUC_THE,
      ]
        .map((ma) => 'YEU_TO:' + ma)
        .concat('TRUC:' + ThapNhiTruc.KHAI)
        .sort(),
    );
    expect(ky).toEqual(['YEU_TO:' + MaYeuTo.THIEN_CAU, 'CHI_NGAY:' + DiaChi.DAN].sort());
  });

  it('source-locks Phúc Sinh to Hán only because Việt p844 omits it', () => {
    const phucSinh = QUY_TAC_TE_TU.find((rule) => rule.ma === 'TE_TU_NEN_PHUC_SINH')!;
    expect(phucSinh.nguon.every((source) => source.loaiNguon === LoaiNguon.HAN_BAN)).toBe(true);
    expect(phucSinh.nguon.some((source) => source.quyen === 11)).toBe(true);
    expect(phucSinh.nguon.some((source) => source.quyen === 6)).toBe(true);
    expect(phucSinh.nguon.every((source) => source.daXacMinh)).toBe(true);
  });

  it('keeps Việt + Hán provenance for the 17 non-discrepant rules', () => {
    for (const rule of QUY_TAC_TE_TU.filter((item) => item.ma !== 'TE_TU_NEN_PHUC_SINH')) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
    }
  });
});
