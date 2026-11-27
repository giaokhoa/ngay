import { describe, expect, it } from 'vitest';

import { DiaChi } from './domain/earthly-branch';
import { ThienCan } from './domain/heavenly-stem';
import { tinhCanChiNgay, tinhCanChiTheoChiSo, tinhChiSoCanChiNgay } from './sexagenary-day';

describe('Can Chi ngay', () => {
  it('dung moc GB/T 33661: 1949-10-01 la Giap Ty', () => {
    expect(tinhCanChiNgay('1949-10-01')).toEqual({
      can: ThienCan.GIAP,
      chi: DiaChi.TY,
    });
  });

  it('tien va lui dung mot buoc quanh moc', () => {
    expect(tinhCanChiNgay('1949-09-30')).toEqual({
      can: ThienCan.QUY,
      chi: DiaChi.HOI,
    });
    expect(tinhCanChiNgay('1949-10-02')).toEqual({
      can: ThienCan.AT,
      chi: DiaChi.SUU,
    });
  });

  it.each([
    ['2026-01-01', ThienCan.AT, DiaChi.HOI],
    ['2026-01-10', ThienCan.GIAP, DiaChi.THAN],
    ['2026-01-31', ThienCan.AT, DiaChi.TI],
  ])('khop HKO 2026 cho %s', (ngay, can, chi) => {
    expect(tinhCanChiNgay(ngay)).toEqual({ can, chi });
  });

  it('lap lai sau 60 ngay trong vong Can Chi', () => {
    expect(tinhCanChiTheoChiSo(0)).toEqual(tinhCanChiTheoChiSo(60));
    expect(tinhCanChiTheoChiSo(-1)).toEqual({
      can: ThienCan.QUY,
      chi: DiaChi.HOI,
    });
  });

  it('tinh chi so theo epoch bang civil-date arithmetic', () => {
    expect(tinhChiSoCanChiNgay('1949-10-01')).toBe(0);
    expect(tinhChiSoCanChiNgay('2026-01-01')).toBe(11);
  });
});
