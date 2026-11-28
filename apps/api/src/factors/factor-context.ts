import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';

export interface BoiCanhTinhYeuToNgay {
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  dangThoVuong: boolean;
  canChiNam?: CanChi;
  ngayAmTrongThang?: number;
  canChiNgaySoc?: CanChi;
}
