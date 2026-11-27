import { Module } from '@nestjs/common';

import { DanhGiaNgayService } from './evaluation.service';

@Module({
  providers: [DanhGiaNgayService],
  exports: [DanhGiaNgayService],
})
export class DanhGiaNgayModule {}
