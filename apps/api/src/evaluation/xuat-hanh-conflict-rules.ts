import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_DI_CHUYEN } from './di-chuyen-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;

const YEU_TO_CHUNG = new Set<MaYeuTo>([
  MaYeuTo.NGUYET_PHA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DAI_THOI,
  MaYeuTo.THIEN_LAI,
  MaYeuTo.TU_PHE,
  MaYeuTo.NGU_MO,
  MaYeuTo.VANG_VONG,
]);

const TRUC_CHUNG = new Set<ThapNhiTruc>([ThapNhiTruc.BINH, ThapNhiTruc.THU, ThapNhiTruc.BE]);

/**
 * Q10 đặt “đế vương xuất hành, sai sứ” và “di chuyển” trong cùng các
 * danh sách/nhánh cho các blocker chung đã source-lock. Derive trực tiếp
 * từ matrix DI_CHUYEN để tránh drift, nhưng dùng whitelist target thay vì
 * thừa kế mọi rule DI_CHUYEN trong tương lai.
 *
 * Global rule được chia sẻ chỉ là các special-day thuộc Nguyệt Yếm.
 */
const QUY_TAC_Q10_CHUNG_VOI_DI_CHUYEN: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_DI_CHUYEN.filter(laQuyTacChung).map((rule) => ({
    ...rule,
    ma: rule.ma.replace(/^DI_CHUYEN_Q10_/, 'XUAT_HANH_Q10_'),
    moTa: chuyenMoTaSangXuatHanh(rule.moTa),
  }));

export const QUY_TAC_Q10_XUAT_HANH: readonly QuyTacXungDotDataDriven[] = [
  ...QUY_TAC_Q10_CHUNG_VOI_DI_CHUYEN,
  {
    ma: 'XUAT_HANH_Q10_THIEN_TAC_DUC_HOP_VAN_KY',
    mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.THIEN_TAC },
    dieuKien: { coBatKyYeuTo: DUC_HOP },
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 80,
    moTa: 'Thiên Tặc vẫn Kị đế vương xuất hành / sai sứ dù gặp Đức/Hợp.',
    nguon: taoNguonThienTac(),
  },
];

function laQuyTacChung(rule: QuyTacXungDotDataDriven): boolean {
  if (!rule.mucTieu) {
    return rule.ma.startsWith('DI_CHUYEN_Q10_NGUYET_YEM_');
  }

  if (rule.mucTieu.loai === 'YEU_TO') {
    return YEU_TO_CHUNG.has(rule.mucTieu.ma);
  }

  if (rule.mucTieu.loai === 'TRUC') {
    return TRUC_CHUNG.has(rule.mucTieu.truc);
  }

  return false;
}

function chuyenMoTaSangXuatHanh(moTa: string): string {
  return moTa
    .replaceAll('DI_CHUYEN', 'XUAT_HANH')
    .replaceAll('Di chuyển', 'Xuất hành')
    .replaceAll('di chuyển', 'xuất hành');
}

function taoNguonThienTac(): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 10,
      trang: 815,
      muc: 'Thiên Tặc',
      tenGoc: '天賊',
      ghiChu:
        'Kị đế vương xuất hành, sai sứ; gặp Đức/Hợp vẫn Kị. Bản Việt ghi Xá, Nguyện không gộp được với Thiên Tặc.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: '天賊',
      tenGoc: '天賊',
      ghiChu: 'Đối chiếu Hán Q10 cùng semantics.',
      daXacMinh: true,
    },
  ];
}
