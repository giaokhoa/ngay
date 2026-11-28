import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';

export type MucDoXungTuoi = 'KHONG_XUNG' | 'XUNG_CHI' | 'THIEN_KHAC_DIA_XUNG';

export type TruThoiDiem = 'NAM' | 'THANG' | 'NGAY' | 'GIO';

export interface KetQuaXetNamSinh {
  namSinh: number;
  canChiNamSinh: CanChi;
  tru: TruThoiDiem;
  mucDo: MucDoXungTuoi;
  xung: boolean;
  moTa: string;
}

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

type NguHanh = 'MOC' | 'HOA' | 'THO' | 'KIM' | 'THUY';

const NGU_HANH_CAN: Readonly<Record<ThienCan, NguHanh>> = {
  [ThienCan.GIAP]: 'MOC',
  [ThienCan.AT]: 'MOC',
  [ThienCan.BINH]: 'HOA',
  [ThienCan.DINH]: 'HOA',
  [ThienCan.MAU]: 'THO',
  [ThienCan.KY]: 'THO',
  [ThienCan.CANH]: 'KIM',
  [ThienCan.TAN]: 'KIM',
  [ThienCan.NHAM]: 'THUY',
  [ThienCan.QUY]: 'THUY',
};

const KHAC: Readonly<Record<NguHanh, NguHanh>> = {
  MOC: 'THO',
  HOA: 'KIM',
  THO: 'THUY',
  KIM: 'MOC',
  THUY: 'HOA',
};

/**
 * Can-Chi năm theo mốc Giáp Tý 1984.
 *
 * Hiệp Kỷ Q33 luận "sinh niên", không luận ngày sinh. Nếu sinh trước Lập Xuân,
 * UI phải hướng dẫn dùng năm Can-Chi trước đó.
 */
export function tinhCanChiNamSinh(namSinh: number, truocLapXuan = false): CanChi {
  if (!Number.isInteger(namSinh) || namSinh < 1 || namSinh > 9999) {
    throw new RangeError('Năm sinh phải là số nguyên từ 1 đến 9999');
  }

  const namCanChi = truocLapXuan ? namSinh - 1 : namSinh;
  const offset = modulo(namCanChi - 1984, 60);

  return {
    can: THIEN_CAN_THEO_THU_TU[offset % 10]!,
    chi: DIA_CHI_THEO_THU_TU[offset % 12]!,
  };
}

export function xetNamSinhVoiTru(
  namSinh: number,
  canChiTru: CanChi,
  tru: TruThoiDiem,
  truocLapXuan = false,
): KetQuaXetNamSinh {
  const canChiNamSinh = tinhCanChiNamSinh(namSinh, truocLapXuan);

  if (CHI_XUNG[canChiNamSinh.chi] !== canChiTru.chi) {
    return {
      namSinh,
      canChiNamSinh,
      tru,
      mucDo: 'KHONG_XUNG',
      xung: false,
      moTa: 'Không xung Chi năm sinh.',
    };
  }

  if (KHAC[NGU_HANH_CAN[canChiTru.can]] === NGU_HANH_CAN[canChiNamSinh.can]) {
    return {
      namSinh,
      canChiNamSinh,
      tru,
      mucDo: 'THIEN_KHAC_DIA_XUNG',
      xung: true,
      moTa: 'Thiên khắc địa xung: Can của thời điểm khắc Can năm sinh, Chi lại xung năm sinh.',
    };
  }

  return {
    namSinh,
    canChiNamSinh,
    tru,
    mucDo: 'XUNG_CHI',
    xung: true,
    moTa: 'Chi của thời điểm xung trực tiếp Chi năm sinh.',
  };
}

export function xetNamSinhVoiNgay(
  namSinh: number,
  canChiNgay: CanChi,
  truocLapXuan = false,
): KetQuaXetNamSinh {
  return xetNamSinhVoiTru(namSinh, canChiNgay, 'NGAY', truocLapXuan);
}

function modulo(value: number, base: number): number {
  return ((value % base) + base) % base;
}
