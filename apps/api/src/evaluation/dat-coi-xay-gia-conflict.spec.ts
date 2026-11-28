import { describe, expect, it } from 'vitest';

import { QUY_TAC_DAT_COI_XAY_GIA } from '../activities/dat-coi-xay-gia-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('DAT_COI_XAY_GIA Q10 resolver', () => {
  it('Bình nhật / Tử Thần không phải Kị 安碓磑', () => {
    const result = danhGia({
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.TU_THAN, MaYeuTo.TAM_HOP],
    });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
    expect(
      result.dongGop.some(
        (item) =>
          item.quyTac.dieuKien.loai === 'TRUC' && item.quyTac.dieuKien.truc === ThapNhiTruc.BINH,
      ),
    ).toBe(false);
  });

  it('Nguyệt Phá gặp Đức vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
  });

  it('Thổ Phủ gặp cát vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.THO_PHU, MaYeuTo.NGUYET_AN] });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, MaYeuTo.THO_PHU, TrangThaiDongGop.HIEU_LUC);
  });

  it('Thổ Phù / Địa Nang gặp Đức/Xá/Nguyện vẫn Kị', () => {
    for (const [hung, cat] of [
      [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
      [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA],
      [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_NGUYEN],
    ] as const) {
      const result = danhGia({ yeuTo: [hung, cat] });
      expect(result.coKy).toBe(true);
      expectTrangThai(result, hung, TrangThaiDongGop.HIEU_LUC);
    }
  });

  it('Thổ Vượng dụng sự giữ Kị', () => {
    const result = danhGia({ dangThoVuong: true, yeuTo: [MaYeuTo.TAM_HOP] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(true);
    expect(result.danhGiaRuleThoVuong).toBe(true);
  });

  it('Khai nhật + Tam Hợp đều là Nên khi không có Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.KHAI, yeuTo: [MaYeuTo.TAM_HOP] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('shared Q10: Vô Lộc bỏ Nên; Tứ Ly tạo Kị bổ sung', () => {
    const voLoc = danhGia({ yeuTo: [MaYeuTo.VO_LOC, MaYeuTo.TAM_HOP] });
    const tuLy = danhGia({ yeuTo: [MaYeuTo.TU_LY, MaYeuTo.TAM_HOP] });
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
  const result = service.danhGia(QUY_TAC_DAT_COI_XAY_GIA, {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.CANH,
    chiNgay: input.chiNgay ?? DiaChi.TY,
    truc: input.truc ?? ThapNhiTruc.DINH,
    dangThoVuong: input.dangThoVuong ?? false,
    yeuTo: (input.yeuTo ?? []).map(yeuTo),
  });
  return Object.assign(result, {
    danhGiaRuleThoVuong: result.dongGop.some(
      (item) =>
        item.quyTac.dieuKien.loai === 'THO_VUONG' && item.trangThai === TrangThaiDongGop.HIEU_LUC,
    ),
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
