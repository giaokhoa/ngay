import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToTheoTruc } from './factor-definition';

export const DINH_NGHIA_NGUYET_PHA: DinhNghiaYeuToTheoTruc = {
  ma: MaYeuTo.NGUYET_PHA,
  loai: LoaiYeuTo.QUAN_HE_CHI,
  tenKhac: [],
  viTri: [{ truc: ThapNhiTruc.PHA }],
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 2,
      quyen: 20,
      trang: 311,
      muc: 'Nguyệt biểu tháng Giêng',
      tenGoc: '月破',
      ghiChu: 'Nguyệt Kiến tại Dần thì Nguyệt Phá tại Thân.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: '月破〈大耗〉',
      tenGoc: '月破',
      ghiChu: 'Quyển 10 giữ identity Nguyệt Phá riêng và có semantics Nghi kị riêng.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 20,
      muc: '月表一',
      tenGoc: '月破',
      ghiChu: 'Nguyệt biểu xác nhận vị trí theo tháng.',
      daXacMinh: true,
    },
  ],
};
