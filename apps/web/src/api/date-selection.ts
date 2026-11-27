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
  loai: 'YEU_TO' | 'TRUC' | 'CHI_NGAY';
  ma?: string;
  truc?: string;
  chi?: string;
}

export interface DongGopDanhGiaApi {
  quyTac: {
    ma: string;
    tacDong: 'NEN' | 'KY';
    dieuKien: DieuKienDungSuApi;
    nguon: readonly ThamChieuNguonApi[];
  };
  trangThai: 'HIEU_LUC' | 'BI_LOAI';
  lyDoLoai?: string;
}

export interface KetQuaXemNgayCuoiHoiApi {
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

export function taoUrlXemCuoiHoi(thoiDiem: Date, muiGio: string): string {
  const query = new URLSearchParams({
    thoiDiem: thoiDiem.toISOString(),
    muiGio,
  });
  return '/date-selection/cuoi-hoi?' + query.toString();
}

export async function xemNgayCuoiHoi(
  thoiDiem: Date,
  muiGio: string,
  signal?: AbortSignal,
): Promise<KetQuaXemNgayCuoiHoiApi> {
  const response = await fetch(taoUrlXemCuoiHoi(thoiDiem, muiGio), { signal });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? 'Không thể xem ngày (HTTP ' + response.status + ')');
  }

  return (await response.json()) as KetQuaXemNgayCuoiHoiApi;
}
