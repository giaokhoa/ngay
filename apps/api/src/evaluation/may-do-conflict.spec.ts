import { describe, expect, it } from 'vitest';

import { QUY_TAC_MAY_DO } from '../activities/may-do-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('MAY_DO Q10 resolver', () => {
  it('Nguyệt Phá + Đức vẫn Kị; Tứ Phế + Đức vẫn Kị', () => {
    expect(danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] }).coKy).toBe(true);
    expect(danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] }).coKy).toBe(true);
  });

  it('Kiếp Sát tháng Dần được giải cho May đo', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.KIEP_SAT] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, 'MAY_DO_KY_KIEP_SAT', TrangThaiDongGop.BI_LOAI);
  });

  it('Bình nhật tháng Mão + Nguyệt Đức cân bằng Kị nhưng không xoá Nên May đo', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.VUONG_NHAT],
    });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
  });

  it('Trường Tinh / Đoản Tinh tạo Kị bổ sung Q10 dù Q11 baseline không có', () => {
    for (const [ma, trace] of [
      [MaYeuTo.TRUONG_TINH, 'MAY_DO_Q10_TRUONG_TINH_KY'],
      [MaYeuTo.DOAN_TINH, 'MAY_DO_Q10_DOAN_TINH_KY'],
    ] as const) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.THIEN_DUC] });
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.some((x) => x.ma === trace)).toBe(true);
    }
  });

  it('Tứ Phế + Nguyệt Phá vẫn universal hard', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(result.camMoiViec).toBe(true);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_MAY_DO, {
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
  state: TrangThaiDongGop,
) {
  expect(result.dongGop.find((item) => item.quyTac.ma === maRule)?.trangThai).toBe(state);
}
