import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 859,
    muc: 'Đặt cối xay, giã',
    tenGoc: '安碓磑',
    daXacMinh: true,
    ghiChu: 'Exact Việt p.859: 2 Nên / 11 Kị; Bình nhật không thuộc Kị mục này.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '安碓磑',
    tenGoc: '安碓磑',
    daXacMinh: true,
    ghiChu: 'WYG_011-22a: 宜三合開日; 忌土府月破劫煞災煞月煞月刑月厭四廢土符地囊土王用事後.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const THO_VUONG: DieuKienDungSu = { loai: 'THO_VUONG' };

const KY: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THO_PHU),
  Y(MaYeuTo.NGUYET_PHA),
  Y(MaYeuTo.KIEP_SAT),
  Y(MaYeuTo.TAI_SAT),
  Y(MaYeuTo.NGUYET_SAT),
  Y(MaYeuTo.NGUYET_HINH),
  Y(MaYeuTo.NGUYET_YEM),
  Y(MaYeuTo.TU_PHE),
  Y(MaYeuTo.THO_PHU_TIN),
  Y(MaYeuTo.DIA_NANG),
  THO_VUONG,
];

export const QUY_TAC_DAT_COI_XAY_GIA: readonly QuyTacDungSu[] = [
  rule('DAT_COI_XAY_GIA_NEN_TAM_HOP', Y(MaYeuTo.TAM_HOP), TacDongDungSu.NEN),
  rule('DAT_COI_XAY_GIA_NEN_KHAI_NHAT', T(ThapNhiTruc.KHAI), TacDongDungSu.NEN),
  ...KY.map((dieuKien, index) =>
    rule(`DAT_COI_XAY_GIA_KY_${String(index + 1).padStart(2, '0')}`, dieuKien, TacDongDungSu.KY),
  ),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.DAT_COI_XAY_GIA,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
