import { DieuKienDungSu } from '../activities/activity-rule';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';
import { QUY_TAC_Q10_YEN_HOI } from './yen-hoi-conflict-rules';

const TARGETS = new Set<string>([
  'TRUC:' + ThapNhiTruc.BINH,
  'TRUC:' + ThapNhiTruc.THU,
  ...[
    MaYeuTo.NGUYET_PHA,
    MaYeuTo.DAI_HAO,
    MaYeuTo.KIEP_SAT,
    MaYeuTo.TAI_SAT,
    MaYeuTo.NGUYET_SAT,
    MaYeuTo.NGUYET_HINH,
    MaYeuTo.NGUYET_HAI,
    MaYeuTo.NGUYET_YEM,
    MaYeuTo.DAI_THOI,
    MaYeuTo.THIEN_LAI,
    MaYeuTo.TIEU_HAO,
    MaYeuTo.TU_HAO,
    MaYeuTo.TU_PHE,
    MaYeuTo.TU_CUNG,
    MaYeuTo.NGU_MO,
    MaYeuTo.CUU_KHONG,
  ].map((ma) => 'YEU_TO:' + ma),
]);

const KHAI_TARGETS: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => rule.mucTieu !== undefined && TARGETS.has(khoa(rule.mucTieu)),
).map(chuyenSangGiaoDich);

const UNIVERSAL_HARD: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => !rule.mucTieu && rule.phepXuLy.loai === 'CAM_MOI_VIEC',
).map(chuyenSangGiaoDich);

const NGU_LY_RELIEF = QUY_TAC_Q10_YEN_HOI.filter(
  (rule) => rule.ma === 'YEN_HOI_Q10_NGU_LY_CAT_BO_KY',
).map((rule) => ({
  ...rule,
  ma: 'LAP_KHE_UOC_GIAO_DICH_Q10_NGU_LY_CAT_BO_KY',
  moTa: 'Ngũ Ly gặp Đức/Hợp, Thiên Xá, Tam Hợp hoặc Lục Hợp thì không Kị lập khế ước/giao dịch.',
}));

export const QUY_TAC_Q10_LAP_KHE_UOC_GIAO_DICH: readonly QuyTacXungDotDataDriven[] = [
  ...UNIVERSAL_HARD,
  ...KHAI_TARGETS,
  ...NGU_LY_RELIEF,
  supplementalStar('LAP_KHE_UOC_GIAO_DICH_Q10_TRUONG_TINH_KY', MaYeuTo.TRUONG_TINH, 'Trường Tinh'),
  supplementalStar('LAP_KHE_UOC_GIAO_DICH_Q10_DOAN_TINH_KY', MaYeuTo.DOAN_TINH, 'Đoản Tinh'),
];

function chuyenSangGiaoDich(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^KHAI_TRUONG_Q10_/, 'LAP_KHE_UOC_GIAO_DICH_Q10_'),
    boNen: undefined,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function supplementalStar(ma: string, factor: MaYeuTo, tenViet: string): QuyTacXungDotDataDriven {
  return {
    ma,
    dieuKien: { coBatKyYeuTo: [factor] },
    phepXuLy: { loai: 'THEM_KY' },
    precedence: 210,
    moTa: `${tenViet} là Kị bổ sung Q10 cho lập khế ước/giao dịch.`,
    nguon: nguonHanQ10('長星・短星', 'WYG_010-72a'),
  };
}

function khoa(target: DieuKienDungSu): string {
  if (target.loai === 'YEU_TO') return 'YEU_TO:' + target.ma;
  if (target.loai === 'TRUC') return 'TRUC:' + target.truc;
  if (target.loai === 'CHI_NGAY') return 'CHI_NGAY:' + target.chi;
  if (target.loai === 'CAN_NGAY') return 'CAN_NGAY:' + target.can;
  if (target.loai === 'NGAY_AM') return 'NGAY_AM:' + target.ngay;
  return target.loai;
}

function thayTen(value: string): string {
  return value
    .replaceAll('Khai trương', 'Lập khế ước/giao dịch')
    .replaceAll('khai trương', 'lập khế ước/giao dịch');
}

function nguonHanQ10(muc: string, anchor: string): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc,
      tenGoc: muc,
      daXacMinh: true,
      ghiChu: anchor,
    },
  ];
}
