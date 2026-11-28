import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11_DONG_THUAN: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 844,
    muc: 'Cúng tế',
    tenGoc: '祭祀',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.844 khớp Hán Q11 ở 15 Nên còn lại và 2 Kị; riêng Phúc Sinh bị lược, đã đăng ký discrepancy riêng.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '祭祀',
    tenGoc: '祭祀',
    daXacMinh: true,
    ghiChu: 'WYG_011-6a: 宜 16 mục, 忌天狗寅日.',
  },
];

const NGUON_Q11_PHUC_SINH: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '祭祀',
    tenGoc: '祭祀',
    daXacMinh: true,
    ghiChu:
      'WYG_011-6a ghi 福生 trong dòng 宜. Exact Việt p.844 thiếu mục này; xem discrepancy Q11_TE_TU_VIET_THIEU_PHUC_SINH.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 6,
    muc: '福生',
    tenGoc: '福生',
    daXacMinh: true,
    ghiChu: 'WYG_006-40b..41a source-lock identity/công thức Phúc Sinh.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (chi: DiaChi): DieuKienDungSu => ({ loai: 'CHI_NGAY', chi });

const NEN_DONG_THUAN = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.THIEN_NGUYEN,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
  MaYeuTo.THOI_DUC,
  MaYeuTo.THIEN_VU,
  MaYeuTo.PHO_HO,
  MaYeuTo.THANH_TAM,
  MaYeuTo.ICH_HAU,
  MaYeuTo.TUC_THE,
] as const;

export const QUY_TAC_TE_TU: readonly QuyTacDungSu[] = [
  ...NEN_DONG_THUAN.map((ma) =>
    rule('TE_TU_NEN_' + ma, Y(ma), TacDongDungSu.NEN, NGUON_Q11_DONG_THUAN),
  ),
  rule('TE_TU_NEN_KHAI_NHAT', T(ThapNhiTruc.KHAI), TacDongDungSu.NEN, NGUON_Q11_DONG_THUAN),
  rule('TE_TU_NEN_PHUC_SINH', Y(MaYeuTo.PHUC_SINH), TacDongDungSu.NEN, NGUON_Q11_PHUC_SINH),

  rule('TE_TU_KY_THIEN_CAU', Y(MaYeuTo.THIEN_CAU), TacDongDungSu.KY, NGUON_Q11_DONG_THUAN),
  rule('TE_TU_KY_NGAY_DAN', C(DiaChi.DAN), TacDongDungSu.KY, NGUON_Q11_DONG_THUAN),
];

function rule(
  ma: string,
  dieuKien: DieuKienDungSu,
  tacDong: TacDongDungSu,
  nguon: readonly ThamChieuNguon[],
): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.TE_TU,
    dieuKien,
    tacDong,
    nguon,
  };
}
