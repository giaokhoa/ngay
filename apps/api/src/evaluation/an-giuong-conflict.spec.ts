import { describe, expect, it } from 'vitest';

import { QUY_TAC_AN_GIUONG } from '../activities/an-giuong-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { QUY_TAC_Q10_AN_GIUONG } from './an-giuong-conflict-rules';

const service = new DanhGiaNgayService();

describe('AN_GIUONG Q10 resolver', () => {
  it('does not inherit Quy Kị or Vãng Vong from Di chuyển', () => {
    const targets = QUY_TAC_Q10_AN_GIUONG.flatMap((rule) =>
      rule.mucTieu?.loai === 'YEU_TO' ? [rule.mucTieu.ma] : [],
    );
    expect(targets).not.toContain(MaYeuTo.QUY_KY);
    expect(targets).not.toContain(MaYeuTo.VANG_VONG);
  });

  it('Dần + Nguyệt Yếm + Nguyệt Đức removes An giường Kị per exact Q10 residual list', () => {
    const result = service.danhGia(
      QUY_TAC_AN_GIUONG,
      boiCanh(DiaChi.DAN, [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC]),
    );
    expect(result.coKy).toBe(false);
    expect(
      result.dongGop.find(
        (item) =>
          item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === MaYeuTo.NGUYET_YEM,
      )?.trangThai,
    ).toBe('BI_LOAI');
  });

  it('Nguyệt Phá + Thiên Đức remains Kị', () => {
    const result = service.danhGia(
      QUY_TAC_AN_GIUONG,
      boiCanh(DiaChi.DAN, [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC]),
    );
    expect(result.coKy).toBe(true);
  });

  it('does not leak internal activity codes in consumer-facing conflict descriptions', () => {
    expect(QUY_TAC_Q10_AN_GIUONG.every((rule) => !/AN_GIUONG|DI_CHUYEN/.test(rule.moTa))).toBe(
      true,
    );
  });

  it('all cloned Q10 traces preserve verified source provenance', () => {
    for (const rule of QUY_TAC_Q10_AN_GIUONG) {
      expect(rule.nguon.length).toBeGreaterThan(0);
      expect(rule.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
      expect(rule.ma).toMatch(/^AN_GIUONG_Q10_/);
    }
  });
});

function boiCanh(chiThang: DiaChi, factors: readonly MaYeuTo[]) {
  return {
    chiThang,
    canNgay: ThienCan.BINH,
    chiNgay: DiaChi.DAN,
    truc: ThapNhiTruc.THANH,
    dangThoVuong: false,
    yeuTo: factors.map(yeuTo),
  };
}

function yeuTo(ma: MaYeuTo): YeuToNgay {
  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon: [] };
}
