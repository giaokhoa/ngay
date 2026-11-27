import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { QuanSatHttpInterceptor } from './http-observability.interceptor';
import { QuanSatHttpService } from './http-metrics.service';
import { MetricsController } from './metrics.controller';

@Module({
  controllers: [MetricsController],
  providers: [
    QuanSatHttpService,
    {
      provide: APP_INTERCEPTOR,
      useClass: QuanSatHttpInterceptor,
    },
  ],
})
export class QuanSatModule {}
