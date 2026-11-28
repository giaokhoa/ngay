import { DiaChi } from '../calendar/domain/earthly-branch';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToTheoChiThang } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

export const DINH_NGHIA_CAC_THAN_TE_TU_QUYEN_6: readonly DinhNghiaYeuToTheoChiThang[] = [
  taoTheoChiThang({
    ma: MaYeuTo.PHO_HO,
    trang: 516,
    muc: 'Phả Hộ',
    tenGoc: '普䕶',
    hanAnchor: 'WYG_006-39b..40a',
    bang: {
      [DAN]: [THAN],
      [MAO]: [DAN],
      [THIN]: [DAU],
      [TI]: [MAO],
      [NGO]: [TUAT],
      [MUI]: [THIN],
      [THAN]: [HOI],
      [DAU]: [TI],
      [TUAT]: [TY],
      [HOI]: [NGO],
      [TY]: [SUU],
      [SUU]: [MUI],
    },
    tenKhac: ['Phả Hộ'],
    ghiChu:
      'Bản Việt p.516 in “Phả Hộ”; canonical Hán-Việt của 普䕶 dùng Phổ Hộ. Hai tên cùng một factor, không phải hai thần khác nhau.',
  }),
  taoTheoChiThang({
    ma: MaYeuTo.PHUC_SINH,
    trang: 517,
    muc: 'Phúc Sinh',
    tenGoc: '福生',
    hanAnchor: 'WYG_006-40b..41a',
    bang: {
      [DAN]: [DAU],
      [MAO]: [MAO],
      [THIN]: [TUAT],
      [TI]: [THIN],
      [NGO]: [HOI],
      [MUI]: [TI],
      [THAN]: [TY],
      [DAU]: [NGO],
      [TUAT]: [SUU],
      [HOI]: [MUI],
      [TY]: [DAN],
      [SUU]: [THAN],
    },
  }),
  taoTheoChiThang({
    ma: MaYeuTo.THANH_TAM,
    trang: 518,
    muc: 'Thánh Tâm',
    tenGoc: '聖心',
    hanAnchor: 'WYG_006-41b..42a',
    bang: {
      [DAN]: [HOI],
      [MAO]: [TI],
      [THIN]: [TY],
      [TI]: [NGO],
      [NGO]: [SUU],
      [MUI]: [MUI],
      [THAN]: [DAN],
      [DAU]: [THAN],
      [TUAT]: [MAO],
      [HOI]: [DAU],
      [TY]: [THIN],
      [SUU]: [TUAT],
    },
  }),
  taoTheoChiThang({
    ma: MaYeuTo.ICH_HAU,
    trang: 520,
    muc: 'Ích Hậu',
    tenGoc: '益後',
    hanAnchor: 'WYG_006-43b..44a',
    bang: {
      [DAN]: [TY],
      [MAO]: [NGO],
      [THIN]: [SUU],
      [TI]: [MUI],
      [NGO]: [DAN],
      [MUI]: [THAN],
      [THAN]: [MAO],
      [DAU]: [DAU],
      [TUAT]: [THIN],
      [HOI]: [TUAT],
      [TY]: [TI],
      [SUU]: [HOI],
    },
  }),
  taoTheoChiThang({
    ma: MaYeuTo.TUC_THE,
    trang: 522,
    muc: 'Tục Thế',
    tenGoc: '續世',
    hanAnchor: 'WYG_006-44b..45a',
    bang: {
      [DAN]: [SUU],
      [MAO]: [MUI],
      [THIN]: [DAN],
      [TI]: [THAN],
      [NGO]: [MAO],
      [MUI]: [DAU],
      [THAN]: [THIN],
      [DAU]: [TUAT],
      [TUAT]: [TI],
      [HOI]: [HOI],
      [TY]: [NGO],
      [SUU]: [TY],
    },
    ghiChu:
      'TOC Việt/Hán ghép nhãn Huyết Kị cạnh Tục Thế, nhưng body Q6 ở đây định nghĩa 續世 là cát thần riêng; production không coi Huyết Kị là alias khi chưa source-lock semantics.',
  }),
];

interface ThamSo {
  ma: MaYeuTo;
  trang: number;
  muc: string;
  tenGoc: string;
  hanAnchor: string;
  bang: DinhNghiaYeuToTheoChiThang['chiNgayTheoChiThang'];
  ghiChu?: string;
  tenKhac?: readonly string[];
}

function taoTheoChiThang(thamSo: ThamSo): DinhNghiaYeuToTheoChiThang {
  return {
    ma: thamSo.ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: thamSo.tenKhac ?? [],
    chiNgayTheoChiThang: thamSo.bang,
    nguon: [
      {
        loaiNguon: LoaiNguon.BAN_VIET,
        tap: 1,
        quyen: 6,
        trang: thamSo.trang,
        muc: thamSo.muc,
        tenGoc: thamSo.tenGoc,
        ghiChu: thamSo.ghiChu,
        daXacMinh: true,
      },
      {
        loaiNguon: LoaiNguon.HAN_BAN,
        quyen: 6,
        muc: thamSo.tenGoc,
        tenGoc: thamSo.tenGoc,
        ghiChu: `${thamSo.hanAnchor}; exact month→day-branch table.`,
        daXacMinh: true,
      },
    ] satisfies readonly ThamChieuNguon[],
  };
}
