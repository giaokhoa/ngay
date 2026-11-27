import { Injectable } from '@nestjs/common';

import { tinhMuaTheoChiThang } from '../calendar/season';
import { YeuToNgay } from './domain/day-factor';
import { DinhNghiaYeuTo } from './factor-definition';
import { DINH_NGHIA_YEU_TO_THEO_CHI_THANG } from './factor-definitions';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import {
  DINH_NGHIA_THIEN_AN,
  DINH_NGHIA_THIEN_NGUYEN,
  DINH_NGHIA_THIEN_XA,
  DINH_NGHIA_THOI_DUC,
  DINH_NGHIA_TU_TUONG,
} from './fixed-seasonal-factor-definitions';
import { DINH_NGHIA_THIEN_DUC } from './heavenly-virtue-definition';
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

    const mua = tinhMuaTheoChiThang(boiCanh.chiThang);
    const ketQua: DinhNghiaYeuTo[] = [...theoChiNgay, ...theoCanNgay];

    if (DINH_NGHIA_THIEN_DUC.canNgayTheoChiThang[boiCanh.chiThang] === boiCanh.canNgay) {
      ketQua.push(DINH_NGHIA_THIEN_DUC);
    }

    if (DINH_NGHIA_THIEN_AN.canChiNgay.some((canChi) => khopCanChi(canChi, boiCanh))) {
      ketQua.push(DINH_NGHIA_THIEN_AN);
    }

    if (khopCanChi(DINH_NGHIA_THIEN_XA.canChiNgayTheoMua[mua], boiCanh)) {
      ketQua.push(DINH_NGHIA_THIEN_XA);
    }

    if (khopCanChi(DINH_NGHIA_THIEN_NGUYEN.canChiNgayTheoChiThang[boiCanh.chiThang], boiCanh)) {
      ketQua.push(DINH_NGHIA_THIEN_NGUYEN);
    }

    if (DINH_NGHIA_TU_TUONG.canNgayTheoMua[mua].includes(boiCanh.canNgay)) {
      ketQua.push(DINH_NGHIA_TU_TUONG);
    }

    if (DINH_NGHIA_THOI_DUC.chiNgayTheoMua[mua] === boiCanh.chiNgay) {
      ketQua.push(DINH_NGHIA_THOI_DUC);
    }

    return ketQua.map(taoYeuTo);
  }
}

function khopCanChi(
  canChi: { can: BoiCanhTinhYeuToNgay['canNgay']; chi: BoiCanhTinhYeuToNgay['chiNgay'] },
  boiCanh: BoiCanhTinhYeuToNgay,
): boolean {
  return canChi.can === boiCanh.canNgay && canChi.chi === boiCanh.chiNgay;
}

function taoYeuTo(dinhNghia: DinhNghiaYeuTo): YeuToNgay {
  return {
    ma: dinhNghia.ma,
    loai: dinhNghia.loai,
    tenKhac: dinhNghia.tenKhac,
    nguon: dinhNghia.nguon,
  };
}
