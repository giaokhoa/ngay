import { ThamChieuNguon, LoaiNguon } from '../sources/source-reference';
import { NGAY_CAM_MOI_VIEC_Q4 } from './q4-hard-days';

export interface QuyTacXungDotCuoiHoi {
  ma: string;
  moTa: string;
  trang: number;
}

export const QUY_TAC_XUNG_DOT_CUOI_HOI: readonly QuyTacXungDotCuoiHoi[] = [
  { ma: 'NGUYET_PHA_DUC_VAN_KY', moTa: 'Nguyệt Phá gặp Đức/Hợp vẫn Kị.', trang: 791 },
  {
    ma: 'NGUYET_PHA_MAO_DAU_TAI_SAT_NGUYET_YEM_CAM_MOI_VIEC',
    moTa: 'Nguyệt Phá tháng Mão/Dậu đồng thời Tai Sát + Nguyệt Yếm: dù gặp Đức/Hợp vẫn mọi việc đều Kị.',
    trang: 790,
  },
  { ma: 'TU_PHE_DUC_HOP_VAN_KY', moTa: 'Tứ Phế gặp Đức/Hợp vẫn Kị.', trang: 817 },
  {
    ma: 'TU_PHE_NGUYET_PHA_CAM_MOI_VIEC',
    moTa: 'Tứ Phế đồng thời Nguyệt Phá: mọi việc đều Kị.',
    trang: 817,
  },
  {
    ma: 'TU_CUNG_DAN_AT_HOI_THIEN_NGUYEN_BO_KY',
    moTa: 'Ất Hợi tháng Giêng gặp Thiên Nguyện: bỏ Kị Tứ Cùng cho cưới hỏi.',
    trang: 818,
  },
  {
    ma: 'NGU_MO_NGUYET_DUC_BO_KY',
    moTa: 'Ngũ Mộ tháng Năm/Mười Một gặp Nguyệt Đức thì không Kị.',
    trang: 819,
  },
  { ma: 'BAT_CHUYEN_DUC_HOP_VAN_KY', moTa: 'Bát Chuyên gặp Đức/Hợp vẫn Kị.', trang: 824 },
  {
    ma: 'BAT_CHUYEN_THIEN_NGUYEN_BO_KY',
    moTa: 'Bát Chuyên gặp Thiên Nguyện: cưới hỏi không Kị.',
    trang: 824,
  },
  {
    ma: 'VANG_VONG_DUC_XA_NGUYEN_VAN_KY',
    moTa: 'Vãng Vong gặp Đức/Hợp/Xá/Nguyện vẫn Kị.',
    trang: 822,
  },
  { ma: 'YEM_DOI_THIEN_XA_BO_KY', moTa: 'Yếm Đối gặp Thiên Xá thì bỏ Kị cưới hỏi.', trang: 811 },
  {
    ma: 'NGUYET_HINH_TI_NGUYET_DUC_BO_KY',
    moTa: 'Nguyệt Hình tháng Tỵ gặp Nguyệt Đức thì bỏ Kị.',
    trang: 803,
  },
  {
    ma: 'NGUYET_HINH_TY_KHONG_DUC_CAM_MOI_VIEC',
    moTa: 'Nguyệt Hình tháng Tý không có Đức/Hợp: mọi việc đều Kị.',
    trang: 803,
  },
  {
    ma: 'THIEN_LAI_DAN_THIEN_DUC_BO_KY',
    moTa: 'Thiên Lại tháng Dần gặp Thiên Đức thì bỏ Kị.',
    trang: 813,
  },
  { ma: 'THIEN_LAI_TY_THEO_NGUYET_HINH', moTa: 'Thiên Lại tháng Tý theo Nguyệt Hình.', trang: 814 },
  { ma: 'THIEN_LAI_NGO_THEO_BINH', moTa: 'Thiên Lại tháng Ngọ theo Bình nhật.', trang: 814 },
  { ma: 'THU_DAN_THEO_KIEP_SAT', moTa: 'Thu nhật tháng Dần theo Kiếp Sát.', trang: 795 },
  { ma: 'THU_MAO_THEO_NGUYET_HINH', moTa: 'Thu nhật tháng Mão theo Nguyệt Hình.', trang: 795 },
  {
    ma: 'DAI_THOI_DAN_BO_KY',
    moTa: 'Đại Thời tháng Dần: cưới hỏi không Kị; không tự sinh Nên.',
    trang: 812,
  },
  ...NGAY_CAM_MOI_VIEC_Q4.map((item) => ({
    ma: 'Q4_HARD_' + item.suffix,
    moTa: item.moTa,
    trang: 807,
  })),
] as const;

export function taoNguonXungDotQuyen10(trang: number): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 10,
      trang,
      muc: 'Nghi kị / cát hung theo thần sát',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: '用事宜忌',
      daXacMinh: true,
    },
  ];
}
