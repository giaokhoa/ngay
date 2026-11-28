import { describe, expect, it } from 'vitest';

import { LoaiCongViec } from '../activities/activity-rule';
import { taoDanhMucTriThuc } from './knowledge-catalog';

describe('Postgres knowledge catalog mirror', () => {
  const catalog = taoDanhMucTriThuc();

  it('covers all nine implemented activities', () => {
    expect(catalog.hoatDong.map((item) => item.code).sort()).toEqual(
      Object.values(LoaiCongViec).sort(),
    );
  });

  it('has a unique database identity per activity/layer/rule', () => {
    const keys = catalog.quyTac.map((rule) => rule.hoatDong + ':' + rule.lop + ':' + rule.ma);

    expect(new Set(keys).size).toBe(keys.length);
  });

  it('mirrors both Q11 and Q10 knowledge', () => {
    expect(catalog.quyTac.some((rule) => rule.lop === 'Q11')).toBe(true);
    expect(catalog.quyTac.some((rule) => rule.lop === 'Q10')).toBe(true);

    for (const activity of Object.values(LoaiCongViec)) {
      expect(catalog.quyTac.some((rule) => rule.hoatDong === activity)).toBe(true);
    }
  });

  it('keeps every mirrored source verified', () => {
    expect(catalog.quyTac.length).toBeGreaterThan(100);
    expect(catalog.quyTac.every((rule) => rule.nguon.length > 0)).toBe(true);
    expect(catalog.quyTac.every((rule) => rule.nguon.every((source) => source.daXacMinh))).toBe(
      true,
    );
  });

  it('mirrors the migrated Q4 wedding rules without keeping duplicate legacy hard-day rows', () => {
    expect(
      catalog.quyTac.some(
        (rule) =>
          rule.hoatDong === LoaiCongViec.CUOI_HOI &&
          rule.kieu === 'CONFLICT' &&
          rule.ma === 'CUOI_HOI_Q10_Q4_HARD_DAI_HOI_1',
      ),
    ).toBe(true);

    expect(
      catalog.quyTac.some(
        (rule) =>
          rule.hoatDong === LoaiCongViec.CUOI_HOI &&
          rule.kieu === 'LEGACY_CONFLICT' &&
          rule.ma.includes('Q4_HARD_'),
      ),
    ).toBe(false);
  });

  it('preserves the XUAT_HANH Q10-sourced Nguyệt Yếm base blocker', () => {
    const rule = catalog.quyTac.find((item) => item.ma === 'XUAT_HANH_Q10_KY_NGUYET_YEM');

    expect(rule?.hoatDong).toBe(LoaiCongViec.XUAT_HANH);
    expect(rule?.lop).toBe('Q10');
    expect(rule?.kieu).toBe('ACTIVITY');
    expect(rule?.nguon[0]?.quyen).toBe(10);
    expect(rule?.nguon[0]?.trang).toBe(806);
  });
});
