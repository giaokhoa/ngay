import { DieuKienDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { DieuKienQ10, PhepXuLyXungDot, QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;

const CAT_NGUYET_KIEN = [
  ...DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.NGUYET_AN,
  MaYeuTo.TU_TUONG,
] as const;

const CAT_TU_KY_CUNG = [MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC_HOP] as const;

const CAT_PHUC_TRONG = [
  ...DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.LUC_HOP,
  MaYeuTo.THIEN_NGUYEN,
] as const;

const BO_NEN_O_PHE = [Y(MaYeuTo.O_PHE)] as const;

const YEU_TO_CHUNG_KHAI_TRUONG = new Set<MaYeuTo>([
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_MO,
]);

const TRUC_CHUNG = new Set<ThapNhiTruc>([ThapNhiTruc.BINH, ThapNhiTruc.THU]);

const QUY_TAC_CHUNG: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_KHAI_TRUONG.filter(laQuyTacChungKhaiTruong).map(chuyenRuleSangAnTang);

const QUY_TAC_NGUYET_YEM_BASE: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_CONG_VIEC_DAT.filter(
    (rule) =>
      rule.mucTieu?.loai === 'YEU_TO' &&
      rule.mucTieu.ma === MaYeuTo.NGUYET_YEM &&
      !rule.ma.includes('DUONG_THAC'),
  ).map(chuyenRuleSangAnTang);

const QUY_TAC_NGUYET_YEM_DAC_BIET: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_CONG_VIEC_DAT.filter((rule) => !rule.mucTieu).map(chuyenGlobalSpecialSangAnTang);

export const QUY_TAC_Q10_AN_TANG: readonly QuyTacXungDotDataDriven[] = [
  ...QUY_TAC_CHUNG,

  // Nguyệt Kiến — gặp nhóm cát source nêu thì an táng không còn trong residual Kị.
  rule(
    'AN_TANG_Q10_NGUYET_KIEN_CAT_BO_KY',
    Y(MaYeuTo.NGUYET_KIEN),
    787,
    'Nguyệt Kiến',
    '月建',
    80,
    { loai: 'BO_KY' },
    { coBatKyYeuTo: CAT_NGUYET_KIEN },
  ),
  rule('AN_TANG_Q10_NGUYET_KIEN_GIU_KY', Y(MaYeuTo.NGUYET_KIEN), 787, 'Nguyệt Kiến', '月建', 10, {
    loai: 'GIU_KY',
  }),

  ...QUY_TAC_NGUYET_YEM_BASE,
  ...QUY_TAC_NGUYET_YEM_DAC_BIET,

  // Tứ Kị
  rule(
    'AN_TANG_Q10_TU_KY_DAN_AT_HOI_THIEN_NGUYEN_BO_KY',
    Y(MaYeuTo.TU_KY),
    817,
    'Tứ Kị',
    '四忌',
    100,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.DAN],
      canNgay: [ThienCan.AT],
      chiNgay: [DiaChi.HOI],
      coTatCaYeuTo: [MaYeuTo.THIEN_NGUYEN],
    },
  ),
  rule(
    'AN_TANG_Q10_TU_KY_CAT_VAN_KY',
    Y(MaYeuTo.TU_KY),
    817,
    'Tứ Kị',
    '四忌',
    80,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: CAT_TU_KY_CUNG },
  ),
  rule('AN_TANG_Q10_TU_KY_GIU_KY', Y(MaYeuTo.TU_KY), 817, 'Tứ Kị', '四忌', 10, {
    loai: 'GIU_KY',
  }),

  // Tứ Cùng
  rule(
    'AN_TANG_Q10_TU_CUNG_DAN_AT_HOI_THIEN_NGUYEN_BO_KY',
    Y(MaYeuTo.TU_CUNG),
    817,
    'Tứ Cùng',
    '四窮',
    100,
    { loai: 'BO_KY' },
    {
      chiThang: [DiaChi.DAN],
      canNgay: [ThienCan.AT],
      chiNgay: [DiaChi.HOI],
      coTatCaYeuTo: [MaYeuTo.THIEN_NGUYEN],
    },
  ),
  rule(
    'AN_TANG_Q10_TU_CUNG_CAT_VAN_KY',
    Y(MaYeuTo.TU_CUNG),
    817,
    'Tứ Cùng',
    '四窮',
    80,
    { loai: 'GIU_KY_DU_CO_CAT' },
    { coBatKyYeuTo: CAT_TU_KY_CUNG },
  ),
  rule('AN_TANG_Q10_TU_CUNG_GIU_KY', Y(MaYeuTo.TU_CUNG), 817, 'Tứ Cùng', '四窮', 10, {
    loai: 'GIU_KY',
  }),

  ...quyTacPhucTrong(MaYeuTo.PHUC_NHAT, 'PHUC_NHAT', 'Phục Nhật', '復日'),
  ...quyTacPhucTrong(MaYeuTo.TRONG_NHAT, 'TRONG_NHAT', 'Trọng Nhật', '重日'),
];

function laQuyTacChungKhaiTruong(rule: QuyTacXungDotDataDriven): boolean {
  if (!rule.mucTieu) return false;

  if (rule.mucTieu.loai === 'YEU_TO') {
    return YEU_TO_CHUNG_KHAI_TRUONG.has(rule.mucTieu.ma);
  }

  if (rule.mucTieu.loai === 'TRUC') {
    return TRUC_CHUNG.has(rule.mucTieu.truc);
  }

  return false;
}

function chuyenRuleSangAnTang(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma
      .replace(/^KHAI_TRUONG_Q10_/, 'AN_TANG_Q10_')
      .replace(/^EARTHWORK_Q10_/, 'AN_TANG_Q10_'),
    moTa: doiChu(rule.moTa),
    nguon: rule.nguon.map((nguon) => ({
      ...nguon,
      ghiChu: nguon.ghiChu ? doiChu(nguon.ghiChu) : undefined,
    })),
  };
}

function chuyenGlobalSpecialSangAnTang(
  ruleNguon: QuyTacXungDotDataDriven,
): QuyTacXungDotDataDriven {
  const ma = ruleNguon.ma.replace(/^EARTHWORK_Q10_/, 'AN_TANG_Q10_');
  const phepXuLy = doiPhepXuLySpecial(ruleNguon);

  const trang =
    ruleNguon.nguon.find((nguon) => nguon.loaiNguon === LoaiNguon.BAN_VIET)?.trang ?? 808;

  return {
    ma,
    dieuKien: ruleNguon.dieuKien,
    phepXuLy,
    precedence: ruleNguon.precedence,
    moTa: moTaSpecial(ma, phepXuLy),
    nguon: taoNguon(trang, 'Nguyệt Yếm — ngày đặc biệt', '月厭', moTaSpecial(ma, phepXuLy)),
    boNen: ruleNguon.boNen,
  };
}

function doiPhepXuLySpecial(ruleNguon: QuyTacXungDotDataDriven): PhepXuLyXungDot {
  if (ruleNguon.phepXuLy.loai === 'CAM_MOI_VIEC') {
    return ruleNguon.phepXuLy;
  }

  if (ruleNguon.phepXuLy.loai === 'THEM_KY') {
    if (ruleNguon.ma.includes('DUONG_THAC_')) {
      return { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_KIEN) };
    }
    if (ruleNguon.ma.includes('AM_THAC_')) {
      return { loai: 'DELEGATE', den: Y(MaYeuTo.NGUYET_YEM) };
    }
    return { loai: 'THEM_KY' };
  }

  throw new Error('Global special-day source rule không hỗ trợ cho AN_TANG: ' + ruleNguon.ma);
}

function moTaSpecial(ma: string, phepXuLy: PhepXuLyXungDot): string {
  if (phepXuLy.loai === 'CAM_MOI_VIEC') {
    return 'Nguyệt Yếm — ngày đặc biệt: mọi việc đều Kị.';
  }

  if (phepXuLy.loai === 'DELEGATE') {
    if (ma.includes('DUONG_THAC_')) {
      return 'Dương thác theo chỗ Kị của Nguyệt Kiến cho an táng.';
    }
    return 'Âm thác theo chỗ Kị của Nguyệt Yếm cho an táng.';
  }

  if (phepXuLy.loai === 'THEM_KY') {
    return 'Tuế bạc / Trục trận giữ Kị riêng theo Quyển 10 cho an táng.';
  }

  return 'Ngày đặc biệt Quyển 10 cho an táng.';
}

function quyTacPhucTrong(
  maYeuTo: MaYeuTo,
  suffix: string,
  muc: string,
  tenGoc: string,
): readonly QuyTacXungDotDataDriven[] {
  return [
    rule(
      `AN_TANG_Q10_${suffix}_CAT_BO_KY`,
      Y(maYeuTo),
      823,
      muc,
      tenGoc,
      100,
      { loai: 'BO_KY' },
      { coBatKyYeuTo: CAT_PHUC_TRONG },
      'Gặp Đức/Xá/Lục Hợp thì bỏ Kị; Thiên Nguyện được tính trong Lục Hợp semantics.',
    ),
    rule(
      `AN_TANG_Q10_${suffix}_O_PHE_VAN_KY`,
      Y(maYeuTo),
      823,
      muc,
      tenGoc,
      80,
      { loai: 'GIU_KY' },
      { coTatCaYeuTo: [MaYeuTo.O_PHE] },
      'Gặp Ô Phệ mà không có cát giải thì Phục/Trọng vẫn Kị; loại contribution Nên Ô Phệ.',
      BO_NEN_O_PHE,
    ),
    rule(`AN_TANG_Q10_${suffix}_GIU_KY`, Y(maYeuTo), 823, muc, tenGoc, 10, { loai: 'GIU_KY' }),
  ];
}

function rule(
  ma: string,
  mucTieu: DieuKienDungSu,
  trang: number,
  muc: string,
  tenGoc: string,
  precedence: number,
  phepXuLy: PhepXuLyXungDot,
  dieuKien?: DieuKienQ10,
  ghiChu?: string,
  boNen?: readonly DieuKienDungSu[],
): QuyTacXungDotDataDriven {
  return {
    ma,
    mucTieu,
    dieuKien,
    phepXuLy,
    precedence,
    moTa: ghiChu ?? moTaPhepXuLy(muc, phepXuLy),
    nguon: taoNguon(trang, muc, tenGoc, ghiChu),
    boNen,
  };
}

function taoNguon(
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChu?: string,
): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 10,
      trang,
      muc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: tenGoc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
  ];
}

function moTaPhepXuLy(muc: string, phepXuLy: PhepXuLyXungDot): string {
  switch (phepXuLy.loai) {
    case 'GIU_KY':
      return muc + ': giữ Kị an táng theo Quyển 10.';
    case 'GIU_KY_DU_CO_CAT':
      return muc + ': an táng vẫn Kị dù gặp cát thần source nêu.';
    case 'BO_KY':
    case 'CHI_CON_QUAN_Y':
      return muc + ': bỏ Kị an táng theo Quyển 10.';
    case 'CAN_BANG':
      return muc + ': cát/hung cân bằng; không tự sinh Nên.';
    case 'CAM_MOI_VIEC':
      return muc + ': mọi việc đều Kị.';
    case 'DELEGATE':
      return muc + ': kết quả theo target được source chỉ định.';
    case 'THEM_KY':
      return muc + ': thêm Kị an táng theo Quyển 10.';
    case 'BO_NEN':
      return muc + ': bỏ contribution Nên được source chỉ rõ.';
  }
}

function doiChu(value: string): string {
  return value
    .replaceAll('KHAI_TRUONG', 'AN_TANG')
    .replaceAll('Khai trương', 'An táng')
    .replaceAll('khai trương', 'an táng')
    .replaceAll('earthwork', 'an táng')
    .replaceAll('Earthwork', 'An táng');
}
