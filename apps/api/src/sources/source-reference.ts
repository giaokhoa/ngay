export enum LoaiNguon {
  BAN_VIET = 'BAN_VIET',
  HAN_BAN = 'HAN_BAN',
}

export interface ThamChieuNguon {
  loaiNguon: LoaiNguon;
  tap?: number;
  quyen: number;
  trang?: number;
  muc?: string;
  tenGoc?: string;
  ghiChu?: string;
  daXacMinh: boolean;
}
