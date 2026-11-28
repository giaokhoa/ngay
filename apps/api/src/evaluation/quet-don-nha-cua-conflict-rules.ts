import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

/**
 * 掃舍宇 Q11 ghi 忌無, giống 入學 ở chỗ không có activity-specific baseline Kị.
 * Q10 vẫn có một subset nói thẳng 諸事皆忌; NHAP_HOC resolver đã source-lock
 * chính subset toàn cục này. 掃舍宇 tái dùng nó, còn shared 無祿/上朔四離四絶晦日
 * được miễn riêng tại q10-shared-calendar-annotations.ts theo exact source.
 */
export const QUY_TAC_Q10_QUET_DON_NHA_CUA: readonly QuyTacXungDotDataDriven[] =
  QUY_TAC_Q10_NHAP_HOC.map((rule) => ({
    ...rule,
    ma: rule.ma.replace(/^NHAP_HOC_Q10_/, 'QUET_DON_NHA_CUA_Q10_'),
  }));
