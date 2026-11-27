import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_CUOI_HOI } from './cuoi-hoi-rules';

const NEN = new Set([
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.THIEN_NGUYEN,
  MaYeuTo.TAM_HOP,
  MaYeuTo.THIEN_HY,
  MaYeuTo.LUC_HOP,
  MaYeuTo.BAT_TUONG,
]);

const KY_YEU_TO = new Set([
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.YEM_DOI,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.TU_KY,
  MaYeuTo.TU_CUNG,
  MaYeuTo.NGU_MO,
  MaYeuTo.VANG_VONG,
  MaYeuTo.BAT_CHUYEN,
]);

describe('Q11 CUOI_HOI rules', () => {
  it('has exactly 10 Nên and 20 Kị rules', () => {
    expect(QUY_TAC_CUOI_HOI.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(10);
    expect(QUY_TAC_CUOI_HOI.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(20);
    expect(QUY_TAC_CUOI_HOI).toHaveLength(30);
  });

  it('matches the exact Q11 favorable factor set', () => {
    const actual = new Set(
      QUY_TAC_CUOI_HOI.filter(
        (rule) => rule.tacDong === TacDongDungSu.NEN && rule.dieuKien.loai === 'YEU_TO',
      ).map((rule) => (rule.dieuKien.loai === 'YEU_TO' ? rule.dieuKien.ma : null)),
    );
    expect(actual).toEqual(NEN);
  });

  it('uses typed targets for all 20 blockers', () => {
    const rules = QUY_TAC_CUOI_HOI.filter((rule) => rule.tacDong === TacDongDungSu.KY);
    const factorSet = new Set(
      rules
        .filter((rule) => rule.dieuKien.loai === 'YEU_TO')
        .map((rule) => (rule.dieuKien.loai === 'YEU_TO' ? rule.dieuKien.ma : null)),
    );
    const trucSet = new Set(
      rules
        .filter((rule) => rule.dieuKien.loai === 'TRUC')
        .map((rule) => (rule.dieuKien.loai === 'TRUC' ? rule.dieuKien.truc : null)),
    );
    const chiSet = new Set(
      rules
        .filter((rule) => rule.dieuKien.loai === 'CHI_NGAY')
        .map((rule) => (rule.dieuKien.loai === 'CHI_NGAY' ? rule.dieuKien.chi : null)),
    );

    expect(factorSet).toEqual(KY_YEU_TO);
    expect(trucSet).toEqual(new Set([ThapNhiTruc.BINH, ThapNhiTruc.THU, ThapNhiTruc.BE]));
    expect(chiSet).toEqual(new Set([DiaChi.HOI]));
  });

  it('every rule carries verified Vietnamese and Hán provenance', () => {
    for (const rule of QUY_TAC_CUOI_HOI) {
      expect(rule.nguon).toHaveLength(2);
      expect(rule.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});
