import { DiaChi } from '../calendar/domain/earthly-branch';
import { LoaiNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToTheoChiThang } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

/**
 * 遊禍 — Hán Q6: 正月起巳逆行四孟.
 * Việt p.499: “Tháng Giêng khởi ở Tỵ, nghịch hành tứ mạnh”.
 */
export const DINH_NGHIA_DU_HOA: DinhNghiaYeuToTheoChiThang = {
  ma: MaYeuTo.DU_HOA,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoChiThang: {
    [DAN]: [TI],
    [MAO]: [DAN],
    [THIN]: [HOI],
    [TI]: [THAN],
    [NGO]: [TI],
    [MUI]: [DAN],
    [THAN]: [HOI],
    [DAU]: [THAN],
    [TUAT]: [TI],
    [HOI]: [DAN],
    [TY]: [HOI],
    [SUU]: [THAN],
  },
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 6,
      trang: 499,
      muc: 'Du Họa',
      tenGoc: '遊禍',
      ghiChu:
        'Exact scan p.499: “Tháng Giêng khởi ở Tỵ, nghịch hành tứ mạnh”; phần giải ghi kị uống thuốc, cầu thần.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 6,
      muc: '遊禍',
      tenGoc: '遊禍',
      ghiChu: 'WYG_006-22b..23a: 遊禍者正月起巳逆行四孟; 神樞經 nêu kị 服藥、請醫、祝神致祭.',
      daXacMinh: true,
    },
  ],
};
