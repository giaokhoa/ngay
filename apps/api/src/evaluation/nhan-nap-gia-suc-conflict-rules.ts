import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QUY_TAC_Q10_CHAN_THA_GIA_SUC_GIA_CAM } from './chan-tha-gia-suc-gia-cam-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const CORE: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_CHAN_THA_GIA_SUC_GIA_CAM.map(
  (rule) => ({
    ...rule,
    ma: rule.ma.replace(/^CHAN_THA_GIA_SUC_GIA_CAM_Q10_/, 'NHAN_NAP_GIA_SUC_Q10_'),
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  }),
);

export const QUY_TAC_Q10_NHAN_NAP_GIA_SUC: readonly QuyTacXungDotDataDriven[] = [
  ...CORE,
  supplementalStar('NHAN_NAP_GIA_SUC_Q10_TRUONG_TINH_KY', MaYeuTo.TRUONG_TINH, 'Trường Tinh'),
  supplementalStar('NHAN_NAP_GIA_SUC_Q10_DOAN_TINH_KY', MaYeuTo.DOAN_TINH, 'Đoản Tinh'),
];

function supplementalStar(ma: string, factor: MaYeuTo, tenViet: string): QuyTacXungDotDataDriven {
  return {
    ma,
    dieuKien: { coBatKyYeuTo: [factor] },
    phepXuLy: { loai: 'THEM_KY' },
    precedence: 210,
    moTa: `${tenViet} là Kị bổ sung Q10 cho Nhận, nạp gia súc.`,
    nguon: nguonHanQ10('長星・短星', 'WYG_010-71b..72a'),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('Chăn thả gia súc, gia cầm', 'Nhận, nạp gia súc')
    .replaceAll('chăn thả gia súc, gia cầm', 'nhận, nạp gia súc')
    .replaceAll('牧養', '納畜');
}

function nguonHanQ10(muc: string, anchor: string): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc,
      tenGoc: muc,
      daXacMinh: true,
      ghiChu: anchor,
    },
  ];
}
