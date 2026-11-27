import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 862,
    muc: 'An táng',
    tenGoc: '安葬',
    ghiChu:
      'Exact bản Việt: 8 Nên / 16 Kị. Mục riêng, không gộp Phá/Vỡ đất hoặc Cải táng (Khải Toản).',
    daXacMinh: true,
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '安葬',
    tenGoc: '安葬',
    ghiChu: 'Hán Q11 khớp exact 8 宜 / 16 忌 của bản Việt.',
    daXacMinh: true,
  },
];

const NEN_Q11: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THIEN_DUC),
  Y(MaYeuTo.NGUYET_DUC),
  Y(MaYeuTo.THIEN_DUC_HOP),
  Y(MaYeuTo.NGUYET_DUC_HOP),
  Y(MaYeuTo.THIEN_XA),
  Y(MaYeuTo.THIEN_NGUYEN),
  Y(MaYeuTo.LUC_HOP),
  Y(MaYeuTo.O_PHE),
];

const KY_Q11: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_KIEN),
  Y(MaYeuTo.NGUYET_PHA),
  T(ThapNhiTruc.BINH),
  T(ThapNhiTruc.THU),
  Y(MaYeuTo.KIEP_SAT),
  Y(MaYeuTo.TAI_SAT),
  Y(MaYeuTo.NGUYET_SAT),
  Y(MaYeuTo.NGUYET_HINH),
  Y(MaYeuTo.NGUYET_HAI),
  Y(MaYeuTo.NGUYET_YEM),
  Y(MaYeuTo.TU_PHE),
  Y(MaYeuTo.TU_KY),
  Y(MaYeuTo.TU_CUNG),
  Y(MaYeuTo.NGU_MO),
  Y(MaYeuTo.PHUC_NHAT),
  Y(MaYeuTo.TRONG_NHAT),
];

export const QUY_TAC_AN_TANG: readonly QuyTacDungSu[] = [
  ...NEN_Q11.map((dieuKien, index) => taoRule('NEN', index, dieuKien, TacDongDungSu.NEN)),
  ...KY_Q11.map((dieuKien, index) => taoRule('KY', index, dieuKien, TacDongDungSu.KY)),
];

function taoRule(
  loai: 'NEN' | 'KY',
  index: number,
  dieuKien: DieuKienDungSu,
  tacDong: TacDongDungSu,
): QuyTacDungSu {
  return {
    ma: `AN_TANG_Q11_${loai}_${String(index + 1).padStart(2, '0')}`,
    congViec: LoaiCongViec.AN_TANG,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
