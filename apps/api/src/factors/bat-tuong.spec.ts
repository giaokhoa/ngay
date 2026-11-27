import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { LoaiNguon } from '../sources/source-reference';
import { DINH_NGHIA_BAT_TUONG } from './bat-tuong-definition';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

const VONG_60_CAN_CHI: readonly CanChi[] = Array.from({ length: 60 }, (_, chiSo) => ({
  can: THIEN_CAN_THEO_THU_TU[chiSo % 10]!,
  chi: DIA_CHI_THEO_THU_TU[chiSo % 12]!,
}));

// Oracle độc lập chép từ Lịch lệ Âm Dương Bất Tương, Quyển 4.
// Không derive từ DINH_NGHIA_BAT_TUONG.
const ORACLE_BAT_TUONG: Readonly<Record<DiaChi, ReadonlySet<string>>> = {
  [DAN]: tap(
    [TAN, HOI],
    [TAN, SUU],
    [TAN, MAO],
    [CANH, TY],
    [CANH, DAN],
    [KY, HOI],
    [KY, SUU],
    [KY, MAO],
    [DINH, HOI],
    [DINH, SUU],
    [DINH, MAO],
    [BINH, TY],
    [BINH, DAN],
  ),
  [MAO]: tap(
    [CANH, TUAT],
    [CANH, TY],
    [CANH, DAN],
    [KY, HOI],
    [KY, SUU],
    [DINH, HOI],
    [DINH, SUU],
    [BINH, TUAT],
    [BINH, TY],
    [BINH, DAN],
    [AT, HOI],
    [AT, SUU],
  ),
  [THIN]: tap(
    [KY, DAU],
    [KY, HOI],
    [KY, SUU],
    [DINH, DAU],
    [DINH, HOI],
    [DINH, SUU],
    [BINH, TUAT],
    [BINH, TY],
    [AT, DAU],
    [AT, HOI],
    [AT, SUU],
    [GIAP, TUAT],
    [GIAP, TY],
  ),
  [TI]: tap(
    [DINH, DAU],
    [DINH, HOI],
    [BINH, THAN],
    [BINH, TUAT],
    [BINH, TY],
    [AT, DAU],
    [AT, HOI],
    [GIAP, THAN],
    [GIAP, TUAT],
    [GIAP, TY],
    [MAU, THAN],
    [MAU, TUAT],
    [MAU, TY],
  ),
  [NGO]: tap(
    [BINH, THAN],
    [BINH, TUAT],
    [AT, MUI],
    [AT, DAU],
    [AT, HOI],
    [GIAP, THAN],
    [GIAP, TUAT],
    [MAU, THAN],
    [MAU, TUAT],
    [QUY, MUI],
    [QUY, DAU],
    [QUY, HOI],
  ),
  [MUI]: tap(
    [AT, MUI],
    [AT, DAU],
    [GIAP, NGO],
    [GIAP, THAN],
    [GIAP, TUAT],
    [MAU, NGO],
    [MAU, THAN],
    [MAU, TUAT],
    [QUY, MUI],
    [QUY, DAU],
    [NHAM, NGO],
    [NHAM, THAN],
    [NHAM, TUAT],
  ),
  [THAN]: tap(
    [AT, TI],
    [AT, MUI],
    [AT, DAU],
    [GIAP, NGO],
    [GIAP, THAN],
    [MAU, NGO],
    [MAU, THAN],
    [QUY, TI],
    [QUY, MUI],
    [QUY, DAU],
    [NHAM, NGO],
    [NHAM, THAN],
  ),
  [DAU]: tap(
    [GIAP, THIN],
    [GIAP, NGO],
    [GIAP, THAN],
    [MAU, THIN],
    [MAU, NGO],
    [MAU, THAN],
    [QUY, TI],
    [QUY, MUI],
    [NHAM, THIN],
    [NHAM, NGO],
    [NHAM, THAN],
    [TAN, TI],
    [TAN, MUI],
    [CANH, THIN],
    [CANH, NGO],
  ),
  [TUAT]: tap(
    [MAU, THIN],
    [MAU, NGO],
    [QUY, MAO],
    [QUY, TI],
    [QUY, MUI],
    [NHAM, THIN],
    [NHAM, NGO],
    [TAN, MAO],
    [TAN, TI],
    [TAN, MUI],
    [CANH, THIN],
    [CANH, NGO],
  ),
  [HOI]: tap(
    [QUY, MAO],
    [QUY, TI],
    [NHAM, DAN],
    [NHAM, THIN],
    [NHAM, NGO],
    [TAN, MAO],
    [TAN, TI],
    [CANH, DAN],
    [CANH, THIN],
    [CANH, NGO],
    [KY, MAO],
    [KY, TI],
  ),
  [TY]: tap(
    [NHAM, DAN],
    [NHAM, THIN],
    [TAN, SUU],
    [TAN, MAO],
    [TAN, TI],
    [CANH, DAN],
    [CANH, THIN],
    [KY, SUU],
    [KY, MAO],
    [KY, TI],
    [DINH, SUU],
    [DINH, MAO],
    [DINH, TI],
  ),
  [SUU]: tap(
    [TAN, SUU],
    [TAN, MAO],
    [CANH, TY],
    [CANH, DAN],
    [CANH, THIN],
    [KY, SUU],
    [KY, MAO],
    [DINH, SUU],
    [DINH, MAO],
    [BINH, TY],
    [BINH, DAN],
    [BINH, THIN],
  ),
};

describe('Bất Tương — oracle 12 tháng x 60 Can Chi', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const oracle = ORACLE_BAT_TUONG[chiThang];

    for (const canChi of VONG_60_CAN_CHI) {
      const nenCo = oracle.has(khoa(canChi.can, canChi.chi));

      it(`${chiThang} / ${canChi.can} ${canChi.chi}: ${nenCo ? 'co' : 'khong co'}`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.BAT_TUONG)).toBe(nenCo);
      });
    }
  }
});

describe('Bất Tương — provenance và table integrity', () => {
  it('có bản Việt và Hán bản đã xác minh', () => {
    const loaiNguon = new Set(DINH_NGHIA_BAT_TUONG.nguon.map((nguon) => nguon.loaiNguon));

    expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
    expect(DINH_NGHIA_BAT_TUONG.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
  });

  it('mỗi tháng chỉ chứa Can Chi hợp lệ trong vòng 60', () => {
    const vong60 = new Set(VONG_60_CAN_CHI.map((canChi) => khoa(canChi.can, canChi.chi)));

    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      for (const canChi of DINH_NGHIA_BAT_TUONG.tapCanChiNgayTheoChiThang[chiThang]) {
        expect(vong60.has(khoa(canChi.can, canChi.chi))).toBe(true);
      }
    }
  });

  it('tháng Thìn giữ Ất Dậu theo bảng nguồn', () => {
    expect(ORACLE_BAT_TUONG[THIN].has(khoa(AT, DAU))).toBe(true);
    expect(
      DINH_NGHIA_BAT_TUONG.tapCanChiNgayTheoChiThang[THIN].some(
        (canChi) => canChi.can === AT && canChi.chi === DAU,
      ),
    ).toBe(true);
  });
});

function tap(...canChi: readonly [ThienCan, DiaChi][]): ReadonlySet<string> {
  return new Set(canChi.map(([can, chi]) => khoa(can, chi)));
}

function khoa(can: ThienCan, chi: DiaChi): string {
  return `${can}:${chi}`;
}
