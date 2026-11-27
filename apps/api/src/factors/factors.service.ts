import { Injectable } from '@nestjs/common';

import { YeuToNgay } from './domain/day-factor';
import { DinhNghiaYeuToTheoCanNgay, DinhNghiaYeuToTheoChiThang } from './factor-definition';
import { DINH_NGHIA_YEU_TO_THEO_CHI_THANG } from './factor-definitions';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import { DINH_NGHIA_YEU_TO_THEO_CAN_NGAY } from './monthly-stem-factor-definitions';

@Injectable()
export class TinhYeuToNgayService {
  tinh(boiCanh: BoiCanhTinhYeuToNgay): YeuToNgay[] {
    const theoChiNgay = DINH_NGHIA_YEU_TO_THEO_CHI_THANG.filter((dinhNghia) =>
      dinhNghia.chiNgayTheoChiThang[boiCanh.chiThang].includes(boiCanh.chiNgay),
    );

    const theoCanNgay = DINH_NGHIA_YEU_TO_THEO_CAN_NGAY.filter(
      (dinhNghia) => dinhNghia.canNgayTheoChiThang[boiCanh.chiThang] === boiCanh.canNgay,
    );

    return [...theoChiNgay.map(taoYeuToTheoChi), ...theoCanNgay.map(taoYeuToTheoCan)];
  }
}

function taoYeuToTheoChi(dinhNghia: DinhNghiaYeuToTheoChiThang): YeuToNgay {
  return {
    ma: dinhNghia.ma,
    loai: dinhNghia.loai,
    tenKhac: dinhNghia.tenKhac,
    nguon: dinhNghia.nguon,
  };
}

function taoYeuToTheoCan(dinhNghia: DinhNghiaYeuToTheoCanNgay): YeuToNgay {
  return {
    ma: dinhNghia.ma,
    loai: dinhNghia.loai,
    tenKhac: dinhNghia.tenKhac,
    nguon: dinhNghia.nguon,
  };
}
