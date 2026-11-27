export interface ThamChieuNguonApi {
  loaiNguon: 'BAN_VIET' | 'HAN_BAN';
  tap?: number;
  quyen: number;
  trang?: number;
  muc?: string;
  tenGoc?: string;
  ghiChu?: string;
  daXacMinh: boolean;
}

export interface DieuKienDungSuApi {
  loai: 'YEU_TO' | 'TRUC' | 'CHI_NGAY' | 'THO_VUONG';
  ma?: string;
  truc?: string;
  chi?: string;
}

export interface DongGopDanhGiaApi {
  quyTac: {
    ma: string;
    congViec: string;
    tacDong: 'NEN' | 'KY';
    dieuKien: DieuKienDungSuApi;
    nguon: readonly ThamChieuNguonApi[];
  };
  trangThai: 'HIEU_LUC' | 'BI_LOAI';
  lyDoLoai?: string;
}

export interface KetQuaXemNgayApi {
  ngayDanSu: string;
  canChiNgay: { can: string; chi: string };
  chiThang: string;
  truc: string;
  dangThoVuong: boolean;
  yeuTo: readonly {
    ma: string;
    loai: string;
    tenKhac: readonly string[];
    nguon: readonly ThamChieuNguonApi[];
  }[];
  danhGia: {
    coNen: boolean;
    coKy: boolean;
    camMoiViec: boolean;
    dongGop: readonly DongGopDanhGiaApi[];
    xungDotDaApDung: readonly {
      ma: string;
      moTa: string;
      nguon: readonly ThamChieuNguonApi[];
    }[];
  };
  giaiThich: {
    nen: readonly string[];
    ky: readonly string[];
    biLoai: readonly string[];
    xungDot: readonly string[];
  };
}

export type KetQuaXemNgayCuoiHoiApi = KetQuaXemNgayApi;
export type KetQuaXemNgayDiChuyenApi = KetQuaXemNgayApi;
export type KetQuaXemNgayDongThoApi = KetQuaXemNgayApi;
export type KetQuaXemNgaySuaCungThatApi = KetQuaXemNgayApi;
export type KetQuaXemNgayKhaiTruongApi = KetQuaXemNgayApi;
export type KetQuaXemNgayXuatHanhApi = KetQuaXemNgayApi;

export function taoUrlXemCuoiHoi(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('cuoi-hoi', thoiDiem, muiGio);
}

export function taoUrlXemDiChuyen(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('di-chuyen', thoiDiem, muiGio);
}

export function taoUrlXemDongTho(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('dong-tho', thoiDiem, muiGio);
}

export function taoUrlXemSuaCungThat(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('sua-cung-that', thoiDiem, muiGio);
}

export function taoUrlXemKhaiTruong(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('khai-truong', thoiDiem, muiGio);
}

export function taoUrlXemXuatHanh(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('xuat-hanh', thoiDiem, muiGio);
}

export function xemNgayCuoiHoi(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayCuoiHoiApi> {
  return xemNgay('cuoi-hoi', thoiDiem, muiGio, signal);
}

export function xemNgayDiChuyen(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayDiChuyenApi> {
  return xemNgay('di-chuyen', thoiDiem, muiGio, signal);
}

export function xemNgayDongTho(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayDongThoApi> {
  return xemNgay('dong-tho', thoiDiem, muiGio, signal);
}

export function xemNgaySuaCungThat(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgaySuaCungThatApi> {
  return xemNgay('sua-cung-that', thoiDiem, muiGio, signal);
}

export function xemNgayKhaiTruong(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayKhaiTruongApi> {
  return xemNgay('khai-truong', thoiDiem, muiGio, signal);
}

export function xemNgayXuatHanh(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayXuatHanhApi> {
  return xemNgay('xuat-hanh', thoiDiem, muiGio, signal);
}

function taoUrlXemNgay(duongDan: string, thoiDiem: Date, muiGio: string): string {
  const query = new URLSearchParams({
    thoiDiem: thoiDiem.toISOString(),
    muiGio,
  });
  return '/date-selection/' + duongDan + '?' + query.toString();
}

async function xemNgay(
  duongDan: string,
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayApi> {
  const response = await fetch(taoUrlXemNgay(duongDan, thoiDiem, muiGio), { signal });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? 'Không thể xem ngày (HTTP ' + response.status + ')');
  }

  return (await response.json()) as KetQuaXemNgayApi;
}
