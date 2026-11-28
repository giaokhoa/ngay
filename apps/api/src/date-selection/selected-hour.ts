import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import type { NguoiLienQuanXemNgay } from './date-selection.service';
import {
  NHAN_DAU_THAN_GIO,
  MaDauGioThamKhao,
  MaDauThanGio,
  ThanHoangHac,
  tinhDauGioThamKhao,
  tinhDauThanGio,
  tinhThanGio,
} from './hoang-hac-dao';
import {
  KetQuaXetNamSinh,
  TruThoiDiem,
  xetCanChiNamSinhVoiTru,
  xetNamSinhVoiTru,
} from './personal-year';

export type XepLoaiGio = 'NEN_DUNG' | 'TRUNG_BINH' | 'NEN_TRANH' | 'XUNG_TUOI';

export interface GioDuocChon {
  chiGio: DiaChi;
  canChiGio: CanChi;
  thanHoangHac: ThanHoangHac;
  dauThanGio: readonly MaDauThanGio[];
  dauGioThamKhao: readonly MaDauGioThamKhao[];
  khoangGio: string;
  xepLoai: XepLoaiGio;
  lyDoTot: readonly string[];
  lyDoTranh: readonly string[];
  xungTuoi: readonly {
    nguoiIndex: number;
    namSinh: number;
    canChiNamSinh: CanChi;
    xung: KetQuaXetNamSinh;
  }[];
}

const CAN_GIO_TY_THEO_CAN_NGAY: Readonly<Record<ThienCan, ThienCan>> = {
  [ThienCan.GIAP]: ThienCan.GIAP,
  [ThienCan.KY]: ThienCan.GIAP,
  [ThienCan.AT]: ThienCan.BINH,
  [ThienCan.CANH]: ThienCan.BINH,
  [ThienCan.BINH]: ThienCan.MAU,
  [ThienCan.TAN]: ThienCan.MAU,
  [ThienCan.DINH]: ThienCan.CANH,
  [ThienCan.NHAM]: ThienCan.CANH,
  [ThienCan.MAU]: ThienCan.NHAM,
  [ThienCan.QUY]: ThienCan.NHAM,
};

const CHI_XUNG: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.TY]: DiaChi.NGO,
  [DiaChi.NGO]: DiaChi.TY,
  [DiaChi.SUU]: DiaChi.MUI,
  [DiaChi.MUI]: DiaChi.SUU,
  [DiaChi.DAN]: DiaChi.THAN,
  [DiaChi.THAN]: DiaChi.DAN,
  [DiaChi.MAO]: DiaChi.DAU,
  [DiaChi.DAU]: DiaChi.MAO,
  [DiaChi.THIN]: DiaChi.TUAT,
  [DiaChi.TUAT]: DiaChi.THIN,
  [DiaChi.TI]: DiaChi.HOI,
  [DiaChi.HOI]: DiaChi.TI,
};

const CHI_HAI: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.TY]: DiaChi.MUI,
  [DiaChi.MUI]: DiaChi.TY,
  [DiaChi.SUU]: DiaChi.NGO,
  [DiaChi.NGO]: DiaChi.SUU,
  [DiaChi.DAN]: DiaChi.TI,
  [DiaChi.TI]: DiaChi.DAN,
  [DiaChi.MAO]: DiaChi.THIN,
  [DiaChi.THIN]: DiaChi.MAO,
  [DiaChi.THAN]: DiaChi.HOI,
  [DiaChi.HOI]: DiaChi.THAN,
  [DiaChi.DAU]: DiaChi.TUAT,
  [DiaChi.TUAT]: DiaChi.DAU,
};

const CHI_HINH: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.TY]: DiaChi.MAO,
  [DiaChi.MAO]: DiaChi.TY,
  [DiaChi.DAN]: DiaChi.TI,
  [DiaChi.TI]: DiaChi.THAN,
  [DiaChi.THAN]: DiaChi.DAN,
  [DiaChi.SUU]: DiaChi.TUAT,
  [DiaChi.TUAT]: DiaChi.MUI,
  [DiaChi.MUI]: DiaChi.SUU,
  [DiaChi.THIN]: DiaChi.THIN,
  [DiaChi.NGO]: DiaChi.NGO,
  [DiaChi.DAU]: DiaChi.DAU,
  [DiaChi.HOI]: DiaChi.HOI,
};

const CHI_LUC_HOP: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.TY]: DiaChi.SUU,
  [DiaChi.SUU]: DiaChi.TY,
  [DiaChi.DAN]: DiaChi.HOI,
  [DiaChi.HOI]: DiaChi.DAN,
  [DiaChi.MAO]: DiaChi.TUAT,
  [DiaChi.TUAT]: DiaChi.MAO,
  [DiaChi.THIN]: DiaChi.DAU,
  [DiaChi.DAU]: DiaChi.THIN,
  [DiaChi.TI]: DiaChi.THAN,
  [DiaChi.THAN]: DiaChi.TI,
  [DiaChi.NGO]: DiaChi.MUI,
  [DiaChi.MUI]: DiaChi.NGO,
};

const CHI_TAM_HOP: Readonly<Record<DiaChi, readonly DiaChi[]>> = {
  [DiaChi.TY]: [DiaChi.THIN, DiaChi.THAN],
  [DiaChi.THIN]: [DiaChi.TY, DiaChi.THAN],
  [DiaChi.THAN]: [DiaChi.TY, DiaChi.THIN],
  [DiaChi.DAN]: [DiaChi.NGO, DiaChi.TUAT],
  [DiaChi.NGO]: [DiaChi.DAN, DiaChi.TUAT],
  [DiaChi.TUAT]: [DiaChi.DAN, DiaChi.NGO],
  [DiaChi.HOI]: [DiaChi.MAO, DiaChi.MUI],
  [DiaChi.MAO]: [DiaChi.HOI, DiaChi.MUI],
  [DiaChi.MUI]: [DiaChi.HOI, DiaChi.MAO],
  [DiaChi.TI]: [DiaChi.DAU, DiaChi.SUU],
  [DiaChi.DAU]: [DiaChi.TI, DiaChi.SUU],
  [DiaChi.SUU]: [DiaChi.TI, DiaChi.DAU],
};

const CHI_LOC_THEO_CAN_NGAY: Readonly<Record<ThienCan, DiaChi>> = {
  [ThienCan.GIAP]: DiaChi.DAN,
  [ThienCan.AT]: DiaChi.MAO,
  [ThienCan.BINH]: DiaChi.TI,
  [ThienCan.MAU]: DiaChi.TI,
  [ThienCan.DINH]: DiaChi.NGO,
  [ThienCan.KY]: DiaChi.NGO,
  [ThienCan.CANH]: DiaChi.THAN,
  [ThienCan.TAN]: DiaChi.DAU,
  [ThienCan.NHAM]: DiaChi.HOI,
  [ThienCan.QUY]: DiaChi.TY,
};

const CHI_MA_THEO_CHI_NGAY: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.THAN]: DiaChi.DAN,
  [DiaChi.TY]: DiaChi.DAN,
  [DiaChi.THIN]: DiaChi.DAN,
  [DiaChi.DAN]: DiaChi.THAN,
  [DiaChi.NGO]: DiaChi.THAN,
  [DiaChi.TUAT]: DiaChi.THAN,
  [DiaChi.HOI]: DiaChi.TI,
  [DiaChi.MAO]: DiaChi.TI,
  [DiaChi.MUI]: DiaChi.TI,
  [DiaChi.TI]: DiaChi.HOI,
  [DiaChi.DAU]: DiaChi.HOI,
  [DiaChi.SUU]: DiaChi.HOI,
};

const CHI_NGU_BAT_NGO_THEO_CAN_NGAY: Readonly<Record<ThienCan, readonly DiaChi[]>> = {
  [ThienCan.GIAP]: [DiaChi.NGO],
  [ThienCan.AT]: [DiaChi.TI],
  [ThienCan.BINH]: [DiaChi.THIN],
  [ThienCan.DINH]: [DiaChi.MAO],
  [ThienCan.MAU]: [DiaChi.DAN],
  [ThienCan.KY]: [DiaChi.SUU, DiaChi.HOI],
  [ThienCan.CANH]: [DiaChi.TY, DiaChi.TUAT],
  [ThienCan.TAN]: [DiaChi.DAU],
  [ThienCan.NHAM]: [DiaChi.THAN],
  [ThienCan.QUY]: [DiaChi.MUI],
};

const KHOANG_GIO: Readonly<Record<DiaChi, string>> = {
  [DiaChi.TY]: '23:00–00:59',
  [DiaChi.SUU]: '01:00–02:59',
  [DiaChi.DAN]: '03:00–04:59',
  [DiaChi.MAO]: '05:00–06:59',
  [DiaChi.THIN]: '07:00–08:59',
  [DiaChi.TI]: '09:00–10:59',
  [DiaChi.NGO]: '11:00–12:59',
  [DiaChi.MUI]: '13:00–14:59',
  [DiaChi.THAN]: '15:00–16:59',
  [DiaChi.DAU]: '17:00–18:59',
  [DiaChi.TUAT]: '19:00–20:59',
  [DiaChi.HOI]: '21:00–22:59',
};

export function tinhCanChiGio(canNgay: ThienCan, chiGio: DiaChi): CanChi {
  const canTy = CAN_GIO_TY_THEO_CAN_NGAY[canNgay];
  const offset = DIA_CHI_THEO_THU_TU.indexOf(chiGio);
  const canTyIndex = THIEN_CAN_THEO_THU_TU.indexOf(canTy);

  return {
    can: THIEN_CAN_THEO_THU_TU[(canTyIndex + offset) % 10]!,
    chi: chiGio,
  };
}

export function xetCacGioTrongNgay(input: {
  canChiNgay: CanChi;
  canChiNam: CanChi;
  canChiThang: CanChi;
  nguoiLienQuan: readonly NguoiLienQuanXemNgay[];
}): readonly GioDuocChon[] {
  return DIA_CHI_THEO_THU_TU.map((chiGio) => {
    const canChiGio = tinhCanChiGio(input.canChiNgay.can, chiGio);
    const thanHoangHac = tinhThanGio(input.canChiNgay.chi, chiGio);
    const dauThanGio = tinhDauThanGio(input.canChiNgay.can, chiGio);
    const dauGioThamKhao = tinhDauGioThamKhao(input.canChiNgay, chiGio);
    const lyDoTot: string[] = [];
    const lyDoTranh: string[] = [];

    if (thanHoangHac.loai === 'HOANG_DAO') {
      lyDoTot.push('Giờ Hoàng đạo: ' + thanHoangHac.ten);
    } else {
      lyDoTranh.push('Giờ Hắc đạo: ' + thanHoangHac.ten);
    }
    for (const marker of dauThanGio) {
      lyDoTot.push(NHAN_DAU_THAN_GIO[marker]);
    }

    if (chiGio === input.canChiNgay.chi) lyDoTot.push('Giờ đồng Chi với ngày');
    if (CHI_LUC_HOP[input.canChiNgay.chi] === chiGio) lyDoTot.push('Giờ lục hợp với ngày');
    if (CHI_TAM_HOP[input.canChiNgay.chi].includes(chiGio)) {
      lyDoTot.push('Giờ tam hợp với ngày');
    }
    if (CHI_LOC_THEO_CAN_NGAY[input.canChiNgay.can] === chiGio) {
      lyDoTot.push('Lộc của Can ngày đến giờ');
    }
    if (CHI_MA_THEO_CHI_NGAY[input.canChiNgay.chi] === chiGio) {
      lyDoTot.push('Dịch Mã của ngày đến giờ');
    }

    if (CHI_XUNG[input.canChiNgay.chi] === chiGio) {
      lyDoTranh.push('Giờ phá ngày');
    }
    if (CHI_HINH[input.canChiNgay.chi] === chiGio) {
      lyDoTranh.push('Giờ hình ngày');
    }
    if (CHI_HAI[input.canChiNgay.chi] === chiGio) {
      lyDoTranh.push('Giờ hại ngày');
    }
    if (CHI_NGU_BAT_NGO_THEO_CAN_NGAY[input.canChiNgay.can].includes(chiGio)) {
      lyDoTranh.push('Ngũ Bất Ngộ');
    }
    if (CHI_XUNG[input.canChiNam.chi] === chiGio) {
      lyDoTranh.push('Giờ xung Chi của năm thực hiện');
    }
    if (CHI_XUNG[input.canChiThang.chi] === chiGio) {
      lyDoTranh.push('Giờ xung Chi của tháng tiết khí');
    }

    const xungTuoi = input.nguoiLienQuan
      .map((nguoi, nguoiIndex) => {
        const xung = nguoi.canChiNamSinh
          ? xetCanChiNamSinhVoiTru(
              nguoi.namSinh,
              nguoi.canChiNamSinh,
              canChiGio,
              'GIO' satisfies TruThoiDiem,
            )
          : xetNamSinhVoiTru(
              nguoi.namSinh,
              canChiGio,
              'GIO' satisfies TruThoiDiem,
              nguoi.truocLapXuan ?? false,
            );

        return {
          nguoiIndex,
          namSinh: nguoi.namSinh,
          canChiNamSinh: xung.canChiNamSinh,
          xung,
        };
      })
      .filter((item) => item.xung.xung);

    const xepLoai: XepLoaiGio =
      xungTuoi.length > 0
        ? 'XUNG_TUOI'
        : lyDoTranh.length > 0
          ? 'NEN_TRANH'
          : lyDoTot.length > 0
            ? 'NEN_DUNG'
            : 'TRUNG_BINH';

    return {
      chiGio,
      canChiGio,
      thanHoangHac,
      dauThanGio,
      dauGioThamKhao,
      khoangGio: KHOANG_GIO[chiGio],
      xepLoai,
      lyDoTot,
      lyDoTranh,
      xungTuoi,
    };
  });
}
