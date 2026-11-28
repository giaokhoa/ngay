import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import {
  DINH_NGHIA_DOAN_TINH,
  DINH_NGHIA_TRUONG_TINH,
  NGAY_DOAN_TINH_THEO_CHI_THANG,
  NGAY_TRUONG_TINH_THEO_CHI_THANG,
} from './q9-long-short-star-definitions';

const service = new TinhYeuToNgayService();
const ORACLE_TRUONG: Readonly<Record<DiaChi, readonly number[]>> = {
  DAN: [7],
  MAO: [4],
  THIN: [1],
  TI: [9],
  NGO: [15],
  MUI: [10],
  THAN: [8],
  DAU: [2, 5],
  TUAT: [3, 4],
  HOI: [1],
  TY: [12],
  SUU: [9],
};
const ORACLE_DOAN: Readonly<Record<DiaChi, readonly number[]>> = {
  DAN: [21],
  MAO: [19],
  THIN: [16],
  TI: [25],
  NGO: [25],
  MUI: [20],
  THAN: [22],
  DAU: [18, 19],
  TUAT: [16, 17],
  HOI: [14],
  TY: [22],
  SUU: [25],
};

describe('Q9 Trường Tinh / Đoản Tinh', () => {
  it('khớp exact WYG_009-33b cho đủ 12 tháng tiết khí', () => {
    expect(NGAY_TRUONG_TINH_THEO_CHI_THANG).toEqual(ORACLE_TRUONG);
    expect(NGAY_DOAN_TINH_THEO_CHI_THANG).toEqual(ORACLE_DOAN);
  });

  it('giữ provenance Hán Q9 verified, không giả Việt exact khi Tập II chưa materialized', () => {
    for (const def of [DINH_NGHIA_TRUONG_TINH, DINH_NGHIA_DOAN_TINH]) {
      expect(def.nguon.every((source) => source.daXacMinh)).toBe(true);
      expect(new Set(def.nguon.map((source) => source.loaiNguon))).toEqual(
        new Set([LoaiNguon.HAN_BAN]),
      );
    }
  });

  it('FactorsService emits exactly by chiThang + lunar day number', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      for (let ngayAmTrongThang = 1; ngayAmTrongThang <= 30; ngayAmTrongThang += 1) {
        const codes = service
          .tinh({
            chiThang,
            canNgay: ThienCan.GIAP,
            chiNgay: DiaChi.TY,
            dangThoVuong: false,
            ngayAmTrongThang,
          })
          .map((item) => item.ma);
        expect(codes.includes(MaYeuTo.TRUONG_TINH)).toBe(
          ORACLE_TRUONG[chiThang].includes(ngayAmTrongThang),
        );
        expect(codes.includes(MaYeuTo.DOAN_TINH)).toBe(
          ORACLE_DOAN[chiThang].includes(ngayAmTrongThang),
        );
      }
    }
  });
});
