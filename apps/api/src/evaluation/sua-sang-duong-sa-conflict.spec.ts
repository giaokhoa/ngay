import { describe, expect, it } from 'vitest';

import { QUY_TAC_SUA_SANG_DUONG_SA } from '../activities/sua-sang-duong-sa-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('SUA_SANG_DUONG_SA Q10 resolver', () => {
  it('Bình nhật là Nên', () => {
    const result = danhGia({ truc: ThapNhiTruc.BINH });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('ordinary Nguyệt Phá/Kiếp Sát/Nguyệt Hình/Tứ Phế không tự tạo Kị', () => {
    for (const factor of [
      MaYeuTo.NGUYET_PHA,
      MaYeuTo.KIEP_SAT,
      MaYeuTo.NGUYET_HINH,
      MaYeuTo.TU_PHE,
    ]) {
      const result = danhGia({ truc: ThapNhiTruc.BINH, yeuTo: [factor] });
      expect(result.coNen, factor).toBe(true);
      expect(result.coKy, factor).toBe(false);
    }
  });

  it('Nguyệt Yếm là Kị nhưng nhánh Dần + Nguyệt Đức được giải theo Q10', () => {
    const normal = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });
    const relieved = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    expect(normal.coKy).toBe(true);
    expect(relieved.coKy).toBe(false);
    expectTrangThai(relieved, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
  });

  it('Thổ Phủ, Thổ Phù/Địa Nang và Thổ Vượng giữ Kị', () => {
    for (const factors of [
      [MaYeuTo.THO_PHU, MaYeuTo.NGUYET_AN],
      [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
      [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA],
    ] as const) {
      expect(danhGia({ truc: ThapNhiTruc.BINH, yeuTo: factors }).coKy).toBe(true);
    }
    const thoVuong = danhGia({ truc: ThapNhiTruc.BINH, dangThoVuong: true });
    expect(thoVuong.coKy).toBe(true);
  });

  it('Vô Lộc và Thượng Sóc/Tứ Ly/Tứ Tuyệt/Hối không suppress Bình nhật Nên', () => {
    for (const factor of [
      MaYeuTo.VO_LOC,
      MaYeuTo.THUONG_SOC,
      MaYeuTo.TU_LY,
      MaYeuTo.TU_TUYET,
      MaYeuTo.HOI_NHAT,
    ] as const) {
      const result = danhGia({ truc: ThapNhiTruc.BINH, yeuTo: [factor] });
      expect(result.coNen, factor).toBe(true);
      expect(result.coKy, factor).toBe(false);
    }
  });

  it('global hard-day vẫn thắng dù Nguyệt Phá/Tai Sát không phải baseline Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.DAU,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    });
    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  dangThoVuong?: boolean;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_SUA_SANG_DUONG_SA, {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.CANH,
    chiNgay: input.chiNgay ?? DiaChi.TY,
    truc: input.truc ?? ThapNhiTruc.DINH,
    dangThoVuong: input.dangThoVuong ?? false,
    yeuTo: (input.yeuTo ?? []).map(yeuTo),
  });
}

function yeuTo(ma: MaYeuTo): YeuToNgay {
  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon: [] };
}

function expectTrangThai(result: ReturnType<typeof danhGia>, ma: MaYeuTo, state: TrangThaiDongGop) {
  expect(
    result.dongGop.find(
      (item) => item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === ma,
    )?.trangThai,
  ).toBe(state);
}
