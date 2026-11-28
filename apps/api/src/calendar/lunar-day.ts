import { timThoiDiemPhaTrang } from './astronomy/ephemeris';
import { NgayDanSu, soSanhNgayDanSu } from './civil-date';
import { taoThoiDiemGiuaNgayTaiMuiGio, tinhNgayDanSuTaiMuiGio } from './civil-date-timezone';
import { CanChi } from './domain/sexagenary-cycle';
import { tinhCanChiNgay } from './sexagenary-day';

const CUA_SO_TIM_SOC_NGAY = 35;
const MOT_NGAY_MILLISECOND = 86_400_000;
const boNhoNgayAm = new Map<string, ThongTinNgayAm>();

export interface ThongTinNgayAm {
  ngaySoc: NgayDanSu;
  ngayTrongThang: number;
  canChiNgaySoc: CanChi;
  thoiDiemSoc: Date;
}

/**
 * Tính phần lunar context tối thiểu cần cho Q6.
 *
 * Ngày dân sự chứa thời điểm sóc được tính là mồng 1 cho toàn bộ ngày đó.
 * Vì vậy không được đơn thuần lấy "new moon instant gần nhất <= thời điểm đang xét":
 * sóc có thể xảy ra sau giữa ngày nhưng ngày địa phương đó vẫn là mồng 1.
 */
export function tinhThongTinNgayAm(ngayDanSu: NgayDanSu, muiGio: string): ThongTinNgayAm {
  const khoa = `${muiGio}|${ngayDanSu}`;
  const daCo = boNhoNgayAm.get(khoa);
  if (daCo) return saoChepThongTin(daCo);

  const giuaNgay = taoThoiDiemGiuaNgayTaiMuiGio(ngayDanSu, muiGio);
  const socTruoc = timThoiDiemPhaTrang(0, giuaNgay, -CUA_SO_TIM_SOC_NGAY);

  if (!socTruoc) {
    throw new Error(`Không tìm thấy sóc trước ${ngayDanSu}`);
  }

  const socSau = timThoiDiemPhaTrang(
    0,
    new Date(socTruoc.getTime() + MOT_NGAY_MILLISECOND),
    CUA_SO_TIM_SOC_NGAY,
  );

  const ungVien = [socTruoc, socSau]
    .filter((soc): soc is NonNullable<typeof soc> => soc !== null)
    .map((soc) => ({
      soc,
      ngay: tinhNgayDanSuTaiMuiGio(soc, muiGio),
    }))
    .filter((item) => soSanhNgayDanSu(item.ngay, ngayDanSu) <= 0)
    .sort((a, b) => soSanhNgayDanSu(b.ngay, a.ngay));

  const hienTai = ungVien[0];
  if (!hienTai) {
    throw new Error(`Không xác định được ngày sóc cho ${ngayDanSu}`);
  }

  const ngayTrongThang = soSanhNgayDanSu(ngayDanSu, hienTai.ngay) + 1;
  if (ngayTrongThang < 1 || ngayTrongThang > 30) {
    throw new Error(`Ngày âm ngoài phạm vi 1..30: ${ngayTrongThang} cho ${ngayDanSu}`);
  }

  const ketQua: ThongTinNgayAm = {
    ngaySoc: hienTai.ngay,
    ngayTrongThang,
    canChiNgaySoc: tinhCanChiNgay(hienTai.ngay),
    thoiDiemSoc: new Date(hienTai.soc.getTime()),
  };
  boNhoNgayAm.set(khoa, ketQua);
  return saoChepThongTin(ketQua);
}

function saoChepThongTin(value: ThongTinNgayAm): ThongTinNgayAm {
  return {
    ...value,
    canChiNgaySoc: { ...value.canChiNgaySoc },
    thoiDiemSoc: new Date(value.thoiDiemSoc.getTime()),
  };
}
