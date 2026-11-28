import { describe, expect, it } from 'vitest';

import { TinhTietKhiService } from '../calendar/solar-term.service';
import { tinhThongTinNgayAm } from '../calendar/lunar-day';

const solar = new TinhTietKhiService();
const VN = 'Asia/Ho_Chi_Minh';

describe('independent Hán Q6/Q9 oracle — 四離 四絶', () => {
  it('四離 = day before 春分 夏至 秋分 冬至', () => {
    expect(
      ['2026-03-19', '2026-06-20', '2026-09-22', '2026-12-21'].filter((d) =>
        solar.laNgayTuLy(d, VN),
      ),
    ).toEqual(['2026-03-19', '2026-06-20', '2026-09-22', '2026-12-21']);
  });

  it('四絶 = day before 立春 立夏 立秋 立冬', () => {
    expect(
      ['2026-02-03', '2026-05-04', '2026-08-06', '2026-11-06'].filter((d) =>
        solar.laNgayTuTuyet(d, VN),
      ),
    ).toEqual(['2026-02-03', '2026-05-04', '2026-08-06', '2026-11-06']);
  });
});

describe('independent Hán Q10 oracle — 晦日', () => {
  it('晦為月盡之日: local civil day immediately before next astronomical sóc', () => {
    expect(tinhThongTinNgayAm('2024-02-09', VN)).toMatchObject({
      ngaySocKeTiep: '2024-02-10',
      ngayCuoiThang: '2024-02-09',
      laHoiNhat: true,
    });
  });
});
