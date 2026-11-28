import { DieuKienDungSu } from '../activities/activity-rule';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QUY_TAC_Q10_GIAI_TRU } from './giai-tru-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const EARTHWORK_TARGETS = new Set<string>([
  'YEU_TO:' + MaYeuTo.NGUYET_KIEN,
  'YEU_TO:' + MaYeuTo.THO_PHU,
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
  'YEU_TO:' + MaYeuTo.THO_PHU_TIN,
  'YEU_TO:' + MaYeuTo.DIA_NANG,
  'THO_VUONG',
]);

const EARTHWORK_CORE = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) => !rule.mucTieu || EARTHWORK_TARGETS.has(khoa(rule.mucTieu)),
).map(chuyenSangTrongTrot);

// 死神 shares the Bình-day position but Q11 lists it separately for 栽種.
const TU_THAN = QUY_TAC_Q10_CONG_VIEC_DAT.filter(
  (rule) => rule.mucTieu?.loai === 'TRUC' && rule.mucTieu.truc === ThapNhiTruc.BINH,
).map((rule) => ({
  ...chuyenSangTrongTrot(rule),
  ma: rule.ma.replace(/^EARTHWORK_Q10_BINH_/, 'TRONG_TROT_Q10_TU_THAN_'),
  mucTieu: Y(MaYeuTo.TU_THAN),
  moTa: thayTen(rule.moTa).replaceAll('Bình nhật', 'Tử Thần'),
}));

// 死氣: four virtue factors release 栽種, except 辰戌 month + 月厭 remains Kị.
const TU_KHI = QUY_TAC_Q10_GIAI_TRU.filter(
  (rule) => rule.mucTieu?.loai === 'YEU_TO' && rule.mucTieu.ma === MaYeuTo.TU_KHI,
).map((rule) => ({
  ...rule,
  ma: rule.ma.replace(/^GIAI_TRU_Q10_/, 'TRONG_TROT_Q10_'),
  moTa: rule.moTa.replaceAll('Giải trừ', 'Trồng trọt').replaceAll('giải trừ', 'trồng trọt'),
}));

const SPECIAL: readonly QuyTacXungDotDataDriven[] = [
  {
    ma: 'TRONG_TROT_Q10_DIA_HOA_VAN_KY',
    mucTieu: Y(MaYeuTo.DIA_HOA),
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 130,
    moTa: 'Địa Hỏa chuyên Kị trồng trọt; nhánh cát giải Nguyệt Yếm không xóa Kị Địa Hỏa.',
    nguon: nguonHanQ10('月厭(地火)', 'WYG_010-47a..49a'),
  },
  {
    ma: 'TRONG_TROT_Q10_CUU_TIEU_VAN_KY',
    mucTieu: Y(MaYeuTo.CUU_KHAM),
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 130,
    moTa: 'Cửu Tiêu (cùng vị trí Cửu Khảm) vẫn Kị trồng trọt dù gặp Đức/Hợp.',
    nguon: nguonHanQ10('九坎(九焦)', 'WYG_010-61b..62a'),
  },
  {
    ma: 'TRONG_TROT_Q10_NGUYET_KY_BO_NEN',
    dieuKien: { coTatCaYeuTo: [MaYeuTo.NGUYET_KY] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 200,
    moTa: 'Nguyệt Kị nhật: Q10 không chú Nên trồng trọt; bỏ Nên, không tự tạo Kị.',
    nguon: nguonHanQ10('月忌日', 'WYG_010-71a..71b'),
  },
];

export const QUY_TAC_Q10_TRONG_TROT: readonly QuyTacXungDotDataDriven[] = [
  ...EARTHWORK_CORE,
  ...TU_THAN,
  ...TU_KHI,
  ...SPECIAL,
];

function chuyenSangTrongTrot(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  const laNguyetYemResidualTrongTrot =
    rule.ma === 'EARTHWORK_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_BO_KY';
  return {
    ...rule,
    ma: rule.ma.replace(/^EARTHWORK_Q10_/, 'TRONG_TROT_Q10_'),
    phepXuLy: laNguyetYemResidualTrongTrot ? { loai: 'GIU_KY_DU_CO_CAT' as const } : rule.phepXuLy,
    moTa: laNguyetYemResidualTrongTrot
      ? 'Nguyệt Yếm tháng Dần/Thân/Sửu/Mùi dù gặp cát vẫn Kị Trồng trọt; nguồn ghi 栽種 trong residual Kị.'
      : thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('earthwork', 'trồng trọt')
    .replaceAll('Động thổ', 'Trồng trọt')
    .replaceAll('động thổ', 'trồng trọt')
    .replaceAll('kết quả theo rule NGUYET_HINH', 'kết quả theo Nguyệt Hình')
    .replaceAll('kết quả theo rule NGUYET_SAT', 'kết quả theo Nguyệt Sát')
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
