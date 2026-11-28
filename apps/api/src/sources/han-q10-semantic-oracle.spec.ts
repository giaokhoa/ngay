import { describe, expect, it } from 'vitest';

import { LoaiCongViec, QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_AN_GIUONG } from '../activities/an-giuong-rules';
import { QUY_TAC_AN_TANG } from '../activities/an-tang-rules';
import { QUY_TAC_CUOI_HOI } from '../activities/cuoi-hoi-rules';
import { QUY_TAC_DI_CHUYEN } from '../activities/di-chuyen-rules';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from '../activities/earthwork-rules';
import { QUY_TAC_KHAI_TRUONG } from '../activities/khai-truong-rules';
import { QUY_TAC_XUAT_HANH } from '../activities/xuat-hanh-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from '../evaluation/evaluation-domain';
import { DanhGiaNgayService } from '../evaluation/evaluation.service';

const service = new DanhGiaNgayService();

const RULES: Readonly<Record<LoaiCongViec, readonly QuyTacDungSu[]>> = {
  [LoaiCongViec.CUOI_HOI]: QUY_TAC_CUOI_HOI,
  [LoaiCongViec.DI_CHUYEN]: QUY_TAC_DI_CHUYEN,
  [LoaiCongViec.AN_GIUONG]: QUY_TAC_AN_GIUONG,
  [LoaiCongViec.DONG_THO]: QUY_TAC_DONG_THO,
  [LoaiCongViec.SUA_CUNG_THAT]: QUY_TAC_SUA_CUNG_THAT,
  [LoaiCongViec.KHAI_TRUONG]: QUY_TAC_KHAI_TRUONG,
  [LoaiCongViec.XUAT_HANH]: QUY_TAC_XUAT_HANH,
  [LoaiCongViec.AN_TANG]: QUY_TAC_AN_TANG,
};

const ALL_ACTIVITIES = Object.values(LoaiCongViec);

describe('independent Hán Q10 semantic oracle — WYG / Kanripo KR3g0051', () => {
  it.each(ALL_ACTIVITIES)('%s: 月破 + 天徳 remains Kị (WYG 010-29a..30b)', (activity) => {
    const result = danhGia(activity, {
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });

    expect(result.coKy).toBe(true);
    expectTrangThai(result.dongGop, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
  });

  it.each(ALL_ACTIVITIES)('%s: 四廢 + 月徳 remains Kị (WYG 010-58a..58b)', (activity) => {
    const result = danhGia(activity, {
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC],
    });

    expect(result.coKy).toBe(true);
    expectTrangThai(result.dongGop, MaYeuTo.TU_PHE, TrangThaiDongGop.HIEU_LUC);
  });

  it.each(ALL_ACTIVITIES)(
    '%s: 五墓 in month Ngọ + 月徳 removes Kị (WYG 010-60b..61a)',
    (activity) => {
      const result = danhGia(activity, {
        chiThang: DiaChi.NGO,
        yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
      });

      expectTrangThai(result.dongGop, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
    },
  );

  it('月厭 month Dần + 月徳 preserves only the Hán residual activity list', () => {
    const expectedKy: Readonly<Record<LoaiCongViec, boolean>> = {
      [LoaiCongViec.CUOI_HOI]: true,
      [LoaiCongViec.DI_CHUYEN]: true,
      [LoaiCongViec.AN_GIUONG]: false,
      [LoaiCongViec.DONG_THO]: false,
      [LoaiCongViec.SUA_CUNG_THAT]: false,
      [LoaiCongViec.KHAI_TRUONG]: false,
      [LoaiCongViec.XUAT_HANH]: true,
      [LoaiCongViec.AN_TANG]: false,
    };

    for (const activity of ALL_ACTIVITIES) {
      const result = danhGia(activity, {
        chiThang: DiaChi.DAN,
        yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
      });

      expect(result.coKy, activity).toBe(expectedKy[activity]);
    }
  });

  it.each(ALL_ACTIVITIES)(
    '%s: 卯月 月破 + 災煞 + 月厭 remains 諸事皆忌 even with 月徳',
    (activity) => {
      const result = danhGia(activity, {
        chiThang: DiaChi.MAO,
        yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
      });

      expect(result.camMoiViec).toBe(true);
      expect(result.coKy).toBe(true);
    },
  );

  it('月厭 + 月徳 month Dần keeps 般移 Kị but releases 安牀 (WYG 010-47b..48a)', () => {
    const diChuyen = danhGia(LoaiCongViec.DI_CHUYEN, {
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    const anGiuong = danhGia(LoaiCongViec.AN_GIUONG, {
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });

    expect(diChuyen.coKy).toBe(true);
    expect(anGiuong.coKy).toBe(false);
  });

  it('行幸遣使: 天賊 + 天徳 still Kị (WYG 010-56b..57a)', () => {
    const result = danhGia(LoaiCongViec.XUAT_HANH, {
      yeuTo: [MaYeuTo.THIEN_TAC, MaYeuTo.THIEN_DUC],
    });

    expect(result.coKy).toBe(true);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_TAC, TrangThaiDongGop.HIEU_LUC);
  });

  it('般移: 歸忌 + 天赦 still Kị (WYG 010-63a..63b)', () => {
    const result = danhGia(LoaiCongViec.DI_CHUYEN, {
      yeuTo: [MaYeuTo.QUY_KY, MaYeuTo.THIEN_XA],
    });

    expect(result.coKy).toBe(true);
    expectTrangThai(result.dongGop, MaYeuTo.QUY_KY, TrangThaiDongGop.HIEU_LUC);
  });

  it('般移: 往亡 + 天徳 still Kị (WYG 010-63b..64a)', () => {
    const result = danhGia(LoaiCongViec.DI_CHUYEN, {
      yeuTo: [MaYeuTo.VANG_VONG, MaYeuTo.THIEN_DUC],
    });

    expect(result.coKy).toBe(true);
    expectTrangThai(result.dongGop, MaYeuTo.VANG_VONG, TrangThaiDongGop.HIEU_LUC);
  });

  it('安葬: 復日 + 鳴吠 remains Kị and 鳴吠 Nên is suppressed', () => {
    const result = danhGia(LoaiCongViec.AN_TANG, {
      yeuTo: [MaYeuTo.PHUC_NHAT, MaYeuTo.O_PHE],
    });

    expect(result.coKy).toBe(true);
    expect(result.coNen).toBe(false);
    expectTrangThai(result.dongGop, MaYeuTo.PHUC_NHAT, TrangThaiDongGop.HIEU_LUC);
    expectTrangThai(result.dongGop, MaYeuTo.O_PHE, TrangThaiDongGop.BI_LOAI);
  });

  it('安葬: 復日 + 天徳 is not Kị (WYG 010-64a..65a)', () => {
    const result = danhGia(LoaiCongViec.AN_TANG, {
      yeuTo: [MaYeuTo.PHUC_NHAT, MaYeuTo.THIEN_DUC],
    });

    expect(result.coKy).toBe(false);
    expectTrangThai(result.dongGop, MaYeuTo.PHUC_NHAT, TrangThaiDongGop.BI_LOAI);
  });

  it('安葬: 重日 + 六合 is not Kị (WYG 010-64a..65a)', () => {
    const result = danhGia(LoaiCongViec.AN_TANG, {
      yeuTo: [MaYeuTo.TRONG_NHAT, MaYeuTo.LUC_HOP],
    });

    expect(result.coKy).toBe(false);
    expectTrangThai(result.dongGop, MaYeuTo.TRONG_NHAT, TrangThaiDongGop.BI_LOAI);
  });

  it('安葬: 四忌 正月乙亥 + 天願 removes burial Kị (WYG 010-59a..59b)', () => {
    const result = danhGia(LoaiCongViec.AN_TANG, {
      chiThang: DiaChi.DAN,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.HOI,
      yeuTo: [MaYeuTo.TU_KY, MaYeuTo.THIEN_NGUYEN],
    });

    expectTrangThai(result.dongGop, MaYeuTo.TU_KY, TrangThaiDongGop.BI_LOAI);
  });

  it('AN_TANG 月建 + 天徳 removes burial Kị while earthwork remains Kị', () => {
    const anTang = danhGia(LoaiCongViec.AN_TANG, {
      yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC],
    });
    const dongTho = danhGia(LoaiCongViec.DONG_THO, {
      yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC],
    });

    expect(anTang.coKy).toBe(false);
    expect(dongTho.coKy).toBe(true);
  });
});

interface Input {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  yeuTo: readonly MaYeuTo[];
}

function danhGia(activity: LoaiCongViec, input: Input) {
  return service.danhGia(RULES[activity], taoBoiCanh(input));
}

function taoBoiCanh(input: Input): BoiCanhDanhGiaNgay {
  return {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.BINH,
    chiNgay: input.chiNgay ?? DiaChi.DAN,
    truc: input.truc ?? ThapNhiTruc.THANH,
    dangThoVuong: false,
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

function expectTrangThai(
  dongGop: readonly {
    quyTac: QuyTacDungSu;
    trangThai: TrangThaiDongGop;
  }[],
  ma: MaYeuTo,
  trangThai: TrangThaiDongGop,
): void {
  const item = dongGop.find(
    (candidate) =>
      candidate.quyTac.dieuKien.loai === 'YEU_TO' && candidate.quyTac.dieuKien.ma === ma,
  );
  expect(item?.trangThai).toBe(trangThai);
}
