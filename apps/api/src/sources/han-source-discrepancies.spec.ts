import { describe, expect, it } from 'vitest';

import { SAI_KHAC_NGUON_HAN, laySaiKhacNguonHan } from './han-source-discrepancies';

describe('Hán source discrepancy registry', () => {
  it('uses unique stable IDs', () => {
    const ids = SAI_KHAC_NGUON_HAN.map((item) => item.ma);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('pins every discrepancy to a book and Hán anchor', () => {
    for (const item of SAI_KHAC_NGUON_HAN) {
      expect(item.quyen).toBeGreaterThan(0);
      expect(item.muc.length).toBeGreaterThan(0);
      expect(item.anchorHan).toContain('KR3g0051_WYG_');
      expect(item.chinhSachProduction.length).toBeGreaterThan(0);
    }
  });

  it('registers the known Q11 月厭 discrepancy explicitly', () => {
    expect(laySaiKhacNguonHan('Q11_XUAT_HANH_NGUYET_YEM')).toMatchObject({
      loai: 'VIET_HAN_NOI_DUNG',
      quyen: 11,
      muc: '行幸遣使〈出行同〉',
    });
  });

  it('registers source/transcription corrections instead of silently normalizing them', () => {
    expect(new Set(SAI_KHAC_NGUON_HAN.map((item) => item.loai))).toEqual(
      new Set(['VIET_HAN_NOI_DUNG', 'TRUYEN_BAN', 'TRANSCRIPTION_GLYPH', 'SOURCE_CORRECTION']),
    );
  });
});
