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
    trang: 853,
    muc: 'Trang điểm dung nhan, cạo đầu, cắt tóc',
    tenGoc: '整容剃頭',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.853: Nên ngày Trừ, Giải Thần, Trừ Thần; Kị Nguyệt Kiến, Nguyệt Phá, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, ngày Đinh, ngày âm 12 và 15.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '整容剃頭',
    tenGoc: '整容剃頭',
    daXacMinh: true,
    ghiChu: 'WYG_011-16a: 宜除日解神除神; 忌月建月破劫煞災煞月煞月刑月厭丁日每月十二日十五日.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (can: ThienCan): DieuKienDungSu => ({ loai: 'CAN_NGAY', can });
const L = (ngay: number): DieuKienDungSu => ({ loai: 'NGAY_AM', ngay });

export const QUY_TAC_CHINH_DUNG_CAT_TOC: readonly QuyTacDungSu[] = [
  rule('CHINH_DUNG_CAT_TOC_NEN_TRU_NHAT', T(ThapNhiTruc.TRU), TacDongDungSu.NEN),
  rule('CHINH_DUNG_CAT_TOC_NEN_GIAI_THAN', Y(MaYeuTo.GIAI_THAN), TacDongDungSu.NEN),
  rule('CHINH_DUNG_CAT_TOC_NEN_TRU_THAN', Y(MaYeuTo.NGU_LY), TacDongDungSu.NEN),

  rule('CHINH_DUNG_CAT_TOC_KY_KIEN_NHAT', T(ThapNhiTruc.KIEN), TacDongDungSu.KY),
  ...[
    MaYeuTo.NGUYET_PHA,
    MaYeuTo.KIEP_SAT,
    MaYeuTo.TAI_SAT,
    MaYeuTo.NGUYET_SAT,
    MaYeuTo.NGUYET_HINH,
    MaYeuTo.NGUYET_YEM,
  ].map((ma) => rule('CHINH_DUNG_CAT_TOC_KY_' + ma, Y(ma), TacDongDungSu.KY)),
  rule('CHINH_DUNG_CAT_TOC_KY_NGAY_DINH', C(ThienCan.DINH), TacDongDungSu.KY),
  rule('CHINH_DUNG_CAT_TOC_KY_NGAY_AM_12', L(12), TacDongDungSu.KY),
  rule('CHINH_DUNG_CAT_TOC_KY_NGAY_AM_15', L(15), TacDongDungSu.KY),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.CHINH_DUNG_CAT_TOC,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
