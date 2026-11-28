import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 845,
    muc: 'Cầu tự',
    tenGoc: '求嗣',
    daXacMinh: true,
    ghiChu:
      'Exact scan p.845: Nên 12 mục; Kị 14 mục. Chú “Ngoài ra phỏng theo như thế” ở Cầu phúc ngay trước đó khiến Lộc Không/Thượng Sóc đẳng nhật tiếp tục áp dụng.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '求嗣',
    tenGoc: '求嗣',
    daXacMinh: true,
    ghiChu:
      'WYG_011-6b: 宜 12 mục; 忌 14 mục. Chú ở 祈福 ngay trước: 禄空上朔等日，見鋪註條例餘倣此.',
  },
];

const NGUON_Q10_DANG_NHAT: readonly ThamChieuNguon[] = [
  ...NGUON_Q11,
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 10,
    trang: 828,
    muc: 'Thượng Sóc - Tứ Ly - Tứ Tuyệt - Ngày Hối',
    tenGoc: '上朔 四離 四絶 晦日',
    daXacMinh: true,
    ghiChu:
      'Exact Việt Q10 p.828 mở “Thượng Sóc đẳng nhật” thành Tứ Ly, Tứ Tuyệt, Hối; Cầu tự không thuộc nhóm được miễn.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '上朔 四離 四絶 晦日',
    tenGoc: '上朔 四離 四絶 晦日',
    daXacMinh: true,
    ghiChu:
      'WYG_010-69a..69b: ngoài nhóm được miễn thì các việc khác không dùng; 求嗣 không nằm trong nhóm miễn.',
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
  MaYeuTo.THIEN_NGUYEN,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
  MaYeuTo.THOI_DUC,
  MaYeuTo.ICH_HAU,
  MaYeuTo.TUC_THE,
] as const;

const KY_YEU_TO_Q11 = [
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.DU_HOA,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.VO_LOC,
  MaYeuTo.THUONG_SOC,
] as const;

export const QUY_TAC_CAU_TU: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => rule('CAU_TU_NEN_' + ma, Y(ma), TacDongDungSu.NEN, NGUON_Q11)),
  rule('CAU_TU_NEN_KHAI_NHAT', T(ThapNhiTruc.KHAI), TacDongDungSu.NEN, NGUON_Q11),

  rule('CAU_TU_KY_KIEN_NHAT', T(ThapNhiTruc.KIEN), TacDongDungSu.KY, NGUON_Q11),
  rule('CAU_TU_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY, NGUON_Q11),
  rule('CAU_TU_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY, NGUON_Q11),
  ...KY_YEU_TO_Q11.map((ma) => rule('CAU_TU_KY_' + ma, Y(ma), TacDongDungSu.KY, NGUON_Q11)),
  rule('CAU_TU_KY_TU_LY', Y(MaYeuTo.TU_LY), TacDongDungSu.KY, NGUON_Q10_DANG_NHAT),
  rule('CAU_TU_KY_TU_TUYET', Y(MaYeuTo.TU_TUYET), TacDongDungSu.KY, NGUON_Q10_DANG_NHAT),
  rule('CAU_TU_KY_HOI_NHAT', Y(MaYeuTo.HOI_NHAT), TacDongDungSu.KY, NGUON_Q10_DANG_NHAT),
];

function rule(
  ma: string,
  dieuKien: DieuKienDungSu,
  tacDong: TacDongDungSu,
  nguon: readonly ThamChieuNguon[],
): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.CAU_TU, dieuKien, tacDong, nguon };
}
