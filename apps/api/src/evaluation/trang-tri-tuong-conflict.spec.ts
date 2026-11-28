import { describe, expect, it } from 'vitest';

import { QUY_TAC_TRANG_TRI_TUONG } from '../activities/trang-tri-tuong-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('TRANG_TRI_TUONG Q10 resolver', () => {
  it('Bình nhật là Nên; Tử Thần cùng vị trí không tạo Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.BINH, yeuTo: [MaYeuTo.TU_THAN] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('Nguyệt Phá gặp Đức vẫn Kị', () => {
    const result = danhGia({
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(true);
    expectTrangThai(result, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
  });

  it('Thổ Phủ và Thổ Phù/Địa Nang giữ Kị theo semantic đất', () => {
    for (const factors of [
      [MaYeuTo.THO_PHU, MaYeuTo.NGUYET_AN],
      [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
      [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA],
    ] as const) {
      const result = danhGia({ truc: ThapNhiTruc.BINH, yeuTo: factors });
      expect(result.coKy).toBe(true);
    }
  });

  it('Thổ Vượng dụng sự giữ Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.BINH, dangThoVuong: true });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(true);
    expect(
      result.dongGop.some(
        (item) =>
          item.quyTac.dieuKien.loai === 'THO_VUONG' && item.trangThai === TrangThaiDongGop.HIEU_LUC,
      ),
    ).toBe(true);
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

  it('canonical Q4/Q10 諸事皆忌 vẫn thắng', () => {
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
  return service.danhGia(QUY_TAC_TRANG_TRI_TUONG, {
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
