import { Module } from '@nestjs/common';

import { DungSuModule } from './activities/activities.module';
import { LichModule } from './calendar/calendar.module';
import { XemNgayModule } from './date-selection/date-selection.module';
import { DanhGiaNgayModule } from './evaluation/evaluation.module';
import { YeuToNgayModule } from './factors/factors.module';
import { SucKhoeController } from './health/health.controller';
import { KhoTriThucModule } from './knowledge/knowledge.module';
import { QuanSatModule } from './observability/observability.module';

@Module({
  imports: [
    LichModule,
    YeuToNgayModule,
    DungSuModule,
    DanhGiaNgayModule,
    XemNgayModule,
    KhoTriThucModule,
    QuanSatModule,
  ],
  controllers: [SucKhoeController],
})
export class UngDungModule {}
