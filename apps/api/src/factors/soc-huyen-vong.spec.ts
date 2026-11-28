import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_SOC_HUYEN_VONG } from './soc-huyen-vong-definition';

const service = new TinhYeuToNgayService();
const BASE = {
  chiThang: DiaChi.DAN,
  canNgay: ThienCan.GIAP,
  chiNgay: DiaChi.TY,
  dangThoVuong: false,
};

describe('Sóc–Huyền–Vọng / 朔弦望', () => {
  it('giữ provenance Việt Q10 p829 + Hán Q10', () => {
    expect(new Set(DINH_NGHIA_SOC_HUYEN_VONG.nguon.map((source) => source.loaiNguon))).toEqual(
      new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
    );
    expect(DINH_NGHIA_SOC_HUYEN_VONG.nguon.every((source) => source.daXacMinh)).toBe(true);
  });

  it('calendar flag true emits exactly one factor', () => {
    const result = service.tinh({ ...BASE, ngaySocHuyenVong: true });
    expect(result.filter((item) => item.ma === MaYeuTo.SOC_HUYEN_VONG)).toHaveLength(1);
  });

  it('flag false/missing does not emit factor', () => {
    expect(service.tinh(BASE).map((item) => item.ma)).not.toContain(MaYeuTo.SOC_HUYEN_VONG);
    expect(service.tinh({ ...BASE, ngaySocHuyenVong: false }).map((item) => item.ma)).not.toContain(
      MaYeuTo.SOC_HUYEN_VONG,
    );
  });
});
