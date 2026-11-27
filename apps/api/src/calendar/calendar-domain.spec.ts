import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from './domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from './domain/heavenly-stem';
import { THAP_NHI_TRUC_THEO_THU_TU, ThapNhiTruc } from './domain/twelve-officer';

describe('Thu tu domain lich phap', () => {
  it('giu dung thu tu 10 Thien Can trong nguon', () => {
    expect(THIEN_CAN_THEO_THU_TU).toEqual([
      ThienCan.GIAP,
      ThienCan.AT,
      ThienCan.BINH,
      ThienCan.DINH,
      ThienCan.MAU,
      ThienCan.KY,
      ThienCan.CANH,
      ThienCan.TAN,
      ThienCan.NHAM,
      ThienCan.QUY,
    ]);
  });

  it('giu dung thu tu 12 Dia Chi trong nguon', () => {
    expect(DIA_CHI_THEO_THU_TU).toEqual([
      DiaChi.TY,
      DiaChi.SUU,
      DiaChi.DAN,
      DiaChi.MAO,
      DiaChi.THIN,
      DiaChi.TI,
      DiaChi.NGO,
      DiaChi.MUI,
      DiaChi.THAN,
      DiaChi.DAU,
      DiaChi.TUAT,
      DiaChi.HOI,
    ]);
  });

  it('giu dung thu tu 12 truc', () => {
    expect(THAP_NHI_TRUC_THEO_THU_TU).toEqual([
      ThapNhiTruc.KIEN,
      ThapNhiTruc.TRU,
      ThapNhiTruc.MAN,
      ThapNhiTruc.BINH,
      ThapNhiTruc.DINH,
      ThapNhiTruc.CHAP,
      ThapNhiTruc.PHA,
      ThapNhiTruc.NGUY,
      ThapNhiTruc.THANH,
      ThapNhiTruc.THU,
      ThapNhiTruc.KHAI,
      ThapNhiTruc.BE,
    ]);
  });
});
