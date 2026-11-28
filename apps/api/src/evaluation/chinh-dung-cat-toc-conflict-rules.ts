import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CAU_PHUC } from './cau-phuc-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const TARGET_YEU_TO = new Set<MaYeuTo>([
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
]);

const SHARED_TARGETS: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_KHAI_TRUONG.filter(
  (rule) => {
    if (!rule.mucTieu) return rule.phepXuLy.loai === 'CAM_MOI_VIEC';
    return rule.mucTieu.loai === 'YEU_TO' && TARGET_YEU_TO.has(rule.mucTieu.ma);
  },
).map(chuyenSangChinhDung);

const KIEN_SHARED: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_CAU_PHUC.filter(
  (rule) => rule.mucTieu?.loai === 'TRUC' && rule.mucTieu.truc === ThapNhiTruc.KIEN,
).map(chuyenSangChinhDung);

export const QUY_TAC_Q10_CHINH_DUNG_CAT_TOC: readonly QuyTacXungDotDataDriven[] = [
  {
    ma: 'CHINH_DUNG_CAT_TOC_Q10_TU_PHE_NGUYET_PHA_HARD',
    dieuKien: { coTatCaYeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] },
    phepXuLy: { loai: 'CAM_MOI_VIEC' },
    precedence: 230,
    moTa: 'Tứ Phế hội Nguyệt Phá: Q10 ghi mọi việc đều Kị, kể cả việc thường được miễn Tứ Phế.',
    nguon: nguonHanQ10('四廢', 'WYG_010-58a..58b'),
  },
  // 百忌日 + 表例: 丁日忌剃頭，亦不註宜整容.
  {
    ma: 'CHINH_DUNG_CAT_TOC_Q10_DINH_BO_NEN',
    dieuKien: { canNgay: [ThienCan.DINH] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 220,
    moTa: 'Ngày Đinh Kị cắt tóc và đồng thời không ghi Nên chỉnh dung.',
    nguon: nguonHanQ10('百忌日 / 表例', 'WYG_010-72a; WYG_010-74b'),
  },
  ...KIEN_SHARED,
  ...SHARED_TARGETS,
];

function chuyenSangChinhDung(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma
      .replace(/^KHAI_TRUONG_Q10_/, 'CHINH_DUNG_CAT_TOC_Q10_')
      .replace(/^CAU_PHUC_Q10_/, 'CHINH_DUNG_CAT_TOC_Q10_'),
    boNen: undefined,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('Khai trương', 'Chỉnh dung/cắt tóc')
    .replaceAll('khai trương', 'chỉnh dung/cắt tóc')
    .replaceAll('Cầu phúc', 'Chỉnh dung/cắt tóc')
    .replaceAll('cầu phúc', 'chỉnh dung/cắt tóc');
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
