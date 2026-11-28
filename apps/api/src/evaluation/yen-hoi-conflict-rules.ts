import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { taoNguonXungDotQuyen10 } from './cuoi-hoi-conflict-rules';
import { QUY_TAC_Q10_DI_CHUYEN } from './di-chuyen-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const TARGET_YEU_TO_CHUNG = new Set<MaYeuTo>([
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.TU_PHE,
]);
const TARGET_TRUC_CHUNG = new Set<ThapNhiTruc>([ThapNhiTruc.BINH, ThapNhiTruc.THU, ThapNhiTruc.BE]);
const NGUYET_YEM_DUC_RESIDUAL = 'DI_CHUYEN_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_VAN_KY';

const CORE_SHARED: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_DI_CHUYEN.filter((rule) => {
  if (!rule.mucTieu) return true; // Q10 月厭 special-day globals.
  if (rule.mucTieu.loai === 'YEU_TO') return TARGET_YEU_TO_CHUNG.has(rule.mucTieu.ma);
  if (rule.mucTieu.loai === 'TRUC') return TARGET_TRUC_CHUNG.has(rule.mucTieu.truc);
  return false;
}).map(chuyenSangYenHoi);

export const QUY_TAC_Q10_YEN_HOI: readonly QuyTacXungDotDataDriven[] = [
  ...CORE_SHARED,

  // 月害 — WYG_010-45b..46b.
  custom(
    'YEN_HOI_Q10_NGUYET_HAI_MAO_DAU_SUU_MUI_DUC_BO_KY',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    85,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU, DiaChi.SUU, DiaChi.MUI],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC],
    },
    'Nguyệt Hại ở Mão/Dậu/Sửu/Mùi gặp Thiên Đức hoặc Nguyệt Đức: Yến hội không còn trong residual Kị.',
  ),
  custom(
    'YEN_HOI_Q10_NGUYET_HAI_THIN_TUAT_HOP_CAN_BANG',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    80,
    { loai: 'CAN_BANG' },
    {
      chiThang: [DiaChi.THIN, DiaChi.TUAT],
      coBatKyYeuTo: [MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC_HOP],
    },
    'Nguyệt Hại Thìn/Tuất gặp Đức Hợp: cát/hung tương để, không chú Nên/Kị tương ứng.',
  ),
  custom(
    'YEN_HOI_Q10_NGUYET_HAI_TY_NGO_THEO_NGUYET_SAT',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_SAT) },
    { chiThang: [DiaChi.TY, DiaChi.NGO] },
    'Nguyệt Hại Tý/Ngọ đồng vị Nguyệt Sát, theo nhánh nặng hơn.',
  ),
  custom(
    'YEN_HOI_Q10_NGUYET_HAI_TI_HOI_THEO_KIEP_SAT',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.KIEP_SAT) },
    { chiThang: [DiaChi.TI, DiaChi.HOI] },
    'Nguyệt Hại Tỵ/Hợi đồng vị Kiếp Sát, theo nhánh nặng hơn.',
  ),
  custom(
    'YEN_HOI_Q10_NGUYET_HAI_DAN_THEO_NGUYET_HINH',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    90,
    { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_HINH) },
    { chiThang: [DiaChi.DAN] },
    'Nguyệt Hại tháng Dần đồng vị Nguyệt Hình, theo nhánh nặng hơn.',
  ),
  custom(
    'YEN_HOI_Q10_NGUYET_HAI_THAN_THEO_BINH',
    Y(MaYeuTo.NGUYET_HAI),
    805,
    90,
    { loai: 'DELEGATE', den: T(ThapNhiTruc.BINH) },
    { chiThang: [DiaChi.THAN] },
    'Nguyệt Hại tháng Thân đồng vị Bình nhật, theo nhánh nặng hơn.',
  ),

  // 五離 — WYG_010-65b.
  custom(
    'YEN_HOI_Q10_NGU_LY_CAT_BO_KY',
    Y(MaYeuTo.NGU_LY),
    837,
    80,
    { loai: 'BO_KY' },
    {
      coBatKyYeuTo: [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_XA,
        MaYeuTo.TAM_HOP,
        MaYeuTo.LUC_HOP,
      ],
    },
    'Ngũ Ly gặp Đức/Hợp, Thiên Xá, Tam Hợp hoặc Lục Hợp thì không Kị Yến hội.',
  ),
];

function chuyenSangYenHoi(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  const laResidualNguyetYem = rule.ma === NGUYET_YEM_DUC_RESIDUAL;
  return {
    ...rule,
    ma: rule.ma.replace(/^DI_CHUYEN_Q10_/, 'YEN_HOI_Q10_'),
    phepXuLy: laResidualNguyetYem ? { loai: 'BO_KY' } : rule.phepXuLy,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function custom(
  ma: string,
  mucTieu: DieuKienDungSu,
  trang: number,
  precedence: number,
  phepXuLy: QuyTacXungDotDataDriven['phepXuLy'],
  dieuKien: QuyTacXungDotDataDriven['dieuKien'],
  moTa: string,
): QuyTacXungDotDataDriven {
  return {
    ma,
    mucTieu,
    dieuKien,
    phepXuLy,
    precedence,
    moTa,
    nguon: taoNguonXungDotQuyen10(trang),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('DI_CHUYEN', 'Yến hội')
    .replaceAll('Di chuyển', 'Yến hội')
    .replaceAll('di chuyển', 'yến hội');
}
