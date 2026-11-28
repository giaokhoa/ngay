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
  DinhNghiaYeuToTheoChiThang,
} from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, BINH, DINH, QUY } = ThienCan;

export interface DinhNghiaYeuToTapCanChiTheoMua extends DinhNghiaYeuTo {
  tapCanChiNgayTheoMua: Readonly<Record<Mua, readonly CanChi[]>>;
}

/**
 * 九坎 — WYG_005-45b..47a; Việt p.442–443.
 * Q5 commentary resolves the month sequence by the four trines:
 * 寅午戌 -> 辰卯寅, 亥卯未 -> 丑子亥,
 * 申子辰 -> 戌酉申, 巳酉丑 -> 未午巳.
 */
export const DINH_NGHIA_CUU_KHAM: DinhNghiaYeuToTheoChiThang = {
  ma: MaYeuTo.CUU_KHAM,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoChiThang: {
    [DAN]: [THIN],
    [MAO]: [TY],
    [THIN]: [THAN],
    [TI]: [MUI],
    [NGO]: [MAO],
    [MUI]: [HOI],
    [THAN]: [TUAT],
    [DAU]: [NGO],
    [TUAT]: [DAN],
    [HOI]: [SUU],
    [TY]: [DAU],
    [SUU]: [TI],
  },
  nguon: nguonQ5(442, 'Cửu Khảm – Cửu Tiêu', '九坎'),
};

/**
 * 八風 — corrected table, not the corrupted old almanac readings.
 * Spring 丁丑/丁巳; summer 甲申/甲辰; autumn 丁未/丁亥; winter 甲戌/甲寅.
 */
export const DINH_NGHIA_BAT_PHONG: DinhNghiaYeuToTapCanChiTheoMua = {
  ma: MaYeuTo.BAT_PHONG,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  tapCanChiNgayTheoMua: {
    [Mua.XUAN]: [cc(DINH, SUU), cc(DINH, TI)],
    [Mua.HA]: [cc(GIAP, THAN), cc(GIAP, THIN)],
    [Mua.THU]: [cc(DINH, MUI), cc(DINH, HOI)],
    [Mua.DONG]: [cc(GIAP, TUAT), cc(GIAP, DAN)],
  },
  nguon: nguonQ5(446, 'Bát Phong – Xúc Thủy Long', '八風'),
};

export const DINH_NGHIA_XUC_THUY_LONG: DinhNghiaYeuToCanChiCoDinh = {
  ma: MaYeuTo.XUC_THUY_LONG,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgay: [cc(BINH, TY), cc(QUY, MUI), cc(QUY, SUU)],
  nguon: nguonQ5(447, 'Bát Phong – Xúc Thủy Long', '觸水龍'),
};

function cc(can: ThienCan, chi: DiaChi): CanChi {
  return { can, chi };
}

function nguonQ5(trang: number, muc: string, tenGoc: string): readonly ThamChieuNguon[] {
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
      ghiChu: 'WYG_005-45b..50b; dùng bảng hiệu đính của 協紀辨方書.',
    },
  ];
}
