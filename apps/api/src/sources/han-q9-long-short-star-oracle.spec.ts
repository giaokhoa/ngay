import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import {
  NGAY_DOAN_TINH_THEO_CHI_THANG,
  NGAY_TRUONG_TINH_THEO_CHI_THANG,
} from '../factors/q9-long-short-star-definitions';

// Independent transcription fixture from WYG_009-33b, cross-checked against Q19–30 monthly headings.
const MONTHS: readonly [DiaChi, readonly number[], readonly number[]][] = [
  [DiaChi.DAN, [7], [21]],
  [DiaChi.MAO, [4], [19]],
  [DiaChi.THIN, [1], [16]],
  [DiaChi.TI, [9], [25]],
  [DiaChi.NGO, [15], [25]],
  [DiaChi.MUI, [10], [20]],
  [DiaChi.THAN, [8], [22]],
  [DiaChi.DAU, [2, 5], [18, 19]],
  [DiaChi.TUAT, [3, 4], [16, 17]],
  [DiaChi.HOI, [1], [14]],
  [DiaChi.TY, [12], [22]],
  [DiaChi.SUU, [9], [25]],
];

describe('independent Hán Q9 oracle — 長星 / 短星', () => {
  it.each(MONTHS)('%s matches Q9 + its Q19–30 monthly table', (chiThang, truong, doan) => {
    expect(NGAY_TRUONG_TINH_THEO_CHI_THANG[chiThang]).toEqual(truong);
    expect(NGAY_DOAN_TINH_THEO_CHI_THANG[chiThang]).toEqual(doan);
  });

  it('locks the two double-date months instead of simplifying the appendix formula', () => {
    expect(NGAY_TRUONG_TINH_THEO_CHI_THANG[DiaChi.DAU]).toEqual([2, 5]);
    expect(NGAY_TRUONG_TINH_THEO_CHI_THANG[DiaChi.TUAT]).toEqual([3, 4]);
    expect(NGAY_DOAN_TINH_THEO_CHI_THANG[DiaChi.DAU]).toEqual([18, 19]);
    expect(NGAY_DOAN_TINH_THEO_CHI_THANG[DiaChi.TUAT]).toEqual([16, 17]);
  });
});
