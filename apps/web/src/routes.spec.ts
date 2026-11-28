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
    expect(DUONG_DAN.CAU_PHUC).toBe('/cau-phuc');
    expect(DUONG_DAN.CAU_TU).toBe('/cau-tu');
    expect(DUONG_DAN.GIAI_TRU).toBe('/giai-tru');
    expect(DUONG_DAN.CHINH_DUNG_CAT_TOC).toBe('/chinh-dung-cat-toc');
    expect(DUONG_DAN.CAU_Y_TRI_BENH).toBe('/cau-y-tri-benh');
    expect(DUONG_DAN.SUA_MONG_TAY_CHAN).toBe('/sua-mong-tay-chan');
    expect(DUONG_DAN.MAY_DO).toBe('/may-do');
    expect(DUONG_DAN.LAP_KHE_UOC_GIAO_DICH).toBe('/lap-khe-uoc-giao-dich');
    expect(DUONG_DAN.NAP_TAI).toBe('/nap-tai');
    expect(DUONG_DAN.MO_KHO_XUAT_HANG_TIEN).toBe('/mo-kho-xuat-hang-tien');
    expect(DUONG_DAN.SUA_BUONG_SAN_PHU).toBe('/sua-buong-san-phu');
    expect(DUONG_DAN.DONG_THO).toBe('/dong-tho');
    expect(DUONG_DAN.SUA_CUNG_THAT).toBe('/sua-cung-that');
    expect(DUONG_DAN.KHAI_TRUONG).toBe('/khai-truong');
    expect(DUONG_DAN.XUAT_HANH).toBe('/xuat-hanh');
    expect(DUONG_DAN.AN_TANG).toBe('/an-tang');
  });
});
