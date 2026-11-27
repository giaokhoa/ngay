import { Module } from '@nestjs/common';

import { DungSuService } from './activities.service';

@Module({
  providers: [DungSuService],
  exports: [DungSuService],
})
export class DungSuModule {}
