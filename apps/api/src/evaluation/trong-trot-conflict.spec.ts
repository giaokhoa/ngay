import { describe, expect, it } from 'vitest';

import { QUY_TAC_TRONG_TROT } from '../activities/trong-trot-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('TRONG_TROT Q10 resolver', () => {
  it('Nguyệt Kiến / Thổ Phủ / Nguyệt Phá gặp Đức vẫn Kị', () => {
    for (const ma of [MaYeuTo.NGUYET_KIEN, MaYeuTo.THO_PHU, MaYeuTo.NGUYET_PHA]) {
      expect(danhGia({ yeuTo: [ma, MaYeuTo.THIEN_DUC] }).coKy).toBe(true);
    }
  });

  it('Tử Thần tháng Hợi được giải theo exact Bình nhật branch', () => {
    const result = danhGia({ chiThang: DiaChi.HOI, yeuTo: [MaYeuTo.TU_THAN] });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.TU_THAN, TrangThaiDongGop.BI_LOAI);
    expect(result.xungDotDaApDung.some((item) => /NGUYET_|TRUC_/.test(item.moTa))).toBe(false);
  });

  it('Nguyệt Yếm + Địa Hỏa tháng Dần vẫn Kị Trồng trọt dù gặp Nguyệt Đức', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.DIA_HOA, MaYeuTo.NGUYET_DUC],
    });
    expectYeuTo(result, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.HIEU_LUC);
    expectYeuTo(result, MaYeuTo.DIA_HOA, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Tử Khí gặp Đức được giải, nhưng Thìn/Tuất hội Nguyệt Yếm vẫn Kị', () => {
    const relieved = danhGia({ yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.THIEN_DUC] });
    const blocked = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });
    expect(relieved.coKy).toBe(false);
    expect(blocked.coKy).toBe(true);
    expectYeuTo(blocked, MaYeuTo.TU_KHI, TrangThaiDongGop.HIEU_LUC);
  });

  it('Cửu Tiêu / Cửu Khảm gặp Đức vẫn Kị trồng trọt', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.CUU_KHAM, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expectYeuTo(result, MaYeuTo.CUU_KHAM, TrangThaiDongGop.HIEU_LUC);
  });

  it('Thổ Phù / Địa Nang gặp Đức-Xá-Nguyện vẫn Kị', () => {
    for (const factors of [
      [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
      [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA],
      [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_NGUYEN],
    ] as const) {
      expect(danhGia({ yeuTo: factors }).coKy).toBe(true);
    }
  });

  it('Ất nhật và Thổ Vượng là Kị typed, không cần thần sát giả', () => {
    expect(danhGia({ canNgay: ThienCan.AT }).coKy).toBe(true);
    expect(danhGia({ dangThoVuong: true }).coKy).toBe(true);
  });

  it('Khai nhật + Ngũ Phủ là Nên khi không có Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.KHAI, yeuTo: [MaYeuTo.NGU_PHU] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('Nguyệt Kị chỉ bỏ Nên trồng trọt, không tự tạo Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.KHAI, yeuTo: [MaYeuTo.NGUYET_KY] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expect(
      result.xungDotDaApDung.some((item) => item.ma === 'TRONG_TROT_Q10_NGUYET_KY_BO_NEN'),
    ).toBe(true);
  });

  it('Vô Lộc bỏ Nên; Tứ Ly tạo Kị bổ sung cho Trồng trọt', () => {
    const voLoc = danhGia({ truc: ThapNhiTruc.KHAI, yeuTo: [MaYeuTo.VO_LOC] });
    const tuLy = danhGia({ truc: ThapNhiTruc.KHAI, yeuTo: [MaYeuTo.TU_LY] });
    expect(voLoc.coNen).toBe(false);
    expect(voLoc.coKy).toBe(false);
    expect(tuLy.coKy).toBe(true);
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
  return service.danhGia(QUY_TAC_TRONG_TROT, {
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

function expectYeuTo(result: ReturnType<typeof danhGia>, ma: MaYeuTo, state: TrangThaiDongGop) {
  expect(
    result.dongGop.find(
      (item) => item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === ma,
    )?.trangThai,
  ).toBe(state);
}
