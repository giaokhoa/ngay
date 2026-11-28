import { QUY_TAC_AN_GIUONG } from '../activities/an-giuong-rules';
import { QUY_TAC_AN_TANG } from '../activities/an-tang-rules';
import { QUY_TAC_CAU_PHUC } from '../activities/cau-phuc-rules';
import { QUY_TAC_CAU_TU } from '../activities/cau-tu-rules';
import { QUY_TAC_CUOI_HOI } from '../activities/cuoi-hoi-rules';
import { QUY_TAC_DI_CHUYEN } from '../activities/di-chuyen-rules';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from '../activities/earthwork-rules';
import { QUY_TAC_KHAI_TRUONG } from '../activities/khai-truong-rules';
import { QUY_TAC_KHANH_THUONG } from '../activities/khanh-thuong-rules';
import { QUY_TAC_NHAP_HOC } from '../activities/nhap-hoc-rules';
import { QUY_TAC_QUAN_DAI } from '../activities/quan-dai-rules';
import { QUY_TAC_TE_TU } from '../activities/te-tu-rules';
import { QUY_TAC_YEN_HOI } from '../activities/yen-hoi-rules';
import { LoaiCongViec, QuyTacDungSu } from '../activities/activity-rule';
import {
  QUY_TAC_XUAT_HANH_BO_SUNG_Q10,
  QUY_TAC_XUAT_HANH_Q11,
} from '../activities/xuat-hanh-rules';
import { QUY_TAC_Q10_AN_GIUONG } from '../evaluation/an-giuong-conflict-rules';
import { QUY_TAC_Q10_AN_TANG } from '../evaluation/an-tang-conflict-rules';
import { QUY_TAC_Q10_CAU_PHUC } from '../evaluation/cau-phuc-conflict-rules';
import { QUY_TAC_Q10_CAU_TU } from '../evaluation/cau-tu-conflict-rules';
import {
  QUY_TAC_XUNG_DOT_CUOI_HOI,
  taoNguonXungDotQuyen10,
} from '../evaluation/cuoi-hoi-conflict-rules';
import { QUY_TAC_Q10_CUOI_HOI_Q4 } from '../evaluation/cuoi-hoi-q4-conflict-rules';
import { QUY_TAC_Q10_DI_CHUYEN } from '../evaluation/di-chuyen-conflict-rules';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from '../evaluation/earthwork-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from '../evaluation/khai-truong-conflict-rules';
import { QUY_TAC_Q10_KHANH_THUONG } from '../evaluation/khanh-thuong-conflict-rules';
import { QUY_TAC_Q10_NHAP_HOC } from '../evaluation/nhap-hoc-conflict-rules';
import { QUY_TAC_Q10_QUAN_DAI } from '../evaluation/quan-dai-conflict-rules';
import { QUY_TAC_Q10_TE_TU } from '../evaluation/te-tu-conflict-rules';
import { QuyTacXungDotDataDriven } from '../evaluation/q10-rule-resolver';
import { QUY_TAC_Q10_XUAT_HANH } from '../evaluation/xuat-hanh-conflict-rules';
import { QUY_TAC_Q10_YEN_HOI } from '../evaluation/yen-hoi-conflict-rules';
import { ThamChieuNguon } from '../sources/source-reference';

export type LopTriThuc = 'Q10' | 'Q11';
export type KieuQuyTacTriThuc = 'ACTIVITY' | 'CONFLICT' | 'LEGACY_CONFLICT';

export interface HoatDongTriThuc {
  code: LoaiCongViec;
  tenViet: string;
  tenHan: string;
}

export interface QuyTacTriThuc {
  hoatDong: LoaiCongViec;
  lop: LopTriThuc;
  kieu: KieuQuyTacTriThuc;
  ma: string;
  tacDong?: string;
  phepXuLy?: string;
  mucTieu?: unknown;
  dieuKien?: unknown;
  precedence?: number;
  moTa?: string;
  nguon: readonly ThamChieuNguon[];
}

export interface DanhMucTriThuc {
  hoatDong: readonly HoatDongTriThuc[];
  quyTac: readonly QuyTacTriThuc[];
}

export const HOAT_DONG_TRI_THUC: readonly HoatDongTriThuc[] = [
  { code: LoaiCongViec.CUOI_HOI, tenViet: 'Cưới hỏi', tenHan: '嫁娶' },
  { code: LoaiCongViec.DI_CHUYEN, tenViet: 'Di chuyển', tenHan: '般移〈移徙同〉' },
  { code: LoaiCongViec.AN_GIUONG, tenViet: 'Kê giường', tenHan: '安牀' },
  { code: LoaiCongViec.QUAN_DAI, tenViet: 'Quan đới', tenHan: '冠帶' },
  { code: LoaiCongViec.NHAP_HOC, tenViet: 'Nhập học', tenHan: '入學' },
  { code: LoaiCongViec.YEN_HOI, tenViet: 'Yến hội', tenHan: '宴會〈會親友同〉' },
  { code: LoaiCongViec.KHANH_THUONG, tenViet: 'Chúc mừng ban thưởng', tenHan: '慶賜賞賀' },
  { code: LoaiCongViec.TE_TU, tenViet: 'Cúng tế', tenHan: '祭祀' },
  { code: LoaiCongViec.CAU_PHUC, tenViet: 'Cầu phúc', tenHan: '祈福' },
  { code: LoaiCongViec.CAU_TU, tenViet: 'Cầu tự', tenHan: '求嗣' },
  { code: LoaiCongViec.DONG_THO, tenViet: 'Khởi tạo động thổ', tenHan: '興造動土' },
  { code: LoaiCongViec.SUA_CUNG_THAT, tenViet: 'Sửa cung thất', tenHan: '修宮室' },
  { code: LoaiCongViec.KHAI_TRUONG, tenViet: 'Khai trương', tenHan: '開市' },
  { code: LoaiCongViec.XUAT_HANH, tenViet: 'Xuất hành', tenHan: '行幸遣使〈出行同〉' },
  { code: LoaiCongViec.AN_TANG, tenViet: 'An táng', tenHan: '安葬' },
];

export function taoDanhMucTriThuc(): DanhMucTriThuc {
  return {
    hoatDong: HOAT_DONG_TRI_THUC,
    quyTac: [
      ...activityRules(QUY_TAC_CUOI_HOI),
      ...activityRules(QUY_TAC_DI_CHUYEN),
      ...activityRules(QUY_TAC_AN_GIUONG),
      ...activityRules(QUY_TAC_QUAN_DAI),
      ...activityRules(QUY_TAC_NHAP_HOC),
      ...activityRules(QUY_TAC_YEN_HOI),
      ...activityRules(QUY_TAC_KHANH_THUONG),
      ...activityRules(QUY_TAC_TE_TU),
      ...activityRules(QUY_TAC_CAU_PHUC),
      ...activityRules(QUY_TAC_CAU_TU),
      ...activityRules(QUY_TAC_DONG_THO),
      ...activityRules(QUY_TAC_SUA_CUNG_THAT),
      ...activityRules(QUY_TAC_KHAI_TRUONG),
      ...activityRules(QUY_TAC_XUAT_HANH_Q11),
      ...activityRules(QUY_TAC_XUAT_HANH_BO_SUNG_Q10, 'Q10'),
      ...activityRules(QUY_TAC_AN_TANG),
      ...legacyWeddingConflictRules(),
      ...conflictRules(LoaiCongViec.CUOI_HOI, QUY_TAC_Q10_CUOI_HOI_Q4),
      ...conflictRules(LoaiCongViec.DI_CHUYEN, QUY_TAC_Q10_DI_CHUYEN),
      ...conflictRules(LoaiCongViec.AN_GIUONG, QUY_TAC_Q10_AN_GIUONG),
      ...conflictRules(LoaiCongViec.QUAN_DAI, QUY_TAC_Q10_QUAN_DAI),
      ...conflictRules(LoaiCongViec.NHAP_HOC, QUY_TAC_Q10_NHAP_HOC),
      ...conflictRules(LoaiCongViec.YEN_HOI, QUY_TAC_Q10_YEN_HOI),
      ...conflictRules(LoaiCongViec.KHANH_THUONG, QUY_TAC_Q10_KHANH_THUONG),
      ...conflictRules(LoaiCongViec.TE_TU, QUY_TAC_Q10_TE_TU),
      ...conflictRules(LoaiCongViec.CAU_PHUC, QUY_TAC_Q10_CAU_PHUC),
      ...conflictRules(LoaiCongViec.CAU_TU, QUY_TAC_Q10_CAU_TU),
      ...conflictRules(LoaiCongViec.DONG_THO, QUY_TAC_Q10_CONG_VIEC_DAT),
      ...conflictRules(LoaiCongViec.SUA_CUNG_THAT, QUY_TAC_Q10_CONG_VIEC_DAT),
      ...conflictRules(LoaiCongViec.KHAI_TRUONG, QUY_TAC_Q10_KHAI_TRUONG),
      ...conflictRules(LoaiCongViec.XUAT_HANH, QUY_TAC_Q10_XUAT_HANH),
      ...conflictRules(LoaiCongViec.AN_TANG, QUY_TAC_Q10_AN_TANG),
    ],
  };
}

function activityRules(
  rules: readonly QuyTacDungSu[],
  lop: LopTriThuc = 'Q11',
): readonly QuyTacTriThuc[] {
  return rules.map((rule) => ({
    hoatDong: rule.congViec,
    lop,
    kieu: 'ACTIVITY' as const,
    ma: rule.ma,
    tacDong: rule.tacDong,
    mucTieu: rule.dieuKien,
    nguon: rule.nguon,
  }));
}

function conflictRules(
  hoatDong: LoaiCongViec,
  rules: readonly QuyTacXungDotDataDriven[],
): readonly QuyTacTriThuc[] {
  return rules.map((rule) => ({
    hoatDong,
    lop: 'Q10' as const,
    kieu: 'CONFLICT' as const,
    ma: rule.ma,
    phepXuLy: rule.phepXuLy.loai,
    mucTieu: rule.mucTieu,
    dieuKien: rule.dieuKien,
    precedence: rule.precedence,
    moTa: rule.moTa,
    nguon: rule.nguon,
  }));
}

function legacyWeddingConflictRules(): readonly QuyTacTriThuc[] {
  return QUY_TAC_XUNG_DOT_CUOI_HOI.map((rule) => ({
    hoatDong: LoaiCongViec.CUOI_HOI,
    lop: 'Q10' as const,
    kieu: 'LEGACY_CONFLICT' as const,
    ma: 'CUOI_HOI_Q10_' + rule.ma,
    moTa: rule.moTa,
    nguon: taoNguonXungDotQuyen10(rule.trang),
  }));
}
