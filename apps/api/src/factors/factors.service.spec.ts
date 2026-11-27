import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { DINH_NGHIA_YEU_TO_THEO_CHI_THANG } from './factor-definitions';
import { TinhYeuToNgayService } from './factors.service';

type OracleTheoThang = Readonly<Record<DiaChi, readonly DiaChi[]>>;

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;

const MA_YEU_TO_QUYEN_6 = [
  MaYeuTo.TAM_HOP,
  MaYeuTo.DICH_MA,
  MaYeuTo.KIEP_SAT,
  MaYeuTo.TAI_SAT,
  MaYeuTo.NGUYET_SAT,
  MaYeuTo.NGUYET_HINH,
  MaYeuTo.NGUYET_HAI,
  MaYeuTo.LUC_HOP,
  MaYeuTo.NGU_PHU,
  MaYeuTo.THIEN_THUONG,
  MaYeuTo.THIEN_TAC,
] as const;

type MaYeuToQuyen6 = (typeof MA_YEU_TO_QUYEN_6)[number];

// Oracle độc lập được chép từ bảng research đã đối chiếu Quyển 6 + Lập thành.
// Không derive từ production definitions hoặc helper production.
const ORACLE_THEO_YEU_TO: Readonly<Record<MaYeuToQuyen6, OracleTheoThang>> = {
  [MaYeuTo.TAM_HOP]: {
    [DAN]: [NGO, TUAT],
    [MAO]: [MUI, HOI],
    [THIN]: [TY, THAN],
    [TI]: [SUU, DAU],
    [NGO]: [DAN, TUAT],
    [MUI]: [MAO, HOI],
    [THAN]: [TY, THIN],
    [DAU]: [SUU, TI],
    [TUAT]: [DAN, NGO],
    [HOI]: [MAO, MUI],
    [TY]: [THIN, THAN],
    [SUU]: [TI, DAU],
  },
  [MaYeuTo.DICH_MA]: {
    [DAN]: [THAN],
    [MAO]: [TI],
    [THIN]: [DAN],
    [TI]: [HOI],
    [NGO]: [THAN],
    [MUI]: [TI],
    [THAN]: [DAN],
    [DAU]: [HOI],
    [TUAT]: [THAN],
    [HOI]: [TI],
    [TY]: [DAN],
    [SUU]: [HOI],
  },
  [MaYeuTo.KIEP_SAT]: {
    [DAN]: [HOI],
    [MAO]: [THAN],
    [THIN]: [TI],
    [TI]: [DAN],
    [NGO]: [HOI],
    [MUI]: [THAN],
    [THAN]: [TI],
    [DAU]: [DAN],
    [TUAT]: [HOI],
    [HOI]: [THAN],
    [TY]: [TI],
    [SUU]: [DAN],
  },
  [MaYeuTo.TAI_SAT]: {
    [DAN]: [TY],
    [MAO]: [DAU],
    [THIN]: [NGO],
    [TI]: [MAO],
    [NGO]: [TY],
    [MUI]: [DAU],
    [THAN]: [NGO],
    [DAU]: [MAO],
    [TUAT]: [TY],
    [HOI]: [DAU],
    [TY]: [NGO],
    [SUU]: [MAO],
  },
  [MaYeuTo.NGUYET_SAT]: {
    [DAN]: [SUU],
    [MAO]: [TUAT],
    [THIN]: [MUI],
    [TI]: [THIN],
    [NGO]: [SUU],
    [MUI]: [TUAT],
    [THAN]: [MUI],
    [DAU]: [THIN],
    [TUAT]: [SUU],
    [HOI]: [TUAT],
    [TY]: [MUI],
    [SUU]: [THIN],
  },
  [MaYeuTo.NGUYET_HINH]: {
    [DAN]: [TI],
    [MAO]: [TY],
    [THIN]: [THIN],
    [TI]: [THAN],
    [NGO]: [NGO],
    [MUI]: [SUU],
    [THAN]: [DAN],
    [DAU]: [DAU],
    [TUAT]: [MUI],
    [HOI]: [HOI],
    [TY]: [MAO],
    [SUU]: [TUAT],
  },
  [MaYeuTo.NGUYET_HAI]: {
    [DAN]: [TI],
    [MAO]: [THIN],
    [THIN]: [MAO],
    [TI]: [DAN],
    [NGO]: [SUU],
    [MUI]: [TY],
    [THAN]: [HOI],
    [DAU]: [TUAT],
    [TUAT]: [DAU],
    [HOI]: [THAN],
    [TY]: [MUI],
    [SUU]: [NGO],
  },
  [MaYeuTo.LUC_HOP]: {
    [DAN]: [HOI],
    [MAO]: [TUAT],
    [THIN]: [DAU],
    [TI]: [THAN],
    [NGO]: [MUI],
    [MUI]: [NGO],
    [THAN]: [TI],
    [DAU]: [THIN],
    [TUAT]: [MAO],
    [HOI]: [DAN],
    [TY]: [SUU],
    [SUU]: [TY],
  },
  [MaYeuTo.NGU_PHU]: {
    [DAN]: [HOI],
    [MAO]: [DAN],
    [THIN]: [TI],
    [TI]: [THAN],
    [NGO]: [HOI],
    [MUI]: [DAN],
    [THAN]: [TI],
    [DAU]: [THAN],
    [TUAT]: [HOI],
    [HOI]: [DAN],
    [TY]: [TI],
    [SUU]: [THAN],
  },
  [MaYeuTo.THIEN_THUONG]: {
    [DAN]: [DAN],
    [MAO]: [SUU],
    [THIN]: [TY],
    [TI]: [HOI],
    [NGO]: [TUAT],
    [MUI]: [DAU],
    [THAN]: [THAN],
    [DAU]: [MUI],
    [TUAT]: [NGO],
    [HOI]: [TI],
    [TY]: [THIN],
    [SUU]: [MAO],
  },
  [MaYeuTo.THIEN_TAC]: {
    [DAN]: [SUU],
    [MAO]: [TY],
    [THIN]: [HOI],
    [TI]: [TUAT],
    [NGO]: [DAU],
    [MUI]: [THAN],
    [THAN]: [MUI],
    [DAU]: [NGO],
    [TUAT]: [TI],
    [HOI]: [THIN],
    [TY]: [MAO],
    [SUU]: [DAN],
  },
};

describe('TinhYeuToNgayService — oracle Quyển 6', () => {
  const service = new TinhYeuToNgayService();

  for (const ma of MA_YEU_TO_QUYEN_6) {
    const oracle = ORACLE_THEO_YEU_TO[ma];

    describe(ma, () => {
      for (const chiThang of DIA_CHI_THEO_THU_TU) {
        const chiNgayMongDoi = oracle[chiThang];

        for (const chiNgay of DIA_CHI_THEO_THU_TU) {
          const nenCo = chiNgayMongDoi.includes(chiNgay);

          it(`${chiThang} / ${chiNgay}: ${nenCo ? 'co' : 'khong co'} ${ma}`, () => {
            const ketQua = service.tinh({
              chiThang,
              chiNgay,
              canNgay: ThienCan.GIAP,
            });
            const coYeuTo = ketQua.some((yeuTo) => yeuTo.ma === ma);

            expect(coYeuTo).toBe(nenCo);
          });
        }
      }
    });
  }
});

describe('Factor provenance', () => {
  it('moi definition deu co ban Viet va Han ban da xac minh', () => {
    for (const dinhNghia of DINH_NGHIA_YEU_TO_THEO_CHI_THANG) {
      const loaiNguon = new Set(dinhNghia.nguon.map((nguon) => nguon.loaiNguon));

      expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
      expect(dinhNghia.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });

  it('giu alias hop le va khong dua alias bi sach bac vao production', () => {
    const theoMa = new Map(
      DINH_NGHIA_YEU_TO_THEO_CHI_THANG.map((dinhNghia) => [dinhNghia.ma, dinhNghia]),
    );

    expect(theoMa.get(MaYeuTo.DICH_MA)?.tenKhac).toContain('Thiên Hậu');
    expect(theoMa.get(MaYeuTo.TAI_SAT)?.tenKhac).toContain('Thiên Hỏa');
    expect(theoMa.get(MaYeuTo.NGUYET_SAT)?.tenKhac).toContain('Nguyệt Hư');

    const tatCaTenKhac = DINH_NGHIA_YEU_TO_THEO_CHI_THANG.flatMap((dinhNghia) => dinhNghia.tenKhac);

    expect(tatCaTenKhac).not.toContain('Thiên Ngục');
    expect(tatCaTenKhac).not.toContain('Vô Kiều');
  });

  it('registry chi chua canonical factor da research trong batch nay', () => {
    expect(DINH_NGHIA_YEU_TO_THEO_CHI_THANG.map((dinhNghia) => dinhNghia.ma)).toEqual(
      MA_YEU_TO_QUYEN_6,
    );
  });
});
