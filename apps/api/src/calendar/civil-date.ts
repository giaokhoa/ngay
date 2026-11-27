export type NgayDanSu = string;

export interface ThanhPhanNgayDanSu {
  nam: number;
  thang: number;
  ngay: number;
}

const MAU_NGAY_DAN_SU = /^(\d{4})-(\d{2})-(\d{2})$/;

export function phanTichNgayDanSu(ngayDanSu: NgayDanSu): ThanhPhanNgayDanSu {
  const ketQua = MAU_NGAY_DAN_SU.exec(ngayDanSu);

  if (!ketQua) {
    throw new RangeError(`Ngay dan su khong hop le: ${ngayDanSu}`);
  }

  const nam = Number(ketQua[1]);
  const thang = Number(ketQua[2]);
  const ngay = Number(ketQua[3]);

  if (nam < 1 || thang < 1 || thang > 12) {
    throw new RangeError(`Ngay dan su khong hop le: ${ngayDanSu}`);
  }

  const soNgayToiDa = tinhSoNgayTrongThang(nam, thang);

  if (ngay < 1 || ngay > soNgayToiDa) {
    throw new RangeError(`Ngay dan su khong hop le: ${ngayDanSu}`);
  }

  return { nam, thang, ngay };
}

export function tinhJulianDayNumber(ngayDanSu: NgayDanSu): number {
  const { nam, thang, ngay } = phanTichNgayDanSu(ngayDanSu);
  const a = Math.floor((14 - thang) / 12);
  const y = nam + 4800 - a;
  const m = thang + 12 * a - 3;

  return (
    ngay +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

export function congNgayDanSu(ngayDanSu: NgayDanSu, soNgay: number): NgayDanSu {
  if (!Number.isInteger(soNgay)) {
    throw new RangeError(`So ngay phai la so nguyen: ${soNgay}`);
  }

  return tinhNgayDanSuTuJulianDayNumber(tinhJulianDayNumber(ngayDanSu) + soNgay);
}

export function soSanhNgayDanSu(a: NgayDanSu, b: NgayDanSu): number {
  return tinhJulianDayNumber(a) - tinhJulianDayNumber(b);
}

export function tinhNgayDanSuTuJulianDayNumber(julianDayNumber: number): NgayDanSu {
  if (!Number.isInteger(julianDayNumber)) {
    throw new RangeError(`Julian Day Number phai la so nguyen: ${julianDayNumber}`);
  }

  const a = julianDayNumber + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);

  const ngay = e - Math.floor((153 * m + 2) / 5) + 1;
  const thang = m + 3 - 12 * Math.floor(m / 10);
  const nam = 100 * b + d - 4800 + Math.floor(m / 10);

  if (nam < 1 || nam > 9999) {
    throw new RangeError(`Ngay dan su ngoai pham vi ho tro: ${nam}-${thang}-${ngay}`);
  }

  return `${dinhDangSo(nam, 4)}-${dinhDangSo(thang, 2)}-${dinhDangSo(ngay, 2)}`;
}

function dinhDangSo(giaTri: number, soChuSo: number): string {
  return giaTri.toString().padStart(soChuSo, '0');
}

function tinhSoNgayTrongThang(nam: number, thang: number): number {
  const soNgayTheoThang = [31, laNamNhuan(nam) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return soNgayTheoThang[thang - 1] ?? 0;
}

function laNamNhuan(nam: number): boolean {
  return nam % 4 === 0 && (nam % 100 !== 0 || nam % 400 === 0);
}
