import { DiaChi } from '../calendar/domain/earthly-branch';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToChiNgayCoDinh } from './factor-definition';

export const DINH_NGHIA_NGU_HOP: DinhNghiaYeuToChiNgayCoDinh = {
  ma: MaYeuTo.NGU_HOP,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgay: [DiaChi.DAN, DiaChi.MAO],
  nguon: taoNguon(
    459,
    'Ngũ Hợp',
    '五合',
    'Lịch lệ chốt Ngũ Hợp là hai ngày Dần, Mão; scan trực tiếp p.459.',
    'WYG_005-57a..57b: 歴例曰五合者寅夘日也.',
  ),
};

export const DINH_NGHIA_NGU_LY: DinhNghiaYeuToChiNgayCoDinh = {
  ma: MaYeuTo.NGU_LY,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: ['Trừ Thần'],
  chiNgay: [DiaChi.THAN, DiaChi.DAU],
  nguon: taoNguon(
    460,
    'Ngũ Ly',
    '五離',
    'Lịch lệ chốt Ngũ Ly là hai ngày Thân, Dậu; scan trực tiếp p.460.',
    'WYG_005-58a: 歴例曰五離者申酉日是也; đồng mục nêu alias 除神.',
  ),
};

function taoNguon(
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChuViet: string,
  ghiChuHan: string,
): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 5,
      trang,
      muc,
      tenGoc,
      ghiChu: ghiChuViet,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 5,
      muc: tenGoc,
      tenGoc,
      ghiChu: ghiChuHan,
      daXacMinh: true,
    },
  ];
}
