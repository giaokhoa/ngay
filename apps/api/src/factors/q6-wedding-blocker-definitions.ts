import { DiaChi } from '../calendar/domain/earthly-branch';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { DinhNghiaYeuToTheoChiThang } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

export const DINH_NGHIA_BLOCKER_CUOI_HOI_QUYEN_6: readonly DinhNghiaYeuToTheoChiThang[] = [
  taoTheoChiThang({
    ma: MaYeuTo.DAI_THOI,
    tenKhac: ['Đại Bại', 'Hàm Trì'],
    trang: 496,
    muc: 'Đại Thời',
    tenGoc: '大時',
    bang: {
      [DAN]: [MAO],
      [MAO]: [TY],
      [THIN]: [DAU],
      [TI]: [NGO],
      [NGO]: [MAO],
      [MUI]: [TY],
      [THAN]: [DAU],
      [DAU]: [NGO],
      [TUAT]: [MAO],
      [HOI]: [TY],
      [TY]: [DAU],
      [SUU]: [NGO],
    },
  }),
  taoTheoChiThang({
    ma: MaYeuTo.THIEN_LAI,
    tenKhac: ['Trí Tử'],
    trang: 500,
    muc: 'Thiên Lại',
    tenGoc: '天吏',
    bang: {
      [DAN]: [DAU],
      [MAO]: [NGO],
      [THIN]: [MAO],
      [TI]: [TY],
      [NGO]: [DAU],
      [MUI]: [NGO],
      [THAN]: [MAO],
      [DAU]: [TY],
      [TUAT]: [DAU],
      [HOI]: [NGO],
      [TY]: [MAO],
      [SUU]: [TY],
    },
  }),
  taoTheoChiThang({
    ma: MaYeuTo.VANG_VONG,
    tenKhac: [],
    trang: 550,
    muc: 'Vãng Vong',
    tenGoc: '往亡',
    bang: {
      [DAN]: [DAN],
      [MAO]: [TI],
      [THIN]: [THAN],
      [TI]: [HOI],
      [NGO]: [MAO],
      [MUI]: [NGO],
      [THAN]: [DAU],
      [DAU]: [TY],
      [TUAT]: [THIN],
      [HOI]: [MUI],
      [TY]: [TUAT],
      [SUU]: [SUU],
    },
    ghiChu: 'Không đồng nhất với Khí Vãng Vong theo offset sau tứ Lập ở trang 555.',
  }),
];

interface ThamSo {
  ma: MaYeuTo;
  tenKhac: readonly string[];
  trang: number;
  muc: string;
  tenGoc: string;
  bang: DinhNghiaYeuToTheoChiThang['chiNgayTheoChiThang'];
  ghiChu?: string;
}

function taoTheoChiThang(thamSo: ThamSo): DinhNghiaYeuToTheoChiThang {
  return {
    ma: thamSo.ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: thamSo.tenKhac,
    chiNgayTheoChiThang: thamSo.bang,
    nguon: taoNguonQuyen6(thamSo.trang, thamSo.muc, thamSo.tenGoc, thamSo.ghiChu),
  };
}

function taoNguonQuyen6(
  trang: number,
  muc: string,
  tenGoc: string,
  ghiChu?: string,
): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 6,
      trang,
      muc,
      tenGoc,
      ghiChu,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 6,
      muc: tenGoc,
      tenGoc,
      daXacMinh: true,
    },
  ];
}
