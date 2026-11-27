import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { MaQuaiThienDuc, QuaiThienDuc } from './domain/heavenly-virtue-position';
import { DinhNghiaYeuToTheoCanNgay } from './factor-definition';

const { DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI, TY, SUU } = DiaChi;
const { GIAP, AT, BINH, DINH, CANH, TAN, NHAM, QUY } = ThienCan;

export interface DinhNghiaThienDuc extends DinhNghiaYeuToTheoCanNgay {
  quaiTheoChiThang: Readonly<Partial<Record<DiaChi, QuaiThienDuc>>>;
}

export const DINH_NGHIA_THIEN_DUC: DinhNghiaThienDuc = {
  ma: MaYeuTo.THIEN_DUC,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canNgayTheoChiThang: {
    [DAN]: DINH,
    [THIN]: NHAM,
    [TI]: TAN,
    [MUI]: GIAP,
    [THAN]: QUY,
    [TUAT]: BINH,
    [HOI]: AT,
    [SUU]: CANH,
  },
  quaiTheoChiThang: {
    [MAO]: {
      ma: MaQuaiThienDuc.KHON,
      ten: 'Khôn',
      hanTu: '坤',
    },
    [NGO]: {
      ma: MaQuaiThienDuc.CAN_THIEN,
      ten: 'Càn',
      hanTu: '乾',
    },
    [DAU]: {
      ma: MaQuaiThienDuc.CAN_SON,
      ten: 'Cấn',
      hanTu: '艮',
    },
    [TY]: {
      ma: MaQuaiThienDuc.TON,
      ten: 'Tốn',
      hanTu: '巽',
    },
  },
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 5,
      trang: 387,
      muc: 'Thiên Đạo - Thiên Đức',
      tenGoc: '天德',
      ghiChu: 'Bốn tháng Mão, Ngọ, Dậu, Tý dùng Khôn, Càn, Cấn, Tốn; không đổi thành địa chi ngày.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 5,
      muc: '天道 天德',
      tenGoc: '天德',
      ghiChu: 'Hán bản nêu rõ Thiên Đức không dùng địa chi và dùng bốn quẻ ở bốn tháng trọng.',
      daXacMinh: true,
    },
  ],
};
