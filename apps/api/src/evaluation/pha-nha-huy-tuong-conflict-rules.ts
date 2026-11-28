import { DieuKienDungSu } from '../activities/activity-rule';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const NEN_NGUYET_PHA = [Y(MaYeuTo.NGUYET_PHA)] as const;

const TARGETS = new Set<string>([
  'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
  'YEU_TO:' + MaYeuTo.THO_PHU,
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
  'YEU_TO:' + MaYeuTo.DIA_NANG,
  'THO_VUONG',
]);

const TARGET_RULES: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) =>
    rule.mucTieu !== undefined &&
    TARGETS.has(khoa(rule.mucTieu)) &&
    rule.phepXuLy.loai !== 'CAM_MOI_VIEC',
).map(chuyenRule);

const GLOBAL_HARD: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_NHAP_HOC.map((rule) => ({
  ...rule,
  ma: rule.ma.replace(/^NHAP_HOC_Q10_/, 'PHA_NHA_HUY_TUONG_Q10_'),
}));

export const QUY_TAC_Q10_PHA_NHA_HUY_TUONG: readonly QuyTacXungDotDataDriven[] = [
  ...GLOBAL_HARD,
  ...TARGET_RULES,
  {
    ma: 'PHA_NHA_HUY_TUONG_Q10_NGUYET_KY_BO_NEN',
    dieuKien: { coTatCaYeuTo: [MaYeuTo.NGUYET_KY] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 200,
    moTa: 'Nguyệt Kị nhật không ghi Nên phá nhà, hủy tường; không tự tạo Kị.',
    nguon: nguonHanQ10('月忌日', 'WYG_010-71a..71b'),
  },
];

function chuyenRule(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  const delegateToNguyetPha =
    rule.phepXuLy.loai === 'DELEGATE' &&
    rule.phepXuLy.den.loai === 'YEU_TO' &&
    rule.phepXuLy.den.ma === MaYeuTo.NGUYET_PHA;

  return {
    ...rule,
    ma: rule.ma.replace(/^EARTHWORK_Q10_/, 'PHA_NHA_HUY_TUONG_Q10_'),
    phepXuLy: delegateToNguyetPha ? { loai: 'BO_KY' as const } : rule.phepXuLy,
    boNen:
      rule.phepXuLy.loai === 'CAN_BANG' ? [...(rule.boNen ?? []), ...NEN_NGUYET_PHA] : rule.boNen,
    moTa: thayTen(rule.moTa, delegateToNguyetPha),
  };
}

function thayTen(value: string, delegateToNguyetPha: boolean): string {
  const renamed = value
    .replaceAll('earthwork', 'phá nhà, hủy tường')
    .replaceAll('kết quả theo rule NGUYET_PHA', 'kết quả theo Nguyệt Phá');
  return delegateToNguyetPha
    ? renamed + ' Với 破屋壞垣, Nguyệt Phá là Nên nên nhánh theo Nguyệt Phá bỏ Kị.'
    : renamed;
}

function khoa(target: DieuKienDungSu): string {
  if (target.loai === 'YEU_TO') return 'YEU_TO:' + target.ma;
  if (target.loai === 'TRUC') return 'TRUC:' + target.truc;
  if (target.loai === 'CHI_NGAY') return 'CHI_NGAY:' + target.chi;
  if (target.loai === 'CAN_NGAY') return 'CAN_NGAY:' + target.can;
  if (target.loai === 'NGAY_AM') return 'NGAY_AM:' + target.ngay;
  return target.loai;
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
