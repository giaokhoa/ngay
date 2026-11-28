export interface ThamChieuNguonApi {
  loaiNguon: 'BAN_VIET' | 'HAN_BAN';
  daXacMinh: boolean;
}

export interface DieuKienDungSuApi {
  loai: 'YEU_TO' | 'TRUC' | 'CHI_NGAY' | 'CAN_NGAY' | 'NGAY_AM' | 'THO_VUONG';
  ma?: string;
  truc?: string;
  chi?: string;
  can?: string;
  ngay?: number;
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
export type KetQuaXemNgayChinhDungCatTocApi = KetQuaXemNgayApi;
export type KetQuaXemNgayCauYTriBenhApi = KetQuaXemNgayApi;
export type KetQuaXemNgaySuaMongTayChanApi = KetQuaXemNgayApi;
export type KetQuaXemNgayMayDoApi = KetQuaXemNgayApi;
export type KetQuaXemNgayLapKheUocGiaoDichApi = KetQuaXemNgayApi;
export type KetQuaXemNgayNapTaiApi = KetQuaXemNgayApi;
export type KetQuaXemNgayMoKhoXuatHangTienApi = KetQuaXemNgayApi;
export type KetQuaXemNgaySuaBuongSanPhuApi = KetQuaXemNgayApi;
export type KetQuaXemNgayDatCoiXayGiaApi = KetQuaXemNgayApi;
export type KetQuaXemNgayQuetDonNhaCuaApi = KetQuaXemNgayApi;
export type KetQuaXemNgayTrangTriTuongApi = KetQuaXemNgayApi;
export type KetQuaXemNgaySuaSangDuongSaApi = KetQuaXemNgayApi;
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
  | 'CHINH_DUNG_CAT_TOC'
  | 'CAU_Y_TRI_BENH'
  | 'SUA_MONG_TAY_CHAN'
  | 'MAY_DO'
  | 'LAP_KHE_UOC_GIAO_DICH'
  | 'NAP_TAI'
  | 'MO_KHO_XUAT_HANG_TIEN'
  | 'SUA_BUONG_SAN_PHU'
  | 'DAT_COI_XAY_GIA'
  | 'QUET_DON_NHA_CUA'
  | 'TRANG_TRI_TUONG'
  | 'SUA_SANG_DUONG_SA'
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

export function taoUrlXemChinhDungCatToc(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('chinh-dung-cat-toc', thoiDiem, muiGio);
}

export function taoUrlXemCauYTriBenh(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('cau-y-tri-benh', thoiDiem, muiGio);
}

export function taoUrlXemSuaMongTayChan(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('sua-mong-tay-chan', thoiDiem, muiGio);
}

export function taoUrlXemMayDo(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('may-do', thoiDiem, muiGio);
}

export function taoUrlXemLapKheUocGiaoDich(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('lap-khe-uoc-giao-dich', thoiDiem, muiGio);
}

export function taoUrlXemNapTai(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('nap-tai', thoiDiem, muiGio);
}

export function taoUrlXemMoKhoXuatHangTien(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('mo-kho-xuat-hang-tien', thoiDiem, muiGio);
}

export function taoUrlXemSuaBuongSanPhu(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('sua-buong-san-phu', thoiDiem, muiGio);
}

export function taoUrlXemDatCoiXayGia(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('dat-coi-xay-gia', thoiDiem, muiGio);
}

export function taoUrlXemQuetDonNhaCua(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('quet-don-nha-cua', thoiDiem, muiGio);
}

export function taoUrlXemTrangTriTuong(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('trang-tri-tuong', thoiDiem, muiGio);
}

export function taoUrlXemSuaSangDuongSa(thoiDiem: Date, muiGio: string): string {
  return taoUrlXemNgay('sua-sang-duong-sa', thoiDiem, muiGio);
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

export function xemNgayChinhDungCatToc(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayChinhDungCatTocApi> {
  return xemNgay('chinh-dung-cat-toc', thoiDiem, muiGio, signal);
}

export function xemNgayCauYTriBenh(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayCauYTriBenhApi> {
  return xemNgay('cau-y-tri-benh', thoiDiem, muiGio, signal);
}

export function xemNgaySuaMongTayChan(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgaySuaMongTayChanApi> {
  return xemNgay('sua-mong-tay-chan', thoiDiem, muiGio, signal);
}

export function xemNgayMayDo(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayMayDoApi> {
  return xemNgay('may-do', thoiDiem, muiGio, signal);
}

export function xemNgayLapKheUocGiaoDich(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayLapKheUocGiaoDichApi> {
  return xemNgay('lap-khe-uoc-giao-dich', thoiDiem, muiGio, signal);
}

export function xemNgayNapTai(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayNapTaiApi> {
  return xemNgay('nap-tai', thoiDiem, muiGio, signal);
}

export function xemNgayMoKhoXuatHangTien(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayMoKhoXuatHangTienApi> {
  return xemNgay('mo-kho-xuat-hang-tien', thoiDiem, muiGio, signal);
}

export function xemNgaySuaBuongSanPhu(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgaySuaBuongSanPhuApi> {
  return xemNgay('sua-buong-san-phu', thoiDiem, muiGio, signal);
}

export function xemNgayDatCoiXayGia(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayDatCoiXayGiaApi> {
  return xemNgay('dat-coi-xay-gia', thoiDiem, muiGio, signal);
}

export function xemNgayQuetDonNhaCua(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayQuetDonNhaCuaApi> {
  return xemNgay('quet-don-nha-cua', thoiDiem, muiGio, signal);
}

export function xemNgayTrangTriTuong(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayTrangTriTuongApi> {
  return xemNgay('trang-tri-tuong', thoiDiem, muiGio, signal);
}

export function xemNgaySuaSangDuongSa(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgaySuaSangDuongSaApi> {
  return xemNgay('sua-sang-duong-sa', thoiDiem, muiGio, signal);
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
