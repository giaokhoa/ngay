import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_MAU_THUONG } from './maternal-storehouse-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

const ORACLE_MAU_THUONG_THEO_THANG: Readonly<Record<DiaChi, readonly DiaChi[]>> = {
  [DAN]: [HOI, TY],
  [MAO]: [HOI, TY],
  [THIN]: [HOI, TY],
  [TI]: [DAN, MAO],
  [NGO]: [DAN, MAO],
  [MUI]: [DAN, MAO],
  [THAN]: [THIN, TUAT, SUU, MUI],
  [DAU]: [THIN, TUAT, SUU, MUI],
  [TUAT]: [THIN, TUAT, SUU, MUI],
  [HOI]: [THAN, DAU],
  [TY]: [THAN, DAU],
  [SUU]: [THAN, DAU],
};

const ORACLE_KHI_THO_VUONG = [TI, NGO] as const;

describe('Mẫu Thương — seasonal oracle', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = ORACLE_MAU_THUONG_THEO_THANG[chiThang].includes(chiNgay);

      it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: ThienCan.GIAP,
          chiNgay,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.MAU_THUONG)).toBe(nenCo);
      });
    }
  }
});

describe('Mẫu Thương — Thổ Vượng replacement', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = ORACLE_KHI_THO_VUONG.includes(chiNgay as (typeof ORACLE_KHI_THO_VUONG)[number]);

      it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'} trong Tho Vuong`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: ThienCan.GIAP,
          chiNgay,
          dangThoVuong: true,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.MAU_THUONG)).toBe(nenCo);
      });
    }
  }

  it('thay the seasonal set thay vi cong them Ty Ngo', () => {
    const seasonal = service.tinh({
      chiThang: THIN,
      canNgay: ThienCan.GIAP,
      chiNgay: HOI,
      dangThoVuong: false,
    });
    const thoVuong = service.tinh({
      chiThang: THIN,
      canNgay: ThienCan.GIAP,
      chiNgay: HOI,
      dangThoVuong: true,
    });

    expect(seasonal.some((yeuTo) => yeuTo.ma === MaYeuTo.MAU_THUONG)).toBe(true);
    expect(thoVuong.some((yeuTo) => yeuTo.ma === MaYeuTo.MAU_THUONG)).toBe(false);
  });
});

describe('Mẫu Thương — provenance', () => {
  it('có bản Việt và Hán bản đã xác minh', () => {
    const loaiNguon = new Set(DINH_NGHIA_MAU_THUONG.nguon.map((nguon) => nguon.loaiNguon));

    expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
    expect(DINH_NGHIA_MAU_THUONG.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
  });
});
