import { describe, expect, it } from 'vitest';

import { tinhThongTinNgayAm } from './lunar-day';

const MUI_GIO_VIET_NAM = 'Asia/Ho_Chi_Minh';

describe('tinhThongTinNgayAm', () => {
  it.each([
    ['2023-01-22', '2023-01-22'],
    ['2024-02-10', '2024-02-10'],
    ['2025-01-29', '2025-01-29'],
  ])('coi cả ngày dân sự chứa sóc là mồng 1: %s', (ngayDanSu, ngaySoc) => {
    const ketQua = tinhThongTinNgayAm(ngayDanSu, MUI_GIO_VIET_NAM);

    expect(ketQua.ngaySoc).toBe(ngaySoc);
    expect(ketQua.ngayTrongThang).toBe(1);
  });

  it('không lùi về tháng trước khi sóc xảy ra buổi tối cùng ngày', () => {
    const ketQua = tinhThongTinNgayAm('2025-01-29', MUI_GIO_VIET_NAM);

    expect(ketQua.thoiDiemSoc.toISOString()).toMatch(/^2025-01-29T/);
    expect(ketQua.ngayTrongThang).toBe(1);
  });

  it('đếm ngày âm theo ngày dân sự từ sóc', () => {
    expect(tinhThongTinNgayAm('2024-02-24', MUI_GIO_VIET_NAM)).toMatchObject({
      ngaySoc: '2024-02-10',
      ngayTrongThang: 15,
    });
  });
});
