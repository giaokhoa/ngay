import { describe, expect, it } from 'vitest';

import { QUY_TAC_NHAP_HOC } from '../activities/nhap-hoc-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { NGAY_CAM_MOI_VIEC_Q4 } from './q4-hard-days';

const service = new DanhGiaNgayService();

describe('NHAP_HOC Q10 resolver', () => {
  it('không clone Kị thường: Nguyệt Phá đơn độc và Kiếp Sát không chặn Nhập học', () => {
    const nguyetPha = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.DAN, ThienCan.BINH, DiaChi.THAN, ThapNhiTruc.THANH, [MaYeuTo.NGUYET_PHA]),
    );
    const kiepSat = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.DAN, ThienCan.BINH, DiaChi.HOI, ThapNhiTruc.THU, [MaYeuTo.KIEP_SAT]),
    );

    expect(nguyetPha.coNen).toBe(true);
    expect(nguyetPha.coKy).toBe(false);
    expect(kiepSat.coKy).toBe(false);
  });

  it('Nguyệt Phá Tý + Tai Sát không có Đức được nêu thì mọi việc Kị', () => {
    const hard = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.TY, ThienCan.CANH, DiaChi.NGO, ThapNhiTruc.THANH, [
        MaYeuTo.NGUYET_PHA,
        MaYeuTo.TAI_SAT,
      ]),
    );
    const relieved = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.TY, ThienCan.CANH, DiaChi.NGO, ThapNhiTruc.THANH, [
        MaYeuTo.NGUYET_PHA,
        MaYeuTo.TAI_SAT,
        MaYeuTo.NGUYET_DUC,
      ]),
    );
    const thienDucOnly = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.TY, ThienCan.CANH, DiaChi.NGO, ThapNhiTruc.THANH, [
        MaYeuTo.NGUYET_PHA,
        MaYeuTo.TAI_SAT,
        MaYeuTo.THIEN_DUC,
      ]),
    );

    expect(hard.camMoiViec).toBe(true);
    expect(hard.coNen).toBe(false);
    expect(relieved.camMoiViec).toBe(false);
    expect(relieved.coNen).toBe(true);
    // WYG_010-29b nêu 月德、天德合、月德合, không nêu 天德 ở nhánh này.
    expect(thienDucOnly.camMoiViec).toBe(true);
  });

  it('Nguyệt Phá Mão/Dậu + Tai Sát + Nguyệt Yếm vẫn hard dù có Đức', () => {
    const result = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.MAO, ThienCan.AT, DiaChi.DAU, ThapNhiTruc.KHAI, [
        MaYeuTo.NGUYET_PHA,
        MaYeuTo.TAI_SAT,
        MaYeuTo.NGUYET_YEM,
        MaYeuTo.NGUYET_DUC,
      ]),
    );
    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
  });

  it('Nguyệt Sát/Nguyệt Hình hạ hung và Nguyệt Yếm hard branches áp đúng', () => {
    const nguyetSat = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.DAN, ThienCan.BINH, DiaChi.DAN, ThapNhiTruc.THANH, [MaYeuTo.NGUYET_SAT]),
    );
    const nguyetHinh = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.TY, ThienCan.BINH, DiaChi.TY, ThapNhiTruc.KHAI, [MaYeuTo.NGUYET_HINH]),
    );
    const nguyetYem = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.NGO, ThienCan.CANH, DiaChi.NGO, ThapNhiTruc.THANH, [MaYeuTo.NGUYET_YEM]),
    );
    const nguyetYemXa = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.NGO, ThienCan.CANH, DiaChi.NGO, ThapNhiTruc.THANH, [
        MaYeuTo.NGUYET_YEM,
        MaYeuTo.THIEN_XA,
      ]),
    );

    expect(nguyetSat.camMoiViec).toBe(true);
    expect(nguyetHinh.camMoiViec).toBe(true);
    expect(nguyetYem.camMoiViec).toBe(true);
    expect(nguyetYemXa.camMoiViec).toBe(false);
  });

  it('Tứ Phế + Nguyệt Phá và canonical Q4 hard day vẫn cấm mọi việc', () => {
    const tuPhe = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(DiaChi.DAN, ThienCan.BINH, DiaChi.THAN, ThapNhiTruc.THANH, [
        MaYeuTo.TU_PHE,
        MaYeuTo.NGUYET_PHA,
      ]),
    );
    const day = NGAY_CAM_MOI_VIEC_Q4[0]!;
    const q4 = service.danhGia(
      QUY_TAC_NHAP_HOC,
      boiCanh(day.chiThang, day.canNgay, day.chiNgay, ThapNhiTruc.THANH, []),
    );

    expect(tuPhe.camMoiViec).toBe(true);
    expect(q4.camMoiViec).toBe(true);
    expect(
      q4.xungDotDaApDung.some((trace) => trace.ma === 'NHAP_HOC_Q10_Q4_HARD_' + day.suffix),
    ).toBe(true);
  });

  it('mọi Q10 rule Nhập học là global hard-ban, không có target Kị giả', () => {
    expect(QUY_TAC_Q10_NHAP_HOC.every((rule) => !rule.mucTieu)).toBe(true);
    expect(QUY_TAC_Q10_NHAP_HOC.every((rule) => rule.phepXuLy.loai === 'CAM_MOI_VIEC')).toBe(true);
  });
});

function boiCanh(
  chiThang: DiaChi,
  canNgay: ThienCan,
  chiNgay: DiaChi,
  truc: ThapNhiTruc,
  factors: readonly MaYeuTo[],
) {
  return {
    chiThang,
    canNgay,
    chiNgay,
    truc,
    dangThoVuong: false,
    yeuTo: factors.map(yeuTo),
  };
}

function yeuTo(ma: MaYeuTo): YeuToNgay {
  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon: [] };
}
