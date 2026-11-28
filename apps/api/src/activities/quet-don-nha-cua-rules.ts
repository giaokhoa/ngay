import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 859,
    muc: 'Quét dọn nhà cửa',
    tenGoc: '掃舍宇',
    daXacMinh: true,
    ghiChu: 'Exact Việt p.859: Nên ngày Trừ, Trừ Thần; Kị không.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '掃舍宇',
    tenGoc: '掃舍宇',
    daXacMinh: true,
    ghiChu: 'WYG_011-22b: 宜除日除神; 忌無.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

export const QUY_TAC_QUET_DON_NHA_CUA: readonly QuyTacDungSu[] = [
  rule('QUET_DON_NHA_CUA_NEN_TRU_NHAT', T(ThapNhiTruc.TRU)),
  rule('QUET_DON_NHA_CUA_NEN_TRU_THAN', Y(MaYeuTo.NGU_LY)),
];

function rule(ma: string, dieuKien: DieuKienDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.QUET_DON_NHA_CUA,
    dieuKien,
    tacDong: TacDongDungSu.NEN,
    nguon: NGUON_Q11,
  };
}
