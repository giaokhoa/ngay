import { Module } from '@nestjs/common';

import { SucKhoeController } from './health/health.controller';

@Module({
  controllers: [SucKhoeController],
})
export class UngDungModule {}
