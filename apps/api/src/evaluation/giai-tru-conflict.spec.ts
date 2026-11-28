import { describe, expect, it } from 'vitest';

import { QUY_TAC_GIAI_TRU } from '../activities/giai-tru-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('GIAI_TRU Q10 conflict resolver', () => {
  it('Nguyệt Phá thường được miễn cho Giải trừ', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
    expect(result.camMoiViec).toBe(false);
  });

  it('Nguyệt Phá + Tai Sát tháng Tý/Ngọ: không Đức hard; có Đức vẫn thêm Kị Giải trừ', () => {
    const hard = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
    });
    const coDuc = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.THIEN_DUC],
    });
    expect(hard.camMoiViec).toBe(true);
    expect(coDuc.camMoiViec).toBe(false);
    expect(coDuc.coKy).toBe(true);
    expect(
      coDuc.xungDotDaApDung.some((x) => x.ma === 'GIAI_TRU_Q10_NGUYET_PHA_TY_NGO_KY_BO_SUNG'),
    ).toBe(true);
  });

  it('Nguyệt Phá + Nguyệt Hình tháng Mùi/Thân: không Đức hard; có Đức vẫn thêm Kị', () => {
    const hard = danhGia({
      chiThang: DiaChi.MUI,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_HINH],
    });
    const coDuc = danhGia({
      chiThang: DiaChi.MUI,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_HINH, MaYeuTo.NGUYET_DUC],
    });
    expect(hard.camMoiViec).toBe(true);
    expect(coDuc.camMoiViec).toBe(false);
    expect(coDuc.coKy).toBe(true);
  });

  it('Bình nhật + Tử Thần tháng Hợi đều được giải, không để sót duplicate Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.HOI,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.TU_THAN, MaYeuTo.THOI_DUC],
    });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
    expectTrangThai(result, 'GIAI_TRU_KY_BINH_NHAT', TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result, 'GIAI_TRU_KY_TU_THAN', TrangThaiDongGop.BI_LOAI);
  });

  it('Kiến nhật gặp Đức được giải; Kỷ Mùi không lấy riêng Thiên Đức Hợp', () => {
    const relieved = danhGia({ truc: ThapNhiTruc.KIEN, yeuTo: [MaYeuTo.THIEN_DUC] });
    const kyMui = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      truc: ThapNhiTruc.KIEN,
      yeuTo: [MaYeuTo.THIEN_DUC_HOP],
    });
    expect(relieved.coKy).toBe(false);
    expect(kyMui.coKy).toBe(true);
  });

  it('Du Họa gặp Đức/Hợp hoặc Thiên Xá vẫn Kị Giải trừ', () => {
    for (const cat of [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC_HOP, MaYeuTo.THIEN_XA]) {
      const result = danhGia({ yeuTo: [MaYeuTo.DU_HOA, cat] });
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.some((x) => x.ma === 'GIAI_TRU_Q10_DU_HOA_VAN_KY')).toBe(true);
    }
  });

  it('Tử Khí gặp Đức bỏ Kị, nhưng tháng Thìn/Tuất hội Nguyệt Yếm vẫn Kị', () => {
    const relieved = danhGia({ yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.THIEN_DUC] });
    const blocked = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });
    expect(relieved.coKy).toBe(false);
    expect(relieved.coNen).toBe(true);
    expect(blocked.coKy).toBe(true);
  });

  it('Ngũ Mộ tháng Ngọ/Tý + Nguyệt Đức được giải', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
  });

  it('Tứ Phế + Đức vẫn Kị; Tứ Phế + Nguyệt Phá hard', () => {
    const duc = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.THIEN_DUC] });
    const hard = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(duc.coKy).toBe(true);
    expect(duc.camMoiViec).toBe(false);
    expect(hard.camMoiViec).toBe(true);
  });

  it('Vô Lộc / Thượng Sóc / Tứ Ly / Tứ Tuyệt / Hối không block Giải trừ', () => {
    for (const ma of [
      MaYeuTo.VO_LOC,
      MaYeuTo.THUONG_SOC,
      MaYeuTo.TU_LY,
      MaYeuTo.TU_TUYET,
      MaYeuTo.HOI_NHAT,
    ]) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.THIEN_DUC] });
      expect(result.coKy).toBe(false);
      expect(result.coNen).toBe(true);
    }
  });

  it('Thiên Nguyện đơn độc không tạo Nên Giải trừ', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.THIEN_NGUYEN] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_GIAI_TRU, {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.CANH,
    chiNgay: input.chiNgay ?? DiaChi.TY,
    truc: input.truc ?? ThapNhiTruc.DINH,
    dangThoVuong: false,
    yeuTo: (input.yeuTo ?? []).map(yeuTo),
  });
}

function yeuTo(ma: MaYeuTo): YeuToNgay {
  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon: [] };
}

function expectTrangThai(
  result: ReturnType<typeof danhGia>,
  maRule: string,
  trangThai: TrangThaiDongGop,
) {
  expect(result.dongGop.find((item) => item.quyTac.ma === maRule)?.trangThai).toBe(trangThai);
}
