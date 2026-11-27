import { QuyTacDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { YeuToNgay } from '../factors/domain/day-factor';
import { ThamChieuNguon } from '../sources/source-reference';

export interface BoiCanhDanhGiaNgay {
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  truc: ThapNhiTruc;
  yeuTo: readonly YeuToNgay[];
}

export enum TrangThaiDongGop {
  HIEU_LUC = 'HIEU_LUC',
  BI_LOAI = 'BI_LOAI',
}

export interface DongGopDanhGia {
  quyTac: QuyTacDungSu;
  trangThai: TrangThaiDongGop;
  lyDoLoai?: string;
}

export interface DauVetXungDot {
  ma: string;
  moTa: string;
  nguon: readonly ThamChieuNguon[];
}

export interface KetQuaDanhGia {
  coNen: boolean;
  coKy: boolean;
  camMoiViec: boolean;
  dongGop: readonly DongGopDanhGia[];
  xungDotDaApDung: readonly DauVetXungDot[];
}

export type TargetDanhGia =
  | { loai: 'YEU_TO'; ma: MaYeuTo }
  | { loai: 'TRUC'; truc: ThapNhiTruc }
  | { loai: 'CHI_NGAY'; chi: DiaChi };
