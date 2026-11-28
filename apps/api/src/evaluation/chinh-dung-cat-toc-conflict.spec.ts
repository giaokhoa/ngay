import { describe, expect, it } from 'vitest';

import { QUY_TAC_CHINH_DUNG_CAT_TOC } from '../activities/chinh-dung-cat-toc-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('CHINH_DUNG_CAT_TOC Q10 conflict resolver', () => {
  it('Kiến nhật gặp Thiên Đức được giải; Kỷ Mùi không lấy riêng Thiên Đức Hợp', () => {
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

  it('Nguyệt Phá gặp Đức/Hợp vẫn Kị chỉnh dung/cắt tóc', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, 'CHINH_DUNG_CAT_TOC_KY_NGUYET_PHA', TrangThaiDongGop.HIEU_LUC);
  });

  it('Kiếp Sát tháng Dần được Q10 giải, không giữ Kị cứng', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.KIEP_SAT] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, 'CHINH_DUNG_CAT_TOC_KY_KIEP_SAT', TrangThaiDongGop.BI_LOAI);
  });

  it('ngày Đinh vừa Kị cắt tóc vừa bỏ toàn bộ Nên chỉnh dung', () => {
    const result = danhGia({
      canNgay: ThienCan.DINH,
      truc: ThapNhiTruc.TRU,
      yeuTo: [MaYeuTo.GIAI_THAN, MaYeuTo.NGU_LY],
    });
    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(false);
    expect(result.xungDotDaApDung.some((x) => x.ma === 'CHINH_DUNG_CAT_TOC_Q10_DINH_BO_NEN')).toBe(
      true,
    );
  });

  it.each([12, 15] as const)('ngày âm %s giữ Kị trực tiếp theo 人神所在日', (ngayAmTrongThang) => {
    const result = danhGia({ ngayAmTrongThang, yeuTo: [MaYeuTo.GIAI_THAN] });
    expect(result.coKy).toBe(true);
    expect(
      result.dongGop.some(
        (item) => item.quyTac.ma === `CHINH_DUNG_CAT_TOC_KY_NGAY_AM_${ngayAmTrongThang}`,
      ),
    ).toBe(true);
  });

  it('Vô Lộc / Tứ Ly / Tứ Tuyệt / Hối không tự block chỉnh dung/cắt tóc', () => {
    for (const ma of [MaYeuTo.VO_LOC, MaYeuTo.TU_LY, MaYeuTo.TU_TUYET, MaYeuTo.HOI_NHAT]) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.GIAI_THAN] });
      expect(result.coKy).toBe(false);
      expect(result.coNen).toBe(true);
    }
  });

  it('Tứ Phế đơn độc được miễn nhưng Tứ Phế + Nguyệt Phá vẫn chịu universal hard-ban', () => {
    const ordinary = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.GIAI_THAN] });
    const hard = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(ordinary.coKy).toBe(false);
    expect(hard.camMoiViec).toBe(true);
    expect(hard.coKy).toBe(true);
  });

  it('Ngũ Mộ đơn độc không phải Kị chỉnh dung/cắt tóc', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.GIAI_THAN] });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
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
  return service.danhGia(QUY_TAC_CHINH_DUNG_CAT_TOC, {
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
