import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';

const service = new TinhYeuToNgayService();

describe('Q5 fixed branch factors — 五合 / 五離', () => {
  for (const chiNgay of DIA_CHI_THEO_THU_TU) {
    it(`${chiNgay}: fixed Ngũ Hợp / Ngũ Ly identity`, () => {
      const codes = service
        .tinh({
          chiThang: DiaChi.DAN,
          canNgay: ThienCan.GIAP,
          chiNgay,
          dangThoVuong: false,
        })
        .map((item) => item.ma);

      expect(codes.includes(MaYeuTo.NGU_HOP)).toBe([DiaChi.DAN, DiaChi.MAO].includes(chiNgay));
      expect(codes.includes(MaYeuTo.NGU_LY)).toBe([DiaChi.THAN, DiaChi.DAU].includes(chiNgay));
    });
  }
});
