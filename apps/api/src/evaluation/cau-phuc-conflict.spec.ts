import { describe, expect, it } from 'vitest';

import { QUY_TAC_CAU_PHUC } from '../activities/cau-phuc-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('CAU_PHUC Q10 conflict resolver', () => {
  it('Thiên Cẩu hoặc ngày Dần chỉ bỏ Nên Cầu phúc, không tạo Kị riêng', () => {
    const thienCau = danhGia({
      chiNgay: DiaChi.TUAT,
      yeuTo: [MaYeuTo.THIEN_CAU, MaYeuTo.THIEN_DUC],
    });
    const dan = danhGia({
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });

    expect(thienCau.coNen).toBe(false);
    expect(thienCau.coKy).toBe(false);
    expect(dan.coNen).toBe(false);
    expect(dan.coKy).toBe(false);
    expect(thienCau.xungDotDaApDung.some((x) => x.ma === 'CAU_PHUC_Q10_THIEN_CAU_BO_NEN')).toBe(
      true,
    );
    expect(dan.xungDotDaApDung.some((x) => x.ma === 'CAU_PHUC_Q10_DAN_BO_NEN')).toBe(true);
  });

  it('Kiến nhật thường Kị; gặp Thiên Đức thì bỏ Kị và giữ Nên', () => {
    const thuong = danhGia({ truc: ThapNhiTruc.KIEN });
    const coDuc = danhGia({ truc: ThapNhiTruc.KIEN, yeuTo: [MaYeuTo.THIEN_DUC] });

    expect(thuong.coKy).toBe(true);
    expect(coDuc.coKy).toBe(false);
    expect(coDuc.coNen).toBe(true);
    expectTrangThai(coDuc, 'CAU_PHUC_KY_KIEN_NHAT', TrangThaiDongGop.BI_LOAI);
  });

  it('Kỷ Mùi tháng Mùi không lấy riêng Thiên Đức Hợp để giải Kị Kiến nhật', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      truc: ThapNhiTruc.KIEN,
      yeuTo: [MaYeuTo.THIEN_DUC_HOP],
    });

    expect(result.coKy).toBe(true);
    expect(
      result.xungDotDaApDung.some((x) => x.ma === 'CAU_PHUC_Q10_KIEN_KY_MUI_DUC_HOP_VAN_KY'),
    ).toBe(true);
  });

  it('Kỷ Mùi nếu đồng thời có cát thần khác hợp lệ thì vẫn được giải Kị Kiến nhật', () => {
    const result = danhGia({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      truc: ThapNhiTruc.KIEN,
      yeuTo: [MaYeuTo.THIEN_DUC_HOP, MaYeuTo.NGUYET_DUC],
    });
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(true);
  });

  it('Du Họa gặp Đức/Hợp hoặc Thiên Xá vẫn Kị Cầu phúc', () => {
    for (const cat of [MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC_HOP, MaYeuTo.THIEN_XA]) {
      const result = danhGia({ yeuTo: [MaYeuTo.DU_HOA, cat] });
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.some((x) => x.ma === 'CAU_PHUC_Q10_DU_HOA_VAN_KY')).toBe(true);
    }
  });

  it('Tứ Phế + Đức vẫn Kị; Tứ Phế + Nguyệt Phá nâng thành mọi việc Kị', () => {
    const duc = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.THIEN_DUC] });
    const hard = danhGia({ yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA] });
    expect(duc.coKy).toBe(true);
    expect(duc.camMoiViec).toBe(false);
    expect(hard.camMoiViec).toBe(true);
  });

  it('Tứ Ly / Tứ Tuyệt vẫn Kị riêng Cầu phúc nhưng không tự xóa Nên Thiên Đức', () => {
    for (const ma of [MaYeuTo.TU_LY, MaYeuTo.TU_TUYET]) {
      const result = danhGia({ yeuTo: [ma, MaYeuTo.THIEN_DUC] });
      expect(result.coKy).toBe(true);
      expect(result.coNen).toBe(true);
    }
  });

  it('Hối nhật giữ Kị riêng Cầu phúc và phụ chú Q10 đồng thời bỏ Nên', () => {
    const result = danhGia({ yeuTo: [MaYeuTo.HOI_NHAT, MaYeuTo.THIEN_DUC] });
    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(false);
    expect(result.xungDotDaApDung.some((x) => x.ma.endsWith('_HOI_NHAT_BO_NEN'))).toBe(true);
  });

  it('shared Q10 core: Đại Thời Dần bỏ Kị, còn Nguyệt Phá + Đức vẫn Kị', () => {
    const daiThoi = danhGia({ chiThang: DiaChi.DAN, yeuTo: [MaYeuTo.DAI_THOI] });
    const pha = danhGia({ yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] });
    expect(daiThoi.coKy).toBe(false);
    expect(pha.coKy).toBe(true);
  });

  it('Nguyệt Yếm Mão/Dậu + Nguyệt Phá + Tai Sát vẫn hard dù có Đức', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.THIEN_DUC],
    });
    expect(result.camMoiViec).toBe(true);
    expect(result.coNen).toBe(false);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_CAU_PHUC, {
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
