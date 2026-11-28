import { describe, expect, it } from 'vitest';

import { QUY_TAC_TE_TU } from '../activities/te-tu-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { QUY_TAC_Q10_TE_TU } from './te-tu-conflict-rules';

const service = new DanhGiaNgayService();

describe('TE_TU Q10 conflict resolver', () => {
  it('không clone Kị thường: Nguyệt Phá đơn độc không chặn Tế tự', () => {
    const result = danhGia({
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });

    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
    expect(result.camMoiViec).toBe(false);
  });

  it('Thiên Cẩu vẫn Kị Tế tự dù gặp Đức', () => {
    const result = danhGia({
      chiThang: DiaChi.THAN,
      chiNgay: DiaChi.TUAT,
      truc: ThapNhiTruc.MAN,
      yeuTo: [MaYeuTo.THIEN_CAU, MaYeuTo.THIEN_DUC, MaYeuTo.THIEN_VU],
    });

    expect(result.coKy).toBe(true);
    expect(result.dongGop.some((item) => item.quyTac.ma === 'TE_TU_KY_THIEN_CAU')).toBe(true);
  });

  it('ngày Dần là Kị độc lập của Tế tự', () => {
    const result = danhGia({
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_XA],
    });

    expect(result.coKy).toBe(true);
    expect(result.dongGop.some((item) => item.quyTac.ma === 'TE_TU_KY_NGAY_DAN')).toBe(true);
  });

  it('Nguyệt Phá Mão + Tai Sát + Nguyệt Yếm vẫn cấm mọi việc', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(false);
  });

  it('Tứ Phế + Nguyệt Phá và canonical Q4 hard subset vẫn cấm mọi việc', () => {
    const tuPhe = danhGia({
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA],
    });
    expect(tuPhe.camMoiViec).toBe(true);

    expect(QUY_TAC_Q10_TE_TU.every((rule) => !rule.mucTieu)).toBe(true);
    expect(QUY_TAC_Q10_TE_TU.every((rule) => rule.phepXuLy.loai === 'CAM_MOI_VIEC')).toBe(true);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_TE_TU, {
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
