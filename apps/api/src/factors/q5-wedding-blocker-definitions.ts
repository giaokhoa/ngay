import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { Mua } from '../calendar/domain/season';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import {
  DinhNghiaYeuTo,
  DinhNghiaYeuToCanChiCoDinh,
  DinhNghiaYeuToCanChiTheoChiThang,
  DinhNghiaYeuToCanChiTheoMua,
} from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

export interface DinhNghiaYeuToTapCanChiTheoMua extends DinhNghiaYeuTo {
  tapCanChiNgayTheoMua: Readonly<Record<Mua, readonly CanChi[]>>;
}

export const DINH_NGHIA_TU_PHE: DinhNghiaYeuToTapCanChiTheoMua = {
  ma: MaYeuTo.TU_PHE,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  tapCanChiNgayTheoMua: {
    [Mua.XUAN]: [cc(CANH, THAN), cc(TAN, DAU)],
    [Mua.HA]: [cc(NHAM, TY), cc(QUY, HOI)],
    [Mua.THU]: [cc(GIAP, DAN), cc(AT, MAO)],
    [Mua.DONG]: [cc(BINH, NGO), cc(DINH, TI)],
  },
  nguon: taoNguonQuyen5(439, 'Tứ Phế', '四廢'),
};

export const DINH_NGHIA_TU_KY: DinhNghiaYeuToCanChiTheoMua = {
  ma: MaYeuTo.TU_KY,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgayTheoMua: {
    [Mua.XUAN]: cc(GIAP, TY),
    [Mua.HA]: cc(BINH, TY),
    [Mua.THU]: cc(CANH, TY),
    [Mua.DONG]: cc(NHAM, TY),
  },
  nguon: taoNguonQuyen5(440, 'Tứ Kị', '四忌'),
};

export const DINH_NGHIA_TU_CUNG: DinhNghiaYeuToCanChiTheoMua = {
  ma: MaYeuTo.TU_CUNG,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgayTheoMua: {
    [Mua.XUAN]: cc(AT, HOI),
    [Mua.HA]: cc(DINH, HOI),
    [Mua.THU]: cc(TAN, HOI),
    [Mua.DONG]: cc(QUY, HOI),
  },
  nguon: taoNguonQuyen5(440, 'Tứ Cùng', '四窮'),
};

export const DINH_NGHIA_NGU_MO: DinhNghiaYeuToCanChiTheoChiThang = {
  ma: MaYeuTo.NGU_MO,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgayTheoChiThang: {
    [DAN]: cc(AT, MUI),
    [MAO]: cc(AT, MUI),
    [THIN]: cc(MAU, THIN),
    [TI]: cc(BINH, TUAT),
    [NGO]: cc(BINH, TUAT),
    [MUI]: cc(MAU, THIN),
    [THAN]: cc(TAN, SUU),
    [DAU]: cc(TAN, SUU),
    [TUAT]: cc(MAU, THIN),
    [HOI]: cc(NHAM, THIN),
    [TY]: cc(NHAM, THIN),
    [SUU]: cc(MAU, THIN),
  },
  nguon: taoNguonQuyen5(435, 'Ngũ Mộ', '五墓'),
};

export const DINH_NGHIA_BAT_CHUYEN: DinhNghiaYeuToCanChiCoDinh = {
  ma: MaYeuTo.BAT_CHUYEN,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgay: [cc(DINH, MUI), cc(KY, MUI), cc(CANH, THAN), cc(GIAP, DAN), cc(QUY, SUU)],
  nguon: taoNguonQuyen5(453, 'Bát Chuyên', '八專'),
};

export const DINH_NGHIA_BLOCKER_CUOI_HOI_QUYEN_5 = [
  DINH_NGHIA_TU_PHE,
  DINH_NGHIA_TU_KY,
  DINH_NGHIA_TU_CUNG,
  DINH_NGHIA_NGU_MO,
  DINH_NGHIA_BAT_CHUYEN,
] as const;

function cc(can: ThienCan, chi: DiaChi): CanChi {
  return { can, chi };
}

function taoNguonQuyen5(trang: number, muc: string, tenGoc: string): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 5,
      trang,
      muc,
      tenGoc,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 5,
      muc: tenGoc,
      tenGoc,
      daXacMinh: true,
    },
  ];
}
