import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CAU_PHUC } from './cau-phuc-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const T = (truc: ThapNhiTruc): DieuKienDungSu => ({ loai: 'TRUC', truc });

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;
const RESIDUAL_MEDICAL = new Set<string>([
  'TRUC:BINH',
  'TRUC:THU',
  'YEU_TO:KIEP_SAT',
  'YEU_TO:TAI_SAT',
  'YEU_TO:NGUYET_SAT',
  'YEU_TO:NGUYET_HINH',
  'YEU_TO:NGUYET_HAI',
  'YEU_TO:NGUYET_YEM',
  'YEU_TO:THIEN_LAI',
]);

const TARGETS_FROM_KHAI_TRUONG = new Set<string>([
  'TRUC:BINH',
  'TRUC:THU',
  'TRUC:BE',
  'YEU_TO:KIEP_SAT',
  'YEU_TO:TAI_SAT',
  'YEU_TO:NGUYET_SAT',
  'YEU_TO:NGUYET_HINH',
  'YEU_TO:NGUYET_HAI',
  'YEU_TO:NGUYET_YEM',
  'YEU_TO:DAI_THOI',
  'YEU_TO:THIEN_LAI',
  'YEU_TO:TU_PHE',
  'YEU_TO:NGU_MO',
]);

const NGUYET_YEM_STANDARD = new Set([
  'KHAI_TRUONG_Q10_NGUYET_YEM_MAO_DAU_HARD',
  'KHAI_TRUONG_Q10_NGUYET_YEM_TY_NGO_HARD',
  'KHAI_TRUONG_Q10_NGUYET_YEM_TY_NGO_XA_GIU_KY',
  'KHAI_TRUONG_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_BO_KY',
  'KHAI_TRUONG_Q10_NGUYET_YEM_THIN_TUAT_TI_HOI_CAN_BANG',
  'KHAI_TRUONG_Q10_NGUYET_YEM_GIU_KY',
]);

const CORE_TARGETS = QUY_TAC_Q10_KHAI_TRUONG.filter((rule) => {
  if (!rule.mucTieu) return false;
  const key = khoa(rule.mucTieu);
  if (!TARGETS_FROM_KHAI_TRUONG.has(key)) return false;
  if (key === 'YEU_TO:NGUYET_YEM' && !NGUYET_YEM_STANDARD.has(rule.ma)) return false;
  return true;
}).map(chuyenSangCauY);

const BINH_CHO_TU_THAN = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => rule.mucTieu?.loai === 'TRUC' && rule.mucTieu.truc === ThapNhiTruc.BINH,
).map((rule) => ({
  ...chuyenSangCauY(rule),
  ma: rule.ma.replace(/^KHAI_TRUONG_Q10_BINH_/, 'CAU_Y_TRI_BENH_Q10_TU_THAN_'),
  mucTieu: Y(MaYeuTo.TU_THAN),
  moTa: rule.moTa.replaceAll('Bình nhật', 'Tử Thần trên Bình nhật'),
}));

const KIEN_SHARED = QUY_TAC_Q10_CAU_PHUC.filter(
  (rule) => rule.mucTieu?.loai === 'TRUC' && rule.mucTieu.truc === ThapNhiTruc.KIEN,
).map(chuyenSangCauY);

const UNIVERSAL_HARD = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => !rule.mucTieu && rule.phepXuLy.loai === 'CAM_MOI_VIEC',
).map(chuyenSangCauY);

export const QUY_TAC_Q10_CAU_Y_TRI_BENH: readonly QuyTacXungDotDataDriven[] = [
  ...UNIVERSAL_HARD,
  ...KIEN_SHARED,
  ...CORE_TARGETS,
  ...BINH_CHO_TU_THAN,

  // 滿日: only these six month groups can be released, and only by the exact listed cát set.
  {
    ma: 'CAU_Y_TRI_BENH_Q10_MAN_CAT_BO_KY',
    mucTieu: T(ThapNhiTruc.MAN),
    dieuKien: {
      chiThang: [DiaChi.DAN, DiaChi.THAN, DiaChi.TY, DiaChi.NGO, DiaChi.MAO, DiaChi.DAU],
      coBatKyYeuTo: [
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.NGUYET_AN,
        MaYeuTo.TU_TUONG,
      ],
    },
    phepXuLy: { loai: 'BO_KY' },
    precedence: 80,
    moTa: 'Mãn nhật ở nhóm tháng được cát thần nguồn nêu rõ thì bỏ Kị cầu y/trị bệnh.',
    nguon: nguonHanQ10('滿日', 'WYG_010-36b..37a'),
  },
  {
    ma: 'CAU_Y_TRI_BENH_Q10_MAN_GIU_KY',
    mucTieu: T(ThapNhiTruc.MAN),
    phepXuLy: { loai: 'GIU_KY' },
    precedence: 10,
    moTa: 'Mãn nhật giữ Kị cầu y/trị bệnh khi không có nhánh giải hợp lệ.',
    nguon: nguonHanQ10('滿日', 'WYG_010-36b..37a'),
  },

  // 月破 normally exempts 求醫療病; overlap branches explicitly restore Kị / hard-ban.
  globalRule(
    'CAU_Y_TRI_BENH_Q10_NGUYET_PHA_MAO_DAU_HARD',
    {
      chiThang: [DiaChi.MAO, DiaChi.DAU],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    },
    { loai: 'CAM_MOI_VIEC' },
    150,
    'Nguyệt Phá + Tai Sát + Nguyệt Yếm tháng Mão/Dậu: mọi việc đều Kị kể cả trị bệnh.',
    '月破',
    'WYG_010-29b..30a',
  ),
  globalRule(
    'CAU_Y_TRI_BENH_Q10_NGUYET_PHA_TY_NGO_HARD',
    {
      chiThang: [DiaChi.TY, DiaChi.NGO],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
      khongCoBatKyYeuTo: DUC_HOP,
    },
    { loai: 'CAM_MOI_VIEC' },
    140,
    'Nguyệt Phá tháng Tý/Ngọ hội Tai Sát, không Đức: mọi việc đều Kị.',
    '月破',
    'WYG_010-29b..30a',
  ),
  globalRule(
    'CAU_Y_TRI_BENH_Q10_NGUYET_PHA_TY_NGO_KY_BO_SUNG',
    {
      chiThang: [DiaChi.TY, DiaChi.NGO],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
      coBatKyYeuTo: DUC_HOP,
    },
    { loai: 'THEM_KY' },
    130,
    'Nguyệt Phá tháng Tý/Ngọ hội Tai Sát: gặp Đức vẫn riêng Kị cầu y/trị bệnh.',
    '月破',
    'WYG_010-29b..30a',
  ),
  globalRule(
    'CAU_Y_TRI_BENH_Q10_NGUYET_PHA_MUI_THAN_HARD',
    {
      chiThang: [DiaChi.MUI, DiaChi.THAN],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_HINH],
      khongCoBatKyYeuTo: DUC_HOP,
    },
    { loai: 'CAM_MOI_VIEC' },
    140,
    'Nguyệt Phá tháng Mùi/Thân hội Nguyệt Hình, không Đức: mọi việc đều Kị.',
    '月破',
    'WYG_010-29b..30a',
  ),
  globalRule(
    'CAU_Y_TRI_BENH_Q10_NGUYET_PHA_MUI_THAN_KY_BO_SUNG',
    {
      chiThang: [DiaChi.MUI, DiaChi.THAN],
      coTatCaYeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_HINH],
      coBatKyYeuTo: DUC_HOP,
    },
    { loai: 'THEM_KY' },
    130,
    'Nguyệt Phá tháng Mùi/Thân hội Nguyệt Hình: gặp Đức vẫn riêng Kị cầu y/trị bệnh.',
    '月破',
    'WYG_010-29b..30a',
  ),

  keepAlways('CAU_Y_TRI_BENH_Q10_DU_HOA_VAN_KY', MaYeuTo.DU_HOA, '遊禍', 'WYG_010-53b..54a'),
  keepAlways('CAU_Y_TRI_BENH_Q10_TU_KHI_VAN_KY', MaYeuTo.TU_KHI, '死氣', 'WYG_010-55b..56a'),
  keepAlways('CAU_Y_TRI_BENH_Q10_VANG_VONG_VAN_KY', MaYeuTo.VANG_VONG, '徃亡', 'WYG_010-63b..64a'),
];

function chuyenSangCauY(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  const targetKey = rule.mucTieu ? khoa(rule.mucTieu) : null;
  let phepXuLy = rule.phepXuLy;
  if (targetKey && RESIDUAL_MEDICAL.has(targetKey) && phepXuLy.loai === 'BO_KY') {
    phepXuLy = { loai: 'GIU_KY_DU_CO_CAT' };
  }
  return {
    ...rule,
    ma: rule.ma
      .replace(/^KHAI_TRUONG_Q10_/, 'CAU_Y_TRI_BENH_Q10_')
      .replace(/^CAU_PHUC_Q10_/, 'CAU_Y_TRI_BENH_Q10_'),
    phepXuLy,
    boNen: undefined,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function keepAlways(
  ma: string,
  factor: MaYeuTo,
  muc: string,
  anchor: string,
): QuyTacXungDotDataDriven {
  return {
    ma,
    mucTieu: Y(factor),
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 100,
    moTa: `${muc} vẫn Kị cầu y/trị bệnh dù gặp cát thần.`,
    nguon: nguonHanQ10(muc, anchor),
  };
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
    .replaceAll('Khai trương', 'Cầu y/trị bệnh')
    .replaceAll('khai trương', 'cầu y/trị bệnh')
    .replaceAll('Cầu phúc', 'Cầu y/trị bệnh')
    .replaceAll('cầu phúc', 'cầu y/trị bệnh');
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
