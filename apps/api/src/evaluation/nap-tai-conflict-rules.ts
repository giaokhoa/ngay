import { DieuKienDungSu } from '../activities/activity-rule';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const TARGETS = new Set<string>([
  'TRUC:' + ThapNhiTruc.BINH,
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
    MaYeuTo.CUU_KHONG,
  ].map((ma) => 'YEU_TO:' + ma),
]);

const TARGET_RULES: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => rule.mucTieu !== undefined && TARGETS.has(khoa(rule.mucTieu)),
).map(chuyenSangNapTai);

const UNIVERSAL_HARD: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => !rule.mucTieu && rule.phepXuLy.loai === 'CAM_MOI_VIEC',
).map(chuyenSangNapTai);

export const QUY_TAC_Q10_NAP_TAI: readonly QuyTacXungDotDataDriven[] = [
  ...UNIVERSAL_HARD,
  ...TARGET_RULES,
  supplementalStar('NAP_TAI_Q10_TRUONG_TINH_KY', MaYeuTo.TRUONG_TINH, 'Trường Tinh'),
  supplementalStar('NAP_TAI_Q10_DOAN_TINH_KY', MaYeuTo.DOAN_TINH, 'Đoản Tinh'),
];

function chuyenSangNapTai(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^KHAI_TRUONG_Q10_/, 'NAP_TAI_Q10_'),
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
    moTa: `${tenViet} là Kị bổ sung Q10 cho nạp tài.`,
    nguon: nguonHanQ10('長星・短星', 'WYG_010-71b..72a'),
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
  return value.replaceAll('Khai trương', 'Nạp tài').replaceAll('khai trương', 'nạp tài');
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
