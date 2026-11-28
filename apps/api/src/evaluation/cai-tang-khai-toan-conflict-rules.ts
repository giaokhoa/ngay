import { DieuKienDungSu } from '../activities/activity-rule';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_AN_TANG } from './an-tang-conflict-rules';
import { DieuKienQ10, QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const NEN_O_PHE_DOI = [Y(MaYeuTo.O_PHE_DOI)] as const;

const TARGETS = new Set<string>([
  'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
  'YEU_TO:' + MaYeuTo.NGUYET_PHA,
  'TRUC:BINH',
  'TRUC:THU',
  'YEU_TO:' + MaYeuTo.KIEP_SAT,
  'YEU_TO:' + MaYeuTo.TAI_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_SAT,
  'YEU_TO:' + MaYeuTo.NGUYET_HINH,
  'YEU_TO:' + MaYeuTo.NGUYET_HAI,
  'YEU_TO:' + MaYeuTo.NGUYET_YEM,
  'YEU_TO:' + MaYeuTo.TU_PHE,
  'YEU_TO:' + MaYeuTo.NGU_MO,
  'YEU_TO:' + MaYeuTo.PHUC_NHAT,
  'YEU_TO:' + MaYeuTo.TRONG_NHAT,
]);

const NGUON_NGUYET_KY: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '月忌日',
    tenGoc: '月忌日',
    daXacMinh: true,
    ghiChu:
      'WYG_010-71a..71b: 啓攢 không nằm trong danh sách 止註; 餘事不註, nên bỏ Nên mà không tự tạo Kị.',
  },
];

export const QUY_TAC_Q10_CAI_TANG_KHAI_TOAN: readonly QuyTacXungDotDataDriven[] = [
  ...QUY_TAC_Q10_AN_TANG.filter((rule) => !rule.mucTieu || TARGETS.has(khoa(rule.mucTieu))).map(
    chuyenRule,
  ),
  {
    ma: 'CAI_TANG_KHAI_TOAN_Q10_NGUYET_KY_BO_NEN',
    dieuKien: { coTatCaYeuTo: [MaYeuTo.NGUYET_KY] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 280,
    moTa: 'Nguyệt Kị nhật: Q10 không chú Nên cải táng, khai toản; bỏ Nên, không tự tạo Kị.',
    nguon: NGUON_NGUYET_KY,
  },
];

function chuyenRule(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  const isPhucTrong =
    rule.mucTieu?.loai === 'YEU_TO' &&
    (rule.mucTieu.ma === MaYeuTo.PHUC_NHAT || rule.mucTieu.ma === MaYeuTo.TRONG_NHAT);
  const isPhucTrongOPhe =
    isPhucTrong && (rule.dieuKien?.coTatCaYeuTo?.includes(MaYeuTo.O_PHE) ?? false);

  return {
    ...rule,
    ma: rule.ma.replace(/^AN_TANG_Q10_/, 'CAI_TANG_KHAI_TOAN_Q10_'),
    dieuKien: isPhucTrongOPhe ? doiOPheSangOPheDoi(rule.dieuKien) : rule.dieuKien,
    boNen:
      rule.phepXuLy.loai === 'CAN_BANG' || isPhucTrong
        ? [...(rule.boNen ?? []).filter((target) => !laOPhe(target)), ...NEN_O_PHE_DOI]
        : rule.boNen,
    moTa: doiChu(rule.moTa),
    nguon: rule.nguon.map((nguon) => ({
      ...nguon,
      ghiChu: nguon.ghiChu ? doiChu(nguon.ghiChu) : undefined,
    })),
  };
}

function doiOPheSangOPheDoi(dieuKien: DieuKienQ10 | undefined): DieuKienQ10 | undefined {
  if (!dieuKien?.coTatCaYeuTo) return dieuKien;
  return {
    ...dieuKien,
    coTatCaYeuTo: dieuKien.coTatCaYeuTo.map((ma) =>
      ma === MaYeuTo.O_PHE ? MaYeuTo.O_PHE_DOI : ma,
    ),
  };
}

function laOPhe(target: DieuKienDungSu): boolean {
  return target.loai === 'YEU_TO' && target.ma === MaYeuTo.O_PHE;
}

function doiChu(value: string): string {
  return value
    .replaceAll('AN_TANG', 'CAI_TANG_KHAI_TOAN')
    .replaceAll('An táng', 'Cải táng, khai toản')
    .replaceAll('an táng', 'cải táng, khai toản')
    .replaceAll('Ô Phệ', 'Ô Phệ Đối');
}

function khoa(target: DieuKienDungSu): string {
  if (target.loai === 'YEU_TO') return 'YEU_TO:' + target.ma;
  if (target.loai === 'TRUC') return 'TRUC:' + target.truc;
  if (target.loai === 'CHI_NGAY') return 'CHI_NGAY:' + target.chi;
  if (target.loai === 'CAN_NGAY') return 'CAN_NGAY:' + target.can;
  if (target.loai === 'NGAY_AM') return 'NGAY_AM:' + target.ngay;
  return target.loai;
}
