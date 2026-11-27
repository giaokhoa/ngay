import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { Mua } from '../calendar/domain/season';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import {
  DinhNghiaYeuToCanChiCoDinh,
  DinhNghiaYeuToCanChiTheoChiThang,
  DinhNghiaYeuToCanChiTheoMua,
  DinhNghiaYeuToCanNgayTheoMua,
  DinhNghiaYeuToChiNgayTheoMua,
} from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

export const DINH_NGHIA_THIEN_AN: DinhNghiaYeuToCanChiCoDinh = {
  ma: MaYeuTo.THIEN_AN,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgay: [
    taoCanChi(GIAP, TY),
    taoCanChi(AT, SUU),
    taoCanChi(BINH, DAN),
    taoCanChi(DINH, MAO),
    taoCanChi(MAU, THIN),
    taoCanChi(KY, MAO),
    taoCanChi(CANH, THIN),
    taoCanChi(TAN, TI),
    taoCanChi(NHAM, NGO),
    taoCanChi(QUY, MUI),
    taoCanChi(KY, DAU),
    taoCanChi(CANH, TUAT),
    taoCanChi(TAN, HOI),
    taoCanChi(NHAM, TY),
    taoCanChi(QUY, SUU),
  ],
  nguon: taoNguonQuyen5(404, 'Thiên Ân', '天恩'),
};

export const DINH_NGHIA_THIEN_XA: DinhNghiaYeuToCanChiTheoMua = {
  ma: MaYeuTo.THIEN_XA,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgayTheoMua: {
    [Mua.XUAN]: taoCanChi(MAU, DAN),
    [Mua.HA]: taoCanChi(GIAP, NGO),
    [Mua.THU]: taoCanChi(MAU, THAN),
    [Mua.DONG]: taoCanChi(GIAP, TY),
  },
  nguon: taoNguonQuyen5(407, 'Thiên Xá', '天赦'),
};

export const DINH_NGHIA_THIEN_NGUYEN: DinhNghiaYeuToCanChiTheoChiThang = {
  ma: MaYeuTo.THIEN_NGUYEN,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgayTheoChiThang: {
    [DAN]: taoCanChi(GIAP, NGO),
    [MAO]: taoCanChi(GIAP, TUAT),
    [THIN]: taoCanChi(AT, DAU),
    [TI]: taoCanChi(BINH, TY),
    [NGO]: taoCanChi(DINH, SUU),
    [MUI]: taoCanChi(MAU, NGO),
    [THAN]: taoCanChi(GIAP, DAN),
    [DAU]: taoCanChi(BINH, THIN),
    [TUAT]: taoCanChi(TAN, MAO),
    [HOI]: taoCanChi(MAU, THIN),
    [TY]: taoCanChi(GIAP, TY),
    [SUU]: taoCanChi(QUY, MUI),
  },
  nguon: taoNguonQuyen5(411, 'Thiên Nguyện', '天願'),
};

export const DINH_NGHIA_TU_TUONG: DinhNghiaYeuToCanNgayTheoMua = {
  ma: MaYeuTo.TU_TUONG,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canNgayTheoMua: {
    [Mua.XUAN]: [BINH, DINH],
    [Mua.HA]: [MAU, KY],
    [Mua.THU]: [NHAM, QUY],
    [Mua.DONG]: [GIAP, AT],
  },
  nguon: taoNguonQuyen5(420, 'Tứ Tướng', '四相'),
};

export const DINH_NGHIA_THOI_DUC: DinhNghiaYeuToChiNgayTheoMua = {
  ma: MaYeuTo.THOI_DUC,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: ['Tứ Thời Thiên Đức'],
  chiNgayTheoMua: {
    [Mua.XUAN]: NGO,
    [Mua.HA]: THIN,
    [Mua.THU]: TY,
    [Mua.DONG]: DAN,
  },
  nguon: taoNguonQuyen5(422, 'Thời Đức', '時德'),
};

export const DINH_NGHIA_YEU_TO_CO_DINH_VA_THEO_MUA = [
  DINH_NGHIA_THIEN_AN,
  DINH_NGHIA_THIEN_XA,
  DINH_NGHIA_THIEN_NGUYEN,
  DINH_NGHIA_TU_TUONG,
  DINH_NGHIA_THOI_DUC,
] as const;

function taoCanChi(can: ThienCan, chi: DiaChi): CanChi {
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
