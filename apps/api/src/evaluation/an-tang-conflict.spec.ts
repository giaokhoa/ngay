import { describe, expect, it } from 'vitest';

import { QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_AN_TANG } from '../activities/an-tang-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

describe('AN_TANG full Q10 regression matrix', () => {
  it('Nguyệt Kiến + Thiên Đức bỏ Kị an táng', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_KIEN, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
  });

  it('Nguyệt Phá + Thiên Đức vẫn Kị', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });

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
      'AN_TANG_Q10_BINH_TU_MUA_THEO_NGUYET_SAT',
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

  it('Kiếp Sát tháng Tỵ + Thiên Đức bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Kiếp Sát tháng Tỵ + Nguyệt Đức Hợp bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.NGUYET_DUC_HOP],
    });

    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Kiếp Sát tháng Tỵ + Nguyệt Đức không được dùng nhầm cặp cũ', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.NGUYET_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Tai Sát tháng Tý delegate Nguyệt Phá', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_PHA],
    });

    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'AN_TANG_Q10_TAI_SAT_TU_TRONG_THEO_NGUYET_PHA',
    );
  });

  it('Nguyệt Sát tháng Dần không Đức/Hợp hard-ban', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });

    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Hình tháng Tỵ + required cát bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_HINH, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_HINH, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hại tháng Mão + Thiên Đức bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_HAI, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hại tháng Thìn + Thiên Đức Hợp cân bằng', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.THIEN_DUC_HOP],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_HAI, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Nguyệt Yếm tháng Dần + Nguyệt Đức bỏ Kị an táng', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Nguyệt Yếm tháng Thìn + cát cân bằng', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Dương thác Giáp Dần không cát: delegate Nguyệt Kiến và sinh Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [],
    });

    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'AN_TANG_Q10_NGUYET_YEM_DUONG_THAC_1',
    );
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'AN_TANG_Q10_NGUYET_KIEN_GIU_KY',
    );
  });

  it('Dương thác Giáp Dần + Thiên Đức: delegate Nguyệt Kiến rồi bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });

    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'AN_TANG_Q10_NGUYET_KIEN_CAT_BO_KY',
    );
  });

  it('hard special day Mùi/Kỷ Tỵ vẫn cấm mọi việc', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.TI,
      yeuTo: [],
    });

    expect(result.camMoiViec).toBe(true);
  });

  it('Tuế bạc Tỵ/Bính Ngọ tự sinh Kị và bỏ đúng 德願 Nên', () => {
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
  });

  it('Dương thác Mùi/Kỷ Mùi bỏ đúng 德合 Nên', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      yeuTo: [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_NGUYEN,
      ],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC_HOP, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.HIEU_LUC);
  });

  it('Tứ Phế + Đức/Hợp vẫn Kị', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.TU_PHE, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Tứ Phế + Nguyệt Phá hard-ban', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA],
    });

    expect(result.camMoiViec).toBe(true);
  });

  it('Tứ Kị Dần Ất Hợi + Thiên Nguyện bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.HOI,
      yeuTo: [MaYeuTo.TU_KY, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.TU_KY, TrangThaiDongGop.BI_LOAI);
  });

  it('Tứ Cùng Dần Ất Hợi + Thiên Nguyện bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.HOI,
      yeuTo: [MaYeuTo.TU_CUNG, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.TU_CUNG, TrangThaiDongGop.BI_LOAI);
  });

  it('Ngũ Mộ tháng Ngọ + Nguyệt Đức bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
  });

  it('Phục Nhật + Ô Phệ không cát: vẫn Kị và loại Nên Ô Phệ', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.PHUC_NHAT, MaYeuTo.O_PHE],
    });

    expectYeuTo(result.dongGop, MaYeuTo.PHUC_NHAT, TrangThaiDongGop.HIEU_LUC);
    expectYeuTo(result.dongGop, MaYeuTo.O_PHE, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(false);
  });

  it('Trọng Nhật + Ô Phệ không cát: vẫn Kị và loại Nên Ô Phệ', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.TRONG_NHAT, MaYeuTo.O_PHE],
    });

    expectYeuTo(result.dongGop, MaYeuTo.TRONG_NHAT, TrangThaiDongGop.HIEU_LUC);
    expectYeuTo(result.dongGop, MaYeuTo.O_PHE, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(true);
  });

  it('Phục Nhật + Thiên Đức bỏ Kị', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.PHUC_NHAT, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.PHUC_NHAT, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Trọng Nhật + Lục Hợp bỏ Kị', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.TRONG_NHAT, MaYeuTo.LUC_HOP],
    });

    expectYeuTo(result.dongGop, MaYeuTo.TRONG_NHAT, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Phục Nhật + Thiên Nguyện bỏ Kị theo Lục Hợp semantics', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.PHUC_NHAT, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.PHUC_NHAT, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('global special-day chạy khi không có factor Nguyệt Yếm', () => {
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

  it('mọi trace Q10 AN_TANG đã áp dụng giữ provenance verified', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [],
    });

    for (const trace of result.xungDotDaApDung) {
      expect(trace.nguon.length).toBeGreaterThan(0);
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
  return service.danhGia(QUY_TAC_AN_TANG, taoBoiCanh(input));
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
