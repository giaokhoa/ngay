import { describe, expect, it } from 'vitest';

import { QuyTacDungSu, TacDongDungSu } from '../activities/activity-rule';
import { QUY_TAC_CUOI_HOI } from '../activities/cuoi-hoi-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

describe('Q10 CUOI_HOI conflict regression vectors', () => {
  it('Nguyệt Phá + Thiên Đức: giữ Kị, bỏ Nên liên quan', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
  });

  it('Tứ Phế + Nguyệt Đức: vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] });
    expectTrangThai(result.dongGop, MaYeuTo.TU_PHE, TrangThaiDongGop.HIEU_LUC);
    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_DUC, TrangThaiDongGop.BI_LOAI);
  });

  it('Tứ Phế + Nguyệt Phá: mọi việc đều Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
  });

  it('Tứ Cùng ở Ất Hợi tháng Dần + Thiên Nguyện: bỏ đúng Kị Tứ Cùng', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.HOI,
      yeuTo: [MaYeuTo.TU_CUNG, MaYeuTo.THIEN_NGUYEN],
    });
    expectTrangThai(result.dongGop, MaYeuTo.TU_CUNG, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true); // Hợi nhật vẫn là typed blocker độc lập.
  });

  it.each([DiaChi.NGO, DiaChi.TY])('Ngũ Mộ tháng %s + Nguyệt Đức: bỏ Kị', (chiThang) => {
    const result = danhGia({ chiThang, yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC] });
    expectTrangThai(result.dongGop, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_DUC, TrangThaiDongGop.HIEU_LUC);
  });

  it('Bát Chuyên + Thiên Đức Hợp: vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.BAT_CHUYEN, MaYeuTo.THIEN_DUC_HOP] });
    expectTrangThai(result.dongGop, MaYeuTo.BAT_CHUYEN, TrangThaiDongGop.HIEU_LUC);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.BI_LOAI);
  });

  it('Bát Chuyên + Thiên Nguyện: bỏ Kị cưới hỏi, giữ Nên Thiên Nguyện', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.BAT_CHUYEN, MaYeuTo.THIEN_NGUYEN] });
    expectTrangThai(result.dongGop, MaYeuTo.BAT_CHUYEN, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.HIEU_LUC);
  });

  it('Vãng Vong + Thiên Xá: vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.VANG_VONG, MaYeuTo.THIEN_XA] });
    expectTrangThai(result.dongGop, MaYeuTo.VANG_VONG, TrangThaiDongGop.HIEU_LUC);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_XA, TrangThaiDongGop.BI_LOAI);
  });

  it('Yếm Đối + Thiên Xá: bỏ Kị, giữ Nên', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.YEM_DOI, MaYeuTo.THIEN_XA] });
    expectTrangThai(result.dongGop, MaYeuTo.YEM_DOI, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_XA, TrangThaiDongGop.HIEU_LUC);
  });

  it('Nguyệt Hình tháng Tỵ + Nguyệt Đức: bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_HINH, MaYeuTo.NGUYET_DUC],
    });
    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_HINH, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hình tháng Tý không Đức/Hợp: mọi việc đều Kị', () => {
    const result = danhGia({ chiThang: DiaChi.TY, yeuTo: [MaYeuTo.NGUYET_HINH] });
    expect(result.camMoiViec).toBe(true);
  });

  it('Thiên Lại tháng Dần + Thiên Đức: bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_LAI, MaYeuTo.THIEN_DUC],
    });
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_LAI, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.HIEU_LUC);
  });

  it('Thiên Lại tháng Tý theo Nguyệt Hình', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.THIEN_LAI, MaYeuTo.NGUYET_HINH],
    });
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_LAI, TrangThaiDongGop.HIEU_LUC);
    expect(result.xungDotDaApDung.some((rule) => rule.ma === 'THIEN_LAI_TY_THEO_NGUYET_HINH')).toBe(
      true,
    );
  });

  it('Thiên Lại tháng Ngọ theo Bình nhật', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.THIEN_LAI],
    });
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_LAI, TrangThaiDongGop.HIEU_LUC);
    expect(result.xungDotDaApDung.some((rule) => rule.ma === 'THIEN_LAI_NGO_THEO_BINH')).toBe(true);
  });

  it('Thu nhật tháng Dần theo Kiếp Sát', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.KIEP_SAT],
    });
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.some((rule) => rule.ma === 'THU_DAN_THEO_KIEP_SAT')).toBe(true);
  });

  it('Thu nhật tháng Mão theo Nguyệt Hình', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.NGUYET_HINH],
    });
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.some((rule) => rule.ma === 'THU_MAO_THEO_NGUYET_HINH')).toBe(
      true,
    );
  });

  it('Đại Thời tháng Dần: bỏ Kị nhưng không tự tạo Nên', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.DAI_THOI] });
    expectTrangThai(result.dongGop, MaYeuTo.DAI_THOI, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Hợi nhật mặc định giữ Kị', () => {
    const result = danhGia({ chiNgay: DiaChi.HOI, yeuTo: [] });
    const hoi = result.dongGop.find((item) => item.quyTac.dieuKien.loai === 'CHI_NGAY');
    expect(hoi?.trangThai).toBe(TrangThaiDongGop.HIEU_LUC);
    expect(hoi?.quyTac.tacDong).toBe(TacDongDungSu.KY);
    expect(result.coKy).toBe(true);
  });

  it('trace Q10 luôn mang nguồn Việt/Hán đã xác minh', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.YEM_DOI, MaYeuTo.THIEN_XA] });
    expect(result.xungDotDaApDung).not.toHaveLength(0);
    for (const trace of result.xungDotDaApDung) {
      expect(trace.nguon).toHaveLength(2);
      expect(trace.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});

function danhGia(
  partial: Partial<Omit<BoiCanhDanhGiaNgay, 'yeuTo'>> & { yeuTo: readonly MaYeuTo[] },
) {
  const boiCanh: BoiCanhDanhGiaNgay = {
    chiThang: partial.chiThang ?? DiaChi.DAN,
    canNgay: partial.canNgay ?? ThienCan.GIAP,
    chiNgay: partial.chiNgay ?? DiaChi.DAN,
    truc: partial.truc ?? ThapNhiTruc.KIEN,
    dangThoVuong: partial.dangThoVuong ?? false,
    yeuTo: partial.yeuTo.map(taoYeuTo),
  };
  return service.danhGia(QUY_TAC_CUOI_HOI, boiCanh);
}

function taoYeuTo(ma: MaYeuTo): YeuToNgay {
  return {
    ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: [],
    nguon: [],
  };
}

function expectTrangThai(
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
