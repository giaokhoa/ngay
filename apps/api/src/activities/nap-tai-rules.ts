import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 857,
    muc: 'Nạp tiền của',
    tenGoc: '納財',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.857: 12 Nên / 16 Kị; Nên Mẫu Thương, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Dân Nhật, Tam Hợp, Mãn, Thu, Lục Hợp, Ngũ Phú, Thiên Thương.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '納財',
    tenGoc: '納財',
    daXacMinh: true,
    ghiChu:
      'WYG_011-21a: 宜母倉天願月恩四相時徳民日三合滿日收日六合五富天倉; 忌月破大耗平日劫煞災煞月煞月刑月害月厭大時天吏小耗四耗四廢四窮九空.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const NEN_YEU_TO = [
  MaYeuTo.MAU_THUONG,
  MaYeuTo.THIEN_NGUYEN,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
  MaYeuTo.THOI_DUC,
  MaYeuTo.DAN_NHAT,
  MaYeuTo.TAM_HOP,
  MaYeuTo.LUC_HOP,
  MaYeuTo.NGU_PHU,
  MaYeuTo.THIEN_THUONG,
] as const;

const KY_YEU_TO = [
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
  MaYeuTo.TU_HAO,
  MaYeuTo.TU_PHE,
  MaYeuTo.TU_CUNG,
  MaYeuTo.CUU_KHONG,
] as const;

export const QUY_TAC_NAP_TAI: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => rule('NAP_TAI_NEN_' + ma, Y(ma), TacDongDungSu.NEN)),
  rule('NAP_TAI_NEN_MAN_NHAT', T(ThapNhiTruc.MAN), TacDongDungSu.NEN),
  rule('NAP_TAI_NEN_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.NEN),

  rule('NAP_TAI_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  ...KY_YEU_TO.map((ma) => rule('NAP_TAI_KY_' + ma, Y(ma), TacDongDungSu.KY)),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.NAP_TAI, dieuKien, tacDong, nguon: NGUON_Q11 };
}
