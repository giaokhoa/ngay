import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_NGUYET_PHA } from './monthly-break-definition';

const ORACLE_NGUYET_PHA: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.DAN]: DiaChi.THAN,
  [DiaChi.MAO]: DiaChi.DAU,
  [DiaChi.THIN]: DiaChi.TUAT,
  [DiaChi.TI]: DiaChi.HOI,
  [DiaChi.NGO]: DiaChi.TY,
  [DiaChi.MUI]: DiaChi.SUU,
  [DiaChi.THAN]: DiaChi.DAN,
  [DiaChi.DAU]: DiaChi.MAO,
  [DiaChi.TUAT]: DiaChi.THIN,
  [DiaChi.HOI]: DiaChi.TI,
  [DiaChi.TY]: DiaChi.NGO,
  [DiaChi.SUU]: DiaChi.MUI,
};

describe('Nguyệt Phá — oracle 12 tháng x 12 Chi', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    for (const chiNgay of DIA_CHI_THEO_THU_TU) {
      const nenCo = ORACLE_NGUYET_PHA[chiThang] === chiNgay;

      it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'} Nguyet Pha`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: ThienCan.GIAP,
          chiNgay,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.NGUYET_PHA)).toBe(nenCo);
      });
    }
  }
});

describe('Nguyệt Phá — source identity', () => {
  const service = new TinhYeuToNgayService();

  it('giữ identity riêng dù cùng vị trí với Trực Phá / Đại Hao', () => {
    const ketQua = service.tinh({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.THAN,
      dangThoVuong: false,
    });
    const ma = new Set(ketQua.map((yeuTo) => yeuTo.ma));

    expect(ma).toContain(MaYeuTo.NGUYET_PHA);
    expect(ma).toContain(MaYeuTo.DAI_HAO);
  });

  it('có provenance Việt và Hán đã xác minh', () => {
    const loaiNguon = new Set(DINH_NGHIA_NGUYET_PHA.nguon.map((nguon) => nguon.loaiNguon));

    expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
    expect(DINH_NGHIA_NGUYET_PHA.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
  });
});
