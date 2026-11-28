import { QUY_TAC_Q10_CHINH_DUNG_CAT_TOC } from './chinh-dung-cat-toc-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

/** Q10 writes 整容剃頭 and 整手足甲 together for the shared target semantics.
 * 丁日 is the only grooming-only exception and is therefore excluded here.
 */
export const QUY_TAC_Q10_SUA_MONG_TAY_CHAN: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_CHINH_DUNG_CAT_TOC.filter(
    (rule) => rule.ma !== 'CHINH_DUNG_CAT_TOC_Q10_DINH_BO_NEN',
  ).map((rule) => ({
    ...rule,
    ma: rule.ma.replace(/^CHINH_DUNG_CAT_TOC_Q10_/, 'SUA_MONG_TAY_CHAN_Q10_'),
    moTa: thayTen(rule.moTa),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu ? thayTen(source.ghiChu) : source.ghiChu,
    })),
  }));

function thayTen(value: string): string {
  return value
    .replaceAll('Chỉnh dung/cắt tóc', 'Sửa móng tay chân')
    .replaceAll('chỉnh dung/cắt tóc', 'sửa móng tay chân');
}
