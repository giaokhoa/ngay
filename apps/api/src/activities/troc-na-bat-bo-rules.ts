import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 860,
    muc: 'Tróc nã, bắt bớ',
    tenGoc: '捕捉',
    daXacMinh: true,
    ghiChu: 'Exact Việt p.860: Nên ngày Chấp, ngày Thu; Kị Vãng Vong.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '捕捉',
    tenGoc: '捕捉',
    daXacMinh: true,
    ghiChu: 'WYG_011-23b: 宜執日收日; 忌往亡.',
  },
];

const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

export const QUY_TAC_TROC_NA_BAT_BO: readonly QuyTacDungSu[] = [
  rule('TROC_NA_BAT_BO_NEN_CHAP_NHAT', T(ThapNhiTruc.CHAP), TacDongDungSu.NEN),
  rule('TROC_NA_BAT_BO_NEN_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.NEN),
  rule('TROC_NA_BAT_BO_KY_VANG_VONG', Y(MaYeuTo.VANG_VONG), TacDongDungSu.KY),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.TROC_NA_BAT_BO, dieuKien, tacDong, nguon: NGUON_Q11 };
}
