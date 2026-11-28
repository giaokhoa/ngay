import { describe, expect, it } from 'vitest';

import { QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC } from '../activities/di-thuyen-vuot-song-nuoc-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('DI_THUYEN_VUOT_SONG_NUOC Q10 resolver', () => {
  it('baseline không có Nên', () => {
    const result = danhGia({});
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
  });

  it('Chiêu Diêu gặp Thiên Xá được giải', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.CHIEU_DIEU, MaYeuTo.THIEN_XA] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.CHIEU_DIEU, TrangThaiDongGop.BI_LOAI);
  });

  it('Bát Phong gặp Lục Hợp được giải', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.BAT_PHONG, MaYeuTo.LUC_HOP] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.BAT_PHONG, TrangThaiDongGop.BI_LOAI);
  });

  it('Cửu Khảm gặp Đức/Hợp vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.CUU_KHAM, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, MaYeuTo.CUU_KHAM, TrangThaiDongGop.HIEU_LUC);
  });

  it('Xúc Thủy Long gặp Thiên Nguyện vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.XUC_THUY_LONG, MaYeuTo.THIEN_NGUYEN] });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, MaYeuTo.XUC_THUY_LONG, TrangThaiDongGop.HIEU_LUC);
  });

  it.each([DiaChi.DAN, DiaChi.THAN, DiaChi.TI, DiaChi.HOI, DiaChi.THIN, DiaChi.TUAT] as const)(
    'Hàm Trì tháng %s bỏ Kị theo exact Đại Thời branch',
    (chiThang) => {
      const result = danhGia({ chiThang, yeuTo: [MaYeuTo.DAI_THOI] });
      expect(result.coKy).toBe(false);
      expectTrangThai(result, MaYeuTo.DAI_THOI, TrangThaiDongGop.BI_LOAI);
    },
  );

  it('Hàm Trì tháng Sửu/Mùi chỉ hai Đức giải; Đức Hợp một mình không đủ', () => {
    const thienDuc = danhGia({
      chiThang: DiaChi.SUU,
      yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.THIEN_DUC],
    });
    const hopOnly = danhGia({
      chiThang: DiaChi.SUU,
      yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.THIEN_DUC_HOP],
    });
    expect(thienDuc.coKy).toBe(false);
    expect(hopOnly.coKy).toBe(true);
  });

  it('Hàm Trì tháng Tý/Ngọ + Nguyệt Đức Hợp và tháng Dậu + Nguyệt Đức cân bằng', () => {
    const ty = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.NGUYET_DUC_HOP],
    });
    const dau = danhGia({
      chiThang: DiaChi.DAU,
      yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.NGUYET_DUC],
    });
    expect(ty.coKy).toBe(false);
    expect(dau.coKy).toBe(false);
  });

  it('Hàm Trì tháng Mão: có Đức/Hợp thì bỏ Kị; không có thì chư sự giai kị', () => {
    const relieved = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.NGUYET_DUC_HOP],
    });
    const hard = danhGia({ chiThang: DiaChi.MAO, yeuTo: [MaYeuTo.DAI_THOI] });
    expect(relieved.coKy).toBe(false);
    expect(hard.camMoiViec).toBe(true);
    expect(hard.coKy).toBe(true);
  });

  it('global Q4/Q10 hard-day vẫn thắng dù không có 5 baseline Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.DAU,
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
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_DI_THUYEN_VUOT_SONG_NUOC, {
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

function expectTrangThai(result: ReturnType<typeof danhGia>, ma: MaYeuTo, state: TrangThaiDongGop) {
  expect(
    result.dongGop.find(
      (item) => item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === ma,
    )?.trangThai,
  ).toBe(state);
}
