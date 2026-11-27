import { Module } from '@nestjs/common';

import { KhoTriThucController } from './knowledge.controller';
import { KhoTriThucPostgresService } from './knowledge.service';

@Module({
  controllers: [KhoTriThucController],
  providers: [KhoTriThucPostgresService],
  exports: [KhoTriThucPostgresService],
})
export class KhoTriThucModule {}
