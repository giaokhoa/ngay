import { DiaChi } from '../calendar/domain/earthly-branch';
import { taoNguonXungDotQuyen10 } from './cuoi-hoi-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';
import { QUY_TAC_Q10_YEN_HOI } from './yen-hoi-conflict-rules';

export const QUY_TAC_Q10_KHANH_THUONG: readonly QuyTacXungDotDataDriven[] = [
  ...QUY_TAC_Q10_YEN_HOI.map(chuyenSangKhanhThuong),
  {
    ma: 'KHANH_THUONG_Q10_DAU_BO_NEN',
    dieuKien: { chiNgay: [DiaChi.DAU] },
    phepXuLy: { loai: 'BO_NEN' },
    precedence: 200,
    moTa: 'Ngày Dậu kị Yến hội nên không ghi Nên Chúc mừng ban thưởng; không biến thành Kị riêng.',
    nguon: taoNguonXungDotQuyen10(835),
  },
];

function chuyenSangKhanhThuong(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  return {
    ...rule,
    ma: rule.ma.replace(/^YEN_HOI_Q10_/, 'KHANH_THUONG_Q10_'),
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('Yến hội', 'Chúc mừng ban thưởng')
    .replaceAll('yến hội', 'chúc mừng ban thưởng');
}
