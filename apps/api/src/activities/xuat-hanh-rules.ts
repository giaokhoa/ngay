import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (chi: DiaChi): DieuKienDungSu => ({ loai: 'CHI_NGAY', chi });

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 849,
    muc: 'Đế vương xuất hành, sai sứ, xuất hành',
    tenGoc: '行幸遣使〈出行同〉',
    ghiChu:
      'Exact bản Việt có 16 Nên / 15 Kị và không in Nguyệt Yếm trong dòng Kị; không normalize ngầm theo Hán.',
    daXacMinh: true,
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '行幸遣使〈出行同〉',
    tenGoc: '行幸遣使〈出行同〉',
    ghiChu:
      'Hán Q11 có thêm 月厭 trong Kị; production giữ discrepancy và bổ sung Nguyệt Yếm từ Q10 Việt.',
    daXacMinh: true,
  },
];

const NGUON_NGUYET_YEM_Q10: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 10,
    trang: 806,
    muc: 'Nguyệt Yếm - Địa Hỏa',
    tenGoc: '月厭',
    ghiChu:
      'Q10 Việt ghi trực tiếp “đế vương xuất hành, sai sứ” trong Kị; đây là supplement riêng, không giả rằng Q11 Việt p.849 có chữ Nguyệt Yếm.',
    daXacMinh: true,
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '月厭',
    tenGoc: '月厭',
    ghiChu: 'Hán Q10 đối chiếu cùng Kị xuất hành.',
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
  Y(MaYeuTo.NGUYET_AN),
  Y(MaYeuTo.TU_TUONG),
  Y(MaYeuTo.THOI_DUC),
  Y(MaYeuTo.VUONG_NHAT),
  Y(MaYeuTo.DICH_MA),
  Y(MaYeuTo.THIEN_MA),
  T(ThapNhiTruc.KIEN),
  Y(MaYeuTo.CAT_KY),
  Y(MaYeuTo.THIEN_HY),
  T(ThapNhiTruc.KHAI),
];

const KY_Q11_VIET: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_PHA),
  T(ThapNhiTruc.BINH),
  T(ThapNhiTruc.THU),
  T(ThapNhiTruc.BE),
  Y(MaYeuTo.KIEP_SAT),
  Y(MaYeuTo.TAI_SAT),
  Y(MaYeuTo.NGUYET_SAT),
  Y(MaYeuTo.NGUYET_HINH),
  Y(MaYeuTo.DAI_THOI),
  Y(MaYeuTo.THIEN_LAI),
  Y(MaYeuTo.THIEN_TAC),
  Y(MaYeuTo.TU_PHE),
  Y(MaYeuTo.NGU_MO),
  Y(MaYeuTo.VANG_VONG),
  C(DiaChi.TI),
];

export const QUY_TAC_XUAT_HANH_Q11: readonly QuyTacDungSu[] = [
  ...NEN_Q11.map((dieuKien, index) =>
    taoRule('Q11_NEN', index, dieuKien, TacDongDungSu.NEN, NGUON_Q11),
  ),
  ...KY_Q11_VIET.map((dieuKien, index) =>
    taoRule('Q11_KY', index, dieuKien, TacDongDungSu.KY, NGUON_Q11),
  ),
];

export const QUY_TAC_XUAT_HANH_BO_SUNG_Q10: readonly QuyTacDungSu[] = [
  {
    ma: 'XUAT_HANH_Q10_KY_NGUYET_YEM',
    congViec: LoaiCongViec.XUAT_HANH,
    dieuKien: Y(MaYeuTo.NGUYET_YEM),
    tacDong: TacDongDungSu.KY,
    nguon: NGUON_NGUYET_YEM_Q10,
  },
];

export const QUY_TAC_XUAT_HANH: readonly QuyTacDungSu[] = [
  ...QUY_TAC_XUAT_HANH_Q11,
  ...QUY_TAC_XUAT_HANH_BO_SUNG_Q10,
];

function taoRule(
  loai: 'Q11_NEN' | 'Q11_KY',
  index: number,
  dieuKien: DieuKienDungSu,
  tacDong: TacDongDungSu,
  nguon: readonly ThamChieuNguon[],
): QuyTacDungSu {
  return {
    ma: `XUAT_HANH_${loai}_${String(index + 1).padStart(2, '0')}`,
    congViec: LoaiCongViec.XUAT_HANH,
    dieuKien,
    tacDong,
    nguon,
  };
}
