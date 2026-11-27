import { describe, expect, it } from 'vitest';

import {
  congNgayDanSu,
  phanTichNgayDanSu,
  soSanhNgayDanSu,
  tinhJulianDayNumber,
  tinhNgayDanSuTuJulianDayNumber,
} from './civil-date';

describe('Ngay dan su', () => {
  it('phan tich ngay hop le', () => {
    expect(phanTichNgayDanSu('2024-02-29')).toEqual({
      nam: 2024,
      thang: 2,
      ngay: 29,
    });
  });

  it.each(['2023-02-29', '2026-13-01', '2026-00-10', '2026-01-00', '26-01-01'])(
    'tu choi ngay khong hop le: %s',
    (ngay) => {
      expect(() => phanTichNgayDanSu(ngay)).toThrow(RangeError);
    },
  );

  it('chenh lech JDN chi phu thuoc civil date', () => {
    expect(tinhJulianDayNumber('2026-01-02') - tinhJulianDayNumber('2026-01-01')).toBe(1);
    expect(tinhJulianDayNumber('2024-03-01') - tinhJulianDayNumber('2024-02-28')).toBe(2);
  });

  it.each(['1949-10-01', '2024-02-29', '2026-01-01', '2026-12-31'])(
    'round-trip JDN cho %s',
    (ngay) => {
      expect(tinhNgayDanSuTuJulianDayNumber(tinhJulianDayNumber(ngay))).toBe(ngay);
    },
  );

  it('cong tru civil day qua bien thang va nam nhuan', () => {
    expect(congNgayDanSu('2026-02-04', -18)).toBe('2026-01-17');
    expect(congNgayDanSu('2024-02-28', 1)).toBe('2024-02-29');
    expect(congNgayDanSu('2024-02-29', 1)).toBe('2024-03-01');
  });

  it('so sanh civil date khong phu thuoc timezone runtime', () => {
    expect(soSanhNgayDanSu('2026-01-17', '2026-01-16')).toBe(1);
    expect(soSanhNgayDanSu('2026-01-17', '2026-01-17')).toBe(0);
    expect(soSanhNgayDanSu('2026-01-16', '2026-01-17')).toBe(-1);
  });
});
