import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const THO_VUONG: DieuKienDungSu = { loai: 'THO_VUONG' };

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 862,
    muc: 'Phá, vỡ đất',
    tenGoc: '破土',
    daXacMinh: true,
    ghiChu: 'Exact Việt p.862: 2 Nên / 18 Kị; mục riêng, không gộp An táng hoặc Cải táng.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '破土',
    tenGoc: '破土',
    daXacMinh: true,
    ghiChu:
      'WYG_011-25b: 宜鳴吠鳴吠對; 忌月建土府月破平日收日劫煞災煞月煞月刑月害月厭四廢五墓土符地囊復日重日土王用事後.',
  },
];

const NEN: readonly DieuKienDungSu[] = [Y(MaYeuTo.O_PHE), Y(MaYeuTo.O_PHE_DOI)];
const KY: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_KIEN),
  Y(MaYeuTo.THO_PHU),
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
  Y(MaYeuTo.THO_PHU_TIN),
  Y(MaYeuTo.DIA_NANG),
  Y(MaYeuTo.PHUC_NHAT),
  Y(MaYeuTo.TRONG_NHAT),
  THO_VUONG,
];

export const QUY_TAC_PHA_VO_DAT: readonly QuyTacDungSu[] = [
  ...NEN.map((dieuKien, index) => taoRule('NEN', index, dieuKien, TacDongDungSu.NEN)),
  ...KY.map((dieuKien, index) => taoRule('KY', index, dieuKien, TacDongDungSu.KY)),
];

function taoRule(
  loai: 'NEN' | 'KY',
  index: number,
  dieuKien: DieuKienDungSu,
  tacDong: TacDongDungSu,
): QuyTacDungSu {
  return {
    ma: `PHA_VO_DAT_Q11_${loai}_${String(index + 1).padStart(2, '0')}`,
    congViec: LoaiCongViec.PHA_VO_DAT,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
