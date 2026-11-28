import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiNguon } from '../sources/source-reference';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_NHAP_HOC } from './nhap-hoc-rules';

describe('NHAP_HOC Q11 source lock', () => {
  it('khớp Hán 入學: 宜成日開日，忌無', () => {
    expect(QUY_TAC_NHAP_HOC).toHaveLength(2);
    expect(
      QUY_TAC_NHAP_HOC.map((rule) => ({ dieuKien: rule.dieuKien, tacDong: rule.tacDong })),
    ).toEqual([
      { dieuKien: { loai: 'TRUC', truc: ThapNhiTruc.THANH }, tacDong: TacDongDungSu.NEN },
      { dieuKien: { loai: 'TRUC', truc: ThapNhiTruc.KHAI }, tacDong: TacDongDungSu.NEN },
    ]);
    expect(QUY_TAC_NHAP_HOC.some((rule) => rule.tacDong === TacDongDungSu.KY)).toBe(false);
  });

  it('giữ provenance Việt p848 + Hán Q11 cho cả hai rule', () => {
    for (const rule of QUY_TAC_NHAP_HOC) {
      expect(new Set(rule.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(rule.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });
});
