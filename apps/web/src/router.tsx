import { createBrowserRouter } from 'react-router';

import { TrangAnGiuong } from './pages/an-giuong-page';
import { TrangAnTang } from './pages/an-tang-page';
import { TrangCauPhuc } from './pages/cau-phuc-page';
import { TrangCauTu } from './pages/cau-tu-page';
import { TrangChinhDungCatToc } from './pages/chinh-dung-cat-toc-page';
import { TrangCauYTriBenh } from './pages/cau-y-tri-benh-page';
import { TrangSuaMongTayChan } from './pages/sua-mong-tay-chan-page';
import { TrangMayDo } from './pages/may-do-page';
import { TrangLapKheUocGiaoDich } from './pages/lap-khe-uoc-giao-dich-page';
import { TrangNapTai } from './pages/nap-tai-page';
import { TrangMoKhoXuatHangTien } from './pages/mo-kho-xuat-hang-tien-page';
import { TrangSuaBuongSanPhu } from './pages/sua-buong-san-phu-page';
import { TrangDatCoiXayGia } from './pages/dat-coi-xay-gia-page';
import { TrangQuetDonNhaCua } from './pages/quet-don-nha-cua-page';
import { TrangTrangTriTuong } from './pages/trang-tri-tuong-page';
import { TrangSuaSangDuongSa } from './pages/sua-sang-duong-sa-page';
import { TrangPhaNhaHuyTuong } from './pages/pha-nha-huy-tuong-page';
import { TrangTrocNaBatBo } from './pages/troc-na-bat-bo-page';
import { TrangDiThuyenVuotSongNuoc } from './pages/di-thuyen-vuot-song-nuoc-page';
import { TrangGiaiTru } from './pages/giai-tru-page';
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
    path: DUONG_DAN.GIAI_TRU,
    Component: TrangGiaiTru,
  },
  {
    path: DUONG_DAN.CHINH_DUNG_CAT_TOC,
    Component: TrangChinhDungCatToc,
  },
  {
    path: DUONG_DAN.CAU_Y_TRI_BENH,
    Component: TrangCauYTriBenh,
  },
  {
    path: DUONG_DAN.SUA_MONG_TAY_CHAN,
    Component: TrangSuaMongTayChan,
  },
  {
    path: DUONG_DAN.MAY_DO,
    Component: TrangMayDo,
  },
  {
    path: DUONG_DAN.LAP_KHE_UOC_GIAO_DICH,
    Component: TrangLapKheUocGiaoDich,
  },
  {
    path: DUONG_DAN.NAP_TAI,
    Component: TrangNapTai,
  },
  {
    path: DUONG_DAN.MO_KHO_XUAT_HANG_TIEN,
    Component: TrangMoKhoXuatHangTien,
  },
  {
    path: DUONG_DAN.SUA_BUONG_SAN_PHU,
    Component: TrangSuaBuongSanPhu,
  },
  {
    path: DUONG_DAN.DAT_COI_XAY_GIA,
    Component: TrangDatCoiXayGia,
  },
  {
    path: DUONG_DAN.QUET_DON_NHA_CUA,
    Component: TrangQuetDonNhaCua,
  },
  {
    path: DUONG_DAN.TRANG_TRI_TUONG,
    Component: TrangTrangTriTuong,
  },
  {
    path: DUONG_DAN.SUA_SANG_DUONG_SA,
    Component: TrangSuaSangDuongSa,
  },
  {
    path: DUONG_DAN.PHA_NHA_HUY_TUONG,
    Component: TrangPhaNhaHuyTuong,
  },
  {
    path: DUONG_DAN.TROC_NA_BAT_BO,
    Component: TrangTrocNaBatBo,
  },
  {
    path: DUONG_DAN.DI_THUYEN_VUOT_SONG_NUOC,
    Component: TrangDiThuyenVuotSongNuoc,
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
