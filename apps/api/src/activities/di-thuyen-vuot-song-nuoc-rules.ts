import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 861,
    muc: 'Đi thuyền vượt sông nước',
    tenGoc: '乘船渡水',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.861: không có Nên; Kị Chiêu Diêu, Hàm Trì, Bát Phong, Cửu Khảm, Xúc Thủy Long.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '乘船渡水',
    tenGoc: '乘船渡水',
    daXacMinh: true,
    ghiChu: 'WYG_011-24a: 忌招搖咸池八風九坎觸水龍.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

export const QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC: readonly QuyTacDungSu[] = [
  rule('DI_THUYEN_VUOT_SONG_NUOC_KY_CHIEU_DIEU', Y(MaYeuTo.CHIEU_DIEU)),
  // Q6: 大時者咸池也 — Hàm Trì canonicalize bằng identity Đại Thời đã verified.
  rule('DI_THUYEN_VUOT_SONG_NUOC_KY_HAM_TRI_DAI_THOI', Y(MaYeuTo.DAI_THOI)),
  rule('DI_THUYEN_VUOT_SONG_NUOC_KY_BAT_PHONG', Y(MaYeuTo.BAT_PHONG)),
  rule('DI_THUYEN_VUOT_SONG_NUOC_KY_CUU_KHAM', Y(MaYeuTo.CUU_KHAM)),
  rule('DI_THUYEN_VUOT_SONG_NUOC_KY_XUC_THUY_LONG', Y(MaYeuTo.XUC_THUY_LONG)),
];

function rule(ma: string, dieuKien: DieuKienDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.DI_THUYEN_VUOT_SONG_NUOC,
    dieuKien,
    tacDong: TacDongDungSu.KY,
    nguon: NGUON_Q11,
  };
}
