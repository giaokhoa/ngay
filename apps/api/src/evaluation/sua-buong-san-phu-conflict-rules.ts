import { DieuKienDungSu } from '../activities/activity-rule';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QUY_TAC_Q10_GIAI_TRU } from './giai-tru-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const EARTHWORK_TARGETS = new Set<string>([
  'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
  'YEU_TO:' + MaYeuTo.THO_PHU,
  'YEU_TO:' + MaYeuTo.NGUYET_PHA,
  'TRUC:' + ThapNhiTruc.BINH,
  'TRUC:' + ThapNhiTruc.THU,
  'TRUC:' + ThapNhiTruc.BE,
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.DAI_THOI,
  'YEU_TO:' + MaYeuTo.THIEN_LAI,
  'YEU_TO:' + MaYeuTo.TU_PHE,
  'YEU_TO:' + MaYeuTo.NGU_MO,
  'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
  'YEU_TO:' + MaYeuTo.DIA_NANG,
  'THO_VUONG',
]);

const EARTHWORK_CORE = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) => !rule.mucTieu || EARTHWORK_TARGETS.has(khoa(rule.mucTieu)),
).map(chuyenSangSanPhu);

const TU_THAN = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) => rule.mucTieu?.loai === 'TRUC' && rule.mucTieu.truc === ThapNhiTruc.BINH,
).map((rule) => ({
  ...chuyenSangSanPhu(rule),
  ma: rule.ma.replace(/^EARTHWORK_Q10_BINH_/, 'SUA_BUONG_SAN_PHU_Q10_TU_THAN_'),
  mucTieu: Y(MaYeuTo.TU_THAN),
  moTa: thayTen(rule.moTa).replaceAll('Bình nhật', 'Tử Thần'),
}));

const NGUYET_HAI = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => rule.mucTieu?.loai === 'YEU_TO' && rule.mucTieu.ma === MaYeuTo.NGUYET_HAI,
).map((rule) => ({
  ...rule,
  ma: rule.ma.replace(/^KHAI_TRUONG_Q10_/, 'SUA_BUONG_SAN_PHU_Q10_'),
  boNen: undefined,
  moTa: rule.moTa
    .replaceAll('Khai trương', 'Sửa buồng sản phụ')
    .replaceAll('khai trương', 'sửa buồng sản phụ'),
}));

const TU_KHI = QUY_TAC_Q10_GIAI_TRU.filter(
  (rule) => rule.mucTieu?.loai === 'YEU_TO' && rule.mucTieu.ma === MaYeuTo.TU_KHI,
).map((rule) => ({
  ...rule,
  ma: rule.ma.replace(/^GIAI_TRU_Q10_/, 'SUA_BUONG_SAN_PHU_Q10_'),
  boNen: undefined,
  moTa: rule.moTa
    .replaceAll('Giải trừ', 'Sửa buồng sản phụ')
    .replaceAll('giải trừ', 'sửa buồng sản phụ'),
}));

export const QUY_TAC_Q10_SUA_BUONG_SAN_PHU: readonly QuyTacXungDotDataDriven[] = [
  ...EARTHWORK_CORE,
  ...TU_THAN,
  ...NGUYET_HAI,
  ...TU_KHI,
];

function chuyenSangSanPhu(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^EARTHWORK_Q10_/, 'SUA_BUONG_SAN_PHU_Q10_'),
    boNen: undefined,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value.replaceAll('earthwork', 'sửa buồng sản phụ');
}

function khoa(target: DieuKienDungSu): string {
  if (target.loai === 'YEU_TO') return 'YEU_TO:' + target.ma;
  if (target.loai === 'TRUC') return 'TRUC:' + target.truc;
  if (target.loai === 'CHI_NGAY') return 'CHI_NGAY:' + target.chi;
  if (target.loai === 'CAN_NGAY') return 'CAN_NGAY:' + target.can;
  if (target.loai === 'NGAY_AM') return 'NGAY_AM:' + target.ngay;
  return target.loai;
}
