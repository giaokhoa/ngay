import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const NGUON_KHAI_TRUONG: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 857,
    muc: 'Khai trương',
    tenGoc: '開市',
    ghiChu: 'Bản Việt ghi “ngày Dân”; identity là Dân Nhật / 民日, không phải Chi Dần.',
    daXacMinh: true,
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '開市',
    tenGoc: '開市',
    ghiChu: '宜天願民日滿日成日開日五富',
    daXacMinh: true,
  },
];

const NEN: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THIEN_NGUYEN),
  Y(MaYeuTo.DAN_NHAT),
  T(ThapNhiTruc.MAN),
  T(ThapNhiTruc.THANH),
  T(ThapNhiTruc.KHAI),
  Y(MaYeuTo.NGU_PHU),
];

const KY: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_PHA),
  Y(MaYeuTo.DAI_HAO),
  T(ThapNhiTruc.BINH),
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
  Y(MaYeuTo.TIEU_HAO),
  Y(MaYeuTo.TU_HAO),
  Y(MaYeuTo.TU_PHE),
  Y(MaYeuTo.TU_CUNG),
  Y(MaYeuTo.NGU_MO),
  Y(MaYeuTo.CUU_KHONG),
];

export const QUY_TAC_KHAI_TRUONG: readonly QuyTacDungSu[] = [
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
    ma: `KHAI_TRUONG_${loai}_${String(index + 1).padStart(2, '0')}`,
    congViec: LoaiCongViec.KHAI_TRUONG,
    dieuKien,
    tacDong,
    nguon: NGUON_KHAI_TRUONG,
  };
}
