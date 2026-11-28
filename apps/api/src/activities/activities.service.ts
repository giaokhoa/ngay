import { Injectable } from '@nestjs/common';

import { LoaiCongViec, QuyTacDungSu } from './activity-rule';
import { QUY_TAC_AN_GIUONG } from './an-giuong-rules';
import { QUY_TAC_AN_TANG } from './an-tang-rules';
import { QUY_TAC_CAU_PHUC } from './cau-phuc-rules';
import { QUY_TAC_CAU_TU } from './cau-tu-rules';
import { QUY_TAC_CAU_Y_TRI_BENH } from './cau-y-tri-benh-rules';
import { QUY_TAC_CHINH_DUNG_CAT_TOC } from './chinh-dung-cat-toc-rules';
import { QUY_TAC_CUOI_HOI } from './cuoi-hoi-rules';
import { QUY_TAC_GIAI_TRU } from './giai-tru-rules';
import { QUY_TAC_DI_CHUYEN } from './di-chuyen-rules';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from './earthwork-rules';
import { QUY_TAC_KHAI_TRUONG } from './khai-truong-rules';
import { QUY_TAC_KHANH_THUONG } from './khanh-thuong-rules';
import { QUY_TAC_LAP_KHE_UOC_GIAO_DICH } from './lap-khe-uoc-giao-dich-rules';
import { QUY_TAC_MAY_DO } from './may-do-rules';
import { QUY_TAC_NHAP_HOC } from './nhap-hoc-rules';
import { QUY_TAC_QUAN_DAI } from './quan-dai-rules';
import { QUY_TAC_SUA_MONG_TAY_CHAN } from './sua-mong-tay-chan-rules';
import { QUY_TAC_TE_TU } from './te-tu-rules';
import { QUY_TAC_XUAT_HANH } from './xuat-hanh-rules';
import { QUY_TAC_YEN_HOI } from './yen-hoi-rules';

@Injectable()
export class DungSuService {
  layQuyTac(congViec: LoaiCongViec): readonly QuyTacDungSu[] {
    switch (congViec) {
      case LoaiCongViec.CUOI_HOI:
        return QUY_TAC_CUOI_HOI;
      case LoaiCongViec.DI_CHUYEN:
        return QUY_TAC_DI_CHUYEN;
      case LoaiCongViec.AN_GIUONG:
        return QUY_TAC_AN_GIUONG;
      case LoaiCongViec.QUAN_DAI:
        return QUY_TAC_QUAN_DAI;
      case LoaiCongViec.NHAP_HOC:
        return QUY_TAC_NHAP_HOC;
      case LoaiCongViec.YEN_HOI:
        return QUY_TAC_YEN_HOI;
      case LoaiCongViec.KHANH_THUONG:
        return QUY_TAC_KHANH_THUONG;
      case LoaiCongViec.TE_TU:
        return QUY_TAC_TE_TU;
      case LoaiCongViec.CAU_PHUC:
        return QUY_TAC_CAU_PHUC;
      case LoaiCongViec.CAU_TU:
        return QUY_TAC_CAU_TU;
      case LoaiCongViec.GIAI_TRU:
        return QUY_TAC_GIAI_TRU;
      case LoaiCongViec.CHINH_DUNG_CAT_TOC:
        return QUY_TAC_CHINH_DUNG_CAT_TOC;
      case LoaiCongViec.CAU_Y_TRI_BENH:
        return QUY_TAC_CAU_Y_TRI_BENH;
      case LoaiCongViec.SUA_MONG_TAY_CHAN:
        return QUY_TAC_SUA_MONG_TAY_CHAN;
      case LoaiCongViec.MAY_DO:
        return QUY_TAC_MAY_DO;
      case LoaiCongViec.LAP_KHE_UOC_GIAO_DICH:
        return QUY_TAC_LAP_KHE_UOC_GIAO_DICH;
      case LoaiCongViec.DONG_THO:
        return QUY_TAC_DONG_THO;
      case LoaiCongViec.SUA_CUNG_THAT:
        return QUY_TAC_SUA_CUNG_THAT;
      case LoaiCongViec.KHAI_TRUONG:
        return QUY_TAC_KHAI_TRUONG;
      case LoaiCongViec.XUAT_HANH:
        return QUY_TAC_XUAT_HANH;
      case LoaiCongViec.AN_TANG:
        return QUY_TAC_AN_TANG;
    }
  }
}
