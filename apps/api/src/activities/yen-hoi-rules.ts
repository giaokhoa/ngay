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
    trang: 848,
    muc: 'Yến tiệc - Họp họ hàng, bạn bè, thân thuộc',
    tenGoc: '宴會〈會親友同〉',
    daXacMinh: true,
    ghiChu: 'Scan trực tiếp p.848; danh sách Nên/Kị khớp Hán Q11 từng mục.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '宴會〈會親友同〉',
    tenGoc: '宴會〈會親友同〉',
    daXacMinh: true,
    ghiChu: 'WYG_011-10b: 宜 18 mục; 忌 13 mục, kết thúc 五離酉日.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (chi: DiaChi): DieuKienDungSu => ({ loai: 'CHI_NGAY', chi });

const NEN_YEU_TO = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_AN,
  MaYeuTo.THIEN_XA,
  MaYeuTo.THIEN_NGUYEN,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
  MaYeuTo.THOI_DUC,
  MaYeuTo.VUONG_NHAT,
  MaYeuTo.DAN_NHAT,
  MaYeuTo.TAM_HOP,
  MaYeuTo.PHUC_DUC,
  MaYeuTo.THIEN_HY,
  MaYeuTo.LUC_HOP,
  MaYeuTo.NGU_HOP,
] as const;

const KY_YEU_TO = [
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_LY,
] as const;

export const QUY_TAC_YEN_HOI: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => rule('YEN_HOI_NEN_' + ma, Y(ma), TacDongDungSu.NEN)),
  rule('YEN_HOI_NEN_KHAI_NHAT', T(ThapNhiTruc.KHAI), TacDongDungSu.NEN),

  ...KY_YEU_TO.map((ma) => rule('YEN_HOI_KY_' + ma, Y(ma), TacDongDungSu.KY)),
  rule('YEN_HOI_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  rule('YEN_HOI_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY),
  rule('YEN_HOI_KY_BE_NHAT', T(ThapNhiTruc.BE), TacDongDungSu.KY),
  rule('YEN_HOI_KY_NGAY_DAU', C(DiaChi.DAU), TacDongDungSu.KY),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.YEN_HOI,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
