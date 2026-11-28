import { describe, expect, it } from 'vitest';

import { QUY_TAC_QUAN_DAI } from '../activities/quan-dai-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';
import { QUY_TAC_Q10_QUAN_DAI } from './quan-dai-conflict-rules';

const service = new DanhGiaNgayService();

describe('QUAN_DAI Q10 resolver', () => {
  it('does not inherit Bế, Quy Kị or Vãng Vong from Di chuyển', () => {
    const targets = QUY_TAC_Q10_QUAN_DAI.flatMap((rule) => (rule.mucTieu ? [rule.mucTieu] : []));
    expect(targets.some((target) => target.loai === 'TRUC' && target.truc === ThapNhiTruc.BE)).toBe(
      false,
    );
    expect(targets.some((target) => target.loai === 'YEU_TO' && target.ma === MaYeuTo.QUY_KY)).toBe(
      false,
    );
    expect(
      targets.some((target) => target.loai === 'YEU_TO' && target.ma === MaYeuTo.VANG_VONG),
    ).toBe(false);
  });

  it('Dần + Nguyệt Yếm + Nguyệt Đức removes Quan đới Kị', () => {
    const result = service.danhGia(
      QUY_TAC_QUAN_DAI,
      boiCanh(DiaChi.DAN, DiaChi.DAN, ThapNhiTruc.THANH, [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC]),
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
      QUY_TAC_QUAN_DAI,
      boiCanh(DiaChi.DAN, DiaChi.DAN, ThapNhiTruc.DINH, [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC]),
    );
    expect(result.coKy).toBe(true);
  });

  it('Ngũ Mộ month Ngọ + Nguyệt Đức removes Kị', () => {
    const result = service.danhGia(
      QUY_TAC_QUAN_DAI,
      boiCanh(DiaChi.NGO, DiaChi.DAN, ThapNhiTruc.DINH, [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC]),
    );
    expect(result.coKy).toBe(false);
  });

  it('Bế nhật alone is not a Quan đới blocker, but Sửu day is', () => {
    const be = service.danhGia(
      QUY_TAC_QUAN_DAI,
      boiCanh(DiaChi.DAN, DiaChi.DAN, ThapNhiTruc.BE, []),
    );
    const suu = service.danhGia(
      QUY_TAC_QUAN_DAI,
      boiCanh(DiaChi.DAN, DiaChi.SUU, ThapNhiTruc.DINH, []),
    );
    expect(be.coKy).toBe(false);
    expect(suu.coKy).toBe(true);
  });

  it('does not leak internal activity codes in consumer-facing conflict descriptions', () => {
    expect(QUY_TAC_Q10_QUAN_DAI.every((rule) => !/QUAN_DAI|DI_CHUYEN/.test(rule.moTa))).toBe(true);
  });
});

function boiCanh(
  chiThang: DiaChi,
  chiNgay: DiaChi,
  truc: ThapNhiTruc,
  factors: readonly MaYeuTo[],
) {
  return {
    chiThang,
    canNgay: ThienCan.BINH,
    chiNgay,
    truc,
    dangThoVuong: false,
    yeuTo: factors.map(yeuTo),
  };
}

function yeuTo(ma: MaYeuTo): YeuToNgay {
  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon: [] };
}
