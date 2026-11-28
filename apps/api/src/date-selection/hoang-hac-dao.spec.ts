import { describe, expect, it } from 'vitest';

import { LoaiCongViec } from '../activities/activity-rule';
import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { tinhThapNhiTruc } from '../calendar/twelve-officer';
import {
  hacDaoKyViec,
  tinhDauGioThamKhao,
  tinhDauThanGio,
  tinhThanGio,
  tinhThanNgay,
} from './hoang-hac-dao';

describe('Hán oracle — 黃道黑道, WYG 007-7b..12a', () => {
  it.each([
    [DiaChi.DAN, DiaChi.TY],
    [DiaChi.THAN, DiaChi.TY],
    [DiaChi.MAO, DiaChi.DAN],
    [DiaChi.DAU, DiaChi.DAN],
    [DiaChi.THIN, DiaChi.THIN],
    [DiaChi.TUAT, DiaChi.THIN],
    [DiaChi.TI, DiaChi.NGO],
    [DiaChi.HOI, DiaChi.NGO],
    [DiaChi.TY, DiaChi.THAN],
    [DiaChi.NGO, DiaChi.THAN],
    [DiaChi.SUU, DiaChi.TUAT],
    [DiaChi.MUI, DiaChi.TUAT],
  ])('%s tháng khởi Thanh Long ở ngày %s', (thang, ngay) => {
    expect(tinhThanNgay(thang, ngay)).toMatchObject({
      ma: 'THANH_LONG',
      loai: 'HOANG_DAO',
    });
  });

  it('follows the exact 12-shen Q7 order with 6 Hoàng/6 Hắc in every month', () => {
    const expected = [
      'THANH_LONG',
      'MINH_DUONG',
      'THIEN_HINH',
      'CHU_TUOC',
      'KIM_QUY',
      'BAO_QUANG',
      'BACH_HO',
      'NGOC_DUONG',
      'THIEN_LAO',
      'HUYEN_VU',
      'TU_MENH',
      'CAU_TRAN',
    ];
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      const than = DIA_CHI_THEO_THU_TU.map((chiNgay) => tinhThanNgay(chiThang, chiNgay));
      const start = than.findIndex((item) => item.ma === 'THANH_LONG');
      expect([...than.slice(start), ...than.slice(0, start)].map((item) => item.ma)).toEqual(
        expected,
      );
      expect(than.filter((item) => item.loai === 'HOANG_DAO')).toHaveLength(6);
      expect(than.filter((item) => item.loai === 'HAC_DAO')).toHaveLength(6);
    }
  });

  it('không đồng nhất 黃黑道十二神 với 建除十二神 như Q7 WYG_007-8b đã bác', () => {
    // Tháng Dần: ngày Mão là Trực Trừ nhưng thần Q7 lại là Chu Tước Hắc đạo.
    expect(tinhThapNhiTruc(DiaChi.DAN, DiaChi.MAO)).toBe(ThapNhiTruc.TRU);
    expect(tinhThanNgay(DiaChi.DAN, DiaChi.MAO)).toMatchObject({
      ma: 'CHU_TUOC',
      loai: 'HAC_DAO',
    });

    // Cũng tháng Dần: ngày Thìn là Trực Mãn nhưng thần Q7 là Kim Quỹ Hoàng đạo.
    expect(tinhThapNhiTruc(DiaChi.DAN, DiaChi.THIN)).toBe(ThapNhiTruc.MAN);
    expect(tinhThanNgay(DiaChi.DAN, DiaChi.THIN)).toMatchObject({
      ma: 'KIM_QUY',
      loai: 'HOANG_DAO',
    });
  });

  it('甲子 day uses Q32 hour-table shen order (申青龍 酉明堂 ...)', () => {
    const map = Object.fromEntries(
      DIA_CHI_THEO_THU_TU.map((chiGio) => [chiGio, tinhThanGio(DiaChi.TY, chiGio).ma]),
    );
    expect(map).toEqual({
      [DiaChi.TY]: 'KIM_QUY',
      [DiaChi.SUU]: 'BAO_QUANG',
      [DiaChi.DAN]: 'BACH_HO',
      [DiaChi.MAO]: 'NGOC_DUONG',
      [DiaChi.THIN]: 'THIEN_LAO',
      [DiaChi.TI]: 'HUYEN_VU',
      [DiaChi.NGO]: 'TU_MENH',
      [DiaChi.MUI]: 'CAU_TRAN',
      [DiaChi.THAN]: 'THANH_LONG',
      [DiaChi.DAU]: 'MINH_DUONG',
      [DiaChi.TUAT]: 'THIEN_HINH',
      [DiaChi.HOI]: 'CHU_TUOC',
    });
  });

  it('Hắc đạo blocks only the five explicitly named activity types in Q7', () => {
    const hac = tinhThanNgay(DiaChi.DAN, DiaChi.DAN); // Thiên Hình
    expect(hac.loai).toBe('HAC_DAO');

    for (const activity of Object.values(LoaiCongViec)) {
      expect(hacDaoKyViec(hac, activity)).toBe(
        [
          LoaiCongViec.CUOI_HOI,
          LoaiCongViec.DI_CHUYEN,
          LoaiCongViec.DONG_THO,
          LoaiCongViec.SUA_CUNG_THAT,
          LoaiCongViec.XUAT_HANH,
        ].includes(activity),
      );
    }
    expect(hacDaoKyViec(tinhThanNgay(DiaChi.DAN, DiaChi.TY), LoaiCongViec.CUOI_HOI)).toBe(false);
  });
});

describe('Hán oracle — Q7 Thiên Quan/Phúc Tinh/Hỷ Thần/Bát Lộc', () => {
  it('甲日: 酉官, 寅福星 + 喜神 + 八祿', () => {
    expect(tinhDauThanGio(ThienCan.GIAP, DiaChi.DAU)).toEqual(['THIEN_QUAN']);
    expect(tinhDauThanGio(ThienCan.GIAP, DiaChi.DAN)).toEqual(['PHUC_TINH', 'HY_THAN', 'BAT_LOC']);
  });
  it('乙日: 申官, 丑/亥福星, 戌喜神, 卯祿', () => {
    expect(tinhDauThanGio(ThienCan.AT, DiaChi.THAN)).toEqual(['THIEN_QUAN']);
    expect(tinhDauThanGio(ThienCan.AT, DiaChi.SUU)).toEqual(['PHUC_TINH']);
    expect(tinhDauThanGio(ThienCan.AT, DiaChi.HOI)).toEqual(['PHUC_TINH']);
    expect(tinhDauThanGio(ThienCan.AT, DiaChi.TUAT)).toEqual(['HY_THAN']);
    expect(tinhDauThanGio(ThienCan.AT, DiaChi.MAO)).toEqual(['BAT_LOC']);
  });
  it('壬日 has 官 at 丑 and 未, 福星 at 辰, 喜神 at 午, 八祿 at 亥', () => {
    expect(tinhDauThanGio(ThienCan.NHAM, DiaChi.SUU)).toContain('THIEN_QUAN');
    expect(tinhDauThanGio(ThienCan.NHAM, DiaChi.MUI)).toContain('THIEN_QUAN');
    expect(tinhDauThanGio(ThienCan.NHAM, DiaChi.THIN)).toContain('PHUC_TINH');
    expect(tinhDauThanGio(ThienCan.NHAM, DiaChi.NGO)).toContain('HY_THAN');
    expect(tinhDauThanGio(ThienCan.NHAM, DiaChi.HOI)).toContain('BAT_LOC');
  });
});

describe('Hán oracle — Q7 Tuần Không / Triệt Lộ Không', () => {
  it('甲子: 戌亥旬空, 申酉截路空', () => {
    const canChiNgay = { can: ThienCan.GIAP, chi: DiaChi.TY };
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.THAN)).toEqual(['TRIET_LO_KHONG']);
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.DAU)).toEqual(['TRIET_LO_KHONG']);
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.TUAT)).toEqual(['TUAN_KHONG']);
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.HOI)).toEqual(['TUAN_KHONG']);
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.NGO)).toEqual([]);
  });

  it('甲辰: 寅卯旬空, 申酉截路空 theo bảng 60 ngày', () => {
    const canChiNgay = { can: ThienCan.GIAP, chi: DiaChi.THIN };
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.DAN)).toEqual(['TUAN_KHONG']);
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.MAO)).toEqual(['TUAN_KHONG']);
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.THAN)).toEqual(['TRIET_LO_KHONG']);
    expect(tinhDauGioThamKhao(canChiNgay, DiaChi.DAU)).toEqual(['TRIET_LO_KHONG']);
  });

  it('戊子: 午未旬空; 子丑戌亥截路空', () => {
    const canChiNgay = { can: ThienCan.MAU, chi: DiaChi.TY };
    for (const chi of [DiaChi.NGO, DiaChi.MUI]) {
      expect(tinhDauGioThamKhao(canChiNgay, chi)).toContain('TUAN_KHONG');
    }
    for (const chi of [DiaChi.TY, DiaChi.SUU, DiaChi.TUAT, DiaChi.HOI]) {
      expect(tinhDauGioThamKhao(canChiNgay, chi)).toContain('TRIET_LO_KHONG');
    }
  });
});
