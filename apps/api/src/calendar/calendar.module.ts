import { Module } from '@nestjs/common';

import { TinhLichService } from './calendar.service';
import { TinhTietKhiService } from './solar-term.service';

@Module({
  providers: [TinhTietKhiService, TinhLichService],
  exports: [TinhLichService],
})
export class LichModule {}
