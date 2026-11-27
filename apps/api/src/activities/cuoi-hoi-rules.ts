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
    trang: 851,
    muc: 'Lễ cưới, đón dâu',
    tenGoc: '嫁娶',
    daXacMinh: true,
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '嫁娶',
    tenGoc: '嫁娶',
    daXacMinh: true,
  },
];

const YEU_TO = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const TRUC = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const CHI_NGAY = (chi: DiaChi): DieuKienDungSu => ({ loai: 'CHI_NGAY', chi });

const NEN = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.THIEN_NGUYEN,
  MaYeuTo.TAM_HOP,
  MaYeuTo.THIEN_HY,
  MaYeuTo.LUC_HOP,
  MaYeuTo.BAT_TUONG,
] as const;

const KY_YEU_TO = [
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.YEM_DOI,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.TU_KY,
  MaYeuTo.TU_CUNG,
  MaYeuTo.NGU_MO,
  MaYeuTo.VANG_VONG,
  MaYeuTo.BAT_CHUYEN,
] as const;

export const QUY_TAC_CUOI_HOI: readonly QuyTacDungSu[] = [
  ...NEN.map((ma) => taoQuyTac(`CUOI_HOI_NEN_${ma}`, YEU_TO(ma), TacDongDungSu.NEN)),
  taoQuyTac('CUOI_HOI_KY_NGUYET_PHA', YEU_TO(MaYeuTo.NGUYET_PHA), TacDongDungSu.KY),
  taoQuyTac('CUOI_HOI_KY_BINH_NHAT', TRUC(ThapNhiTruc.BINH), TacDongDungSu.KY),
  taoQuyTac('CUOI_HOI_KY_THU_NHAT', TRUC(ThapNhiTruc.THU), TacDongDungSu.KY),
  taoQuyTac('CUOI_HOI_KY_BE_NHAT', TRUC(ThapNhiTruc.BE), TacDongDungSu.KY),
  ...KY_YEU_TO.slice(1).map((ma) => taoQuyTac(`CUOI_HOI_KY_${ma}`, YEU_TO(ma), TacDongDungSu.KY)),
  taoQuyTac('CUOI_HOI_KY_HOI_NHAT', CHI_NGAY(DiaChi.HOI), TacDongDungSu.KY),
];

function taoQuyTac(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.CUOI_HOI,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
