import { Injectable } from '@nestjs/common';

import { NgayDanSu } from './civil-date';
import { DiaChi } from './domain/earthly-branch';
import { CanChi } from './domain/sexagenary-cycle';
import { TietKhi } from './domain/solar-term';
import { ThapNhiTruc } from './domain/twelve-officer';
import { tinhCanChiNgay } from './sexagenary-day';
import { TinhTietKhiService } from './solar-term.service';
import { tinhThapNhiTruc } from './twelve-officer';

@Injectable()
export class TinhLichService {
  constructor(private readonly tinhTietKhiService: TinhTietKhiService) {}

  tinhCanChiNgay(ngayDanSu: NgayDanSu): CanChi {
    return tinhCanChiNgay(ngayDanSu);
  }

  tinhThoiDiemTietKhi(nam: number, tietKhi: TietKhi): Date {
    return this.tinhTietKhiService.tinhThoiDiemTietKhi(nam, tietKhi);
  }

  tinhChiThangTaiThoiDiem(thoiDiem: Date): DiaChi {
    return this.tinhTietKhiService.tinhChiThangTaiThoiDiem(thoiDiem);
  }

  tinhTruc(chiThang: DiaChi, chiNgay: DiaChi): ThapNhiTruc {
    return tinhThapNhiTruc(chiThang, chiNgay);
  }
}
