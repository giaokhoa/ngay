import { describe, expect, it } from 'vitest';

import { QUY_TAC_NHAN_NAP_GIA_SUC } from '../activities/nhan-nap-gia-suc-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('NHAN_NAP_GIA_SUC Q10 resolver', () => {
  it('Thu nhật là Nên riêng của 納畜, không bị kéo Kị từ 牧養', () => {
    const result = danhGia({ truc: ThapNhiTruc.THU });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('Nguyệt Phá gặp Đức vẫn Kị như 牧養', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expectYeuTo(result, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
  });

  it('Tử Thần tháng Hợi được giải; Tử Khí không phải Kị', () => {
    const deathSpirit = danhGia({ chiThang: DiaChi.HOI, yeuTo: [MaYeuTo.TU_THAN] });
    const deathQi = danhGia({ yeuTo: [MaYeuTo.TU_KHI] });
    expect(deathSpirit.coKy).toBe(false);
    expectYeuTo(deathSpirit, MaYeuTo.TU_THAN, TrangThaiDongGop.BI_LOAI);
    expect(deathQi.coKy).toBe(false);
    expect(
      deathQi.dongGop.some(
        (item) =>
          item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === MaYeuTo.TU_KHI,
      ),
    ).toBe(false);
  });

  it('Nguyệt Hại / Nguyệt Yếm relief giống 牧養', () => {
    const harm = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.THIEN_DUC],
    });
    const aversion = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    expect(harm.coKy).toBe(false);
    expect(aversion.coKy).toBe(false);
    expectYeuTo(harm, MaYeuTo.NGUYET_HAI, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(aversion, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
  });

  it.each([
    [MaYeuTo.TRUONG_TINH, 'NHAN_NAP_GIA_SUC_Q10_TRUONG_TINH_KY'],
    [MaYeuTo.DOAN_TINH, 'NHAN_NAP_GIA_SUC_Q10_DOAN_TINH_KY'],
  ] as const)('%s là Q10-only supplemental Kị', (factor, maRule) => {
    const result = danhGia({ yeuTo: [factor, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.some((item) => item.ma === maRule)).toBe(true);
  });

  it('Nguyệt Kị chỉ bỏ Nên, không tự tạo Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.THU, yeuTo: [MaYeuTo.NGUYET_KY] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expect(
      result.xungDotDaApDung.some((item) => item.ma === 'NHAN_NAP_GIA_SUC_Q10_NGUYET_KY_BO_NEN'),
    ).toBe(true);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_NHAN_NAP_GIA_SUC, {
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

function expectYeuTo(result: ReturnType<typeof danhGia>, ma: MaYeuTo, state: TrangThaiDongGop) {
  expect(
    result.dongGop.find(
      (item) => item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === ma,
    )?.trangThai,
  ).toBe(state);
}
