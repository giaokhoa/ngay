import { describe, expect, it } from 'vitest';

import { laNgaySocHuyenVong } from '../calendar/lunar-day';

const VN = 'Asia/Ho_Chi_Minh';

describe('independent Hán Q10 oracle — 朔弦朢 WYG_010-71a', () => {
  it('locks one civil date for each of the four cardinal lunar phases', () => {
    expect(
      ['2024-02-10', '2024-02-16', '2024-02-24', '2024-03-03'].map((date) => [
        date,
        laNgaySocHuyenVong(date, VN),
      ]),
    ).toEqual([
      ['2024-02-10', true],
      ['2024-02-16', true],
      ['2024-02-24', true],
      ['2024-03-03', true],
    ]);
  });

  it('does not smear a phase instant into adjacent civil dates', () => {
    for (const date of [
      '2024-02-09',
      '2024-02-11',
      '2024-02-15',
      '2024-02-17',
      '2024-02-23',
      '2024-02-25',
    ]) {
      expect(laNgaySocHuyenVong(date, VN)).toBe(false);
    }
  });
});
