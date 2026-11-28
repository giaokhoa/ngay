import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { MaYeuTo } from '../factors/domain/factor-code';
import { taoNguonXungDotQuyen10 } from './cuoi-hoi-conflict-rules';
import { NGAY_CAM_MOI_VIEC_Q4 } from './q4-hard-days';
import {
  NGAY_AM_THAC_Q4,
  NGAY_DUONG_THAC_Q4,
  NGAY_TUE_BAC_TRUC_TRAN_Q4,
  NhomNenBiLoaiQ4,
} from './q4-yem-special-days';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;

const NEN_DUC_NGUYEN: readonly DieuKienDungSu[] = [
  Y(MaYeuTo.THIEN_DUC),
  Y(MaYeuTo.NGUYET_DUC),
  Y(MaYeuTo.THIEN_NGUYEN),
];

const NEN_DUC_HOP: readonly DieuKienDungSu[] = DUC_HOP.map(Y);

/**
 * Q10 supplement riêng cho 嫁娶, phát sinh từ 月厭 + các hội Q4.
 * Q11 vẫn là baseline; các rule dưới đây chỉ encode phần Q10 bổ sung/override
 * mà baseline Q11 không thể biểu diễn.
 */
export const QUY_TAC_Q10_CUOI_HOI_Q4: readonly QuyTacXungDotDataDriven[] = [
  // 月厭: Mão/Dậu và Tý/Ngọ có nhánh hard-ban.
  target(
    'CUOI_HOI_Q10_NGUYET_YEM_MAO_DAU_HARD',
    807,
    130,
    { loai: 'CAM_MOI_VIEC' },
    { chiThang: [DiaChi.MAO, DiaChi.DAU] },
    'Nguyệt Yếm tháng Mão/Dậu: mọi việc đều Kị.',
  ),
  target(
    'CUOI_HOI_Q10_NGUYET_YEM_TY_NGO_HARD',
    807,
    120,
    { loai: 'CAM_MOI_VIEC' },
    {
      chiThang: [DiaChi.TY, DiaChi.NGO],
      khongCoBatKyYeuTo: [MaYeuTo.THIEN_XA],
    },
    'Nguyệt Yếm tháng Tý/Ngọ không gặp Thiên Xá: mọi việc đều Kị.',
  ),

  // 辰戌巳亥月 + đúng Đức thần: 吉凶相抵, không ghi Nên/Kị.
  target(
    'CUOI_HOI_Q10_NGUYET_YEM_THIN_TUAT_TI_HOI_CAN_BANG',
    807,
    90,
    { loai: 'CAN_BANG' },
    {
      chiThang: [DiaChi.THIN, DiaChi.TUAT, DiaChi.TI, DiaChi.HOI],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC, MaYeuTo.NGUYET_DUC_HOP],
    },
    'Nguyệt Yếm ở Thìn/Tuất/Tỵ/Hợi gặp đúng Đức thần: cát hung cân bằng.',
  ),

  // 寅申丑未 + Đức: 嫁娶 vẫn nằm trong phần còn Kị.
  target(
    'CUOI_HOI_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_VAN_KY',
    807,
    80,
    { loai: 'GIU_KY_DU_CO_CAT' },
    {
      chiThang: [DiaChi.DAN, DiaChi.THAN, DiaChi.SUU, DiaChi.MUI],
      coBatKyYeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC_HOP],
    },
    'Nguyệt Yếm ở Dần/Thân/Sửu/Mùi: cưới hỏi vẫn Kị dù gặp các Đức thần được nêu.',
  ),

  // Q4/Q10 global hard days.
  ...NGAY_CAM_MOI_VIEC_Q4.map((item) =>
    global(
      'CUOI_HOI_Q10_Q4_HARD_' + item.suffix,
      807,
      160,
      { loai: 'CAM_MOI_VIEC' },
      item,
      item.moTa,
    ),
  ),

  // 歲薄 / 逐陣: follows 月厭. 嫁娶 nằm trong Kị Nguyệt Yếm.
  ...NGAY_TUE_BAC_TRUC_TRAN_Q4.map((item) =>
    global(
      'CUOI_HOI_Q10_NGUYET_YEM_' + item.suffix,
      808,
      140,
      { loai: 'THEM_KY' },
      item,
      item.moTa,
      q4BoNen(item.boNen),
    ),
  ),

  // 陰錯: non-hard cases follow 月厭 -> Kị 嫁娶.
  ...NGAY_AM_THAC_Q4.filter((item) => !item.hard).map((item) =>
    global(
      'CUOI_HOI_Q10_NGUYET_YEM_' + item.suffix,
      808,
      140,
      { loai: 'THEM_KY' },
      item,
      item.moTa,
      q4BoNen(item.boNen),
    ),
  ),

  // 陽錯: non-hard cases follow 月建. Q10 月建 does not list 嫁娶,
  // nên không tự sinh Kị; nếu cùng ngày có NGUYET_YEM contribution thì bỏ Kị ấy.
  ...NGAY_DUONG_THAC_Q4.filter((item) => !item.hard).map((item) =>
    target(
      'CUOI_HOI_Q10_NGUYET_YEM_' + item.suffix,
      808,
      140,
      { loai: 'BO_KY' },
      {
        chiThang: [item.chiThang],
        canNgay: [item.canNgay],
        chiNgay: [item.chiNgay],
      },
      'Dương Thác theo chỗ Kị của Kiến; Q10 Kiến không liệt kê 嫁娶.',
      q4BoNen(item.boNen),
    ),
  ),

  // 六月己未 còn không theo chỗ Nên của Đức Hợp ngay cả khi NGUYET_YEM
  // không phải contribution của ngày đó.
  ...NGAY_DUONG_THAC_Q4.filter((item) => !item.hard && Boolean(item.boNen)).map((item) =>
    global(
      'CUOI_HOI_Q10_NGUYET_YEM_' + item.suffix + '_BO_NEN',
      808,
      145,
      { loai: 'BO_NEN' },
      item,
      item.moTa,
      q4BoNen(item.boNen),
    ),
  ),
];

function target(
  ma: string,
  trang: number,
  precedence: number,
  phepXuLy: QuyTacXungDotDataDriven['phepXuLy'],
  dieuKien: NonNullable<QuyTacXungDotDataDriven['dieuKien']>,
  moTa: string,
  boNen?: readonly DieuKienDungSu[],
): QuyTacXungDotDataDriven {
  return {
    ma,
    mucTieu: Y(MaYeuTo.NGUYET_YEM),
    dieuKien,
    phepXuLy,
    precedence,
    moTa,
    nguon: taoNguonXungDotQuyen10(trang),
    boNen,
  };
}

function global(
  ma: string,
  trang: number,
  precedence: number,
  phepXuLy: QuyTacXungDotDataDriven['phepXuLy'],
  item: { chiThang: DiaChi; canNgay: ThienCan; chiNgay: DiaChi },
  moTa: string,
  boNen?: readonly DieuKienDungSu[],
): QuyTacXungDotDataDriven {
  return {
    ma,
    dieuKien: {
      chiThang: [item.chiThang],
      canNgay: [item.canNgay],
      chiNgay: [item.chiNgay],
    },
    phepXuLy,
    precedence,
    moTa,
    nguon: taoNguonXungDotQuyen10(trang),
    boNen,
  };
}

function q4BoNen(nhom: NhomNenBiLoaiQ4 | undefined): readonly DieuKienDungSu[] | undefined {
  if (nhom === 'DUC_HOP') return NEN_DUC_HOP;
  if (nhom === 'DUC_NGUYEN') return NEN_DUC_NGUYEN;
  return undefined;
}
