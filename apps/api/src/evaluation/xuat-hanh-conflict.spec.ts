import { describe, expect, it } from 'vitest';

import { QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_XUAT_HANH } from '../activities/xuat-hanh-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';
import { QUY_TAC_Q10_XUAT_HANH } from './xuat-hanh-conflict-rules';

const service = new DanhGiaNgayService();

describe('XUAT_HANH full Q10 regression matrix', () => {
  it('derived shared matrix does not leak Quy Kị from DI_CHUYEN', () => {
    expect(QUY_TAC_Q10_XUAT_HANH.some((rule) => rule.ma.includes('QUY_KY'))).toBe(false);
    expect(QUY_TAC_Q10_XUAT_HANH.every((rule) => !rule.ma.startsWith('DI_CHUYEN_Q10_'))).toBe(true);
  });

  it('Nguyệt Phá + Thiên Đức vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Nguyệt Phá tháng Mão + Tai Sát + Nguyệt Yếm hard-ban', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    });
    expect(result.camMoiViec).toBe(true);
  });

  it('Bình tháng Hợi bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.HOI,
      truc: ThapNhiTruc.BINH,
      yeuTo: [],
    });
    expectTruc(result.dongGop, ThapNhiTruc.BINH, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Bình tháng Thìn delegate Nguyệt Sát', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });
    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'XUAT_HANH_Q10_BINH_TU_MUA_THEO_NGUYET_SAT',
    );
  });

  it('Thu tháng Dần delegate Kiếp Sát rồi bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.KIEP_SAT],
    });
    expectTruc(result.dongGop, ThapNhiTruc.THU, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Bế tháng Dần delegate Nguyệt Sát', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });
    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'XUAT_HANH_Q10_BE_TU_SINH_THEO_NGUYET_SAT',
    );
  });

  it('Kiếp Sát tháng Dần bỏ Kị', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.KIEP_SAT] });
    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Tai Sát tháng Tý delegate Nguyệt Phá', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_PHA],
    });
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'XUAT_HANH_Q10_TAI_SAT_TU_TRONG_THEO_NGUYET_PHA',
    );
  });

  it('Nguyệt Sát tháng Dần không Đức/Hợp hard-ban', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.NGUYET_SAT] });
    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Hình tháng Tỵ + required cát bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_HINH, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.THIEN_NGUYEN],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_HINH, TrangThaiDongGop.BI_LOAI);
  });

  it('Q10 supplemental Nguyệt Yếm tạo blocker dù Q11 Việt không có identity này', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);

    const contribution = result.dongGop.find(
      (item) =>
        item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === MaYeuTo.NGUYET_YEM,
    );
    expect(contribution?.quyTac.nguon[0]?.quyen).toBe(10);
    expect(contribution?.quyTac.nguon[0]?.trang).toBe(806);
  });

  it('Nguyệt Yếm tháng Dần + Nguyệt Đức vẫn Kị xuất hành', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Nguyệt Yếm tháng Thìn + Thiên Đức cân bằng', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
  });

  it('Dương thác Giáp Dần không tự sinh Kị XUAT_HANH', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [],
    });
    expect(result.coKy).toBe(false);
    expect(result.xungDotDaApDung.some((item) => item.ma.includes('DUONG_THAC_1'))).toBe(false);
  });

  it('Dương thác Giáp Dần bỏ Nguyệt Yếm contribution khi factor có mặt', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Tuế bạc Tỵ/Bính Ngọ tự sinh Kị và loại đúng Đức + Nguyện', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.NGO,
      yeuTo: [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_NGUYEN, MaYeuTo.THIEN_DUC_HOP],
    });

    expect(result.coKy).toBe(true);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.HIEU_LUC);
    expect(result.xungDotDaApDung.some((item) => item.ma.includes('TUE_BAC_4_BINH_NGO'))).toBe(
      true,
    );
  });

  it('Dương thác tháng Sáu Kỷ Mùi loại Đức + Hợp nhưng không Nguyện', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      yeuTo: [
        MaYeuTo.NGUYET_YEM,
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_NGUYEN,
      ],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC_HOP, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.HIEU_LUC);
  });

  it('Âm thác tháng Sáu Kỷ Tỵ hard-ban', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });
    expect(result.camMoiViec).toBe(true);
  });

  it('Đại Thời tháng Dần bỏ Kị', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.DAI_THOI] });
    expectYeuTo(result.dongGop, MaYeuTo.DAI_THOI, TrangThaiDongGop.BI_LOAI);
  });

  it('Thiên Lại tháng Ngọ delegate Bình', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.THIEN_LAI],
    });
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'XUAT_HANH_Q10_THIEN_LAI_NGO_MAO_DAU_THEO_BINH',
    );
  });

  it('Thiên Tặc + Đức/Hợp vẫn Kị', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.THIEN_TAC, MaYeuTo.THIEN_DUC_HOP],
    });
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_TAC, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'XUAT_HANH_Q10_THIEN_TAC_DUC_HOP_VAN_KY',
    );
  });

  it('Tứ Phế + Đức/Hợp vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] });
    expectYeuTo(result.dongGop, MaYeuTo.TU_PHE, TrangThaiDongGop.HIEU_LUC);
  });

  it('Tứ Phế + Nguyệt Phá hard-ban', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(result.camMoiViec).toBe(true);
  });

  it('Ngũ Mộ tháng Ngọ + Nguyệt Đức bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
  });

  it('Vãng Vong + Thiên Xá vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.VANG_VONG, MaYeuTo.THIEN_XA] });
    expectYeuTo(result.dongGop, MaYeuTo.VANG_VONG, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('ngày Tỵ là typed Kị dù không có thần sát', () => {
    const result = danhGia({
      chiNgay: DiaChi.TI,
      yeuTo: [],
    });
    expectChiNgay(result.dongGop, DiaChi.TI, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Q10 global special day chạy khi không có factor Nguyệt Yếm', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.NGO,
      yeuTo: [],
    });
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.some((item) => item.ma.includes('TUE_BAC_4_BINH_NGO'))).toBe(
      true,
    );
  });

  it('mọi trace Q10 XUAT_HANH đã áp dụng giữ provenance verified', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.THIEN_TAC, MaYeuTo.THIEN_DUC_HOP],
    });
    for (const trace of result.xungDotDaApDung) {
      expect(trace.nguon.length).toBeGreaterThanOrEqual(1);
      expect(trace.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
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
  return service.danhGia(QUY_TAC_XUAT_HANH, taoBoiCanh(input));
}

function taoBoiCanh(input: Input): BoiCanhDanhGiaNgay {
  return {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.BINH,
    chiNgay: input.chiNgay ?? DiaChi.DAN,
    truc: input.truc ?? ThapNhiTruc.THANH,
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

function expectChiNgay(
  dongGop: readonly { quyTac: QuyTacDungSu; trangThai: TrangThaiDongGop }[],
  chi: DiaChi,
  trangThai: TrangThaiDongGop,
): void {
  const item = dongGop.find(
    (candidate) =>
      candidate.quyTac.dieuKien.loai === 'CHI_NGAY' && candidate.quyTac.dieuKien.chi === chi,
  );
  expect(item?.trangThai).toBe(trangThai);
}
