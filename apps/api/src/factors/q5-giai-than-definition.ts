import { DiaChi } from '../calendar/domain/earthly-branch';
import { LoaiNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToTheoChiThang } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

/**
 * 解神 — Việt p.462–463 / Hán WYG_005-59b..60a:
 * 正二月申、三四月戌、五六月子、七八月寅、九十月辰、十一十二月午.
 */
export const DINH_NGHIA_GIAI_THAN: DinhNghiaYeuToTheoChiThang = {
  ma: MaYeuTo.GIAI_THAN,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoChiThang: {
    [DAN]: [THAN],
    [MAO]: [THAN],
    [THIN]: [TUAT],
    [TI]: [TUAT],
    [NGO]: [TY],
    [MUI]: [TY],
    [THAN]: [DAN],
    [DAU]: [DAN],
    [TUAT]: [THIN],
    [HOI]: [THIN],
    [TY]: [NGO],
    [SUU]: [NGO],
  },
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 5,
      trang: 462,
      muc: 'Giải Thần',
      tenGoc: '解神',
      ghiChu:
        'Exact scan p.462–463: Giêng/Hai Thân; Ba/Tư Tuất; Năm/Sáu Tý; Bảy/Tám Dần; Chín/Mười Thìn; Mười một/Chạp Ngọ.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 5,
      muc: '解神',
      tenGoc: '解神',
      ghiChu: 'WYG_005-59b..60a: 正二月申三四月戌五六月子七八月寅九十月辰十一月十二月午.',
      daXacMinh: true,
    },
  ],
};
