import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';

export interface NgayCamMoiViecQ4 {
  suffix: string;
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  moTa: string;
}

/**
 * Q10, mục 月厭, liệt kê các ngày đặc biệt “諸事皆忌”.
 * Đây là dữ liệu dùng chung cho mọi activity; không phụ thuộc việc factor
 * NGUYET_YEM có match vị trí ngày đó hay không.
 *
 * Nguồn Hán: WYG_010-48a..51a.
 * Nguồn Việt: Q10 mục Nguyệt Yếm, trang in quanh 807–810.
 */
export const NGAY_CAM_MOI_VIEC_Q4: readonly NgayCamMoiViecQ4[] = [
  ngay('DAI_HOI_1', DiaChi.DAN, ThienCan.GIAP, DiaChi.TUAT, 'Đại hội: mọi việc đều Kị.'),
  ngay('DAI_HOI_2', DiaChi.MAO, ThienCan.AT, DiaChi.DAU, 'Đại hội: mọi việc đều Kị.'),
  ngay('DAI_HOI_5', DiaChi.NGO, ThienCan.BINH, DiaChi.NGO, 'Đại hội: mọi việc đều Kị.'),
  ngay('DAI_HOI_6', DiaChi.MUI, ThienCan.DINH, DiaChi.TI, 'Đại hội: mọi việc đều Kị.'),
  ngay('DAI_HOI_7', DiaChi.THAN, ThienCan.CANH, DiaChi.THIN, 'Đại hội: mọi việc đều Kị.'),
  ngay('DAI_HOI_8', DiaChi.DAU, ThienCan.TAN, DiaChi.MAO, 'Đại hội: mọi việc đều Kị.'),
  ngay('DAI_HOI_11', DiaChi.TY, ThienCan.NHAM, DiaChi.TY, 'Đại hội: mọi việc đều Kị.'),
  ngay('DAI_HOI_12', DiaChi.SUU, ThienCan.QUY, DiaChi.HOI, 'Đại hội: mọi việc đều Kị.'),

  ngay('TIEU_HOI_2', DiaChi.MAO, ThienCan.KY, DiaChi.MAO, 'Tiểu hội: mọi việc đều Kị.'),
  ngay('TIEU_HOI_3', DiaChi.THIN, ThienCan.MAU, DiaChi.THIN, 'Tiểu hội: mọi việc đều Kị.'),
  ngay('TIEU_HOI_4', DiaChi.TI, ThienCan.KY, DiaChi.TI, 'Tiểu hội: mọi việc đều Kị.'),
  ngay('TIEU_HOI_5', DiaChi.NGO, ThienCan.MAU, DiaChi.NGO, 'Tiểu hội: mọi việc đều Kị.'),
  ngay('TIEU_HOI_8', DiaChi.DAU, ThienCan.KY, DiaChi.DAU, 'Tiểu hội: mọi việc đều Kị.'),
  ngay('TIEU_HOI_9', DiaChi.TUAT, ThienCan.MAU, DiaChi.TUAT, 'Tiểu hội: mọi việc đều Kị.'),
  ngay('TIEU_HOI_10', DiaChi.HOI, ThienCan.KY, DiaChi.HOI, 'Tiểu hội: mọi việc đều Kị.'),
  ngay('TIEU_HOI_11', DiaChi.TY, ThienCan.MAU, DiaChi.TY, 'Tiểu hội: mọi việc đều Kị.'),

  ngay('TAM_AM_1', DiaChi.DAN, ThienCan.TAN, DiaChi.DAU, 'Tam âm: mọi việc đều Kị.'),
  ngay('TAM_AM_7', DiaChi.THAN, ThienCan.AT, DiaChi.MAO, 'Tam âm: mọi việc đều Kị.'),
  ngay('AM_VI_3', DiaChi.THIN, ThienCan.CANH, DiaChi.THIN, 'Âm vị: mọi việc đều Kị.'),
  ngay('AM_VI_9', DiaChi.TUAT, ThienCan.GIAP, DiaChi.TUAT, 'Âm vị: mọi việc đều Kị.'),

  ngay(
    'AM_DUONG_GIAO_PHA_4',
    DiaChi.TI,
    ThienCan.QUY,
    DiaChi.HOI,
    'Âm dương giao phá: mọi việc đều Kị.',
  ),
  ngay(
    'AM_DUONG_GIAO_PHA_10',
    DiaChi.HOI,
    ThienCan.DINH,
    DiaChi.TI,
    'Âm dương giao phá: mọi việc đều Kị.',
  ),
  ngay(
    'AM_DUONG_KICH_XUNG_5',
    DiaChi.NGO,
    ThienCan.NHAM,
    DiaChi.TY,
    'Âm dương kích xung: mọi việc đều Kị.',
  ),
  ngay(
    'AM_DUONG_KICH_XUNG_11',
    DiaChi.TY,
    ThienCan.BINH,
    DiaChi.NGO,
    'Âm dương kích xung: mọi việc đều Kị.',
  ),
  ngay(
    'DUONG_PHA_AM_XUNG_6',
    DiaChi.MUI,
    ThienCan.QUY,
    DiaChi.SUU,
    'Dương phá âm xung: mọi việc đều Kị.',
  ),
  ngay(
    'DUONG_PHA_AM_XUNG_12',
    DiaChi.SUU,
    ThienCan.DINH,
    DiaChi.MUI,
    'Dương phá âm xung: mọi việc đều Kị.',
  ),
  ngay(
    'DAO_AM_XUNG_DUONG_2',
    DiaChi.MAO,
    ThienCan.KY,
    DiaChi.DAU,
    'Đạo âm xung dương: mọi việc đều Kị.',
  ),
  ngay(
    'DAO_AM_XUNG_DUONG_8',
    DiaChi.DAU,
    ThienCan.KY,
    DiaChi.MAO,
    'Đạo âm xung dương: mọi việc đều Kị.',
  ),

  // Âm thác cases that Q10 explicitly upgrades to 月破 / 大會 hard-ban.
  ngay(
    'AM_THAC_2_TAN_DAU',
    DiaChi.MAO,
    ThienCan.TAN,
    DiaChi.DAU,
    'Âm thác tháng Hai đồng thời Nguyệt Phá: mọi việc đều Kị.',
  ),
  ngay(
    'AM_THAC_8_AT_MAO',
    DiaChi.DAU,
    ThienCan.AT,
    DiaChi.MAO,
    'Âm thác tháng Tám đồng thời Nguyệt Phá: mọi việc đều Kị.',
  ),
  ngay(
    'AM_THAC_6_DINH_TI',
    DiaChi.MUI,
    ThienCan.DINH,
    DiaChi.TI,
    'Âm thác tháng Sáu đồng thời Đại hội: mọi việc đều Kị.',
  ),
  ngay(
    'AM_THAC_6_KY_TI',
    DiaChi.MUI,
    ThienCan.KY,
    DiaChi.TI,
    'Âm thác tháng Sáu đồng thời Đại hội: mọi việc đều Kị.',
  ),

  // Q10 WYG_010-49b: 四月戊辰為絶陰，十月戊戌為絶陽，亦諸事皆忌.
  ngay('TUYET_AM_4', DiaChi.TI, ThienCan.MAU, DiaChi.THIN, 'Tuyệt Âm: mọi việc đều Kị.'),
  ngay('TUYET_DUONG_10', DiaChi.HOI, ThienCan.MAU, DiaChi.TUAT, 'Tuyệt Dương: mọi việc đều Kị.'),
];

function ngay(
  suffix: string,
  chiThang: DiaChi,
  canNgay: ThienCan,
  chiNgay: DiaChi,
  moTa: string,
): NgayCamMoiViecQ4 {
  return { suffix, chiThang, canNgay, chiNgay, moTa };
}
