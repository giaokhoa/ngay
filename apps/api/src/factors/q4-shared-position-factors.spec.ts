import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import {
  DINH_NGHIA_YEU_TO_QUAN_HE_THANG_QUYEN_4,
  DINH_NGHIA_YEU_TO_THEO_TRUC,
} from './q4-shared-position-definitions';

const CHI_THEO_THU_TU = [
  DiaChi.TY,
  DiaChi.SUU,
  DiaChi.DAN,
  DiaChi.MAO,
  DiaChi.THIN,
  DiaChi.TI,
  DiaChi.NGO,
  DiaChi.MUI,
  DiaChi.THAN,
  DiaChi.DAU,
  DiaChi.TUAT,
  DiaChi.HOI,
] as const;

const TRUC_THEO_THU_TU = [
  ThapNhiTruc.KIEN,
  ThapNhiTruc.TRU,
  ThapNhiTruc.MAN,
  ThapNhiTruc.BINH,
  ThapNhiTruc.DINH,
  ThapNhiTruc.CHAP,
  ThapNhiTruc.PHA,
  ThapNhiTruc.NGUY,
  ThapNhiTruc.THANH,
  ThapNhiTruc.THU,
  ThapNhiTruc.KHAI,
  ThapNhiTruc.BE,
] as const;

const THANG_DUONG = new Set<DiaChi>([
  DiaChi.DAN,
  DiaChi.THIN,
  DiaChi.NGO,
  DiaChi.THAN,
  DiaChi.TUAT,
  DiaChi.TY,
]);

const MA_THEO_TRUC = new Set<MaYeuTo>([
  MaYeuTo.BINH_PHUC,
  MaYeuTo.TIEU_THOI,
  MaYeuTo.THO_PHU,
  MaYeuTo.CAT_KY,
  MaYeuTo.BINH_BAO,
  MaYeuTo.PHUC_DUC,
  MaYeuTo.THIEN_VU,
  MaYeuTo.THIEN_CUONG,
  MaYeuTo.HA_KHOI,
  MaYeuTo.TU_THAN,
  MaYeuTo.THOI_AM,
  MaYeuTo.QUAN_PHU,
  MaYeuTo.TU_KHI,
  MaYeuTo.CHI_DUC,
  MaYeuTo.TIEU_HAO,
  MaYeuTo.DAI_HAO,
  MaYeuTo.THIEN_Y,
  MaYeuTo.THIEN_HY,
  MaYeuTo.THOI_DUONG,
  MaYeuTo.SINH_KHI,
  MaYeuTo.HUYET_CHI,
  MaYeuTo.NGUYET_KIEN,
]);

const MA_QUAN_HE_THANG = new Set<MaYeuTo>([
  MaYeuTo.THIEN_CAU,
  MaYeuTo.NGUYET_YEM,
  MaYeuTo.DIA_HOA,
  MaYeuTo.YEM_DOI,
  MaYeuTo.LUC_NGHI,
  MaYeuTo.CHIEU_DIEU,
]);

const ORACLE_NGUYET_YEM: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.DAN]: DiaChi.TUAT,
  [DiaChi.MAO]: DiaChi.DAU,
  [DiaChi.THIN]: DiaChi.THAN,
  [DiaChi.TI]: DiaChi.MUI,
  [DiaChi.NGO]: DiaChi.NGO,
  [DiaChi.MUI]: DiaChi.TI,
  [DiaChi.THAN]: DiaChi.THIN,
  [DiaChi.DAU]: DiaChi.MAO,
  [DiaChi.TUAT]: DiaChi.DAN,
  [DiaChi.HOI]: DiaChi.SUU,
  [DiaChi.TY]: DiaChi.TY,
  [DiaChi.SUU]: DiaChi.HOI,
};

const ORACLE_YEM_DOI: Readonly<Record<DiaChi, DiaChi>> = {
  [DiaChi.DAN]: DiaChi.THIN,
  [DiaChi.MAO]: DiaChi.MAO,
  [DiaChi.THIN]: DiaChi.DAN,
  [DiaChi.TI]: DiaChi.SUU,
  [DiaChi.NGO]: DiaChi.TY,
  [DiaChi.MUI]: DiaChi.HOI,
  [DiaChi.THAN]: DiaChi.TUAT,
  [DiaChi.DAU]: DiaChi.DAU,
  [DiaChi.TUAT]: DiaChi.THAN,
  [DiaChi.HOI]: DiaChi.MUI,
  [DiaChi.TY]: DiaChi.NGO,
  [DiaChi.SUU]: DiaChi.TI,
};

describe('Quyển 4 — shared-position identities from Thập Nhị Trực', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of CHI_THEO_THU_TU) {
    for (const chiNgay of CHI_THEO_THU_TU) {
      it(`${chiThang} / ${chiNgay}`, () => {
        const truc = oracleTruc(chiThang, chiNgay);
        const mongDoi = oracleMaTheoTruc(truc, chiThang).sort();
        const thucTe = service
          .tinh({
            chiThang,
            canNgay: ThienCan.GIAP,
            chiNgay,
            dangThoVuong: false,
          })
          .map((yeuTo) => yeuTo.ma)
          .filter((ma) => MA_THEO_TRUC.has(ma))
          .sort();

        expect(thucTe).toEqual(mongDoi);
      });
    }
  }

  it('Thiên Cương/Hà Khôi đảo vị trí giữa tháng dương và tháng âm', () => {
    expect(oracleMaTheoTruc(ThapNhiTruc.BINH, DiaChi.DAN)).toContain(MaYeuTo.THIEN_CUONG);
    expect(oracleMaTheoTruc(ThapNhiTruc.THU, DiaChi.DAN)).toContain(MaYeuTo.HA_KHOI);

    expect(oracleMaTheoTruc(ThapNhiTruc.BINH, DiaChi.MAO)).toContain(MaYeuTo.HA_KHOI);
    expect(oracleMaTheoTruc(ThapNhiTruc.THU, DiaChi.MAO)).toContain(MaYeuTo.THIEN_CUONG);
  });
});

describe('Quyển 4 — Thiên Cẩu singleton', () => {
  const service = new TinhYeuToNgayService();

  it('chỉ tháng kiến Thân ngày Tuất là Thiên Cẩu', () => {
    for (const chiThang of CHI_THEO_THU_TU) {
      for (const chiNgay of CHI_THEO_THU_TU) {
        const codes = service
          .tinh({
            chiThang,
            canNgay: ThienCan.GIAP,
            chiNgay,
            dangThoVuong: false,
          })
          .map((item) => item.ma);
        expect(codes.includes(MaYeuTo.THIEN_CAU)).toBe(
          chiThang === DiaChi.THAN && chiNgay === DiaChi.TUAT,
        );
      }
    }
  });

  it('các Trực Mãn khác vẫn có Phúc Đức/Thiên Vu nhưng không có Thiên Cẩu', () => {
    const result = service.tinh({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.THIN, // Dần -> Thìn là Trực Mãn
      dangThoVuong: false,
    });
    const codes = new Set(result.map((item) => item.ma));
    expect(codes.has(MaYeuTo.PHUC_DUC)).toBe(true);
    expect(codes.has(MaYeuTo.THIEN_VU)).toBe(true);
    expect(codes.has(MaYeuTo.THIEN_CAU)).toBe(false);
  });
});

describe('Quyển 4 — Nguyệt Yếm / Yếm Đối shared positions', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of CHI_THEO_THU_TU) {
    for (const chiNgay of CHI_THEO_THU_TU) {
      it(`${chiThang} / ${chiNgay}`, () => {
        const mongDoi: MaYeuTo[] = [];

        if (chiThang === DiaChi.THAN && chiNgay === DiaChi.TUAT) {
          mongDoi.push(MaYeuTo.THIEN_CAU);
        }

        if (ORACLE_NGUYET_YEM[chiThang] === chiNgay) {
          mongDoi.push(MaYeuTo.NGUYET_YEM, MaYeuTo.DIA_HOA);
        }

        if (ORACLE_YEM_DOI[chiThang] === chiNgay) {
          mongDoi.push(MaYeuTo.YEM_DOI, MaYeuTo.LUC_NGHI, MaYeuTo.CHIEU_DIEU);
        }

        const thucTe = service
          .tinh({
            chiThang,
            canNgay: ThienCan.GIAP,
            chiNgay,
            dangThoVuong: false,
          })
          .map((yeuTo) => yeuTo.ma)
          .filter((ma) => MA_QUAN_HE_THANG.has(ma))
          .sort();

        expect(thucTe).toEqual(mongDoi.sort());
      });
    }
  }

  it('giữ identity riêng dù cùng vị trí', () => {
    const ketQua = service.tinh({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.THIN,
      dangThoVuong: false,
    });

    const ma = new Set(ketQua.map((yeuTo) => yeuTo.ma));

    expect(ma.has(MaYeuTo.YEM_DOI)).toBe(true);
    expect(ma.has(MaYeuTo.LUC_NGHI)).toBe(true);
    expect(ma.has(MaYeuTo.CHIEU_DIEU)).toBe(true);
  });
});

describe('Quyển 4 provenance', () => {
  it('mọi shared-position definition có nguồn Việt/Hán đã xác minh', () => {
    for (const dinhNghia of [
      ...DINH_NGHIA_YEU_TO_THEO_TRUC,
      ...DINH_NGHIA_YEU_TO_QUAN_HE_THANG_QUYEN_4,
    ]) {
      const loaiNguon = new Set(dinhNghia.nguon.map((nguon) => nguon.loaiNguon));

      expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
      expect(dinhNghia.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
      expect(dinhNghia.tenKhac).toEqual([]);
    }
  });
});

function oracleTruc(chiThang: DiaChi, chiNgay: DiaChi): ThapNhiTruc {
  const chiSoThang = CHI_THEO_THU_TU.indexOf(chiThang);
  const chiSoNgay = CHI_THEO_THU_TU.indexOf(chiNgay);
  const khoangCach = (chiSoNgay - chiSoThang + 12) % 12;

  return TRUC_THEO_THU_TU[khoangCach]!;
}

function oracleMaTheoTruc(truc: ThapNhiTruc, chiThang: DiaChi): MaYeuTo[] {
  const coPhaiThangDuong = THANG_DUONG.has(chiThang);

  switch (truc) {
    case ThapNhiTruc.KIEN:
      return [MaYeuTo.BINH_PHUC, MaYeuTo.TIEU_THOI, MaYeuTo.THO_PHU, MaYeuTo.NGUYET_KIEN];
    case ThapNhiTruc.TRU:
      return [MaYeuTo.CAT_KY, MaYeuTo.BINH_BAO];
    case ThapNhiTruc.MAN:
      return [MaYeuTo.PHUC_DUC, MaYeuTo.THIEN_VU];
    case ThapNhiTruc.BINH:
      return [coPhaiThangDuong ? MaYeuTo.THIEN_CUONG : MaYeuTo.HA_KHOI, MaYeuTo.TU_THAN];
    case ThapNhiTruc.DINH:
      return [MaYeuTo.THOI_AM, MaYeuTo.QUAN_PHU, MaYeuTo.TU_KHI];
    case ThapNhiTruc.CHAP:
      return [MaYeuTo.CHI_DUC, MaYeuTo.TIEU_HAO];
    case ThapNhiTruc.PHA:
      return [MaYeuTo.DAI_HAO];
    case ThapNhiTruc.NGUY:
      return [];
    case ThapNhiTruc.THANH:
      return [MaYeuTo.THIEN_Y, MaYeuTo.THIEN_HY];
    case ThapNhiTruc.THU:
      return [coPhaiThangDuong ? MaYeuTo.HA_KHOI : MaYeuTo.THIEN_CUONG];
    case ThapNhiTruc.KHAI:
      return [MaYeuTo.THOI_DUONG, MaYeuTo.SINH_KHI];
    case ThapNhiTruc.BE:
      return [MaYeuTo.HUYET_CHI];
  }
}
