import { describe, expect, it } from 'vitest';

import { taoThoiDiemGiuaNgayTaiMuiGio, tinhNgayDanSuTaiMuiGio } from './civil-date-timezone';

describe('instant -> civil date theo IANA timezone', () => {
  const thoiDiemGanLapXuan = new Date('2026-02-03T20:01:54.541Z');

  it('doi sang ngay dia phuong dung theo timezone', () => {
    expect(tinhNgayDanSuTaiMuiGio(thoiDiemGanLapXuan, 'Asia/Ho_Chi_Minh')).toBe('2026-02-04');
    expect(tinhNgayDanSuTaiMuiGio(thoiDiemGanLapXuan, 'Asia/Shanghai')).toBe('2026-02-04');
    expect(tinhNgayDanSuTaiMuiGio(thoiDiemGanLapXuan, 'UTC')).toBe('2026-02-03');
    expect(tinhNgayDanSuTaiMuiGio(thoiDiemGanLapXuan, 'America/Los_Angeles')).toBe('2026-02-03');
  });

  it('tao dung gio giua ngay tai timezone dich', () => {
    const ngay = '2026-11-27';

    expect(
      tinhNgayDanSuTaiMuiGio(
        taoThoiDiemGiuaNgayTaiMuiGio(ngay, 'Asia/Ho_Chi_Minh'),
        'Asia/Ho_Chi_Minh',
      ),
    ).toBe(ngay);

    expect(
      tinhNgayDanSuTaiMuiGio(
        taoThoiDiemGiuaNgayTaiMuiGio(ngay, 'America/Los_Angeles'),
        'America/Los_Angeles',
      ),
    ).toBe(ngay);
  });

  it('tu choi timezone khong hop le', () => {
    expect(() => tinhNgayDanSuTaiMuiGio(thoiDiemGanLapXuan, 'Khong/Co_Mui_Gio_Nay')).toThrow(
      RangeError,
    );
  });
});
