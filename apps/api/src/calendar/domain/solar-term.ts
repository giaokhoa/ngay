import { DiaChi } from './earthly-branch';

export enum TietKhi {
  TIEU_HAN = 'TIEU_HAN',
  DAI_HAN = 'DAI_HAN',
  LAP_XUAN = 'LAP_XUAN',
  VU_THUY = 'VU_THUY',
  KINH_TRAP = 'KINH_TRAP',
  XUAN_PHAN = 'XUAN_PHAN',
  THANH_MINH = 'THANH_MINH',
  COC_VU = 'COC_VU',
  LAP_HA = 'LAP_HA',
  TIEU_MAN = 'TIEU_MAN',
  MANG_CHUNG = 'MANG_CHUNG',
  HA_CHI = 'HA_CHI',
  TIEU_THU = 'TIEU_THU',
  DAI_THU = 'DAI_THU',
  LAP_THU = 'LAP_THU',
  XU_THU = 'XU_THU',
  BACH_LO = 'BACH_LO',
  THU_PHAN = 'THU_PHAN',
  HAN_LO = 'HAN_LO',
  SUONG_GIANG = 'SUONG_GIANG',
  LAP_DONG = 'LAP_DONG',
  TIEU_TUYET = 'TIEU_TUYET',
  DAI_TUYET = 'DAI_TUYET',
  DONG_CHI = 'DONG_CHI',
}

export interface DinhNghiaTietKhi {
  tietKhi: TietKhi;
  hoangKinh: number;
  chiThangMoi?: DiaChi;
}

export const DINH_NGHIA_TIET_KHI_THEO_NAM: readonly DinhNghiaTietKhi[] = [
  { tietKhi: TietKhi.TIEU_HAN, hoangKinh: 285, chiThangMoi: DiaChi.SUU },
  { tietKhi: TietKhi.DAI_HAN, hoangKinh: 300 },
  { tietKhi: TietKhi.LAP_XUAN, hoangKinh: 315, chiThangMoi: DiaChi.DAN },
  { tietKhi: TietKhi.VU_THUY, hoangKinh: 330 },
  { tietKhi: TietKhi.KINH_TRAP, hoangKinh: 345, chiThangMoi: DiaChi.MAO },
  { tietKhi: TietKhi.XUAN_PHAN, hoangKinh: 0 },
  { tietKhi: TietKhi.THANH_MINH, hoangKinh: 15, chiThangMoi: DiaChi.THIN },
  { tietKhi: TietKhi.COC_VU, hoangKinh: 30 },
  { tietKhi: TietKhi.LAP_HA, hoangKinh: 45, chiThangMoi: DiaChi.TI },
  { tietKhi: TietKhi.TIEU_MAN, hoangKinh: 60 },
  { tietKhi: TietKhi.MANG_CHUNG, hoangKinh: 75, chiThangMoi: DiaChi.NGO },
  { tietKhi: TietKhi.HA_CHI, hoangKinh: 90 },
  { tietKhi: TietKhi.TIEU_THU, hoangKinh: 105, chiThangMoi: DiaChi.MUI },
  { tietKhi: TietKhi.DAI_THU, hoangKinh: 120 },
  { tietKhi: TietKhi.LAP_THU, hoangKinh: 135, chiThangMoi: DiaChi.THAN },
  { tietKhi: TietKhi.XU_THU, hoangKinh: 150 },
  { tietKhi: TietKhi.BACH_LO, hoangKinh: 165, chiThangMoi: DiaChi.DAU },
  { tietKhi: TietKhi.THU_PHAN, hoangKinh: 180 },
  { tietKhi: TietKhi.HAN_LO, hoangKinh: 195, chiThangMoi: DiaChi.TUAT },
  { tietKhi: TietKhi.SUONG_GIANG, hoangKinh: 210 },
  { tietKhi: TietKhi.LAP_DONG, hoangKinh: 225, chiThangMoi: DiaChi.HOI },
  { tietKhi: TietKhi.TIEU_TUYET, hoangKinh: 240 },
  { tietKhi: TietKhi.DAI_TUYET, hoangKinh: 255, chiThangMoi: DiaChi.TY },
  { tietKhi: TietKhi.DONG_CHI, hoangKinh: 270 },
];
