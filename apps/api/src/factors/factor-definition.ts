import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';

export type BangChiNgayTheoChiThang = Readonly<Record<DiaChi, readonly DiaChi[]>>;

export interface DinhNghiaYeuToTheoChiThang {
  ma: MaYeuTo;
  loai: LoaiYeuTo;
  tenKhac: readonly string[];
  chiNgayTheoChiThang: BangChiNgayTheoChiThang;
  nguon: readonly ThamChieuNguon[];
}
