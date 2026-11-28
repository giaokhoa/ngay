import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CAU_PHUC } from './cau-phuc-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;

const TARGET_YEU_TO_CHUNG = new Set<MaYeuTo>([
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_MO,
]);
const TARGET_TRUC_CHUNG = new Set<ThapNhiTruc>([ThapNhiTruc.BINH, ThapNhiTruc.THU]);

const CORE_SHARED: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter((rule) => {
  if (!rule.mucTieu) return rule.phepXuLy.loai === 'CAM_MOI_VIEC';
  if (rule.mucTieu.loai === 'YEU_TO') return TARGET_YEU_TO_CHUNG.has(rule.mucTieu.ma);
  if (rule.mucTieu.loai === 'TRUC') return TARGET_TRUC_CHUNG.has(rule.mucTieu.truc);
  return false;
}).map(chuyenSangGiaiTru);

const TU_THAN_THEO_BINH: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => rule.mucTieu?.loai === 'TRUC' && rule.mucTieu.truc === ThapNhiTruc.BINH,
).map((rule) => ({
  ...chuyenSangGiaiTru(rule),
  ma: rule.ma.replace(/^KHAI_TRUONG_Q10_BINH_/, 'GIAI_TRU_Q10_TU_THAN_'),
  mucTieu: Y(MaYeuTo.TU_THAN),
  moTa: rule.moTa.replaceAll('Bình nhật', 'Tử Thần trên Bình nhật'),
}));

const KIEN_SHARED: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_CAU_PHUC.filter(
  (rule) => rule.mucTieu?.loai === 'TRUC' && rule.mucTieu.truc === ThapNhiTruc.KIEN,
).map((rule) => ({
  ...rule,
  ma: rule.ma.replace(/^CAU_PHUC_Q10_/, 'GIAI_TRU_Q10_'),
  moTa: thayTen(rule.moTa),
  nguon: rule.nguon.map((source) => ({
    ...source,
    ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
  })),
}));

export const QUY_TAC_Q10_GIAI_TRU: readonly QuyTacXungDotDataDriven[] = [
  ...KIEN_SHARED,
  ...CORE_SHARED,
  ...TU_THAN_THEO_BINH,

  // 月破 ordinarily exempts 解除. These overlap branches explicitly restore Kị / hard-ban.
  globalRule(
    'GIAI_TRU_Q10_NGUYET_PHA_MAO_DAU_HARD',
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    },
    { loai: 'CAM_MOI_VIEC' },
    150,
    'Nguyệt Phá + Tai Sát + Nguyệt Yếm tháng Mão/Dậu: mọi việc đều Kị dù gặp Đức.',
    '月破',
    'WYG_010-29b..30a',
  ),
  globalRule(
    'GIAI_TRU_Q10_NGUYET_PHA_TY_NGO_HARD',
    {
      chiThang: [DiaChi.TY, DiaChi.NGO],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
      khongCoBatKyYeuTo: DUC_HOP,
    },
    { loai: 'CAM_MOI_VIEC' },
    130,
    'Nguyệt Phá tháng Tý/Ngọ hội Tai Sát, không có Đức: mọi việc đều Kị.',
    '月破',
    'WYG_010-29b..30a',
  ),
  globalRule(
    'GIAI_TRU_Q10_NGUYET_PHA_MUI_THAN_HARD',
    {
      chiThang: [DiaChi.MUI, DiaChi.THAN],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_HINH],
      khongCoBatKyYeuTo: DUC_HOP,
    },
    { loai: 'CAM_MOI_VIEC' },
    130,
    'Nguyệt Phá tháng Mùi/Thân hội Nguyệt Hình, không có Đức: mọi việc đều Kị.',
    '月破',
    'WYG_010-29b..30a',
  ),
  globalRule(
    'GIAI_TRU_Q10_NGUYET_PHA_TY_NGO_KY_BO_SUNG',
    {
      chiThang: [DiaChi.TY, DiaChi.NGO],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
      coBatKyYeuTo: DUC_HOP,
    },
    { loai: 'THEM_KY' },
    120,
    'Nguyệt Phá tháng Tý/Ngọ hội Tai Sát: dù gặp Đức vẫn Kị Giải trừ.',
    '月破',
    'WYG_010-29b..30a',
  ),
  globalRule(
    'GIAI_TRU_Q10_NGUYET_PHA_MUI_THAN_KY_BO_SUNG',
    {
      chiThang: [DiaChi.MUI, DiaChi.THAN],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_HINH],
      coBatKyYeuTo: DUC_HOP,
    },
    { loai: 'THEM_KY' },
    120,
    'Nguyệt Phá tháng Mùi/Thân hội Nguyệt Hình: dù gặp Đức vẫn Kị Giải trừ.',
    '月破',
    'WYG_010-29b..30a',
  ),

  // 遊禍: 與德合天赦併猶忌.
  {
    ma: 'GIAI_TRU_Q10_DU_HOA_VAN_KY',
    mucTieu: Y(MaYeuTo.DU_HOA),
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 100,
    moTa: 'Du Họa vẫn Kị Giải trừ dù gặp Đức/Hợp hoặc Thiên Xá.',
    nguon: nguonHanQ10('遊禍', 'WYG_010-53b..54a'),
  },

  // 死氣: four virtue factors release 解除, except 辰戌月與月厭 remains Kị.
  {
    ma: 'GIAI_TRU_Q10_TU_KHI_THIN_TUAT_NGUYET_YEM_VAN_KY',
    mucTieu: Y(MaYeuTo.TU_KHI),
    dieuKien: {
      chiThang: [DiaChi.THIN, DiaChi.TUAT],
      coTatCaYeuTo: [MaYeuTo.NGUYET_YEM],
      coBatKyYeuTo: DUC_HOP,
    },
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 100,
    moTa: 'Tử Khí tháng Thìn/Tuất hội Nguyệt Yếm vẫn Kị Giải trừ dù gặp Đức.',
    nguon: nguonHanQ10('死氣', 'WYG_010-55b..56a'),
  },
  {
    ma: 'GIAI_TRU_Q10_TU_KHI_DUC_BO_KY',
    mucTieu: Y(MaYeuTo.TU_KHI),
    dieuKien: { coBatKyYeuTo: DUC_HOP },
    phepXuLy: { loai: 'BO_KY' },
    precedence: 80,
    moTa: 'Tử Khí gặp Thiên/Nguyệt Đức hoặc Đức Hợp: Giải trừ được giải Kị.',
    nguon: nguonHanQ10('死氣', 'WYG_010-55b..56a'),
  },
  {
    ma: 'GIAI_TRU_Q10_TU_KHI_GIU_KY',
    mucTieu: Y(MaYeuTo.TU_KHI),
    phepXuLy: { loai: 'GIU_KY' },
    precedence: 10,
    moTa: 'Tử Khí giữ Kị Giải trừ khi không có nhánh giải hợp lệ.',
    nguon: nguonHanQ10('死氣', 'WYG_010-55b..56a'),
  },
];

function chuyenSangGiaiTru(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^KHAI_TRUONG_Q10_/, 'GIAI_TRU_Q10_'),
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('Khai trương', 'Giải trừ')
    .replaceAll('khai trương', 'giải trừ')
    .replaceAll('Cầu phúc', 'Giải trừ')
    .replaceAll('cầu phúc', 'giải trừ');
}

function globalRule(
  ma: string,
  dieuKien: NonNullable<QuyTacXungDotDataDriven['dieuKien']>,
  phepXuLy: QuyTacXungDotDataDriven['phepXuLy'],
  precedence: number,
  moTa: string,
  muc: string,
  anchor: string,
): QuyTacXungDotDataDriven {
  return { ma, dieuKien, phepXuLy, precedence, moTa, nguon: nguonHanQ10(muc, anchor) };
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
