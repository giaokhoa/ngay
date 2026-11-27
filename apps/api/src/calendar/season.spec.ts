import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from './domain/earthly-branch';
import { Mua } from './domain/season';
import { tinhMuaTheoChiThang } from './season';

const ORACLE_MUA: Readonly<Record<DiaChi, Mua>> = {
  [DiaChi.DAN]: Mua.XUAN,
  [DiaChi.MAO]: Mua.XUAN,
  [DiaChi.THIN]: Mua.XUAN,
  [DiaChi.TI]: Mua.HA,
  [DiaChi.NGO]: Mua.HA,
  [DiaChi.MUI]: Mua.HA,
  [DiaChi.THAN]: Mua.THU,
  [DiaChi.DAU]: Mua.THU,
  [DiaChi.TUAT]: Mua.THU,
  [DiaChi.HOI]: Mua.DONG,
  [DiaChi.TY]: Mua.DONG,
  [DiaChi.SUU]: Mua.DONG,
};

describe('tinhMuaTheoChiThang', () => {
  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    it(`${chiThang} -> ${ORACLE_MUA[chiThang]}`, () => {
      expect(tinhMuaTheoChiThang(chiThang)).toBe(ORACLE_MUA[chiThang]);
    });
  }
});
