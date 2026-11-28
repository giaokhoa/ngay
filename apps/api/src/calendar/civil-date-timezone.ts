import { NgayDanSu } from './civil-date';

const boNhoDinhDang = new Map<string, Intl.DateTimeFormat>();
const boNhoDinhDangNgayGio = new Map<string, Intl.DateTimeFormat>();

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

export function taoThoiDiemGiuaNgayTaiMuiGio(ngayDanSu: NgayDanSu, muiGio: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ngayDanSu);
  if (!match) {
    throw new RangeError('Ngay dan su khong hop le');
  }

  const nam = Number(match[1]);
  const thang = Number(match[2]);
  const ngay = Number(match[3]);
  const mucTieuUtc = Date.UTC(nam, thang - 1, ngay, 12, 0, 0);
  let thoiDiem = new Date(mucTieuUtc);

  for (let lan = 0; lan < 3; lan += 1) {
    const phan = layDinhDangNgayGio(muiGio).formatToParts(thoiDiem);
    const localPseudoUtc = Date.UTC(
      layPhanSo(phan, 'year'),
      layPhanSo(phan, 'month') - 1,
      layPhanSo(phan, 'day'),
      layPhanSo(phan, 'hour'),
      layPhanSo(phan, 'minute'),
      layPhanSo(phan, 'second'),
    );
    const saiSo = mucTieuUtc - localPseudoUtc;

    if (saiSo === 0) break;
    thoiDiem = new Date(thoiDiem.getTime() + saiSo);
  }

  if (tinhNgayDanSuTaiMuiGio(thoiDiem, muiGio) !== ngayDanSu) {
    throw new RangeError('Khong tao duoc thoi diem giua ngay tai mui gio da chon');
  }

  return thoiDiem;
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

function layDinhDangNgayGio(muiGio: string): Intl.DateTimeFormat {
  const daCo = boNhoDinhDangNgayGio.get(muiGio);
  if (daCo) return daCo;

  const dinhDang = new Intl.DateTimeFormat('en-US', {
    timeZone: muiGio,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    calendar: 'gregory',
    numberingSystem: 'latn',
  });

  boNhoDinhDangNgayGio.set(muiGio, dinhDang);
  return dinhDang;
}

function layPhanSo(phan: Intl.DateTimeFormatPart[], loai: Intl.DateTimeFormatPartTypes): number {
  const giaTri = phan.find((item) => item.type === loai)?.value;

  if (!giaTri) {
    throw new Error(`Khong tim thay thanh phan ngay: ${loai}`);
  }

  return Number(giaTri);
}
