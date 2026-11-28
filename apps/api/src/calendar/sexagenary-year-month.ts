import { DIA_CHI_THEO_THU_TU, DiaChi } from './domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from './domain/heavenly-stem';
import { CanChi } from './domain/sexagenary-cycle';
import { TietKhi } from './domain/solar-term';
import { TinhTietKhiService } from './solar-term.service';

const CAN_THANG_DAN_THEO_CAN_NAM: Readonly<Record<ThienCan, ThienCan>> = {
  [ThienCan.GIAP]: ThienCan.BINH,
  [ThienCan.KY]: ThienCan.BINH,
  [ThienCan.AT]: ThienCan.MAU,
  [ThienCan.CANH]: ThienCan.MAU,
  [ThienCan.BINH]: ThienCan.CANH,
  [ThienCan.TAN]: ThienCan.CANH,
  [ThienCan.DINH]: ThienCan.NHAM,
  [ThienCan.NHAM]: ThienCan.NHAM,
  [ThienCan.MAU]: ThienCan.GIAP,
  [ThienCan.QUY]: ThienCan.GIAP,
};

const CHI_THANG_TU_DAN: readonly DiaChi[] = [
  DiaChi.DAN,
  DiaChi.MAO,
  DiaChi.THIN,
  DiaChi.TI,
  DiaChi.NGO,
  DiaChi.MUI,
  DiaChi.THAN,
  DiaChi.DAU,
  DiaChi.TUAT,
  DiaChi.HOI,
  DiaChi.TY,
  DiaChi.SUU,
];

export function tinhCanChiNamTheoLapXuan(thoiDiem: Date, tietKhi: TinhTietKhiService): CanChi {
  if (Number.isNaN(thoiDiem.getTime())) {
    throw new RangeError('Thời điểm không hợp lệ');
  }

  const namDuong = thoiDiem.getUTCFullYear();
  const lapXuan = tietKhi.tinhThoiDiemTietKhi(namDuong, TietKhi.LAP_XUAN);
  const namCanChi = thoiDiem.getTime() < lapXuan.getTime() ? namDuong - 1 : namDuong;
  const offset = modulo(namCanChi - 1984, 60);

  return {
    can: THIEN_CAN_THEO_THU_TU[offset % 10]!,
    chi: DIA_CHI_THEO_THU_TU[offset % 12]!,
  };
}

export function tinhCanChiThang(canNam: ThienCan, chiThang: DiaChi): CanChi {
  const offset = CHI_THANG_TU_DAN.indexOf(chiThang);
  if (offset < 0) {
    throw new RangeError('Chi tháng không hợp lệ');
  }

  const canDan = CAN_THANG_DAN_THEO_CAN_NAM[canNam];
  const canDanIndex = THIEN_CAN_THEO_THU_TU.indexOf(canDan);

  return {
    can: THIEN_CAN_THEO_THU_TU[(canDanIndex + offset) % 10]!,
    chi: chiThang,
  };
}

function modulo(value: number, base: number): number {
  return ((value % base) + base) % base;
}
