import { MaYeuTo } from '../factors/domain/factor-code';
import { QUY_TAC_Q10_DI_CHUYEN } from './di-chuyen-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const MUC_TIEU_RIENG_DI_CHUYEN = new Set<MaYeuTo>([MaYeuTo.QUY_KY, MaYeuTo.VANG_VONG]);
const NGUYET_YEM_DUC_RESIDUAL = 'DI_CHUYEN_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_VAN_KY';

/**
 * Q10 WYG_010-75b ghép semantics 般移 ↔ 安牀 khi cát/hung tương để không chú Kị.
 * Vì vậy tái dùng core resolver của DI_CHUYEN, nhưng:
 * - không mang 歸忌/往亡 vì Q11 安牀 không Kị hai mục này;
 * - 月厭 ở Dần/Thân/Sửu/Mùi + Đức: residual list của Q10 giữ 般移 nhưng không giữ 安牀,
 *   nên AN_GIUONG bỏ Kị ở nhánh này thay vì GIỮ_KỴ_DÙ_CÓ_CÁT.
 */
export const QUY_TAC_Q10_AN_GIUONG: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_DI_CHUYEN.filter((rule) => {
    const target = rule.mucTieu;
    return !(target?.loai === 'YEU_TO' && MUC_TIEU_RIENG_DI_CHUYEN.has(target.ma));
  }).map((rule) => chuyenSangAnGiuong(rule));

function chuyenSangAnGiuong(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  const laResidualNguyetYem = rule.ma === NGUYET_YEM_DUC_RESIDUAL;
  return {
    ...rule,
    ma: rule.ma.replace(/^DI_CHUYEN_Q10_/, 'AN_GIUONG_Q10_'),
    phepXuLy: laResidualNguyetYem ? { loai: 'BO_KY' } : rule.phepXuLy,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value.replaceAll('DI_CHUYEN', 'An giường').replaceAll('Di chuyển', 'An giường');
}
