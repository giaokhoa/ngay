import { Module } from '@nestjs/common';

import { TinhLichService } from './calendar.service';
import { TinhThoVuongService } from './earth-reign.service';
import { TinhTietKhiService } from './solar-term.service';

@Module({
  providers: [TinhTietKhiService, TinhThoVuongService, TinhLichService],
  exports: [TinhLichService],
})
export class LichModule {}
