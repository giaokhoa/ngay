import { describe, expect, it } from 'vitest';

import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import {
  DINH_NGHIA_HOI_NHAT,
  DINH_NGHIA_TU_LY,
  DINH_NGHIA_TU_TUYET,
} from './special-calendar-day-definitions';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';

const service = new TinhYeuToNgayService();
const BASE = {
  chiThang: DiaChi.DAN,
  canNgay: ThienCan.GIAP,
  chiNgay: DiaChi.TY,
  dangThoVuong: false,
};

describe('Tứ Ly / Tứ Tuyệt / Hối nhật factors', () => {
  it('giữ provenance Việt/Hán source-exact', () => {
    for (const definition of [DINH_NGHIA_TU_LY, DINH_NGHIA_TU_TUYET, DINH_NGHIA_HOI_NHAT]) {
      expect(new Set(definition.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
      );
      expect(definition.nguon.every((source) => source.daXacMinh)).toBe(true);
    }
  });

  it.each([
    ['ngayTuLy', MaYeuTo.TU_LY],
    ['ngayTuTuyet', MaYeuTo.TU_TUYET],
    ['ngayHoi', MaYeuTo.HOI_NHAT],
  ] as const)('%s=true emits exactly %s', (flag, ma) => {
    const result = service.tinh({ ...BASE, [flag]: true });
    expect(result.filter((item) => item.ma === ma)).toHaveLength(1);
  });

  it('không emit khi calendar flags vắng/false', () => {
    const codes = service.tinh(BASE).map((item) => item.ma);
    expect(codes).not.toContain(MaYeuTo.TU_LY);
    expect(codes).not.toContain(MaYeuTo.TU_TUYET);
    expect(codes).not.toContain(MaYeuTo.HOI_NHAT);
  });
});
