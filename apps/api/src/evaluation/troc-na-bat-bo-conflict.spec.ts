import { describe, expect, it } from 'vitest';

import { QUY_TAC_TROC_NA_BAT_BO } from '../activities/troc-na-bat-bo-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { TietKhi } from '../calendar/domain/solar-term';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { TrangThaiDongGop } from './evaluation-domain';

const service = new DanhGiaNgayService();

describe('TROC_NA_BAT_BO Q10 semantics', () => {
  it('Chấp nhật và Thu nhật là Nên khi không có blocker', () => {
    for (const truc of [ThapNhiTruc.CHAP, ThapNhiTruc.THU]) {
      const result = danhGia({ truc });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(false);
    }
  });

  it('Vãng Vong vẫn Kị dù gặp Đức/Hợp/Xá/Nguyện', () => {
    for (const cat of [
      MaYeuTo.THIEN_DUC,
      MaYeuTo.NGUYET_DUC_HOP,
      MaYeuTo.THIEN_XA,
      MaYeuTo.THIEN_NGUYEN,
    ]) {
      const result = danhGia({ truc: ThapNhiTruc.CHAP, yeuTo: [MaYeuTo.VANG_VONG, cat] });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(true);
      expectTrangThai(result, MaYeuTo.VANG_VONG, TrangThaiDongGop.HIEU_LUC);
    }
  });

  it.each([TietKhi.XUAN_PHAN, TietKhi.HA_CHI, TietKhi.THU_PHAN, TietKhi.DONG_CHI] as const)(
    '%s chỉ bỏ Nên, không tự tạo Kị',
    (tietKhi) => {
      const result = danhGia({ truc: ThapNhiTruc.CHAP, tietKhiTrongNgay: [tietKhi] });
      expect(result.coNen).toBe(false);
      expect(result.coKy).toBe(false);
    },
  );

  it('Nguyệt Kị chỉ bỏ Nên, không tự tạo Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.THU, yeuTo: [MaYeuTo.NGUYET_KY] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
  });

  it('ordinary Nguyệt Phá/Tứ Phế không tự tạo Kị cho 捕捉', () => {
    for (const factor of [MaYeuTo.NGUYET_PHA, MaYeuTo.TU_PHE]) {
      const result = danhGia({ truc: ThapNhiTruc.CHAP, yeuTo: [factor] });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(false);
    }
  });

  it('Vô Lộc ngoài allowed list bỏ Nên nhưng không tạo Kị', () => {
    const result = danhGia({ truc: ThapNhiTruc.CHAP, yeuTo: [MaYeuTo.VO_LOC] });
    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
  });

  it('Tứ Ly ngoài exemption list tạo Kị bổ sung', () => {
    const result = danhGia({ truc: ThapNhiTruc.CHAP, yeuTo: [MaYeuTo.TU_LY] });
    expect(result.coKy).toBe(true);
  });

  it('canonical Q4/Q10 諸事皆忌 vẫn thắng', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.DAU,
      truc: ThapNhiTruc.CHAP,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    });
    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
  });
});

function danhGia(input: {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  tietKhiTrongNgay?: readonly TietKhi[];
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_TROC_NA_BAT_BO, {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.CANH,
    chiNgay: input.chiNgay ?? DiaChi.TY,
    truc: input.truc ?? ThapNhiTruc.DINH,
    dangThoVuong: false,
    tietKhiTrongNgay: input.tietKhiTrongNgay,
    yeuTo: (input.yeuTo ?? []).map(yeuTo),
  });
}

function yeuTo(ma: MaYeuTo): YeuToNgay {
  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon: [] };
}

function expectTrangThai(result: ReturnType<typeof danhGia>, ma: MaYeuTo, state: TrangThaiDongGop) {
  expect(
    result.dongGop.find(
      (item) => item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === ma,
    )?.trangThai,
  ).toBe(state);
}
