import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_DI_CHUYEN } from './di-chuyen-rules';

const NEN = new Set([
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.THIEN_NGUYEN,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
  MaYeuTo.THOI_DUC,
  MaYeuTo.DAN_NHAT,
  MaYeuTo.DICH_MA,
  MaYeuTo.THIEN_MA,
]);

const KY = new Set([
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_MO,
  MaYeuTo.QUY_KY,
  MaYeuTo.VANG_VONG,
]);

describe('Q11 DI_CHUYEN rules', () => {
  it('has exactly 14 Nên and 15 Kị rules', () => {
    expect(QUY_TAC_DI_CHUYEN.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(14);
    expect(QUY_TAC_DI_CHUYEN.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(15);
    expect(QUY_TAC_DI_CHUYEN).toHaveLength(29);
  });

  it('matches exact Nên factor + Trực set', () => {
    const rules = QUY_TAC_DI_CHUYEN.filter((rule) => rule.tacDong === TacDongDungSu.NEN);
    expect(
      new Set(
        rules
          .filter((rule) => rule.dieuKien.loai === 'YEU_TO')
          .map((rule) => (rule.dieuKien.loai === 'YEU_TO' ? rule.dieuKien.ma : null)),
      ),
    ).toEqual(NEN);
    expect(
      new Set(
        rules
          .filter((rule) => rule.dieuKien.loai === 'TRUC')
          .map((rule) => (rule.dieuKien.loai === 'TRUC' ? rule.dieuKien.truc : null)),
      ),
    ).toEqual(new Set([ThapNhiTruc.THANH, ThapNhiTruc.KHAI]));
  });

  it('matches exact Kị factor + Trực set', () => {
    const rules = QUY_TAC_DI_CHUYEN.filter((rule) => rule.tacDong === TacDongDungSu.KY);
    expect(
      new Set(
        rules
          .filter((rule) => rule.dieuKien.loai === 'YEU_TO')
          .map((rule) => (rule.dieuKien.loai === 'YEU_TO' ? rule.dieuKien.ma : null)),
      ),
    ).toEqual(KY);
    expect(
      new Set(
        rules
          .filter((rule) => rule.dieuKien.loai === 'TRUC')
          .map((rule) => (rule.dieuKien.loai === 'TRUC' ? rule.dieuKien.truc : null)),
      ),
    ).toEqual(new Set([ThapNhiTruc.BINH, ThapNhiTruc.THU, ThapNhiTruc.BE]));
  });

  it('every rule has verified Vietnamese + Hán Q11 provenance', () => {
    for (const rule of QUY_TAC_DI_CHUYEN) {
      expect(rule.nguon).toHaveLength(2);
      expect(rule.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});
