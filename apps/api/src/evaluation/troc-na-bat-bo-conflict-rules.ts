import { DieuKienDungSu } from '../activities/activity-rule';
import { TietKhi } from '../calendar/domain/solar-term';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });

const NGUON_VANG_VONG: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '徃亡 氣徃亡',
    tenGoc: '徃亡',
    daXacMinh: true,
    ghiChu: 'WYG_010-63b..64a: 徃亡 Kị 捕捉; 與德合赦願併猶忌.',
  },
];

const NGUON_PHAN_CHI: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '冬至 夏至 春分 秋分',
    tenGoc: '冬至 夏至 春分 秋分',
    daXacMinh: true,
    ghiChu: 'WYG_010-70a: bốn ngày phân/chí 不註 ... 捕捉; production bỏ Nên, không tự tạo Kị.',
  },
];

const NGUON_NGUYET_KY: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '月忌日',
    tenGoc: '月忌日',
    daXacMinh: true,
    ghiChu: 'WYG_010-71a..71b: 捕捉 không nằm trong danh sách 止註; 餘事不註, nên chỉ bỏ Nên.',
  },
];

export const QUY_TAC_Q10_TROC_NA_BAT_BO: readonly QuyTacXungDotDataDriven[] = [
  ...QUY_TAC_Q10_NHAP_HOC.map((rule) => ({
    ...rule,
    ma: rule.ma.replace(/^NHAP_HOC_Q10_/, 'TROC_NA_BAT_BO_Q10_'),
  })),
  {
    ma: 'TROC_NA_BAT_BO_Q10_VANG_VONG_VAN_KY',
    mucTieu: Y(MaYeuTo.VANG_VONG),
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 120,
    moTa: 'Vãng Vong vẫn Kị tróc nã, bắt bớ dù gặp Đức/Hợp, Thiên Xá hoặc Thiên Nguyện.',
    nguon: NGUON_VANG_VONG,
  },
  {
    ma: 'TROC_NA_BAT_BO_Q10_PHAN_CHI_BO_NEN',
    dieuKien: {
      coBatKyTietKhiTrongNgay: [
        TietKhi.XUAN_PHAN,
        TietKhi.HA_CHI,
        TietKhi.THU_PHAN,
        TietKhi.DONG_CHI,
      ],
    },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 280,
    moTa: 'Xuân phân, Hạ chí, Thu phân hoặc Đông chí: Q10 không chú Nên tróc nã, bắt bớ; bỏ Nên, không tự tạo Kị.',
    nguon: NGUON_PHAN_CHI,
  },
  {
    ma: 'TROC_NA_BAT_BO_Q10_NGUYET_KY_BO_NEN',
    dieuKien: { coTatCaYeuTo: [MaYeuTo.NGUYET_KY] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 280,
    moTa: 'Nguyệt Kị nhật: Q10 không chú Nên tróc nã, bắt bớ; bỏ Nên, không tự tạo Kị.',
    nguon: NGUON_NGUYET_KY,
  },
];
