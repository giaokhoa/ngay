import { Injectable } from '@nestjs/common';

import { tinhMuaTheoChiThang } from '../calendar/season';
import { tinhThapNhiTruc } from '../calendar/twelve-officer';
import {
  DINH_NGHIA_O_PHE,
  DINH_NGHIA_PHUC_NHAT,
  DINH_NGHIA_TRONG_NHAT,
} from './an-tang-factor-definitions';
import { DINH_NGHIA_BAT_TUONG } from './bat-tuong-definition';
import { DINH_NGHIA_DIA_NANG, DINH_NGHIA_THO_PHU_TIN } from './earthwork-factor-definitions';
import { DINH_NGHIA_CUU_KHONG, DINH_NGHIA_TU_HAO } from './khai-truong-factor-definitions';
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
import { DINH_NGHIA_MAU_THUONG } from './maternal-storehouse-definition';
import { DINH_NGHIA_NGU_HOP, DINH_NGHIA_NGU_LY } from './q5-fixed-branch-factor-definitions';
import { DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6 } from './q6-ritual-factor-definitions';
import { DINH_NGHIA_DU_HOA } from './q6-du-hoa-definition';
import { DINH_NGHIA_GIAI_THAN } from './q5-giai-than-definition';
import { DINH_NGHIA_VO_LOC, laVoLoc } from './vo-loc-definition';
import {
  DINH_NGHIA_HOI_NHAT,
  DINH_NGHIA_TU_LY,
  DINH_NGHIA_TU_TUYET,
  laHoiNhat,
  laTuLy,
  laTuTuyet,
} from './special-calendar-day-definitions';
import {
  DINH_NGHIA_DAN_NHAT,
  DINH_NGHIA_QUY_KY,
  DINH_NGHIA_THIEN_MA,
  DINH_NGHIA_VUONG_NHAT,
} from './moving-factor-definitions';
import { DINH_NGHIA_NGUYET_PHA } from './monthly-break-definition';
import { DINH_NGHIA_YEU_TO_THEO_CAN_NGAY } from './monthly-stem-factor-definitions';
import {
  DINH_NGHIA_YEU_TO_QUAN_HE_THANG_QUYEN_4,
  DINH_NGHIA_YEU_TO_THEO_TRUC,
} from './q4-shared-position-definitions';
import {
  DINH_NGHIA_BAT_CHUYEN,
  DINH_NGHIA_NGU_MO,
  DINH_NGHIA_TU_CUNG,
  DINH_NGHIA_TU_KY,
  DINH_NGHIA_TU_PHE,
} from './q5-wedding-blocker-definitions';
import { DINH_NGHIA_BLOCKER_CUOI_HOI_QUYEN_6 } from './q6-wedding-blocker-definitions';
import {
  DINH_NGHIA_NGUYET_KY,
  DINH_NGHIA_PHAN_CHI,
  DINH_NGHIA_THUONG_SOC,
  laNguyetKy,
  laPhanChi,
  laThuongSoc,
} from './q6-lunar-context-definitions';

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
    const truc = tinhThapNhiTruc(boiCanh.chiThang, boiCanh.chiNgay);
    const theoTruc = [...DINH_NGHIA_YEU_TO_THEO_TRUC, DINH_NGHIA_NGUYET_PHA].filter((dinhNghia) =>
      dinhNghia.viTri.some(
        (viTri) =>
          viTri.truc === truc &&
          (!viTri.chiThangApDung || viTri.chiThangApDung.includes(boiCanh.chiThang)),
      ),
    );
    const quanHeThangQuyen4 = DINH_NGHIA_YEU_TO_QUAN_HE_THANG_QUYEN_4.filter((dinhNghia) =>
      dinhNghia.chiNgayTheoChiThang[boiCanh.chiThang].includes(boiCanh.chiNgay),
    );
    const blockerQuyen6 = DINH_NGHIA_BLOCKER_CUOI_HOI_QUYEN_6.filter((dinhNghia) =>
      dinhNghia.chiNgayTheoChiThang[boiCanh.chiThang].includes(boiCanh.chiNgay),
    );
    const thanTeTuQuyen6 = DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6.filter((dinhNghia) =>
      dinhNghia.chiNgayTheoChiThang[boiCanh.chiThang].includes(boiCanh.chiNgay),
    );
    const duHoaQuyen6 = DINH_NGHIA_DU_HOA.chiNgayTheoChiThang[boiCanh.chiThang].includes(
      boiCanh.chiNgay,
    )
      ? [DINH_NGHIA_DU_HOA]
      : [];
    const giaiThanQuyen5 = DINH_NGHIA_GIAI_THAN.chiNgayTheoChiThang[boiCanh.chiThang].includes(
      boiCanh.chiNgay,
    )
      ? [DINH_NGHIA_GIAI_THAN]
      : [];
    const yeuToDiChuyenTheoThang = [DINH_NGHIA_THIEN_MA, DINH_NGHIA_QUY_KY].filter((dinhNghia) =>
      dinhNghia.chiNgayTheoChiThang[boiCanh.chiThang].includes(boiCanh.chiNgay),
    );
    const yeuToCongViecDatTheoChi = [DINH_NGHIA_THO_PHU_TIN].filter((dinhNghia) =>
      dinhNghia.chiNgayTheoChiThang[boiCanh.chiThang].includes(boiCanh.chiNgay),
    );
    const yeuToKhaiTruongTheoChi = [DINH_NGHIA_CUU_KHONG].filter((dinhNghia) =>
      dinhNghia.chiNgayTheoChiThang[boiCanh.chiThang].includes(boiCanh.chiNgay),
    );
    const ketQua: DinhNghiaYeuTo[] = [
      ...theoChiNgay,
      ...theoCanNgay,
      ...theoTruc,
      ...quanHeThangQuyen4,
      ...blockerQuyen6,
      ...thanTeTuQuyen6,
      ...duHoaQuyen6,
      ...giaiThanQuyen5,
      ...yeuToDiChuyenTheoThang,
      ...yeuToCongViecDatTheoChi,
      ...yeuToKhaiTruongTheoChi,
    ];

    if (
      DINH_NGHIA_DIA_NANG.tapCanChiNgayTheoChiThang[boiCanh.chiThang].some((canChi) =>
        khopCanChi(canChi, boiCanh),
      )
    ) {
      ketQua.push(DINH_NGHIA_DIA_NANG);
    }

    if (DINH_NGHIA_DAN_NHAT.chiNgayTheoMua[mua] === boiCanh.chiNgay) {
      ketQua.push(DINH_NGHIA_DAN_NHAT);
    }

    if (DINH_NGHIA_VUONG_NHAT.chiNgayTheoMua[mua] === boiCanh.chiNgay) {
      ketQua.push(DINH_NGHIA_VUONG_NHAT);
    }

    if (DINH_NGHIA_TU_PHE.tapCanChiNgayTheoMua[mua].some((canChi) => khopCanChi(canChi, boiCanh))) {
      ketQua.push(DINH_NGHIA_TU_PHE);
    }

    if (khopCanChi(DINH_NGHIA_TU_HAO.canChiNgayTheoMua[mua], boiCanh)) {
      ketQua.push(DINH_NGHIA_TU_HAO);
    }

    if (khopCanChi(DINH_NGHIA_TU_KY.canChiNgayTheoMua[mua], boiCanh)) {
      ketQua.push(DINH_NGHIA_TU_KY);
    }

    if (khopCanChi(DINH_NGHIA_TU_CUNG.canChiNgayTheoMua[mua], boiCanh)) {
      ketQua.push(DINH_NGHIA_TU_CUNG);
    }

    if (khopCanChi(DINH_NGHIA_NGU_MO.canChiNgayTheoChiThang[boiCanh.chiThang], boiCanh)) {
      ketQua.push(DINH_NGHIA_NGU_MO);
    }

    if (DINH_NGHIA_BAT_CHUYEN.canChiNgay.some((canChi) => khopCanChi(canChi, boiCanh))) {
      ketQua.push(DINH_NGHIA_BAT_CHUYEN);
    }

    if (DINH_NGHIA_O_PHE.canChiNgay.some((canChi) => khopCanChi(canChi, boiCanh))) {
      ketQua.push(DINH_NGHIA_O_PHE);
    }

    if (DINH_NGHIA_PHUC_NHAT.canNgayTheoChiThang[boiCanh.chiThang] === boiCanh.canNgay) {
      ketQua.push(DINH_NGHIA_PHUC_NHAT);
    }

    if (DINH_NGHIA_TRONG_NHAT.chiNgay.includes(boiCanh.chiNgay)) {
      ketQua.push(DINH_NGHIA_TRONG_NHAT);
    }

    if (DINH_NGHIA_NGU_HOP.chiNgay.includes(boiCanh.chiNgay)) {
      ketQua.push(DINH_NGHIA_NGU_HOP);
    }

    if (DINH_NGHIA_NGU_LY.chiNgay.includes(boiCanh.chiNgay)) {
      ketQua.push(DINH_NGHIA_NGU_LY);
    }

    if (DINH_NGHIA_THIEN_DUC.canNgayTheoChiThang[boiCanh.chiThang] === boiCanh.canNgay) {
      ketQua.push(DINH_NGHIA_THIEN_DUC);
    }

    if (
      DINH_NGHIA_BAT_TUONG.tapCanChiNgayTheoChiThang[boiCanh.chiThang].some((canChi) =>
        khopCanChi(canChi, boiCanh),
      )
    ) {
      ketQua.push(DINH_NGHIA_BAT_TUONG);
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

    const chiNgayMauThuong = boiCanh.dangThoVuong
      ? DINH_NGHIA_MAU_THUONG.chiNgayKhiThoVuong
      : DINH_NGHIA_MAU_THUONG.chiNgayTheoMua[mua];

    if (chiNgayMauThuong.includes(boiCanh.chiNgay)) {
      ketQua.push(DINH_NGHIA_MAU_THUONG);
    }

    if (DINH_NGHIA_THOI_DUC.chiNgayTheoMua[mua] === boiCanh.chiNgay) {
      ketQua.push(DINH_NGHIA_THOI_DUC);
    }

    if (laThuongSoc(boiCanh)) ketQua.push(DINH_NGHIA_THUONG_SOC);
    if (laPhanChi(boiCanh)) ketQua.push(DINH_NGHIA_PHAN_CHI);
    if (laNguyetKy(boiCanh)) ketQua.push(DINH_NGHIA_NGUYET_KY);
    if (laTuLy(boiCanh)) ketQua.push(DINH_NGHIA_TU_LY);
    if (laTuTuyet(boiCanh)) ketQua.push(DINH_NGHIA_TU_TUYET);
    if (laHoiNhat(boiCanh)) ketQua.push(DINH_NGHIA_HOI_NHAT);

    if (laVoLoc(boiCanh, new Set(ketQua.map((item) => item.ma)))) {
      ketQua.push(DINH_NGHIA_VO_LOC);
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
