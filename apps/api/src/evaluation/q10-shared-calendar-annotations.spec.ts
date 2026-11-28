import { describe, expect, it } from 'vitest';

import { DungSuService } from '../activities/activities.service';
import { LoaiCongViec, QuyTacDungSu, TacDongDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';

const evaluator = new DanhGiaNgayService();
const activities = new DungSuService();
const ALL = Object.values(LoaiCongViec);
const EXEMPT = new Set<LoaiCongViec>([
  LoaiCongViec.TE_TU,
  LoaiCongViec.GIAI_TRU,
  LoaiCongViec.CHINH_DUNG_CAT_TOC,
  LoaiCongViec.SUA_MONG_TAY_CHAN,
  LoaiCongViec.QUET_DON_NHA_CUA,
]);
const HAS_OWN_SPECIAL_KY = new Set<LoaiCongViec>([LoaiCongViec.CAU_PHUC, LoaiCongViec.CAU_TU]);

describe('Q10 shared calendar annotations', () => {
  it.each(ALL)(
    '%s: Vô Lộc suppresses Nên outside the exact exemption list, never invents Kị',
    (activity) => {
      const result = synthetic(activity, [MaYeuTo.VO_LOC]);
      if (EXEMPT.has(activity)) {
        expect(result.coNen).toBe(true);
        expect(result.coKy).toBe(false);
      } else {
        expect(result.coNen).toBe(false);
        expect(result.coKy).toBe(false);
        expect(result.xungDotDaApDung.some((x) => x.ma.endsWith('_VO_LOC_BO_NEN'))).toBe(true);
      }
    },
  );

  it.each(ALL)(
    '%s: Hối nhật suppresses Nên outside exemptions, does not create generic Kị',
    (activity) => {
      const result = synthetic(activity, [MaYeuTo.HOI_NHAT]);
      if (EXEMPT.has(activity)) {
        expect(result.coNen).toBe(true);
        expect(result.coKy).toBe(false);
      } else {
        expect(result.coNen).toBe(false);
        expect(result.coKy).toBe(false);
        expect(result.xungDotDaApDung.some((x) => x.ma.endsWith('_HOI_NHAT_BO_NEN'))).toBe(true);
      }
    },
  );

  it.each(ALL)('%s: Tứ Ly creates supplemental Kị for non-exempt activities', (activity) => {
    const result = synthetic(activity, [MaYeuTo.TU_LY]);
    if (EXEMPT.has(activity) || HAS_OWN_SPECIAL_KY.has(activity)) {
      expect(result.coKy).toBe(false);
    } else {
      expect(result.coKy).toBe(true);
      expect(
        result.xungDotDaApDung.some((x) => x.ma.endsWith('_THUONG_SOC_TU_LY_TU_TUYET_KY')),
      ).toBe(true);
    }
  });

  it.each([MaYeuTo.THUONG_SOC, MaYeuTo.TU_LY, MaYeuTo.TU_TUYET] as const)(
    'Cầu phúc/Cầu tự retain their own baseline Kị for %s and avoid duplicate shared trace',
    (factor) => {
      for (const activity of [LoaiCongViec.CAU_PHUC, LoaiCongViec.CAU_TU]) {
        const result = evaluator.danhGia(activities.layQuyTac(activity), context([factor]));
        expect(result.coKy).toBe(true);
        expect(
          result.xungDotDaApDung.some((x) => x.ma.endsWith('_THUONG_SOC_TU_LY_TU_TUYET_KY')),
        ).toBe(false);
      }
    },
  );

  it('Cầu phúc/Cầu tự Vô Lộc keep their specific Kị while shared annotation removes Nên', () => {
    for (const activity of [LoaiCongViec.CAU_PHUC, LoaiCongViec.CAU_TU]) {
      const result = evaluator.danhGia(
        activities.layQuyTac(activity),
        context([MaYeuTo.VO_LOC, MaYeuTo.THIEN_DUC]),
      );
      expect(result.coNen).toBe(false);
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.some((x) => x.ma.endsWith('_VO_LOC_BO_NEN'))).toBe(true);
    }
  });

  it('Nhập học honors shared supplemental Kị instead of dropping coKyBoSung', () => {
    const result = synthetic(LoaiCongViec.NHAP_HOC, [MaYeuTo.TU_TUYET]);
    expect(result.coKy).toBe(true);
  });
});

function synthetic(activity: LoaiCongViec, factors: readonly MaYeuTo[]) {
  const rule: QuyTacDungSu = {
    ma: 'TEST_NEN_' + activity,
    congViec: activity,
    dieuKien: { loai: 'CHI_NGAY', chi: DiaChi.TY },
    tacDong: TacDongDungSu.NEN,
    nguon: [],
  };
  return evaluator.danhGia([rule], context(factors));
}

function context(factors: readonly MaYeuTo[]) {
  return {
    chiThang: DiaChi.DAN,
    canNgay: ThienCan.CANH,
    chiNgay: DiaChi.TY,
    truc: ThapNhiTruc.DINH,
    dangThoVuong: false,
    yeuTo: factors.map(yeuTo),
  };
}

function yeuTo(ma: MaYeuTo): YeuToNgay {
  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon: [] };
}
