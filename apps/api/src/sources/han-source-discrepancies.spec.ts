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

  it('registers exact Tập II omissions and the Q36 TOC typo', () => {
    expect(laySaiKhacNguonHan('Q34_THOI_KHAC_PHUONG_VI_DO_OMITTED')).toMatchObject({
      loai: 'VIET_HAN_NOI_DUNG',
      quyen: 34,
      muc: '時刻方位圖',
    });
    expect(laySaiKhacNguonHan('Q35_QIMEN_SANYUAN_OMITTED')).toMatchObject({
      loai: 'VIET_HAN_NOI_DUNG',
      quyen: 35,
      muc: '竒門三元',
    });
    expect(laySaiKhacNguonHan('Q36_LUC_DAO_TOC_THIEN_DAO')).toMatchObject({
      loai: 'VIET_TOC_TIEU_DE',
      quyen: 36,
      muc: '六道',
    });
  });

  it('source-locks the three 己→巳 annual-table transcription errors with exact Việt rows', () => {
    expect(
      SAI_KHAC_NGUON_HAN.filter((item) => /Q1[567]_KY_/.test(item.ma)).map((item) => item.quyen),
    ).toEqual([15, 16, 17]);
  });

  it('registers source/transcription corrections instead of silently normalizing them', () => {
    expect(new Set(SAI_KHAC_NGUON_HAN.map((item) => item.loai))).toEqual(
      new Set([
        'VIET_HAN_NOI_DUNG',
        'VIET_TOC_TIEU_DE',
        'TRUYEN_BAN',
        'TRANSCRIPTION_GLYPH',
        'SOURCE_CORRECTION',
      ]),
    );
  });
});
