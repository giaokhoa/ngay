import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';

export type NhomNenBiLoaiQ4 = 'DUC_HOP' | 'DUC_NGUYEN';

export interface NgayDacBietNguyetYemQ4 {
  suffix: string;
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  moTa: string;
  hard?: boolean;
  boNen?: NhomNenBiLoaiQ4;
}

/**
 * WYG_010-48b: 歲薄 / 逐陣 “皆從月厭所忌”.
 * Hai ngày được ghi riêng “亦不從德願所宜”.
 */
export const NGAY_TUE_BAC_TRUC_TRAN_Q4: readonly NgayDacBietNguyetYemQ4[] = [
  ngay(
    'TUE_BAC_4_BINH_NGO',
    DiaChi.TI,
    ThienCan.BINH,
    DiaChi.NGO,
    'Tuế Bạc theo chỗ Kị của Nguyệt Yếm; không theo chỗ Nên của Đức, Nguyện.',
    false,
    'DUC_NGUYEN',
  ),
  ngay(
    'TUE_BAC_4_MAU_NGO',
    DiaChi.TI,
    ThienCan.MAU,
    DiaChi.NGO,
    'Tuế Bạc theo chỗ Kị của Nguyệt Yếm.',
  ),
  ngay(
    'TUE_BAC_10_NHAM_TY',
    DiaChi.HOI,
    ThienCan.NHAM,
    DiaChi.TY,
    'Tuế Bạc theo chỗ Kị của Nguyệt Yếm.',
  ),
  ngay(
    'TUE_BAC_10_MAU_TY',
    DiaChi.HOI,
    ThienCan.MAU,
    DiaChi.TY,
    'Tuế Bạc theo chỗ Kị của Nguyệt Yếm.',
  ),
  ngay(
    'TRUC_TRAN_6_BINH_NGO',
    DiaChi.MUI,
    ThienCan.BINH,
    DiaChi.NGO,
    'Trục Trận theo chỗ Kị của Nguyệt Yếm.',
  ),
  ngay(
    'TRUC_TRAN_6_MAU_NGO',
    DiaChi.MUI,
    ThienCan.MAU,
    DiaChi.NGO,
    'Trục Trận theo chỗ Kị của Nguyệt Yếm; không theo chỗ Nên của Đức, Nguyện.',
    false,
    'DUC_NGUYEN',
  ),
  ngay(
    'TRUC_TRAN_12_NHAM_TY',
    DiaChi.SUU,
    ThienCan.NHAM,
    DiaChi.TY,
    'Trục Trận theo chỗ Kị của Nguyệt Yếm.',
  ),
  ngay(
    'TRUC_TRAN_12_MAU_TY',
    DiaChi.SUU,
    ThienCan.MAU,
    DiaChi.TY,
    'Trục Trận theo chỗ Kị của Nguyệt Yếm.',
  ),
];

/**
 * WYG_010-49a: 陽錯, trừ hard overlap thì “餘皆從建所忌”.
 * 六月己未 còn “不從德合所宜”.
 */
export const NGAY_DUONG_THAC_Q4: readonly NgayDacBietNguyetYemQ4[] = [
  ngay('DUONG_THAC_1', DiaChi.DAN, ThienCan.GIAP, DiaChi.DAN, 'Dương Thác theo chỗ Kị của Kiến.'),
  ngay('DUONG_THAC_2', DiaChi.MAO, ThienCan.AT, DiaChi.MAO, 'Dương Thác theo chỗ Kị của Kiến.'),
  ngay('DUONG_THAC_3', DiaChi.THIN, ThienCan.GIAP, DiaChi.THIN, 'Dương Thác theo chỗ Kị của Kiến.'),
  ngay(
    'DUONG_THAC_4_DINH',
    DiaChi.TI,
    ThienCan.DINH,
    DiaChi.TI,
    'Dương Thác theo chỗ Kị của Kiến.',
  ),
  ngay(
    'DUONG_THAC_4_KY',
    DiaChi.TI,
    ThienCan.KY,
    DiaChi.TI,
    'Dương Thác tháng Tỵ ngày Kỷ Tỵ đồng thời Tiểu Hội: mọi việc đều Kị.',
    true,
  ),
  ngay(
    'DUONG_THAC_6_DINH',
    DiaChi.MUI,
    ThienCan.DINH,
    DiaChi.MUI,
    'Dương Thác theo chỗ Kị của Kiến.',
  ),
  ngay(
    'DUONG_THAC_6_KY',
    DiaChi.MUI,
    ThienCan.KY,
    DiaChi.MUI,
    'Dương Thác theo chỗ Kị của Kiến; không theo chỗ Nên của Đức Hợp.',
    false,
    'DUC_HOP',
  ),
  ngay('DUONG_THAC_7', DiaChi.THAN, ThienCan.CANH, DiaChi.THAN, 'Dương Thác theo chỗ Kị của Kiến.'),
  ngay('DUONG_THAC_8', DiaChi.DAU, ThienCan.TAN, DiaChi.DAU, 'Dương Thác theo chỗ Kị của Kiến.'),
  ngay('DUONG_THAC_9', DiaChi.TUAT, ThienCan.CANH, DiaChi.TUAT, 'Dương Thác theo chỗ Kị của Kiến.'),
  ngay('DUONG_THAC_10', DiaChi.HOI, ThienCan.QUY, DiaChi.HOI, 'Dương Thác theo chỗ Kị của Kiến.'),
  ngay('DUONG_THAC_12', DiaChi.SUU, ThienCan.QUY, DiaChi.SUU, 'Dương Thác theo chỗ Kị của Kiến.'),
];

/**
 * WYG_010-49a..49b: 陰錯, trừ các hard overlap thì “餘俱從厭所忌”.
 * 六月己巳 còn “不從德合所宜”.
 */
export const NGAY_AM_THAC_Q4: readonly NgayDacBietNguyetYemQ4[] = [
  ngay('AM_THAC_1', DiaChi.DAN, ThienCan.CANH, DiaChi.TUAT, 'Âm Thác theo chỗ Kị của Nguyệt Yếm.'),
  ngay(
    'AM_THAC_2',
    DiaChi.MAO,
    ThienCan.TAN,
    DiaChi.DAU,
    'Âm Thác tháng Mão ngày Tân Dậu đồng thời Nguyệt Phá: mọi việc đều Kị.',
    true,
  ),
  ngay('AM_THAC_3', DiaChi.THIN, ThienCan.CANH, DiaChi.THAN, 'Âm Thác theo chỗ Kị của Nguyệt Yếm.'),
  ngay(
    'AM_THAC_4_DINH',
    DiaChi.TI,
    ThienCan.DINH,
    DiaChi.MUI,
    'Âm Thác theo chỗ Kị của Nguyệt Yếm.',
  ),
  ngay('AM_THAC_4_KY', DiaChi.TI, ThienCan.KY, DiaChi.MUI, 'Âm Thác theo chỗ Kị của Nguyệt Yếm.'),
  ngay(
    'AM_THAC_6_DINH',
    DiaChi.MUI,
    ThienCan.DINH,
    DiaChi.TI,
    'Âm Thác tháng Mùi ngày Đinh Tỵ đồng thời Đại Hội: mọi việc đều Kị.',
    true,
  ),
  ngay(
    'AM_THAC_6_KY',
    DiaChi.MUI,
    ThienCan.KY,
    DiaChi.TI,
    'Âm Thác tháng Mùi ngày Kỷ Tỵ đồng thời Đại Hội; không theo chỗ Nên của Đức Hợp.',
    true,
    'DUC_HOP',
  ),
  ngay('AM_THAC_7', DiaChi.THAN, ThienCan.GIAP, DiaChi.THIN, 'Âm Thác theo chỗ Kị của Nguyệt Yếm.'),
  ngay(
    'AM_THAC_8',
    DiaChi.DAU,
    ThienCan.AT,
    DiaChi.MAO,
    'Âm Thác tháng Dậu ngày Ất Mão đồng thời Nguyệt Phá: mọi việc đều Kị.',
    true,
  ),
  ngay('AM_THAC_9', DiaChi.TUAT, ThienCan.GIAP, DiaChi.DAN, 'Âm Thác theo chỗ Kị của Nguyệt Yếm.'),
  ngay('AM_THAC_10', DiaChi.HOI, ThienCan.QUY, DiaChi.SUU, 'Âm Thác theo chỗ Kị của Nguyệt Yếm.'),
  ngay(
    'AM_THAC_12',
    DiaChi.SUU,
    ThienCan.QUY,
    DiaChi.HOI,
    'Âm Thác tháng Sửu ngày Quý Hợi đồng thời Đại Hội: mọi việc đều Kị.',
    true,
  ),
];

function ngay(
  suffix: string,
  chiThang: DiaChi,
  canNgay: ThienCan,
  chiNgay: DiaChi,
  moTa: string,
  hard = false,
  boNen?: NhomNenBiLoaiQ4,
): NgayDacBietNguyetYemQ4 {
  return { suffix, chiThang, canNgay, chiNgay, moTa, hard, boNen };
}
