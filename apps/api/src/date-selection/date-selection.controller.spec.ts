import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';

import { DungSuService } from '../activities/activities.service';
import { TinhLichService } from '../calendar/calendar.service';
import { TinhThoVuongService } from '../calendar/earth-reign.service';
import { TinhTietKhiService } from '../calendar/solar-term.service';
import { DanhGiaNgayService } from '../evaluation/evaluation.service';
import { TinhYeuToNgayService } from '../factors/factors.service';
import { XemNgayController } from './date-selection.controller';
import { XemNgayService } from './date-selection.service';

function taoController(): XemNgayController {
  const tietKhi = new TinhTietKhiService();
  const lich = new TinhLichService(tietKhi, new TinhThoVuongService(tietKhi));
  const service = new XemNgayService(
    lich,
    new TinhYeuToNgayService(),
    new DungSuService(),
    new DanhGiaNgayService(),
  );
  return new XemNgayController(service);
}

describe('XemNgayController', () => {
  it('trả kết quả CUOI_HOI có explanation và source trace', () => {
    const result = taoController().xemCuoiHoi('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.nguon.length > 0)).toBe(true);
  });

  it('từ chối thiếu input', () => {
    expect(() => taoController().xemCuoiHoi(undefined, 'Asia/Ho_Chi_Minh')).toThrow(
      BadRequestException,
    );
  });

  it('từ chối timezone IANA không hợp lệ', () => {
    expect(() => taoController().xemCuoiHoi('2026-11-27T05:00:00.000Z', 'Not/A_Timezone')).toThrow(
      BadRequestException,
    );
  });
});
