import { DiaChi } from '../calendar/domain/earthly-branch';
import { Mua } from '../calendar/domain/season';
import { LoaiNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuTo } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

export const CHI_NGAY_NGU_HU_THEO_MUA: Readonly<Record<Mua, readonly DiaChi[]>> = {
  [Mua.XUAN]: [TI, DAU, SUU],
  [Mua.HA]: [THAN, TY, THIN],
  [Mua.THU]: [HOI, MAO, MUI],
  [Mua.DONG]: [DAN, NGO, TUAT],
};

export const DINH_NGHIA_NGU_HU: DinhNghiaYeuTo & {
  readonly chiNgayTheoMua: Readonly<Record<Mua, readonly DiaChi[]>>;
} = {
  ma: MaYeuTo.NGU_HU,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoMua: CHI_NGAY_NGU_HU_THEO_MUA,
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 5,
      trang: 444,
      muc: 'Ngũ Hư',
      tenGoc: '五虚',
      daXacMinh: true,
      ghiChu:
        'Việt p.444–445: Xuân Tỵ Dậu Sửu; Hạ Thân Tý Thìn; Thu Hợi Mão Mùi; Đông Dần Ngọ Tuất.',
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 5,
      muc: '五虚',
      tenGoc: '五虚',
      daXacMinh: true,
      ghiChu: 'WYG_005-47b..48a: 春巳酉丑 夏申子辰 秋亥卯未 冬寅午戌.',
    },
  ],
};
