import { createBrowserRouter } from 'react-router';

import { TrangAnTang } from './pages/an-tang-page';
import { TrangDiChuyen } from './pages/moving-page';
import { TrangDongTho, TrangSuaCungThat } from './pages/earthwork-pages';
import { TrangChu } from './pages/home-page';
import { TrangKhaiTruong } from './pages/khai-truong-page';
import { TrangDemoRuleDb } from './pages/rules-demo-page';
import { TrangXuatHanh } from './pages/xuat-hanh-page';
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
  {
    path: DUONG_DAN.RULES,
    Component: TrangDemoRuleDb,
  },
]);
