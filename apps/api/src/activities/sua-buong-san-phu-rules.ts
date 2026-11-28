import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 858,
    muc: 'Bố trí và sửa sang buồng sản phụ',
    tenGoc: '修置産室',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.858: 1 Nên / 21 Kị. Bình nhật và Tử Thần giữ hai identity riêng; Thổ Phủ / Thổ Phù cũng là hai identity khác nhau.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '修置産室',
    tenGoc: '修置産室',
    daXacMinh: true,
    ghiChu:
      'WYG_011-21b: 宜開日; 忌月建土府月破平日死神收日閉日劫煞災煞月煞月刑月害月厭大時天吏死氣四廢五墓土符地囊土王用事後.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const THO_VUONG: DieuKienDungSu = { loai: 'THO_VUONG' };

const KY: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_KIEN),
  Y(MaYeuTo.THO_PHU),
  Y(MaYeuTo.NGUYET_PHA),
  T(ThapNhiTruc.BINH),
  Y(MaYeuTo.TU_THAN),
  T(ThapNhiTruc.THU),
  T(ThapNhiTruc.BE),
  Y(MaYeuTo.KIEP_SAT),
  Y(MaYeuTo.TAI_SAT),
  Y(MaYeuTo.NGUYET_SAT),
  Y(MaYeuTo.NGUYET_HINH),
  Y(MaYeuTo.NGUYET_HAI),
  Y(MaYeuTo.NGUYET_YEM),
  Y(MaYeuTo.DAI_THOI),
  Y(MaYeuTo.THIEN_LAI),
  Y(MaYeuTo.TU_KHI),
  Y(MaYeuTo.TU_PHE),
  Y(MaYeuTo.NGU_MO),
  Y(MaYeuTo.THO_PHU_TIN),
  Y(MaYeuTo.DIA_NANG),
  THO_VUONG,
];

export const QUY_TAC_SUA_BUONG_SAN_PHU: readonly QuyTacDungSu[] = [
  rule('SUA_BUONG_SAN_PHU_NEN_KHAI_NHAT', T(ThapNhiTruc.KHAI), TacDongDungSu.NEN),
  ...KY.map((dieuKien, index) =>
    rule(`SUA_BUONG_SAN_PHU_KY_${String(index + 1).padStart(2, '0')}`, dieuKien, TacDongDungSu.KY),
  ),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.SUA_BUONG_SAN_PHU,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
