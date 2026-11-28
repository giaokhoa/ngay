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
    muc: 'Cải táng (Khai toản)',
    tenGoc: '啓攢',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.862: 1 Nên Ô Phệ Đối / 14 Kị; mục riêng, không gộp An táng hoặc Phá, vỡ đất.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '啓攢',
    tenGoc: '啓攢',
    daXacMinh: true,
    ghiChu: 'WYG_011-26a: 宜鳴吠對; 忌月建月破平日收日劫煞災煞月煞月刑月害月厭四廢五墓復日重日.',
  },
];

const NEN_Q11: readonly DieuKienDungSu[] = [Y(MaYeuTo.O_PHE_DOI)];
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
  Y(MaYeuTo.NGU_MO),
  Y(MaYeuTo.PHUC_NHAT),
  Y(MaYeuTo.TRONG_NHAT),
];

export const QUY_TAC_CAI_TANG_KHAI_TOAN: readonly QuyTacDungSu[] = [
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
    ma: `CAI_TANG_KHAI_TOAN_Q11_${loai}_${String(index + 1).padStart(2, '0')}`,
    congViec: LoaiCongViec.CAI_TANG_KHAI_TOAN,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
