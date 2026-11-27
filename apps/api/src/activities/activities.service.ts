import { Injectable } from '@nestjs/common';

import { LoaiCongViec, QuyTacDungSu } from './activity-rule';
import { QUY_TAC_CUOI_HOI } from './cuoi-hoi-rules';
import { QUY_TAC_DI_CHUYEN } from './di-chuyen-rules';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from './earthwork-rules';
import { QUY_TAC_KHAI_TRUONG } from './khai-truong-rules';
import { QUY_TAC_XUAT_HANH } from './xuat-hanh-rules';

@Injectable()
export class DungSuService {
  layQuyTac(congViec: LoaiCongViec): readonly QuyTacDungSu[] {
    switch (congViec) {
      case LoaiCongViec.CUOI_HOI:
        return QUY_TAC_CUOI_HOI;
      case LoaiCongViec.DI_CHUYEN:
        return QUY_TAC_DI_CHUYEN;
      case LoaiCongViec.DONG_THO:
        return QUY_TAC_DONG_THO;
      case LoaiCongViec.SUA_CUNG_THAT:
        return QUY_TAC_SUA_CUNG_THAT;
      case LoaiCongViec.KHAI_TRUONG:
        return QUY_TAC_KHAI_TRUONG;
      case LoaiCongViec.XUAT_HANH:
        return QUY_TAC_XUAT_HANH;
    }
  }
}
