import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import { DinhNghiaYeuTo } from './factor-definition';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';

export const DINH_NGHIA_TU_LY = taoQ6(
  MaYeuTo.TU_LY,
  'Tứ Ly',
  '四離',
  'Việt p.560: Xuân Phân, Thu Phân, Hạ Chí, Đông Chí trước một ngày; Hán WYG_006-74a..74b và Q9 WYG_009-34a khớp.',
);

export const DINH_NGHIA_TU_TUYET = taoQ6(
  MaYeuTo.TU_TUYET,
  'Tứ Tuyệt',
  '四絶',
  'Việt p.560: Lập Xuân, Lập Hạ, Lập Thu, Lập Đông trước một ngày; Hán WYG_006-74b và Q9 WYG_009-34a khớp.',
);

export const DINH_NGHIA_HOI_NHAT: DinhNghiaYeuTo = {
  ma: MaYeuTo.HOI_NHAT,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: ['Ngày Hối'],
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 10,
      trang: 828,
      muc: 'Thượng Sóc - Tứ Ly - Tứ Tuyệt - Ngày Hối',
      tenGoc: '晦日',
      ghiChu:
        'Exact scan p.828: Hối là ngày Nguyệt tận; không cùng hung như Thượng Sóc nhưng ngoài nhóm miễn cũng không chú Nên.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: '上朔 四離 四絶 晦日',
      tenGoc: '晦日',
      ghiChu: 'WYG_010-69a..69b: 晦為月盡之日; source semantics theo lunar month end.',
      daXacMinh: true,
    },
  ],
};

export function laTuLy(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  return boiCanh.ngayTuLy === true;
}

export function laTuTuyet(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  return boiCanh.ngayTuTuyet === true;
}

export function laHoiNhat(boiCanh: BoiCanhTinhYeuToNgay): boolean {
  return boiCanh.ngayHoi === true;
}

function taoQ6(ma: MaYeuTo, muc: string, tenGoc: string, ghiChu: string): DinhNghiaYeuTo {
  const nguon: readonly ThamChieuNguon[] = [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 6,
      trang: 560,
      muc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 6,
      muc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
  ];

  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon };
}
