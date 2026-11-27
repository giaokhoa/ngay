import { Module } from '@nestjs/common';

import { TinhYeuToNgayService } from './factors.service';

@Module({
  providers: [TinhYeuToNgayService],
  exports: [TinhYeuToNgayService],
})
export class YeuToNgayModule {}
