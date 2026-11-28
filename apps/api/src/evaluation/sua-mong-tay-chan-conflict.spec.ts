import { describe, expect, it } from 'vitest';

import { QUY_TAC_SUA_MONG_TAY_CHAN } from '../activities/sua-mong-tay-chan-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('SUA_MONG_TAY_CHAN Q10 resolver', () => {
  it('Kiến + Thiên Đức được giải; Kỷ Mùi không lấy riêng Thiên Đức Hợp', () => {
    const relieved = danhGia({ truc: ThapNhiTruc.KIEN, yeuTo: [MaYeuTo.THIEN_DUC] });
    const kyMui = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      truc: ThapNhiTruc.KIEN,
      yeuTo: [MaYeuTo.THIEN_DUC_HOP],
    });
    expect(relieved.coKy).toBe(false);
    expect(kyMui.coKy).toBe(true);
  });

  it('Nguyệt Phá + Đức vẫn Kị; Kiếp Sát tháng Dần được giải như grooming source', () => {
    const pha = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    const kiep = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.KIEP_SAT] });
    expect(pha.coKy).toBe(true);
    expect(kiep.coKy).toBe(false);
    expectTrangThai(kiep, 'SUA_MONG_TAY_CHAN_KY_KIEP_SAT', TrangThaiDongGop.BI_LOAI);
  });

  it('ngày Đinh không Kị và không BO_NEN sửa móng tay chân', () => {
    const result = danhGia({
      canNgay: ThienCan.DINH,
      truc: ThapNhiTruc.TRU,
      yeuTo: [MaYeuTo.GIAI_THAN, MaYeuTo.NGU_LY],
    });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
    expect(result.xungDotDaApDung.some((x) => x.ma.includes('DINH_BO_NEN'))).toBe(false);
  });

  it.each([1, 6, 15, 19, 21, 23] as const)('ngày âm %s giữ Kị trực tiếp', (ngayAmTrongThang) => {
    const result = danhGia({ ngayAmTrongThang, yeuTo: [MaYeuTo.GIAI_THAN] });
    expect(result.coKy).toBe(true);
    expect(
      result.dongGop.some(
        (item) => item.quyTac.ma === `SUA_MONG_TAY_CHAN_KY_NGAY_AM_${ngayAmTrongThang}`,
      ),
    ).toBe(true);
  });

  it('Tứ Phế/Ngũ Mộ đơn độc được miễn; Tứ Phế + Nguyệt Phá vẫn universal hard', () => {
    expect(danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.GIAI_THAN] }).coKy).toBe(false);
    expect(danhGia({ yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.GIAI_THAN] }).coKy).toBe(false);
    const hard = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(hard.camMoiViec).toBe(true);
  });

  it('Vô Lộc / Tứ Ly / Tứ Tuyệt / Hối không tự block sửa móng', () => {
    for (const ma of [MaYeuTo.VO_LOC, MaYeuTo.TU_LY, MaYeuTo.TU_TUYET, MaYeuTo.HOI_NHAT]) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.GIAI_THAN] });
      expect(result.coKy).toBe(false);
      expect(result.coNen).toBe(true);
    }
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  ngayAmTrongThang?: number;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_SUA_MONG_TAY_CHAN, {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.CANH,
    chiNgay: input.chiNgay ?? DiaChi.TY,
    truc: input.truc ?? ThapNhiTruc.DINH,
    ngayAmTrongThang: input.ngayAmTrongThang,
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
