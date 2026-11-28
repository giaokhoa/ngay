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
    muc: 'Sửa móng tay, chân',
    tenGoc: '整手足甲',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.853: Nên ngày Trừ, Giải Thần, Trừ Thần; Kị Nguyệt Kiến, Nguyệt Phá, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm và ngày âm 1, 6, 15, 19, 21, 23.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '整手足甲',
    tenGoc: '整手足甲',
    daXacMinh: true,
    ghiChu:
      'WYG_011-16a: 宜除日解神除神; 忌月建月破劫煞災煞月煞月刑月厭每月一日六日十五日十九日二十一日二十三日.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const L = (ngay: number): DieuKienDungSu => ({ loai: 'NGAY_AM', ngay });

export const QUY_TAC_SUA_MONG_TAY_CHAN: readonly QuyTacDungSu[] = [
  rule('SUA_MONG_TAY_CHAN_NEN_TRU_NHAT', T(ThapNhiTruc.TRU), TacDongDungSu.NEN),
  rule('SUA_MONG_TAY_CHAN_NEN_GIAI_THAN', Y(MaYeuTo.GIAI_THAN), TacDongDungSu.NEN),
  rule('SUA_MONG_TAY_CHAN_NEN_TRU_THAN', Y(MaYeuTo.NGU_LY), TacDongDungSu.NEN),

  rule('SUA_MONG_TAY_CHAN_KY_KIEN_NHAT', T(ThapNhiTruc.KIEN), TacDongDungSu.KY),
  ...[
    MaYeuTo.NGUYET_PHA,
    MaYeuTo.KIEP_SAT,
    MaYeuTo.TAI_SAT,
    MaYeuTo.NGUYET_SAT,
    MaYeuTo.NGUYET_HINH,
    MaYeuTo.NGUYET_YEM,
  ].map((ma) => rule('SUA_MONG_TAY_CHAN_KY_' + ma, Y(ma), TacDongDungSu.KY)),
  ...[1, 6, 15, 19, 21, 23].map((ngay) =>
    rule('SUA_MONG_TAY_CHAN_KY_NGAY_AM_' + ngay, L(ngay), TacDongDungSu.KY),
  ),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.SUA_MONG_TAY_CHAN,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
