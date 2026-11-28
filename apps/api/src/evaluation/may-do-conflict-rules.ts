import { DieuKienDungSu } from '../activities/activity-rule';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const TARGETS = new Set<string>([
  'TRUC:' + ThapNhiTruc.BINH,
  'TRUC:' + ThapNhiTruc.THU,
  'YEU_TO:' + MaYeuTo.NGUYET_PHA,
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.TU_PHE,
]);

const TARGET_RULES: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => rule.mucTieu !== undefined && TARGETS.has(khoa(rule.mucTieu)),
).map(chuyenSangMayDo);

const UNIVERSAL_HARD: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => !rule.mucTieu && rule.phepXuLy.loai === 'CAM_MOI_VIEC',
).map(chuyenSangMayDo);

export const QUY_TAC_Q10_MAY_DO: readonly QuyTacXungDotDataDriven[] = [
  ...UNIVERSAL_HARD,
  ...TARGET_RULES,
  supplementalStar('MAY_DO_Q10_TRUONG_TINH_KY', MaYeuTo.TRUONG_TINH, 'Trường Tinh'),
  supplementalStar('MAY_DO_Q10_DOAN_TINH_KY', MaYeuTo.DOAN_TINH, 'Đoản Tinh'),
];

function chuyenSangMayDo(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^KHAI_TRUONG_Q10_/, 'MAY_DO_Q10_'),
    boNen: undefined,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function supplementalStar(ma: string, factor: MaYeuTo, tenGoc: string): QuyTacXungDotDataDriven {
  return {
    ma,
    dieuKien: { coBatKyYeuTo: [factor] },
    phepXuLy: { loai: 'THEM_KY' },
    precedence: 210,
    moTa: `${tenGoc} là Kị bổ sung Q10 cho May đo/cắt may quần áo.`,
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
    .replaceAll('Khai trương', 'May đo/cắt may quần áo')
    .replaceAll('khai trương', 'may đo/cắt may quần áo');
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
