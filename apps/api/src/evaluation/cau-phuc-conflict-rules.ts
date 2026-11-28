import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const TARGET_YEU_TO_CHUNG = new Set<MaYeuTo>([
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
]);
const TARGET_TRUC_CHUNG = new Set<ThapNhiTruc>([ThapNhiTruc.BINH, ThapNhiTruc.THU]);

const CAT_GIAI_KIEN = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
] as const;
const CAT_GIAI_KIEN_TRU_THIEN_DUC_HOP = CAT_GIAI_KIEN.filter((ma) => ma !== MaYeuTo.THIEN_DUC_HOP);

const CORE_SHARED: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter((rule) => {
  if (!rule.mucTieu) return rule.phepXuLy.loai === 'CAM_MOI_VIEC';
  if (rule.mucTieu.loai === 'YEU_TO') return TARGET_YEU_TO_CHUNG.has(rule.mucTieu.ma);
  if (rule.mucTieu.loai === 'TRUC') return TARGET_TRUC_CHUNG.has(rule.mucTieu.truc);
  return false;
}).map(chuyenSangCauPhuc);

export const QUY_TAC_Q10_CAU_PHUC: readonly QuyTacXungDotDataDriven[] = [
  // WYG_010-74a..74b: 天狗/寅日忌祭祀時，不註宜求福祈嗣 — suppress Nên, do not invent Kị.
  {
    ma: 'CAU_PHUC_Q10_THIEN_CAU_BO_NEN',
    dieuKien: { coTatCaYeuTo: [MaYeuTo.THIEN_CAU] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 200,
    moTa: 'Ngày Thiên Cẩu không ghi Nên Cầu phúc; không tạo Kị riêng cho Cầu phúc.',
    nguon: nguonHanQ10('天狗寅日', 'WYG_010-74a..74b'),
  },
  {
    ma: 'CAU_PHUC_Q10_DAN_BO_NEN',
    dieuKien: { chiNgay: [DiaChi.DAN] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 200,
    moTa: 'Ngày Dần không ghi Nên Cầu phúc; không tạo Kị riêng cho Cầu phúc.',
    nguon: nguonHanQ10('天狗寅日', 'WYG_010-74a..74b'),
  },
  // 月建 — WYG_010-27a..28b.
  {
    ma: 'CAU_PHUC_Q10_KIEN_KY_MUI_DUC_HOP_VAN_KY',
    mucTieu: T(ThapNhiTruc.KIEN),
    dieuKien: {
      chiThang: [DiaChi.MUI],
      canNgay: [ThienCan.KY],
      chiNgay: [DiaChi.MUI],
      coTatCaYeuTo: [MaYeuTo.THIEN_DUC_HOP],
      khongCoBatKyYeuTo: CAT_GIAI_KIEN_TRU_THIEN_DUC_HOP,
    },
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 120,
    moTa: 'Kiến nhật tháng Mùi ngày Kỷ Mùi là Dương Thác, không lấy riêng Thiên Đức Hợp để giải Kị Cầu phúc.',
    nguon: nguonHanQ10('月建', 'WYG_010-27a..28b'),
  },
  {
    ma: 'CAU_PHUC_Q10_KIEN_CAT_BO_KY',
    mucTieu: T(ThapNhiTruc.KIEN),
    dieuKien: { coBatKyYeuTo: CAT_GIAI_KIEN },
    phepXuLy: { loai: 'BO_KY' },
    precedence: 80,
    moTa: 'Kiến nhật gặp Đức/Hợp, Thiên Xá, Nguyệt Ân hoặc Tứ Tướng: ngoài việc đất thì các Kị thường được giải, nên bỏ Kị Cầu phúc.',
    nguon: nguonHanQ10('月建', 'WYG_010-27a..28b'),
  },
  {
    ma: 'CAU_PHUC_Q10_KIEN_GIU_KY',
    mucTieu: T(ThapNhiTruc.KIEN),
    phepXuLy: { loai: 'GIU_KY' },
    precedence: 10,
    moTa: 'Kiến nhật giữ Kị Cầu phúc khi không có cát thần giải theo Q10.',
    nguon: nguonHanQ10('月建', 'WYG_010-27a..28b'),
  },

  ...CORE_SHARED,

  // 遊禍 — WYG_010-53b..54a: 與德合天赦併猶忌.
  {
    ma: 'CAU_PHUC_Q10_DU_HOA_VAN_KY',
    mucTieu: Y(MaYeuTo.DU_HOA),
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 100,
    moTa: 'Du Họa vẫn Kị Cầu phúc dù gặp Đức/Hợp hoặc Thiên Xá.',
    nguon: nguonHanQ10('遊禍', 'WYG_010-53b..54a'),
  },
];

function chuyenSangCauPhuc(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^KHAI_TRUONG_Q10_/, 'CAU_PHUC_Q10_'),
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('Khai trương', 'Cầu phúc')
    .replaceAll('khai trương', 'cầu phúc')
    .replaceAll('KHAI_TRUONG', 'CAU_PHUC');
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
