import { createBrowserRouter } from 'react-router';

import { TrangAnGiuong } from './pages/an-giuong-page';
import { TrangAnTang } from './pages/an-tang-page';
import { TrangCauPhuc } from './pages/cau-phuc-page';
import { TrangCauTu } from './pages/cau-tu-page';
import { TrangDiChuyen } from './pages/moving-page';
import { TrangDongTho, TrangSuaCungThat } from './pages/earthwork-pages';
import { TrangChu } from './pages/home-page';
import { TrangKhaiTruong } from './pages/khai-truong-page';
import { TrangKhanhThuong } from './pages/khanh-thuong-page';
import { TrangNhapHoc } from './pages/nhap-hoc-page';
import { TrangQuanDai } from './pages/quan-dai-page';
import { TrangXuatHanh } from './pages/xuat-hanh-page';
import { TrangTeTu } from './pages/te-tu-page';
import { TrangYenHoi } from './pages/yen-hoi-page';
import { TrangCuoiHoi } from './pages/wedding-page';
import { DUONG_DAN } from './routes';

export const boDinhTuyen = createBrowserRouter([
  {
    path: DUONG_DAN.TRANG_CHU,
    Component: TrangChu,
  },
  {
    path: DUONG_DAN.CUOI_HOI,
    Component: TrangCuoiHoi,
  },
  {
    path: DUONG_DAN.DI_CHUYEN,
    Component: TrangDiChuyen,
  },
  {
    path: DUONG_DAN.AN_GIUONG,
    Component: TrangAnGiuong,
  },
  {
    path: DUONG_DAN.QUAN_DAI,
    Component: TrangQuanDai,
  },
  {
    path: DUONG_DAN.NHAP_HOC,
    Component: TrangNhapHoc,
  },
  {
    path: DUONG_DAN.YEN_HOI,
    Component: TrangYenHoi,
  },
  {
    path: DUONG_DAN.KHANH_THUONG,
    Component: TrangKhanhThuong,
  },
  {
    path: DUONG_DAN.TE_TU,
    Component: TrangTeTu,
  },
  {
    path: DUONG_DAN.CAU_PHUC,
    Component: TrangCauPhuc,
  },
  {
    path: DUONG_DAN.CAU_TU,
    Component: TrangCauTu,
  },
  {
    path: DUONG_DAN.DONG_THO,
    Component: TrangDongTho,
  },
  {
    path: DUONG_DAN.SUA_CUNG_THAT,
    Component: TrangSuaCungThat,
  },
  {
    path: DUONG_DAN.KHAI_TRUONG,
    Component: TrangKhaiTruong,
  },
  {
    path: DUONG_DAN.XUAT_HANH,
    Component: TrangXuatHanh,
  },
  {
    path: DUONG_DAN.AN_TANG,
    Component: TrangAnTang,
  },
]);
