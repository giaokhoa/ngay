import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

const ORACLE_VUONG_NHAT: Readonly<Record<DiaChi, DiaChi>> = {
  [DAN]: DAN,
  [MAO]: DAN,
  [THIN]: DAN,
  [TI]: TI,
  [NGO]: TI,
  [MUI]: TI,
  [THAN]: THAN,
  [DAU]: THAN,
  [TUAT]: THAN,
  [HOI]: HOI,
  [TY]: HOI,
  [SUU]: HOI,
};

describe('Vương Nhật 王日 — independent 12 x 12 oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = ORACLE_VUONG_NHAT[chiThang] === chiNgay;

      it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'} Vuong Nhat`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: ThienCan.GIAP,
          chiNgay,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.VUONG_NHAT)).toBe(nenCo);
      });
    }
  }

  it('guards Hiệp Kỷ Xét mapping against the later Vương/Quan swap', () => {
    expect(ORACLE_VUONG_NHAT[DAN]).toBe(DAN);
    expect(ORACLE_VUONG_NHAT[DAN]).not.toBe(MAO);

    expect(ORACLE_VUONG_NHAT[TI]).toBe(TI);
    expect(ORACLE_VUONG_NHAT[TI]).not.toBe(NGO);

    expect(ORACLE_VUONG_NHAT[THAN]).toBe(THAN);
    expect(ORACLE_VUONG_NHAT[THAN]).not.toBe(DAU);

    expect(ORACLE_VUONG_NHAT[HOI]).toBe(HOI);
    expect(ORACLE_VUONG_NHAT[HOI]).not.toBe(TY);
  });

  it('keeps verified Vietnamese + Hán provenance and the swap note', () => {
    const factor = service
      .tinh({
        chiThang: DAN,
        canNgay: ThienCan.GIAP,
        chiNgay: DAN,
        dangThoVuong: false,
      })
      .find((item) => item.ma === MaYeuTo.VUONG_NHAT);

    expect(factor?.nguon).toHaveLength(2);
    expect(factor?.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    expect(factor?.nguon[0]?.ghiChu).toContain('Xét p.427');
  });
});
