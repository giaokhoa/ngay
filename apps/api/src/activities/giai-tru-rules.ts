import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11_DONG_THUAN: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 852,
    muc: 'Giải trừ',
    tenGoc: '解除',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.852 khớp Hán ở 12 Nên production và 15 Kị; bản Việt in thêm Thiên Nguyện, đã registry riêng và không production.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '解除',
    tenGoc: '解除',
    daXacMinh: true,
    ghiChu: 'WYG_011-15b: 宜 12 mục, 忌 15 mục; không có 天願.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const NEN_YEU_TO = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
  MaYeuTo.THOI_DUC,
  MaYeuTo.GIAI_THAN,
  MaYeuTo.NGU_LY,
] as const;

const KY_YEU_TO = [
  MaYeuTo.TU_THAN,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.DU_HOA,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_KHI,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_MO,
] as const;

export const QUY_TAC_GIAI_TRU: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => rule('GIAI_TRU_NEN_' + ma, Y(ma), TacDongDungSu.NEN)),
  rule('GIAI_TRU_NEN_TRU_NHAT', T(ThapNhiTruc.TRU), TacDongDungSu.NEN),
  rule('GIAI_TRU_NEN_KHAI_NHAT', T(ThapNhiTruc.KHAI), TacDongDungSu.NEN),

  rule('GIAI_TRU_KY_KIEN_NHAT', T(ThapNhiTruc.KIEN), TacDongDungSu.KY),
  rule('GIAI_TRU_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  rule('GIAI_TRU_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY),
  ...KY_YEU_TO.map((ma) => rule('GIAI_TRU_KY_' + ma, Y(ma), TacDongDungSu.KY)),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.GIAI_TRU,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11_DONG_THUAN,
  };
}
