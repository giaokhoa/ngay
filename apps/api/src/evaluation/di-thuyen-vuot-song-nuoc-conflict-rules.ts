import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;
const HAI_DUC = [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC] as const;
const THANG_TU_SINH = [DiaChi.DAN, DiaChi.THAN, DiaChi.TI, DiaChi.HOI] as const;

export const QUY_TAC_Q10_DI_THUYEN_VUOT_SONG_NUOC: readonly QuyTacXungDotDataDriven[] = [
  ...QUY_TAC_Q10_NHAP_HOC.map((rule) => ({
    ...rule,
    ma: rule.ma.replace(/^NHAP_HOC_Q10_/, 'DI_THUYEN_VUOT_SONG_NUOC_Q10_'),
  })),

  // 厭對(招搖) — WYG_010-51b..52a.
  targetRule(
    'CHIEU_DIEU_CAT_BO_KY',
    MaYeuTo.CHIEU_DIEU,
    90,
    { loai: 'BO_KY' },
    'Chiêu Diêu gặp bốn Đức/Hợp hoặc Thiên Xá thì bỏ Kị đi thuyền vượt sông nước.',
    nguon('厭對(招搖)', 'WYG_010-51b..52a'),
    { coBatKyYeuTo: [...DUC_HOP, MaYeuTo.THIEN_XA] },
  ),
  targetRule(
    'CHIEU_DIEU_GIU_KY',
    MaYeuTo.CHIEU_DIEU,
    10,
    { loai: 'GIU_KY' },
    'Chiêu Diêu giữ Kị đi thuyền vượt sông nước khi không có cát thần giải theo Q10.',
    nguon('厭對(招搖)', 'WYG_010-51b..52a'),
  ),

  // 大時(咸池) — custom activity semantics from WYG_010-52b..53b.
  targetRule(
    'HAM_TRI_TU_SINH_BO_KY',
    MaYeuTo.DAI_THOI,
    90,
    { loai: 'BO_KY' },
    'Hàm Trì/Đại Thời ở tháng Dần, Thân, Tỵ, Hợi: ngoài quân sự thì các việc khác không Kị.',
    nguon('大時(咸池)', 'WYG_010-52b..53b'),
    { chiThang: THANG_TU_SINH },
  ),
  targetRule(
    'HAM_TRI_THIN_TUAT_BO_KY',
    MaYeuTo.DAI_THOI,
    90,
    { loai: 'BO_KY' },
    'Hàm Trì/Đại Thời tháng Thìn, Tuất gặp Chấp nhật Lục Hợp: ngoài quân sự thì không Kị.',
    nguon('大時(咸池)', 'WYG_010-52b..53b'),
    { chiThang: [DiaChi.THIN, DiaChi.TUAT] },
  ),
  targetRule(
    'HAM_TRI_SUU_MUI_HAI_DUC_BO_KY',
    MaYeuTo.DAI_THOI,
    90,
    { loai: 'BO_KY' },
    'Hàm Trì/Đại Thời tháng Sửu, Mùi gặp Thiên Đức hoặc Nguyệt Đức thì ngoài quân sự không Kị.',
    nguon('大時(咸池)', 'WYG_010-52b..53b'),
    { chiThang: [DiaChi.SUU, DiaChi.MUI], coBatKyYeuTo: HAI_DUC },
  ),
  targetRule(
    'HAM_TRI_TY_NGO_NGUYET_DUC_HOP_CAN_BANG',
    MaYeuTo.DAI_THOI,
    85,
    { loai: 'CAN_BANG' },
    'Hàm Trì/Đại Thời tháng Tý, Ngọ gặp Nguyệt Đức Hợp: Kị/Nên cân bằng, không giữ Kị đi thuyền.',
    nguon('大時(咸池)', 'WYG_010-52b..53b'),
    { chiThang: [DiaChi.TY, DiaChi.NGO], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC_HOP] },
  ),
  targetRule(
    'HAM_TRI_DAU_NGUYET_DUC_CAN_BANG',
    MaYeuTo.DAI_THOI,
    85,
    { loai: 'CAN_BANG' },
    'Hàm Trì/Đại Thời tháng Dậu gặp Nguyệt Đức: Kị/Nên cân bằng, không giữ Kị đi thuyền.',
    nguon('大時(咸池)', 'WYG_010-52b..53b'),
    { chiThang: [DiaChi.DAU], coTatCaYeuTo: [MaYeuTo.NGUYET_DUC] },
  ),
  targetRule(
    'HAM_TRI_MAO_DUC_HOP_BO_KY',
    MaYeuTo.DAI_THOI,
    95,
    { loai: 'BO_KY' },
    'Hàm Trì tháng Mão theo Nguyệt Hình; gặp Đức/Hợp thì trở về Kị thường Nguyệt Hình, mà đi thuyền không nằm trong danh sách Kị thường.',
    nguon('大時(咸池) → 月刑', 'WYG_010-52b..53b; WYG_010-43b..45a'),
    { chiThang: [DiaChi.MAO], coBatKyYeuTo: DUC_HOP },
  ),
  targetRule(
    'HAM_TRI_MAO_KHONG_DUC_HARD',
    MaYeuTo.DAI_THOI,
    94,
    { loai: 'CAM_MOI_VIEC' },
    'Hàm Trì tháng Mão theo Nguyệt Hình; không có Đức/Hợp thì Q10 xác định mọi việc đều Kị.',
    nguon('大時(咸池) → 月刑', 'WYG_010-52b..53b; WYG_010-43b..45a'),
    { chiThang: [DiaChi.MAO], khongCoBatKyYeuTo: DUC_HOP },
  ),
  targetRule(
    'HAM_TRI_GIU_KY',
    MaYeuTo.DAI_THOI,
    10,
    { loai: 'GIU_KY' },
    'Hàm Trì/Đại Thời giữ Kị đi thuyền vượt sông nước ở các trường hợp còn lại.',
    nguon('大時(咸池)', 'WYG_010-52b..53b'),
  ),

  // 八風 — WYG_010-60a..60b.
  targetRule(
    'BAT_PHONG_CAT_BO_KY',
    MaYeuTo.BAT_PHONG,
    90,
    { loai: 'BO_KY' },
    'Bát Phong gặp bốn Đức/Hợp hoặc Lục Hợp thì gió định, bỏ Kị đi thuyền vượt sông nước.',
    nguon('八風', 'WYG_010-60a..60b'),
    { coBatKyYeuTo: [...DUC_HOP, MaYeuTo.LUC_HOP] },
  ),
  targetRule(
    'BAT_PHONG_GIU_KY',
    MaYeuTo.BAT_PHONG,
    10,
    { loai: 'GIU_KY' },
    'Bát Phong giữ Kị đi thuyền vượt sông nước khi không có cát thần giải.',
    nguon('八風', 'WYG_010-60a..60b'),
  ),

  // 九坎 — WYG_010-61b..62a: 與德合併猶忌.
  targetRule(
    'CUU_KHAM_VAN_KY',
    MaYeuTo.CUU_KHAM,
    100,
    { loai: 'GIU_KY_DU_CO_CAT' },
    'Cửu Khảm vẫn Kị đi thuyền vượt sông nước dù gặp Đức/Hợp.',
    nguon('九坎(九焦)', 'WYG_010-61b..62a'),
  ),

  // 觸水龍 — WYG_010-66b..67a: 與德合天願併猶忌.
  targetRule(
    'XUC_THUY_LONG_VAN_KY',
    MaYeuTo.XUC_THUY_LONG,
    100,
    { loai: 'GIU_KY_DU_CO_CAT' },
    'Xúc Thủy Long vẫn Kị đi thuyền vượt sông nước dù gặp Đức/Hợp hoặc Thiên Nguyện.',
    nguon('觸水龍', 'WYG_010-66b..67a'),
  ),
];

function targetRule(
  suffix: string,
  ma: MaYeuTo,
  precedence: number,
  phepXuLy: QuyTacXungDotDataDriven['phepXuLy'],
  moTa: string,
  nguonRule: readonly ThamChieuNguon[],
  dieuKien?: QuyTacXungDotDataDriven['dieuKien'],
): QuyTacXungDotDataDriven {
  return {
    ma: 'DI_THUYEN_VUOT_SONG_NUOC_Q10_' + suffix,
    mucTieu: Y(ma),
    dieuKien,
    phepXuLy,
    precedence,
    moTa,
    nguon: nguonRule,
  };
}

function nguon(muc: string, anchor: string): readonly ThamChieuNguon[] {
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
