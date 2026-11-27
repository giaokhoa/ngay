import { Injectable } from '@nestjs/common';

import { congNgayDanSu, NgayDanSu, phanTichNgayDanSu, soSanhNgayDanSu } from './civil-date';
import { tinhNgayDanSuTaiMuiGio } from './civil-date-timezone';
import { TietKhi } from './domain/solar-term';
import { TinhTietKhiService } from './solar-term.service';

const SO_NGAY_THO_VUONG = 18;

const BON_LAP: readonly TietKhi[] = [
  TietKhi.LAP_XUAN,
  TietKhi.LAP_HA,
  TietKhi.LAP_THU,
  TietKhi.LAP_DONG,
];

export interface KhoangThoVuong {
  tietKetThuc: TietKhi;
  tuNgay: NgayDanSu;
  denTruocNgay: NgayDanSu;
}

@Injectable()
export class TinhThoVuongService {
  constructor(private readonly tinhTietKhiService: TinhTietKhiService) {}

  tinhCacKhoangThoVuong(nam: number, muiGio: string): readonly KhoangThoVuong[] {
    return BON_LAP.map((tietKetThuc) => {
      const thoiDiemLap = this.tinhTietKhiService.tinhThoiDiemTietKhi(nam, tietKetThuc);
      const ngayLap = tinhNgayDanSuTaiMuiGio(thoiDiemLap, muiGio);

      return {
        tietKetThuc,
        tuNgay: congNgayDanSu(ngayLap, -SO_NGAY_THO_VUONG),
        denTruocNgay: ngayLap,
      };
    });
  }

  dangThoVuong(ngayDanSu: NgayDanSu, muiGio: string): boolean {
    const { nam } = phanTichNgayDanSu(ngayDanSu);

    return this.tinhCacKhoangThoVuong(nam, muiGio).some(
      (khoang) =>
        soSanhNgayDanSu(ngayDanSu, khoang.tuNgay) >= 0 &&
        soSanhNgayDanSu(ngayDanSu, khoang.denTruocNgay) < 0,
    );
  }
}
