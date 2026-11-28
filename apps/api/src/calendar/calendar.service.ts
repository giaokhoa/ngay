import { Injectable } from '@nestjs/common';

import { NgayDanSu } from './civil-date';
import { KhoangThoVuong, TinhThoVuongService } from './earth-reign.service';
import { DiaChi } from './domain/earthly-branch';
import { CanChi } from './domain/sexagenary-cycle';
import { TietKhi } from './domain/solar-term';
import { ThapNhiTruc } from './domain/twelve-officer';
import { laNgaySocHuyenVong, tinhThongTinNgayAm, ThongTinNgayAm } from './lunar-day';
import { tinhCanChiNgay } from './sexagenary-day';
import { tinhCanChiNamTheoLapXuan, tinhCanChiThang } from './sexagenary-year-month';
import { TinhTietKhiService } from './solar-term.service';
import { tinhThapNhiTruc } from './twelve-officer';

@Injectable()
export class TinhLichService {
  constructor(
    private readonly tinhTietKhiService: TinhTietKhiService,
    private readonly tinhThoVuongService: TinhThoVuongService,
  ) {}

  tinhCanChiNgay(ngayDanSu: NgayDanSu): CanChi {
    return tinhCanChiNgay(ngayDanSu);
  }

  tinhCanChiNamTaiThoiDiem(thoiDiem: Date): CanChi {
    return tinhCanChiNamTheoLapXuan(thoiDiem, this.tinhTietKhiService);
  }

  tinhCanChiThangTaiThoiDiem(thoiDiem: Date): CanChi {
    const canChiNam = this.tinhCanChiNamTaiThoiDiem(thoiDiem);
    const chiThang = this.tinhChiThangTaiThoiDiem(thoiDiem);
    return tinhCanChiThang(canChiNam.can, chiThang);
  }

  tinhThoiDiemTietKhi(nam: number, tietKhi: TietKhi): Date {
    return this.tinhTietKhiService.tinhThoiDiemTietKhi(nam, tietKhi);
  }

  tinhChiThangTaiThoiDiem(thoiDiem: Date): DiaChi {
    return this.tinhTietKhiService.tinhChiThangTaiThoiDiem(thoiDiem);
  }

  tinhTrungKhiHienHanh(thoiDiem: Date): TietKhi {
    return this.tinhTietKhiService.tinhTrungKhiHienHanh(thoiDiem);
  }

  laNgayTuLy(ngayDanSu: NgayDanSu, muiGio: string): boolean {
    return this.tinhTietKhiService.laNgayTuLy(ngayDanSu, muiGio);
  }

  laNgayTuTuyet(ngayDanSu: NgayDanSu, muiGio: string): boolean {
    return this.tinhTietKhiService.laNgayTuTuyet(ngayDanSu, muiGio);
  }

  tinhThongTinNgayAm(ngayDanSu: NgayDanSu, muiGio: string): ThongTinNgayAm {
    return tinhThongTinNgayAm(ngayDanSu, muiGio);
  }

  laNgaySocHuyenVong(ngayDanSu: NgayDanSu, muiGio: string): boolean {
    return laNgaySocHuyenVong(ngayDanSu, muiGio);
  }

  tinhTruc(chiThang: DiaChi, chiNgay: DiaChi): ThapNhiTruc {
    return tinhThapNhiTruc(chiThang, chiNgay);
  }

  tinhCacKhoangThoVuong(nam: number, muiGio: string): readonly KhoangThoVuong[] {
    return this.tinhThoVuongService.tinhCacKhoangThoVuong(nam, muiGio);
  }

  dangThoVuong(ngayDanSu: NgayDanSu, muiGio: string): boolean {
    return this.tinhThoVuongService.dangThoVuong(ngayDanSu, muiGio);
  }
}
