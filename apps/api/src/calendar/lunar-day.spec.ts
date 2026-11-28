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

  it('khóa Hối nhật là ngày dân sự ngay trước Sóc kế tiếp', () => {
    const hoi = tinhThongTinNgayAm('2024-02-09', MUI_GIO_VIET_NAM);
    expect(hoi).toMatchObject({
      ngaySocKeTiep: '2024-02-10',
      ngayCuoiThang: '2024-02-09',
      laHoiNhat: true,
    });

    const truocHoi = tinhThongTinNgayAm('2024-02-08', MUI_GIO_VIET_NAM);
    expect(truocHoi.ngayCuoiThang).toBe('2024-02-09');
    expect(truocHoi.laHoiNhat).toBe(false);
  });

  it('Hối nhật tự thích ứng tháng âm 29/30 ngày qua Sóc kế tiếp', () => {
    const samples = ['2024-01-10', '2024-02-09', '2024-03-09', '2024-04-07'];
    for (const ngayDanSu of samples) {
      const info = tinhThongTinNgayAm(ngayDanSu, MUI_GIO_VIET_NAM);
      expect(info.laHoiNhat).toBe(ngayDanSu === info.ngayCuoiThang);
      expect(info.ngayTrongThang).toBeGreaterThanOrEqual(29);
      expect(info.ngayTrongThang).toBeLessThanOrEqual(30);
    }
  });

  it('đếm ngày âm theo ngày dân sự từ sóc', () => {
    expect(tinhThongTinNgayAm('2024-02-24', MUI_GIO_VIET_NAM)).toMatchObject({
      ngaySoc: '2024-02-10',
      ngayTrongThang: 15,
    });
  });
});
