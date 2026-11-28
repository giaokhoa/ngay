import { DiaChi } from '../calendar/domain/earthly-branch';
import { LoaiNguon } from '../sources/source-reference';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import { DinhNghiaYeuTo } from './factor-definition';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';

const { DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI, TY, SUU } = DiaChi;

export const NGAY_TRUONG_TINH_THEO_CHI_THANG: Readonly<Record<DiaChi, readonly number[]>> = {
  [DAN]: [7],
  [MAO]: [4],
  [THIN]: [1],
  [TI]: [9],
  [NGO]: [15],
  [MUI]: [10],
  [THAN]: [8],
  [DAU]: [2, 5],
  [TUAT]: [3, 4],
  [HOI]: [1],
  [TY]: [12],
  [SUU]: [9],
};

export const NGAY_DOAN_TINH_THEO_CHI_THANG: Readonly<Record<DiaChi, readonly number[]>> = {
  [DAN]: [21],
  [MAO]: [19],
  [THIN]: [16],
  [TI]: [25],
  [NGO]: [25],
  [MUI]: [20],
  [THAN]: [22],
  [DAU]: [18, 19],
  [TUAT]: [16, 17],
  [HOI]: [14],
  [TY]: [22],
  [SUU]: [25],
};

const NGUON_Q9 = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 9,
    muc: '日神按月取日數者 — 長星 / 短星',
    tenGoc: '長星短星',
    daXacMinh: true,
    ghiChu:
      'WYG_009-33b: bảng ngày Trường/Đoản Tinh theo 12 tháng tiết khí; Q19–30 lặp lại từng tháng. Q35 phụ lục corroborate bảng nhưng tự ghi một số phép giải nghĩa truyền sai, nên production giữ bảng Q9.',
  },
] as const;

export const DINH_NGHIA_TRUONG_TINH: DinhNghiaYeuTo = {
  ma: MaYeuTo.TRUONG_TINH,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  nguon: NGUON_Q9,
};

export const DINH_NGHIA_DOAN_TINH: DinhNghiaYeuTo = {
  ma: MaYeuTo.DOAN_TINH,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  nguon: NGUON_Q9,
};

export function laTruongTinh(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  return (
    boiCanh.ngayAmTrongThang !== undefined &&
    NGAY_TRUONG_TINH_THEO_CHI_THANG[boiCanh.chiThang].includes(boiCanh.ngayAmTrongThang)
  );
}

export function laDoanTinh(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  return (
    boiCanh.ngayAmTrongThang !== undefined &&
    NGAY_DOAN_TINH_THEO_CHI_THANG[boiCanh.chiThang].includes(boiCanh.ngayAmTrongThang)
  );
}
