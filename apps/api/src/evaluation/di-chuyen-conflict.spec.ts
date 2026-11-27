import { describe, expect, it } from 'vitest';

import { QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_CUOI_HOI } from '../activities/cuoi-hoi-rules';
import { QUY_TAC_DI_CHUYEN } from '../activities/di-chuyen-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

describe('DI_CHUYEN Q10 mandatory regression vectors', () => {
  it('Nguyệt Phá + Thiên Đức: vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.camMoiViec).toBe(false);
  });

  it('Nguyệt Phá tháng Mão + Tai Sát + Nguyệt Yếm: mọi việc đều Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
  });

  it('Bình tháng Hợi: bỏ Kị', () => {
    const result = danhGia({ chiThang: DiaChi.HOI, truc: ThapNhiTruc.BINH, yeuTo: [] });

    expectTruc(result.dongGop, ThapNhiTruc.BINH, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Bình tháng Dần: delegate Nguyệt Hình', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_HINH],
    });

    expectTruc(result.dongGop, ThapNhiTruc.BINH, TrangThaiDongGop.HIEU_LUC);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'DI_CHUYEN_Q10_BINH_DAN_THEO_NGUYET_HINH',
    );
  });

  it('Bình tháng Thìn: delegate Nguyệt Sát và nhận hard-ban khi không Đức/Hợp', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'DI_CHUYEN_Q10_BINH_TU_MUA_THEO_NGUYET_SAT',
    );
  });

  it('Thu tháng Dần: delegate Kiếp Sát rồi bỏ Kị DI_CHUYEN', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.KIEP_SAT],
    });

    expectTruc(result.dongGop, ThapNhiTruc.THU, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Thu tháng Mão: delegate Nguyệt Hình', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.NGUYET_HINH],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'DI_CHUYEN_Q10_THU_MAO_THEO_NGUYET_HINH',
    );
  });

  it('Thu tháng Thìn + Đức: bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });

    expectTruc(result.dongGop, ThapNhiTruc.THU, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
  });

  it('Bế tháng Dần: delegate Nguyệt Sát', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'DI_CHUYEN_Q10_BE_TU_SINH_THEO_NGUYET_SAT',
    );
  });

  it('Bế tháng Thìn + Thiên Xá: không chủ Kị, cũng không chủ Nên', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.THIEN_XA],
    });

    expectTruc(result.dongGop, ThapNhiTruc.BE, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_XA, TrangThaiDongGop.BI_LOAI);
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
  });

  it('Kiếp Sát tháng Dần: bỏ Kị', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.KIEP_SAT] });
    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Kiếp Sát tháng Tỵ + Nguyệt Đức: bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.NGUYET_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Tai Sát tháng Tý: delegate Nguyệt Phá', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_PHA],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'DI_CHUYEN_Q10_TAI_SAT_TU_TRONG_THEO_NGUYET_PHA',
    );
  });

  it('Nguyệt Sát tháng Mão + Nguyệt Đức + Thiên Nguyện: bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_SAT, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_SAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Sát tháng Dần không Đức/Hợp: mọi việc đều Kị', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.NGUYET_SAT] });
    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Hình tháng Tỵ + source virtues: bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_HINH, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_HINH, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hình tháng Tý không Đức/Hợp: mọi việc đều Kị', () => {
    const result = danhGia({ chiThang: DiaChi.TY, yeuTo: [MaYeuTo.NGUYET_HINH] });
    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Hình tháng Ngọ: delegate Nguyệt Yếm', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGUYET_HINH, MaYeuTo.NGUYET_YEM],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'DI_CHUYEN_Q10_NGUYET_HINH_NGO_THEO_NGUYET_YEM',
    );
  });

  it('Nguyệt Yếm tháng Dần + Nguyệt Đức: vẫn Kị DI_CHUYEN', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Nguyệt Yếm tháng Tý không Thiên Xá: mọi việc đều Kị', () => {
    const result = danhGia({ chiThang: DiaChi.TY, yeuTo: [MaYeuTo.NGUYET_YEM] });
    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Yếm tháng Mão dù có Đức/Hợp: mọi việc đều Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Yếm tháng Giêng ngày Giáp Dần (Dương thác): theo Kị Kiến -> bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Nguyệt Yếm tháng Tư ngày Kỷ Tỵ (Tiểu hội): mọi việc đều Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });

    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Yếm tháng Sáu ngày Kỷ Mùi (Dương thác): bỏ Kị và không nhận Nên Đức Hợp', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC_HOP],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Đại Thời tháng Dần: bỏ Kị', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.DAI_THOI] });
    expectYeuTo(result.dongGop, MaYeuTo.DAI_THOI, TrangThaiDongGop.BI_LOAI);
  });

  it('Đại Thời tháng Mão: delegate Nguyệt Hình', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.NGUYET_HINH],
    });
    expect(result.camMoiViec).toBe(true);
  });

  it('Thiên Lại tháng Dần + Thiên Đức: bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_LAI, MaYeuTo.THIEN_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_LAI, TrangThaiDongGop.BI_LOAI);
  });

  it('Thiên Lại tháng Ngọ: delegate Bình', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.THIEN_LAI],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THIEN_LAI, TrangThaiDongGop.HIEU_LUC);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'DI_CHUYEN_Q10_THIEN_LAI_NGO_MAO_DAU_THEO_BINH',
    );
  });

  it('Thiên Lại tháng Tý: delegate Nguyệt Hình', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.THIEN_LAI, MaYeuTo.NGUYET_HINH],
    });
    expect(result.camMoiViec).toBe(true);
  });

  it('Tứ Phế + Đức/Hợp: vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] });
    expectYeuTo(result.dongGop, MaYeuTo.TU_PHE, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Tứ Phế + Nguyệt Phá: mọi việc đều Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(result.camMoiViec).toBe(true);
  });

  it.each([DiaChi.NGO, DiaChi.TY])('Ngũ Mộ tháng %s + Nguyệt Đức: bỏ Kị', (chiThang) => {
    const result = danhGia({
      chiThang,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
  });

  it('Quy Kị + Thiên Đức: vẫn Kị, giữ provenance Việt/Hán', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.QUY_KY, MaYeuTo.THIEN_DUC] });
    expectYeuTo(result.dongGop, MaYeuTo.QUY_KY, TrangThaiDongGop.HIEU_LUC);

    const trace = result.xungDotDaApDung.find((item) => item.ma === 'DI_CHUYEN_Q10_QUY_KY_VAN_KY');
    expect(trace?.nguon).toHaveLength(2);
    expect(trace?.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
  });

  it('Quy Kị + Thiên Đức Hợp: vẫn Kị và trace ghi rõ khác biệt Việt/Hán', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.QUY_KY, MaYeuTo.THIEN_DUC_HOP] });
    expectYeuTo(result.dongGop, MaYeuTo.QUY_KY, TrangThaiDongGop.HIEU_LUC);

    const trace = result.xungDotDaApDung.find((item) => item.ma === 'DI_CHUYEN_Q10_QUY_KY_VAN_KY');
    expect(trace?.nguon[0]?.ghiChu).toContain('Bản Việt');
    expect(trace?.nguon[0]?.ghiChu).toContain('Hán');
  });

  it('Vãng Vong + Thiên Xá: vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.VANG_VONG, MaYeuTo.THIEN_XA] });
    expectYeuTo(result.dongGop, MaYeuTo.VANG_VONG, TrangThaiDongGop.HIEU_LUC);
  });
});

describe('Nguyệt Yếm exact CanChi branches', () => {
  it.each([
    [DiaChi.DAN, ThienCan.GIAP, DiaChi.DAN, false],
    [DiaChi.THIN, ThienCan.GIAP, DiaChi.THIN, false],
    [DiaChi.TI, ThienCan.KY, DiaChi.TI, true],
    [DiaChi.MUI, ThienCan.KY, DiaChi.MUI, false],
  ] as const)('Dương thác %s / %s %s: hard=%s', (chiThang, canNgay, chiNgay, hard) => {
    const result = danhGia({
      chiThang,
      canNgay,
      chiNgay,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });

    expect(result.camMoiViec).toBe(hard);
    expectYeuTo(
      result.dongGop,
      MaYeuTo.NGUYET_YEM,
      hard ? TrangThaiDongGop.HIEU_LUC : TrangThaiDongGop.BI_LOAI,
    );
  });

  it('Âm thác tháng Ba Canh Thân vẫn theo Kị Nguyệt Yếm', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      canNgay: ThienCan.CANH,
      chiNgay: DiaChi.THAN,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.HIEU_LUC);
    expect(result.camMoiViec).toBe(false);
  });

  it('Âm thác tháng Sáu Kỷ Tỵ thuộc Đại hội: mọi việc đều Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC_HOP],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.HIEU_LUC);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC_HOP, TrangThaiDongGop.BI_LOAI);
  });
});

describe('Q10 standalone special-day rules', () => {
  it('Tiểu hội tháng Tỵ Kỷ Tỵ hard-ban dù không có factor Nguyệt Yếm', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.TI,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
  });

  it('Âm thác tháng Hai Tân Dậu hard-ban do Nguyệt Phá dù không có factor Nguyệt Yếm', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      canNgay: ThienCan.TAN,
      chiNgay: DiaChi.DAU,
      yeuTo: [],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
  });

  it('Tuế bạc tháng Tỵ Bính Ngọ tạo Q10-only Kị DI_CHUYEN', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.NGO,
      yeuTo: [],
    });

    expect(result.camMoiViec).toBe(false);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.some((item) => item.ma.includes('TUE_BAC_4_BINH_NGO'))).toBe(
      true,
    );
  });

  it('Dương thác tháng Sáu Kỷ Mùi không tự sinh Kị nhưng loại Nên Đức Hợp', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      yeuTo: [MaYeuTo.THIEN_DUC_HOP],
    });

    expect(result.camMoiViec).toBe(false);
    expect(result.coKy).toBe(false);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.BI_LOAI);
  });

  it('Âm thác tháng Sáu Kỷ Tỵ hard-ban dù không có factor Nguyệt Yếm', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_DUC_HOP],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC_HOP, TrangThaiDongGop.BI_LOAI);
  });

  it('Dương thác thường theo Kị Kiến nên không tự sinh Kị DI_CHUYEN', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [],
    });

    expect(result.camMoiViec).toBe(false);
    expect(result.coKy).toBe(false);
  });
});

describe('DI_CHUYEN resolver invariants', () => {
  it('mọi trace Q10 đã áp dụng đều có Việt + Hán provenance verified', () => {
    const samples = [
      danhGia({ chiThang: DiaChi.HOI, truc: ThapNhiTruc.BINH, yeuTo: [] }),
      danhGia({ yeuTo: [MaYeuTo.QUY_KY, MaYeuTo.THIEN_XA] }),
      danhGia({
        chiThang: DiaChi.TI,
        canNgay: ThienCan.KY,
        chiNgay: DiaChi.TI,
        yeuTo: [MaYeuTo.NGUYET_YEM],
      }),
    ];

    for (const result of samples) {
      for (const trace of result.xungDotDaApDung) {
        expect(trace.nguon).toHaveLength(2);
        expect(trace.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
      }
    }
  });

  it('không chạy override riêng của CUOI_HOI lên DI_CHUYEN', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.DAI_THOI] });

    expect(result.xungDotDaApDung.some((item) => item.ma === 'DAI_THOI_DAN_BO_KY')).toBe(false);
  });

  it('CUOI_HOI regression vẫn dispatch vào resolver cũ', () => {
    const result = service.danhGia(
      QUY_TAC_CUOI_HOI,
      taoBoiCanh({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.DAI_THOI] }),
    );

    expectYeuTo(result.dongGop, MaYeuTo.DAI_THOI, TrangThaiDongGop.BI_LOAI);
    expect(result.xungDotDaApDung.some((item) => item.ma === 'DAI_THOI_DAN_BO_KY')).toBe(true);
  });

  it('từ chối trộn rule của nhiều activity', () => {
    const mixed: readonly QuyTacDungSu[] = [QUY_TAC_CUOI_HOI[0]!, QUY_TAC_DI_CHUYEN[0]!];
    expect(() => service.danhGia(mixed, taoBoiCanh({ yeuTo: [] }))).toThrow(
      'Không được trộn quy tắc của nhiều công việc',
    );
  });
});

interface Input {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo: readonly MaYeuTo[];
}

function danhGia(input: Input) {
  return service.danhGia(QUY_TAC_DI_CHUYEN, taoBoiCanh(input));
}

function taoBoiCanh(input: Input): BoiCanhDanhGiaNgay {
  return {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.GIAP,
    chiNgay: input.chiNgay ?? DiaChi.DAN,
    truc: input.truc ?? ThapNhiTruc.KIEN,
    dangThoVuong: false,
    yeuTo: input.yeuTo.map(taoYeuTo),
  };
}

function taoYeuTo(ma: MaYeuTo): YeuToNgay {
  return {
    ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: [],
    nguon: [],
  };
}

function expectYeuTo(
  dongGop: readonly { quyTac: QuyTacDungSu; trangThai: TrangThaiDongGop }[],
  ma: MaYeuTo,
  trangThai: TrangThaiDongGop,
): void {
  const item = dongGop.find(
    (candidate) =>
      candidate.quyTac.dieuKien.loai === 'YEU_TO' && candidate.quyTac.dieuKien.ma === ma,
  );
  expect(item?.trangThai).toBe(trangThai);
}

function expectTruc(
  dongGop: readonly { quyTac: QuyTacDungSu; trangThai: TrangThaiDongGop }[],
  truc: ThapNhiTruc,
  trangThai: TrangThaiDongGop,
): void {
  const item = dongGop.find(
    (candidate) =>
      candidate.quyTac.dieuKien.loai === 'TRUC' && candidate.quyTac.dieuKien.truc === truc,
  );
  expect(item?.trangThai).toBe(trangThai);
}
