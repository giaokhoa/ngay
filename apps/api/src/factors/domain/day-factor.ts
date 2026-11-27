import { ThamChieuNguon } from '../../sources/source-reference';
import { MaYeuTo } from './factor-code';

export enum LoaiYeuTo {
  QUAN_HE_CHI = 'QUAN_HE_CHI',
  THAN_SAT = 'THAN_SAT',
}

export interface YeuToNgay {
  ma: MaYeuTo;
  loai: LoaiYeuTo;
  tenKhac: readonly string[];
  nguon: readonly ThamChieuNguon[];
}
