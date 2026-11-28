import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { NGAY_CAM_MOI_VIEC_Q4 } from './q4-hard-days';
import {
  NGAY_AM_THAC_Q4,
  NGAY_DUONG_THAC_Q4,
  NGAY_TUE_BAC_TRUC_TRAN_Q4,
  NhomNenBiLoaiQ4,
} from './q4-yem-special-days';
import { DieuKienQ10, PhepXuLyXungDot, QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;

const DUC_HOP_XA_NGUYEN = [...DUC_HOP, MaYeuTo.THIEN_XA, MaYeuTo.THIEN_NGUYEN] as const;

const CAT_NGUYET_KIEN = [
  ...DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
] as const;

const NEN_DUC_NGUYEN: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THIEN_DUC),
  Y(MaYeuTo.NGUYET_DUC),
  Y(MaYeuTo.THIEN_NGUYEN),
];

const NEN_DUC_HOP: readonly DieuKienDungSu[] = DUC_HOP.map(Y);

const THANG_TU_MUA = [DiaChi.THIN, DiaChi.TUAT, DiaChi.SUU, DiaChi.MUI] as const;
const THANG_TU_SINH = [DiaChi.DAN, DiaChi.THAN, DiaChi.TI, DiaChi.HOI] as const;
const THANG_TU_TRONG = [DiaChi.TY, DiaChi.NGO, DiaChi.MAO, DiaChi.DAU] as const;

export const QUY_TAC_Q10_CONG_VIEC_DAT: readonly QuyTacXungDotDataDriven[] = [
  // Nguyệt Kiến / Thổ Phủ — earthwork vẫn Kị dù gặp nhóm cát được source nêu.
  rule(
    'EARTHWORK_Q10_NGUYET_KIEN_CAT_VAN_KY',
    Y(MaYeuTo.NGUYET_KIEN),
    787,
    'Nguyệt Kiến',
    '月建',
    60,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: CAT_NGUYET_KIEN },
  ),
  rule('EARTHWORK_Q10_NGUYET_KIEN_GIU_KY', Y(MaYeuTo.NGUYET_KIEN), 787, 'Nguyệt Kiến', '月建', 10, {
    loai: 'GIU_KY',
  }),
  rule(
    'EARTHWORK_Q10_THO_PHU_CAT_VAN_KY',
    Y(MaYeuTo.THO_PHU),
    787,
    'Thổ Phủ',
    '土府',
    60,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: CAT_NGUYET_KIEN },
  ),
  rule('EARTHWORK_Q10_THO_PHU_GIU_KY', Y(MaYeuTo.THO_PHU), 787, 'Thổ Phủ', '土府', 10, {
    loai: 'GIU_KY',
  }),

  // Nguyệt Phá
  rule(
    'EARTHWORK_Q10_NGUYET_PHA_MAO_DAU_HARD',
    Y(MaYeuTo.NGUYET_PHA),
    788,
    'Nguyệt Phá',
    '月破',
    110,
    { loai: 'CAM_MOI_VIEC' },
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU],
      coTatCaYeuTo: [MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_PHA_TY_NGO_HARD',
    Y(MaYeuTo.NGUYET_PHA),
    789,
    'Nguyệt Phá',
    '月破',
    100,
    { loai: 'CAM_MOI_VIEC' },
    {
      chiThang: [DiaChi.TY, DiaChi.NGO],
      coTatCaYeuTo: [MaYeuTo.TAI_SAT],
      khongCoBatKyYeuTo: DUC_HOP,
    },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_PHA_MUI_THAN_HARD',
    Y(MaYeuTo.NGUYET_PHA),
    789,
    'Nguyệt Phá',
    '月破',
    100,
    { loai: 'CAM_MOI_VIEC' },
    {
      chiThang: [DiaChi.MUI, DiaChi.THAN],
      coTatCaYeuTo: [MaYeuTo.NGUYET_HINH],
      khongCoBatKyYeuTo: DUC_HOP,
    },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_PHA_DUC_HOP_VAN_KY',
    Y(MaYeuTo.NGUYET_PHA),
    788,
    'Nguyệt Phá',
    '月破',
    60,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP },
  ),
  rule('EARTHWORK_Q10_NGUYET_PHA_GIU_KY', Y(MaYeuTo.NGUYET_PHA), 788, 'Nguyệt Phá', '月破', 10, {
    loai: 'GIU_KY',
  }),

  // Bình nhật
  rule(
    'EARTHWORK_Q10_BINH_HOI_BO_KY',
    T(ThapNhiTruc.BINH),
    791,
    'Bình nhật',
    '平日',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.HOI] },
  ),
  rule(
    'EARTHWORK_Q10_BINH_THAN_CAT_BO_KY',
    T(ThapNhiTruc.BINH),
    791,
    'Bình nhật',
    '平日',
    80,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.THAN],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  ...[DiaChi.DAN, DiaChi.TI, DiaChi.TY].map((chiThang) =>
    rule(
      'EARTHWORK_Q10_BINH_' + chiThang + '_THEO_NGUYET_HINH',
      T(ThapNhiTruc.BINH),
      791,
      'Bình nhật',
      '平日',
      75,
      { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
      { chiThang: [chiThang] },
    ),
  ),
  rule(
    'EARTHWORK_Q10_BINH_MAO_DAU_CAN_BANG',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),
  rule(
    'EARTHWORK_Q10_BINH_NGO_CAN_BANG',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'EARTHWORK_Q10_BINH_TU_MUA_THEO_NGUYET_SAT',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    70,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_SAT) },
    { chiThang: THANG_TU_MUA },
  ),
  rule('EARTHWORK_Q10_BINH_GIU_KY', T(ThapNhiTruc.BINH), 790, 'Bình nhật', '平日', 10, {
    loai: 'GIU_KY',
  }),

  // Thu nhật
  rule(
    'EARTHWORK_Q10_THU_TU_SINH_THEO_KIEP_SAT',
    T(ThapNhiTruc.THU),
    794,
    'Thu nhật',
    '收日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.KIEP_SAT) },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'EARTHWORK_Q10_THU_MAO_THEO_NGUYET_HINH',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    85,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.MAO] },
  ),
  rule(
    'EARTHWORK_Q10_THU_SUU_TUAT_THEO_NGUYET_HINH',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.SUU, DiaChi.TUAT] },
  ),
  rule(
    'EARTHWORK_Q10_THU_THIN_MUI_DUC_BO_KY',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.THIN, DiaChi.MUI], coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'EARTHWORK_Q10_THU_TY_NGO_CAN_BANG',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'EARTHWORK_Q10_THU_DAU_CAN_BANG',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),
  rule('EARTHWORK_Q10_THU_GIU_KY', T(ThapNhiTruc.THU), 794, 'Thu nhật', '收日', 10, {
    loai: 'GIU_KY',
  }),

  // Bế nhật
  rule(
    'EARTHWORK_Q10_BE_TU_SINH_THEO_NGUYET_SAT',
    T(ThapNhiTruc.BE),
    797,
    'Bế nhật',
    '閉日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_SAT) },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'EARTHWORK_Q10_BE_CAT_CAN_BANG',
    T(ThapNhiTruc.BE),
    797,
    'Bế nhật',
    '閉日',
    70,
    { loai: 'CAN_BANG' },
    {
      chiThang: [...THANG_TU_TRONG, ...THANG_TU_MUA],
      coBatKyYeuTo: DUC_HOP_XA_NGUYEN,
    },
  ),
  rule('EARTHWORK_Q10_BE_GIU_KY', T(ThapNhiTruc.BE), 797, 'Bế nhật', '閉日', 10, {
    loai: 'GIU_KY',
  }),

  // Kiếp Sát
  rule(
    'EARTHWORK_Q10_KIEP_SAT_DAN_THAN_BO_KY',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.DAN, DiaChi.THAN] },
  ),
  rule(
    'EARTHWORK_Q10_KIEP_SAT_TI_HOI_CAT_BO_KY',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    80,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.TI, DiaChi.HOI],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule(
    'EARTHWORK_Q10_KIEP_SAT_TU_MUA_DUC_BO_KY',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'EARTHWORK_Q10_KIEP_SAT_TU_MUA_CAN_BANG',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_MUA, khongCoBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'EARTHWORK_Q10_KIEP_SAT_TU_TRONG_CAN_BANG',
    Y(MaYeuTo.KIEP_SAT),
    800,
    'Kiếp Sát',
    '劫煞',
    70,
    { loai: 'CAN_BANG' },
    {
      chiThang: THANG_TU_TRONG,
      coBatKyYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule('EARTHWORK_Q10_KIEP_SAT_GIU_KY', Y(MaYeuTo.KIEP_SAT), 798, 'Kiếp Sát', '劫煞', 10, {
    loai: 'GIU_KY',
  }),

  // Tai Sát
  rule(
    'EARTHWORK_Q10_TAI_SAT_TU_TRONG_THEO_NGUYET_PHA',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_PHA) },
    { chiThang: THANG_TU_TRONG },
  ),
  rule(
    'EARTHWORK_Q10_TAI_SAT_TU_SINH_DUC_BO_KY',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_SINH, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'EARTHWORK_Q10_TAI_SAT_TU_SINH_CAN_BANG',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_SINH, khongCoBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'EARTHWORK_Q10_TAI_SAT_TU_MUA_DUC_BO_KY',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP },
  ),
  rule('EARTHWORK_Q10_TAI_SAT_GIU_KY', Y(MaYeuTo.TAI_SAT), 800, 'Tai Sát', '災煞', 10, {
    loai: 'GIU_KY',
  }),

  // Nguyệt Sát
  rule(
    'EARTHWORK_Q10_NGUYET_SAT_MAO_DAU_BO_KY',
    Y(MaYeuTo.NGUYET_SAT),
    801,
    'Nguyệt Sát',
    '月煞',
    85,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU],
      coTatCaYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_NGUYEN],
    },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_SAT_MAO_DAU_CAN_BANG',
    Y(MaYeuTo.NGUYET_SAT),
    801,
    'Nguyệt Sát',
    '月煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU] },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_SAT_TY_NGO_CAN_BANG',
    Y(MaYeuTo.NGUYET_SAT),
    801,
    'Nguyệt Sát',
    '月煞',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_SAT_THANG_CON_LAI_HARD',
    Y(MaYeuTo.NGUYET_SAT),
    802,
    'Nguyệt Sát',
    '月煞',
    80,
    { loai: 'CAM_MOI_VIEC' },
    {
      chiThang: [...THANG_TU_SINH, ...THANG_TU_MUA],
      khongCoBatKyYeuTo: DUC_HOP,
    },
  ),
  rule('EARTHWORK_Q10_NGUYET_SAT_GIU_KY', Y(MaYeuTo.NGUYET_SAT), 801, 'Nguyệt Sát', '月煞', 10, {
    loai: 'GIU_KY',
  }),

  // Nguyệt Hình
  rule(
    'EARTHWORK_Q10_NGUYET_HINH_TI_BO_KY',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    90,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.TI],
      coTatCaYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.THIEN_NGUYEN],
    },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_HINH_TI_CAN_BANG',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TI] },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_HINH_NGO_THEO_NGUYET_YEM',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    95,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_YEM) },
    { chiThang: [DiaChi.NGO] },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_HINH_HARD_KHONG_DUC',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    85,
    { loai: 'CAM_MOI_VIEC' },
    {
      chiThang: [DiaChi.TY, DiaChi.MAO, DiaChi.MUI, DiaChi.THAN],
      khongCoBatKyYeuTo: DUC_HOP,
    },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_HINH_NHOM_CAN_BANG',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    75,
    { loai: 'CAN_BANG' },
    {
      chiThang: [DiaChi.DAN, DiaChi.THIN, DiaChi.DAU, DiaChi.HOI, DiaChi.SUU, DiaChi.TUAT],
      coBatKyYeuTo: DUC_HOP,
    },
  ),
  rule('EARTHWORK_Q10_NGUYET_HINH_GIU_KY', Y(MaYeuTo.NGUYET_HINH), 802, 'Nguyệt Hình', '月刑', 10, {
    loai: 'GIU_KY',
  }),

  // Nguyệt Yếm — earthwork-specific month branches.
  rule(
    'EARTHWORK_Q10_NGUYET_YEM_MAO_DAU_HARD',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    130,
    { loai: 'CAM_MOI_VIEC' },
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
    },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_YEM_TY_NGO_HARD',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    90,
    { loai: 'CAM_MOI_VIEC' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], khongCoBatKyYeuTo: [MaYeuTo.THIEN_XA] },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_YEM_TY_NGO_XA_GIU_KY',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    80,
    { loai: 'GIU_KY' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.THIEN_XA] },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_BO_KY',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    80,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.DAN, DiaChi.THAN, DiaChi.SUU, DiaChi.MUI],
      coBatKyYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule(
    'EARTHWORK_Q10_NGUYET_YEM_THIN_TUAT_TI_HOI_CAN_BANG',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    75,
    { loai: 'CAN_BANG' },
    {
      chiThang: [DiaChi.THIN, DiaChi.TUAT, DiaChi.TI, DiaChi.HOI],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule('EARTHWORK_Q10_NGUYET_YEM_GIU_KY', Y(MaYeuTo.NGUYET_YEM), 806, 'Nguyệt Yếm', '月厭', 10, {
    loai: 'GIU_KY',
  }),

  // Hard special days apply even if NGUYET_YEM factor is absent.
  ...hardDays().map(({ ma, chiThang, canNgay, chiNgay, moTa }) =>
    globalRule(
      ma,
      807,
      'Nguyệt Yếm — ngày đặc biệt',
      '月厭',
      150,
      { loai: 'CAM_MOI_VIEC' },
      { chiThang: [chiThang], canNgay: [canNgay], chiNgay: [chiNgay] },
      moTa,
    ),
  ),

  // Tuế bạc / Trục trận follow Nguyệt Yếm Kị for earthwork.
  ...tueBacTrucTranDays().map(({ ma, chiThang, canNgay, chiNgay, moTa, boNen }) =>
    globalRule(
      ma,
      808,
      'Nguyệt Yếm — Tuế bạc / Trục trận',
      '月厭',
      140,
      { loai: 'THEM_KY' },
      { chiThang: [chiThang], canNgay: [canNgay], chiNgay: [chiNgay] },
      moTa,
      boNen,
    ),
  ),

  // Âm thác follows Nguyệt Yếm Kị.
  ...amThacDays()
    .filter(({ hard }) => !hard)
    .map(({ ma, chiThang, canNgay, chiNgay, boNen }) =>
      globalRule(
        ma,
        808,
        'Nguyệt Yếm — Âm thác',
        '月厭',
        140,
        { loai: 'THEM_KY' },
        { chiThang: [chiThang], canNgay: [canNgay], chiNgay: [chiNgay] },
        'Âm thác theo chỗ Kị của Nguyệt Yếm.',
        boNen,
      ),
    ),

  // Dương thác follows Kiến Kị. Earthwork is Kị under Kiến, unlike DI_CHUYEN.
  ...duongThacDays()
    .filter(({ hard }) => !hard)
    .map(({ ma, chiThang, canNgay, chiNgay, boNen }) =>
      globalRule(
        ma,
        808,
        'Nguyệt Yếm — Dương thác',
        '月厭',
        140,
        { loai: 'THEM_KY' },
        { chiThang: [chiThang], canNgay: [canNgay], chiNgay: [chiNgay] },
        'Dương thác theo chỗ Kị của Kiến; earthwork vẫn Kị.',
        boNen,
      ),
    ),

  // Đại Thời
  rule(
    'EARTHWORK_Q10_DAI_THOI_TU_SINH_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    811,
    'Đại Thời',
    '大時',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'EARTHWORK_Q10_DAI_THOI_THIN_TUAT_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    811,
    'Đại Thời',
    '大時',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.THIN, DiaChi.TUAT] },
  ),
  rule(
    'EARTHWORK_Q10_DAI_THOI_SUU_MUI_DUC_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.SUU, DiaChi.MUI], coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'EARTHWORK_Q10_DAI_THOI_MAO_THEO_NGUYET_HINH',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.MAO] },
  ),
  rule(
    'EARTHWORK_Q10_DAI_THOI_TY_NGO_CAN_BANG',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'EARTHWORK_Q10_DAI_THOI_DAU_CAN_BANG',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),
  rule('EARTHWORK_Q10_DAI_THOI_GIU_KY', Y(MaYeuTo.DAI_THOI), 811, 'Đại Thời', '大時', 10, {
    loai: 'GIU_KY',
  }),

  // Thiên Lại
  rule(
    'EARTHWORK_Q10_THIEN_LAI_TU_SINH_DUC_BO_KY',
    Y(MaYeuTo.THIEN_LAI),
    813,
    'Thiên Lại',
    '天吏',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_SINH, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'EARTHWORK_Q10_THIEN_LAI_TU_MUA_CAT_CAN_BANG',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
  ),
  rule(
    'EARTHWORK_Q10_THIEN_LAI_NGO_MAO_DAU_THEO_BINH',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    85,
    { loai: 'DELEGATE', den: T(ThapNhiTruc.BINH) },
    { chiThang: [DiaChi.NGO, DiaChi.MAO, DiaChi.DAU] },
  ),
  rule(
    'EARTHWORK_Q10_THIEN_LAI_TY_THEO_NGUYET_HINH',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.TY] },
  ),
  rule('EARTHWORK_Q10_THIEN_LAI_GIU_KY', Y(MaYeuTo.THIEN_LAI), 813, 'Thiên Lại', '天吏', 10, {
    loai: 'GIU_KY',
  }),

  // Tứ Phế
  rule(
    'EARTHWORK_Q10_TU_PHE_NGUYET_PHA_HARD',
    Y(MaYeuTo.TU_PHE),
    817,
    'Tứ Phế',
    '四廢',
    100,
    { loai: 'CAM_MOI_VIEC' },
    { coTatCaYeuTo: [MaYeuTo.NGUYET_PHA] },
  ),
  rule(
    'EARTHWORK_Q10_TU_PHE_DUC_HOP_VAN_KY',
    Y(MaYeuTo.TU_PHE),
    817,
    'Tứ Phế',
    '四廢',
    70,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP },
  ),
  rule('EARTHWORK_Q10_TU_PHE_GIU_KY', Y(MaYeuTo.TU_PHE), 817, 'Tứ Phế', '四廢', 10, {
    loai: 'GIU_KY',
  }),

  // Ngũ Mộ
  rule(
    'EARTHWORK_Q10_NGU_MO_NGO_TY_NGUYET_DUC_BO_KY',
    Y(MaYeuTo.NGU_MO),
    819,
    'Ngũ Mộ',
    '五墓',
    80,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.NGO, DiaChi.TY],
      coTatCaYeuTo: [MaYeuTo.NGUYET_DUC],
    },
  ),
  rule('EARTHWORK_Q10_NGU_MO_GIU_KY', Y(MaYeuTo.NGU_MO), 819, 'Ngũ Mộ', '五墓', 10, {
    loai: 'GIU_KY',
  }),

  // Thổ Phù / Địa Nang
  rule(
    'EARTHWORK_Q10_THO_PHU_TIN_VAN_KY',
    Y(MaYeuTo.THO_PHU_TIN),
    821,
    'Thổ Phù - Địa Nang',
    '土符 地囊',
    80,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
  ),
  rule(
    'EARTHWORK_Q10_DIA_NANG_VAN_KY',
    Y(MaYeuTo.DIA_NANG),
    821,
    'Thổ Phù - Địa Nang',
    '土符 地囊',
    80,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
  ),
  rule(
    'EARTHWORK_Q10_THO_PHU_TIN_GIU_KY',
    Y(MaYeuTo.THO_PHU_TIN),
    821,
    'Thổ Phù - Địa Nang',
    '土符 地囊',
    20,
    { loai: 'GIU_KY' },
  ),
  rule(
    'EARTHWORK_Q10_DIA_NANG_GIU_KY',
    Y(MaYeuTo.DIA_NANG),
    821,
    'Thổ Phù - Địa Nang',
    '土符 地囊',
    20,
    { loai: 'GIU_KY' },
  ),

  // Thổ Vượng dụng sự
  rule(
    'EARTHWORK_Q10_THO_VUONG_GIU_KY',
    { loai: 'THO_VUONG' },
    829,
    'Thổ Vượng dụng sự',
    '土王用事',
    50,
    { loai: 'GIU_KY_DU_CO_CAT' },
  ),
];

interface NgayDacBiet {
  ma: string;
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  moTa: string;
  boNen?: readonly DieuKienDungSu[];
}

interface NgaySai {
  ma: string;
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  hard?: boolean;
  boNen?: readonly DieuKienDungSu[];
}

function tueBacTrucTranDays(): readonly NgayDacBiet[] {
  return NGAY_TUE_BAC_TRUC_TRAN_Q4.map((item) =>
    special(item.suffix, item.chiThang, item.canNgay, item.chiNgay, item.moTa, q4BoNen(item.boNen)),
  );
}

function hardDays(): readonly NgayDacBiet[] {
  return NGAY_CAM_MOI_VIEC_Q4.map((item) =>
    special(item.suffix, item.chiThang, item.canNgay, item.chiNgay, item.moTa),
  );
}

function duongThacDays(): readonly NgaySai[] {
  return NGAY_DUONG_THAC_Q4.map((item) =>
    sai(
      item.suffix,
      item.chiThang,
      item.canNgay,
      item.chiNgay,
      item.hard ?? false,
      q4BoNen(item.boNen),
    ),
  );
}

function amThacDays(): readonly NgaySai[] {
  return NGAY_AM_THAC_Q4.map((item) =>
    sai(
      item.suffix,
      item.chiThang,
      item.canNgay,
      item.chiNgay,
      item.hard ?? false,
      q4BoNen(item.boNen),
    ),
  );
}

function q4BoNen(nhom: NhomNenBiLoaiQ4 | undefined): readonly DieuKienDungSu[] | undefined {
  if (nhom === 'DUC_HOP') return NEN_DUC_HOP;
  if (nhom === 'DUC_NGUYEN') return NEN_DUC_NGUYEN;
  return undefined;
}

function special(
  suffix: string,
  chiThang: DiaChi,
  canNgay: ThienCan,
  chiNgay: DiaChi,
  moTa: string,
  boNen?: readonly DieuKienDungSu[],
): NgayDacBiet {
  return {
    ma: 'EARTHWORK_Q10_NGUYET_YEM_' + suffix,
    chiThang,
    canNgay,
    chiNgay,
    moTa,
    boNen,
  };
}

function sai(
  suffix: string,
  chiThang: DiaChi,
  canNgay: ThienCan,
  chiNgay: DiaChi,
  hard = false,
  boNen?: readonly DieuKienDungSu[],
): NgaySai {
  return {
    ma: 'EARTHWORK_Q10_NGUYET_YEM_' + suffix,
    chiThang,
    canNgay,
    chiNgay,
    hard,
    boNen,
  };
}

function globalRule(
  ma: string,
  trang: number,
  muc: string,
  tenGoc: string,
  precedence: number,
  phepXuLy: PhepXuLyXungDot,
  dieuKien?: DieuKienQ10,
  ghiChu?: string,
  boNen?: readonly DieuKienDungSu[],
): QuyTacXungDotDataDriven {
  return {
    ma,
    dieuKien,
    phepXuLy,
    precedence,
    moTa: ghiChu ?? moTaPhepXuLy(muc, phepXuLy),
    nguon: taoNguon(trang, muc, tenGoc, ghiChu),
    boNen,
  };
}

function rule(
  ma: string,
  mucTieu: DieuKienDungSu,
  trang: number,
  muc: string,
  tenGoc: string,
  precedence: number,
  phepXuLy: PhepXuLyXungDot,
  dieuKien?: DieuKienQ10,
  ghiChu?: string,
  boNen?: readonly DieuKienDungSu[],
): QuyTacXungDotDataDriven {
  return {
    ma,
    mucTieu,
    dieuKien,
    phepXuLy,
    precedence,
    moTa: ghiChu ?? moTaPhepXuLy(muc, phepXuLy),
    nguon: taoNguon(trang, muc, tenGoc, ghiChu),
    boNen,
  };
}

function taoNguon(
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChu?: string,
): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 10,
      trang,
      muc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: tenGoc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
  ];
}

function moTaPhepXuLy(muc: string, phepXuLy: PhepXuLyXungDot): string {
  switch (phepXuLy.loai) {
    case 'GIU_KY':
      return muc + ': giữ Kị earthwork theo Quyển 10.';
    case 'GIU_KY_DU_CO_CAT':
      return muc + ': earthwork vẫn Kị dù gặp cát thần được source nêu.';
    case 'BO_KY':
    case 'CHI_CON_QUAN_Y':
      return muc + ': bỏ Kị earthwork theo Quyển 10.';
    case 'CAN_BANG':
      return muc + ': cát/hung cân bằng; không tự sinh Nên.';
    case 'CAM_MOI_VIEC':
      return muc + ': mọi việc đều Kị.';
    case 'DELEGATE':
      return muc + ': kết quả theo rule ' + tenMucTieu(phepXuLy.den) + '.';
    case 'THEM_KY':
      return muc + ': thêm Kị earthwork theo Quyển 10.';
    case 'BO_NEN':
      return muc + ': bỏ contribution Nên được source chỉ rõ.';
  }
}

function tenMucTieu(mucTieu: DieuKienDungSu): string {
  switch (mucTieu.loai) {
    case 'YEU_TO':
      return mucTieu.ma;
    case 'TRUC':
      return 'TRUC_' + mucTieu.truc;
    case 'CHI_NGAY':
      return 'CHI_NGAY_' + mucTieu.chi;
    case 'THO_VUONG':
      return 'THO_VUONG';
  }
}
