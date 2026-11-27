import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { ThamChieuNguon } from '../sources/source-reference';

export enum LoaiCongViec {
  CUOI_HOI = 'CUOI_HOI',
  DI_CHUYEN = 'DI_CHUYEN',
}

export enum TacDongDungSu {
  NEN = 'NEN',
  KY = 'KY',
}

export type DieuKienDungSu =
  | { loai: 'YEU_TO'; ma: MaYeuTo }
  | { loai: 'TRUC'; truc: ThapNhiTruc }
  | { loai: 'CHI_NGAY'; chi: DiaChi };

export interface QuyTacDungSu {
  ma: string;
  congViec: LoaiCongViec;
  dieuKien: DieuKienDungSu;
  tacDong: TacDongDungSu;
  nguon: readonly ThamChieuNguon[];
}
