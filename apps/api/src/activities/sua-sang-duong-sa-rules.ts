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
    muc: 'Sửa sang đường sá',
    tenGoc: '平治道塗',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.859: Nên ngày Bình; Kị Thổ Phủ, Nguyệt Yếm, Thổ Phù, Địa Nang, sau Thổ Vượng dụng sự.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '平治道塗',
    tenGoc: '平治道塗',
    daXacMinh: true,
    ghiChu: 'WYG_011-23a: 宜平日; 忌土府月厭土符地囊土王用事後.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const THO_VUONG: DieuKienDungSu = { loai: 'THO_VUONG' };

const KY: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THO_PHU),
  Y(MaYeuTo.NGUYET_YEM),
  Y(MaYeuTo.THO_PHU_TIN),
  Y(MaYeuTo.DIA_NANG),
  THO_VUONG,
];

export const QUY_TAC_SUA_SANG_DUONG_SA: readonly QuyTacDungSu[] = [
  rule('SUA_SANG_DUONG_SA_NEN_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.NEN),
  ...KY.map((dieuKien, index) =>
    rule(`SUA_SANG_DUONG_SA_KY_${String(index + 1).padStart(2, '0')}`, dieuKien, TacDongDungSu.KY),
  ),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.SUA_SANG_DUONG_SA, dieuKien, tacDong, nguon: NGUON_Q11 };
}
