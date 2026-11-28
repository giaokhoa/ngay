import { QUY_TAC_Q10_CAU_PHUC } from './cau-phuc-conflict-rules';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

/**
 * Q10 consistently treats 祈福 / 求嗣 together for the conflict targets used here.
 * The few textual mismatches are Nên-only factors (e.g. 天巫, 普護/福生/聖心) and
 * therefore belong in the Q11 baseline, not conflict semantics.
 */
export const QUY_TAC_Q10_CAU_TU: readonly QuyTacXungDotDataDriven[] = QUY_TAC_Q10_CAU_PHUC.map(
  (rule) => ({
    ...rule,
    ma: rule.ma.replace(/^CAU_PHUC_Q10_/, 'CAU_TU_Q10_'),
    moTa: rule.moTa.replaceAll('Cầu phúc', 'Cầu tự').replaceAll('cầu phúc', 'cầu tự'),
    nguon: rule.nguon.map((source) => ({
      ...source,
      ghiChu: source.ghiChu?.replaceAll('Cầu phúc', 'Cầu tự').replaceAll('cầu phúc', 'cầu tự'),
    })),
  }),
);
