import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

/**
 * Q10 nhiều mục ghi Tế tự trong nhóm “止不忌祭祀”, nên không clone các Kị thường.
 * Tế tự vẫn chịu những nhánh “諸事皆忌” thật sự toàn cục. Tập rule này chính là
 * universal hard-ban subset đã source-lock ở Nhập học, đổi stable machine key בלבד.
 * Kị Thiên Cẩu và ngày Dần là baseline Q11/Q10 riêng, xử lý trong activity rules.
 */
export const QUY_TAC_Q10_TE_TU: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_NHAP_HOC.map(
  (rule) => ({
    ...rule,
    ma: rule.ma.replace(/^NHAP_HOC_Q10_/, 'TE_TU_Q10_'),
  }),
);
