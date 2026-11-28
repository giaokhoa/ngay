import { describe, expect, it } from 'vitest';

import { QUY_TAC_CAI_TANG_KHAI_TOAN } from '../activities/cai-tang-khai-toan-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('CAI_TANG_KHAI_TOAN Q10 resolver', () => {
  it('Ô Phệ Đối đơn thuần là Nên', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.O_PHE_DOI] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('Phục/Trọng còn Kị thì loại Nên Ô Phệ Đối', () => {
    for (const factor of [MaYeuTo.PHUC_NHAT, MaYeuTo.TRONG_NHAT] as const) {
      const result = danhGia({ yeuTo: [factor, MaYeuTo.O_PHE_DOI] });
      expect(result.coNen, factor).toBe(false);
      expect(result.coKy, factor).toBe(true);
      expectTrangThai(result, MaYeuTo.O_PHE_DOI, TrangThaiDongGop.BI_LOAI);
    }
  });

  it('Phục/Trọng gặp cát giải: bỏ Kị nhưng vẫn không chú Nên Ô Phệ Đối', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.PHUC_NHAT, MaYeuTo.O_PHE_DOI, MaYeuTo.THIEN_DUC],
    });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.PHUC_NHAT, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result, MaYeuTo.O_PHE_DOI, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Kiến gặp nhóm cát source nêu thì bỏ Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.NGUYET_KIEN, TrangThaiDongGop.BI_LOAI);
  });

  it('Ngũ Mộ tháng Ngọ/Tý gặp Nguyệt Đức thì bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
  });

  it('CAN_BANG loại cả Kị và Nên Ô Phệ Đối', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.O_PHE_DOI],
    });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result, MaYeuTo.O_PHE_DOI, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Kị chỉ bỏ Nên, không tự tạo Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_KY, MaYeuTo.O_PHE_DOI] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expect(
      result.xungDotDaApDung.some((x) => x.ma === 'CAI_TANG_KHAI_TOAN_Q10_NGUYET_KY_BO_NEN'),
    ).toBe(true);
  });

  it('global hard-day vẫn thắng', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.DAU,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM, MaYeuTo.O_PHE_DOI],
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
  return service.danhGia(QUY_TAC_CAI_TANG_KHAI_TOAN, {
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
