import { LoaiNguon } from '../sources/source-reference';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import { DinhNghiaYeuTo } from './factor-definition';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';

export const DINH_NGHIA_SOC_HUYEN_VONG: DinhNghiaYeuTo = {
  ma: MaYeuTo.SOC_HUYEN_VONG,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: ['Sóc - Huyền - Vọng'],
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 10,
      trang: 829,
      muc: 'Sóc - Huyền - Vọng',
      tenGoc: '朔弦望',
      daXacMinh: true,
      ghiChu:
        'Exact Việt p.829: “SÓC - HUYỀN - VỌNG — Kị: Cầu thầy chữa bệnh”; giải nghĩa Sóc nhật nguyệt đồng độ, Huyền gần một xa ba, Vọng nhật nguyệt đối nhau.',
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: '朔弦朢',
      tenGoc: '朔弦朢',
      daXacMinh: true,
      ghiChu:
        'WYG_010-71a: 忌求醫療病; 朔日月同度，弦近一遠三，朢日月相對. Production dùng phase 0°/90°/180°/270° theo ngày dân sự địa phương.',
    },
  ],
};

export function laSocHuyenVong(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  return boiCanh.ngaySocHuyenVong === true;
}
