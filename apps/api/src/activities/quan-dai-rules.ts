import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 848,
    muc: 'Lễ đội mũ, đeo thắt lưng',
    tenGoc: '冠帶',
    daXacMinh: true,
    ghiChu:
      'Bản Việt p.848 in thêm Bế nhật; production không dùng mục này vì Hán Q11 và cả Việt/Hán Q10 mục Bế nhật đều không Kị 冠帶. Xem discrepancy Q11_QUAN_DAI_VIET_THEM_BE_NHAT.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '冠帶',
    tenGoc: '冠帶',
    daXacMinh: true,
  },
];

const NGUON_Q10_BACH_KY: ThamChieuNguon = {
  loaiNguon: LoaiNguon.HAN_BAN,
  quyen: 10,
  muc: '百忌日',
  tenGoc: '丑日忌冠帶',
  daXacMinh: true,
};

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const C = (chi: DiaChi): DieuKienDungSu => ({ loai: 'CHI_NGAY', chi });

const KY_YEU_TO = [
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_MO,
] as const;

export const QUY_TAC_QUAN_DAI: readonly QuyTacDungSu[] = [
  rule('QUAN_DAI_NEN_DINH_NHAT', T(ThapNhiTruc.DINH), TacDongDungSu.NEN),
  rule('QUAN_DAI_KY_NGUYET_PHA', Y(MaYeuTo.NGUYET_PHA), TacDongDungSu.KY),
  rule('QUAN_DAI_KY_BINH_NHAT', T(ThapNhiTruc.BINH), TacDongDungSu.KY),
  rule('QUAN_DAI_KY_THU_NHAT', T(ThapNhiTruc.THU), TacDongDungSu.KY),
  ...KY_YEU_TO.slice(1).map((ma) => rule('QUAN_DAI_KY_' + ma, Y(ma), TacDongDungSu.KY)),
  {
    ...rule('QUAN_DAI_KY_NGAY_SUU', C(DiaChi.SUU), TacDongDungSu.KY),
    nguon: [...NGUON_Q11, NGUON_Q10_BACH_KY],
  },
];

function rule(ma: string, dieuKien: DieuKienDungSu, tacDong: TacDongDungSu): QuyTacDungSu {
  return {
    ma,
    congViec: LoaiCongViec.QUAN_DAI,
    dieuKien,
    tacDong,
    nguon: NGUON_Q11,
  };
}
