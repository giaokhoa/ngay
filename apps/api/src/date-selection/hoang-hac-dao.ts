import { LoaiCongViec } from '../activities/activity-rule';
import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';

/**
 * Hán oracle: 欽定協紀辨方書 卷七 義例五 "黄道黒道",
 * Kanripo KR3g0051 WYG 007-7b..9b.
 * Đây là lớp bổ trợ, không sửa/ghi đè rule Q10/Q11.
 */
export type TenThanHoangHac =
  | 'THANH_LONG'
  | 'MINH_DUONG'
  | 'THIEN_HINH'
  | 'CHU_TUOC'
  | 'KIM_QUY'
  | 'BAO_QUANG'
  | 'BACH_HO'
  | 'NGOC_DUONG'
  | 'THIEN_LAO'
  | 'HUYEN_VU'
  | 'TU_MENH'
  | 'CAU_TRAN';

export interface ThanHoangHac {
  ma: TenThanHoangHac;
  ten: string;
  loai: 'HOANG_DAO' | 'HAC_DAO';
}

const DANH_SACH_THAN: readonly ThanHoangHac[] = [
  { ma: 'THANH_LONG', ten: 'Thanh Long', loai: 'HOANG_DAO' },
  { ma: 'MINH_DUONG', ten: 'Minh Đường', loai: 'HOANG_DAO' },
  { ma: 'THIEN_HINH', ten: 'Thiên Hình', loai: 'HAC_DAO' },
  { ma: 'CHU_TUOC', ten: 'Chu Tước', loai: 'HAC_DAO' },
  { ma: 'KIM_QUY', ten: 'Kim Quỹ', loai: 'HOANG_DAO' },
  // Hán Q7 gọi 天德黃道 là 寳光 để tránh trùng tên 天德 khác.
  { ma: 'BAO_QUANG', ten: 'Bảo Quang', loai: 'HOANG_DAO' },
  { ma: 'BACH_HO', ten: 'Bạch Hổ', loai: 'HAC_DAO' },
  { ma: 'NGOC_DUONG', ten: 'Ngọc Đường', loai: 'HOANG_DAO' },
  { ma: 'THIEN_LAO', ten: 'Thiên Lao', loai: 'HAC_DAO' },
  { ma: 'HUYEN_VU', ten: 'Huyền Vũ', loai: 'HAC_DAO' },
  { ma: 'TU_MENH', ten: 'Tư Mệnh', loai: 'HOANG_DAO' },
  { ma: 'CAU_TRAN', ten: 'Câu Trần', loai: 'HAC_DAO' },
];

// Q7 WYG_007-8b bác phép ghép hệ này với 建除十二神: “萬不能與建除相合”.
// Giữ mapping Hoàng/Hắc đạo độc lập với twelve-officer.ts; không suy loai từ Trực.
const CHI_THANH_LONG_THEO_CHI_GOC: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.DAN]: DiaChi.TY,
  [DiaChi.THAN]: DiaChi.TY,
  [DiaChi.MAO]: DiaChi.DAN,
  [DiaChi.DAU]: DiaChi.DAN,
  [DiaChi.THIN]: DiaChi.THIN,
  [DiaChi.TUAT]: DiaChi.THIN,
  [DiaChi.TI]: DiaChi.NGO,
  [DiaChi.HOI]: DiaChi.NGO,
  [DiaChi.TY]: DiaChi.THAN,
  [DiaChi.NGO]: DiaChi.THAN,
  [DiaChi.SUU]: DiaChi.TUAT,
  [DiaChi.MUI]: DiaChi.TUAT,
};

export const CONG_VIEC_KY_HAC_DAO = new Set<LoaiCongViec>([
  LoaiCongViec.CUOI_HOI,
  LoaiCongViec.DI_CHUYEN,
  LoaiCongViec.DONG_THO,
  LoaiCongViec.SUA_CUNG_THAT,
  LoaiCongViec.XUAT_HANH,
]);

export function tinhHoangHacDao(chiGoc: DiaChi, chiCanXet: DiaChi): ThanHoangHac {
  const batDau = DIA_CHI_THEO_THU_TU.indexOf(CHI_THANH_LONG_THEO_CHI_GOC[chiGoc]);
  const index = DIA_CHI_THEO_THU_TU.indexOf(chiCanXet);
  return DANH_SACH_THAN[(index - batDau + 12) % 12]!;
}

export function tinhThanNgay(chiThang: DiaChi, chiNgay: DiaChi): ThanHoangHac {
  return tinhHoangHacDao(chiThang, chiNgay);
}

export function tinhThanGio(chiNgay: DiaChi, chiGio: DiaChi): ThanHoangHac {
  return tinhHoangHacDao(chiNgay, chiGio);
}

export function hacDaoKyViec(than: ThanHoangHac, congViec: LoaiCongViec): boolean {
  return than.loai === 'HAC_DAO' && CONG_VIEC_KY_HAC_DAO.has(congViec);
}

// Q7 WYG 007-19b..24b: markers theo CAN ngày và CHI giờ.
// Đặt riêng với 天乙貴人 vì sách yêu cầu chia ngày/đêm theo mặt trời mọc/lặn.
const THIEN_QUAN: Readonly<Record<ThienCan, readonly DiaChi[]>> = {
  [ThienCan.GIAP]: [DiaChi.DAU],
  [ThienCan.AT]: [DiaChi.THAN],
  [ThienCan.BINH]: [DiaChi.TY],
  [ThienCan.DINH]: [DiaChi.HOI],
  [ThienCan.MAU]: [DiaChi.MAO],
  [ThienCan.KY]: [DiaChi.DAN],
  [ThienCan.CANH]: [DiaChi.NGO],
  [ThienCan.TAN]: [DiaChi.TI],
  [ThienCan.NHAM]: [DiaChi.SUU, DiaChi.MUI],
  [ThienCan.QUY]: [DiaChi.THIN, DiaChi.TUAT],
};

const PHUC_TINH: Readonly<Record<ThienCan, readonly DiaChi[]>> = {
  [ThienCan.GIAP]: [DiaChi.DAN],
  [ThienCan.AT]: [DiaChi.SUU, DiaChi.HOI],
  [ThienCan.BINH]: [DiaChi.TY, DiaChi.TUAT],
  [ThienCan.DINH]: [DiaChi.DAU],
  [ThienCan.MAU]: [DiaChi.THAN],
  [ThienCan.KY]: [DiaChi.MUI],
  [ThienCan.CANH]: [DiaChi.NGO],
  [ThienCan.TAN]: [DiaChi.TI],
  [ThienCan.NHAM]: [DiaChi.THIN],
  [ThienCan.QUY]: [DiaChi.MAO],
};

const HY_THAN: Readonly<Record<ThienCan, DiaChi>> = {
  [ThienCan.GIAP]: DiaChi.DAN,
  [ThienCan.KY]: DiaChi.DAN,
  [ThienCan.AT]: DiaChi.TUAT,
  [ThienCan.CANH]: DiaChi.TUAT,
  [ThienCan.BINH]: DiaChi.THAN,
  [ThienCan.TAN]: DiaChi.THAN,
  [ThienCan.DINH]: DiaChi.NGO,
  [ThienCan.NHAM]: DiaChi.NGO,
  [ThienCan.MAU]: DiaChi.THIN,
  [ThienCan.QUY]: DiaChi.THIN,
};

const LOC: Readonly<Record<ThienCan, DiaChi>> = {
  [ThienCan.GIAP]: DiaChi.DAN,
  [ThienCan.AT]: DiaChi.MAO,
  [ThienCan.BINH]: DiaChi.TI,
  [ThienCan.DINH]: DiaChi.NGO,
  [ThienCan.MAU]: DiaChi.TI,
  [ThienCan.KY]: DiaChi.NGO,
  [ThienCan.CANH]: DiaChi.THAN,
  [ThienCan.TAN]: DiaChi.DAU,
  [ThienCan.NHAM]: DiaChi.HOI,
  [ThienCan.QUY]: DiaChi.TY,
};

export type MaDauThanGio = 'THIEN_QUAN' | 'PHUC_TINH' | 'HY_THAN' | 'BAT_LOC';

export function tinhDauThanGio(canNgay: ThienCan, chiGio: DiaChi): readonly MaDauThanGio[] {
  const markers: MaDauThanGio[] = [];
  if (THIEN_QUAN[canNgay].includes(chiGio)) markers.push('THIEN_QUAN');
  if (PHUC_TINH[canNgay].includes(chiGio)) markers.push('PHUC_TINH');
  if (HY_THAN[canNgay] === chiGio) markers.push('HY_THAN');
  if (LOC[canNgay] === chiGio) markers.push('BAT_LOC');
  return markers;
}

export const NHAN_DAU_THAN_GIO: Readonly<Record<MaDauThanGio, string>> = {
  THIEN_QUAN: 'Thiên Quan Quý Nhân',
  PHUC_TINH: 'Phúc Tinh Quý Nhân',
  HY_THAN: 'Hỷ Thần',
  BAT_LOC: 'Bát Lộc',
};

export type MaDauGioThamKhao = 'TUAN_KHONG' | 'TRIET_LO_KHONG';

const CHI_TRIET_LO_THEO_CAN_NGAY: Readonly<Record<ThienCan, readonly DiaChi[]>> = {
  [ThienCan.GIAP]: [DiaChi.THAN, DiaChi.DAU],
  [ThienCan.KY]: [DiaChi.THAN, DiaChi.DAU],
  [ThienCan.AT]: [DiaChi.NGO, DiaChi.MUI],
  [ThienCan.CANH]: [DiaChi.NGO, DiaChi.MUI],
  [ThienCan.BINH]: [DiaChi.THIN, DiaChi.TI],
  [ThienCan.TAN]: [DiaChi.THIN, DiaChi.TI],
  [ThienCan.DINH]: [DiaChi.DAN, DiaChi.MAO],
  [ThienCan.NHAM]: [DiaChi.DAN, DiaChi.MAO],
  [ThienCan.MAU]: [DiaChi.TY, DiaChi.SUU, DiaChi.TUAT, DiaChi.HOI],
  [ThienCan.QUY]: [DiaChi.TY, DiaChi.SUU, DiaChi.TUAT, DiaChi.HOI],
};

export function tinhDauGioThamKhao(
  canChiNgay: CanChi,
  chiGio: DiaChi,
): readonly MaDauGioThamKhao[] {
  const ketQua: MaDauGioThamKhao[] = [];
  if (chiTuanKhong(canChiNgay).includes(chiGio)) {
    ketQua.push('TUAN_KHONG');
  }
  if (CHI_TRIET_LO_THEO_CAN_NGAY[canChiNgay.can].includes(chiGio)) {
    ketQua.push('TRIET_LO_KHONG');
  }
  return ketQua;
}

function chiTuanKhong(canChiNgay: CanChi): readonly DiaChi[] {
  const canIndex = THIEN_CAN_THEO_THU_TU.indexOf(canChiNgay.can);
  const chiIndex = DIA_CHI_THEO_THU_TU.indexOf(canChiNgay.chi);
  const chiKhoiTuan = (chiIndex - canIndex + 12) % 12;
  return [
    DIA_CHI_THEO_THU_TU[(chiKhoiTuan + 10) % 12]!,
    DIA_CHI_THEO_THU_TU[(chiKhoiTuan + 11) % 12]!,
  ];
}

export const NHAN_DAU_GIO_THAM_KHAO: Readonly<Record<MaDauGioThamKhao, string>> = {
  TUAN_KHONG: 'Tuần trung Không vong',
  TRIET_LO_KHONG: 'Triệt lộ Không vong',
};
