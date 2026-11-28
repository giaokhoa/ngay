import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import { laNguyetKy, laPhanChi, laThuongSoc } from './q6-lunar-context-definitions';

const BASE: BoiCanhTinhYeuToNgay = {
  chiThang: DiaChi.DAN,
  canNgay: ThienCan.GIAP,
  chiNgay: DiaChi.TY,
  dangThoVuong: false,
};

describe('Q6 lunar/year-context oracle', () => {
  it.each([
    [ThienCan.GIAP, ThienCan.QUY, DiaChi.HOI],
    [ThienCan.AT, ThienCan.KY, DiaChi.TI],
    [ThienCan.BINH, ThienCan.AT, DiaChi.HOI],
    [ThienCan.DINH, ThienCan.TAN, DiaChi.TI],
    [ThienCan.MAU, ThienCan.DINH, DiaChi.HOI],
    [ThienCan.KY, ThienCan.QUY, DiaChi.TI],
    [ThienCan.CANH, ThienCan.KY, DiaChi.HOI],
    [ThienCan.TAN, ThienCan.AT, DiaChi.TI],
    [ThienCan.NHAM, ThienCan.TAN, DiaChi.HOI],
    [ThienCan.QUY, ThienCan.DINH, DiaChi.TI],
  ])('Thượng Sóc theo Can năm %s → %s %s', (canNam, canNgay, chiNgay) => {
    expect(
      laThuongSoc({
        ...BASE,
        canNgay,
        chiNgay,
        canChiNam: { can: canNam, chi: DiaChi.TY },
      }),
    ).toBe(true);
  });

  it.each([
    [DiaChi.TUAT, 1],
    [DiaChi.HOI, 1],
    [DiaChi.THAN, 2],
    [DiaChi.DAU, 2],
    [DiaChi.NGO, 3],
    [DiaChi.MUI, 3],
    [DiaChi.THIN, 4],
    [DiaChi.TI, 4],
    [DiaChi.DAN, 5],
    [DiaChi.MAO, 5],
    [DiaChi.TY, 6],
    [DiaChi.SUU, 6],
  ])('Phản Chi: chi ngày sóc %s → ngày âm %i', (chiSoc, ngayAmTrongThang) => {
    expect(
      laPhanChi({
        ...BASE,
        ngayAmTrongThang,
        canChiNgaySoc: { can: ThienCan.GIAP, chi: chiSoc },
      }),
    ).toBe(true);
  });

  it.each([5, 14, 23])('Nguyệt Kị đúng ngày âm %i', (ngayAmTrongThang) => {
    expect(laNguyetKy({ ...BASE, ngayAmTrongThang })).toBe(true);
  });

  it('không suy factor khi context năm/lunar chưa có', () => {
    expect(laThuongSoc(BASE)).toBe(false);
    expect(laPhanChi(BASE)).toBe(false);
    expect(laNguyetKy(BASE)).toBe(false);
  });
});
