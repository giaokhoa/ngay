import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import {
  DinhNghiaYeuToTapCanChiTheoChiThang,
  DinhNghiaYeuToTheoChiThang,
} from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

export const DINH_NGHIA_THO_PHU_TIN: DinhNghiaYeuToTheoChiThang = {
  ma: MaYeuTo.THO_PHU_TIN,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoChiThang: {
    [DAN]: [SUU],
    [MAO]: [TI],
    [THIN]: [DAU],
    [TI]: [DAN],
    [NGO]: [NGO],
    [MUI]: [TUAT],
    [THAN]: [MAO],
    [DAU]: [MUI],
    [TUAT]: [HOI],
    [HOI]: [THIN],
    [TY]: [THAN],
    [SUU]: [TY],
  },
  nguon: taoNguonQuyen6(
    542,
    'Thổ Phù',
    '土符',
    'Mã THO_PHU_TIN phân biệt với THO_PHU = Thổ Phủ / 土府.',
  ),
};

export const DINH_NGHIA_DIA_NANG: DinhNghiaYeuToTapCanChiTheoChiThang = {
  ma: MaYeuTo.DIA_NANG,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  tapCanChiNgayTheoChiThang: {
    [DAN]: [cc(CANH, TY), cc(CANH, NGO)],
    [MAO]: [cc(AT, MUI), cc(QUY, SUU)],
    [THIN]: [cc(GIAP, TY), cc(NHAM, NGO)],
    [TI]: [cc(KY, MAO), cc(KY, DAU)],
    [NGO]: [cc(NHAM, TUAT), cc(GIAP, THIN)],
    [MUI]: [cc(BINH, THIN), cc(BINH, TUAT)],
    [THAN]: [cc(DINH, TI), cc(DINH, HOI)],
    [DAU]: [cc(BINH, DAN), cc(BINH, THAN)],
    [TUAT]: [cc(TAN, SUU), cc(TAN, MUI)],
    [HOI]: [cc(MAU, DAN), cc(MAU, THAN)],
    [TY]: [cc(TAN, MAO), cc(TAN, DAU)],
    [SUU]: [cc(QUY, DAU), cc(AT, MAO)],
  },
  nguon: taoNguonQuyen6(
    540,
    'Địa Nang — bảng đính chính',
    '地囊',
    'Dùng phần Xét/按 trang 540–541; không dùng bảng Lịch lệ truyền cũ ở trang 538 vì sách ghi 48 chữ nhầm 23 chữ.',
  ),
};

export const DINH_NGHIA_YEU_TO_CONG_VIEC_DAT = [
  DINH_NGHIA_THO_PHU_TIN,
  DINH_NGHIA_DIA_NANG,
] as const;

function cc(can: ThienCan, chi: DiaChi): CanChi {
  return { can, chi };
}

function taoNguonQuyen6(
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChu: string,
): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 6,
      trang,
      muc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 6,
      muc: tenGoc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
  ];
}
