import { describe, expect, it } from 'vitest';

import { DiaChi } from './domain/earthly-branch';
import { ThapNhiTruc } from './domain/twelve-officer';
import { tinhThapNhiTruc } from './twelve-officer';

describe('Thap Nhi Truc', () => {
  it.each([
    [DiaChi.TY, ThapNhiTruc.KHAI],
    [DiaChi.SUU, ThapNhiTruc.BE],
    [DiaChi.DAN, ThapNhiTruc.KIEN],
    [DiaChi.MAO, ThapNhiTruc.TRU],
    [DiaChi.THIN, ThapNhiTruc.MAN],
  ])('khop Nguyet bieu thang Dan: %s', (chiNgay, truc) => {
    expect(tinhThapNhiTruc(DiaChi.DAN, chiNgay)).toBe(truc);
  });

  it.each([
    [DiaChi.MAO, ThapNhiTruc.KIEN],
    [DiaChi.THIN, ThapNhiTruc.TRU],
    [DiaChi.TI, ThapNhiTruc.MAN],
  ])('khop Nguyet bieu thang Mao: %s', (chiNgay, truc) => {
    expect(tinhThapNhiTruc(DiaChi.MAO, chiNgay)).toBe(truc);
  });
});
