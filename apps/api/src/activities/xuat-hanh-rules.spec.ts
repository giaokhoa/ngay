import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { TacDongDungSu } from './activity-rule';
import {
  QUY_TAC_XUAT_HANH,
  QUY_TAC_XUAT_HANH_BO_SUNG_Q10,
  QUY_TAC_XUAT_HANH_Q11,
} from './xuat-hanh-rules';

const NEN_Q11 = new Set([
  'YEU_TO:THIEN_DUC',
  'YEU_TO:NGUYET_DUC',
  'YEU_TO:THIEN_DUC_HOP',
  'YEU_TO:NGUYET_DUC_HOP',
  'YEU_TO:THIEN_XA',
  'YEU_TO:THIEN_NGUYEN',
  'YEU_TO:NGUYET_AN',
  'YEU_TO:TU_TUONG',
  'YEU_TO:THOI_DUC',
  'YEU_TO:VUONG_NHAT',
  'YEU_TO:DICH_MA',
  'YEU_TO:THIEN_MA',
  'TRUC:KIEN',
  'YEU_TO:CAT_KY',
  'YEU_TO:THIEN_HY',
  'TRUC:KHAI',
]);

const KY_Q11_VIET = new Set([
  'YEU_TO:NGUYET_PHA',
  'TRUC:BINH',
  'TRUC:THU',
  'TRUC:BE',
  'YEU_TO:KIEP_SAT',
  'YEU_TO:TAI_SAT',
  'YEU_TO:NGUYET_SAT',
  'YEU_TO:NGUYET_HINH',
  'YEU_TO:DAI_THOI',
  'YEU_TO:THIEN_LAI',
  'YEU_TO:THIEN_TAC',
  'YEU_TO:TU_PHE',
  'YEU_TO:NGU_MO',
  'YEU_TO:VANG_VONG',
  'CHI_NGAY:TI',
]);

describe('Q11 XUAT_HANH exact Vietnamese rule set', () => {
  it('has exactly 16 Nên and 15 Kị', () => {
    expect(QUY_TAC_XUAT_HANH_Q11.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(
      16,
    );
    expect(QUY_TAC_XUAT_HANH_Q11.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(
      15,
    );
    expect(QUY_TAC_XUAT_HANH_Q11).toHaveLength(31);
  });

  it('matches exact Q11 Nên targets', () => {
    expect(tapTarget(QUY_TAC_XUAT_HANH_Q11, TacDongDungSu.NEN)).toEqual(NEN_Q11);
  });

  it('matches exact Vietnamese Q11 Kị targets without silently adding Nguyệt Yếm', () => {
    const ky = tapTarget(QUY_TAC_XUAT_HANH_Q11, TacDongDungSu.KY);
    expect(ky).toEqual(KY_Q11_VIET);
    expect(ky.has('YEU_TO:' + MaYeuTo.NGUYET_YEM)).toBe(false);
  });

  it('models ngày Tỵ as typed Chi ngày, not a factor', () => {
    expect(KY_Q11_VIET.has('CHI_NGAY:' + DiaChi.TI)).toBe(true);
  });

  it('uses typed Trực for Kiến/Khai/Bình/Thu/Bế', () => {
    expect(NEN_Q11.has('TRUC:' + ThapNhiTruc.KIEN)).toBe(true);
    expect(NEN_Q11.has('TRUC:' + ThapNhiTruc.KHAI)).toBe(true);
    expect(KY_Q11_VIET.has('TRUC:' + ThapNhiTruc.BINH)).toBe(true);
    expect(KY_Q11_VIET.has('TRUC:' + ThapNhiTruc.THU)).toBe(true);
    expect(KY_Q11_VIET.has('TRUC:' + ThapNhiTruc.BE)).toBe(true);
  });

  it('keeps the Q11 Việt/Hán discrepancy visible in provenance', () => {
    const source = QUY_TAC_XUAT_HANH_Q11[0]?.nguon;
    expect(source).toHaveLength(2);
    expect(source?.[0]?.ghiChu).toContain('không in Nguyệt Yếm');
    expect(source?.[1]?.ghiChu).toContain('月厭');
    expect(source?.every((item) => item.daXacMinh)).toBe(true);
  });
});

describe('XUAT_HANH Q10 supplemental blocker', () => {
  it('adds exactly Nguyệt Yếm from Q10, separate from exact Q11', () => {
    expect(QUY_TAC_XUAT_HANH_BO_SUNG_Q10).toHaveLength(1);
    expect(QUY_TAC_XUAT_HANH_BO_SUNG_Q10[0]?.dieuKien).toEqual({
      loai: 'YEU_TO',
      ma: MaYeuTo.NGUYET_YEM,
    });
    expect(QUY_TAC_XUAT_HANH_BO_SUNG_Q10[0]?.tacDong).toBe(TacDongDungSu.KY);
    expect(QUY_TAC_XUAT_HANH_BO_SUNG_Q10[0]?.nguon[0]?.quyen).toBe(10);
    expect(QUY_TAC_XUAT_HANH_BO_SUNG_Q10[0]?.nguon[0]?.trang).toBe(806);
  });

  it('effective base set has 16 Nên / 16 Kị identities', () => {
    expect(QUY_TAC_XUAT_HANH.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(16);
    expect(QUY_TAC_XUAT_HANH.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(16);
    expect(QUY_TAC_XUAT_HANH).toHaveLength(32);
  });
});

function tapTarget(rules: typeof QUY_TAC_XUAT_HANH_Q11, tacDong: TacDongDungSu): Set<string> {
  return new Set(
    rules.filter((rule) => rule.tacDong === tacDong).map((rule) => khoa(rule.dieuKien)),
  );
}

function khoa(target: (typeof QUY_TAC_XUAT_HANH_Q11)[number]['dieuKien']): string {
  switch (target.loai) {
    case 'YEU_TO':
      return 'YEU_TO:' + target.ma;
    case 'TRUC':
      return 'TRUC:' + target.truc;
    case 'CHI_NGAY':
      return 'CHI_NGAY:' + target.chi;
    case 'CAN_NGAY':
      return 'CAN_NGAY:' + target.can;
    case 'NGAY_AM':
      return 'NGAY_AM:' + target.ngay;
    case 'THO_VUONG':
      return 'THO_VUONG';
  }
}
