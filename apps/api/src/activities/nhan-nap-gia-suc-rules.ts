import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 861,
    muc: 'Nhận, nạp gia súc',
    tenGoc: '納畜',
    daXacMinh: true,
    ghiChu: 'Exact Việt p.861–862: 13 Nên / 13 Kị.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '納畜',
    tenGoc: '納畜',
    daXacMinh: true,
    ghiChu:
      'WYG_011-25a: 宜天徳月徳天徳合月徳合天赦母倉天願民日三合收日六合五富天倉; 忌月破平日死神劫煞災煞月煞月刑月害月厭大時天吏四廢五墓.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const NEN: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THIEN_DUC),
  Y(MaYeuTo.NGUYET_DUC),
  Y(MaYeuTo.THIEN_DUC_HOP),
  Y(MaYeuTo.NGUYET_DUC_HOP),
  Y(MaYeuTo.THIEN_XA),
  Y(MaYeuTo.MAU_THUONG),
  Y(MaYeuTo.THIEN_NGUYEN),
  Y(MaYeuTo.DAN_NHAT),
  Y(MaYeuTo.TAM_HOP),
  T(ThapNhiTruc.THU),
  Y(MaYeuTo.LUC_HOP),
  Y(MaYeuTo.NGU_PHU),
  Y(MaYeuTo.THIEN_THUONG),
];

const KY: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_PHA),
  T(ThapNhiTruc.BINH),
  Y(MaYeuTo.TU_THAN),
  Y(MaYeuTo.KIEP_SAT),
  Y(MaYeuTo.TAI_SAT),
  Y(MaYeuTo.NGUYET_SAT),
  Y(MaYeuTo.NGUYET_HINH),
  Y(MaYeuTo.NGUYET_HAI),
  Y(MaYeuTo.NGUYET_YEM),
  Y(MaYeuTo.DAI_THOI),
  Y(MaYeuTo.THIEN_LAI),
  Y(MaYeuTo.TU_PHE),
  Y(MaYeuTo.NGU_MO),
];

export const QUY_TAC_NHAN_NAP_GIA_SUC: readonly QuyTacDungSu[] = [
  ...NEN.map((dieuKien, index) =>
    rule(`NHAN_NAP_GIA_SUC_NEN_${String(index + 1).padStart(2, '0')}`, dieuKien, TacDongDungSu.NEN),
  ),
  ...KY.map((dieuKien, index) =>
    rule(`NHAN_NAP_GIA_SUC_KY_${String(index + 1).padStart(2, '0')}`, dieuKien, TacDongDungSu.KY),
  ),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.NHAN_NAP_GIA_SUC, dieuKien, tacDong, nguon: NGUON_Q11 };
}
