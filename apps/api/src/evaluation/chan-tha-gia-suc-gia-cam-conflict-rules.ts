import { DieuKienDungSu } from '../activities/activity-rule';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const EARTHWORK_TARGETS = new Set<string>([
  'YEU_TO:' + MaYeuTo.NGUYET_PHA,
  'TRUC:' + ThapNhiTruc.BINH,
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.DAI_THOI,
  'YEU_TO:' + MaYeuTo.THIEN_LAI,
  'YEU_TO:' + MaYeuTo.TU_PHE,
  'YEU_TO:' + MaYeuTo.NGU_MO,
]);

const EARTHWORK_CORE = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) => !rule.mucTieu || EARTHWORK_TARGETS.has(khoa(rule.mucTieu)),
).map(chuyenSangChanTha);

const TU_THAN = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) => rule.mucTieu?.loai === 'TRUC' && rule.mucTieu.truc === ThapNhiTruc.BINH,
).map((rule) => ({
  ...chuyenSangChanTha(rule),
  ma: rule.ma.replace(/^EARTHWORK_Q10_BINH_/, 'CHAN_THA_GIA_SUC_GIA_CAM_Q10_TU_THAN_'),
  mucTieu: Y(MaYeuTo.TU_THAN),
  moTa: thayTen(rule.moTa).replaceAll('Bình nhật', 'Tử Thần'),
}));

const NGUYET_HAI = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => rule.mucTieu?.loai === 'YEU_TO' && rule.mucTieu.ma === MaYeuTo.NGUYET_HAI,
).map((rule) => ({
  ...rule,
  ma: rule.ma.replace(/^KHAI_TRUONG_Q10_/, 'CHAN_THA_GIA_SUC_GIA_CAM_Q10_'),
  boNen: undefined,
  moTa: thayTen(rule.moTa),
  nguon: rule.nguon.map((source) => ({
    ...source,
    ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
  })),
}));

export const QUY_TAC_Q10_CHAN_THA_GIA_SUC_GIA_CAM: readonly QuyTacXungDotDataDriven[] = [
  ...EARTHWORK_CORE,
  ...TU_THAN,
  ...NGUYET_HAI,
  {
    ma: 'CHAN_THA_GIA_SUC_GIA_CAM_Q10_NGUYET_KY_BO_NEN',
    dieuKien: { coTatCaYeuTo: [MaYeuTo.NGUYET_KY] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 200,
    moTa: 'Nguyệt Kị nhật: Q10 không chú Nên chăn thả gia súc, gia cầm; bỏ Nên, không tự tạo Kị.',
    nguon: nguonHanQ10('月忌日', 'WYG_010-71a..71b'),
  },
];

function chuyenSangChanTha(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^EARTHWORK_Q10_/, 'CHAN_THA_GIA_SUC_GIA_CAM_Q10_'),
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('earthwork', 'chăn thả gia súc, gia cầm')
    .replaceAll('Động thổ', 'Chăn thả gia súc, gia cầm')
    .replaceAll('động thổ', 'chăn thả gia súc, gia cầm')
    .replaceAll('Khai trương', 'Chăn thả gia súc, gia cầm')
    .replaceAll('khai trương', 'chăn thả gia súc, gia cầm')
    .replaceAll('kết quả theo rule NGUYET_HINH', 'kết quả theo Nguyệt Hình')
    .replaceAll('kết quả theo rule NGUYET_SAT', 'kết quả theo Nguyệt Sát')
    .replaceAll('kết quả theo rule KIEP_SAT', 'kết quả theo Kiếp Sát')
    .replaceAll('kết quả theo rule NGUYET_PHA', 'kết quả theo Nguyệt Phá')
    .replaceAll('kết quả theo rule NGUYET_YEM', 'kết quả theo Nguyệt Yếm')
    .replaceAll('kết quả theo rule TRUC_BINH', 'kết quả theo Bình nhật');
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
