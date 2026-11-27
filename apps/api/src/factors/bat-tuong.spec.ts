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

// Oracle độc lập chép lại từ bảng Lịch lệ Quyển 4, trang in 357-358.
// Không import production table để tạo expected.
const ORACLE: Readonly<Record<DiaChi, ReadonlySet<string>>> = {
  [DAN]: tap(
    k(TAN, HOI),
    k(TAN, SUU),
    k(TAN, MAO),
    k(CANH, TY),
    k(CANH, DAN),
    k(KY, HOI),
    k(KY, SUU),
    k(KY, MAO),
    k(DINH, HOI),
    k(DINH, SUU),
    k(DINH, MAO),
    k(BINH, TY),
    k(BINH, DAN),
  ),
  [MAO]: tap(
    k(CANH, TUAT),
    k(CANH, TY),
    k(CANH, DAN),
    k(KY, HOI),
    k(KY, SUU),
    k(DINH, HOI),
    k(DINH, SUU),
    k(BINH, TUAT),
    k(BINH, TY),
    k(BINH, DAN),
    k(AT, HOI),
    k(AT, SUU),
  ),
  [THIN]: tap(
    k(KY, DAU),
    k(KY, HOI),
    k(KY, SUU),
    k(DINH, DAU),
    k(DINH, HOI),
    k(DINH, SUU),
    k(BINH, TUAT),
    k(BINH, TY),
    k(AT, DAU),
    k(AT, HOI),
    k(AT, SUU),
    k(GIAP, TUAT),
    k(GIAP, TY),
  ),
  [TI]: tap(
    k(DINH, DAU),
    k(DINH, HOI),
    k(BINH, THAN),
    k(BINH, TUAT),
    k(BINH, TY),
    k(AT, DAU),
    k(AT, HOI),
    k(GIAP, THAN),
    k(GIAP, TUAT),
    k(GIAP, TY),
    k(MAU, THAN),
    k(MAU, TUAT),
    k(MAU, TY),
  ),
  [NGO]: tap(
    k(BINH, THAN),
    k(BINH, TUAT),
    k(AT, MUI),
    k(AT, DAU),
    k(AT, HOI),
    k(GIAP, THAN),
    k(GIAP, TUAT),
    k(MAU, THAN),
    k(MAU, TUAT),
    k(QUY, MUI),
    k(QUY, DAU),
    k(QUY, HOI),
  ),
  [MUI]: tap(
    k(AT, MUI),
    k(AT, DAU),
    k(GIAP, NGO),
    k(GIAP, THAN),
    k(GIAP, TUAT),
    k(MAU, NGO),
    k(MAU, THAN),
    k(MAU, TUAT),
    k(QUY, MUI),
    k(QUY, DAU),
    k(NHAM, NGO),
    k(NHAM, THAN),
    k(NHAM, TUAT),
  ),
  [THAN]: tap(
    k(AT, TI),
    k(AT, MUI),
    k(AT, DAU),
    k(GIAP, NGO),
    k(GIAP, THAN),
    k(MAU, NGO),
    k(MAU, THAN),
    k(QUY, TI),
    k(QUY, MUI),
    k(QUY, DAU),
    k(NHAM, NGO),
    k(NHAM, THAN),
  ),
  [DAU]: tap(
    k(GIAP, THIN),
    k(GIAP, NGO),
    k(GIAP, THAN),
    k(MAU, THIN),
    k(MAU, NGO),
    k(MAU, THAN),
    k(QUY, TI),
    k(QUY, MUI),
    k(NHAM, THIN),
    k(NHAM, NGO),
    k(NHAM, THAN),
    k(TAN, TI),
    k(TAN, MUI),
    k(CANH, THIN),
    k(CANH, NGO),
  ),
  [TUAT]: tap(
    k(MAU, THIN),
    k(MAU, NGO),
    k(QUY, MAO),
    k(QUY, TI),
    k(QUY, MUI),
    k(NHAM, THIN),
    k(NHAM, NGO),
    k(TAN, MAO),
    k(TAN, TI),
    k(TAN, MUI),
    k(CANH, THIN),
    k(CANH, NGO),
  ),
  [HOI]: tap(
    k(QUY, MAO),
    k(QUY, TI),
    k(NHAM, DAN),
    k(NHAM, THIN),
    k(NHAM, NGO),
    k(TAN, MAO),
    k(TAN, TI),
    k(CANH, DAN),
    k(CANH, THIN),
    k(CANH, NGO),
    k(KY, MAO),
    k(KY, TI),
  ),
  [TY]: tap(
    k(NHAM, DAN),
    k(NHAM, THIN),
    k(TAN, SUU),
    k(TAN, MAO),
    k(TAN, TI),
    k(CANH, DAN),
    k(CANH, THIN),
    k(KY, SUU),
    k(KY, MAO),
    k(KY, TI),
    k(DINH, SUU),
    k(DINH, MAO),
    k(DINH, TI),
  ),
  [SUU]: tap(
    k(TAN, SUU),
    k(TAN, MAO),
    k(CANH, TY),
    k(CANH, DAN),
    k(CANH, THIN),
    k(KY, SUU),
    k(KY, MAO),
    k(DINH, SUU),
    k(DINH, MAO),
    k(BINH, TY),
    k(BINH, DAN),
    k(BINH, THIN),
  ),
};

const SO_LUONG_MONG_DOI: Readonly<Record<DiaChi, number>> = {
  [DAN]: 13,
  [MAO]: 12,
  [THIN]: 13,
  [TI]: 13,
  [NGO]: 12,
  [MUI]: 13,
  [THAN]: 12,
  [DAU]: 15,
  [TUAT]: 12,
  [HOI]: 12,
  [TY]: 13,
  [SUU]: 12,
};

describe('Bất Tương — oracle 12 tháng × 60 Can Chi', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    it(`khớp toàn bộ tháng ${chiThang}`, () => {
      for (const canChi of VONG_60_CAN_CHI) {
        const nenCo = ORACLE[chiThang].has(k(canChi.can, canChi.chi));
        const ketQua = service.tinh({
          chiThang,
          canNgay: canChi.can,
          chiNgay: canChi.chi,
        });

        expect(
          ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.BAT_TUONG),
          `${chiThang} / ${canChi.can} ${canChi.chi}`,
        ).toBe(nenCo);
      }
    });
  }
});

describe('Bất Tương — integrity', () => {
  it('số lượng từng tháng khớp bảng nguồn', () => {
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      expect(ORACLE[chiThang].size).toBe(SO_LUONG_MONG_DOI[chiThang]);
      expect(DINH_NGHIA_BAT_TUONG.tapCanChiNgayTheoChiThang[chiThang]).toHaveLength(
        SO_LUONG_MONG_DOI[chiThang],
      );
    }
  });

  it('production table không có Can Chi trùng hoặc ngoài vòng 60', () => {
    const hopLe = new Set(VONG_60_CAN_CHI.map((canChi) => k(canChi.can, canChi.chi)));

    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      const danhSach = DINH_NGHIA_BAT_TUONG.tapCanChiNgayTheoChiThang[chiThang];
      const khoa = danhSach.map((canChi) => k(canChi.can, canChi.chi));

      expect(new Set(khoa).size).toBe(khoa.length);
      expect(khoa.every((giaTri) => hopLe.has(giaTri))).toBe(true);
    }
  });

  it('có provenance Việt và Hán đã xác minh', () => {
    const loaiNguon = new Set(DINH_NGHIA_BAT_TUONG.nguon.map((nguon) => nguon.loaiNguon));

    expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
    expect(DINH_NGHIA_BAT_TUONG.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
  });
});

function tap(...giaTri: string[]): ReadonlySet<string> {
  return new Set(giaTri);
}

function k(can: ThienCan, chi: DiaChi): string {
  return `${can}_${chi}`;
}
