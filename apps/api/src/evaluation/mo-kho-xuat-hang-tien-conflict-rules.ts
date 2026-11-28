import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;
const CAT_GIAI_KIEN = [...DUC_HOP, MaYeuTo.THIEN_XA, MaYeuTo.NGUYET_AN, MaYeuTo.TU_TUONG] as const;
const CAT_GIAI_KIEN_TRU_THIEN_DUC_HOP = CAT_GIAI_KIEN.filter((ma) => ma !== MaYeuTo.THIEN_DUC_HOP);
const CAT_GIAI_NGU_HU = [...DUC_HOP, MaYeuTo.LUC_HOP] as const;

const TARGETS = new Set<string>([
  'TRUC:' + ThapNhiTruc.BINH,
  'TRUC:' + ThapNhiTruc.THU,
  'TRUC:' + ThapNhiTruc.BE,
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
).map(chuyenSangMoKho);
const UNIVERSAL_HARD: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => !rule.mucTieu && rule.phepXuLy.loai === 'CAM_MOI_VIEC',
).map(chuyenSangMoKho);

export const QUY_TAC_Q10_MO_KHO_XUAT_HANG_TIEN: readonly QuyTacXungDotDataDriven[] = [
  ...UNIVERSAL_HARD,

  // 月建 — WYG_010-27a..28b. Warehouse is not in the residual land/building list after cát relief.
  {
    ma: 'MO_KHO_XUAT_HANG_TIEN_Q10_NGUYET_KIEN_KY_MUI_DUC_HOP_VAN_KY',
    mucTieu: Y(MaYeuTo.NGUYET_KIEN),
    dieuKien: {
      chiThang: [DiaChi.MUI],
      canNgay: [ThienCan.KY],
      chiNgay: [DiaChi.MUI],
      coTatCaYeuTo: [MaYeuTo.THIEN_DUC_HOP],
      khongCoBatKyYeuTo: CAT_GIAI_KIEN_TRU_THIEN_DUC_HOP,
    },
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 120,
    moTa: 'Nguyệt Kiến tháng Mùi ngày Kỷ Mùi là Dương Thác, không lấy riêng Thiên Đức Hợp để giải Kị mở kho/xuất hàng tiền.',
    nguon: nguonHanQ10('月建', 'WYG_010-27a..28b'),
  },
  {
    ma: 'MO_KHO_XUAT_HANG_TIEN_Q10_NGUYET_KIEN_CAT_BO_KY',
    mucTieu: Y(MaYeuTo.NGUYET_KIEN),
    dieuKien: { coBatKyYeuTo: CAT_GIAI_KIEN },
    phepXuLy: { loai: 'BO_KY' },
    precedence: 80,
    moTa: 'Nguyệt Kiến gặp Đức/Hợp, Thiên Xá, Nguyệt Ân hoặc Tứ Tướng thì bỏ Kị mở kho/xuất hàng tiền.',
    nguon: nguonHanQ10('月建', 'WYG_010-27a..28b'),
  },
  {
    ma: 'MO_KHO_XUAT_HANG_TIEN_Q10_NGUYET_KIEN_GIU_KY',
    mucTieu: Y(MaYeuTo.NGUYET_KIEN),
    phepXuLy: { loai: 'GIU_KY' },
    precedence: 10,
    moTa: 'Nguyệt Kiến giữ Kị mở kho/xuất hàng tiền khi không có cát thần giải theo Q10.',
    nguon: nguonHanQ10('月建', 'WYG_010-27a..28b'),
  },

  ...TARGET_RULES,

  // 天賊 — WYG_010-56b: 與德合併猶忌.
  {
    ma: 'MO_KHO_XUAT_HANG_TIEN_Q10_THIEN_TAC_DUC_HOP_VAN_KY',
    mucTieu: Y(MaYeuTo.THIEN_TAC),
    dieuKien: { coBatKyYeuTo: DUC_HOP },
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 100,
    moTa: 'Thiên Tặc vẫn Kị mở kho/xuất hàng tiền dù gặp Đức/Hợp.',
    nguon: nguonHanQ10('天賊', 'WYG_010-56b'),
  },

  // 五虚 — WYG_010-59b..60a.
  {
    ma: 'MO_KHO_XUAT_HANG_TIEN_Q10_NGU_HU_CAT_BO_KY',
    mucTieu: Y(MaYeuTo.NGU_HU),
    dieuKien: { coBatKyYeuTo: CAT_GIAI_NGU_HU },
    phepXuLy: { loai: 'BO_KY' },
    precedence: 90,
    moTa: 'Ngũ Hư gặp Đức/Hợp hoặc Lục Hợp thì bỏ Kị mở kho/xuất hàng tiền.',
    nguon: nguonHanQ10('五虚', 'WYG_010-59b..60a'),
  },
  {
    ma: 'MO_KHO_XUAT_HANG_TIEN_Q10_NGU_HU_GIU_KY',
    mucTieu: Y(MaYeuTo.NGU_HU),
    phepXuLy: { loai: 'GIU_KY' },
    precedence: 10,
    moTa: 'Ngũ Hư giữ Kị mở kho/xuất hàng tiền khi không có Đức/Hợp hoặc Lục Hợp giải.',
    nguon: nguonHanQ10('五虚', 'WYG_010-59b..60a'),
  },
];

function chuyenSangMoKho(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^KHAI_TRUONG_Q10_/, 'MO_KHO_XUAT_HANG_TIEN_Q10_'),
    boNen: undefined,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
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
    .replaceAll('Khai trương', 'Mở kho/xuất hàng tiền')
    .replaceAll('khai trương', 'mở kho/xuất hàng tiền');
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
