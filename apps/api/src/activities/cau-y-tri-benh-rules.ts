import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 853,
    muc: 'Cầu thầy, chữa bệnh',
    tenGoc: '求醫療病',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.853: 15 Nên, 22 Kị; Thiên Hậu dùng cùng vị trí Dịch Mã; Kị ngày Mùi, ngày âm 15 và Sóc-Huyền-Vọng.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '求醫療病',
    tenGoc: '求醫療病',
    daXacMinh: true,
    ghiChu:
      'WYG_011-16b: 宜天徳月徳天徳合月徳合天赦月恩四相時徳天后除日破日天醫開日解神除神; 忌 22 mục tương ứng.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (chi: DiaChi): DieuKienDungSu => ({ loai: 'CHI_NGAY', chi });
const L = (ngay: number): DieuKienDungSu => ({ loai: 'NGAY_AM', ngay });

const NEN_YEU_TO = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
  MaYeuTo.THOI_DUC,
  MaYeuTo.DICH_MA,
  MaYeuTo.THIEN_Y,
  MaYeuTo.GIAI_THAN,
  MaYeuTo.NGU_LY,
] as const;

const KY_YEU_TO = [
  MaYeuTo.TU_THAN,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.DU_HOA,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_KHI,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_MO,
  MaYeuTo.VANG_VONG,
  MaYeuTo.SOC_HUYEN_VONG,
] as const;

export const QUY_TAC_CAU_Y_TRI_BENH: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => rule('CAU_Y_TRI_BENH_NEN_' + ma, Y(ma), TacDongDungSu.NEN)),
  rule('CAU_Y_TRI_BENH_NEN_TRU_NHAT', T(ThapNhiTruc.TRU), TacDongDungSu.NEN),
  rule('CAU_Y_TRI_BENH_NEN_PHA_NHAT', T(ThapNhiTruc.PHA), TacDongDungSu.NEN),
  rule('CAU_Y_TRI_BENH_NEN_KHAI_NHAT', T(ThapNhiTruc.KHAI), TacDongDungSu.NEN),

  rule('CAU_Y_TRI_BENH_KY_KIEN_NHAT', T(ThapNhiTruc.KIEN), TacDongDungSu.KY),
  rule('CAU_Y_TRI_BENH_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  rule('CAU_Y_TRI_BENH_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY),
  rule('CAU_Y_TRI_BENH_KY_MAN_NHAT', T(ThapNhiTruc.MAN), TacDongDungSu.KY),
  rule('CAU_Y_TRI_BENH_KY_BE_NHAT', T(ThapNhiTruc.BE), TacDongDungSu.KY),
  ...KY_YEU_TO.map((ma) => rule('CAU_Y_TRI_BENH_KY_' + ma, Y(ma), TacDongDungSu.KY)),
  rule('CAU_Y_TRI_BENH_KY_NGAY_MUI', C(DiaChi.MUI), TacDongDungSu.KY),
  rule('CAU_Y_TRI_BENH_KY_NGAY_AM_15', L(15), TacDongDungSu.KY),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.CAU_Y_TRI_BENH,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
