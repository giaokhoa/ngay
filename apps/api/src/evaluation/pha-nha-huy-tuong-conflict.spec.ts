import { describe, expect, it } from 'vitest';

import { QUY_TAC_PHA_NHA_HUY_TUONG } from '../activities/pha-nha-huy-tuong-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('PHA_NHA_HUY_TUONG Q10 resolver', () => {
  it('Nguyệt Phá đơn thuần là Nên, không phải Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('Tai Sát ở Tứ Trọng theo Nguyệt Phá nên bỏ Kị và giữ Nên Nguyệt Phá', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
    });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.TAI_SAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Kiếp Sát Tứ Mộ cân bằng thì bỏ cả Kị lẫn Nên Nguyệt Phá', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.KIEP_SAT],
    });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Kị nhật chỉ bỏ Nên phá nhà, không tự tạo Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_KY] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expect(
      result.xungDotDaApDung.some((x) => x.ma === 'PHA_NHA_HUY_TUONG_Q10_NGUYET_KY_BO_NEN'),
    ).toBe(true);
  });

  it('Vô Lộc và Thượng Sóc/Tứ Ly/Tứ Tuyệt/Hối không suppress Nguyệt Phá Nên', () => {
    for (const factor of [
      MaYeuTo.VO_LOC,
      MaYeuTo.THUONG_SOC,
      MaYeuTo.TU_LY,
      MaYeuTo.TU_TUYET,
      MaYeuTo.HOI_NHAT,
    ] as const) {
      const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, factor] });
      expect(result.coNen, factor).toBe(true);
      expect(result.coKy, factor).toBe(false);
    }
  });

  it('Nguyệt Kiến/Thổ Phủ và earth blockers vẫn Kị', () => {
    for (const factors of [
      [MaYeuTo.NGUYET_PHA, MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC],
      [MaYeuTo.NGUYET_PHA, MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
      [MaYeuTo.NGUYET_PHA, MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA],
    ] as const) {
      const result = danhGia({ yeuTo: factors });
      expect(result.coKy).toBe(true);
    }
  });

  it('Thổ Vượng dụng sự giữ Kị', () => {
    const result = danhGia({ dangThoVuong: true, yeuTo: [MaYeuTo.NGUYET_PHA] });
    expect(result.coKy).toBe(true);
  });

  it('Mão: Nguyệt Phá + Tai Sát + Nguyệt Yếm vẫn 諸事皆忌', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    });
    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(false);
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
  return service.danhGia(QUY_TAC_PHA_NHA_HUY_TUONG, {
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
