import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { XemNgayService } from './date-selection.service';

@Controller('date-selection')
export class XemNgayController {
  constructor(private readonly xemNgay: XemNgayService) {}

  @Get('cuoi-hoi')
  xemCuoiHoi(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => this.xemNgay.xemCuoiHoi(thoiDiem, muiGioHopLe));
  }

  @Get('di-chuyen')
  xemDiChuyen(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => this.xemNgay.xemDiChuyen(thoiDiem, muiGioHopLe));
  }

  @Get('dong-tho')
  xemDongTho(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => this.xemNgay.xemDongTho(thoiDiem, muiGioHopLe));
  }

  @Get('sua-cung-that')
  xemSuaCungThat(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => this.xemNgay.xemSuaCungThat(thoiDiem, muiGioHopLe));
  }

  @Get('khai-truong')
  xemKhaiTruong(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => this.xemNgay.xemKhaiTruong(thoiDiem, muiGioHopLe));
  }

  @Get('xuat-hanh')
  xemXuatHanh(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => this.xemNgay.xemXuatHanh(thoiDiem, muiGioHopLe));
  }

  @Get('an-tang')
  xemAnTang(
    @Query('thoiDiem') thoiDiemText: string | undefined,
    @Query('muiGio') muiGio: string | undefined,
  ) {
    const { thoiDiem, muiGioHopLe } = docInput(thoiDiemText, muiGio);
    return this.goi(() => this.xemNgay.xemAnTang(thoiDiem, muiGioHopLe));
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
