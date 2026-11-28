import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DinhNghiaYeuTo } from './factor-definition';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';

const THUONG_SOC_THEO_CAN_NAM: Readonly<Record<ThienCan, CanChi>> = {
  [ThienCan.GIAP]: { can: ThienCan.QUY, chi: DiaChi.HOI },
  [ThienCan.AT]: { can: ThienCan.KY, chi: DiaChi.TI },
  [ThienCan.BINH]: { can: ThienCan.AT, chi: DiaChi.HOI },
  [ThienCan.DINH]: { can: ThienCan.TAN, chi: DiaChi.TI },
  [ThienCan.MAU]: { can: ThienCan.DINH, chi: DiaChi.HOI },
  [ThienCan.KY]: { can: ThienCan.QUY, chi: DiaChi.TI },
  [ThienCan.CANH]: { can: ThienCan.KY, chi: DiaChi.HOI },
  [ThienCan.TAN]: { can: ThienCan.AT, chi: DiaChi.TI },
  [ThienCan.NHAM]: { can: ThienCan.TAN, chi: DiaChi.HOI },
  [ThienCan.QUY]: { can: ThienCan.DINH, chi: DiaChi.TI },
};

const NGAY_PHAN_CHI_THEO_CHI_SOC: Readonly<Record<DiaChi, number>> = {
  [DiaChi.TUAT]: 1,
  [DiaChi.HOI]: 1,
  [DiaChi.THAN]: 2,
  [DiaChi.DAU]: 2,
  [DiaChi.NGO]: 3,
  [DiaChi.MUI]: 3,
  [DiaChi.THIN]: 4,
  [DiaChi.TI]: 4,
  [DiaChi.DAN]: 5,
  [DiaChi.MAO]: 5,
  [DiaChi.TY]: 6,
  [DiaChi.SUU]: 6,
};

export const DINH_NGHIA_THUONG_SOC = taoDinhNghia(MaYeuTo.THUONG_SOC, 'Thượng Sóc', '上朔', 556);
export const DINH_NGHIA_PHAN_CHI = taoDinhNghia(MaYeuTo.PHAN_CHI, 'Phản Chi', '反支', 558);
export const DINH_NGHIA_NGUYET_KY = taoDinhNghia(
  MaYeuTo.NGUYET_KY,
  'Ngày Nguyệt Kị',
  '月忌日',
  562,
);

export function laThuongSoc(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  if (!boiCanh.canChiNam) return false;
  const ngay = THUONG_SOC_THEO_CAN_NAM[boiCanh.canChiNam.can];
  return ngay.can === boiCanh.canNgay && ngay.chi === boiCanh.chiNgay;
}

export function laPhanChi(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  if (!boiCanh.canChiNgaySoc || boiCanh.ngayAmTrongThang === undefined) return false;
  return NGAY_PHAN_CHI_THEO_CHI_SOC[boiCanh.canChiNgaySoc.chi] === boiCanh.ngayAmTrongThang;
}

export function laNguyetKy(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  return boiCanh.ngayAmTrongThang !== undefined && [5, 14, 23].includes(boiCanh.ngayAmTrongThang);
}

function taoDinhNghia(ma: MaYeuTo, muc: string, tenGoc: string, trang: number): DinhNghiaYeuTo {
  const nguon: readonly ThamChieuNguon[] = [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 6,
      trang,
      muc,
      tenGoc,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 6,
      muc: tenGoc,
      tenGoc,
      daXacMinh: true,
    },
  ];

  return {
    ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: [],
    nguon,
  };
}
