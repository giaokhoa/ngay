import { DieuKienDungSu } from '../activities/activity-rule';
import { MaYeuTo } from '../factors/domain/factor-code';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const TARGETS = new Set<string>([
  'YEU_TO:' + MaYeuTo.THO_PHU,
  'YEU_TO:' + MaYeuTo.NGUYET_PHA,
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.TU_PHE,
  'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
  'YEU_TO:' + MaYeuTo.DIA_NANG,
  'THO_VUONG',
]);

export const QUY_TAC_Q10_TRANG_TRI_TUONG: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_CONG_VIEC_DAT.filter((rule) => !rule.mucTieu || TARGETS.has(khoa(rule.mucTieu))).map(
    (rule) => ({
      ...rule,
      ma: rule.ma.replace(/^EARTHWORK_Q10_/, 'TRANG_TRI_TUONG_Q10_'),
      boNen: undefined,
      moTa: rule.moTa.replaceAll('earthwork', 'trang trí tường'),
    }),
  );

function khoa(target: DieuKienDungSu): string {
  if (target.loai === 'YEU_TO') return 'YEU_TO:' + target.ma;
  if (target.loai === 'TRUC') return 'TRUC:' + target.truc;
  if (target.loai === 'CHI_NGAY') return 'CHI_NGAY:' + target.chi;
  if (target.loai === 'CAN_NGAY') return 'CAN_NGAY:' + target.can;
  if (target.loai === 'NGAY_AM') return 'NGAY_AM:' + target.ngay;
  return target.loai;
}
