import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { Mua } from '../calendar/domain/season';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';

export interface DinhNghiaYeuTo {
  ma: MaYeuTo;
  loai: LoaiYeuTo;
  tenKhac: readonly string[];
  nguon: readonly ThamChieuNguon[];
}

export type BangChiNgayTheoChiThang = Readonly<Record<DiaChi, readonly DiaChi[]>>;

export interface DinhNghiaYeuToTheoChiThang extends DinhNghiaYeuTo {
  chiNgayTheoChiThang: BangChiNgayTheoChiThang;
}

export type BangCanNgayTheoChiThang = Readonly<Partial<Record<DiaChi, ThienCan>>>;

export interface DinhNghiaYeuToTheoCanNgay extends DinhNghiaYeuTo {
  canNgayTheoChiThang: BangCanNgayTheoChiThang;
}

export interface DinhNghiaYeuToCanChiCoDinh extends DinhNghiaYeuTo {
  canChiNgay: readonly CanChi[];
}

export interface DinhNghiaYeuToCanChiTheoChiThang extends DinhNghiaYeuTo {
  canChiNgayTheoChiThang: Readonly<Record<DiaChi, CanChi>>;
}

export interface DinhNghiaYeuToCanChiTheoMua extends DinhNghiaYeuTo {
  canChiNgayTheoMua: Readonly<Record<Mua, CanChi>>;
}

export interface DinhNghiaYeuToCanNgayTheoMua extends DinhNghiaYeuTo {
  canNgayTheoMua: Readonly<Record<Mua, readonly ThienCan[]>>;
}

export interface DinhNghiaYeuToChiNgayTheoMua extends DinhNghiaYeuTo {
  chiNgayTheoMua: Readonly<Record<Mua, DiaChi>>;
}

export interface ViTriYeuToTheoTruc {
  truc: ThapNhiTruc;
  chiThangApDung?: readonly DiaChi[];
}

export interface DinhNghiaYeuToTheoTruc extends DinhNghiaYeuTo {
  viTri: readonly ViTriYeuToTheoTruc[];
}
