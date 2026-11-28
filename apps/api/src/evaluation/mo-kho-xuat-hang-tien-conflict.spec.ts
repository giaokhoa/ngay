import { describe, expect, it } from 'vitest';

import { QUY_TAC_MO_KHO_XUAT_HANG_TIEN } from '../activities/mo-kho-xuat-hang-tien-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('MO_KHO_XUAT_HANG_TIEN Q10 resolver', () => {
  it('Nguyệt Kiến gặp Thiên Đức được giải', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, 'MO_KHO_XUAT_HANG_TIEN_KY_NGUYET_KIEN', TrangThaiDongGop.BI_LOAI);
  });

  it('Kỷ Mùi tháng Mùi không lấy riêng Thiên Đức Hợp để giải Nguyệt Kiến', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC_HOP],
    });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, 'MO_KHO_XUAT_HANG_TIEN_KY_NGUYET_KIEN', TrangThaiDongGop.HIEU_LUC);
  });

  it('Ngũ Hư gặp Đức/Hợp hoặc Lục Hợp thì bỏ Kị', () => {
    for (const cat of [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC_HOP, MaYeuTo.LUC_HOP]) {
      const result = danhGia({ yeuTo: [MaYeuTo.NGU_HU, cat] });
      expect(result.coKy).toBe(false);
      expectTrangThai(result, 'MO_KHO_XUAT_HANG_TIEN_KY_NGU_HU', TrangThaiDongGop.BI_LOAI);
    }
  });

  it('Ngũ Hư không có cát relief thì giữ Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGU_HU] });
    expect(result.coKy).toBe(true);
  });

  it('Thiên Tặc gặp Đức/Hợp vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.THIEN_TAC, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, 'MO_KHO_XUAT_HANG_TIEN_KY_THIEN_TAC', TrangThaiDongGop.HIEU_LUC);
  });

  it('ngày Giáp là direct Kị', () => {
    const result = danhGia({ canNgay: ThienCan.GIAP, yeuTo: [MaYeuTo.NGUYET_AN] });
    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(true);
    expect(
      result.dongGop.some((item) => item.quyTac.ma === 'MO_KHO_XUAT_HANG_TIEN_KY_CAN_GIAP'),
    ).toBe(true);
  });

  it('月煞/月虚 chỉ một contribution và nhánh Mão + Nguyệt Đức + Thiên Nguyện được giải', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_SAT, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_NGUYEN],
    });
    expect(result.coKy).toBe(false);
    expect(
      result.dongGop.filter((item) => item.quyTac.ma === 'MO_KHO_XUAT_HANG_TIEN_KY_NGUYET_SAT'),
    ).toHaveLength(1);
    expectTrangThai(result, 'MO_KHO_XUAT_HANG_TIEN_KY_NGUYET_SAT', TrangThaiDongGop.BI_LOAI);
  });

  it('shared Q10: Vô Lộc bỏ Nên; Tứ Ly tạo Kị bổ sung', () => {
    const voLoc = danhGia({ yeuTo: [MaYeuTo.VO_LOC, MaYeuTo.NGUYET_AN] });
    const tuLy = danhGia({ yeuTo: [MaYeuTo.TU_LY, MaYeuTo.NGUYET_AN] });
    expect(voLoc.coNen).toBe(false);
    expect(voLoc.coKy).toBe(false);
    expect(tuLy.coKy).toBe(true);
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
  return service.danhGia(QUY_TAC_MO_KHO_XUAT_HANG_TIEN, {
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
