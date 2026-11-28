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
    trang: 852,
    muc: 'Kê giường',
    tenGoc: '安牀',
    daXacMinh: true,
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '安牀',
    tenGoc: '安牀',
    daXacMinh: true,
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (chi: DiaChi): DieuKienDungSu => ({ loai: 'CHI_NGAY', chi });

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
] as const;

export const QUY_TAC_AN_GIUONG: readonly QuyTacDungSu[] = [
  rule('AN_GIUONG_NEN_NGUY_NHAT', T(ThapNhiTruc.NGUY), TacDongDungSu.NEN),
  rule('AN_GIUONG_KY_NGUYET_PHA', Y(MaYeuTo.NGUYET_PHA), TacDongDungSu.KY),
  rule('AN_GIUONG_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  rule('AN_GIUONG_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY),
  rule('AN_GIUONG_KY_BE_NHAT', T(ThapNhiTruc.BE), TacDongDungSu.KY),
  ...KY_YEU_TO.slice(1).map((ma) => rule('AN_GIUONG_KY_' + ma, Y(ma), TacDongDungSu.KY)),
  rule('AN_GIUONG_KY_NGAY_THAN', C(DiaChi.THAN), TacDongDungSu.KY),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.AN_GIUONG,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
