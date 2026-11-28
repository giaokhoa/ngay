import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { tinhCanChiNamSinh, xetNamSinhVoiNgay } from './personal-year';

describe('tương chủ theo sinh niên', () => {
  it('tính Can-Chi năm sinh theo mốc Giáp Tý 1984', () => {
    expect(tinhCanChiNamSinh(1984)).toEqual({
      can: ThienCan.GIAP,
      chi: DiaChi.TY,
    });
    expect(tinhCanChiNamSinh(1990)).toEqual({
      can: ThienCan.CANH,
      chi: DiaChi.NGO,
    });
    expect(tinhCanChiNamSinh(2024)).toEqual({
      can: ThienCan.GIAP,
      chi: DiaChi.THIN,
    });
  });

  it('sinh trước Lập Xuân dùng năm Can-Chi trước đó', () => {
    expect(tinhCanChiNamSinh(1990, true)).toEqual(tinhCanChiNamSinh(1989));
  });

  it('đánh dấu Chi ngày xung năm sinh', () => {
    const result = xetNamSinhVoiNgay(1984, {
      can: ThienCan.GIAP,
      chi: DiaChi.NGO,
    });

    expect(result.xung).toBe(true);
    expect(result.mucDo).toBe('XUNG_CHI');
  });

  it('nâng thành thiên khắc địa xung khi Can ngày khắc Can năm sinh', () => {
    // Giáp Tý: Canh (Kim) khắc Giáp (Mộc), Ngọ xung Tý.
    const result = xetNamSinhVoiNgay(1984, {
      can: ThienCan.CANH,
      chi: DiaChi.NGO,
    });

    expect(result).toMatchObject({
      xung: true,
      mucDo: 'THIEN_KHAC_DIA_XUNG',
      canChiNamSinh: { can: ThienCan.GIAP, chi: DiaChi.TY },
    });
  });

  it('không coi Can khắc là đủ nếu Chi không xung', () => {
    const result = xetNamSinhVoiNgay(1984, {
      can: ThienCan.CANH,
      chi: DiaChi.MUI,
    });

    expect(result.xung).toBe(false);
    expect(result.mucDo).toBe('KHONG_XUNG');
  });
});
