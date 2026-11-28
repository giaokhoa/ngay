import { describe, expect, it } from 'vitest';

import { QUY_TAC_SUA_BUONG_SAN_PHU } from '../activities/sua-buong-san-phu-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('SUA_BUONG_SAN_PHU Q10 resolver', () => {
  it('Nguyệt Kiến và Thổ Phủ gặp Đức vẫn Kị sửa buồng sản phụ', () => {
    for (const ma of [MaYeuTo.NGUYET_KIEN, MaYeuTo.THO_PHU]) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.THIEN_DUC] });
      expect(result.coKy).toBe(true);
    }
  });

  it('Tử Thần tháng Hợi được giải theo exact branch Bình nhật', () => {
    const result = danhGia({ chiThang: DiaChi.HOI, yeuTo: [MaYeuTo.TU_THAN] });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.TU_THAN, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hại Mão gặp Thiên Đức được giải', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.THIEN_DUC],
    });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.NGUYET_HAI, TrangThaiDongGop.BI_LOAI);
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

  it('Ngũ Mộ tháng Ngọ + Nguyệt Đức được giải', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
  });

  it('Thổ Phù và Địa Nang gặp cát vẫn Kị', () => {
    for (const ma of [MaYeuTo.THO_PHU_TIN, MaYeuTo.DIA_NANG]) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.THIEN_XA] });
      expect(result.coKy).toBe(true);
    }
  });

  it('sau Thổ Vượng dụng sự giữ Kị', () => {
    const result = danhGia({ dangThoVuong: true, yeuTo: [MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
  });

  it('Khai nhật là Nên khi không có Kị khác', () => {
    const result = danhGia({ truc: ThapNhiTruc.KHAI });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
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
  return service.danhGia(QUY_TAC_SUA_BUONG_SAN_PHU, {
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
