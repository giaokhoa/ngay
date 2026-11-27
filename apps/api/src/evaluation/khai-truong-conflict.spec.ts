import { describe, expect, it } from 'vitest';

import { QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_KHAI_TRUONG } from '../activities/khai-truong-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

describe('KHAI_TRUONG full Q10 regression matrix', () => {
  it('Nguyệt Phá + Thiên Đức vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Đại Hao giữ Q11 identity nhưng theo outcome Nguyệt Phá', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.DAI_HAO, MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.DAI_HAO, TrangThaiDongGop.HIEU_LUC);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'KHAI_TRUONG_Q10_DAI_HAO_THEO_NGUYET_PHA',
    );
  });

  it('Nguyệt Phá Mão + Tai Sát + Nguyệt Yếm hard-ban', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    });
    expect(result.camMoiViec).toBe(true);
  });

  it('Bình tháng Hợi bỏ Kị', () => {
    const result = danhGia({ chiThang: DiaChi.HOI, truc: ThapNhiTruc.BINH, yeuTo: [] });
    expectTruc(result.dongGop, ThapNhiTruc.BINH, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Bình tháng Mão + Nguyệt Đức cân bằng, không tự sinh Nên', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_DUC],
    });
    expectTruc(result.dongGop, ThapNhiTruc.BINH, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Bình tháng Thìn delegate Nguyệt Sát', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });
    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'KHAI_TRUONG_Q10_BINH_TU_MUA_THEO_NGUYET_SAT',
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

  it('Thu tháng Thìn + Thiên Đức bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });
    expectTruc(result.dongGop, ThapNhiTruc.THU, TrangThaiDongGop.BI_LOAI);
  });

  it('Bế tháng Dần delegate Nguyệt Sát', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });
    expect(result.camMoiViec).toBe(true);
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
      'KHAI_TRUONG_Q10_TAI_SAT_TU_TRONG_THEO_NGUYET_PHA',
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
  });

  it('Nguyệt Hại tháng Tý delegate Nguyệt Sát', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.NGUYET_SAT],
    });
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'KHAI_TRUONG_Q10_NGUYET_HAI_TY_NGO_THEO_NGUYET_SAT',
    );
  });

  it('Nguyệt Yếm tháng Dần + Nguyệt Đức bỏ Kị khai trương', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
  });

  it('Dương thác Giáp Dần không tự sinh Kị KHAI_TRUONG', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [],
    });
    expect(result.coKy).toBe(false);
    expect(result.xungDotDaApDung.some((item) => item.ma.includes('DUONG_THAC_1'))).toBe(false);
  });

  it('Dương thác Giáp Dần bỏ contribution Nguyệt Yếm nếu context có factor', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Tuế bạc Tỵ/Bính Ngọ vẫn Kị và loại Nên Thiên Nguyện', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.NGO,
      yeuTo: [MaYeuTo.THIEN_NGUYEN],
    });
    expect(result.coKy).toBe(true);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.BI_LOAI);
    expect(result.xungDotDaApDung.some((item) => item.ma.includes('TUE_BAC_4_BINH_NGO'))).toBe(
      true,
    );
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
      'KHAI_TRUONG_Q10_THIEN_LAI_NGO_MAO_DAU_THEO_BINH',
    );
  });

  it('Tiểu Hao + Thiên Nguyện bỏ Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TIEU_HAO, MaYeuTo.THIEN_NGUYEN] });
    expectYeuTo(result.dongGop, MaYeuTo.TIEU_HAO, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.HIEU_LUC);
    expect(result.coNen).toBe(true);
  });

  it('Tiểu Hao cardinal + Kiếp Sát + Đức special branch vẫn Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.TIEU_HAO, MaYeuTo.KIEP_SAT, MaYeuTo.NGUYET_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.TIEU_HAO, TrangThaiDongGop.HIEU_LUC);
  });

  it('Tứ Hao tháng Thìn + Thiên Đức bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.TU_HAO, MaYeuTo.THIEN_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.TU_HAO, TrangThaiDongGop.BI_LOAI);
  });

  it('Tứ Hao tháng Thìn + Tam Hợp bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.TU_HAO, MaYeuTo.TAM_HOP],
    });
    expectYeuTo(result.dongGop, MaYeuTo.TU_HAO, TrangThaiDongGop.BI_LOAI);
  });

  it('Tứ Phế + Đức/Hợp vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] });
    expectYeuTo(result.dongGop, MaYeuTo.TU_PHE, TrangThaiDongGop.HIEU_LUC);
  });

  it('Tứ Phế + Nguyệt Phá hard-ban', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(result.camMoiViec).toBe(true);
  });

  it('Tứ Cùng tháng Dần Ất Hợi + Thiên Nguyện bỏ Kị', () => {
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

  it('Cửu Không Dần + Mãn + Nguyệt Đức bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.MAN,
      yeuTo: [MaYeuTo.CUU_KHONG, MaYeuTo.NGUYET_DUC],
    });
    expectYeuTo(result.dongGop, MaYeuTo.CUU_KHONG, TrangThaiDongGop.BI_LOAI);
    expectTruc(result.dongGop, ThapNhiTruc.MAN, TrangThaiDongGop.HIEU_LUC);
    expect(result.coNen).toBe(true);
  });

  it('Cửu Không tháng Thìn delegate Nguyệt Phá', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.CUU_KHONG, MaYeuTo.NGUYET_PHA],
    });
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'KHAI_TRUONG_Q10_CUU_KHONG_TU_MUA_THEO_NGUYET_PHA',
    );
    expect(result.coKy).toBe(true);
  });

  it('Cửu Không tháng Tỵ delegate Nguyệt Yếm', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.TY,
      yeuTo: [MaYeuTo.CUU_KHONG, MaYeuTo.NGUYET_YEM],
    });
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'KHAI_TRUONG_Q10_CUU_KHONG_TI_HOI_THEO_NGUYET_YEM',
    );
  });

  it('Q10-only special day chạy khi không có factor Nguyệt Yếm', () => {
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

  it('mọi trace KHAI_TRUONG đã áp dụng giữ provenance Việt + Hán verified', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.TU_HAO, MaYeuTo.THIEN_DUC],
    });
    for (const trace of result.xungDotDaApDung) {
      expect(trace.nguon).toHaveLength(2);
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
  return service.danhGia(QUY_TAC_KHAI_TRUONG, taoBoiCanh(input));
}

function taoBoiCanh(input: Input): BoiCanhDanhGiaNgay {
  return {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.BINH,
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
