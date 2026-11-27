import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
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

const THANG_TU_MUA = [DiaChi.THIN, DiaChi.TUAT, DiaChi.SUU, DiaChi.MUI] as const;

const THANG_TU_SINH = [DiaChi.DAN, DiaChi.THAN, DiaChi.TI, DiaChi.HOI] as const;

const THANG_TU_TRONG = [DiaChi.TY, DiaChi.NGO, DiaChi.MAO, DiaChi.DAU] as const;

export const QUY_TAC_Q10_DI_CHUYEN: readonly QuyTacXungDotDataDriven[] = [
  // Nguyệt Phá
  rule(
    'DI_CHUYEN_Q10_NGUYET_PHA_MAO_DAU_HARD',
    Y(MaYeuTo.NGUYET_PHA),
    788,
    'Nguyệt Phá',
    '月破',
    110,
    { loai: 'CAM_MOI_VIEC' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM] },
    'Mão/Dậu đồng thời Tai Sát + Nguyệt Yếm: dù gặp Đức/Hợp vẫn mọi việc đều Kị.',
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_PHA_TY_NGO_HARD',
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
    'DI_CHUYEN_Q10_NGUYET_PHA_MUI_THAN_HARD',
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
    'DI_CHUYEN_Q10_NGUYET_PHA_DUC_HOP_VAN_KY',
    Y(MaYeuTo.NGUYET_PHA),
    788,
    'Nguyệt Phá',
    '月破',
    60,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP },
  ),

  // Bình nhật
  rule(
    'DI_CHUYEN_Q10_BINH_HOI_BO_KY',
    T(ThapNhiTruc.BINH),
    791,
    'Bình nhật',
    '平日',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: [DiaChi.HOI] },
  ),
  rule(
    'DI_CHUYEN_Q10_BINH_THAN_CAT_BO_KY',
    T(ThapNhiTruc.BINH),
    791,
    'Bình nhật',
    '平日',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    {
      chiThang: [DiaChi.THAN],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC_HOP],
    },
    'Bản Việt in “Thiên Đức, Thiên Đức Hợp”; Hán bản là 天德、月德合 nên factor identity dùng Thiên Đức + Nguyệt Đức Hợp.',
  ),
  ...[DiaChi.DAN, DiaChi.TI, DiaChi.TY].map((chiThang) =>
    rule(
      'DI_CHUYEN_Q10_BINH_' + chiThang + '_THEO_NGUYET_HINH',
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
    'DI_CHUYEN_Q10_BINH_MAO_DAU_CAN_BANG',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),
  rule(
    'DI_CHUYEN_Q10_BINH_NGO_CAN_BANG',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'DI_CHUYEN_Q10_BINH_TU_MUA_THEO_NGUYET_SAT',
    T(ThapNhiTruc.BINH),
    792,
    'Bình nhật',
    '平日',
    70,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_SAT) },
    { chiThang: THANG_TU_MUA },
  ),

  // Thu nhật
  rule(
    'DI_CHUYEN_Q10_THU_TU_SINH_THEO_KIEP_SAT',
    T(ThapNhiTruc.THU),
    794,
    'Thu nhật',
    '收日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.KIEP_SAT) },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'DI_CHUYEN_Q10_THU_MAO_THEO_NGUYET_HINH',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    85,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.MAO] },
  ),
  rule(
    'DI_CHUYEN_Q10_THU_SUU_TUAT_THEO_NGUYET_HINH',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.SUU, DiaChi.TUAT] },
  ),
  rule(
    'DI_CHUYEN_Q10_THU_THIN_MUI_DUC_BO_KY',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: [DiaChi.THIN, DiaChi.MUI], coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'DI_CHUYEN_Q10_THU_TY_NGO_CAN_BANG',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'DI_CHUYEN_Q10_THU_DAU_CAN_BANG',
    T(ThapNhiTruc.THU),
    795,
    'Thu nhật',
    '收日',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),

  // Bế nhật
  rule(
    'DI_CHUYEN_Q10_BE_TU_SINH_THEO_NGUYET_SAT',
    T(ThapNhiTruc.BE),
    797,
    'Bế nhật',
    '閉日',
    80,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_SAT) },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'DI_CHUYEN_Q10_BE_CAT_CAN_BANG',
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

  // Kiếp Sát
  rule(
    'DI_CHUYEN_Q10_KIEP_SAT_DAN_THAN_BO_KY',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: [DiaChi.DAN, DiaChi.THAN] },
  ),
  rule(
    'DI_CHUYEN_Q10_KIEP_SAT_TI_HOI_CAT_BO_KY',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    {
      chiThang: [DiaChi.TI, DiaChi.HOI],
      coBatKyYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP],
    },
  ),
  rule(
    'DI_CHUYEN_Q10_KIEP_SAT_TU_MUA_DUC_BO_KY',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'DI_CHUYEN_Q10_KIEP_SAT_TU_MUA_CAN_BANG',
    Y(MaYeuTo.KIEP_SAT),
    799,
    'Kiếp Sát',
    '劫煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_MUA, khongCoBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'DI_CHUYEN_Q10_KIEP_SAT_TU_TRONG_CAN_BANG',
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

  // Tai Sát
  rule(
    'DI_CHUYEN_Q10_TAI_SAT_TU_TRONG_THEO_NGUYET_PHA',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_PHA) },
    { chiThang: THANG_TU_TRONG },
  ),
  rule(
    'DI_CHUYEN_Q10_TAI_SAT_TU_SINH_DUC_BO_KY',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: THANG_TU_SINH, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'DI_CHUYEN_Q10_TAI_SAT_TU_SINH_CAN_BANG',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_SINH, khongCoBatKyYeuTo: DUC_HOP },
    'Tai Sát ở tháng tứ sinh không có Đức/Hợp: cát/hung cân bằng với Khai nhật.',
    undefined,
    [T(ThapNhiTruc.KHAI)],
  ),
  rule(
    'DI_CHUYEN_Q10_TAI_SAT_TU_MUA_DUC_BO_KY',
    Y(MaYeuTo.TAI_SAT),
    800,
    'Tai Sát',
    '災煞',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP },
  ),

  // Nguyệt Sát
  rule(
    'DI_CHUYEN_Q10_NGUYET_SAT_MAO_DAU_BO_KY',
    Y(MaYeuTo.NGUYET_SAT),
    801,
    'Nguyệt Sát',
    '月煞',
    85,
    { loai: 'CHI_CON_QUAN_Y' },
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU],
      coTatCaYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_NGUYEN],
    },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_SAT_MAO_DAU_CAN_BANG',
    Y(MaYeuTo.NGUYET_SAT),
    801,
    'Nguyệt Sát',
    '月煞',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU] },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_SAT_TY_NGO_CAN_BANG',
    Y(MaYeuTo.NGUYET_SAT),
    801,
    'Nguyệt Sát',
    '月煞',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_SAT_THANG_CON_LAI_HARD',
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

  // Nguyệt Hình
  rule(
    'DI_CHUYEN_Q10_NGUYET_HINH_TI_BO_KY',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    90,
    { loai: 'CHI_CON_QUAN_Y' },
    {
      chiThang: [DiaChi.TI],
      coTatCaYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.THIEN_NGUYEN],
    },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_HINH_TI_CAN_BANG',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    70,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TI] },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_HINH_NGO_THEO_NGUYET_YEM',
    Y(MaYeuTo.NGUYET_HINH),
    803,
    'Nguyệt Hình',
    '月刑',
    95,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_YEM) },
    { chiThang: [DiaChi.NGO] },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_HINH_HARD_KHONG_DUC',
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
    'DI_CHUYEN_Q10_NGUYET_HINH_NHOM_CAN_BANG',
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

  // Nguyệt Yếm — hard month branches
  rule(
    'DI_CHUYEN_Q10_NGUYET_YEM_MAO_DAU_HARD',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    130,
    { loai: 'CAM_MOI_VIEC' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU] },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_YEM_TY_NGO_HARD',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    90,
    { loai: 'CAM_MOI_VIEC' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], khongCoBatKyYeuTo: [MaYeuTo.THIEN_XA] },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_VAN_KY',
    Y(MaYeuTo.NGUYET_YEM),
    807,
    'Nguyệt Yếm',
    '月厭',
    75,
    { loai: 'GIU_KY_DU_CO_CAT' },
    {
      chiThang: [DiaChi.DAN, DiaChi.THAN, DiaChi.SUU, DiaChi.MUI],
      coBatKyYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC_HOP],
    },
  ),
  rule(
    'DI_CHUYEN_Q10_NGUYET_YEM_THIN_TUAT_TI_HOI_CAN_BANG',
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

  // Nguyệt Yếm — Q10 standalone special-day rules.
  // Các rule này không phụ thuộc việc factor NGUYET_YEM có match hay không.
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

  // Tuế bạc / Trục trận theo chỗ Kị của Nguyệt Yếm -> Q10-only Kị DI_CHUYEN.
  ...tueBacTrucTranDays().map(({ ma, chiThang, canNgay, chiNgay, moTa }) =>
    globalRule(
      ma,
      808,
      'Nguyệt Yếm — Tuế bạc / Trục trận',
      '月厭',
      140,
      { loai: 'THEM_KY' },
      { chiThang: [chiThang], canNgay: [canNgay], chiNgay: [chiNgay] },
      moTa,
    ),
  ),

  // Âm thác: ngoài hard-ban thì theo chỗ Kị của Nguyệt Yếm, dù factor
  // NGUYET_YEM có xuất hiện trong ngày hay không.
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
        undefined,
        boNen,
      ),
    ),

  // Dương thác: theo chỗ Kị của Kiến. DI_CHUYEN không nằm trong Kị Kiến,
  // nên nếu ngày đó đồng thời có contribution NGUYET_YEM thì contribution ấy
  // phải bị bỏ; các ngày không có NGUYET_YEM không tự sinh Kị.
  ...duongThacDays()
    .filter(({ hard }) => !hard)
    .map(({ ma, chiThang, canNgay, chiNgay, boNen }) =>
      rule(
        ma,
        Y(MaYeuTo.NGUYET_YEM),
        808,
        'Nguyệt Yếm — Dương thác',
        '月厭',
        140,
        { loai: 'BO_KY' },
        { chiThang: [chiThang], canNgay: [canNgay], chiNgay: [chiNgay] },
        'Dương thác theo chỗ Kị của Kiến; DI_CHUYEN không nằm trong Kị Kiến.',
        undefined,
        boNen,
      ),
    ),

  // Một số Dương thác còn bị source loại chỗ Nên của Đức Hợp. Rule này phải
  // chạy cả khi ngày đó không có contribution NGUYET_YEM.
  ...duongThacDays()
    .filter(({ hard, boNen }) => !hard && Boolean(boNen?.length))
    .map(({ ma, chiThang, canNgay, chiNgay, boNen }) =>
      globalRule(
        ma + '_BO_NEN',
        808,
        'Nguyệt Yếm — Dương thác',
        '月厭',
        145,
        { loai: 'BO_NEN' },
        { chiThang: [chiThang], canNgay: [canNgay], chiNgay: [chiNgay] },
        'Dương thác: không theo chỗ Nên của Đức Hợp ở nhánh đặc biệt này.',
        undefined,
        boNen,
      ),
    ),

  // Đại Thời
  rule(
    'DI_CHUYEN_Q10_DAI_THOI_TU_SINH_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    811,
    'Đại Thời',
    '大時',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: THANG_TU_SINH },
  ),
  rule(
    'DI_CHUYEN_Q10_DAI_THOI_THIN_TUAT_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    811,
    'Đại Thời',
    '大時',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: [DiaChi.THIN, DiaChi.TUAT] },
  ),
  rule(
    'DI_CHUYEN_Q10_DAI_THOI_SUU_MUI_DUC_BO_KY',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: [DiaChi.SUU, DiaChi.MUI], coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'DI_CHUYEN_Q10_DAI_THOI_MAO_THEO_NGUYET_HINH',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.MAO] },
  ),
  rule(
    'DI_CHUYEN_Q10_DAI_THOI_TY_NGO_CAN_BANG',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  rule(
    'DI_CHUYEN_Q10_DAI_THOI_DAU_CAN_BANG',
    Y(MaYeuTo.DAI_THOI),
    812,
    'Đại Thời',
    '大時',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: [DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),

  // Thiên Lại
  rule(
    'DI_CHUYEN_Q10_THIEN_LAI_TU_SINH_DUC_BO_KY',
    Y(MaYeuTo.THIEN_LAI),
    813,
    'Thiên Lại',
    '天吏',
    80,
    { loai: 'CHI_CON_QUAN_Y' },
    { chiThang: THANG_TU_SINH, coBatKyYeuTo: DUC_HOP },
  ),
  rule(
    'DI_CHUYEN_Q10_THIEN_LAI_TU_MUA_CAT_CAN_BANG',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    75,
    { loai: 'CAN_BANG' },
    { chiThang: THANG_TU_MUA, coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
  ),
  rule(
    'DI_CHUYEN_Q10_THIEN_LAI_NGO_MAO_DAU_THEO_BINH',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    85,
    { loai: 'DELEGATE', den: T(ThapNhiTruc.BINH) },
    { chiThang: [DiaChi.NGO, DiaChi.MAO, DiaChi.DAU] },
  ),
  rule(
    'DI_CHUYEN_Q10_THIEN_LAI_TY_THEO_NGUYET_HINH',
    Y(MaYeuTo.THIEN_LAI),
    814,
    'Thiên Lại',
    '天吏',
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.TY] },
  ),

  // Tứ Phế
  rule(
    'DI_CHUYEN_Q10_TU_PHE_NGUYET_PHA_HARD',
    Y(MaYeuTo.TU_PHE),
    817,
    'Tứ Phế',
    '四廢',
    100,
    { loai: 'CAM_MOI_VIEC' },
    { coTatCaYeuTo: [MaYeuTo.NGUYET_PHA] },
  ),
  rule(
    'DI_CHUYEN_Q10_TU_PHE_DUC_HOP_VAN_KY',
    Y(MaYeuTo.TU_PHE),
    817,
    'Tứ Phế',
    '四廢',
    70,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP },
  ),

  // Ngũ Mộ
  rule(
    'DI_CHUYEN_Q10_NGU_MO_NGO_TY_NGUYET_DUC_BO_KY',
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

  // Quy Kị
  rule(
    'DI_CHUYEN_Q10_QUY_KY_VAN_KY',
    Y(MaYeuTo.QUY_KY),
    822,
    'Quy Kị',
    '歸忌',
    70,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
    'Bản Việt ghi “Đức, Nguyện, Xá”; Hán ghi 與德合赦願併猶忌. Không giả vờ bản Việt có chữ Hợp.',
  ),

  // Vãng Vong
  rule(
    'DI_CHUYEN_Q10_VANG_VONG_VAN_KY',
    Y(MaYeuTo.VANG_VONG),
    822,
    'Vãng Vong',
    '往亡',
    70,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
  ),
];

interface NgayDacBiet {
  ma: string;
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  moTa: string;
}

function tueBacTrucTranDays(): readonly NgayDacBiet[] {
  return [
    hard(
      'TUE_BAC_4_BINH_NGO',
      DiaChi.TI,
      ThienCan.BINH,
      DiaChi.NGO,
      'Tuế bạc theo chỗ Kị của Nguyệt Yếm.',
    ),
    hard(
      'TUE_BAC_4_MAU_NGO',
      DiaChi.TI,
      ThienCan.MAU,
      DiaChi.NGO,
      'Tuế bạc theo chỗ Kị của Nguyệt Yếm.',
    ),
    hard(
      'TUE_BAC_10_NHAM_TY',
      DiaChi.HOI,
      ThienCan.NHAM,
      DiaChi.TY,
      'Tuế bạc theo chỗ Kị của Nguyệt Yếm.',
    ),
    hard(
      'TUE_BAC_10_MAU_TY',
      DiaChi.HOI,
      ThienCan.MAU,
      DiaChi.TY,
      'Tuế bạc theo chỗ Kị của Nguyệt Yếm.',
    ),
    hard(
      'TRUC_TRAN_6_BINH_NGO',
      DiaChi.MUI,
      ThienCan.BINH,
      DiaChi.NGO,
      'Trục trận theo chỗ Kị của Nguyệt Yếm.',
    ),
    hard(
      'TRUC_TRAN_6_MAU_NGO',
      DiaChi.MUI,
      ThienCan.MAU,
      DiaChi.NGO,
      'Trục trận theo chỗ Kị của Nguyệt Yếm.',
    ),
    hard(
      'TRUC_TRAN_12_NHAM_TY',
      DiaChi.SUU,
      ThienCan.NHAM,
      DiaChi.TY,
      'Trục trận theo chỗ Kị của Nguyệt Yếm.',
    ),
    hard(
      'TRUC_TRAN_12_MAU_TY',
      DiaChi.SUU,
      ThienCan.MAU,
      DiaChi.TY,
      'Trục trận theo chỗ Kị của Nguyệt Yếm.',
    ),
  ];
}

function hardDays(): readonly NgayDacBiet[] {
  return [
    hard('DAI_HOI_1', DiaChi.DAN, ThienCan.GIAP, DiaChi.TUAT, 'Đại hội: mọi việc đều Kị.'),
    hard('DAI_HOI_2', DiaChi.MAO, ThienCan.AT, DiaChi.DAU, 'Đại hội: mọi việc đều Kị.'),
    hard('DAI_HOI_5', DiaChi.NGO, ThienCan.BINH, DiaChi.NGO, 'Đại hội: mọi việc đều Kị.'),
    hard('DAI_HOI_6', DiaChi.MUI, ThienCan.DINH, DiaChi.TI, 'Đại hội: mọi việc đều Kị.'),
    hard('DAI_HOI_7', DiaChi.THAN, ThienCan.CANH, DiaChi.THIN, 'Đại hội: mọi việc đều Kị.'),
    hard('DAI_HOI_8', DiaChi.DAU, ThienCan.TAN, DiaChi.MAO, 'Đại hội: mọi việc đều Kị.'),
    hard('DAI_HOI_11', DiaChi.TY, ThienCan.NHAM, DiaChi.TY, 'Đại hội: mọi việc đều Kị.'),
    hard('DAI_HOI_12', DiaChi.SUU, ThienCan.QUY, DiaChi.HOI, 'Đại hội: mọi việc đều Kị.'),

    hard('TIEU_HOI_2', DiaChi.MAO, ThienCan.KY, DiaChi.MAO, 'Tiểu hội: mọi việc đều Kị.'),
    hard('TIEU_HOI_3', DiaChi.THIN, ThienCan.MAU, DiaChi.THIN, 'Tiểu hội: mọi việc đều Kị.'),
    hard('TIEU_HOI_4', DiaChi.TI, ThienCan.KY, DiaChi.TI, 'Tiểu hội: mọi việc đều Kị.'),
    hard('TIEU_HOI_5', DiaChi.NGO, ThienCan.MAU, DiaChi.NGO, 'Tiểu hội: mọi việc đều Kị.'),
    hard('TIEU_HOI_8', DiaChi.DAU, ThienCan.KY, DiaChi.DAU, 'Tiểu hội: mọi việc đều Kị.'),
    hard('TIEU_HOI_9', DiaChi.TUAT, ThienCan.MAU, DiaChi.TUAT, 'Tiểu hội: mọi việc đều Kị.'),
    hard('TIEU_HOI_10', DiaChi.HOI, ThienCan.KY, DiaChi.HOI, 'Tiểu hội: mọi việc đều Kị.'),
    hard('TIEU_HOI_11', DiaChi.TY, ThienCan.MAU, DiaChi.TY, 'Tiểu hội: mọi việc đều Kị.'),

    hard('TAM_AM_1', DiaChi.DAN, ThienCan.TAN, DiaChi.DAU, 'Tam âm: mọi việc đều Kị.'),
    hard('TAM_AM_7', DiaChi.THAN, ThienCan.AT, DiaChi.MAO, 'Tam âm: mọi việc đều Kị.'),
    hard('AM_VI_3', DiaChi.THIN, ThienCan.CANH, DiaChi.THIN, 'Âm vị: mọi việc đều Kị.'),
    hard('AM_VI_9', DiaChi.TUAT, ThienCan.GIAP, DiaChi.TUAT, 'Âm vị: mọi việc đều Kị.'),
    hard(
      'AM_DUONG_GIAO_PHA_4',
      DiaChi.TI,
      ThienCan.QUY,
      DiaChi.HOI,
      'Âm dương giao phá: mọi việc đều Kị.',
    ),
    hard(
      'AM_DUONG_GIAO_PHA_10',
      DiaChi.HOI,
      ThienCan.DINH,
      DiaChi.TI,
      'Âm dương giao phá: mọi việc đều Kị.',
    ),
    hard(
      'AM_DUONG_KICH_XUNG_5',
      DiaChi.NGO,
      ThienCan.NHAM,
      DiaChi.TY,
      'Âm dương kích xung: mọi việc đều Kị.',
    ),
    hard(
      'AM_DUONG_KICH_XUNG_11',
      DiaChi.TY,
      ThienCan.BINH,
      DiaChi.NGO,
      'Âm dương kích xung: mọi việc đều Kị.',
    ),
    hard(
      'DUONG_PHA_AM_XUNG_6',
      DiaChi.MUI,
      ThienCan.QUY,
      DiaChi.SUU,
      'Dương phá âm xung: mọi việc đều Kị.',
    ),
    hard(
      'DUONG_PHA_AM_XUNG_12',
      DiaChi.SUU,
      ThienCan.DINH,
      DiaChi.MUI,
      'Dương phá âm xung: mọi việc đều Kị.',
    ),
    hard(
      'DAO_AM_XUNG_DUONG_2',
      DiaChi.MAO,
      ThienCan.KY,
      DiaChi.DAU,
      'Đạo âm xung dương: mọi việc đều Kị.',
    ),
    hard(
      'DAO_AM_XUNG_DUONG_8',
      DiaChi.DAU,
      ThienCan.KY,
      DiaChi.MAO,
      'Đạo âm xung dương: mọi việc đều Kị.',
    ),

    // Âm thác exceptions that Q10 explicitly says are Nguyệt Phá/Đại hội hard-ban.
    hard(
      'AM_THAC_2_TAN_DAU',
      DiaChi.MAO,
      ThienCan.TAN,
      DiaChi.DAU,
      'Âm thác tháng Hai đồng thời Nguyệt Phá: mọi việc đều Kị.',
    ),
    hard(
      'AM_THAC_8_AT_MAO',
      DiaChi.DAU,
      ThienCan.AT,
      DiaChi.MAO,
      'Âm thác tháng Tám đồng thời Nguyệt Phá: mọi việc đều Kị.',
    ),
    hard(
      'AM_THAC_6_DINH_TI',
      DiaChi.MUI,
      ThienCan.DINH,
      DiaChi.TI,
      'Âm thác tháng Sáu đồng thời Đại hội: mọi việc đều Kị.',
    ),
    hard(
      'AM_THAC_6_KY_TI',
      DiaChi.MUI,
      ThienCan.KY,
      DiaChi.TI,
      'Âm thác tháng Sáu đồng thời Đại hội: mọi việc đều Kị.',
    ),
  ];
}

function hard(
  suffix: string,
  chiThang: DiaChi,
  canNgay: ThienCan,
  chiNgay: DiaChi,
  moTa: string,
): NgayDacBiet {
  return {
    ma: 'DI_CHUYEN_Q10_NGUYET_YEM_' + suffix,
    chiThang,
    canNgay,
    chiNgay,
    moTa,
  };
}

interface NgaySai {
  ma: string;
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  hard?: boolean;
  boNen?: readonly DieuKienDungSu[];
}

function duongThacDays(): readonly NgaySai[] {
  return [
    sai('DUONG_THAC_1', DiaChi.DAN, ThienCan.GIAP, DiaChi.DAN),
    sai('DUONG_THAC_2', DiaChi.MAO, ThienCan.AT, DiaChi.MAO),
    sai('DUONG_THAC_3', DiaChi.THIN, ThienCan.GIAP, DiaChi.THIN),
    sai('DUONG_THAC_4_DINH', DiaChi.TI, ThienCan.DINH, DiaChi.TI),
    sai('DUONG_THAC_4_KY', DiaChi.TI, ThienCan.KY, DiaChi.TI, true),
    sai('DUONG_THAC_6_DINH', DiaChi.MUI, ThienCan.DINH, DiaChi.MUI),
    sai('DUONG_THAC_6_KY', DiaChi.MUI, ThienCan.KY, DiaChi.MUI, false, [
      Y(MaYeuTo.THIEN_DUC_HOP),
      Y(MaYeuTo.NGUYET_DUC_HOP),
    ]),
    sai('DUONG_THAC_7', DiaChi.THAN, ThienCan.CANH, DiaChi.THAN),
    sai('DUONG_THAC_8', DiaChi.DAU, ThienCan.TAN, DiaChi.DAU),
    sai('DUONG_THAC_9', DiaChi.TUAT, ThienCan.CANH, DiaChi.TUAT),
    sai('DUONG_THAC_10', DiaChi.HOI, ThienCan.QUY, DiaChi.HOI),
    sai('DUONG_THAC_12', DiaChi.SUU, ThienCan.QUY, DiaChi.SUU),
  ];
}

function amThacDays(): readonly NgaySai[] {
  return [
    sai('AM_THAC_1', DiaChi.DAN, ThienCan.CANH, DiaChi.TUAT),
    sai('AM_THAC_2', DiaChi.MAO, ThienCan.TAN, DiaChi.DAU, true),
    sai('AM_THAC_3', DiaChi.THIN, ThienCan.CANH, DiaChi.THAN),
    sai('AM_THAC_4_DINH', DiaChi.TI, ThienCan.DINH, DiaChi.MUI),
    sai('AM_THAC_4_KY', DiaChi.TI, ThienCan.KY, DiaChi.MUI),
    sai('AM_THAC_6_DINH', DiaChi.MUI, ThienCan.DINH, DiaChi.TI, true),
    sai('AM_THAC_6_KY', DiaChi.MUI, ThienCan.KY, DiaChi.TI, true, [
      Y(MaYeuTo.THIEN_DUC_HOP),
      Y(MaYeuTo.NGUYET_DUC_HOP),
    ]),
    sai('AM_THAC_7', DiaChi.THAN, ThienCan.GIAP, DiaChi.THIN),
    sai('AM_THAC_8', DiaChi.DAU, ThienCan.AT, DiaChi.MAO, true),
    sai('AM_THAC_9', DiaChi.TUAT, ThienCan.GIAP, DiaChi.DAN),
    sai('AM_THAC_10', DiaChi.HOI, ThienCan.QUY, DiaChi.SUU),
    sai('AM_THAC_12', DiaChi.SUU, ThienCan.QUY, DiaChi.HOI, true),
  ];
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
    ma: 'DI_CHUYEN_Q10_NGUYET_YEM_' + suffix,
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
  hanGhiChu?: string,
  boNen?: readonly DieuKienDungSu[],
): QuyTacXungDotDataDriven {
  return {
    ma,
    dieuKien,
    phepXuLy,
    precedence,
    moTa: ghiChu ?? moTaPhepXuLy(muc, phepXuLy),
    nguon: taoNguon(trang, muc, tenGoc, ghiChu, hanGhiChu),
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
  hanGhiChu?: string,
  boNen?: readonly DieuKienDungSu[],
): QuyTacXungDotDataDriven {
  return {
    ma,
    mucTieu,
    dieuKien,
    phepXuLy,
    precedence,
    moTa: ghiChu ?? moTaPhepXuLy(muc, phepXuLy),
    nguon: taoNguon(trang, muc, tenGoc, ghiChu, hanGhiChu),
    boNen,
  };
}

function taoNguon(
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChu?: string,
  hanGhiChu?: string,
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
      ghiChu: hanGhiChu ?? ghiChu,
      daXacMinh: true,
    },
  ];
}

function moTaPhepXuLy(muc: string, phepXuLy: PhepXuLyXungDot): string {
  switch (phepXuLy.loai) {
    case 'GIU_KY':
      return muc + ': giữ Kị theo Quyển 10.';
    case 'GIU_KY_DU_CO_CAT':
      return muc + ': vẫn Kị dù đồng thời có cát thần được nêu.';
    case 'BO_KY':
      return muc + ': bỏ Kị DI_CHUYEN theo Quyển 10.';
    case 'CAN_BANG':
      return muc + ': cát/hung cân bằng; không tự sinh Nên.';
    case 'CAM_MOI_VIEC':
      return muc + ': mọi việc đều Kị.';
    case 'CHI_CON_QUAN_Y':
      return muc + ': chỉ còn Kị quân sự/chữa bệnh, nên bỏ Kị DI_CHUYEN.';
    case 'DELEGATE':
      return muc + ': kết quả theo rule ' + tenMucTieu(phepXuLy.den) + '.';
    case 'THEM_KY':
      return muc + ': thêm Kị DI_CHUYEN theo Quyển 10.';
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
  }
}
