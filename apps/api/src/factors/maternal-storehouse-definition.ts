import { DiaChi } from '../calendar/domain/earthly-branch';
import { Mua } from '../calendar/domain/season';
import { LoaiNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuTo } from './factor-definition';

export interface DinhNghiaMauThuong extends DinhNghiaYeuTo {
  chiNgayTheoMua: Readonly<Record<Mua, readonly DiaChi[]>>;
  chiNgayKhiThoVuong: readonly DiaChi[];
}

export const DINH_NGHIA_MAU_THUONG: DinhNghiaMauThuong = {
  ma: MaYeuTo.MAU_THUONG,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgayTheoMua: {
    [Mua.XUAN]: [DiaChi.HOI, DiaChi.TY],
    [Mua.HA]: [DiaChi.DAN, DiaChi.MAO],
    [Mua.THU]: [DiaChi.THIN, DiaChi.TUAT, DiaChi.SUU, DiaChi.MUI],
    [Mua.DONG]: [DiaChi.THAN, DiaChi.DAU],
  },
  chiNgayKhiThoVuong: [DiaChi.TI, DiaChi.NGO],
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 5,
      trang: 415,
      muc: 'Mẫu Thương',
      tenGoc: '母倉',
      ghiChu: 'Trong Thổ Vượng chuyển sang Tỵ/Ngọ; boundary theo ADR 0006.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 5,
      muc: '母倉',
      tenGoc: '母倉',
      ghiChu: '土王用事後 lấy Tỵ/Ngọ.',
      daXacMinh: true,
    },
  ],
};
