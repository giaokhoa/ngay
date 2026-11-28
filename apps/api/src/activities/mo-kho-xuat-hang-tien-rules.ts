import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 858,
    muc: 'Mở kho tàng xuất hàng, tiền',
    tenGoc: '開倉庫出貨財',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.858: 5 Nên; 23 mục Kị văn bản. Nguyệt Sát/Nguyệt Hư cùng một identity nên runtime canonical hóa thành 22 điều kiện Kị.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '開倉庫出貨財',
    tenGoc: '開倉庫出貨財',
    daXacMinh: true,
    ghiChu:
      'WYG_011-21a..21b: 宜月恩四相時徳滿日五富; 忌月建月破大耗平日收日閉日劫煞災煞月煞月虚月刑月害月厭大時天吏小耗天賊四耗四廢四窮五虚九空甲日. 月煞〈月虚〉同位，canonical một factor.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (can: ThienCan): DieuKienDungSu => ({ loai: 'CAN_NGAY', can });

const NEN_YEU_TO = [
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
  MaYeuTo.THOI_DUC,
  MaYeuTo.NGU_PHU,
] as const;
const KY_YEU_TO = [
  MaYeuTo.NGUYET_KIEN,
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.DAI_HAO,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TIEU_HAO,
  MaYeuTo.THIEN_TAC,
  MaYeuTo.TU_HAO,
  MaYeuTo.TU_PHE,
  MaYeuTo.TU_CUNG,
  MaYeuTo.NGU_HU,
  MaYeuTo.CUU_KHONG,
] as const;

export const QUY_TAC_MO_KHO_XUAT_HANG_TIEN: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => rule('MO_KHO_XUAT_HANG_TIEN_NEN_' + ma, Y(ma), TacDongDungSu.NEN)),
  rule('MO_KHO_XUAT_HANG_TIEN_NEN_MAN_NHAT', T(ThapNhiTruc.MAN), TacDongDungSu.NEN),

  rule('MO_KHO_XUAT_HANG_TIEN_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  rule('MO_KHO_XUAT_HANG_TIEN_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY),
  rule('MO_KHO_XUAT_HANG_TIEN_KY_BE_NHAT', T(ThapNhiTruc.BE), TacDongDungSu.KY),
  ...KY_YEU_TO.map((ma) => rule('MO_KHO_XUAT_HANG_TIEN_KY_' + ma, Y(ma), TacDongDungSu.KY)),
  rule('MO_KHO_XUAT_HANG_TIEN_KY_CAN_GIAP', C(ThienCan.GIAP), TacDongDungSu.KY),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.MO_KHO_XUAT_HANG_TIEN,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
