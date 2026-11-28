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

const NEN_DUC_NGUYEN: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THIEN_DUC),
  Y(MaYeuTo.NGUYET_DUC),
  Y(MaYeuTo.THIEN_NGUYEN),
];

const NEN_DUC_HOP: readonly DieuKienDungSu[] = DUC_HOP.map(Y);

const THANG_TU_MUA = [DiaChi.THIN, DiaChi.TUAT, DiaChi.SUU, DiaChi.MUI] as const;
const THANG_TU_SINH = [DiaChi.DAN, DiaChi.THAN, DiaChi.TI, DiaChi.HOI] as const;
const THANG_TU_TRONG = [DiaChi.TY, DiaChi.NGO, DiaChi.MAO, DiaChi.DAU] as const;

export const QUY_TAC_Q10_KHAI_TRUONG: readonly QuyTacXungDotDataDriven[] = [
  // Nguyệt Phá
  rule(
    'KHAI_TRUONG_Q10_NGUYET_PHA_MAO_DAU_HARD',
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
    'KHAI_TRUONG_Q10_NGUYET_PHA_TY_NGO_HARD',
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
    'KHAI_TRUONG_Q10_NGUYET_PHA_MUI_THAN_HARD',
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
    'KHAI_TRUONG_Q10_NGUYET_PHA_DUC_HOP_VAN_KY',
    Y(MaYeuTo.NGUYET_PHA),
    788,
    'Nguyệt Phá',
    '月破',
    60,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP },
  ),
  rule('KHAI_TRUONG_Q10_NGUYET_PHA_GIU_KY', Y(MaYeuTo.NGUYET_PHA), 788, 'Nguyệt Phá', '月破', 10, {
    loai: 'GIU_KY',
  }),

  // Đại Hao — Q11 keeps its own identity, Q10 groups it under Nguyệt Phá.
  rule('KHAI_TRUONG_Q10_DAI_HAO_THEO_NGUYET_PHA', Y(MaYeuTo.DAI_HAO), 788, 'Đại Hao', '大耗', 90, {
    loai: 'DELEGATE',
    den: Y(MaYeuTo.NGUYET_PHA),
  }),

  // Bình nhật
  rule(
    'KHAI_TRUONG_Q10_BINH_HOI_BO_KY',
    T(ThapNhiTruc.BINH),
    791,
    'Bình nhật',
    '平日',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.HOI] },
  ),
  rule(
    'KHAI_TRUONG_Q10_BINH_THAN_CAT_BO_KY',
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
      'KHAI_TRUONG_Q10_BINH_' + chiThang + '_THEO_NGUYET_HINH',
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
    'KHAI_TRUONG_Q10_BINH_MAO_DAU_CAN_BANG',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),
  rule(
    'KHAI_TRUONG_Q10_BINH_NGO_CAN_BANG',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'KHAI_TRUONG_Q10_BINH_TU_MUA_THEO_NGUYET_SAT',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    70,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_SAT) },
    { chiThang: THANG_TU_MUA },
  ),
  rule('KHAI_TRUONG_Q10_BINH_GIU_KY', T(ThapNhiTruc.BINH), 790, 'Bình nhật', '平日', 10, {
    loai: 'GIU_KY',
  }),

  // Thu nhật
  rule(
    'KHAI_TRUONG_Q10_THU_TU_SINH_THEO_KIEP_SAT',
    T(ThapNhiTruc.THU),
    794,
    'Thu nhật',
    '收日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.KIEP_SAT) },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'KHAI_TRUONG_Q10_THU_MAO_THEO_NGUYET_HINH',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    85,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.MAO] },
  ),
  rule(
    'KHAI_TRUONG_Q10_THU_SUU_TUAT_THEO_NGUYET_HINH',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.SUU, DiaChi.TUAT] },
  ),
  rule(
    'KHAI_TRUONG_Q10_THU_THIN_MUI_DUC_BO_KY',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.THIN, DiaChi.MUI], coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'KHAI_TRUONG_Q10_THU_TY_NGO_CAN_BANG',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'KHAI_TRUONG_Q10_THU_DAU_CAN_BANG',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),
  rule('KHAI_TRUONG_Q10_THU_GIU_KY', T(ThapNhiTruc.THU), 794, 'Thu nhật', '收日', 10, {
    loai: 'GIU_KY',
  }),

  // Bế nhật
  rule(
    'KHAI_TRUONG_Q10_BE_TU_SINH_THEO_NGUYET_SAT',
    T(ThapNhiTruc.BE),
    797,
    'Bế nhật',
    '閉日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_SAT) },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'KHAI_TRUONG_Q10_BE_CAT_CAN_BANG',
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
  rule('KHAI_TRUONG_Q10_BE_GIU_KY', T(ThapNhiTruc.BE), 797, 'Bế nhật', '閉日', 10, {
    loai: 'GIU_KY',
  }),

  // Kiếp Sát
  rule(
    'KHAI_TRUONG_Q10_KIEP_SAT_DAN_THAN_BO_KY',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.DAN, DiaChi.THAN] },
  ),
  rule(
    'KHAI_TRUONG_Q10_KIEP_SAT_TI_HOI_CAT_BO_KY',
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
    'KHAI_TRUONG_Q10_KIEP_SAT_TU_MUA_DUC_BO_KY',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'KHAI_TRUONG_Q10_KIEP_SAT_TU_MUA_CAN_BANG',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_MUA, khongCoBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'KHAI_TRUONG_Q10_KIEP_SAT_TU_TRONG_CAN_BANG',
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
  rule('KHAI_TRUONG_Q10_KIEP_SAT_GIU_KY', Y(MaYeuTo.KIEP_SAT), 798, 'Kiếp Sát', '劫煞', 10, {
    loai: 'GIU_KY',
  }),

  // Tai Sát
  rule(
    'KHAI_TRUONG_Q10_TAI_SAT_TU_TRONG_THEO_NGUYET_PHA',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_PHA) },
    { chiThang: THANG_TU_TRONG },
  ),
  rule(
    'KHAI_TRUONG_Q10_TAI_SAT_TU_SINH_DUC_BO_KY',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_SINH, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'KHAI_TRUONG_Q10_TAI_SAT_TU_SINH_CAN_BANG',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_SINH, khongCoBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'KHAI_TRUONG_Q10_TAI_SAT_TU_MUA_DUC_BO_KY',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP },
  ),
  rule('KHAI_TRUONG_Q10_TAI_SAT_GIU_KY', Y(MaYeuTo.TAI_SAT), 800, 'Tai Sát', '災煞', 10, {
    loai: 'GIU_KY',
  }),

  // Nguyệt Sát
  rule(
    'KHAI_TRUONG_Q10_NGUYET_SAT_MAO_DAU_BO_KY',
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
    'KHAI_TRUONG_Q10_NGUYET_SAT_MAO_DAU_CAN_BANG',
    Y(MaYeuTo.NGUYET_SAT),
    801,
    'Nguyệt Sát',
    '月煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_SAT_TY_NGO_CAN_BANG',
    Y(MaYeuTo.NGUYET_SAT),
    801,
    'Nguyệt Sát',
    '月煞',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_SAT_THANG_CON_LAI_HARD',
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
  rule('KHAI_TRUONG_Q10_NGUYET_SAT_GIU_KY', Y(MaYeuTo.NGUYET_SAT), 801, 'Nguyệt Sát', '月煞', 10, {
    loai: 'GIU_KY',
  }),

  // Nguyệt Hình
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HINH_TI_BO_KY',
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
    'KHAI_TRUONG_Q10_NGUYET_HINH_TI_CAN_BANG',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TI] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HINH_NGO_THEO_NGUYET_YEM',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    95,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_YEM) },
    { chiThang: [DiaChi.NGO] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HINH_HARD_KHONG_DUC',
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
    'KHAI_TRUONG_Q10_NGUYET_HINH_NHOM_CAN_BANG',
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
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HINH_GIU_KY',
    Y(MaYeuTo.NGUYET_HINH),
    802,
    'Nguyệt Hình',
    '月刑',
    10,
    {
      loai: 'GIU_KY',
    },
  ),

  // Nguyệt Hại
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HAI_MAO_DAU_DUC_BO_KY',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    'Nguyệt Hại',
    '月害',
    85,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HAI_SUU_MUI_DUC_BO_KY',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    'Nguyệt Hại',
    '月害',
    85,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.SUU, DiaChi.MUI],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HAI_THIN_TUAT_HOP_CAN_BANG',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    'Nguyệt Hại',
    '月害',
    80,
    { loai: 'CAN_BANG' },
    {
      chiThang: [DiaChi.THIN, DiaChi.TUAT],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HAI_TY_NGO_THEO_NGUYET_SAT',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    'Nguyệt Hại',
    '月害',
    75,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_SAT) },
    { chiThang: [DiaChi.TY, DiaChi.NGO] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HAI_TI_HOI_THEO_KIEP_SAT',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    'Nguyệt Hại',
    '月害',
    75,
    { loai: 'DELEGATE', den: Y(MaYeuTo.KIEP_SAT) },
    { chiThang: [DiaChi.TI, DiaChi.HOI] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HAI_DAN_THEO_NGUYET_HINH',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    'Nguyệt Hại',
    '月害',
    75,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.DAN] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_HAI_THAN_THEO_BINH',
    Y(MaYeuTo.NGUYET_HAI),
    806,
    'Nguyệt Hại',
    '月害',
    75,
    { loai: 'DELEGATE', den: T(ThapNhiTruc.BINH) },
    { chiThang: [DiaChi.THAN] },
  ),
  rule('KHAI_TRUONG_Q10_NGUYET_HAI_GIU_KY', Y(MaYeuTo.NGUYET_HAI), 805, 'Nguyệt Hại', '月害', 10, {
    loai: 'GIU_KY',
  }),

  // Nguyệt Yếm — KHAI_TRUONG-specific month branches.
  rule(
    'KHAI_TRUONG_Q10_NGUYET_YEM_MAO_DAU_HARD',
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
    'KHAI_TRUONG_Q10_NGUYET_YEM_TY_NGO_HARD',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    90,
    { loai: 'CAM_MOI_VIEC' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], khongCoBatKyYeuTo: [MaYeuTo.THIEN_XA] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_YEM_TY_NGO_XA_GIU_KY',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    80,
    { loai: 'GIU_KY' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.THIEN_XA] },
  ),
  rule(
    'KHAI_TRUONG_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_BO_KY',
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
    'KHAI_TRUONG_Q10_NGUYET_YEM_THIN_TUAT_TI_HOI_CAN_BANG',
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
  rule('KHAI_TRUONG_Q10_NGUYET_YEM_GIU_KY', Y(MaYeuTo.NGUYET_YEM), 806, 'Nguyệt Yếm', '月厭', 10, {
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

  // Tuế bạc / Trục trận follow Nguyệt Yếm Kị for KHAI_TRUONG.
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

  // Dương thác theo chỗ Kị của Kiến. Q10 Nguyệt Kiến không Kị khai trương,
  // nên KHAI_TRUONG bỏ contribution Nguyệt Yếm và không tự sinh Kị.
  ...duongThacDays()
    .filter(({ hard }) => !hard)
    .map(({ ma, chiThang, canNgay, chiNgay }) =>
      rule(
        ma,
        Y(MaYeuTo.NGUYET_YEM),
        808,
        'Nguyệt Yếm — Dương thác',
        '月厭',
        140,
        { loai: 'BO_KY' },
        { chiThang: [chiThang], canNgay: [canNgay], chiNgay: [chiNgay] },
        'Dương thác theo chỗ Kị của Kiến; khai trương không nằm trong Kị Kiến.',
      ),
    ),

  // Đại Thời
  rule(
    'KHAI_TRUONG_Q10_DAI_THOI_TU_SINH_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    811,
    'Đại Thời',
    '大時',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'KHAI_TRUONG_Q10_DAI_THOI_THIN_TUAT_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    811,
    'Đại Thời',
    '大時',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.THIN, DiaChi.TUAT] },
  ),
  rule(
    'KHAI_TRUONG_Q10_DAI_THOI_SUU_MUI_DUC_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    80,
    { loai: 'BO_KY' },
    { chiThang: [DiaChi.SUU, DiaChi.MUI], coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'KHAI_TRUONG_Q10_DAI_THOI_MAO_THEO_NGUYET_HINH',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.MAO] },
  ),
  rule(
    'KHAI_TRUONG_Q10_DAI_THOI_TY_NGO_CAN_BANG',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'KHAI_TRUONG_Q10_DAI_THOI_DAU_CAN_BANG',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),
  rule('KHAI_TRUONG_Q10_DAI_THOI_GIU_KY', Y(MaYeuTo.DAI_THOI), 811, 'Đại Thời', '大時', 10, {
    loai: 'GIU_KY',
  }),

  // Thiên Lại
  rule(
    'KHAI_TRUONG_Q10_THIEN_LAI_TU_SINH_DUC_BO_KY',
    Y(MaYeuTo.THIEN_LAI),
    813,
    'Thiên Lại',
    '天吏',
    80,
    { loai: 'BO_KY' },
    { chiThang: THANG_TU_SINH, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'KHAI_TRUONG_Q10_THIEN_LAI_TU_MUA_CAT_CAN_BANG',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
  ),
  rule(
    'KHAI_TRUONG_Q10_THIEN_LAI_NGO_MAO_DAU_THEO_BINH',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    85,
    { loai: 'DELEGATE', den: T(ThapNhiTruc.BINH) },
    { chiThang: [DiaChi.NGO, DiaChi.MAO, DiaChi.DAU] },
  ),
  rule(
    'KHAI_TRUONG_Q10_THIEN_LAI_TY_THEO_NGUYET_HINH',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.TY] },
  ),
  rule('KHAI_TRUONG_Q10_THIEN_LAI_GIU_KY', Y(MaYeuTo.THIEN_LAI), 813, 'Thiên Lại', '天吏', 10, {
    loai: 'GIU_KY',
  }),

  // Tiểu Hao
  rule(
    'KHAI_TRUONG_Q10_TIEU_HAO_CARDINAL_KIEP_SAT_VAN_KY',
    Y(MaYeuTo.TIEU_HAO),
    815,
    'Tiểu Hao',
    '小耗',
    95,
    { loai: 'GIU_KY_DU_CO_CAT' },
    {
      chiThang: THANG_TU_TRONG,
      coTatCaYeuTo: [MaYeuTo.KIEP_SAT],
      coBatKyYeuTo: [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
      ],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_TIEU_HAO_CAT_BO_KY',
    Y(MaYeuTo.TIEU_HAO),
    815,
    'Tiểu Hao',
    '小耗',
    80,
    { loai: 'BO_KY' },
    {
      coBatKyYeuTo: [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_NGUYEN,
      ],
    },
  ),
  rule('KHAI_TRUONG_Q10_TIEU_HAO_GIU_KY', Y(MaYeuTo.TIEU_HAO), 815, 'Tiểu Hao', '小耗', 10, {
    loai: 'GIU_KY',
  }),

  // Tứ Hao
  rule(
    'KHAI_TRUONG_Q10_TU_HAO_THIN_DUC_BO_KY',
    Y(MaYeuTo.TU_HAO),
    816,
    'Tứ Hao',
    '四耗',
    85,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.THIN],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_TU_HAO_DAN_THAN_THIEN_DUC_HOP_BO_KY',
    Y(MaYeuTo.TU_HAO),
    816,
    'Tứ Hao',
    '四耗',
    85,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.DAN, DiaChi.THAN],
      coTatCaYeuTo: [MaYeuTo.THIEN_DUC_HOP],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_TU_HAO_TI_NGUYET_DUC_HOP_BO_KY',
    Y(MaYeuTo.TU_HAO),
    816,
    'Tứ Hao',
    '四耗',
    85,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.TI],
      coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_TU_HAO_TU_MUA_TAM_HOP_BO_KY',
    Y(MaYeuTo.TU_HAO),
    816,
    'Tứ Hao',
    '四耗',
    85,
    { loai: 'BO_KY' },
    {
      chiThang: THANG_TU_MUA,
      coTatCaYeuTo: [MaYeuTo.TAM_HOP],
    },
  ),
  rule('KHAI_TRUONG_Q10_TU_HAO_GIU_KY', Y(MaYeuTo.TU_HAO), 816, 'Tứ Hao', '四耗', 10, {
    loai: 'GIU_KY',
  }),

  // Tứ Phế
  rule(
    'KHAI_TRUONG_Q10_TU_PHE_NGUYET_PHA_HARD',
    Y(MaYeuTo.TU_PHE),
    817,
    'Tứ Phế',
    '四廢',
    100,
    { loai: 'CAM_MOI_VIEC' },
    { coTatCaYeuTo: [MaYeuTo.NGUYET_PHA] },
  ),
  rule(
    'KHAI_TRUONG_Q10_TU_PHE_DUC_HOP_VAN_KY',
    Y(MaYeuTo.TU_PHE),
    817,
    'Tứ Phế',
    '四廢',
    70,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP },
  ),
  rule('KHAI_TRUONG_Q10_TU_PHE_GIU_KY', Y(MaYeuTo.TU_PHE), 817, 'Tứ Phế', '四廢', 10, {
    loai: 'GIU_KY',
  }),

  // Tứ Cùng
  rule(
    'KHAI_TRUONG_Q10_TU_CUNG_DAN_AT_HOI_THIEN_NGUYEN_BO_KY',
    Y(MaYeuTo.TU_CUNG),
    818,
    'Tứ Cùng',
    '四窮',
    90,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.DAN],
      canNgay: [ThienCan.AT],
      chiNgay: [DiaChi.HOI],
      coTatCaYeuTo: [MaYeuTo.THIEN_NGUYEN],
    },
  ),
  rule('KHAI_TRUONG_Q10_TU_CUNG_GIU_KY', Y(MaYeuTo.TU_CUNG), 817, 'Tứ Cùng', '四窮', 10, {
    loai: 'GIU_KY',
  }),

  // Ngũ Mộ
  rule(
    'KHAI_TRUONG_Q10_NGU_MO_NGO_TY_NGUYET_DUC_BO_KY',
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
  rule('KHAI_TRUONG_Q10_NGU_MO_GIU_KY', Y(MaYeuTo.NGU_MO), 819, 'Ngũ Mộ', '五墓', 10, {
    loai: 'GIU_KY',
  }),

  // Cửu Không
  rule(
    'KHAI_TRUONG_Q10_CUU_KHONG_DAN_THAN_MAN_CAT_BO_KY',
    Y(MaYeuTo.CUU_KHONG),
    820,
    'Cửu Không',
    '九空',
    90,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.DAN, DiaChi.THAN],
      truc: [ThapNhiTruc.MAN],
      coBatKyYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_CUU_KHONG_TU_TRONG_KHAI_CAT_BO_KY',
    Y(MaYeuTo.CUU_KHONG),
    820,
    'Cửu Không',
    '九空',
    90,
    { loai: 'BO_KY' },
    {
      chiThang: THANG_TU_TRONG,
      truc: [ThapNhiTruc.KHAI],
      coBatKyYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule(
    'KHAI_TRUONG_Q10_CUU_KHONG_TU_MUA_THEO_NGUYET_PHA',
    Y(MaYeuTo.CUU_KHONG),
    820,
    'Cửu Không',
    '九空',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_PHA) },
    { chiThang: THANG_TU_MUA },
  ),
  rule(
    'KHAI_TRUONG_Q10_CUU_KHONG_TI_HOI_THEO_NGUYET_YEM',
    Y(MaYeuTo.CUU_KHONG),
    820,
    'Cửu Không',
    '九空',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_YEM) },
    { chiThang: [DiaChi.TI, DiaChi.HOI] },
  ),
  rule('KHAI_TRUONG_Q10_CUU_KHONG_GIU_KY', Y(MaYeuTo.CUU_KHONG), 820, 'Cửu Không', '九空', 10, {
    loai: 'GIU_KY',
  }),
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
    ma: 'KHAI_TRUONG_Q10_NGUYET_YEM_' + suffix,
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
    ma: 'KHAI_TRUONG_Q10_NGUYET_YEM_' + suffix,
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
      return muc + ': giữ Kị khai trương theo Quyển 10.';
    case 'GIU_KY_DU_CO_CAT':
      return muc + ': khai trương vẫn Kị dù gặp cát thần được source nêu.';
    case 'BO_KY':
    case 'CHI_CON_QUAN_Y':
      return muc + ': bỏ Kị khai trương theo Quyển 10.';
    case 'CAN_BANG':
      return muc + ': cát/hung cân bằng; không tự sinh Nên.';
    case 'CAM_MOI_VIEC':
      return muc + ': mọi việc đều Kị.';
    case 'DELEGATE':
      return muc + ': kết quả theo rule ' + tenMucTieu(phepXuLy.den) + '.';
    case 'THEM_KY':
      return muc + ': thêm Kị khai trương theo Quyển 10.';
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
