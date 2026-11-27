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
    if (!thoiDiemText || !muiGio) {
      throw new BadRequestException('Cần thoiDiem ISO-8601 và muiGio IANA');
    }

    const thoiDiem = new Date(thoiDiemText);
    if (Number.isNaN(thoiDiem.getTime())) {
      throw new BadRequestException('thoiDiem không hợp lệ');
    }

    try {
      return this.xemNgay.xemCuoiHoi(thoiDiem, muiGio);
    } catch (error) {
      if (error instanceof RangeError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
