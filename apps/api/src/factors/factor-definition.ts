import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
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

export type BangCanNgayTheoChiThang = Readonly<Partial<Record<DiaChi, ThienCan>>>;

export interface DinhNghiaYeuToTheoCanNgay {
  ma: MaYeuTo;
  loai: LoaiYeuTo;
  tenKhac: readonly string[];
  canNgayTheoChiThang: BangCanNgayTheoChiThang;
  nguon: readonly ThamChieuNguon[];
}
