import { Injectable } from '@nestjs/common';

import { LoaiCongViec, QuyTacDungSu } from './activity-rule';
import { QUY_TAC_CUOI_HOI } from './cuoi-hoi-rules';

@Injectable()
export class DungSuService {
  layQuyTac(congViec: LoaiCongViec): readonly QuyTacDungSu[] {
    switch (congViec) {
      case LoaiCongViec.CUOI_HOI:
        return QUY_TAC_CUOI_HOI;
    }
  }
}
