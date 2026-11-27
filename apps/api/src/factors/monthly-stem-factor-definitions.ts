import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { BangCanNgayTheoChiThang, DinhNghiaYeuToTheoCanNgay } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

export const DINH_NGHIA_YEU_TO_THEO_CAN_NGAY: readonly DinhNghiaYeuToTheoCanNgay[] = [
  taoDinhNghia({
    ma: MaYeuTo.NGUYET_DUC,
    trang: 395,
    muc: 'Nguyệt Đức',
    tenGoc: '月德',
    bang: {
      [DAN]: BINH,
      [MAO]: GIAP,
      [THIN]: NHAM,
      [TI]: CANH,
      [NGO]: BINH,
      [MUI]: GIAP,
      [THAN]: NHAM,
      [DAU]: CANH,
      [TUAT]: BINH,
      [HOI]: GIAP,
      [TY]: NHAM,
      [SUU]: CANH,
    },
  }),
  taoDinhNghia({
    ma: MaYeuTo.THIEN_DUC_HOP,
    trang: 398,
    muc: 'Thiên Đức Hợp',
    tenGoc: '天德合',
    ghiChu: 'Bốn tháng Mão, Ngọ, Dậu, Tý Thiên Đức ở bốn duy nên không có ngày hợp.',
    bang: {
      [DAN]: NHAM,
      [THIN]: DINH,
      [TI]: BINH,
      [MUI]: KY,
      [THAN]: MAU,
      [TUAT]: TAN,
      [HOI]: CANH,
      [SUU]: AT,
    },
  }),
  taoDinhNghia({
    ma: MaYeuTo.NGUYET_DUC_HOP,
    trang: 400,
    muc: 'Nguyệt Đức Hợp',
    tenGoc: '月德合',
    bang: {
      [DAN]: TAN,
      [MAO]: KY,
      [THIN]: DINH,
      [TI]: AT,
      [NGO]: TAN,
      [MUI]: KY,
      [THAN]: DINH,
      [DAU]: AT,
      [TUAT]: TAN,
      [HOI]: KY,
      [TY]: DINH,
      [SUU]: AT,
    },
  }),
  taoDinhNghia({
    ma: MaYeuTo.NGUYET_KHONG,
    trang: 402,
    muc: 'Nguyệt Không',
    tenGoc: '月空',
    bang: {
      [DAN]: NHAM,
      [MAO]: CANH,
      [THIN]: BINH,
      [TI]: GIAP,
      [NGO]: NHAM,
      [MUI]: CANH,
      [THAN]: BINH,
      [DAU]: GIAP,
      [TUAT]: NHAM,
      [HOI]: CANH,
      [TY]: BINH,
      [SUU]: GIAP,
    },
  }),
  taoDinhNghia({
    ma: MaYeuTo.NGUYET_AN,
    trang: 417,
    muc: 'Nguyệt Ân',
    tenGoc: '月恩',
    bang: {
      [DAN]: BINH,
      [MAO]: DINH,
      [THIN]: CANH,
      [TI]: KY,
      [NGO]: MAU,
      [MUI]: TAN,
      [THAN]: NHAM,
      [DAU]: QUY,
      [TUAT]: CANH,
      [HOI]: AT,
      [TY]: GIAP,
      [SUU]: TAN,
    },
  }),
];

interface ThamSoDinhNghia {
  ma: MaYeuTo;
  trang: number;
  muc: string;
  tenGoc: string;
  ghiChu?: string;
  bang: BangCanNgayTheoChiThang;
}

function taoDinhNghia(thamSo: ThamSoDinhNghia): DinhNghiaYeuToTheoCanNgay {
  return {
    ma: thamSo.ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: [],
    canNgayTheoChiThang: thamSo.bang,
    nguon: taoNguonQuyen5(thamSo.trang, thamSo.muc, thamSo.tenGoc, thamSo.ghiChu),
  };
}

function taoNguonQuyen5(
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChu?: string,
): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 5,
      trang,
      muc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 5,
      muc: tenGoc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
  ];
}
