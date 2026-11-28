import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_NEN_BINH: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '修飾垣墻',
    tenGoc: '修飾垣墻',
    daXacMinh: true,
    ghiChu:
      'WYG_011-22b..23a ghi 宜平日. Bản Việt Tập I p.859 lược dòng Nên này; xem discrepancy Q11_TRANG_TRI_TUONG_VIET_THIEU_BINH_NHAT.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '平日',
    tenGoc: '平日',
    daXacMinh: true,
    ghiChu: 'WYG_010-19a ghi trực tiếp 宜修飾垣墻平治道塗.',
  },
];

const NGUON_KY_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 859,
    muc: 'Trang trí tường',
    tenGoc: '修飾垣墻',
    daXacMinh: true,
    ghiChu: 'Việt p.859 khớp Hán ở 11 Kị; riêng dòng Nên Bình nhật bị lược và được registry riêng.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '修飾垣墻',
    tenGoc: '修飾垣墻',
    daXacMinh: true,
    ghiChu: 'WYG_011-22b..23a: 忌土府月破劫煞災煞月煞月刑月厭四廢土符地囊土王用事後.',
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

export const QUY_TAC_TRANG_TRI_TUONG: readonly QuyTacDungSu[] = [
  rule('TRANG_TRI_TUONG_NEN_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.NEN, NGUON_NEN_BINH),
  ...KY.map((dieuKien, index) =>
    rule(
      `TRANG_TRI_TUONG_KY_${String(index + 1).padStart(2, '0')}`,
      dieuKien,
      TacDongDungSu.KY,
      NGUON_KY_Q11,
    ),
  ),
];

function rule(
  ma: string,
  dieuKien: DieuKienDungSu,
  tacDong: TacDongDungSu,
  nguon: readonly ThamChieuNguon[],
): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.TRANG_TRI_TUONG, dieuKien, tacDong, nguon };
}
