import { describe, expect, it } from 'vitest';

import { QUY_TAC_PHA_VO_DAT } from '../activities/pha-vo-dat-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('PHA_VO_DAT Q10 resolver', () => {
  it('Ô Phệ Đối là Nên độc lập', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.O_PHE_DOI] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('Nguyệt Kiến / Thổ Phủ vẫn Kị dù gặp cát', () => {
    for (const factors of [
      [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC],
      [MaYeuTo.THO_PHU, MaYeuTo.NGUYET_DUC],
    ] as const) {
      const result = danhGia({ yeuTo: factors });
      expect(result.coKy).toBe(true);
    }
  });

  it('Ngũ Mộ tháng Ngọ + Nguyệt Đức bỏ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
  });

  it('Thổ Phù / Địa Nang vẫn Kị với Đức/Xá', () => {
    for (const factors of [
      [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
      [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA],
    ] as const) {
      expect(danhGia({ yeuTo: factors }).coKy).toBe(true);
    }
  });

  it('Phục/Trọng còn Kị thì loại Nên Ô Phệ/Ô Phệ Đối', () => {
    const phuc = danhGia({ yeuTo: [MaYeuTo.PHUC_NHAT, MaYeuTo.O_PHE] });
    const trong = danhGia({ yeuTo: [MaYeuTo.TRONG_NHAT, MaYeuTo.O_PHE_DOI] });
    expect(phuc.coNen).toBe(false);
    expect(phuc.coKy).toBe(true);
    expectTrangThai(phuc, MaYeuTo.O_PHE, TrangThaiDongGop.BI_LOAI);
    expect(trong.coNen).toBe(false);
    expect(trong.coKy).toBe(true);
    expectTrangThai(trong, MaYeuTo.O_PHE_DOI, TrangThaiDongGop.BI_LOAI);
  });

  it('Phục Nhật gặp Thiên Đức bỏ Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.PHUC_NHAT, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.PHUC_NHAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Kị chỉ bỏ Nên, không tự tạo Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.O_PHE_DOI, MaYeuTo.NGUYET_KY] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
  });

  it('CAN_BANG loại cả blocker và Nên Minh Phệ', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.O_PHE_DOI],
    });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expectTrangThai(result, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result, MaYeuTo.O_PHE_DOI, TrangThaiDongGop.BI_LOAI);
  });

  it('Thổ Vượng dụng sự giữ Kị', () => {
    expect(danhGia({ dangThoVuong: true, yeuTo: [MaYeuTo.O_PHE] }).coKy).toBe(true);
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
  return service.danhGia(QUY_TAC_PHA_VO_DAT, {
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
