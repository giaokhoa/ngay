import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_YEU_TO_THEO_CAN_NGAY } from './monthly-stem-factor-definitions';

type OracleCanTheoThang = Readonly<Partial<Record<DiaChi, ThienCan>>>;

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

const MA_YEU_TO_QUYEN_5_THEO_CAN = [
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.NGUYET_KHONG,
  MaYeuTo.NGUYET_AN,
] as const;

type MaYeuToQuyen5TheoCan = (typeof MA_YEU_TO_QUYEN_5_THEO_CAN)[number];

// Oracle độc lập chép từ Quyển 5 / Nguyệt biểu.
// Không import production lookup để tạo expected.
const ORACLE_THEO_YEU_TO: Readonly<Record<MaYeuToQuyen5TheoCan, OracleCanTheoThang>> = {
  [MaYeuTo.NGUYET_DUC]: {
    [DAN]: BINH,
    [MAO]: GIAP,
    [THIN]: NHAM,
    [TI]: CANH,
    [NGO]: BINH,
    [MUI]: GIAP,
    [THAN]: NHAM,
    [DAU]: CANH,
    [TUAT]: BINH,
    [HOI]: GIAP,
    [TY]: NHAM,
    [SUU]: CANH,
  },
  [MaYeuTo.THIEN_DUC_HOP]: {
    [DAN]: NHAM,
    [THIN]: DINH,
    [TI]: BINH,
    [MUI]: KY,
    [THAN]: MAU,
    [TUAT]: TAN,
    [HOI]: CANH,
    [SUU]: AT,
  },
  [MaYeuTo.NGUYET_DUC_HOP]: {
    [DAN]: TAN,
    [MAO]: KY,
    [THIN]: DINH,
    [TI]: AT,
    [NGO]: TAN,
    [MUI]: KY,
    [THAN]: DINH,
    [DAU]: AT,
    [TUAT]: TAN,
    [HOI]: KY,
    [TY]: DINH,
    [SUU]: AT,
  },
  [MaYeuTo.NGUYET_KHONG]: {
    [DAN]: NHAM,
    [MAO]: CANH,
    [THIN]: BINH,
    [TI]: GIAP,
    [NGO]: NHAM,
    [MUI]: CANH,
    [THAN]: BINH,
    [DAU]: GIAP,
    [TUAT]: NHAM,
    [HOI]: CANH,
    [TY]: BINH,
    [SUU]: GIAP,
  },
  [MaYeuTo.NGUYET_AN]: {
    [DAN]: BINH,
    [MAO]: DINH,
    [THIN]: CANH,
    [TI]: KY,
    [NGO]: MAU,
    [MUI]: TAN,
    [THAN]: NHAM,
    [DAU]: QUY,
    [TUAT]: CANH,
    [HOI]: AT,
    [TY]: GIAP,
    [SUU]: TAN,
  },
};

describe('TinhYeuToNgayService — oracle Quyển 5 theo Can ngày', () => {
  const service = new TinhYeuToNgayService();

  for (const ma of MA_YEU_TO_QUYEN_5_THEO_CAN) {
    const oracle = ORACLE_THEO_YEU_TO[ma];

    describe(ma, () => {
      for (const chiThang of DIA_CHI_THEO_THU_TU) {
        const canMongDoi = oracle[chiThang];

        for (const canNgay of THIEN_CAN_THEO_THU_TU) {
          const nenCo = canMongDoi === canNgay;

          it(`${chiThang} / ${canNgay}: ${nenCo ? 'co' : 'khong co'} ${ma}`, () => {
            const ketQua = service.tinh({
              chiThang,
              canNgay,
              chiNgay: DiaChi.TY,
              dangThoVuong: false,
            });
            const coYeuTo = ketQua.some((yeuTo) => yeuTo.ma === ma);

            expect(coYeuTo).toBe(nenCo);
          });
        }
      }
    });
  }
});

describe('Quyển 5 monthly-stem provenance', () => {
  it('moi definition deu co ban Viet va Han ban da xac minh', () => {
    for (const dinhNghia of DINH_NGHIA_YEU_TO_THEO_CAN_NGAY) {
      const loaiNguon = new Set(dinhNghia.nguon.map((nguon) => nguon.loaiNguon));

      expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
      expect(dinhNghia.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });

  it('registry chi chua factor trong batch da VERIFIED', () => {
    expect(DINH_NGHIA_YEU_TO_THEO_CAN_NGAY.map((dinhNghia) => dinhNghia.ma)).toEqual(
      MA_YEU_TO_QUYEN_5_THEO_CAN,
    );
  });

  it('Thien Duc Hop khong tao ngay hop cho bon thang trong', () => {
    const thienDucHop = DINH_NGHIA_YEU_TO_THEO_CAN_NGAY.find(
      (dinhNghia) => dinhNghia.ma === MaYeuTo.THIEN_DUC_HOP,
    );

    expect(thienDucHop).toBeDefined();

    for (const chiThang of [DiaChi.MAO, DiaChi.NGO, DiaChi.DAU, DiaChi.TY]) {
      expect(thienDucHop?.canNgayTheoChiThang[chiThang]).toBeUndefined();
    }
  });
});
