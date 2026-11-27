import { NgayDanSu } from './civil-date';

const boNhoDinhDang = new Map<string, Intl.DateTimeFormat>();

export function tinhNgayDanSuTaiMuiGio(thoiDiem: Date, muiGio: string): NgayDanSu {
  if (Number.isNaN(thoiDiem.getTime())) {
    throw new RangeError('Thoi diem khong hop le');
  }

  const dinhDang = layDinhDang(muiGio);
  const phan = dinhDang.formatToParts(thoiDiem);
  const nam = layPhanSo(phan, 'year');
  const thang = layPhanSo(phan, 'month');
  const ngay = layPhanSo(phan, 'day');

  return `${nam.toString().padStart(4, '0')}-${thang.toString().padStart(2, '0')}-${ngay
    .toString()
    .padStart(2, '0')}`;
}

function layDinhDang(muiGio: string): Intl.DateTimeFormat {
  const daCo = boNhoDinhDang.get(muiGio);

  if (daCo) {
    return daCo;
  }

  const dinhDang = new Intl.DateTimeFormat('en-US', {
    timeZone: muiGio,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    calendar: 'gregory',
    numberingSystem: 'latn',
  });

  boNhoDinhDang.set(muiGio, dinhDang);

  return dinhDang;
}

function layPhanSo(phan: Intl.DateTimeFormatPart[], loai: Intl.DateTimeFormatPartTypes): number {
  const giaTri = phan.find((item) => item.type === loai)?.value;

  if (!giaTri) {
    throw new Error(`Khong tim thay thanh phan ngay: ${loai}`);
  }

  return Number(giaTri);
}
