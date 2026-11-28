import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { TietKhi } from '../calendar/domain/solar-term';

export interface BoiCanhTinhYeuToNgay {
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  dangThoVuong: boolean;
  canChiNam?: CanChi;
  canChiThang?: CanChi;
  trungKhiHienHanh?: TietKhi;
  ngayTuLy?: boolean;
  ngayTuTuyet?: boolean;
  ngayHoi?: boolean;
  ngaySocHuyenVong?: boolean;
  ngayAmTrongThang?: number;
  canChiNgaySoc?: CanChi;
}
