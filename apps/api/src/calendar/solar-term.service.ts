import { Injectable } from '@nestjs/common';

import { timThoiDiemMatTroiDatKinhDo } from './astronomy/ephemeris';
import { DiaChi } from './domain/earthly-branch';
import { DINH_NGHIA_TIET_KHI_THEO_NAM, TietKhi } from './domain/solar-term';

const MOT_NGAY_MILLISECOND = 86_400_000;
const SO_NGAY_BAT_DAU_TIM_TIEP = 10;
const SO_NGAY_CUA_SO_TIM_KIEM = 10;
const CAC_TRUNG_KHI = DINH_NGHIA_TIET_KHI_THEO_NAM.filter((item) => !item.chiThangMoi).map(
  (item) => item.tietKhi,
);

@Injectable()
export class TinhTietKhiService {
  private readonly boNhoTheoNam = new Map<number, ReadonlyMap<TietKhi, Date>>();

  tinhThoiDiemTietKhi(nam: number, tietKhi: TietKhi): Date {
    const tatCaTietKhi = this.tinhTatCaTietKhiTrongNam(nam);
    const thoiDiem = tatCaTietKhi.get(tietKhi);

    if (!thoiDiem) {
      throw new Error(`Khong tim thay tiet khi ${tietKhi} trong nam ${nam}`);
    }

    return new Date(thoiDiem.getTime());
  }

  tinhTatCaTietKhiTrongNam(nam: number): ReadonlyMap<TietKhi, Date> {
    this.kiemTraNam(nam);

    const daTinh = this.boNhoTheoNam.get(nam);

    if (daTinh) {
      return new Map(daTinh);
    }

    const ketQua = new Map<TietKhi, Date>();
    let batDauTim = taoDauNamUtc(nam);

    for (const dinhNghia of DINH_NGHIA_TIET_KHI_THEO_NAM) {
      const thoiDiem = timThoiDiemMatTroiDatKinhDo(
        dinhNghia.hoangKinh,
        batDauTim,
        SO_NGAY_CUA_SO_TIM_KIEM,
      );

      if (!thoiDiem) {
        throw new Error(
          `Khong tim thay tiet khi ${dinhNghia.tietKhi} trong cua so tim kiem nam ${nam}`,
        );
      }

      const ngay = new Date(thoiDiem.getTime());
      ketQua.set(dinhNghia.tietKhi, ngay);
      batDauTim = new Date(ngay.getTime() + SO_NGAY_BAT_DAU_TIM_TIEP * MOT_NGAY_MILLISECOND);
    }

    this.boNhoTheoNam.set(nam, ketQua);

    return new Map(ketQua);
  }

  tinhTrungKhiHienHanh(thoiDiem: Date): TietKhi {
    if (Number.isNaN(thoiDiem.getTime())) {
      throw new RangeError('Thoi diem khong hop le');
    }

    const nam = thoiDiem.getUTCFullYear();
    const ungVien: { tietKhi: TietKhi; thoiDiem: Date }[] = [];

    for (const namCanXet of [nam - 1, nam]) {
      if (namCanXet < 1) continue;
      const tatCa = this.tinhTatCaTietKhiTrongNam(namCanXet);
      for (const tietKhi of CAC_TRUNG_KHI) {
        const moc = tatCa.get(tietKhi);
        if (moc && moc.getTime() <= thoiDiem.getTime()) {
          ungVien.push({ tietKhi, thoiDiem: moc });
        }
      }
    }

    ungVien.sort((a, b) => b.thoiDiem.getTime() - a.thoiDiem.getTime());
    const hienHanh = ungVien[0];
    if (!hienHanh) {
      throw new Error(`Khong tim thay trung khi hien hanh tai ${thoiDiem.toISOString()}`);
    }
    return hienHanh.tietKhi;
  }

  tinhChiThangTaiThoiDiem(thoiDiem: Date): DiaChi {
    if (Number.isNaN(thoiDiem.getTime())) {
      throw new RangeError('Thoi diem khong hop le');
    }

    const nam = thoiDiem.getUTCFullYear();
    const tatCaTietKhi = this.tinhTatCaTietKhiTrongNam(nam);
    let chiThang = DiaChi.TY;

    for (const dinhNghia of DINH_NGHIA_TIET_KHI_THEO_NAM) {
      if (!dinhNghia.chiThangMoi) {
        continue;
      }

      const thoiDiemGiaoTiet = tatCaTietKhi.get(dinhNghia.tietKhi);

      if (!thoiDiemGiaoTiet) {
        throw new Error(`Thieu thoi diem tiet khi ${dinhNghia.tietKhi}`);
      }

      if (thoiDiem.getTime() < thoiDiemGiaoTiet.getTime()) {
        break;
      }

      chiThang = dinhNghia.chiThangMoi;
    }

    return chiThang;
  }

  private kiemTraNam(nam: number): void {
    if (!Number.isInteger(nam) || nam < 1 || nam > 9999) {
      throw new RangeError(`Nam khong hop le: ${nam}`);
    }
  }
}

function taoDauNamUtc(nam: number): Date {
  const ngay = new Date(0);
  ngay.setUTCFullYear(nam, 0, 1);
  ngay.setUTCHours(0, 0, 0, 0);

  return ngay;
}
