import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 854,
    muc: 'May đo - cắt may quần áo',
    tenGoc: '裁製',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.854: 14 Nên / 9 Kị; Nên có Vương nhật, Tam Hợp, Mãn, Khai, Phục nhật; Kị Nguyệt Phá, Bình, Thu, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Tứ Phế.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '裁製〈裁衣同〉',
    tenGoc: '裁製',
    daXacMinh: true,
    ghiChu:
      'WYG_011-17a: 宜天徳月徳天徳合月徳合天赦天願月恩四相時徳王日三合滿日開日復日; 忌月破平日收日劫煞災煞月煞月刑月厭四廢.',
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
  MaYeuTo.VUONG_NHAT,
  MaYeuTo.TAM_HOP,
  MaYeuTo.PHUC_NHAT,
] as const;

const KY_YEU_TO = [
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.TU_PHE,
] as const;

export const QUY_TAC_MAY_DO: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => rule('MAY_DO_NEN_' + ma, Y(ma), TacDongDungSu.NEN)),
  rule('MAY_DO_NEN_MAN_NHAT', T(ThapNhiTruc.MAN), TacDongDungSu.NEN),
  rule('MAY_DO_NEN_KHAI_NHAT', T(ThapNhiTruc.KHAI), TacDongDungSu.NEN),

  rule('MAY_DO_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  rule('MAY_DO_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY),
  ...KY_YEU_TO.map((ma) => rule('MAY_DO_KY_' + ma, Y(ma), TacDongDungSu.KY)),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.MAY_DO, dieuKien, tacDong, nguon: NGUON_Q11 };
}
