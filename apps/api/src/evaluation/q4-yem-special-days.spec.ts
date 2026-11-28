import { describe, expect, it } from 'vitest';

import { QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_CUOI_HOI } from '../activities/cuoi-hoi-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';
import {
  NGAY_AM_THAC_Q4,
  NGAY_DUONG_THAC_Q4,
  NGAY_TUE_BAC_TRUC_TRAN_Q4,
  NgayDacBietNguyetYemQ4,
} from './q4-yem-special-days';

const TUE_BAC_TRUC_TRAN_HAN = [
  'TI:BINH:NGO:TUE_BAC_4_BINH_NGO:DUC_NGUYEN',
  'TI:MAU:NGO:TUE_BAC_4_MAU_NGO:-',
  'HOI:NHAM:TY:TUE_BAC_10_NHAM_TY:-',
  'HOI:MAU:TY:TUE_BAC_10_MAU_TY:-',
  'MUI:BINH:NGO:TRUC_TRAN_6_BINH_NGO:-',
  'MUI:MAU:NGO:TRUC_TRAN_6_MAU_NGO:DUC_NGUYEN',
  'SUU:NHAM:TY:TRUC_TRAN_12_NHAM_TY:-',
  'SUU:MAU:TY:TRUC_TRAN_12_MAU_TY:-',
] as const;

const DUONG_THAC_HAN = [
  'DAN:GIAP:DAN:DUONG_THAC_1:false:-',
  'MAO:AT:MAO:DUONG_THAC_2:false:-',
  'THIN:GIAP:THIN:DUONG_THAC_3:false:-',
  'TI:DINH:TI:DUONG_THAC_4_DINH:false:-',
  'TI:KY:TI:DUONG_THAC_4_KY:true:-',
  'MUI:DINH:MUI:DUONG_THAC_6_DINH:false:-',
  'MUI:KY:MUI:DUONG_THAC_6_KY:false:DUC_HOP',
  'THAN:CANH:THAN:DUONG_THAC_7:false:-',
  'DAU:TAN:DAU:DUONG_THAC_8:false:-',
  'TUAT:CANH:TUAT:DUONG_THAC_9:false:-',
  'HOI:QUY:HOI:DUONG_THAC_10:false:-',
  'SUU:QUY:SUU:DUONG_THAC_12:false:-',
] as const;

const AM_THAC_HAN = [
  'DAN:CANH:TUAT:AM_THAC_1:false:-',
  'MAO:TAN:DAU:AM_THAC_2:true:-',
  'THIN:CANH:THAN:AM_THAC_3:false:-',
  'TI:DINH:MUI:AM_THAC_4_DINH:false:-',
  'TI:KY:MUI:AM_THAC_4_KY:false:-',
  'MUI:DINH:TI:AM_THAC_6_DINH:true:-',
  'MUI:KY:TI:AM_THAC_6_KY:true:DUC_HOP',
  'THAN:GIAP:THIN:AM_THAC_7:false:-',
  'DAU:AT:MAO:AM_THAC_8:true:-',
  'TUAT:GIAP:DAN:AM_THAC_9:false:-',
  'HOI:QUY:SUU:AM_THAC_10:false:-',
  'SUU:QUY:HOI:AM_THAC_12:true:-',
] as const;

const service = new DanhGiaNgayService();

describe('Q4/Q10 Nguyệt Yếm special-day oracle', () => {
  it('locks 歲薄 / 逐陣 vectors and the two 德願 exclusions', () => {
    expect(NGAY_TUE_BAC_TRUC_TRAN_Q4.map(keyTueBac)).toEqual(TUE_BAC_TRUC_TRAN_HAN);
  });

  it('locks 陽錯 vectors, hard overlap and 德合 exclusion', () => {
    expect(NGAY_DUONG_THAC_Q4.map(keySai)).toEqual(DUONG_THAC_HAN);
  });

  it('locks 陰錯 vectors, hard overlaps and 德合 exclusion', () => {
    expect(NGAY_AM_THAC_Q4.map(keySai)).toEqual(AM_THAC_HAN);
  });

  it('Nguyệt Yếm tháng Tý không Thiên Xá: mọi việc đều Kị', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_YEM],
    });
    expect(result.camMoiViec).toBe(true);
  });

  it('Nguyệt Yếm tháng Tý gặp Thiên Xá trở về thường lệ: vẫn Kị cưới nhưng không hard-ban', () => {
    const result = danhGia({
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_XA],
    });
    expect(result.camMoiViec).toBe(false);
    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(true);
  });

  it('Nguyệt Yếm tháng Thìn gặp Thiên Đức: cát hung cân bằng', () => {
    const result = danhGia({
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });
    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Nguyệt Yếm tháng Dần gặp Nguyệt Đức: cưới hỏi vẫn nằm trong nhóm Kị còn lại', () => {
    const result = danhGia({
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.BINH,
      chiNgay: DiaChi.THIN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it.each(NGAY_TUE_BAC_TRUC_TRAN_Q4)('$suffix follows Nguyệt Yếm and adds Kị cưới hỏi', (day) => {
    const result = danhGiaNgay(day, []);
    expect(result.camMoiViec).toBe(false);
    expect(result.coKy).toBe(true);
    expect(
      result.xungDotDaApDung.some((item) => item.ma === 'CUOI_HOI_Q10_NGUYET_YEM_' + day.suffix),
    ).toBe(true);
  });

  it.each(NGAY_AM_THAC_Q4.filter((day) => !day.hard))(
    '$suffix non-hard follows Nguyệt Yếm and adds Kị cưới hỏi',
    (day) => {
      const result = danhGiaNgay(day, []);
      expect(result.camMoiViec).toBe(false);
      expect(result.coKy).toBe(true);
    },
  );

  it.each(NGAY_DUONG_THAC_Q4.filter((day) => !day.hard))(
    '$suffix non-hard follows Kiến: it does not add Kị 嫁娶 and removes an overlapping Nguyệt Yếm Kị',
    (day) => {
      const result = danhGiaNgay(day, [MaYeuTo.NGUYET_YEM]);
      expect(result.camMoiViec).toBe(false);
      expectTrangThai(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
      expect(
        result.xungDotDaApDung.some((item) => item.ma === 'CUOI_HOI_Q10_NGUYET_YEM_' + day.suffix),
      ).toBe(true);
    },
  );

  it('Dương Thác tháng Sáu Kỷ Mùi drops both Nguyệt Yếm Kị and Đức-Hợp Nên', () => {
    const day = NGAY_DUONG_THAC_Q4.find((item) => item.suffix === 'DUONG_THAC_6_KY')!;
    const result = danhGiaNgay(day, [MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC]);

    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_YEM, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(false);
    expect(result.coNen).toBe(false);
  });

  it('Tuế Bạc tháng Tỵ Bính Ngọ drops Đức/Nguyện Nên while adding Kị', () => {
    const day = NGAY_TUE_BAC_TRUC_TRAN_Q4[0]!;
    const result = danhGiaNgay(day, [MaYeuTo.THIEN_DUC, MaYeuTo.THIEN_NGUYEN]);

    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_NGUYEN, TrangThaiDongGop.BI_LOAI);
    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(false);
  });
});

function keyTueBac(day: NgayDacBietNguyetYemQ4): string {
  return [day.chiThang, day.canNgay, day.chiNgay, day.suffix, day.boNen ?? '-'].join(':');
}

function keySai(day: NgayDacBietNguyetYemQ4): string {
  return [
    day.chiThang,
    day.canNgay,
    day.chiNgay,
    day.suffix,
    String(day.hard ?? false),
    day.boNen ?? '-',
  ].join(':');
}

function danhGiaNgay(day: NgayDacBietNguyetYemQ4, yeuTo: readonly MaYeuTo[]) {
  return danhGia({
    chiThang: day.chiThang,
    canNgay: day.canNgay,
    chiNgay: day.chiNgay,
    yeuTo,
  });
}

function danhGia(
  partial: Partial<Omit<BoiCanhDanhGiaNgay, 'yeuTo'>> & { yeuTo: readonly MaYeuTo[] },
) {
  const boiCanh: BoiCanhDanhGiaNgay = {
    chiThang: partial.chiThang ?? DiaChi.DAN,
    canNgay: partial.canNgay ?? ThienCan.GIAP,
    chiNgay: partial.chiNgay ?? DiaChi.DAN,
    truc: partial.truc ?? ThapNhiTruc.NGUY,
    dangThoVuong: partial.dangThoVuong ?? false,
    yeuTo: partial.yeuTo.map(taoYeuTo),
  };
  return service.danhGia(QUY_TAC_CUOI_HOI, boiCanh);
}

function taoYeuTo(ma: MaYeuTo): YeuToNgay {
  return {
    ma,
    loai: LoaiYeuTo.THAN_SAT,
    tenKhac: [],
    nguon: [],
  };
}

function expectTrangThai(
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
