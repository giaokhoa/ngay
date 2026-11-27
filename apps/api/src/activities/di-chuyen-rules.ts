import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 852,
    muc: 'Di chuyển (dời bếp)',
    tenGoc: '般移〈移徙同〉',
    daXacMinh: true,
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '般移〈移徙同〉',
    tenGoc: '般移〈移徙同〉',
    daXacMinh: true,
  },
];

const YEU_TO = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const TRUC = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

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
  MaYeuTo.DAN_NHAT,
  MaYeuTo.DICH_MA,
  MaYeuTo.THIEN_MA,
] as const;

const KY_YEU_TO = [
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_MO,
  MaYeuTo.QUY_KY,
  MaYeuTo.VANG_VONG,
] as const;

export const QUY_TAC_DI_CHUYEN: readonly QuyTacDungSu[] = [
  ...NEN_YEU_TO.map((ma) => taoQuyTac('DI_CHUYEN_NEN_' + ma, YEU_TO(ma), TacDongDungSu.NEN)),
  taoQuyTac('DI_CHUYEN_NEN_THANH_NHAT', TRUC(ThapNhiTruc.THANH), TacDongDungSu.NEN),
  taoQuyTac('DI_CHUYEN_NEN_KHAI_NHAT', TRUC(ThapNhiTruc.KHAI), TacDongDungSu.NEN),

  taoQuyTac('DI_CHUYEN_KY_NGUYET_PHA', YEU_TO(MaYeuTo.NGUYET_PHA), TacDongDungSu.KY),
  taoQuyTac('DI_CHUYEN_KY_BINH_NHAT', TRUC(ThapNhiTruc.BINH), TacDongDungSu.KY),
  taoQuyTac('DI_CHUYEN_KY_THU_NHAT', TRUC(ThapNhiTruc.THU), TacDongDungSu.KY),
  taoQuyTac('DI_CHUYEN_KY_BE_NHAT', TRUC(ThapNhiTruc.BE), TacDongDungSu.KY),
  ...KY_YEU_TO.slice(1).map((ma) => taoQuyTac('DI_CHUYEN_KY_' + ma, YEU_TO(ma), TacDongDungSu.KY)),
];

function taoQuyTac(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.DI_CHUYEN,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
