import { describe, expect, it } from 'vitest';

import { QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM } from '../activities/chan-tha-gia-suc-gia-cam-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('CHAN_THA_GIA_SUC_GIA_CAM Q10 resolver', () => {
  it('Nguyệt Phá gặp Đức vẫn Kị', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expectYeuTo(result, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
  });

  it('Tử Thần tháng Hợi được giải theo exact Bình nhật branch', () => {
    const result = danhGia({ chiThang: DiaChi.HOI, yeuTo: [MaYeuTo.TU_THAN] });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.TU_THAN, TrangThaiDongGop.BI_LOAI);
    expect(result.xungDotDaApDung.some((item) => /NGUYET_|TRUC_/.test(item.moTa))).toBe(false);
  });

  it('Nguyệt Hại Mão + Thiên Đức được giải cho 牧養', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.THIEN_DUC],
    });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.NGUYET_HAI, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hại Thìn + Thiên Đức Hợp cân bằng, không giữ Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.THIEN_DUC_HOP],
    });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.NGUYET_HAI, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hại Hợi theo Kiếp Sát không lộ raw delegate code', () => {
    const result = danhGia({
      chiThang: DiaChi.HOI,
      yeuTo: [MaYeuTo.NGUYET_HAI, MaYeuTo.KIEP_SAT],
    });
    expect(result.xungDotDaApDung.some((item) => /KIEP_SAT|NGUYET_|TRUC_/.test(item.moTa))).toBe(
      false,
    );
  });

  it('Nguyệt Yếm tháng Dần + Nguyệt Đức được giải cho 牧養, khác 栽種', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
  });

  it('Tử Khí không phải baseline Kị của 牧養', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_KHI] });
    expect(result.coKy).toBe(false);
    expect(
      result.dongGop.some(
        (item) =>
          item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === MaYeuTo.TU_KHI,
      ),
    ).toBe(false);
  });

  it('Ngũ Mộ tháng Ngọ + Nguyệt Đức được giải', () => {
    const result = danhGia({ chiThang: DiaChi.NGO, yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC] });
    expect(result.coKy).toBe(false);
    expectYeuTo(result, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Kị chỉ bỏ Nên, không tự tạo Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.KHAI, yeuTo: [MaYeuTo.NGUYET_KY] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expect(
      result.xungDotDaApDung.some(
        (item) => item.ma === 'CHAN_THA_GIA_SUC_GIA_CAM_Q10_NGUYET_KY_BO_NEN',
      ),
    ).toBe(true);
  });

  it('Vô Lộc bỏ Nên; Tứ Ly tạo Kị bổ sung', () => {
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
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_CHAN_THA_GIA_SUC_GIA_CAM, {
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
