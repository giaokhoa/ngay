import { DiaChi } from '../calendar/domain/earthly-branch';
import { Mua } from '../calendar/domain/season';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToChiNgayTheoMua, DinhNghiaYeuToTheoChiThang } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

export const DINH_NGHIA_DAN_NHAT: DinhNghiaYeuToChiNgayTheoMua = {
  ma: MaYeuTo.DAN_NHAT,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoMua: {
    [Mua.XUAN]: NGO,
    [Mua.HA]: DAU,
    [Mua.THU]: TY,
    [Mua.DONG]: MAO,
  },
  nguon: taoNguon(5, 426, 'Dân nhật', '民日'),
};

export const DINH_NGHIA_VUONG_NHAT: DinhNghiaYeuToChiNgayTheoMua = {
  ma: MaYeuTo.VUONG_NHAT,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoMua: {
    [Mua.XUAN]: DAN,
    [Mua.HA]: TI,
    [Mua.THU]: THAN,
    [Mua.DONG]: HOI,
  },
  nguon: taoNguon(
    5,
    426,
    'Vương nhật',
    '王日',
    'Bản Việt: dùng thuyết cũ Xuân Dần/Hạ Tỵ/Thu Thân/Đông Hợi; phần Xét p.427 bác việc hậu nhân đổi Vương/Quan.',
    'Hán Q5: phần 按 cũng kết luận thuyết cũ cao hơn việc hậu nhân đổi Vương/Quan.',
  ),
};

export const DINH_NGHIA_THIEN_MA: DinhNghiaYeuToTheoChiThang = {
  ma: MaYeuTo.THIEN_MA,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoChiThang: {
    [DAN]: [NGO],
    [MAO]: [THAN],
    [THIN]: [TUAT],
    [TI]: [TY],
    [NGO]: [DAN],
    [MUI]: [THIN],
    [THAN]: [NGO],
    [DAU]: [THAN],
    [TUAT]: [TUAT],
    [HOI]: [TY],
    [TY]: [DAN],
    [SUU]: [THIN],
  },
  nguon: taoNguon(6, 532, 'Thiên Mã', '天馬'),
};

export const DINH_NGHIA_QUY_KY: DinhNghiaYeuToTheoChiThang = {
  ma: MaYeuTo.QUY_KY,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoChiThang: {
    [DAN]: [SUU],
    [MAO]: [DAN],
    [THIN]: [TY],
    [TI]: [SUU],
    [NGO]: [DAN],
    [MUI]: [TY],
    [THAN]: [SUU],
    [DAU]: [DAN],
    [TUAT]: [TY],
    [HOI]: [SUU],
    [TY]: [DAN],
    [SUU]: [TY],
  },
  nguon: taoNguon(6, 547, 'Quy Kị', '歸忌'),
};

export const DINH_NGHIA_YEU_TO_DI_CHUYEN = [
  DINH_NGHIA_DAN_NHAT,
  DINH_NGHIA_THIEN_MA,
  DINH_NGHIA_QUY_KY,
] as const;

function taoNguon(
  quyen: number,
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChuViet?: string,
  ghiChuHan?: string,
): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen,
      trang,
      muc,
      tenGoc,
      ghiChu: ghiChuViet,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen,
      muc: tenGoc,
      tenGoc,
      ghiChu: ghiChuHan ?? ghiChuViet,
      daXacMinh: true,
    },
  ];
}
