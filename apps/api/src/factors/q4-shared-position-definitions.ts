import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToTheoChiThang, DinhNghiaYeuToTheoTruc } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { KIEN, TRU, MAN, BINH, DINH, CHAP, PHA, THANH, THU, KHAI, BE } = ThapNhiTruc;

const THANG_DUONG: readonly DiaChi[] = [DAN, THIN, NGO, THAN, TUAT, TY];
const THANG_AM: readonly DiaChi[] = [MAO, TI, MUI, DAU, HOI, SUU];

export const DINH_NGHIA_YEU_TO_THEO_TRUC: readonly DinhNghiaYeuToTheoTruc[] = [
  taoTheoTruc(MaYeuTo.BINH_PHUC, [{ truc: KIEN }], 303, 'Binh Phúc', '兵福'),
  taoTheoTruc(MaYeuTo.TIEU_THOI, [{ truc: KIEN }], 303, 'Tiểu Thời', '小時'),
  taoTheoTruc(MaYeuTo.THO_PHU, [{ truc: KIEN }], 303, 'Thổ Phủ', '土府'),
  taoTheoTruc(MaYeuTo.CAT_KY, [{ truc: TRU }], 306, 'Cát Kỳ', '吉期'),
  taoTheoTruc(MaYeuTo.BINH_BAO, [{ truc: TRU }], 306, 'Binh Bảo', '兵寶'),
  taoTheoTruc(MaYeuTo.PHUC_DUC, [{ truc: MAN }], 308, 'Phúc Đức', '福德'),
  taoTheoTruc(MaYeuTo.THIEN_VU, [{ truc: MAN }], 308, 'Thiên Vu', '天巫'),
  taoTheoTruc(
    MaYeuTo.THIEN_CUONG,
    [
      { truc: BINH, chiThangApDung: THANG_DUONG },
      { truc: THU, chiThangApDung: THANG_AM },
    ],
    312,
    'Thiên Cương',
    '天罡',
  ),
  taoTheoTruc(
    MaYeuTo.HA_KHOI,
    [
      { truc: THU, chiThangApDung: THANG_DUONG },
      { truc: BINH, chiThangApDung: THANG_AM },
    ],
    312,
    'Hà Khôi',
    '河魁',
  ),
  taoTheoTruc(MaYeuTo.TU_THAN, [{ truc: BINH }], 312, 'Tử Thần', '死神'),
  taoTheoTruc(MaYeuTo.THOI_AM, [{ truc: DINH }], 316, 'Thời Âm', '時陰'),
  taoTheoTruc(MaYeuTo.QUAN_PHU, [{ truc: DINH }], 316, 'Quan Phù', '官符'),
  taoTheoTruc(MaYeuTo.TU_KHI, [{ truc: DINH }], 316, 'Tử Khí', '死氣'),
  taoTheoTruc(MaYeuTo.CHI_DUC, [{ truc: CHAP }], 319, 'Chi Đức', '枝德'),
  taoTheoTruc(MaYeuTo.TIEU_HAO, [{ truc: CHAP }], 319, 'Tiểu Hao', '小耗'),
  taoTheoTruc(MaYeuTo.DAI_HAO, [{ truc: PHA }], 321, 'Đại Hao', '大耗'),
  taoTheoTruc(MaYeuTo.THIEN_Y, [{ truc: THANH }], 323, 'Thiên Y', '天醫'),
  taoTheoTruc(MaYeuTo.THIEN_HY, [{ truc: THANH }], 323, 'Thiên Hỷ', '天喜'),
  taoTheoTruc(MaYeuTo.THOI_DUONG, [{ truc: KHAI }], 326, 'Thời Dương', '時陽'),
  taoTheoTruc(MaYeuTo.SINH_KHI, [{ truc: KHAI }], 326, 'Sinh Khí', '生氣'),
  taoTheoTruc(MaYeuTo.HUYET_CHI, [{ truc: BE }], 329, 'Huyết Chi', '血支'),
  taoTheoTruc(MaYeuTo.NGUYET_KIEN, [{ truc: KIEN }], 344, 'Nguyệt Kiến', '月建'),
];

const BANG_THIEN_CAU = {
  [DAN]: [],
  [MAO]: [],
  [THIN]: [],
  [TI]: [],
  [NGO]: [],
  [MUI]: [],
  [THAN]: [TUAT],
  [DAU]: [],
  [TUAT]: [],
  [HOI]: [],
  [TY]: [],
  [SUU]: [],
} as const;

const BANG_NGUYET_YEM = {
  [DAN]: [TUAT],
  [MAO]: [DAU],
  [THIN]: [THAN],
  [TI]: [MUI],
  [NGO]: [NGO],
  [MUI]: [TI],
  [THAN]: [THIN],
  [DAU]: [MAO],
  [TUAT]: [DAN],
  [HOI]: [SUU],
  [TY]: [TY],
  [SUU]: [HOI],
} as const;

const BANG_YEM_DOI = {
  [DAN]: [THIN],
  [MAO]: [MAO],
  [THIN]: [DAN],
  [TI]: [SUU],
  [NGO]: [TY],
  [MUI]: [HOI],
  [THAN]: [TUAT],
  [DAU]: [DAU],
  [TUAT]: [THAN],
  [HOI]: [MUI],
  [TY]: [NGO],
  [SUU]: [TI],
} as const;

export const DINH_NGHIA_YEU_TO_QUAN_HE_THANG_QUYEN_4: readonly DinhNghiaYeuToTheoChiThang[] = [
  taoTheoChiThang(MaYeuTo.THIEN_CAU, BANG_THIEN_CAU, 311, 'Thiên Cẩu', '天狗'),
  taoTheoChiThang(MaYeuTo.NGUYET_YEM, BANG_NGUYET_YEM, 347, 'Nguyệt Yếm', '月厭'),
  taoTheoChiThang(MaYeuTo.DIA_HOA, BANG_NGUYET_YEM, 347, 'Địa Hỏa', '地火'),
  taoTheoChiThang(MaYeuTo.YEM_DOI, BANG_YEM_DOI, 353, 'Yếm Đối', '厭對'),
  taoTheoChiThang(MaYeuTo.LUC_NGHI, BANG_YEM_DOI, 353, 'Lục Nghi', '六儀'),
  taoTheoChiThang(MaYeuTo.CHIEU_DIEU, BANG_YEM_DOI, 353, 'Chiêu Diêu', '招搖'),
];

function taoTheoTruc(
  ma: MaYeuTo,
  viTri: DinhNghiaYeuToTheoTruc['viTri'],
  trang: number,
  muc: string,
  tenGoc: string,
): DinhNghiaYeuToTheoTruc {
  return {
    ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: [],
    viTri,
    nguon: taoNguonQuyen4(trang, muc, tenGoc),
  };
}

function taoTheoChiThang(
  ma: MaYeuTo,
  bang: DinhNghiaYeuToTheoChiThang['chiNgayTheoChiThang'],
  trang: number,
  muc: string,
  tenGoc: string,
): DinhNghiaYeuToTheoChiThang {
  return {
    ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: [],
    chiNgayTheoChiThang: bang,
    nguon: taoNguonQuyen4(trang, muc, tenGoc),
  };
}

function taoNguonQuyen4(trang: number, muc: string, tenGoc: string): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 4,
      trang,
      muc,
      tenGoc,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 4,
      muc: tenGoc,
      tenGoc,
      daXacMinh: true,
    },
  ];
}
