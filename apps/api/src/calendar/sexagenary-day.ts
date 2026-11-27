import { NgayDanSu, tinhJulianDayNumber } from './civil-date';
import { DIA_CHI_THEO_THU_TU } from './domain/earthly-branch';
import { CanChi } from './domain/sexagenary-cycle';
import { THIEN_CAN_THEO_THU_TU } from './domain/heavenly-stem';

const MOC_GIAP_TY: NgayDanSu = '1949-10-01';
const SO_NGAY_TRONG_VONG_CAN_CHI = 60;
const JULIAN_DAY_NUMBER_MOC_GIAP_TY = tinhJulianDayNumber(MOC_GIAP_TY);

export function tinhCanChiTheoChiSo(chiSo: number): CanChi {
  if (!Number.isInteger(chiSo)) {
    throw new RangeError(`Chi so Can Chi phai la so nguyen: ${chiSo}`);
  }

  const chiSoTrongVong = layPhanDuDuong(chiSo, SO_NGAY_TRONG_VONG_CAN_CHI);
  const can = THIEN_CAN_THEO_THU_TU[chiSoTrongVong % THIEN_CAN_THEO_THU_TU.length];
  const chi = DIA_CHI_THEO_THU_TU[chiSoTrongVong % DIA_CHI_THEO_THU_TU.length];

  if (!can || !chi) {
    throw new Error('Khong the tinh Can Chi theo chi so');
  }

  return { can, chi };
}

export function tinhChiSoCanChiNgay(ngayDanSu: NgayDanSu): number {
  const khoangCachNgay = tinhJulianDayNumber(ngayDanSu) - JULIAN_DAY_NUMBER_MOC_GIAP_TY;

  return layPhanDuDuong(khoangCachNgay, SO_NGAY_TRONG_VONG_CAN_CHI);
}

export function tinhCanChiNgay(ngayDanSu: NgayDanSu): CanChi {
  return tinhCanChiTheoChiSo(tinhChiSoCanChiNgay(ngayDanSu));
}

function layPhanDuDuong(giaTri: number, modulo: number): number {
  return ((giaTri % modulo) + modulo) % modulo;
}
