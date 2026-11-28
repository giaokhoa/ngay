import { describe, expect, it } from 'vitest';

import {
  taoUrlChiTietNgay,
  taoUrlTongQuanThang,
  taoUrlXemAnTang,
  taoUrlXemCuoiHoi,
  taoUrlXemDiChuyen,
  taoUrlXemDongTho,
  taoUrlXemKhaiTruong,
  taoUrlXemSuaCungThat,
  taoUrlXemThang,
  taoUrlXemXuatHanh,
} from './date-selection';

describe('date-selection URLs', () => {
  it.each([
    ['cuoi-hoi', taoUrlXemCuoiHoi],
    ['di-chuyen', taoUrlXemDiChuyen],
    ['dong-tho', taoUrlXemDongTho],
    ['sua-cung-that', taoUrlXemSuaCungThat],
    ['khai-truong', taoUrlXemKhaiTruong],
    ['xuat-hanh', taoUrlXemXuatHanh],
    ['an-tang', taoUrlXemAnTang],
  ] as const)('giữ instant ISO và timezone IANA cho %s', (duongDan, taoUrl) => {
    const url = taoUrl(new Date('2026-11-27T05:00:00.000Z'), 'Asia/Ho_Chi_Minh');

    const parsed = new URL(url, 'https://ngay.local');
    expect(parsed.pathname).toBe('/date-selection/' + duongDan);
    expect(parsed.searchParams.get('thoiDiem')).toBe('2026-11-27T05:00:00.000Z');
    expect(parsed.searchParams.get('muiGio')).toBe('Asia/Ho_Chi_Minh');
  });

  it('tạo query tổng quan tháng từ ngày sinh đầy đủ mà không cần công việc', () => {
    const url = taoUrlTongQuanThang('1990-02-03', 2026, 11, 'Asia/Ho_Chi_Minh');

    const parsed = new URL(url, 'https://ngay.local');
    expect(parsed.pathname).toBe('/date-selection/tong-quan-thang');
    expect(parsed.searchParams.get('ngaySinh')).toBe('1990-02-03');
    expect(parsed.searchParams.get('nam')).toBe('2026');
    expect(parsed.searchParams.get('thang')).toBe('11');
    expect(parsed.searchParams.get('congViec')).toBeNull();
  });

  it('tạo query chi tiết ngày với năm sinh', () => {
    const url = taoUrlChiTietNgay(
      'AN_TANG',
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
      [{ namSinh: 1984, truocLapXuan: false }],
    );

    const parsed = new URL(url, 'https://ngay.local');
    expect(parsed.pathname).toBe('/date-selection/chi-tiet');
    expect(parsed.searchParams.get('congViec')).toBe('AN_TANG');
    expect(parsed.searchParams.get('thoiDiem')).toBe('2026-11-27T05:00:00.000Z');
    expect(parsed.searchParams.getAll('namSinh')).toEqual(['1984']);
  });

  it('tạo query xem tháng với nhiều năm sinh và cờ trước Lập Xuân', () => {
    const url = taoUrlXemThang('CUOI_HOI', 2026, 11, 'Asia/Ho_Chi_Minh', [
      { namSinh: 1990, truocLapXuan: false },
      { namSinh: 1992, truocLapXuan: true },
    ]);

    const parsed = new URL(url, 'https://ngay.local');
    expect(parsed.pathname).toBe('/date-selection/thang');
    expect(parsed.searchParams.get('congViec')).toBe('CUOI_HOI');
    expect(parsed.searchParams.get('nam')).toBe('2026');
    expect(parsed.searchParams.get('thang')).toBe('11');
    expect(parsed.searchParams.get('muiGio')).toBe('Asia/Ho_Chi_Minh');
    expect(parsed.searchParams.getAll('namSinh')).toEqual(['1990', '1992']);
    expect(parsed.searchParams.getAll('truocLapXuan')).toEqual(['false', 'true']);
  });
});
