import { describe, expect, it } from 'vitest';

import { QUY_TAC_CAU_TU } from '../activities/cau-tu-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('CAU_TU Q10 conflict resolver', () => {
  it('Thiên Cẩu hoặc ngày Dần chỉ bỏ Nên Cầu tự, không tạo Kị riêng', () => {
    const thienCau = danhGia({
      chiNgay: DiaChi.TUAT,
      yeuTo: [MaYeuTo.THIEN_CAU, MaYeuTo.THIEN_DUC],
    });
    const dan = danhGia({ chiNgay: DiaChi.DAN, yeuTo: [MaYeuTo.THIEN_DUC] });

    expect(thienCau.coNen).toBe(false);
    expect(thienCau.coKy).toBe(false);
    expect(dan.coNen).toBe(false);
    expect(dan.coKy).toBe(false);
  });

  it('Kiến thường Kị; gặp Thiên Đức thì bỏ Kị', () => {
    const thuong = danhGia({ truc: ThapNhiTruc.KIEN });
    const coDuc = danhGia({ truc: ThapNhiTruc.KIEN, yeuTo: [MaYeuTo.THIEN_DUC] });
    expect(thuong.coKy).toBe(true);
    expect(coDuc.coKy).toBe(false);
    expect(coDuc.coNen).toBe(true);
    expectTrangThai(coDuc, 'CAU_TU_KY_KIEN_NHAT', TrangThaiDongGop.BI_LOAI);
  });

  it('Kỷ Mùi tháng Mùi không lấy riêng Thiên Đức Hợp để giải Kị Kiến', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      truc: ThapNhiTruc.KIEN,
      yeuTo: [MaYeuTo.THIEN_DUC_HOP],
    });
    expect(result.coKy).toBe(true);
    expect(
      result.xungDotDaApDung.some((x) => x.ma === 'CAU_TU_Q10_KIEN_KY_MUI_DUC_HOP_VAN_KY'),
    ).toBe(true);
  });

  it('Du Họa gặp Đức/Hợp hoặc Thiên Xá vẫn Kị Cầu tự', () => {
    for (const cat of [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC_HOP, MaYeuTo.THIEN_XA]) {
      const result = danhGia({ yeuTo: [MaYeuTo.DU_HOA, cat] });
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.some((x) => x.ma === 'CAU_TU_Q10_DU_HOA_VAN_KY')).toBe(true);
    }
  });

  it('Vô Lộc / Thượng Sóc / Tứ Ly / Tứ Tuyệt / Hối giữ Kị inherited', () => {
    for (const ma of [
      MaYeuTo.VO_LOC,
      MaYeuTo.THUONG_SOC,
      MaYeuTo.TU_LY,
      MaYeuTo.TU_TUYET,
      MaYeuTo.HOI_NHAT,
    ]) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.THIEN_DUC] });
      expect(result.coKy).toBe(true);
    }
  });

  it('Tứ Phế + Nguyệt Phá nâng thành mọi việc Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
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
  return service.danhGia(QUY_TAC_CAU_TU, {
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
  result: ReturnType<typeof danhGia>,
  maRule: string,
  trangThai: TrangThaiDongGop,
) {
  expect(result.dongGop.find((item) => item.quyTac.ma === maRule)?.trangThai).toBe(trangThai);
}
