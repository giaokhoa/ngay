import { DieuKienDungSu } from '../activities/activity-rule';
import { MaYeuTo } from '../factors/domain/factor-code';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const TARGETS = new Set<string>([
  'YEU_TO:' + MaYeuTo.THO_PHU,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
  'YEU_TO:' + MaYeuTo.DIA_NANG,
  'THO_VUONG',
]);

const TARGET_RULES = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) =>
    rule.mucTieu !== undefined &&
    TARGETS.has(khoa(rule.mucTieu)) &&
    rule.phepXuLy.loai !== 'CAM_MOI_VIEC',
).map(chuyenTuong);

const GLOBAL_HARD = QUY_TAC_Q10_NHAP_HOC.map((rule) => ({
  ...rule,
  ma: rule.ma.replace(/^NHAP_HOC_Q10_/, 'SUA_SANG_DUONG_SA_Q10_'),
}));

export const QUY_TAC_Q10_SUA_SANG_DUONG_SA: readonly QuyTacXungDotDataDriven[] = [
  ...GLOBAL_HARD,
  ...TARGET_RULES,
];

function chuyenTuong(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^EARTHWORK_Q10_/, 'SUA_SANG_DUONG_SA_Q10_'),
    boNen: undefined,
    moTa: rule.moTa.replaceAll('earthwork', 'sửa sang đường sá'),
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
