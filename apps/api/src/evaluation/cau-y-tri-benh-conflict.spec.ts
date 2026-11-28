import { describe, expect, it } from 'vitest';

import { QUY_TAC_CAU_Y_TRI_BENH } from '../activities/cau-y-tri-benh-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('CAU_Y_TRI_BENH Q10 conflict resolver', () => {
  it('ordinary Nguyệt Phá được miễn; overlap Tý/Ngọ + Tai Sát khôi phục Kị/hard', () => {
    const ordinary = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    const withVirtue = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.THIEN_DUC],
    });
    const hard = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
    });
    expect(ordinary.coKy).toBe(false);
    expect(withVirtue.coKy).toBe(true);
    expect(withVirtue.camMoiViec).toBe(false);
    expect(hard.camMoiViec).toBe(true);
  });

  it('Kiến gặp Thiên Đức được giải; Kỷ Mùi không lấy riêng Thiên Đức Hợp', () => {
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

  it('Mãn chỉ được giải bởi đúng cát set nguồn nêu, không phải mọi Đức', () => {
    const sourceCat = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.MAN,
      yeuTo: [MaYeuTo.NGUYET_DUC],
    });
    const thienDucOnly = danhGia({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.MAN,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });
    expect(sourceCat.coKy).toBe(false);
    expect(thienDucOnly.coKy).toBe(true);
  });

  it('Bế gặp cát ở nhóm tháng nguồn nêu cân bằng: không Nên, không Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Bình + Tử Thần tháng Hợi vẫn Kị trị bệnh dù Thời Đức', () => {
    const result = danhGia({
      chiThang: DiaChi.HOI,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.TU_THAN, MaYeuTo.THOI_DUC],
    });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, 'CAU_Y_TRI_BENH_KY_BINH_NHAT', TrangThaiDongGop.HIEU_LUC);
    expectTrangThai(result, 'CAU_Y_TRI_BENH_KY_TU_THAN', TrangThaiDongGop.HIEU_LUC);
  });

  it('Kiếp Sát tháng Dần vẫn riêng Kị trị bệnh dù các việc khác được giải', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.THIEN_DUC],
    });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, 'CAU_Y_TRI_BENH_KY_KIEP_SAT', TrangThaiDongGop.HIEU_LUC);
  });

  it('Đại Thời nhóm tứ sinh được bỏ Kị', () => {
    const result = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.GIAI_THAN] });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, 'CAU_Y_TRI_BENH_KY_DAI_THOI', TrangThaiDongGop.BI_LOAI);
  });

  it('Tử Khí gặp Đức vẫn riêng Kị trị bệnh', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expectTrangThai(result, 'CAU_Y_TRI_BENH_KY_TU_KHI', TrangThaiDongGop.HIEU_LUC);
  });

  it('Ngũ Mộ tháng Ngọ/Tý + Nguyệt Đức được giải', () => {
    const result = danhGia({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });
    expect(result.coKy).toBe(false);
    expectTrangThai(result, 'CAU_Y_TRI_BENH_KY_NGU_MO', TrangThaiDongGop.BI_LOAI);
  });

  it('Du Họa và Vãng Vong gặp cát vẫn Kị trị bệnh', () => {
    for (const yeuTo of [
      [MaYeuTo.DU_HOA, MaYeuTo.THIEN_XA],
      [MaYeuTo.VANG_VONG, MaYeuTo.THIEN_XA],
    ] as const) {
      expect(danhGia({ yeuTo }).coKy).toBe(true);
    }
  });

  it('Tứ Phế + Đức vẫn Kị; Tứ Phế + Nguyệt Phá hard', () => {
    const ordinary = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.THIEN_DUC] });
    const hard = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(ordinary.coKy).toBe(true);
    expect(hard.camMoiViec).toBe(true);
  });

  it('ngày Mùi, âm 15 và Sóc-Huyền-Vọng là direct Kị', () => {
    expect(danhGia({ chiNgay: DiaChi.MUI }).coKy).toBe(true);
    expect(danhGia({ ngayAmTrongThang: 15 }).coKy).toBe(true);
    expect(danhGia({ yeuTo: [MaYeuTo.SOC_HUYEN_VONG] }).coKy).toBe(true);
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
  return service.danhGia(QUY_TAC_CAU_Y_TRI_BENH, {
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
