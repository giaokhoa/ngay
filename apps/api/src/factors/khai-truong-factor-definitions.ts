import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { Mua } from '../calendar/domain/season';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToCanChiTheoMua, DinhNghiaYeuToTheoChiThang } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { AT, MAU, NHAM, TAN } = ThienCan;

export const DINH_NGHIA_TU_HAO: DinhNghiaYeuToCanChiTheoMua = {
  ma: MaYeuTo.TU_HAO,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgayTheoMua: {
    [Mua.XUAN]: cc(NHAM, TY),
    [Mua.HA]: cc(AT, MAO),
    [Mua.THU]: cc(MAU, NGO),
    [Mua.DONG]: cc(TAN, DAU),
  },
  nguon: taoNguon(436, 'Tứ Hao', '四耗', 'Bảng nguồn tiếp sang trang 437.'),
};

export const DINH_NGHIA_CUU_KHONG: DinhNghiaYeuToTheoChiThang = {
  ma: MaYeuTo.CUU_KHONG,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoChiThang: {
    [DAN]: [THIN],
    [MAO]: [SUU],
    [THIN]: [TUAT],
    [TI]: [MUI],
    [NGO]: [THIN],
    [MUI]: [SUU],
    [THAN]: [TUAT],
    [DAU]: [MUI],
    [TUAT]: [THIN],
    [HOI]: [SUU],
    [TY]: [TUAT],
    [SUU]: [MUI],
  },
  nguon: taoNguon(432, 'Cửu Không', '九空', 'Tháng Giêng tại Thìn, nghịch hành bốn quý.'),
};

function cc(can: ThienCan, chi: DiaChi): CanChi {
  return { can, chi };
}

function taoNguon(
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChu: string,
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
