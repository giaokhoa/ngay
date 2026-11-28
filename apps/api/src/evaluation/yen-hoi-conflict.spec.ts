import { describe, expect, it } from 'vitest';

import { QUY_TAC_YEN_HOI } from '../activities/yen-hoi-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('YEN_HOI Q10 conflict resolver', () => {
  it('Ngũ Ly Thân gặp Thiên Đức bỏ Kị; Dậu vẫn Kị độc lập dù Ngũ Ly được giải', () => {
    const than = danhGia({
      chiNgay: DiaChi.THAN,
      yeuTo: [MaYeuTo.NGU_LY, MaYeuTo.THIEN_DUC],
    });
    const dau = danhGia({
      chiNgay: DiaChi.DAU,
      yeuTo: [MaYeuTo.NGU_LY, MaYeuTo.THIEN_DUC],
    });

    expect(than.coKy).toBe(false);
    expect(than.coNen).toBe(true);
    expectTrangThai(than.dongGop, MaYeuTo.NGU_LY, TrangThaiDongGop.BI_LOAI);

    expect(dau.coKy).toBe(true);
    expectTrangThai(dau.dongGop, MaYeuTo.NGU_LY, TrangThaiDongGop.BI_LOAI);
    expect(
      dau.dongGop.some(
        (item) =>
          item.quyTac.dieuKien.loai === 'CHI_NGAY' &&
          item.quyTac.dieuKien.chi === DiaChi.DAU &&
          item.trangThai === TrangThaiDongGop.HIEU_LUC,
      ),
    ).toBe(true);
  });

  it('Nguyệt Hại Mão gặp Thiên Đức bỏ Kị; Thìn gặp Đức Hợp cân bằng cả Nên/Kị', () => {
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
    expectTrangThai(thin.dongGop, MaYeuTo.NGUYET_HAI, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(thin.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hại Tý delegate Nguyệt Sát và dùng kết quả nhánh nặng hơn', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.NGUYET_SAT, MaYeuTo.NGUYET_DUC_HOP],
    });

    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
    expect(result.xungDotDaApDung.some((x) => x.ma.includes('NGUYET_HAI_TY_NGO'))).toBe(true);
    expect(result.xungDotDaApDung.some((x) => x.ma.includes('NGUYET_SAT_TY_NGO'))).toBe(true);
  });

  it('Nguyệt Yếm Dần + Nguyệt Đức bỏ Kị Yến hội, khác residual của Di chuyển', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });

    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Yếm Mão vẫn cấm mọi việc; Tứ Phế + Đức vẫn Kị', () => {
    const hard = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });
    const tuPhe = danhGia({
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC],
    });

    expect(hard.camMoiViec).toBe(true);
    expect(hard.coNen).toBe(false);
    expect(tuPhe.camMoiViec).toBe(false);
    expect(tuPhe.coKy).toBe(true);
  });

  it('Kiếp Sát tháng Dần bỏ Kị Yến hội theo residual Q10; Nguyệt Phá + Đức vẫn Kị', () => {
    const kiep = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.KIEP_SAT] });
    const pha = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });

    expect(kiep.coKy).toBe(false);
    expect(pha.coKy).toBe(true);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_YEN_HOI, {
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
