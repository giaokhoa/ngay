import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { DieuKienDungSu, LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });
const THO_VUONG: DieuKienDungSu = { loai: 'THO_VUONG' };

const NEN_DONG_THO: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THIEN_DUC),
  Y(MaYeuTo.NGUYET_DUC),
  Y(MaYeuTo.THIEN_DUC_HOP),
  Y(MaYeuTo.NGUYET_DUC_HOP),
  Y(MaYeuTo.THIEN_XA),
  Y(MaYeuTo.THIEN_NGUYEN),
  Y(MaYeuTo.NGUYET_AN),
  Y(MaYeuTo.TU_TUONG),
  Y(MaYeuTo.THOI_DUC),
  Y(MaYeuTo.TAM_HOP),
  T(ThapNhiTruc.KHAI),
];

const NEN_SUA_CUNG_THAT: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_AN),
  Y(MaYeuTo.TU_TUONG),
  Y(MaYeuTo.THOI_DUC),
  Y(MaYeuTo.TAM_HOP),
  Y(MaYeuTo.PHUC_DUC),
  T(ThapNhiTruc.KHAI),
];

const KY_CONG_VIEC_DAT: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.NGUYET_KIEN),
  Y(MaYeuTo.THO_PHU),
  Y(MaYeuTo.NGUYET_PHA),
  T(ThapNhiTruc.BINH),
  T(ThapNhiTruc.THU),
  T(ThapNhiTruc.BE),
  Y(MaYeuTo.KIEP_SAT),
  Y(MaYeuTo.TAI_SAT),
  Y(MaYeuTo.NGUYET_SAT),
  Y(MaYeuTo.NGUYET_HINH),
  Y(MaYeuTo.NGUYET_YEM),
  Y(MaYeuTo.DAI_THOI),
  Y(MaYeuTo.THIEN_LAI),
  Y(MaYeuTo.TU_PHE),
  Y(MaYeuTo.NGU_MO),
  Y(MaYeuTo.THO_PHU_TIN),
  Y(MaYeuTo.DIA_NANG),
  THO_VUONG,
];

export const QUY_TAC_DONG_THO: readonly QuyTacDungSu[] = taoTapQuyTac(
  LoaiCongViec.DONG_THO,
  NEN_DONG_THO,
  KY_CONG_VIEC_DAT,
  855,
  'Khởi tạo động thổ - tu tạo',
  '興造動土〈修造同〉',
);

export const QUY_TAC_SUA_CUNG_THAT: readonly QuyTacDungSu[] = taoTapQuyTac(
  LoaiCongViec.SUA_CUNG_THAT,
  NEN_SUA_CUNG_THAT,
  KY_CONG_VIEC_DAT,
  854,
  'Sửa cung thất',
  '修宮室',
);

function taoTapQuyTac(
  congViec: LoaiCongViec,
  nen: readonly DieuKienDungSu[],
  ky: readonly DieuKienDungSu[],
  trang: number,
  muc: string,
  tenGoc: string,
): readonly QuyTacDungSu[] {
  const nguon = taoNguonQuyen11(trang, muc, tenGoc);
  return [
    ...nen.map((dieuKien, index) => ({
      ma: congViec + '_NEN_' + String(index + 1).padStart(2, '0'),
      congViec,
      dieuKien,
      tacDong: TacDongDungSu.NEN,
      nguon,
    })),
    ...ky.map((dieuKien, index) => ({
      ma: congViec + '_KY_' + String(index + 1).padStart(2, '0'),
      congViec,
      dieuKien,
      tacDong: TacDongDungSu.KY,
      nguon,
    })),
  ];
}

function taoNguonQuyen11(trang: number, muc: string, tenGoc: string): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 11,
      trang,
      muc,
      tenGoc,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 11,
      muc: tenGoc,
      tenGoc,
      daXacMinh: true,
    },
  ];
}
