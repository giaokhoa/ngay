import { Injectable } from '@nestjs/common';

import { LoaiCongViec, TacDongDungSu } from '../activities/activity-rule';
import { DungSuService } from '../activities/activities.service';
import { TinhLichService } from '../calendar/calendar.service';
import {
  taoThoiDiemGiuaNgayTaiMuiGio,
  tinhNgayDanSuTaiMuiGio,
} from '../calendar/civil-date-timezone';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { TietKhi } from '../calendar/domain/solar-term';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { DanhGiaNgayService } from '../evaluation/evaluation.service';
import { KetQuaDanhGia, TrangThaiDongGop } from '../evaluation/evaluation-domain';
import { YeuToNgay } from '../factors/domain/day-factor';
import { TinhYeuToNgayService } from '../factors/factors.service';
import {
  KetQuaXetNamSinh,
  tinhCanChiNamSinh,
  xetCanChiNamSinhVoiTru,
  xetNamSinhVoiTru,
} from './personal-year';
import { GioDuocChon, xetCacGioTrongNgay } from './selected-hour';
import { ThanHoangHac, hacDaoKyViec, tinhThanNgay } from './hoang-hac-dao';

export interface KetQuaXemNgay {
  ngayDanSu: string;
  canChiNgay: CanChi;
  chiThang: ReturnType<TinhLichService['tinhChiThangTaiThoiDiem']>;
  truc: ThapNhiTruc;
  thanHoangHac: ThanHoangHac;
  hacDaoKyCongViec: boolean;
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
  ngaySinh?: string;
  canChiNamSinh?: CanChi;
}

const TAT_CA_CONG_VIEC = Object.values(LoaiCongViec) as readonly LoaiCongViec[];

export type XepLoaiNgayTrongThang = 'TOT' | 'TRUNG_BINH' | 'NEN_TRANH' | 'DAI_KY' | 'XUNG_TUOI';

export interface XungTuoiNguoi {
  nguoiIndex: number;
  namSinh: number;
  canChiNamSinh: CanChi;
  xung: readonly KetQuaXetNamSinh[];
}

export interface NgayTrongThang {
  ngayDanSu: string;
  thanHoangHac: ThanHoangHac;
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

export interface KetQuaCongViecTongQuan {
  congViec: LoaiCongViec;
  caNhanHoa: 'DAY_DU' | 'CAN_THEM_NGUOI' | 'CAN_NGUOI_MAT';
  xepLoai: XepLoaiNgayTrongThang;
  coNen: boolean;
  coKy: boolean;
  camMoiViec: boolean;
  nen: readonly string[];
  ky: readonly string[];
}

export interface NgayTongQuan {
  ngayDanSu: string;
  thanHoangHac: ThanHoangHac;
  canChiNgay: CanChi;
  canChiThang: CanChi;
  canChiNam: CanChi;
  truc: ThapNhiTruc;
  xungTuoi: readonly KetQuaXetNamSinh[];
  theoCongViec: Readonly<Record<LoaiCongViec, KetQuaCongViecTongQuan>>;
  thongKe: Readonly<Record<XepLoaiNgayTrongThang, number>>;
}

export interface KetQuaTongQuanThang {
  nam: number;
  thang: number;
  muiGio: string;
  nguoi: {
    ngaySinh: string;
    namSinh: number;
    canChiNamSinh: CanChi;
  };
  ngay: readonly NgayTongQuan[];
}

export interface KetQuaXemThang {
  congViec: LoaiCongViec;
  nam: number;
  thang: number;
  muiGio: string;
  nguoiLienQuan: readonly {
    namSinh: number;
    ngaySinh?: string;
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

  xemChiTietNgayTheoNgaySinh(
    thoiDiem: Date,
    muiGio: string,
    congViec: LoaiCongViec,
    ngaySinh: readonly string[],
  ): KetQuaChiTietNgay {
    return this.xemChiTietNgay(
      thoiDiem,
      muiGio,
      congViec,
      ngaySinh.map((value) => this.taoNguoiLienQuanTuNgaySinh(value, muiGio)),
    );
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

  xemTongQuanThang(
    ngaySinh: string,
    nam: number,
    thang: number,
    muiGio: string,
  ): KetQuaTongQuanThang {
    if (!Number.isInteger(nam) || nam < 1 || nam > 9999) {
      throw new RangeError('Năm xem phải là số nguyên từ 1 đến 9999');
    }
    if (!Number.isInteger(thang) || thang < 1 || thang > 12) {
      throw new RangeError('Tháng xem phải từ 1 đến 12');
    }

    const nguoiDangXem = this.taoNguoiLienQuanTuNgaySinh(ngaySinh, muiGio);
    const namSinh = nguoiDangXem.namSinh;
    const canChiNamSinh = nguoiDangXem.canChiNamSinh!;
    const soNgay = new Date(Date.UTC(nam, thang, 0)).getUTCDate();
    const ngay: NgayTongQuan[] = [];

    for (let ngayTrongThang = 1; ngayTrongThang <= soNgay; ngayTrongThang += 1) {
      const ngayDanSu = [
        String(nam).padStart(4, '0'),
        String(thang).padStart(2, '0'),
        String(ngayTrongThang).padStart(2, '0'),
      ].join('-');
      const thoiDiem = taoThoiDiemGiuaNgayTaiMuiGio(ngayDanSu, muiGio);
      const canChiNam = this.lich.tinhCanChiNamTaiThoiDiem(thoiDiem);
      const canChiThang = this.lich.tinhCanChiThangTaiThoiDiem(thoiDiem);
      const canChiNgay = this.lich.tinhCanChiNgay(ngayDanSu);
      const truc = this.lich.tinhTruc(canChiThang.chi, canChiNgay.chi);
      const thanHoangHac = tinhThanNgay(canChiThang.chi, canChiNgay.chi);
      const xungTuoi = [
        xetCanChiNamSinhVoiTru(namSinh, canChiNamSinh, canChiNam, 'NAM'),
        xetCanChiNamSinhVoiTru(namSinh, canChiNamSinh, canChiThang, 'THANG'),
        xetCanChiNamSinhVoiTru(namSinh, canChiNamSinh, canChiNgay, 'NGAY'),
      ].filter((item) => item.xung);

      const thongKe: Record<XepLoaiNgayTrongThang, number> = {
        TOT: 0,
        TRUNG_BINH: 0,
        NEN_TRANH: 0,
        DAI_KY: 0,
        XUNG_TUOI: 0,
      };
      const theoCongViec = Object.fromEntries(
        TAT_CA_CONG_VIEC.map((congViec) => {
          const ketQua = this.xem(thoiDiem, muiGio, congViec);
          const apDungTuoiNguoiDangXem = congViec !== LoaiCongViec.AN_TANG;
          const xepLoai = xepLoaiNgay(
            ketQua,
            apDungTuoiNguoiDangXem && xungTuoi.length > 0,
            congViec,
          );
          thongKe[xepLoai] += 1;

          return [
            congViec,
            {
              congViec,
              caNhanHoa:
                congViec === LoaiCongViec.CUOI_HOI
                  ? 'CAN_THEM_NGUOI'
                  : congViec === LoaiCongViec.AN_TANG
                    ? 'CAN_NGUOI_MAT'
                    : 'DAY_DU',
              xepLoai,
              coNen: ketQua.danhGia.coNen,
              coKy: ketQua.danhGia.coKy || hacDaoKyViec(thanHoangHac, congViec),
              camMoiViec: ketQua.danhGia.camMoiViec,
              nen: ketQua.giaiThich.nen,
              ky: hacDaoKyViec(thanHoangHac, congViec)
                ? [...ketQua.giaiThich.ky, 'Hắc đạo: ' + thanHoangHac.ten]
                : ketQua.giaiThich.ky,
            },
          ];
        }),
      ) as Readonly<Record<LoaiCongViec, KetQuaCongViecTongQuan>>;

      ngay.push({
        ngayDanSu,
        thanHoangHac,
        canChiNgay,
        canChiThang,
        canChiNam,
        truc,
        xungTuoi,
        theoCongViec,
        thongKe,
      });
    }

    return {
      nam,
      thang,
      muiGio,
      nguoi: {
        ngaySinh,
        namSinh,
        canChiNamSinh,
      },
      ngay,
    };
  }

  xemThangTheoNgaySinh(
    nam: number,
    thang: number,
    muiGio: string,
    congViec: LoaiCongViec,
    ngaySinh: readonly string[],
  ): KetQuaXemThang {
    return this.xemThang(
      nam,
      thang,
      muiGio,
      congViec,
      ngaySinh.map((value) => this.taoNguoiLienQuanTuNgaySinh(value, muiGio)),
    );
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
            xetNguoiLienQuanVoiTru(nguoi, canChiNam, 'NAM'),
            xetNguoiLienQuanVoiTru(nguoi, canChiThang, 'THANG'),
            xetNguoiLienQuanVoiTru(nguoi, ketQua.canChiNgay, 'NGAY'),
          ].filter((item) => item.xung);

          return {
            nguoiIndex,
            namSinh: nguoi.namSinh,
            canChiNamSinh:
              kiemTra[0]?.canChiNamSinh ??
              xetNguoiLienQuanVoiTru(nguoi, ketQua.canChiNgay, 'NGAY').canChiNamSinh,
            xung: kiemTra,
          };
        })
        .filter((item) => item.xung.length > 0);

      const xepLoai = xepLoaiNgay(ketQua, xungTuoi.length > 0, congViec);
      thongKe[xepLoai] += 1;

      ngay.push({
        ngayDanSu,
        thanHoangHac: ketQua.thanHoangHac,
        canChiNgay: ketQua.canChiNgay,
        canChiThang,
        canChiNam,
        truc: ketQua.truc,
        xepLoai,
        coNen: ketQua.danhGia.coNen,
        coKy: ketQua.danhGia.coKy || hacDaoKyViec(ketQua.thanHoangHac, congViec),
        camMoiViec: ketQua.danhGia.camMoiViec,
        xungTuoi,
        nen: ketQua.giaiThich.nen,
        ky: hacDaoKyViec(ketQua.thanHoangHac, congViec)
          ? [...ketQua.giaiThich.ky, 'Hắc đạo: ' + ketQua.thanHoangHac.ten]
          : ketQua.giaiThich.ky,
      });
    }

    return {
      congViec,
      nam,
      thang,
      muiGio,
      nguoiLienQuan: nguoiLienQuan.map((nguoi) => ({
        namSinh: nguoi.namSinh,
        ngaySinh: nguoi.ngaySinh,
        truocLapXuan: nguoi.truocLapXuan ?? false,
        canChiNamSinh:
          nguoi.canChiNamSinh ?? tinhCanChiNamSinh(nguoi.namSinh, nguoi.truocLapXuan ?? false),
      })),
      ngay,
      thongKe,
    };
  }

  private taoNguoiLienQuanTuNgaySinh(ngaySinh: string, muiGio: string): NguoiLienQuanXemNgay {
    const namSinh = Number(ngaySinh.slice(0, 4));
    const lapXuan = this.lich.tinhThoiDiemTietKhi(namSinh, TietKhi.LAP_XUAN);
    const ngayLapXuan = tinhNgayDanSuTaiMuiGio(lapXuan, muiGio);

    if (ngaySinh === ngayLapXuan) {
      throw new RangeError(
        'Sinh đúng ngày Lập Xuân cần giờ sinh để xác định năm Can-Chi trước hay sau giao tiết',
      );
    }

    const thoiDiemSinh = taoThoiDiemGiuaNgayTaiMuiGio(ngaySinh, muiGio);
    return {
      ngaySinh,
      namSinh,
      canChiNamSinh: this.lich.tinhCanChiNamTaiThoiDiem(thoiDiemSinh),
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
    const thanHoangHac = tinhThanNgay(chiThang, canChiNgay.chi);
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
      thanHoangHac,
      hacDaoKyCongViec: hacDaoKyViec(thanHoangHac, congViec),
      truc,
      dangThoVuong,
      yeuTo,
      danhGia,
      giaiThich: taoGiaiThich(danhGia),
    };
  }
}

function xetNguoiLienQuanVoiTru(
  nguoi: NguoiLienQuanXemNgay,
  canChiTru: CanChi,
  tru: Parameters<typeof xetCanChiNamSinhVoiTru>[3],
): KetQuaXetNamSinh {
  if (nguoi.canChiNamSinh) {
    return xetCanChiNamSinhVoiTru(nguoi.namSinh, nguoi.canChiNamSinh, canChiTru, tru);
  }

  return xetNamSinhVoiTru(nguoi.namSinh, canChiTru, tru, nguoi.truocLapXuan ?? false);
}

function xepLoaiNgay(
  ketQua: KetQuaXemNgay,
  coXungTuoi: boolean,
  congViec: LoaiCongViec,
): XepLoaiNgayTrongThang {
  if (coXungTuoi) return 'XUNG_TUOI';
  if (ketQua.danhGia.camMoiViec) return 'DAI_KY';
  if (ketQua.danhGia.coKy || hacDaoKyViec(ketQua.thanHoangHac, congViec)) return 'NEN_TRANH';
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
