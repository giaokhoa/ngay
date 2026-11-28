import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { ThamChieuNguon } from '../sources/source-reference';

export enum LoaiCongViec {
  CUOI_HOI = 'CUOI_HOI',
  DI_CHUYEN = 'DI_CHUYEN',
  AN_GIUONG = 'AN_GIUONG',
  QUAN_DAI = 'QUAN_DAI',
  NHAP_HOC = 'NHAP_HOC',
  YEN_HOI = 'YEN_HOI',
  KHANH_THUONG = 'KHANH_THUONG',
  TE_TU = 'TE_TU',
  CAU_PHUC = 'CAU_PHUC',
  CAU_TU = 'CAU_TU',
  GIAI_TRU = 'GIAI_TRU',
  CHINH_DUNG_CAT_TOC = 'CHINH_DUNG_CAT_TOC',
  CAU_Y_TRI_BENH = 'CAU_Y_TRI_BENH',
  SUA_MONG_TAY_CHAN = 'SUA_MONG_TAY_CHAN',
  MAY_DO = 'MAY_DO',
  LAP_KHE_UOC_GIAO_DICH = 'LAP_KHE_UOC_GIAO_DICH',
  NAP_TAI = 'NAP_TAI',
  MO_KHO_XUAT_HANG_TIEN = 'MO_KHO_XUAT_HANG_TIEN',
  SUA_BUONG_SAN_PHU = 'SUA_BUONG_SAN_PHU',
  DAT_COI_XAY_GIA = 'DAT_COI_XAY_GIA',
  QUET_DON_NHA_CUA = 'QUET_DON_NHA_CUA',
  TRANG_TRI_TUONG = 'TRANG_TRI_TUONG',
  SUA_SANG_DUONG_SA = 'SUA_SANG_DUONG_SA',
  PHA_NHA_HUY_TUONG = 'PHA_NHA_HUY_TUONG',
  TROC_NA_BAT_BO = 'TROC_NA_BAT_BO',
  DI_THUYEN_VUOT_SONG_NUOC = 'DI_THUYEN_VUOT_SONG_NUOC',
  TRONG_TROT = 'TRONG_TROT',
  DONG_THO = 'DONG_THO',
  SUA_CUNG_THAT = 'SUA_CUNG_THAT',
  KHAI_TRUONG = 'KHAI_TRUONG',
  XUAT_HANH = 'XUAT_HANH',
  AN_TANG = 'AN_TANG',
}

export enum TacDongDungSu {
  NEN = 'NEN',
  KY = 'KY',
}

export type DieuKienDungSu =
  | { loai: 'YEU_TO'; ma: MaYeuTo }
  | { loai: 'TRUC'; truc: ThapNhiTruc }
  | { loai: 'CHI_NGAY'; chi: DiaChi }
  | { loai: 'CAN_NGAY'; can: ThienCan }
  | { loai: 'NGAY_AM'; ngay: number }
  | { loai: 'THO_VUONG' };

export interface QuyTacDungSu {
  ma: string;
  congViec: LoaiCongViec;
  dieuKien: DieuKienDungSu;
  tacDong: TacDongDungSu;
  nguon: readonly ThamChieuNguon[];
}
