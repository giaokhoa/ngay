import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { LoaiCongViec } from '../activities/activity-rule';
import { ThamChieuNguon } from '../sources/source-reference';
import { KetQuaXemNgay, NguoiLienQuanXemNgay, XemNgayService } from './date-selection.service';

@Controller('date-selection')
export class XemNgayController {
  constructor(private readonly xemNgay: XemNgayService) {}

  @Get('cuoi-hoi')
  xemCuoiHoi(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => taoKetQuaCongKhai(this.xemNgay.xemCuoiHoi(thoiDiem, muiGioHopLe)));
  }

  @Get('di-chuyen')
  xemDiChuyen(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => taoKetQuaCongKhai(this.xemNgay.xemDiChuyen(thoiDiem, muiGioHopLe)));
  }

  @Get('dong-tho')
  xemDongTho(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => taoKetQuaCongKhai(this.xemNgay.xemDongTho(thoiDiem, muiGioHopLe)));
  }

  @Get('sua-cung-that')
  xemSuaCungThat(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => taoKetQuaCongKhai(this.xemNgay.xemSuaCungThat(thoiDiem, muiGioHopLe)));
  }

  @Get('khai-truong')
  xemKhaiTruong(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => taoKetQuaCongKhai(this.xemNgay.xemKhaiTruong(thoiDiem, muiGioHopLe)));
  }

  @Get('xuat-hanh')
  xemXuatHanh(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => taoKetQuaCongKhai(this.xemNgay.xemXuatHanh(thoiDiem, muiGioHopLe)));
  }

  @Get('thang')
  xemThang(
    @Query('congViec') congViecText: string | undefined,
    @Query('nam') namText: string | undefined,
    @Query('thang') thangText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
    @Query('namSinh') namSinhQuery: string | string[] | undefined,
    @Query('truocLapXuan') truocLapXuanQuery: string | string[] | undefined,
  ) {
    const congViec = docCongViec(congViecText);
    const nam = docSoNguyen('nam', namText, 1, 9999);
    const thang = docSoNguyen('thang', thangText, 1, 12);
    if (!muiGio) {
      throw new BadRequestException('Cần múi giờ IANA');
    }

    const nguoiLienQuan = docNguoiLienQuan(congViec, namSinhQuery, truocLapXuanQuery);

    return this.goi(() => this.xemNgay.xemThang(nam, thang, muiGio, congViec, nguoiLienQuan));
  }

  @Get('chi-tiet')
  xemChiTiet(
    @Query('congViec') congViecText: string | undefined,
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
    @Query('namSinh') namSinhQuery: string | string[] | undefined,
    @Query('truocLapXuan') truocLapXuanQuery: string | string[] | undefined,
  ) {
    const congViec = docCongViec(congViecText);
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    const nguoiLienQuan = docNguoiLienQuan(congViec, namSinhQuery, truocLapXuanQuery);

    return this.goi(() => {
      const result = this.xemNgay.xemChiTietNgay(thoiDiem, muiGioHopLe, congViec, nguoiLienQuan);

      return {
        ketQuaNgay: taoKetQuaCongKhai(result.ketQuaNgay),
        gio: result.gio,
      };
    });
  }

  @Get('an-tang')
  xemAnTang(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => taoKetQuaCongKhai(this.xemNgay.xemAnTang(thoiDiem, muiGioHopLe)));
  }

  private goi<T>(thucThi: () => T): T {
    try {
      return thucThi();
    } catch (error) {
      if (error instanceof RangeError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}

type ThamChieuNguonCongKhai = Pick<ThamChieuNguon, 'loaiNguon' | 'daXacMinh'>;

function taoKetQuaCongKhai(ketQua: KetQuaXemNgay) {
  return {
    ...ketQua,
    yeuTo: ketQua.yeuTo.map((item) => ({
      ...item,
      nguon: item.nguon.map(taoNguonCongKhai),
    })),
    danhGia: {
      ...ketQua.danhGia,
      dongGop: ketQua.danhGia.dongGop.map((item) => ({
        ...item,
        lyDoLoai: item.lyDoLoai ? lamSachMoTaCongKhai(item.lyDoLoai) : undefined,
        quyTac: {
          ...item.quyTac,
          nguon: item.quyTac.nguon.map(taoNguonCongKhai),
        },
      })),
      xungDotDaApDung: ketQua.danhGia.xungDotDaApDung.map((item) => ({
        ...item,
        moTa: lamSachMoTaCongKhai(item.moTa),
        nguon: item.nguon.map(taoNguonCongKhai),
      })),
    },
    giaiThich: {
      nen: ketQua.giaiThich.nen.map(lamSachMoTaCongKhai),
      ky: ketQua.giaiThich.ky.map(lamSachMoTaCongKhai),
      biLoai: ketQua.giaiThich.biLoai.map(lamSachMoTaCongKhai),
      xungDot: ketQua.giaiThich.xungDot.map(lamSachMoTaCongKhai),
    },
  };
}

function lamSachMoTaCongKhai(value: string): string {
  return value
    .replace(/\bQ\d+\b/gi, 'nguồn đối chiếu')
    .replace(/theo Quyển\s+\d+/gi, 'theo nguyên tắc nghi kị')
    .replace(/Quyển\s+\d+/gi, 'nguồn nghi kị')
    .replace(/source-lock/gi, 'đã đối chiếu nguồn');
}

function taoNguonCongKhai(nguon: ThamChieuNguon): ThamChieuNguonCongKhai {
  return {
    loaiNguon: nguon.loaiNguon,
    daXacMinh: nguon.daXacMinh,
  };
}

function docCongViec(value: string | undefined): LoaiCongViec {
  if (!value || !Object.values(LoaiCongViec).includes(value as LoaiCongViec)) {
    throw new BadRequestException('Công việc không hợp lệ');
  }
  return value as LoaiCongViec;
}

function docNguoiLienQuan(
  congViec: LoaiCongViec,
  namSinhQuery: string | string[] | undefined,
  truocLapXuanQuery: string | string[] | undefined,
): readonly NguoiLienQuanXemNgay[] {
  const namSinh = chuyenThanhMang(namSinhQuery).map((value) =>
    docSoNguyen('namSinh', value, 1, 9999),
  );
  const truocLapXuan = chuyenThanhMang(truocLapXuanQuery);

  const soNguoiBatBuoc = congViec === LoaiCongViec.CUOI_HOI ? 2 : 1;
  if (namSinh.length !== soNguoiBatBuoc) {
    throw new BadRequestException(
      congViec === LoaiCongViec.CUOI_HOI
        ? 'Cưới hỏi cần năm sinh của hai người'
        : 'Cần năm sinh của người chủ sự',
    );
  }

  return namSinh.map((value, index) => ({
    namSinh: value,
    truocLapXuan: docBoolean(truocLapXuan[index]),
  }));
}

function chuyenThanhMang(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function docBoolean(value: string | undefined): boolean {
  if (value === undefined || value === '' || value === 'false' || value === '0') {
    return false;
  }
  if (value === 'true' || value === '1') {
    return true;
  }
  throw new BadRequestException('truocLapXuan phải là true/false');
}

function docSoNguyen(ten: string, value: string | undefined, min: number, max: number): number {
  if (value === undefined || !/^\d+$/.test(value.trim())) {
    throw new BadRequestException(ten + ' phải là số nguyên');
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new BadRequestException(ten + ' phải trong khoảng ' + min + ' đến ' + max);
  }
  return parsed;
}

function docInput(
  thoiDiemText: string | undefined,
  muiGio: string | undefined,
): { thoiDiem: Date; muiGioHopLe: string } {
  if (!thoiDiemText || !muiGio) {
    throw new BadRequestException('Cần thoiDiem ISO-8601 và muiGio IANA');
  }

  const thoiDiem = new Date(thoiDiemText);
  if (Number.isNaN(thoiDiem.getTime())) {
    throw new BadRequestException('thoiDiem không hợp lệ');
  }

  return { thoiDiem, muiGioHopLe: muiGio };
}
