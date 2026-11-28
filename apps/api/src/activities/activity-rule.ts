import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { ThamChieuNguon } from '../sources/source-reference';

export enum LoaiCongViec {
  CUOI_HOI = 'CUOI_HOI',
  DI_CHUYEN = 'DI_CHUYEN',
  AN_GIUONG = 'AN_GIUONG',
  DONG_THO = 'DONG_THO',
  SUA_CUNG_THAT = 'SUA_CUNG_THAT',
  KHAI_TRUONG = 'KHAI_TRUONG',
  XUAT_HANH = 'XUAT_HANH',
  AN_TANG = 'AN_TANG',
}

export enum TacDongDungSu {
  NEN = 'NEN',
  KY = 'KY',
}

export type DieuKienDungSu =
  | { loai: 'YEU_TO'; ma: MaYeuTo }
  | { loai: 'TRUC'; truc: ThapNhiTruc }
  | { loai: 'CHI_NGAY'; chi: DiaChi }
  | { loai: 'THO_VUONG' };

export interface QuyTacDungSu {
  ma: string;
  congViec: LoaiCongViec;
  dieuKien: DieuKienDungSu;
  tacDong: TacDongDungSu;
  nguon: readonly ThamChieuNguon[];
}
