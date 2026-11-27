import { Controller, Get, Header } from '@nestjs/common';

import { QuanSatHttpService } from './http-metrics.service';

@Controller()
export class MetricsController {
  constructor(private readonly metrics: QuanSatHttpService) {}

  @Get('metrics')
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  metricsPrometheus(): string {
    return this.metrics.xuatPrometheus();
  }
}
