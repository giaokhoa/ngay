import { Injectable } from '@nestjs/common';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { YeuToNgay } from './domain/day-factor';
import { DINH_NGHIA_YEU_TO_THEO_CHI_THANG } from './factor-definitions';

@Injectable()
export class TinhYeuToNgayService {
  tinhTheoChiThangVaChiNgay(chiThang: DiaChi, chiNgay: DiaChi): YeuToNgay[] {
    return DINH_NGHIA_YEU_TO_THEO_CHI_THANG.filter((dinhNghia) =>
      dinhNghia.chiNgayTheoChiThang[chiThang].includes(chiNgay),
    ).map((dinhNghia) => ({
      ma: dinhNghia.ma,
      loai: dinhNghia.loai,
      tenKhac: dinhNghia.tenKhac,
      nguon: dinhNghia.nguon,
    }));
  }
}
