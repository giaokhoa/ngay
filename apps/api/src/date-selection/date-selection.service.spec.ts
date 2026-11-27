import { describe, expect, it } from 'vitest';

import { DungSuService } from '../activities/activities.service';
import { TinhLichService } from '../calendar/calendar.service';
import { TinhThoVuongService } from '../calendar/earth-reign.service';
import { TinhTietKhiService } from '../calendar/solar-term.service';
import { DanhGiaNgayService } from '../evaluation/evaluation.service';
import { TinhYeuToNgayService } from '../factors/factors.service';
import { XemNgayService } from './date-selection.service';

function taoService(): XemNgayService {
  const tietKhi = new TinhTietKhiService();
  const thoVuong = new TinhThoVuongService(tietKhi);
  const lich = new TinhLichService(tietKhi, thoVuong);
  return new XemNgayService(
    lich,
    new TinhYeuToNgayService(),
    new DungSuService(),
    new DanhGiaNgayService(),
  );
}

describe('XemNgayService CUOI_HOI end-to-end', () => {
  it('orchestrates calendar -> factors -> Q11 -> Q10 with explanation', () => {
    const result = taoService().xemCuoiHoi(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.yeuTo.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for the same instant and timezone', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemCuoiHoi(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemCuoiHoi(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});
