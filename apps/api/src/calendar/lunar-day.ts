import { timThoiDiemPhaTrang } from './astronomy/ephemeris';
import { congNgayDanSu, NgayDanSu, soSanhNgayDanSu } from './civil-date';
import { taoThoiDiemGiuaNgayTaiMuiGio, tinhNgayDanSuTaiMuiGio } from './civil-date-timezone';
import { CanChi } from './domain/sexagenary-cycle';
import { tinhCanChiNgay } from './sexagenary-day';

const CUA_SO_TIM_SOC_NGAY = 35;
const MOT_NGAY_MILLISECOND = 86_400_000;
const boNhoNgayAm = new Map<string, ThongTinNgayAm>();
const boNhoSocHuyenVong = new Map<string, boolean>();
const CAC_PHA_SOC_HUYEN_VONG = [0, 90, 180, 270] as const;
const CUA_SO_TIM_PHA_GAN_NGAY = 2;

export interface ThongTinNgayAm {
  ngaySoc: NgayDanSu;
  ngayTrongThang: number;
  canChiNgaySoc: CanChi;
  thoiDiemSoc: Date;
  ngaySocKeTiep: NgayDanSu;
  ngayCuoiThang: NgayDanSu;
  laHoiNhat: boolean;
}

/**
 * Tính phần lunar context tối thiểu cần cho Q6.
 *
 * Ngày dân sự chứa thời điểm sóc được tính là mồng 1 cho toàn bộ ngày đó.
 * Vì vậy không được đơn thuần lấy "new moon instant gần nhất <= thời điểm đang xét":
 * sóc có thể xảy ra sau giữa ngày nhưng ngày địa phương đó vẫn là mồng 1.
 */
export function laNgaySocHuyenVong(ngayDanSu: NgayDanSu, muiGio: string): boolean {
  const khoa = `${muiGio}|${ngayDanSu}`;
  const daCo = boNhoSocHuyenVong.get(khoa);
  if (daCo !== undefined) return daCo;

  const giuaNgay = taoThoiDiemGiuaNgayTaiMuiGio(ngayDanSu, muiGio);
  const laNgayPha = CAC_PHA_SOC_HUYEN_VONG.some((pha) => {
    const truoc = timThoiDiemPhaTrang(pha, giuaNgay, -CUA_SO_TIM_PHA_GAN_NGAY);
    const sau = timThoiDiemPhaTrang(pha, giuaNgay, CUA_SO_TIM_PHA_GAN_NGAY);
    return [truoc, sau]
      .filter((item): item is Date => item !== null)
      .some((item) => tinhNgayDanSuTaiMuiGio(item, muiGio) === ngayDanSu);
  });

  boNhoSocHuyenVong.set(khoa, laNgayPha);
  return laNgayPha;
}

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

  const socKeTiep = timThoiDiemPhaTrang(
    0,
    new Date(hienTai.soc.getTime() + MOT_NGAY_MILLISECOND),
    CUA_SO_TIM_SOC_NGAY,
  );
  if (!socKeTiep) {
    throw new Error(`Không xác định được sóc kế tiếp cho ${ngayDanSu}`);
  }
  const ngaySocKeTiep = tinhNgayDanSuTaiMuiGio(socKeTiep, muiGio);
  const ngayCuoiThang = congNgayDanSu(ngaySocKeTiep, -1);

  const ngayTrongThang = soSanhNgayDanSu(ngayDanSu, hienTai.ngay) + 1;
  if (ngayTrongThang < 1 || ngayTrongThang > 30) {
    throw new Error(`Ngày âm ngoài phạm vi 1..30: ${ngayTrongThang} cho ${ngayDanSu}`);
  }

  const ketQua: ThongTinNgayAm = {
    ngaySoc: hienTai.ngay,
    ngayTrongThang,
    canChiNgaySoc: tinhCanChiNgay(hienTai.ngay),
    thoiDiemSoc: new Date(hienTai.soc.getTime()),
    ngaySocKeTiep,
    ngayCuoiThang,
    laHoiNhat: ngayDanSu === ngayCuoiThang,
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
