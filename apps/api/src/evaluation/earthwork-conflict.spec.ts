import { describe, expect, it } from 'vitest';

import { QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from '../activities/earthwork-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

describe('earthwork Q10 base semantics', () => {
  it('Thổ Phù + Thiên Đức vẫn giữ Kị DONG_THO', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THO_PHU_TIN, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_THO_PHU_TIN_VAN_KY',
    );
  });

  it('Địa Nang + Thiên Xá vẫn giữ Kị DONG_THO', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA],
    });

    expectYeuTo(result.dongGop, MaYeuTo.DIA_NANG, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_DIA_NANG_VAN_KY',
    );
  });

  it('Thổ Phù vẫn là blocker SUA_CUNG_THAT khi không có cát thần', () => {
    const result = danhGiaSuaCungThat({
      yeuTo: [MaYeuTo.THO_PHU_TIN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THO_PHU_TIN, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_THO_PHU_TIN_GIU_KY',
    );
  });

  it('Địa Nang vẫn là blocker SUA_CUNG_THAT khi không có cát thần', () => {
    const result = danhGiaSuaCungThat({
      yeuTo: [MaYeuTo.DIA_NANG],
    });

    expectYeuTo(result.dongGop, MaYeuTo.DIA_NANG, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('dangThoVuong=true match typed THO_VUONG blocker và giữ Kị', () => {
    const result = danhGiaDongTho({
      dangThoVuong: true,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });

    const item = result.dongGop.find((candidate) => candidate.quyTac.dieuKien.loai === 'THO_VUONG');
    expect(item?.trangThai).toBe(TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((trace) => trace.ma)).toContain(
      'EARTHWORK_Q10_THO_VUONG_GIU_KY',
    );
  });

  it('dangThoVuong=false không match THO_VUONG rule', () => {
    const result = danhGiaDongTho({
      dangThoVuong: false,
      yeuTo: [],
    });

    expect(result.dongGop.some((item) => item.quyTac.dieuKien.loai === 'THO_VUONG')).toBe(false);
  });

  it('Q10 trace của blocker đất luôn giữ provenance Việt + Hán verified', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
    });

    for (const trace of result.xungDotDaApDung) {
      expect(trace.nguon).toHaveLength(2);
      expect(trace.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});

interface Input {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  dangThoVuong?: boolean;
  yeuTo: readonly MaYeuTo[];
}

function danhGiaDongTho(input: Input) {
  return service.danhGia(QUY_TAC_DONG_THO, taoBoiCanh(input));
}

function danhGiaSuaCungThat(input: Input) {
  return service.danhGia(QUY_TAC_SUA_CUNG_THAT, taoBoiCanh(input));
}

function taoBoiCanh(input: Input): BoiCanhDanhGiaNgay {
  return {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.BINH,
    chiNgay: input.chiNgay ?? DiaChi.DAN,
    truc: input.truc ?? ThapNhiTruc.KIEN,
    dangThoVuong: input.dangThoVuong ?? false,
    yeuTo: input.yeuTo.map(taoYeuTo),
  };
}

function taoYeuTo(ma: MaYeuTo): YeuToNgay {
  return {
    ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: [],
    nguon: [],
  };
}

function expectYeuTo(
  dongGop: readonly { quyTac: QuyTacDungSu; trangThai: TrangThaiDongGop }[],
  ma: MaYeuTo,
  trangThai: TrangThaiDongGop,
): void {
  const item = dongGop.find(
    (candidate) =>
      candidate.quyTac.dieuKien.loai === 'YEU_TO' && candidate.quyTac.dieuKien.ma === ma,
  );
  expect(item?.trangThai).toBe(trangThai);
}

describe('earthwork full Q10 regression matrix', () => {
  it('Nguyệt Kiến + Nguyệt Ân vẫn Kị earthwork', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.NGUYET_AN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_KIEN, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Nguyệt Phá + Thiên Đức vẫn Kị', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('Nguyệt Phá tháng Mão + Tai Sát + Nguyệt Yếm là hard-ban', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.MAO,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
  });

  it('Bình tháng Hợi bỏ Kị earthwork', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.HOI,
      truc: ThapNhiTruc.BINH,
      yeuTo: [],
    });

    expectTruc(result.dongGop, ThapNhiTruc.BINH, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Bình tháng Mão + Nguyệt Đức cân bằng và triệt cặp liên quan', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.MAO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_DUC],
    });

    expectTruc(result.dongGop, ThapNhiTruc.BINH, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Bình tháng Thìn delegate Nguyệt Sát', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_BINH_TU_MUA_THEO_NGUYET_SAT',
    );
  });

  it('Thu tháng Dần delegate Kiếp Sát rồi bỏ Kị', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.KIEP_SAT],
    });

    expectTruc(result.dongGop, ThapNhiTruc.THU, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Thu tháng Thìn + Thiên Đức bỏ Kị', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.THU,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });

    expectTruc(result.dongGop, ThapNhiTruc.THU, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Bế tháng Dần delegate Nguyệt Sát', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.DAN,
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_BE_TU_SINH_THEO_NGUYET_SAT',
    );
  });

  it('Bế tháng Thìn + Thiên Xá cân bằng', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.THIN,
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.THIEN_XA],
    });

    expectTruc(result.dongGop, ThapNhiTruc.BE, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_XA, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Kiếp Sát tháng Dần bỏ Kị', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.KIEP_SAT],
    });

    expectYeuTo(result.dongGop, MaYeuTo.KIEP_SAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Tai Sát tháng Tý delegate Nguyệt Phá', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_PHA],
    });

    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_TAI_SAT_TU_TRONG_THEO_NGUYET_PHA',
    );
  });

  it('Nguyệt Sát tháng Mão + Nguyệt Đức + Thiên Nguyện bỏ Kị', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_SAT, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_SAT, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Sát tháng Dần không Đức/Hợp hard-ban', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_SAT],
    });

    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Hình tháng Tỵ + required cát bỏ Kị', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.TI,
      yeuTo: [MaYeuTo.NGUYET_HINH, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_DUC_HOP, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_HINH, TrangThaiDongGop.BI_LOAI);
  });

  it('Nguyệt Hình tháng Tý không Đức/Hợp hard-ban', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_HINH],
    });

    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Yếm tháng Dần + Nguyệt Đức bỏ Kị earthwork', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
  });

  it('Dương thác tháng Dần Giáp Dần vẫn tự sinh Kị earthwork', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.GIAP,
      chiNgay: DiaChi.DAN,
      yeuTo: [],
    });

    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.some((item) => item.ma.includes('DUONG_THAC_1'))).toBe(true);
  });

  it('Dương thác tháng Sáu Kỷ Mùi vẫn Kị và bỏ Nên Đức/Hợp của DONG_THO', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      yeuTo: [
        MaYeuTo.THIEN_DUC,
        MaYeuTo.NGUYET_DUC,
        MaYeuTo.THIEN_DUC_HOP,
        MaYeuTo.NGUYET_DUC_HOP,
        MaYeuTo.THIEN_NGUYEN,
      ],
    });

    expect(result.coKy).toBe(true);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.NGUYET_DUC_HOP, TrangThaiDongGop.BI_LOAI);
    expectYeuTo(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.HIEU_LUC);
  });

  it('Âm thác tháng Sáu Kỷ Tỵ là hard-ban', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.TI,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });

    expect(result.camMoiViec).toBe(true);
  });

  it('Đại Thời tháng Dần bỏ Kị', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.DAI_THOI],
    });

    expectYeuTo(result.dongGop, MaYeuTo.DAI_THOI, TrangThaiDongGop.BI_LOAI);
  });

  it('Đại Thời tháng Mão delegate Nguyệt Hình', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.NGUYET_HINH],
    });

    expect(result.camMoiViec).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_DAI_THOI_MAO_THEO_NGUYET_HINH',
    );
  });

  it('Thiên Lại tháng Dần + Thiên Đức bỏ Kị', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_LAI, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THIEN_LAI, TrangThaiDongGop.BI_LOAI);
  });

  it('Thiên Lại tháng Ngọ delegate Bình', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.NGO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.THIEN_LAI],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THIEN_LAI, TrangThaiDongGop.HIEU_LUC);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_THIEN_LAI_NGO_MAO_DAU_THEO_BINH',
    );
  });

  it('Tứ Phế + Đức/Hợp vẫn Kị', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.TU_PHE, TrangThaiDongGop.HIEU_LUC);
  });

  it('Tứ Phế + Nguyệt Phá hard-ban', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_PHA],
    });

    expect(result.camMoiViec).toBe(true);
  });

  it('Ngũ Mộ tháng Ngọ + Nguyệt Đức bỏ Kị', () => {
    const result = danhGiaDongTho({
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
  });

  it('Thổ Phù + Thiên Xá vẫn Kị', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_XA],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THO_PHU_TIN, TrangThaiDongGop.HIEU_LUC);
  });

  it('Địa Nang + Thiên Nguyện vẫn Kị', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_NGUYEN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.DIA_NANG, TrangThaiDongGop.HIEU_LUC);
  });

  it('Thổ Vượng + cát vẫn Kị', () => {
    const result = danhGiaDongTho({
      dangThoVuong: true,
      yeuTo: [MaYeuTo.THIEN_XA],
    });

    expect(result.coKy).toBe(true);
    expectThoVuong(result.dongGop, TrangThaiDongGop.HIEU_LUC);
  });

  it('cùng CAN_BANG branch cho SUA_CUNG_THAT không tự sinh Nên', () => {
    const result = danhGiaSuaCungThat({
      chiThang: DiaChi.MAO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_DUC],
    });

    expectTruc(result.dongGop, ThapNhiTruc.BINH, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Q10-only special day chạy khi không có factor Nguyệt Yếm', () => {
    const result = danhGiaSuaCungThat({
      chiThang: DiaChi.TI,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.NGO,
      yeuTo: [],
    });

    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.some((item) => item.ma.includes('TUE_BAC_4_BINH_NGO'))).toBe(
      true,
    );
  });
});

function expectTruc(
  dongGop: readonly { quyTac: QuyTacDungSu; trangThai: TrangThaiDongGop }[],
  truc: ThapNhiTruc,
  trangThai: TrangThaiDongGop,
): void {
  const item = dongGop.find(
    (candidate) =>
      candidate.quyTac.dieuKien.loai === 'TRUC' && candidate.quyTac.dieuKien.truc === truc,
  );
  expect(item?.trangThai).toBe(trangThai);
}

function expectThoVuong(
  dongGop: readonly { quyTac: QuyTacDungSu; trangThai: TrangThaiDongGop }[],
  trangThai: TrangThaiDongGop,
): void {
  const item = dongGop.find((candidate) => candidate.quyTac.dieuKien.loai === 'THO_VUONG');
  expect(item?.trangThai).toBe(trangThai);
}
