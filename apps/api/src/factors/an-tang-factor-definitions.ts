import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import {
  DinhNghiaYeuToCanChiCoDinh,
  DinhNghiaYeuToChiNgayCoDinh,
  DinhNghiaYeuToTheoCanNgay,
} from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

export const DINH_NGHIA_O_PHE: DinhNghiaYeuToCanChiCoDinh = {
  ma: MaYeuTo.O_PHE,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canChiNgay: [
    cc(GIAP, NGO),
    cc(BINH, NGO),
    cc(CANH, NGO),
    cc(NHAM, NGO),
    cc(GIAP, THAN),
    cc(BINH, THAN),
    cc(CANH, THAN),
    cc(NHAM, THAN),
    cc(AT, DAU),
    cc(DINH, DAU),
    cc(KY, DAU),
    cc(TAN, DAU),
    cc(QUY, DAU),
  ],
  nguon: taoNguon(
    470,
    'Ô Phệ',
    '鳴吠',
    'Dùng Lập thành cuối mục: 13 ngày. Không dùng danh sách truyền cũ 14 ngày ở pp.468–469.',
    'Q5 起例/立成 hiệu chỉnh thông thư: bỏ 庚寅/壬寅 khỏi 鳴吠 và đưa 甲午 vào đúng nhóm.',
  ),
};

export const DINH_NGHIA_PHUC_NHAT: DinhNghiaYeuToTheoCanNgay = {
  ma: MaYeuTo.PHUC_NHAT,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  canNgayTheoChiThang: {
    [DAN]: GIAP,
    [MAO]: AT,
    [THIN]: MAU,
    [TI]: BINH,
    [NGO]: DINH,
    [MUI]: KY,
    [THAN]: CANH,
    [DAU]: TAN,
    [TUAT]: MAU,
    [HOI]: NHAM,
    [TY]: QUY,
    [SUU]: KY,
  },
  nguon: taoNguon(
    464,
    'Phục Nhật',
    '復日',
    'Bảng nguồn tiếp sang p.465; mapping theo can tháng âm / Chi tháng.',
    'Hán Q5: 正七月甲庚、二八月乙辛、四十月丙壬、五十一月丁癸、三九六十二月戊巳.',
  ),
};

export const DINH_NGHIA_TRONG_NHAT: DinhNghiaYeuToChiNgayCoDinh = {
  ma: MaYeuTo.TRONG_NHAT,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: [],
  chiNgay: [TI, HOI],
  nguon: taoNguon(
    458,
    'Trọng Nhật',
    '重日',
    'Mục kéo dài pp.458–460; lịch lệ chốt hai ngày Tỵ và Hợi.',
    'Hán Q5 歴例: 重日者巳亥二日.',
  ),
};

function cc(can: ThienCan, chi: DiaChi): CanChi {
  return { can, chi };
}

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
