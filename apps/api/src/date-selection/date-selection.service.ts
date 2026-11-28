import { Injectable } from '@nestjs/common';

import { LoaiCongViec, TacDongDungSu } from '../activities/activity-rule';
import { DungSuService } from '../activities/activities.service';
import { TinhLichService } from '../calendar/calendar.service';
import {
  taoThoiDiemGiuaNgayTaiMuiGio,
  tinhNgayDanSuTaiMuiGio,
} from '../calendar/civil-date-timezone';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { DanhGiaNgayService } from '../evaluation/evaluation.service';
import { KetQuaDanhGia, TrangThaiDongGop } from '../evaluation/evaluation-domain';
import { YeuToNgay } from '../factors/domain/day-factor';
import { TinhYeuToNgayService } from '../factors/factors.service';
import { KetQuaXetNamSinh, tinhCanChiNamSinh, xetNamSinhVoiTru } from './personal-year';
import { GioDuocChon, xetCacGioTrongNgay } from './selected-hour';

export interface KetQuaXemNgay {
  ngayDanSu: string;
  canChiNgay: CanChi;
  chiThang: ReturnType<TinhLichService['tinhChiThangTaiThoiDiem']>;
  truc: ThapNhiTruc;
  dangThoVuong: boolean;
  yeuTo: readonly YeuToNgay[];
  danhGia: KetQuaDanhGia;
  giaiThich: {
    nen: readonly string[];
    ky: readonly string[];
    biLoai: readonly string[];
    xungDot: readonly string[];
  };
}

export type KetQuaXemNgayCuoiHoi = KetQuaXemNgay;
export type KetQuaXemNgayDiChuyen = KetQuaXemNgay;
export type KetQuaXemNgayDongTho = KetQuaXemNgay;
export type KetQuaXemNgaySuaCungThat = KetQuaXemNgay;
export type KetQuaXemNgayKhaiTruong = KetQuaXemNgay;
export type KetQuaXemNgayXuatHanh = KetQuaXemNgay;
export type KetQuaXemNgayAnTang = KetQuaXemNgay;

export interface NguoiLienQuanXemNgay {
  namSinh: number;
  truocLapXuan?: boolean;
}

export type XepLoaiNgayTrongThang = 'TOT' | 'TRUNG_BINH' | 'NEN_TRANH' | 'DAI_KY' | 'XUNG_TUOI';

export interface XungTuoiNguoi {
  nguoiIndex: number;
  namSinh: number;
  canChiNamSinh: CanChi;
  xung: readonly KetQuaXetNamSinh[];
}

export interface NgayTrongThang {
  ngayDanSu: string;
  canChiNgay: CanChi;
  canChiThang: CanChi;
  canChiNam: CanChi;
  truc: ThapNhiTruc;
  xepLoai: XepLoaiNgayTrongThang;
  coNen: boolean;
  coKy: boolean;
  camMoiViec: boolean;
  xungTuoi: readonly XungTuoiNguoi[];
  nen: readonly string[];
  ky: readonly string[];
}

export interface KetQuaChiTietNgay {
  ketQuaNgay: KetQuaXemNgay;
  gio: readonly GioDuocChon[];
}

export interface KetQuaXemThang {
  congViec: LoaiCongViec;
  nam: number;
  thang: number;
  muiGio: string;
  nguoiLienQuan: readonly {
    namSinh: number;
    truocLapXuan: boolean;
    canChiNamSinh: CanChi;
  }[];
  ngay: readonly NgayTrongThang[];
  thongKe: Readonly<Record<XepLoaiNgayTrongThang, number>>;
}

@Injectable()
export class XemNgayService {
  constructor(
    private readonly lich: TinhLichService,
    private readonly yeuToNgay: TinhYeuToNgayService,
    private readonly dungSu: DungSuService,
    private readonly danhGiaNgay: DanhGiaNgayService,
  ) {}

  xemCuoiHoi(thoiDiem: Date, muiGio: string): KetQuaXemNgayCuoiHoi {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.CUOI_HOI);
  }

  xemDiChuyen(thoiDiem: Date, muiGio: string): KetQuaXemNgayDiChuyen {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.DI_CHUYEN);
  }

  xemDongTho(thoiDiem: Date, muiGio: string): KetQuaXemNgayDongTho {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.DONG_THO);
  }

  xemSuaCungThat(thoiDiem: Date, muiGio: string): KetQuaXemNgaySuaCungThat {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.SUA_CUNG_THAT);
  }

  xemKhaiTruong(thoiDiem: Date, muiGio: string): KetQuaXemNgayKhaiTruong {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.KHAI_TRUONG);
  }

  xemXuatHanh(thoiDiem: Date, muiGio: string): KetQuaXemNgayXuatHanh {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.XUAT_HANH);
  }

  xemAnTang(thoiDiem: Date, muiGio: string): KetQuaXemNgayAnTang {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.AN_TANG);
  }

  xemChiTietNgay(
    thoiDiem: Date,
    muiGio: string,
    congViec: LoaiCongViec,
    nguoiLienQuan: readonly NguoiLienQuanXemNgay[],
  ): KetQuaChiTietNgay {
    const ketQuaNgay = this.xem(thoiDiem, muiGio, congViec);
    const canChiNam = this.lich.tinhCanChiNamTaiThoiDiem(thoiDiem);
    const canChiThang = this.lich.tinhCanChiThangTaiThoiDiem(thoiDiem);

    return {
      ketQuaNgay,
      gio: xetCacGioTrongNgay({
        canChiNgay: ketQuaNgay.canChiNgay,
        canChiNam,
        canChiThang,
        nguoiLienQuan,
      }),
    };
  }

  xemThang(
    nam: number,
    thang: number,
    muiGio: string,
    congViec: LoaiCongViec,
    nguoiLienQuan: readonly NguoiLienQuanXemNgay[],
  ): KetQuaXemThang {
    if (!Number.isInteger(nam) || nam < 1 || nam > 9999) {
      throw new RangeError('Năm xem phải là số nguyên từ 1 đến 9999');
    }
    if (!Number.isInteger(thang) || thang < 1 || thang > 12) {
      throw new RangeError('Tháng xem phải từ 1 đến 12');
    }

    const soNgay = new Date(Date.UTC(nam, thang, 0)).getUTCDate();
    const ngay: NgayTrongThang[] = [];
    const thongKe: Record<XepLoaiNgayTrongThang, number> = {
      TOT: 0,
      TRUNG_BINH: 0,
      NEN_TRANH: 0,
      DAI_KY: 0,
      XUNG_TUOI: 0,
    };

    for (let ngayTrongThang = 1; ngayTrongThang <= soNgay; ngayTrongThang += 1) {
      const ngayDanSu = [
        String(nam).padStart(4, '0'),
        String(thang).padStart(2, '0'),
        String(ngayTrongThang).padStart(2, '0'),
      ].join('-');
      const thoiDiem = taoThoiDiemGiuaNgayTaiMuiGio(ngayDanSu, muiGio);
      const ketQua = this.xem(thoiDiem, muiGio, congViec);
      const canChiNam = this.lich.tinhCanChiNamTaiThoiDiem(thoiDiem);
      const canChiThang = this.lich.tinhCanChiThangTaiThoiDiem(thoiDiem);
      const xungTuoi = nguoiLienQuan
        .map((nguoi, nguoiIndex) => {
          const kiemTra = [
            xetNamSinhVoiTru(nguoi.namSinh, canChiNam, 'NAM', nguoi.truocLapXuan ?? false),
            xetNamSinhVoiTru(nguoi.namSinh, canChiThang, 'THANG', nguoi.truocLapXuan ?? false),
            xetNamSinhVoiTru(nguoi.namSinh, ketQua.canChiNgay, 'NGAY', nguoi.truocLapXuan ?? false),
          ].filter((item) => item.xung);

          return {
            nguoiIndex,
            namSinh: nguoi.namSinh,
            canChiNamSinh:
              kiemTra[0]?.canChiNamSinh ??
              xetNamSinhVoiTru(
                nguoi.namSinh,
                ketQua.canChiNgay,
                'NGAY',
                nguoi.truocLapXuan ?? false,
              ).canChiNamSinh,
            xung: kiemTra,
          };
        })
        .filter((item) => item.xung.length > 0);

      const xepLoai = xepLoaiNgay(ketQua, xungTuoi);
      thongKe[xepLoai] += 1;

      ngay.push({
        ngayDanSu,
        canChiNgay: ketQua.canChiNgay,
        canChiThang,
        canChiNam,
        truc: ketQua.truc,
        xepLoai,
        coNen: ketQua.danhGia.coNen,
        coKy: ketQua.danhGia.coKy,
        camMoiViec: ketQua.danhGia.camMoiViec,
        xungTuoi,
        nen: ketQua.giaiThich.nen,
        ky: ketQua.giaiThich.ky,
      });
    }

    return {
      congViec,
      nam,
      thang,
      muiGio,
      nguoiLienQuan: nguoiLienQuan.map((nguoi) => ({
        namSinh: nguoi.namSinh,
        truocLapXuan: nguoi.truocLapXuan ?? false,
        canChiNamSinh: tinhCanChiNamSinh(nguoi.namSinh, nguoi.truocLapXuan ?? false),
      })),
      ngay,
      thongKe,
    };
  }

  private xem(thoiDiem: Date, muiGio: string, congViec: LoaiCongViec): KetQuaXemNgay {
    if (Number.isNaN(thoiDiem.getTime())) {
      throw new RangeError('Thời điểm không hợp lệ');
    }

    const ngayDanSu = tinhNgayDanSuTaiMuiGio(thoiDiem, muiGio);
    const canChiNgay = this.lich.tinhCanChiNgay(ngayDanSu);
    const chiThang = this.lich.tinhChiThangTaiThoiDiem(thoiDiem);
    const truc = this.lich.tinhTruc(chiThang, canChiNgay.chi);
    const dangThoVuong = this.lich.dangThoVuong(ngayDanSu, muiGio);
    const yeuTo = this.yeuToNgay.tinh({
      chiThang,
      canNgay: canChiNgay.can,
      chiNgay: canChiNgay.chi,
      dangThoVuong,
    });
    const danhGia = this.danhGiaNgay.danhGia(this.dungSu.layQuyTac(congViec), {
      chiThang,
      canNgay: canChiNgay.can,
      chiNgay: canChiNgay.chi,
      truc,
      dangThoVuong,
      yeuTo,
    });

    return {
      ngayDanSu,
      canChiNgay,
      chiThang,
      truc,
      dangThoVuong,
      yeuTo,
      danhGia,
      giaiThich: taoGiaiThich(danhGia),
    };
  }
}

function xepLoaiNgay(
  ketQua: KetQuaXemNgay,
  xungTuoi: readonly XungTuoiNguoi[],
): XepLoaiNgayTrongThang {
  if (xungTuoi.length > 0) return 'XUNG_TUOI';
  if (ketQua.danhGia.camMoiViec) return 'DAI_KY';
  if (ketQua.danhGia.coKy) return 'NEN_TRANH';
  if (ketQua.danhGia.coNen) return 'TOT';
  return 'TRUNG_BINH';
}

function taoGiaiThich(danhGia: KetQuaDanhGia): KetQuaXemNgay['giaiThich'] {
  const hieuLuc = danhGia.dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    nen: hieuLuc
      .filter((item) => item.quyTac.tacDong === TacDongDungSu.NEN)
      .map((item) => moTaDieuKien(item.quyTac.dieuKien)),
    ky: hieuLuc
      .filter((item) => item.quyTac.tacDong === TacDongDungSu.KY)
      .map((item) => moTaDieuKien(item.quyTac.dieuKien)),
    biLoai: danhGia.dongGop
      .filter((item) => item.trangThai === TrangThaiDongGop.BI_LOAI)
      .map(
        (item) =>
          moTaDieuKien(item.quyTac.dieuKien) + ': ' + (item.lyDoLoai ?? 'bị loại bởi Quyển 10'),
      ),
    xungDot: danhGia.xungDotDaApDung.map((item) => item.moTa),
  };
}

function moTaDieuKien(dieuKien: KetQuaDanhGia['dongGop'][number]['quyTac']['dieuKien']): string {
  switch (dieuKien.loai) {
    case 'YEU_TO':
      return dieuKien.ma;
    case 'TRUC':
      return 'TRUC_' + dieuKien.truc;
    case 'CHI_NGAY':
      return 'CHI_NGAY_' + dieuKien.chi;
    case 'THO_VUONG':
      return 'THO_VUONG';
  }
}
