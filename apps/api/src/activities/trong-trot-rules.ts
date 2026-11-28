import { ThienCan } from '../calendar/domain/heavenly-stem';
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
    muc: 'Trồng trọt',
    tenGoc: '栽種',
    daXacMinh: true,
    ghiChu: 'Exact Việt p.861: 13 Nên / 21 Kị.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '栽種',
    tenGoc: '栽種',
    daXacMinh: true,
    ghiChu:
      'WYG_011-24b: 宜天徳月徳天徳合月徳合天赦母倉天願月恩四相時徳民日開日五富; 忌月建土府月破平日死神劫煞災煞月煞月刑月厭地火大時天吏死氣四廢五墓九焦土符地囊乙日土王用事後.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (can: ThienCan): DieuKienDungSu => ({ loai: 'CAN_NGAY', can });
const THO_VUONG: DieuKienDungSu = { loai: 'THO_VUONG' };

const NEN: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THIEN_DUC),
  Y(MaYeuTo.NGUYET_DUC),
  Y(MaYeuTo.THIEN_DUC_HOP),
  Y(MaYeuTo.NGUYET_DUC_HOP),
  Y(MaYeuTo.THIEN_XA),
  Y(MaYeuTo.MAU_THUONG),
  Y(MaYeuTo.THIEN_NGUYEN),
  Y(MaYeuTo.NGUYET_AN),
  Y(MaYeuTo.TU_TUONG),
  Y(MaYeuTo.THOI_DUC),
  Y(MaYeuTo.DAN_NHAT),
  T(ThapNhiTruc.KHAI),
  Y(MaYeuTo.NGU_PHU),
];

const KY: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_KIEN),
  Y(MaYeuTo.THO_PHU),
  Y(MaYeuTo.NGUYET_PHA),
  T(ThapNhiTruc.BINH),
  Y(MaYeuTo.TU_THAN),
  Y(MaYeuTo.KIEP_SAT),
  Y(MaYeuTo.TAI_SAT),
  Y(MaYeuTo.NGUYET_SAT),
  Y(MaYeuTo.NGUYET_HINH),
  Y(MaYeuTo.NGUYET_YEM),
  Y(MaYeuTo.DIA_HOA),
  Y(MaYeuTo.DAI_THOI),
  Y(MaYeuTo.THIEN_LAI),
  Y(MaYeuTo.TU_KHI),
  Y(MaYeuTo.TU_PHE),
  Y(MaYeuTo.NGU_MO),
  Y(MaYeuTo.CUU_KHAM), // 九焦: same Q5 position identity as 九坎.
  Y(MaYeuTo.THO_PHU_TIN),
  Y(MaYeuTo.DIA_NANG),
  C(ThienCan.AT),
  THO_VUONG,
];

export const QUY_TAC_TRONG_TROT: readonly QuyTacDungSu[] = [
  ...NEN.map((dieuKien, index) =>
    rule(`TRONG_TROT_NEN_${String(index + 1).padStart(2, '0')}`, dieuKien, TacDongDungSu.NEN),
  ),
  ...KY.map((dieuKien, index) =>
    rule(`TRONG_TROT_KY_${String(index + 1).padStart(2, '0')}`, dieuKien, TacDongDungSu.KY),
  ),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.TRONG_TROT, dieuKien, tacDong, nguon: NGUON_Q11 };
}
