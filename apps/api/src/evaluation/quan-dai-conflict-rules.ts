import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { QUY_TAC_Q10_DI_CHUYEN } from './di-chuyen-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const MUC_TIEU_RIENG_DI_CHUYEN = new Set<MaYeuTo>([MaYeuTo.QUY_KY, MaYeuTo.VANG_VONG]);
const NGUYET_YEM_DUC_RESIDUAL = 'DI_CHUYEN_Q10_NGUYET_YEM_DAN_THAN_SUU_MUI_VAN_KY';

/**
 * 冠帶 và 般移 dùng cùng Q10 core ở các target chung: WYG_010-75a nói khi cát/hung
 * tương để bỏ Kị cho hôn nhân thì 冠帶 cũng bỏ, trừ loại gặp Đức vẫn Kị.
 * Adapter chỉ giữ target thực sự thuộc Q11 冠帶, và source-lock hai khác biệt:
 * - 閉日 không Kị 冠帶 trong Hán Q11 + Việt/Hán Q10, nên loại khỏi clone;
 * - 月厭 Dần/Thân/Sửu/Mùi + cát: residual list p.807 không còn 冠帶, nên BO_KY.
 */
export const QUY_TAC_Q10_QUAN_DAI: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_DI_CHUYEN.filter((rule) => {
    const target = rule.mucTieu;
    if (target?.loai === 'YEU_TO' && MUC_TIEU_RIENG_DI_CHUYEN.has(target.ma)) return false;
    if (target?.loai === 'TRUC' && target.truc === ThapNhiTruc.BE) return false;
    return true;
  }).map((rule) => chuyenSangQuanDai(rule));

function chuyenSangQuanDai(rule: QuyTacXungDotDataDriven): QuyTacXungDotDataDriven {
  const laResidualNguyetYem = rule.ma === NGUYET_YEM_DUC_RESIDUAL;
  return {
    ...rule,
    ma: rule.ma.replace(/^DI_CHUYEN_Q10_/, 'QUAN_DAI_Q10_'),
    phepXuLy: laResidualNguyetYem ? { loai: 'BO_KY' } : rule.phepXuLy,
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  };
}

function thayTen(value: string): string {
  return value
    .replaceAll('DI_CHUYEN', 'Quan đới')
    .replaceAll('Di chuyển', 'Quan đới')
    .replaceAll('di chuyển', 'quan đới');
}
