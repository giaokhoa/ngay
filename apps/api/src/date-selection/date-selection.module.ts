import { Module } from '@nestjs/common';

import { DungSuModule } from '../activities/activities.module';
import { LichModule } from '../calendar/calendar.module';
import { DanhGiaNgayModule } from '../evaluation/evaluation.module';
import { YeuToNgayModule } from '../factors/factors.module';
import { XemNgayController } from './date-selection.controller';
import { XemNgayService } from './date-selection.service';

@Module({
  imports: [LichModule, YeuToNgayModule, DungSuModule, DanhGiaNgayModule],
  providers: [XemNgayService],
  controllers: [XemNgayController],
  exports: [XemNgayService],
})
export class XemNgayModule {}
