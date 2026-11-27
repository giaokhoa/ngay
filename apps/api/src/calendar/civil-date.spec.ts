import { describe, expect, it } from 'vitest';

import { phanTichNgayDanSu, tinhJulianDayNumber } from './civil-date';

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
});
