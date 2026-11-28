import { describe, expect, it } from 'vitest';

import { QUY_TAC_LAP_KHE_UOC_GIAO_DICH } from '../activities/lap-khe-uoc-giao-dich-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('LAP_KHE_UOC_GIAO_DICH Q10 resolver', () => {
  it('Nguyệt Phá + Đức và Tứ Phế + Đức vẫn Kị', () => {
    expect(danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] }).coKy).toBe(true);
    expect(danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] }).coKy).toBe(true);
  });

  it('Kiếp Sát tháng Dần được giải', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.KIEP_SAT] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, 'LAP_KHE_UOC_GIAO_DICH_KY_KIEP_SAT', TrangThaiDongGop.BI_LOAI);
  });

  it('Bình tháng Mão + Nguyệt Đức cân bằng Kị nhưng không xoá Nên giao dịch', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.TAM_HOP],
    });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
  });

  it('Ngũ Ly gặp Tam Hợp/Lục Hợp hoặc Đức/Hợp thì bỏ Kị', () => {
    for (const cat of [MaYeuTo.TAM_HOP, MaYeuTo.LUC_HOP, MaYeuTo.THIEN_DUC]) {
      const result = danhGia({ yeuTo: [MaYeuTo.NGU_LY, cat] });
      expect(result.coKy).toBe(false);
      expectTrangThai(result, 'LAP_KHE_UOC_GIAO_DICH_KY_NGU_LY', TrangThaiDongGop.BI_LOAI);
    }
  });

  it('Ngũ Ly không có cát relief thì giữ Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGU_LY] });
    expect(result.coKy).toBe(true);
  });

  it('Bế nhật không phải baseline Kị của giao dịch', () => {
    const result = danhGia({ truc: ThapNhiTruc.BE, yeuTo: [MaYeuTo.THIEN_NGUYEN] });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
  });

  it('Trường Tinh / Đoản Tinh tạo Kị bổ sung Q10', () => {
    for (const [ma, trace] of [
      [MaYeuTo.TRUONG_TINH, 'LAP_KHE_UOC_GIAO_DICH_Q10_TRUONG_TINH_KY'],
      [MaYeuTo.DOAN_TINH, 'LAP_KHE_UOC_GIAO_DICH_Q10_DOAN_TINH_KY'],
    ] as const) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.THIEN_NGUYEN] });
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.some((x) => x.ma === trace)).toBe(true);
    }
  });

  it('Tứ Phế + Nguyệt Phá vẫn universal hard', () => {
    expect(danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] }).camMoiViec).toBe(true);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_LAP_KHE_UOC_GIAO_DICH, {
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
  state: TrangThaiDongGop,
) {
  expect(result.dongGop.find((item) => item.quyTac.ma === maRule)?.trangThai).toBe(state);
}
