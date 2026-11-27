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

function tinhSoNgayTrongThang(nam: number, thang: number): number {
  const soNgayTheoThang = [31, laNamNhuan(nam) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return soNgayTheoThang[thang - 1] ?? 0;
}

function laNamNhuan(nam: number): boolean {
  return nam % 4 === 0 && (nam % 100 !== 0 || nam % 400 === 0);
}
