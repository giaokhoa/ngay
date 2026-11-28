import { describe, expect, it } from 'vitest';

import { QUY_TAC_KHANH_THUONG } from '../activities/khanh-thuong-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('KHANH_THUONG Q10 conflict resolver', () => {
  it('Ngũ Ly Thân + Thiên Đức bỏ Kị và vẫn Nên', () => {
    const result = danhGia({
      chiNgay: DiaChi.THAN,
      yeuTo: [MaYeuTo.NGU_LY, MaYeuTo.THIEN_DUC],
    });

    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
    expectTrangThai(result.dongGop, MaYeuTo.NGU_LY, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.HIEU_LUC);
  });

  it('ngày Dậu chỉ bỏ Nên Chúc mừng ban thưởng, không tạo Kị riêng', () => {
    const result = danhGia({
      chiNgay: DiaChi.DAU,
      yeuTo: [MaYeuTo.NGU_LY, MaYeuTo.THIEN_DUC],
    });

    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
    expectTrangThai(result.dongGop, MaYeuTo.NGU_LY, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
    expect(result.xungDotDaApDung.some((trace) => trace.ma === 'KHANH_THUONG_Q10_DAU_BO_NEN')).toBe(
      true,
    );
  });

  it('Dậu + cát thần nhưng không Ngũ Ly vẫn không Nên và không Kị', () => {
    const result = danhGia({ chiNgay: DiaChi.DAU, yeuTo: [MaYeuTo.THIEN_DUC] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
  });

  it('Nguyệt Hại Mão + Thiên Đức bỏ Kị; Thìn + Đức Hợp cân bằng', () => {
    const mao = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.THIEN_DUC],
    });
    const thin = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.THIEN_DUC_HOP],
    });

    expect(mao.coKy).toBe(false);
    expect(mao.coNen).toBe(true);
    expect(thin.coKy).toBe(false);
    expect(thin.coNen).toBe(false);
  });

  it('Nguyệt Yếm Dần + Nguyệt Đức bỏ Kị; Mão vẫn cấm mọi việc', () => {
    const relieved = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    const hard = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });

    expect(relieved.coKy).toBe(false);
    expect(relieved.coNen).toBe(true);
    expect(hard.camMoiViec).toBe(true);
    expect(hard.coNen).toBe(false);
  });

  it('Nguyệt Phá + Đức và Tứ Phế + Đức vẫn Kị', () => {
    const pha = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    const tuPhe = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] });

    expect(pha.coKy).toBe(true);
    expect(tuPhe.coKy).toBe(true);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_KHANH_THUONG, {
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
  dongGop: ReturnType<typeof danhGia>['dongGop'],
  ma: MaYeuTo,
  trangThai: TrangThaiDongGop,
) {
  expect(
    dongGop.find((item) => item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === ma)
      ?.trangThai,
  ).toBe(trangThai);
}
