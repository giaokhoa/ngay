import { describe, expect, it } from 'vitest';

import { DiaChi } from './domain/earthly-branch';
import { ThienCan } from './domain/heavenly-stem';
import { TietKhi } from './domain/solar-term';
import { TinhTietKhiService } from './solar-term.service';
import { tinhCanChiNamTheoLapXuan, tinhCanChiThang } from './sexagenary-year-month';

describe('Can-Chi năm/tháng cho tương chủ', () => {
  const tietKhi = new TinhTietKhiService();

  it('đổi năm Can-Chi tại Lập Xuân, không tại 1/1', () => {
    const lapXuan2024 = tietKhi.tinhThoiDiemTietKhi(2024, TietKhi.LAP_XUAN);

    expect(tinhCanChiNamTheoLapXuan(new Date(lapXuan2024.getTime() - 60_000), tietKhi)).toEqual({
      can: ThienCan.QUY,
      chi: DiaChi.MAO,
    });

    expect(tinhCanChiNamTheoLapXuan(new Date(lapXuan2024.getTime() + 60_000), tietKhi)).toEqual({
      can: ThienCan.GIAP,
      chi: DiaChi.THIN,
    });
  });

  it('dùng Ngũ Hổ Độn để tính Can tháng', () => {
    expect(tinhCanChiThang(ThienCan.GIAP, DiaChi.DAN)).toEqual({
      can: ThienCan.BINH,
      chi: DiaChi.DAN,
    });
    expect(tinhCanChiThang(ThienCan.GIAP, DiaChi.MAO)).toEqual({
      can: ThienCan.DINH,
      chi: DiaChi.MAO,
    });
    expect(tinhCanChiThang(ThienCan.BINH, DiaChi.DAN)).toEqual({
      can: ThienCan.CANH,
      chi: DiaChi.DAN,
    });
    expect(tinhCanChiThang(ThienCan.BINH, DiaChi.TY)).toEqual({
      can: ThienCan.CANH,
      chi: DiaChi.TY,
    });
  });
});
