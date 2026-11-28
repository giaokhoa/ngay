export interface ThamChieuNguonApi {
  loaiNguon: 'BAN_VIET' | 'HAN_BAN';
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

export interface ThanHoangHacApi {
  ma: string;
  ten: string;
  loai: 'HOANG_DAO' | 'HAC_DAO';
}

export interface KetQuaXemNgayApi {
  ngayDanSu: string;
  canChiNgay: { can: string; chi: string };
  chiThang: string;
  truc: string;
  thanHoangHac: ThanHoangHacApi;
  hacDaoKyCongViec: boolean;
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
export type KetQuaXemNgayAnGiuongApi = KetQuaXemNgayApi;
export type KetQuaXemNgayQuanDaiApi = KetQuaXemNgayApi;
export type KetQuaXemNgayNhapHocApi = KetQuaXemNgayApi;
export type KetQuaXemNgayYenHoiApi = KetQuaXemNgayApi;
export type KetQuaXemNgayKhanhThuongApi = KetQuaXemNgayApi;
export type KetQuaXemNgayTeTuApi = KetQuaXemNgayApi;
export type KetQuaXemNgayCauPhucApi = KetQuaXemNgayApi;
export type KetQuaXemNgayCauTuApi = KetQuaXemNgayApi;
export type KetQuaXemNgayGiaiTruApi = KetQuaXemNgayApi;
export type KetQuaXemNgayDongThoApi = KetQuaXemNgayApi;
export type KetQuaXemNgaySuaCungThatApi = KetQuaXemNgayApi;
export type KetQuaXemNgayKhaiTruongApi = KetQuaXemNgayApi;
export type KetQuaXemNgayXuatHanhApi = KetQuaXemNgayApi;
export type KetQuaXemNgayAnTangApi = KetQuaXemNgayApi;

export interface NguoiLienQuanXemNgayApi {
  namSinh: number;
  truocLapXuan: boolean;
}

export interface XungTuoiApi {
  nguoiIndex: number;
  namSinh: number;
  canChiNamSinh: { can: string; chi: string };
  xung: readonly {
    tru: 'NAM' | 'THANG' | 'NGAY' | 'GIO';
    mucDo: 'KHONG_XUNG' | 'XUNG_CHI' | 'THIEN_KHAC_DIA_XUNG';
    xung: boolean;
    moTa: string;
  }[];
}

export interface NgayTrongThangApi {
  ngayDanSu: string;
  thanHoangHac: ThanHoangHacApi;
  canChiNgay: { can: string; chi: string };
  canChiThang: { can: string; chi: string };
  canChiNam: { can: string; chi: string };
  truc: string;
  xepLoai: 'TOT' | 'TRUNG_BINH' | 'NEN_TRANH' | 'DAI_KY' | 'XUNG_TUOI';
  coNen: boolean;
  coKy: boolean;
  camMoiViec: boolean;
  xungTuoi: readonly XungTuoiApi[];
  nen: readonly string[];
  ky: readonly string[];
}

export interface GioThucHienApi {
  chiGio: string;
  thanHoangHac: ThanHoangHacApi;
  dauThanGio: readonly string[];
  dauGioThamKhao: readonly ('TUAN_KHONG' | 'TRIET_LO_KHONG')[];
  canChiGio: { can: string; chi: string };
  khoangGio: string;
  xepLoai: 'NEN_DUNG' | 'TRUNG_BINH' | 'NEN_TRANH' | 'XUNG_TUOI';
  lyDoTot: readonly string[];
  lyDoTranh: readonly string[];
  xungTuoi: readonly {
    nguoiIndex: number;
    namSinh: number;
    canChiNamSinh: { can: string; chi: string };
    xung: {
      tru: 'NAM' | 'THANG' | 'NGAY' | 'GIO';
      mucDo: 'KHONG_XUNG' | 'XUNG_CHI' | 'THIEN_KHAC_DIA_XUNG';
      xung: boolean;
      moTa: string;
    };
  }[];
}

export interface KetQuaChiTietNgayApi {
  ketQuaNgay: KetQuaXemNgayApi;
  gio: readonly GioThucHienApi[];
}

export type MaCongViecApi =
  | 'CUOI_HOI'
  | 'DI_CHUYEN'
  | 'AN_GIUONG'
  | 'QUAN_DAI'
  | 'NHAP_HOC'
  | 'YEN_HOI'
  | 'KHANH_THUONG'
  | 'TE_TU'
  | 'CAU_PHUC'
  | 'CAU_TU'
  | 'GIAI_TRU'
  | 'DONG_THO'
  | 'SUA_CUNG_THAT'
  | 'KHAI_TRUONG'
  | 'XUAT_HANH'
  | 'AN_TANG';

export type XepLoaiNgayApi = 'TOT' | 'TRUNG_BINH' | 'NEN_TRANH' | 'DAI_KY' | 'XUNG_TUOI';

export interface DanhGiaCongViecTongQuanApi {
  congViec: MaCongViecApi;
  caNhanHoa: 'DAY_DU' | 'CAN_THEM_NGUOI' | 'CAN_NGUOI_MAT';
  xepLoai: XepLoaiNgayApi;
  coNen: boolean;
  coKy: boolean;
  camMoiViec: boolean;
  nen: readonly string[];
  ky: readonly string[];
}

export interface NgayTongQuanApi {
  ngayDanSu: string;
  thanHoangHac: ThanHoangHacApi;
  canChiNgay: { can: string; chi: string };
  canChiThang: { can: string; chi: string };
  canChiNam: { can: string; chi: string };
  truc: string;
  xungTuoi: readonly {
    namSinh: number;
    canChiNamSinh: { can: string; chi: string };
    tru: 'NAM' | 'THANG' | 'NGAY' | 'GIO';
    mucDo: 'KHONG_XUNG' | 'XUNG_CHI' | 'THIEN_KHAC_DIA_XUNG';
    xung: boolean;
    moTa: string;
  }[];
  theoCongViec: Readonly<Record<MaCongViecApi, DanhGiaCongViecTongQuanApi>>;
  thongKe: Readonly<Record<XepLoaiNgayApi, number>>;
}

export interface KetQuaTongQuanThangApi {
  nam: number;
  thang: number;
  muiGio: string;
  nguoi: {
    ngaySinh: string;
    namSinh: number;
    canChiNamSinh: { can: string; chi: string };
  };
  ngay: readonly NgayTongQuanApi[];
}

export interface KetQuaXemThangApi {
  congViec: string;
  nam: number;
  thang: number;
  muiGio: string;
  nguoiLienQuan: readonly {
    namSinh: number;
    ngaySinh?: string;
    truocLapXuan: boolean;
    canChiNamSinh: { can: string; chi: string };
  }[];
  ngay: readonly NgayTrongThangApi[];
  thongKe: {
    TOT: number;
    TRUNG_BINH: number;
    NEN_TRANH: number;
    DAI_KY: number;
    XUNG_TUOI: number;
  };
}

export function taoUrlTongQuanThang(
  ngaySinh: string,
  nam: number,
  thang: number,
  muiGio: string,
): string {
  const query = new URLSearchParams({
    ngaySinh,
    nam: String(nam),
    thang: String(thang),
    muiGio,
  });

  return '/date-selection/tong-quan-thang?' + query.toString();
}

export async function xemTongQuanThang(
  ngaySinh: string,
  nam: number,
  thang: number,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaTongQuanThangApi> {
  const response = await fetch(taoUrlTongQuanThang(ngaySinh, nam, thang, muiGio), {
    signal,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(
      body?.message ?? 'Không thể xem tổng quan tháng (HTTP ' + response.status + ')',
    );
  }

  return (await response.json()) as KetQuaTongQuanThangApi;
}

export function taoUrlXemThangTheoNgaySinh(
  congViec: string,
  nam: number,
  thang: number,
  muiGio: string,
  ngaySinh: readonly string[],
): string {
  const query = new URLSearchParams({
    congViec,
    nam: String(nam),
    thang: String(thang),
    muiGio,
  });

  for (const value of ngaySinh) {
    query.append('ngaySinh', value);
  }

  return '/date-selection/thang?' + query.toString();
}

export function taoUrlChiTietNgayTheoNgaySinh(
  congViec: string,
  thoiDiem: Date,
  muiGio: string,
  ngaySinh: readonly string[],
): string {
  const query = new URLSearchParams({
    congViec,
    thoiDiem: thoiDiem.toISOString(),
    muiGio,
  });

  for (const value of ngaySinh) {
    query.append('ngaySinh', value);
  }

  return '/date-selection/chi-tiet?' + query.toString();
}

export async function xemThangTheoNgaySinh(
  congViec: string,
  nam: number,
  thang: number,
  muiGio: string,
  ngaySinh: readonly string[],
  signal?: AbortSignal,
): Promise<KetQuaXemThangApi> {
  const response = await fetch(taoUrlXemThangTheoNgaySinh(congViec, nam, thang, muiGio, ngaySinh), {
    signal,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? 'Không thể xem tháng (HTTP ' + response.status + ')');
  }

  return (await response.json()) as KetQuaXemThangApi;
}

export async function xemChiTietNgayTheoNgaySinh(
  congViec: string,
  thoiDiem: Date,
  muiGio: string,
  ngaySinh: readonly string[],
  signal?: AbortSignal,
): Promise<KetQuaChiTietNgayApi> {
  const response = await fetch(
    taoUrlChiTietNgayTheoNgaySinh(congViec, thoiDiem, muiGio, ngaySinh),
    { signal },
  );

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? 'Không thể xem chi tiết ngày (HTTP ' + response.status + ')');
  }

  return (await response.json()) as KetQuaChiTietNgayApi;
}

export function taoUrlXemThang(
  congViec: string,
  nam: number,
  thang: number,
  muiGio: string,
  nguoiLienQuan: readonly NguoiLienQuanXemNgayApi[],
): string {
  const query = new URLSearchParams({
    congViec,
    nam: String(nam),
    thang: String(thang),
    muiGio,
  });

  for (const nguoi of nguoiLienQuan) {
    query.append('namSinh', String(nguoi.namSinh));
    query.append('truocLapXuan', String(nguoi.truocLapXuan));
  }

  return '/date-selection/thang?' + query.toString();
}

export function taoUrlChiTietNgay(
  congViec: string,
  thoiDiem: Date,
  muiGio: string,
  nguoiLienQuan: readonly NguoiLienQuanXemNgayApi[],
): string {
  const query = new URLSearchParams({
    congViec,
    thoiDiem: thoiDiem.toISOString(),
    muiGio,
  });

  for (const nguoi of nguoiLienQuan) {
    query.append('namSinh', String(nguoi.namSinh));
    query.append('truocLapXuan', String(nguoi.truocLapXuan));
  }

  return '/date-selection/chi-tiet?' + query.toString();
}

export async function xemChiTietNgay(
  congViec: string,
  thoiDiem: Date,
  muiGio: string,
  nguoiLienQuan: readonly NguoiLienQuanXemNgayApi[],
  signal?: AbortSignal,
): Promise<KetQuaChiTietNgayApi> {
  const response = await fetch(taoUrlChiTietNgay(congViec, thoiDiem, muiGio, nguoiLienQuan), {
    signal,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? 'Không thể xem chi tiết ngày (HTTP ' + response.status + ')');
  }

  return (await response.json()) as KetQuaChiTietNgayApi;
}

export async function xemThang(
  congViec: string,
  nam: number,
  thang: number,
  muiGio: string,
  nguoiLienQuan: readonly NguoiLienQuanXemNgayApi[],
  signal?: AbortSignal,
): Promise<KetQuaXemThangApi> {
  const response = await fetch(taoUrlXemThang(congViec, nam, thang, muiGio, nguoiLienQuan), {
    signal,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? 'Không thể xem tháng (HTTP ' + response.status + ')');
  }

  return (await response.json()) as KetQuaXemThangApi;
}

export function taoUrlXemCuoiHoi(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('cuoi-hoi', thoiDiem, muiGio);
}

export function taoUrlXemDiChuyen(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('di-chuyen', thoiDiem, muiGio);
}

export function taoUrlXemAnGiuong(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('an-giuong', thoiDiem, muiGio);
}

export function taoUrlXemQuanDai(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('quan-dai', thoiDiem, muiGio);
}

export function taoUrlXemDongTho(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('dong-tho', thoiDiem, muiGio);
}

export function taoUrlXemSuaCungThat(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('sua-cung-that', thoiDiem, muiGio);
}

export function taoUrlXemNhapHoc(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('nhap-hoc', thoiDiem, muiGio);
}

export function taoUrlXemYenHoi(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('yen-hoi', thoiDiem, muiGio);
}

export function taoUrlXemKhanhThuong(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('khanh-thuong', thoiDiem, muiGio);
}

export function taoUrlXemTeTu(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('te-tu', thoiDiem, muiGio);
}

export function taoUrlXemCauPhuc(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('cau-phuc', thoiDiem, muiGio);
}

export function taoUrlXemCauTu(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('cau-tu', thoiDiem, muiGio);
}

export function taoUrlXemGiaiTru(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('giai-tru', thoiDiem, muiGio);
}

export function taoUrlXemKhaiTruong(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('khai-truong', thoiDiem, muiGio);
}

export function taoUrlXemXuatHanh(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('xuat-hanh', thoiDiem, muiGio);
}

export function taoUrlXemAnTang(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('an-tang', thoiDiem, muiGio);
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

export function xemNgayAnGiuong(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayAnGiuongApi> {
  return xemNgay('an-giuong', thoiDiem, muiGio, signal);
}

export function xemNgayQuanDai(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayQuanDaiApi> {
  return xemNgay('quan-dai', thoiDiem, muiGio, signal);
}

export function xemNgayNhapHoc(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayNhapHocApi> {
  return xemNgay('nhap-hoc', thoiDiem, muiGio, signal);
}

export function xemNgayYenHoi(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayYenHoiApi> {
  return xemNgay('yen-hoi', thoiDiem, muiGio, signal);
}

export function xemNgayKhanhThuong(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayKhanhThuongApi> {
  return xemNgay('khanh-thuong', thoiDiem, muiGio, signal);
}

export function xemNgayTeTu(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayTeTuApi> {
  return xemNgay('te-tu', thoiDiem, muiGio, signal);
}

export function xemNgayCauPhuc(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayCauPhucApi> {
  return xemNgay('cau-phuc', thoiDiem, muiGio, signal);
}

export function xemNgayCauTu(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayCauTuApi> {
  return xemNgay('cau-tu', thoiDiem, muiGio, signal);
}

export function xemNgayGiaiTru(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayGiaiTruApi> {
  return xemNgay('giai-tru', thoiDiem, muiGio, signal);
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

export function xemNgayAnTang(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayAnTangApi> {
  return xemNgay('an-tang', thoiDiem, muiGio, signal);
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
