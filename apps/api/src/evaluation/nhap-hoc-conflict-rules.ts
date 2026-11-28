import { DiaChi } from '../calendar/domain/earthly-branch';
import { MaYeuTo } from '../factors/domain/factor-code';
import { taoNguonXungDotQuyen10 } from './cuoi-hoi-conflict-rules';
import { NGAY_CAM_MOI_VIEC_Q4 } from './q4-hard-days';
import { DieuKienQ10, QuyTacXungDotDataDriven } from './q10-rule-resolver';

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;

// WYG_010-29b chỉ nêu 月德、天德合、月德合 cho nhánh 月破 này; không có 天德.
const DUC_GIAI_NGUYET_PHA = [
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;

const THANG_TU_SINH = [DiaChi.DAN, DiaChi.THAN, DiaChi.TI, DiaChi.HOI] as const;
const THANG_TU_MUA = [DiaChi.THIN, DiaChi.TUAT, DiaChi.SUU, DiaChi.MUI] as const;

/**
 * 入學 Q11 ghi 忌無: không có Kị thường theo activity baseline.
 * Q10 vẫn có các nhánh nói thẳng 諸事皆忌; đây là subset toàn cục duy nhất
 * production áp cho Nhập học. Không clone Kị riêng của cưới hỏi/di chuyển.
 */
export const QUY_TAC_Q10_NHAP_HOC: readonly QuyTacXungDotDataDriven[] = [
  // 月破: WYG_010-29b..30a.
  hard(
    'NHAP_HOC_Q10_NGUYET_PHA_MAO_DAU_HARD',
    788,
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    },
    'Nguyệt Phá tháng Mão/Dậu đồng thời Tai Sát + Nguyệt Yếm: mọi việc đều Kị.',
  ),
  hard(
    'NHAP_HOC_Q10_NGUYET_PHA_TY_NGO_HARD',
    789,
    {
      chiThang: [DiaChi.TY, DiaChi.NGO],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
      khongCoBatKyYeuTo: DUC_GIAI_NGUYET_PHA,
    },
    'Nguyệt Phá tháng Tý/Ngọ gặp Tai Sát mà không có Đức thần được Q10 nêu: mọi việc đều Kị.',
  ),
  hard(
    'NHAP_HOC_Q10_NGUYET_PHA_MUI_THAN_HARD',
    789,
    {
      chiThang: [DiaChi.MUI, DiaChi.THAN],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_HINH],
      khongCoBatKyYeuTo: DUC_GIAI_NGUYET_PHA,
    },
    'Nguyệt Phá tháng Mùi/Thân gặp Nguyệt Hình mà không có Đức thần được Q10 nêu: mọi việc đều Kị.',
  ),

  // 月煞: WYG_010-42a..43a.
  hard(
    'NHAP_HOC_Q10_NGUYET_SAT_HARD_KHONG_DUC',
    802,
    {
      chiThang: [...THANG_TU_SINH, ...THANG_TU_MUA],
      coTatCaYeuTo: [MaYeuTo.NGUYET_SAT],
      khongCoBatKyYeuTo: DUC_HOP,
    },
    'Nguyệt Sát ở tháng tứ sinh/tứ mộ không gặp Đức/Hợp: mọi việc đều Kị.',
  ),

  // 月刑: WYG_010-44b..45a.
  hard(
    'NHAP_HOC_Q10_NGUYET_HINH_HARD_KHONG_DUC',
    803,
    {
      chiThang: [DiaChi.TY, DiaChi.MAO, DiaChi.MUI, DiaChi.THAN],
      coTatCaYeuTo: [MaYeuTo.NGUYET_HINH],
      khongCoBatKyYeuTo: DUC_HOP,
    },
    'Nguyệt Hình ở nhánh Q10 hạ hung không gặp Đức/Hợp: mọi việc đều Kị.',
  ),

  // 月厭: WYG_010-48a..51a.
  hard(
    'NHAP_HOC_Q10_NGUYET_YEM_MAO_DAU_HARD',
    807,
    { chiThang: [DiaChi.MAO, DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_YEM] },
    'Nguyệt Yếm tháng Mão/Dậu: mọi việc đều Kị.',
  ),
  hard(
    'NHAP_HOC_Q10_NGUYET_YEM_TY_NGO_HARD',
    807,
    {
      chiThang: [DiaChi.TY, DiaChi.NGO],
      coTatCaYeuTo: [MaYeuTo.NGUYET_YEM],
      khongCoBatKyYeuTo: [MaYeuTo.THIEN_XA],
    },
    'Nguyệt Yếm tháng Tý/Ngọ không gặp Thiên Xá: mọi việc đều Kị.',
  ),
  ...NGAY_CAM_MOI_VIEC_Q4.map((item) =>
    hard(
      'NHAP_HOC_Q10_Q4_HARD_' + item.suffix,
      807,
      { chiThang: [item.chiThang], canNgay: [item.canNgay], chiNgay: [item.chiNgay] },
      item.moTa,
      160,
    ),
  ),

  // 四廢: WYG_010-58a..58b.
  hard(
    'NHAP_HOC_Q10_TU_PHE_NGUYET_PHA_HARD',
    817,
    { coTatCaYeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] },
    'Tứ Phế gặp Nguyệt Phá: mọi việc đều Kị.',
  ),
];

function hard(
  ma: string,
  trang: number,
  dieuKien: DieuKienQ10,
  moTa: string,
  precedence = 100,
): QuyTacXungDotDataDriven {
  return {
    ma,
    dieuKien,
    phepXuLy: { loai: 'CAM_MOI_VIEC' },
    precedence,
    moTa,
    nguon: taoNguonXungDotQuyen10(trang),
  };
}
