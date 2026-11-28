import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 860,
    muc: 'Phá nhà, hủy tường',
    tenGoc: '破屋壞垣',
    daXacMinh: true,
    ghiChu:
      'Exact Việt p.860: Nên Nguyệt Phá; Kị Nguyệt Kiến, Thổ Phủ, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Thổ Phù, Địa Nang, sau Thổ Vượng dụng sự.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '破屋壞垣',
    tenGoc: '破屋壞垣',
    daXacMinh: true,
    ghiChu: 'WYG_011-23a: 宜月破; 忌月建土府劫煞災煞月煞月刑月厭土符地囊土王用事後.',
  },
];

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const THO_VUONG: DieuKienDungSu = { loai: 'THO_VUONG' };

const KY: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_KIEN),
  Y(MaYeuTo.THO_PHU),
  Y(MaYeuTo.KIEP_SAT),
  Y(MaYeuTo.TAI_SAT),
  Y(MaYeuTo.NGUYET_SAT),
  Y(MaYeuTo.NGUYET_HINH),
  Y(MaYeuTo.NGUYET_YEM),
  Y(MaYeuTo.THO_PHU_TIN),
  Y(MaYeuTo.DIA_NANG),
  THO_VUONG,
];

export const QUY_TAC_PHA_NHA_HUY_TUONG: readonly QuyTacDungSu[] = [
  rule('PHA_NHA_HUY_TUONG_NEN_NGUYET_PHA', Y(MaYeuTo.NGUYET_PHA), TacDongDungSu.NEN),
  ...KY.map((dieuKien, index) =>
    rule(`PHA_NHA_HUY_TUONG_KY_${String(index + 1).padStart(2, '0')}`, dieuKien, TacDongDungSu.KY),
  ),
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return { ma, congViec: LoaiCongViec.PHA_NHA_HUY_TUONG, dieuKien, tacDong, nguon: NGUON_Q11 };
}
