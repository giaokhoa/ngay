import { DieuKienDungSu } from '../activities/activity-rule';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const NEN_MINH_PHE: readonly DieuKienDungSu[] = [Y(MaYeuTo.O_PHE), Y(MaYeuTo.O_PHE_DOI)];
const CAT_PHUC_TRONG = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.LUC_HOP,
  MaYeuTo.THIEN_NGUYEN,
] as const;

const TARGETS_EARTHWORK = new Set<string>([
  'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
  'YEU_TO:' + MaYeuTo.THO_PHU,
  'YEU_TO:' + MaYeuTo.NGUYET_PHA,
  'TRUC:BINH',
  'TRUC:THU',
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.TU_PHE,
  'YEU_TO:' + MaYeuTo.NGU_MO,
  'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
  'YEU_TO:' + MaYeuTo.DIA_NANG,
  'THO_VUONG',
]);

const EARTHWORK_RULES = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) => !rule.mucTieu || TARGETS_EARTHWORK.has(khoa(rule.mucTieu)),
).map(chuyenRule);

const NGUYET_HAI_RULES = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => rule.mucTieu?.loai === 'YEU_TO' && rule.mucTieu.ma === MaYeuTo.NGUYET_HAI,
).map(chuyenRule);

const NGUON_PHUC_TRONG: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 10,
    trang: 823,
    muc: 'Phục Nhật - Trọng Nhật',
    tenGoc: '復日 重日',
    daXacMinh: true,
    ghiChu:
      'Kị Phá thổ/An táng/Khải toản; gặp Đức/Hợp/Xá/Lục Hợp thì bỏ Kị. Khi Phục/Trọng còn Kị, không để Ô Phệ/Ô Phệ Đối tạo verdict Nên song song.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '復日 重日',
    tenGoc: '復日 重日',
    daXacMinh: true,
    ghiChu: 'WYG_010-64a..65a: 忌破土安葬啟攢; 與天德月德天德合月德合天赦六合併則不忌亦不註宜.',
  },
];

const NGUON_NGUYET_KY: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '月忌日',
    tenGoc: '月忌日',
    daXacMinh: true,
    ghiChu:
      'WYG_010-71a..71b: 破土 không nằm trong danh sách 止註; 餘事不註, nên bỏ Nên mà không tự tạo Kị.',
  },
];

export const QUY_TAC_Q10_PHA_VO_DAT: readonly QuyTacXungDotDataDriven[] = [
  ...EARTHWORK_RULES,
  ...NGUYET_HAI_RULES,
  ...quyTacPhucTrong(MaYeuTo.PHUC_NHAT, 'PHUC_NHAT', 'Phục Nhật'),
  ...quyTacPhucTrong(MaYeuTo.TRONG_NHAT, 'TRONG_NHAT', 'Trọng Nhật'),
  {
    ma: 'PHA_VO_DAT_Q10_NGUYET_KY_BO_NEN',
    dieuKien: { coTatCaYeuTo: [MaYeuTo.NGUYET_KY] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 280,
    moTa: 'Nguyệt Kị nhật: Q10 không chú Nên phá, vỡ đất; bỏ Nên, không tự tạo Kị.',
    nguon: NGUON_NGUYET_KY,
  },
];

function quyTacPhucTrong(
  maYeuTo: MaYeuTo,
  suffix: string,
  muc: string,
): readonly QuyTacXungDotDataDriven[] {
  return [
    {
      ma: `PHA_VO_DAT_Q10_${suffix}_CAT_BO_KY`,
      mucTieu: Y(maYeuTo),
      dieuKien: { coBatKyYeuTo: CAT_PHUC_TRONG },
      phepXuLy: { loai: 'BO_KY' },
      precedence: 100,
      moTa: `${muc}: gặp Đức/Hợp, Thiên Xá hoặc Lục Hợp thì bỏ Kị phá, vỡ đất.`,
      nguon: NGUON_PHUC_TRONG,
    },
    {
      ma: `PHA_VO_DAT_Q10_${suffix}_GIU_KY`,
      mucTieu: Y(maYeuTo),
      phepXuLy: { loai: 'GIU_KY' },
      precedence: 10,
      moTa: `${muc}: giữ Kị phá, vỡ đất; loại Nên Ô Phệ/Ô Phệ Đối nếu đồng hiện.`,
      nguon: NGUON_PHUC_TRONG,
      boNen: NEN_MINH_PHE,
    },
  ];
}

function chuyenRule(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma
      .replace(/^EARTHWORK_Q10_/, 'PHA_VO_DAT_Q10_')
      .replace(/^KHAI_TRUONG_Q10_/, 'PHA_VO_DAT_Q10_'),
    boNen:
      rule.phepXuLy.loai === 'CAN_BANG' ? [...(rule.boNen ?? []), ...NEN_MINH_PHE] : rule.boNen,
    moTa: doiChu(rule.moTa),
    nguon: rule.nguon.map((nguon) => ({
      ...nguon,
      ghiChu: nguon.ghiChu ? doiChu(nguon.ghiChu) : undefined,
    })),
  };
}

function doiChu(value: string): string {
  return value
    .replaceAll('KHAI_TRUONG', 'PHA_VO_DAT')
    .replaceAll('Khai trương', 'Phá, vỡ đất')
    .replaceAll('khai trương', 'phá, vỡ đất')
    .replaceAll('earthwork', 'phá, vỡ đất')
    .replaceAll('Earthwork', 'Phá, vỡ đất');
}

function khoa(target: DieuKienDungSu): string {
  if (target.loai === 'YEU_TO') return 'YEU_TO:' + target.ma;
  if (target.loai === 'TRUC') return 'TRUC:' + target.truc;
  if (target.loai === 'CHI_NGAY') return 'CHI_NGAY:' + target.chi;
  if (target.loai === 'CAN_NGAY') return 'CAN_NGAY:' + target.can;
  if (target.loai === 'NGAY_AM') return 'NGAY_AM:' + target.ngay;
  return target.loai;
}
