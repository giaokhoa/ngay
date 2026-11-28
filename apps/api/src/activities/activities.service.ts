import { Injectable } from '@nestjs/common';

import { LoaiCongViec, QuyTacDungSu } from './activity-rule';
import { QUY_TAC_AN_GIUONG } from './an-giuong-rules';
import { QUY_TAC_AN_TANG } from './an-tang-rules';
import { QUY_TAC_CAU_PHUC } from './cau-phuc-rules';
import { QUY_TAC_CAU_TU } from './cau-tu-rules';
import { QUY_TAC_CAU_Y_TRI_BENH } from './cau-y-tri-benh-rules';
import { QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM } from './chan-tha-gia-suc-gia-cam-rules';
import { QUY_TAC_CHINH_DUNG_CAT_TOC } from './chinh-dung-cat-toc-rules';
import { QUY_TAC_CUOI_HOI } from './cuoi-hoi-rules';
import { QUY_TAC_GIAI_TRU } from './giai-tru-rules';
import { QUY_TAC_DAT_COI_XAY_GIA } from './dat-coi-xay-gia-rules';
import { QUY_TAC_DI_CHUYEN } from './di-chuyen-rules';
import { QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC } from './di-thuyen-vuot-song-nuoc-rules';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from './earthwork-rules';
import { QUY_TAC_KHAI_TRUONG } from './khai-truong-rules';
import { QUY_TAC_KHANH_THUONG } from './khanh-thuong-rules';
import { QUY_TAC_LAP_KHE_UOC_GIAO_DICH } from './lap-khe-uoc-giao-dich-rules';
import { QUY_TAC_MAY_DO } from './may-do-rules';
import { QUY_TAC_MO_KHO_XUAT_HANG_TIEN } from './mo-kho-xuat-hang-tien-rules';
import { QUY_TAC_NAP_TAI } from './nap-tai-rules';
import { QUY_TAC_NHAN_NAP_GIA_SUC } from './nhan-nap-gia-suc-rules';
import { QUY_TAC_NHAP_HOC } from './nhap-hoc-rules';
import { QUY_TAC_PHA_NHA_HUY_TUONG } from './pha-nha-huy-tuong-rules';
import { QUY_TAC_PHA_VO_DAT } from './pha-vo-dat-rules';
import { QUY_TAC_QUAN_DAI } from './quan-dai-rules';
import { QUY_TAC_QUET_DON_NHA_CUA } from './quet-don-nha-cua-rules';
import { QUY_TAC_SUA_BUONG_SAN_PHU } from './sua-buong-san-phu-rules';
import { QUY_TAC_SUA_MONG_TAY_CHAN } from './sua-mong-tay-chan-rules';
import { QUY_TAC_SUA_SANG_DUONG_SA } from './sua-sang-duong-sa-rules';
import { QUY_TAC_TE_TU } from './te-tu-rules';
import { QUY_TAC_TROC_NA_BAT_BO } from './troc-na-bat-bo-rules';
import { QUY_TAC_TRONG_TROT } from './trong-trot-rules';
import { QUY_TAC_TRANG_TRI_TUONG } from './trang-tri-tuong-rules';
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
      case LoaiCongViec.NAP_TAI:
        return QUY_TAC_NAP_TAI;
      case LoaiCongViec.MO_KHO_XUAT_HANG_TIEN:
        return QUY_TAC_MO_KHO_XUAT_HANG_TIEN;
      case LoaiCongViec.SUA_BUONG_SAN_PHU:
        return QUY_TAC_SUA_BUONG_SAN_PHU;
      case LoaiCongViec.DAT_COI_XAY_GIA:
        return QUY_TAC_DAT_COI_XAY_GIA;
      case LoaiCongViec.QUET_DON_NHA_CUA:
        return QUY_TAC_QUET_DON_NHA_CUA;
      case LoaiCongViec.TRANG_TRI_TUONG:
        return QUY_TAC_TRANG_TRI_TUONG;
      case LoaiCongViec.SUA_SANG_DUONG_SA:
        return QUY_TAC_SUA_SANG_DUONG_SA;
      case LoaiCongViec.PHA_NHA_HUY_TUONG:
        return QUY_TAC_PHA_NHA_HUY_TUONG;
      case LoaiCongViec.TROC_NA_BAT_BO:
        return QUY_TAC_TROC_NA_BAT_BO;
      case LoaiCongViec.DI_THUYEN_VUOT_SONG_NUOC:
        return QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC;
      case LoaiCongViec.TRONG_TROT:
        return QUY_TAC_TRONG_TROT;
      case LoaiCongViec.CHAN_THA_GIA_SUC_GIA_CAM:
        return QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM;
      case LoaiCongViec.NHAN_NAP_GIA_SUC:
        return QUY_TAC_NHAN_NAP_GIA_SUC;
      case LoaiCongViec.DONG_THO:
        return QUY_TAC_DONG_THO;
      case LoaiCongViec.SUA_CUNG_THAT:
        return QUY_TAC_SUA_CUNG_THAT;
      case LoaiCongViec.KHAI_TRUONG:
        return QUY_TAC_KHAI_TRUONG;
      case LoaiCongViec.XUAT_HANH:
        return QUY_TAC_XUAT_HANH;
      case LoaiCongViec.PHA_VO_DAT:
        return QUY_TAC_PHA_VO_DAT;
      case LoaiCongViec.AN_TANG:
        return QUY_TAC_AN_TANG;
    }
  }
}
