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
    muc: 'Lập khế ước hợp đồng giao dịch',
    tenGoc: '立劵交易',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.857: 7 Nên / 19 Kị; Nên Thiên Nguyện, Dân Nhật, Tam Hợp, Mãn, Lục Hợp, Ngũ Phú, Ngũ Hợp; Kị kết thúc bằng Ngũ Ly.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '立劵交易',
    tenGoc: '立劵交易',
    daXacMinh: true,
    ghiChu:
      'WYG_011-20b..21a: 宜天願民日三合滿日六合五富五合; 忌月破大耗平日收日劫煞災煞月煞月刑月害月厭大時天吏小耗四耗四廢四窮五墓九空五離.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const NEN_YEU_TO = [
  MaYeuTo.THIEN_NGUYEN,
  MaYeuTo.DAN_NHAT,
  MaYeuTo.TAM_HOP,
  MaYeuTo.LUC_HOP,
  MaYeuTo.NGU_PHU,
  MaYeuTo.NGU_HOP,
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
  MaYeuTo.NGU_MO,
  MaYeuTo.CUU_KHONG,
  MaYeuTo.NGU_LY,
] as const;

export const QUY_TAC_LAP_KHE_UOC_GIAO_DICH: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => rule('LAP_KHE_UOC_GIAO_DICH_NEN_' + ma, Y(ma), TacDongDungSu.NEN)),
  rule('LAP_KHE_UOC_GIAO_DICH_NEN_MAN_NHAT', T(ThapNhiTruc.MAN), TacDongDungSu.NEN),

  rule('LAP_KHE_UOC_GIAO_DICH_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  rule('LAP_KHE_UOC_GIAO_DICH_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY),
  ...KY_YEU_TO.map((ma) => rule('LAP_KHE_UOC_GIAO_DICH_KY_' + ma, Y(ma), TacDongDungSu.KY)),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.LAP_KHE_UOC_GIAO_DICH,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
