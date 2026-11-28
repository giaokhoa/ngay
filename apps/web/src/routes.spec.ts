import { describe, expect, it } from 'vitest';

import { DUONG_DAN } from './routes';

describe('DUONG_DAN', () => {
  it('có route cho các vertical đã implement', () => {
    expect(DUONG_DAN.TRANG_CHU).toBe('/');
    expect(DUONG_DAN.CUOI_HOI).toBe('/cuoi-hoi');
    expect(DUONG_DAN.DI_CHUYEN).toBe('/di-chuyen');
    expect(DUONG_DAN.AN_GIUONG).toBe('/an-giuong');
    expect(DUONG_DAN.QUAN_DAI).toBe('/quan-dai');
    expect(DUONG_DAN.NHAP_HOC).toBe('/nhap-hoc');
    expect(DUONG_DAN.YEN_HOI).toBe('/yen-hoi');
    expect(DUONG_DAN.KHANH_THUONG).toBe('/khanh-thuong');
    expect(DUONG_DAN.TE_TU).toBe('/te-tu');
    expect(DUONG_DAN.DONG_THO).toBe('/dong-tho');
    expect(DUONG_DAN.SUA_CUNG_THAT).toBe('/sua-cung-that');
    expect(DUONG_DAN.KHAI_TRUONG).toBe('/khai-truong');
    expect(DUONG_DAN.XUAT_HANH).toBe('/xuat-hanh');
    expect(DUONG_DAN.AN_TANG).toBe('/an-tang');
  });
});
