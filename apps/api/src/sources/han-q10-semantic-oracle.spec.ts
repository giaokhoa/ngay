import { describe, expect, it } from 'vitest';

import { LoaiCongViec, QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_AN_GIUONG } from '../activities/an-giuong-rules';
import { QUY_TAC_AN_TANG } from '../activities/an-tang-rules';
import { QUY_TAC_CAU_PHUC } from '../activities/cau-phuc-rules';
import { QUY_TAC_CAU_TU } from '../activities/cau-tu-rules';
import { QUY_TAC_CAU_Y_TRI_BENH } from '../activities/cau-y-tri-benh-rules';
import { QUY_TAC_CHINH_DUNG_CAT_TOC } from '../activities/chinh-dung-cat-toc-rules';
import { QUY_TAC_CUOI_HOI } from '../activities/cuoi-hoi-rules';
import { QUY_TAC_DAT_COI_XAY_GIA } from '../activities/dat-coi-xay-gia-rules';
import { QUY_TAC_DI_CHUYEN } from '../activities/di-chuyen-rules';
import { QUY_TAC_GIAI_TRU } from '../activities/giai-tru-rules';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from '../activities/earthwork-rules';
import { QUY_TAC_KHAI_TRUONG } from '../activities/khai-truong-rules';
import { QUY_TAC_KHANH_THUONG } from '../activities/khanh-thuong-rules';
import { QUY_TAC_LAP_KHE_UOC_GIAO_DICH } from '../activities/lap-khe-uoc-giao-dich-rules';
import { QUY_TAC_MAY_DO } from '../activities/may-do-rules';
import { QUY_TAC_MO_KHO_XUAT_HANG_TIEN } from '../activities/mo-kho-xuat-hang-tien-rules';
import { QUY_TAC_NAP_TAI } from '../activities/nap-tai-rules';
import { QUY_TAC_NHAP_HOC } from '../activities/nhap-hoc-rules';
import { QUY_TAC_QUAN_DAI } from '../activities/quan-dai-rules';
import { QUY_TAC_QUET_DON_NHA_CUA } from '../activities/quet-don-nha-cua-rules';
import { QUY_TAC_SUA_BUONG_SAN_PHU } from '../activities/sua-buong-san-phu-rules';
import { QUY_TAC_SUA_MONG_TAY_CHAN } from '../activities/sua-mong-tay-chan-rules';
import { QUY_TAC_SUA_SANG_DUONG_SA } from '../activities/sua-sang-duong-sa-rules';
import { QUY_TAC_TE_TU } from '../activities/te-tu-rules';
import { QUY_TAC_TRANG_TRI_TUONG } from '../activities/trang-tri-tuong-rules';
import { QUY_TAC_XUAT_HANH } from '../activities/xuat-hanh-rules';
import { QUY_TAC_YEN_HOI } from '../activities/yen-hoi-rules';
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
  [LoaiCongViec.QUAN_DAI]: QUY_TAC_QUAN_DAI,
  [LoaiCongViec.NHAP_HOC]: QUY_TAC_NHAP_HOC,
  [LoaiCongViec.YEN_HOI]: QUY_TAC_YEN_HOI,
  [LoaiCongViec.KHANH_THUONG]: QUY_TAC_KHANH_THUONG,
  [LoaiCongViec.MAY_DO]: QUY_TAC_MAY_DO,
  [LoaiCongViec.MO_KHO_XUAT_HANG_TIEN]: QUY_TAC_MO_KHO_XUAT_HANG_TIEN,
  [LoaiCongViec.NAP_TAI]: QUY_TAC_NAP_TAI,
  [LoaiCongViec.LAP_KHE_UOC_GIAO_DICH]: QUY_TAC_LAP_KHE_UOC_GIAO_DICH,
  [LoaiCongViec.TE_TU]: QUY_TAC_TE_TU,
  [LoaiCongViec.CAU_PHUC]: QUY_TAC_CAU_PHUC,
  [LoaiCongViec.CAU_TU]: QUY_TAC_CAU_TU,
  [LoaiCongViec.CAU_Y_TRI_BENH]: QUY_TAC_CAU_Y_TRI_BENH,
  [LoaiCongViec.SUA_MONG_TAY_CHAN]: QUY_TAC_SUA_MONG_TAY_CHAN,
  [LoaiCongViec.SUA_BUONG_SAN_PHU]: QUY_TAC_SUA_BUONG_SAN_PHU,
  [LoaiCongViec.DAT_COI_XAY_GIA]: QUY_TAC_DAT_COI_XAY_GIA,
  [LoaiCongViec.QUET_DON_NHA_CUA]: QUY_TAC_QUET_DON_NHA_CUA,
  [LoaiCongViec.TRANG_TRI_TUONG]: QUY_TAC_TRANG_TRI_TUONG,
  [LoaiCongViec.SUA_SANG_DUONG_SA]: QUY_TAC_SUA_SANG_DUONG_SA,
  [LoaiCongViec.GIAI_TRU]: QUY_TAC_GIAI_TRU,
  [LoaiCongViec.CHINH_DUNG_CAT_TOC]: QUY_TAC_CHINH_DUNG_CAT_TOC,
  [LoaiCongViec.DONG_THO]: QUY_TAC_DONG_THO,
  [LoaiCongViec.SUA_CUNG_THAT]: QUY_TAC_SUA_CUNG_THAT,
  [LoaiCongViec.KHAI_TRUONG]: QUY_TAC_KHAI_TRUONG,
  [LoaiCongViec.XUAT_HANH]: QUY_TAC_XUAT_HANH,
  [LoaiCongViec.AN_TANG]: QUY_TAC_AN_TANG,
};

const ALL_ACTIVITIES = Object.values(LoaiCongViec);
const ACTIVITIES_WITH_TU_PHE_KY = ALL_ACTIVITIES.filter(
  (activity) =>
    activity !== LoaiCongViec.NHAP_HOC &&
    activity !== LoaiCongViec.TE_TU &&
    activity !== LoaiCongViec.CHINH_DUNG_CAT_TOC &&
    activity !== LoaiCongViec.SUA_MONG_TAY_CHAN &&
    activity !== LoaiCongViec.QUET_DON_NHA_CUA &&
    activity !== LoaiCongViec.SUA_SANG_DUONG_SA,
);
const ACTIVITIES_WITH_NGUYET_PHA_KY = ALL_ACTIVITIES.filter(
  (activity) =>
    activity !== LoaiCongViec.NHAP_HOC &&
    activity !== LoaiCongViec.TE_TU &&
    activity !== LoaiCongViec.GIAI_TRU &&
    activity !== LoaiCongViec.CAU_Y_TRI_BENH &&
    activity !== LoaiCongViec.QUET_DON_NHA_CUA &&
    activity !== LoaiCongViec.SUA_SANG_DUONG_SA,
);
const ACTIVITIES_WITH_NGU_MO_KY = ACTIVITIES_WITH_TU_PHE_KY.filter(
  (activity) =>
    activity !== LoaiCongViec.YEN_HOI &&
    activity !== LoaiCongViec.KHANH_THUONG &&
    activity !== LoaiCongViec.CAU_PHUC &&
    activity !== LoaiCongViec.CAU_TU &&
    activity !== LoaiCongViec.MAY_DO &&
    activity !== LoaiCongViec.NAP_TAI &&
    activity !== LoaiCongViec.MO_KHO_XUAT_HANG_TIEN &&
    activity !== LoaiCongViec.DAT_COI_XAY_GIA &&
    activity !== LoaiCongViec.TRANG_TRI_TUONG,
);

describe('independent Hán Q10 semantic oracle — WYG / Kanripo KR3g0051', () => {
  it.each(ACTIVITIES_WITH_NGUYET_PHA_KY)(
    '%s: 月破 + 天徳 remains Kị (WYG 010-29a..30b)',
    (activity) => {
      const result = danhGia(activity, {
        yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
      });

      expect(result.coKy).toBe(true);
      expectTrangThai(result.dongGop, MaYeuTo.NGUYET_PHA, TrangThaiDongGop.HIEU_LUC);
    },
  );

  it.each(ACTIVITIES_WITH_TU_PHE_KY)(
    '%s: 四廢 + 月徳 remains Kị (WYG 010-58a..58b)',
    (activity) => {
      const result = danhGia(activity, {
        yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC],
      });

      expect(result.coKy).toBe(true);
      expectTrangThai(result.dongGop, MaYeuTo.TU_PHE, TrangThaiDongGop.HIEU_LUC);
    },
  );

  it.each(ACTIVITIES_WITH_NGU_MO_KY)(
    '%s: 五墓 in month Ngọ + 月徳 removes Kị (WYG 010-60b..61a)',
    (activity) => {
      const result = danhGia(activity, {
        chiThang: DiaChi.NGO,
        yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
      });

      expectTrangThai(result.dongGop, MaYeuTo.NGU_MO, TrangThaiDongGop.BI_LOAI);
    },
  );

  it('祭祀 stays exempt from ordinary 月破 / 四廢 / 五墓 Kị branches', () => {
    for (const context of [
      { yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] },
      { yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] },
      { chiThang: DiaChi.NGO, yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC] },
    ] as const) {
      const result = danhGia(LoaiCongViec.TE_TU, context);
      expect(result.coKy).toBe(false);
      expect(result.camMoiViec).toBe(false);
    }
  });

  it('祭祀 keeps 天狗 and 寅日 as source-exact Kị', () => {
    const thienCau = danhGia(LoaiCongViec.TE_TU, {
      chiThang: DiaChi.THAN,
      chiNgay: DiaChi.TUAT,
      truc: ThapNhiTruc.MAN,
      yeuTo: [MaYeuTo.THIEN_CAU, MaYeuTo.THIEN_DUC, MaYeuTo.THIEN_VU],
    });
    const dan = danhGia(LoaiCongViec.TE_TU, {
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_XA],
    });

    expect(thienCau.coKy).toBe(true);
    expect(dan.coKy).toBe(true);
  });

  it('入學 keeps 忌無 for ordinary 月破 / 四廢 / 五墓 branches', () => {
    for (const context of [
      { yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC] },
      { yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC] },
      { chiThang: DiaChi.NGO, yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC] },
    ] as const) {
      const result = danhGia(LoaiCongViec.NHAP_HOC, context);
      expect(result.coKy).toBe(false);
      expect(result.camMoiViec).toBe(false);
    }
  });

  it('月厭 month Dần + 月徳 preserves only the Hán residual activity list', () => {
    const expectedKy: Readonly<Record<LoaiCongViec, boolean>> = {
      [LoaiCongViec.CUOI_HOI]: true,
      [LoaiCongViec.DI_CHUYEN]: true,
      [LoaiCongViec.AN_GIUONG]: false,
      [LoaiCongViec.QUAN_DAI]: false,
      [LoaiCongViec.NHAP_HOC]: false,
      [LoaiCongViec.YEN_HOI]: false,
      [LoaiCongViec.KHANH_THUONG]: false,
      [LoaiCongViec.TE_TU]: false,
      [LoaiCongViec.CAU_PHUC]: false,
      [LoaiCongViec.CAU_TU]: false,
      [LoaiCongViec.GIAI_TRU]: false,
      [LoaiCongViec.CHINH_DUNG_CAT_TOC]: false,
      [LoaiCongViec.CAU_Y_TRI_BENH]: true,
      [LoaiCongViec.SUA_MONG_TAY_CHAN]: false,
      [LoaiCongViec.MAY_DO]: false,
      [LoaiCongViec.NAP_TAI]: false,
      [LoaiCongViec.MO_KHO_XUAT_HANG_TIEN]: false,
      [LoaiCongViec.SUA_BUONG_SAN_PHU]: false,
      [LoaiCongViec.DAT_COI_XAY_GIA]: false,
      [LoaiCongViec.QUET_DON_NHA_CUA]: false,
      [LoaiCongViec.TRANG_TRI_TUONG]: false,
      [LoaiCongViec.SUA_SANG_DUONG_SA]: false,
      [LoaiCongViec.LAP_KHE_UOC_GIAO_DICH]: false,
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

  it('修置産室: 月建/土府 stay Kị with virtue while 死氣 can be released', () => {
    const kien = danhGia(LoaiCongViec.SUA_BUONG_SAN_PHU, {
      yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC],
    });
    const thoPhu = danhGia(LoaiCongViec.SUA_BUONG_SAN_PHU, {
      yeuTo: [MaYeuTo.THO_PHU, MaYeuTo.NGUYET_DUC],
    });
    const tuKhi = danhGia(LoaiCongViec.SUA_BUONG_SAN_PHU, {
      yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.THIEN_DUC],
    });
    expect(kien.coKy).toBe(true);
    expect(thoPhu.coKy).toBe(true);
    expect(tuKhi.coKy).toBe(false);
  });

  it('修置産室: 辰月 死氣 + 月厭 stays Kị even with virtue', () => {
    const result = danhGia(LoaiCongViec.SUA_BUONG_SAN_PHU, {
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });
    expect(result.coKy).toBe(true);
  });

  it('平治道塗: 平日 is Nên; ordinary 月破/劫煞/月刑/四廢 do not invent Kị', () => {
    for (const factor of [
      MaYeuTo.NGUYET_PHA,
      MaYeuTo.KIEP_SAT,
      MaYeuTo.NGUYET_HINH,
      MaYeuTo.TU_PHE,
    ]) {
      const result = danhGia(LoaiCongViec.SUA_SANG_DUONG_SA, {
        truc: ThapNhiTruc.BINH,
        yeuTo: [factor],
      });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(false);
    }
  });

  it('平治道塗: 月破+災煞+月厭 hard overlap still applies globally', () => {
    const result = danhGia(LoaiCongViec.SUA_SANG_DUONG_SA, {
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.NGUYET_YEM],
    });
    expect(result.camMoiViec).toBe(true);
    expect(result.coKy).toBe(true);
  });

  it('修飾垣墻: 平日 is Nên and 死神 does not turn it into Kị', () => {
    const result = danhGia(LoaiCongViec.TRANG_TRI_TUONG, {
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.TU_THAN],
    });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('修飾垣墻 stays exempt from 無祿 and 上朔四離四絶晦日 restrictions', () => {
    for (const factor of [
      MaYeuTo.VO_LOC,
      MaYeuTo.THUONG_SOC,
      MaYeuTo.TU_LY,
      MaYeuTo.TU_TUYET,
      MaYeuTo.HOI_NHAT,
    ] as const) {
      const result = danhGia(LoaiCongViec.TRANG_TRI_TUONG, {
        truc: ThapNhiTruc.BINH,
        yeuTo: [factor],
      });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(false);
    }
  });

  it('掃舍宇: 除日/除神 are Nên while ordinary 月破/四廢 remain non-Kị', () => {
    for (const factor of [MaYeuTo.NGUYET_PHA, MaYeuTo.TU_PHE]) {
      const result = danhGia(LoaiCongViec.QUET_DON_NHA_CUA, {
        truc: ThapNhiTruc.TRU,
        yeuTo: [factor],
      });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(false);
    }
    const truThan = danhGia(LoaiCongViec.QUET_DON_NHA_CUA, {
      yeuTo: [MaYeuTo.NGU_LY],
    });
    expect(truThan.coNen).toBe(true);
    expect(truThan.coKy).toBe(false);
  });

  it('掃舍宇 stays exempt from 無祿 and 上朔四離四絶晦日 restrictions', () => {
    for (const factor of [
      MaYeuTo.VO_LOC,
      MaYeuTo.THUONG_SOC,
      MaYeuTo.TU_LY,
      MaYeuTo.TU_TUYET,
      MaYeuTo.HOI_NHAT,
    ] as const) {
      const result = danhGia(LoaiCongViec.QUET_DON_NHA_CUA, {
        truc: ThapNhiTruc.TRU,
        yeuTo: [factor],
      });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(false);
    }
  });

  it('安碓磑: 平日/死神 are not baseline Kị while 三合/開日 are Nên', () => {
    const result = danhGia(LoaiCongViec.DAT_COI_XAY_GIA, {
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.TU_THAN, MaYeuTo.TAM_HOP],
    });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('安碓磑: 土符/地囊 remain Kị with virtue and 土王用事 remains Kị', () => {
    for (const context of [
      { yeuTo: [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC] },
      { yeuTo: [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA] },
      { dangThoVuong: true, yeuTo: [MaYeuTo.TAM_HOP] },
    ] as const) {
      const result = danhGia(LoaiCongViec.DAT_COI_XAY_GIA, context);
      expect(result.coKy).toBe(true);
    }
  });

  it('開倉庫出貨財: 月建 cát relief keeps 己未陽錯 exception', () => {
    const relieved = danhGia(LoaiCongViec.MO_KHO_XUAT_HANG_TIEN, {
      yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC],
    });
    const kyMui = danhGia(LoaiCongViec.MO_KHO_XUAT_HANG_TIEN, {
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      yeuTo: [MaYeuTo.NGUYET_KIEN, MaYeuTo.THIEN_DUC_HOP],
    });
    expect(relieved.coKy).toBe(false);
    expect(kyMui.coKy).toBe(true);
  });

  it('開倉庫出貨財: 五虚 can be released, 天賊 with virtue remains Kị, 甲日 is direct Kị', () => {
    const nguHu = danhGia(LoaiCongViec.MO_KHO_XUAT_HANG_TIEN, {
      yeuTo: [MaYeuTo.NGU_HU, MaYeuTo.LUC_HOP],
    });
    const thienTac = danhGia(LoaiCongViec.MO_KHO_XUAT_HANG_TIEN, {
      yeuTo: [MaYeuTo.THIEN_TAC, MaYeuTo.THIEN_DUC],
    });
    const giap = danhGia(LoaiCongViec.MO_KHO_XUAT_HANG_TIEN, {
      canNgay: ThienCan.GIAP,
      yeuTo: [MaYeuTo.NGUYET_AN],
    });
    expect(nguHu.coKy).toBe(false);
    expect(thienTac.coKy).toBe(true);
    expect(giap.coKy).toBe(true);
  });

  it('開倉庫出貨財: 月煞/月虚 is one canonical factor and 卯月德願 branch releases it', () => {
    const result = danhGia(LoaiCongViec.MO_KHO_XUAT_HANG_TIEN, {
      chiThang: DiaChi.MAO,
      yeuTo: [MaYeuTo.NGUYET_SAT, MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_NGUYEN],
    });
    expect(result.coKy).toBe(false);
    expect(
      result.dongGop.filter(
        (item) =>
          item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === MaYeuTo.NGUYET_SAT,
      ),
    ).toHaveLength(1);
  });

  it('納財: 收日 is Nên; 閉/五墓 are not baseline Kị', () => {
    const thu = danhGia(LoaiCongViec.NAP_TAI, { truc: ThapNhiTruc.THU, yeuTo: [] });
    const be = danhGia(LoaiCongViec.NAP_TAI, {
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.THIEN_NGUYEN],
    });
    const nguMo = danhGia(LoaiCongViec.NAP_TAI, {
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.THIEN_NGUYEN],
    });
    expect(thu.coNen).toBe(true);
    expect(thu.coKy).toBe(false);
    expect(be.coKy).toBe(false);
    expect(nguMo.coKy).toBe(false);
  });

  it('納財: 長星 / 短星 are supplemental Q10 Kị', () => {
    for (const [ma, trace] of [
      [MaYeuTo.TRUONG_TINH, 'NAP_TAI_Q10_TRUONG_TINH_KY'],
      [MaYeuTo.DOAN_TINH, 'NAP_TAI_Q10_DOAN_TINH_KY'],
    ] as const) {
      const result = danhGia(LoaiCongViec.NAP_TAI, {
        yeuTo: [ma, MaYeuTo.THIEN_NGUYEN],
      });
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.some((x) => x.ma === trace)).toBe(true);
    }
  });

  it('立劵交易: no 閉 baseline, 五離 has exact cát relief', () => {
    const closed = danhGia(LoaiCongViec.LAP_KHE_UOC_GIAO_DICH, {
      truc: ThapNhiTruc.BE,
      yeuTo: [MaYeuTo.THIEN_NGUYEN],
    });
    const nguLy = danhGia(LoaiCongViec.LAP_KHE_UOC_GIAO_DICH, {
      yeuTo: [MaYeuTo.NGU_LY, MaYeuTo.TAM_HOP],
    });
    expect(closed.coKy).toBe(false);
    expect(closed.coNen).toBe(true);
    expect(nguLy.coKy).toBe(false);
  });

  it('立劵交易: 長星 / 短星 are supplemental Q10 Kị', () => {
    for (const [ma, trace] of [
      [MaYeuTo.TRUONG_TINH, 'LAP_KHE_UOC_GIAO_DICH_Q10_TRUONG_TINH_KY'],
      [MaYeuTo.DOAN_TINH, 'LAP_KHE_UOC_GIAO_DICH_Q10_DOAN_TINH_KY'],
    ] as const) {
      const result = danhGia(LoaiCongViec.LAP_KHE_UOC_GIAO_DICH, {
        yeuTo: [ma, MaYeuTo.THIEN_NGUYEN],
      });
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.some((x) => x.ma === trace)).toBe(true);
    }
  });

  it('裁製: 長星 / 短星 add Q10 Kị without polluting Q11 baseline', () => {
    const longStar = danhGia(LoaiCongViec.MAY_DO, {
      yeuTo: [MaYeuTo.TRUONG_TINH, MaYeuTo.THIEN_DUC],
    });
    const shortStar = danhGia(LoaiCongViec.MAY_DO, {
      yeuTo: [MaYeuTo.DOAN_TINH, MaYeuTo.THIEN_DUC],
    });
    expect(longStar.coKy).toBe(true);
    expect(shortStar.coKy).toBe(true);
    expect(longStar.xungDotDaApDung.some((x) => x.ma === 'MAY_DO_Q10_TRUONG_TINH_KY')).toBe(true);
    expect(shortStar.xungDotDaApDung.some((x) => x.ma === 'MAY_DO_Q10_DOAN_TINH_KY')).toBe(true);
  });

  it('裁製: Q10 target branches release/cancel exactly like source, without Khai-trương boNen leakage', () => {
    const kiepRelieved = danhGia(LoaiCongViec.MAY_DO, {
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.THIEN_DUC],
    });
    const binhBalanced = danhGia(LoaiCongViec.MAY_DO, {
      chiThang: DiaChi.MAO,
      truc: ThapNhiTruc.BINH,
      yeuTo: [MaYeuTo.NGUYET_DUC, MaYeuTo.VUONG_NHAT],
    });
    const tuPhe = danhGia(LoaiCongViec.MAY_DO, {
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC],
    });
    expect(kiepRelieved.coKy).toBe(false);
    expect(binhBalanced.coKy).toBe(false);
    expect(binhBalanced.coNen).toBe(true);
    expect(tuPhe.coKy).toBe(true);
  });

  it('整手足甲: shares grooming Q10 targets but not the 丁日 suppression', () => {
    const pha = danhGia(LoaiCongViec.SUA_MONG_TAY_CHAN, {
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });
    const dinh = danhGia(LoaiCongViec.SUA_MONG_TAY_CHAN, {
      canNgay: ThienCan.DINH,
      truc: ThapNhiTruc.TRU,
      yeuTo: [MaYeuTo.GIAI_THAN],
    });
    const tuPhe = danhGia(LoaiCongViec.SUA_MONG_TAY_CHAN, {
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.GIAI_THAN],
    });
    expect(pha.coKy).toBe(true);
    expect(dinh.coNen).toBe(true);
    expect(dinh.coKy).toBe(false);
    expect(tuPhe.coKy).toBe(false);
  });

  it('整手足甲: lunar 1/6/15/19/21/23 are direct Kị', () => {
    for (const ngayAmTrongThang of [1, 6, 15, 19, 21, 23]) {
      expect(danhGia(LoaiCongViec.SUA_MONG_TAY_CHAN, { ngayAmTrongThang, yeuTo: [] }).coKy).toBe(
        true,
      );
    }
  });

  it('整容剃頭: 四廢 / 五墓 stay exempt, while 月破 remains Kị', () => {
    const tuPhe = danhGia(LoaiCongViec.CHINH_DUNG_CAT_TOC, {
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.GIAI_THAN],
    });
    const nguMo = danhGia(LoaiCongViec.CHINH_DUNG_CAT_TOC, {
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.GIAI_THAN],
    });
    const pha = danhGia(LoaiCongViec.CHINH_DUNG_CAT_TOC, {
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });

    expect(tuPhe.coKy).toBe(false);
    expect(nguMo.coKy).toBe(false);
    expect(pha.coKy).toBe(true);
  });

  it('整容剃頭: 丁日 suppresses Nên; lunar 12/15 remain direct Kị', () => {
    const dinh = danhGia(LoaiCongViec.CHINH_DUNG_CAT_TOC, {
      canNgay: ThienCan.DINH,
      truc: ThapNhiTruc.TRU,
      yeuTo: [MaYeuTo.GIAI_THAN],
    });
    const lunar12 = danhGia(LoaiCongViec.CHINH_DUNG_CAT_TOC, {
      ngayAmTrongThang: 12,
      yeuTo: [MaYeuTo.GIAI_THAN],
    });
    const lunar15 = danhGia(LoaiCongViec.CHINH_DUNG_CAT_TOC, {
      ngayAmTrongThang: 15,
      yeuTo: [MaYeuTo.GIAI_THAN],
    });

    expect(dinh.coNen).toBe(false);
    expect(dinh.coKy).toBe(true);
    expect(lunar12.coKy).toBe(true);
    expect(lunar15.coKy).toBe(true);
  });

  it('求醫療病: ordinary 月破 is exempt, but overlap branches restore medical Kị / hard-ban', () => {
    const ordinary = danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });
    const withVirtue = danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.THIEN_DUC],
    });
    const hard = danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
    });
    expect(ordinary.coKy).toBe(false);
    expect(withVirtue.coKy).toBe(true);
    expect(withVirtue.camMoiViec).toBe(false);
    expect(hard.camMoiViec).toBe(true);
  });

  it('求醫療病: residual medical Kị survives cát for 平/死神, 劫煞, 死氣, 往亡', () => {
    const cases = [
      danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
        chiThang: DiaChi.HOI,
        truc: ThapNhiTruc.BINH,
        yeuTo: [MaYeuTo.TU_THAN, MaYeuTo.THOI_DUC],
      }),
      danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
        chiThang: DiaChi.DAN,
        yeuTo: [MaYeuTo.KIEP_SAT, MaYeuTo.THIEN_DUC],
      }),
      danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
        yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.THIEN_DUC],
      }),
      danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
        yeuTo: [MaYeuTo.VANG_VONG, MaYeuTo.THIEN_XA],
      }),
    ];
    for (const result of cases) expect(result.coKy).toBe(true);
  });

  it('求醫療病: 大時 can be released, 五墓 has the May/November 月徳 release', () => {
    const daiThoi = danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.DAI_THOI, MaYeuTo.GIAI_THAN],
    });
    const nguMo = danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });
    expect(daiThoi.coKy).toBe(false);
    expect(nguMo.coKy).toBe(false);
  });

  it('求醫療病: 未日 / 十五日 / 朔弦望 are direct Kị', () => {
    const mui = danhGia(LoaiCongViec.CAU_Y_TRI_BENH, { chiNgay: DiaChi.MUI, yeuTo: [] });
    const lunar15 = danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
      ngayAmTrongThang: 15,
      yeuTo: [],
    });
    const phase = danhGia(LoaiCongViec.CAU_Y_TRI_BENH, {
      yeuTo: [MaYeuTo.SOC_HUYEN_VONG],
    });
    expect(mui.coKy).toBe(true);
    expect(lunar15.coKy).toBe(true);
    expect(phase.coKy).toBe(true);
  });

  it('解除: ordinary 月破 and special-calendar days stay exempt, while 四廢 / 五墓 remain source-driven Kị', () => {
    const pha = danhGia(LoaiCongViec.GIAI_TRU, {
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.THIEN_DUC],
    });
    const special = danhGia(LoaiCongViec.GIAI_TRU, {
      yeuTo: [MaYeuTo.VO_LOC, MaYeuTo.TU_LY, MaYeuTo.THIEN_DUC],
    });
    const tuPhe = danhGia(LoaiCongViec.GIAI_TRU, {
      yeuTo: [MaYeuTo.TU_PHE, MaYeuTo.NGUYET_DUC],
    });
    const nguMo = danhGia(LoaiCongViec.GIAI_TRU, {
      chiThang: DiaChi.NGO,
      yeuTo: [MaYeuTo.NGU_MO, MaYeuTo.NGUYET_DUC],
    });

    expect(pha.coKy).toBe(false);
    expect(special.coKy).toBe(false);
    expect(tuPhe.coKy).toBe(true);
    expect(nguMo.coKy).toBe(false);
  });

  it('解除: 月破 overlaps can restore Kị / hard-ban exactly as WYG 010-29b..30a', () => {
    const hard = danhGia(LoaiCongViec.GIAI_TRU, {
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT],
    });
    const withVirtue = danhGia(LoaiCongViec.GIAI_TRU, {
      chiThang: DiaChi.TY,
      yeuTo: [MaYeuTo.NGUYET_PHA, MaYeuTo.TAI_SAT, MaYeuTo.THIEN_DUC],
    });
    expect(hard.camMoiViec).toBe(true);
    expect(withVirtue.camMoiViec).toBe(false);
    expect(withVirtue.coKy).toBe(true);
  });

  it('解除: 天願 is not a Nên factor; 死氣 with virtue is released unless 辰戌月 meets 月厭', () => {
    const tianYuan = danhGia(LoaiCongViec.GIAI_TRU, { yeuTo: [MaYeuTo.THIEN_NGUYEN] });
    const relieved = danhGia(LoaiCongViec.GIAI_TRU, {
      yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.THIEN_DUC],
    });
    const blocked = danhGia(LoaiCongViec.GIAI_TRU, {
      chiThang: DiaChi.THIN,
      yeuTo: [MaYeuTo.TU_KHI, MaYeuTo.NGUYET_YEM, MaYeuTo.THIEN_DUC],
    });
    expect(tianYuan.coNen).toBe(false);
    expect(tianYuan.coKy).toBe(false);
    expect(relieved.coKy).toBe(false);
    expect(blocked.coKy).toBe(true);
  });

  it('求嗣: 天狗/寅日 suppresses Nên without inventing Kị (WYG 010-74a..74b)', () => {
    const thienCau = danhGia(LoaiCongViec.CAU_TU, {
      chiNgay: DiaChi.TUAT,
      yeuTo: [MaYeuTo.THIEN_CAU, MaYeuTo.THIEN_DUC],
    });
    const dan = danhGia(LoaiCongViec.CAU_TU, {
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });
    expect(thienCau.coNen).toBe(false);
    expect(thienCau.coKy).toBe(false);
    expect(dan.coNen).toBe(false);
    expect(dan.coKy).toBe(false);
  });

  it('求嗣: shares 月建 / 遊禍 / special-calendar conflict semantics with 祈福', () => {
    const kien = danhGia(LoaiCongViec.CAU_TU, {
      truc: ThapNhiTruc.KIEN,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });
    const duHoa = danhGia(LoaiCongViec.CAU_TU, {
      yeuTo: [MaYeuTo.DU_HOA, MaYeuTo.THIEN_XA],
    });
    const tuLy = danhGia(LoaiCongViec.CAU_TU, {
      yeuTo: [MaYeuTo.TU_LY, MaYeuTo.THIEN_DUC],
    });

    expect(kien.coKy).toBe(false);
    expect(duHoa.coKy).toBe(true);
    expect(tuLy.coKy).toBe(true);
  });

  it('祈福: 天狗/寅日 suppresses Nên without inventing Kị (WYG 010-74a..74b)', () => {
    const thienCau = danhGia(LoaiCongViec.CAU_PHUC, {
      chiNgay: DiaChi.TUAT,
      yeuTo: [MaYeuTo.THIEN_CAU, MaYeuTo.THIEN_DUC],
    });
    const dan = danhGia(LoaiCongViec.CAU_PHUC, {
      chiNgay: DiaChi.DAN,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });
    expect(thienCau.coNen).toBe(false);
    expect(thienCau.coKy).toBe(false);
    expect(dan.coNen).toBe(false);
    expect(dan.coKy).toBe(false);
  });

  it('祈福: 月建 + 天徳 removes Kị, but 己未月建 does not use 天徳合 alone', () => {
    const relieved = danhGia(LoaiCongViec.CAU_PHUC, {
      truc: ThapNhiTruc.KIEN,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });
    const kyMui = danhGia(LoaiCongViec.CAU_PHUC, {
      chiThang: DiaChi.MUI,
      canNgay: ThienCan.KY,
      chiNgay: DiaChi.MUI,
      truc: ThapNhiTruc.KIEN,
      yeuTo: [MaYeuTo.THIEN_DUC_HOP],
    });

    expect(relieved.coKy).toBe(false);
    expect(kyMui.coKy).toBe(true);
  });

  it('祈福: 遊禍 + 天徳/天赦 remains Kị; 四離/四絶/晦日 remain Kị', () => {
    for (const context of [
      { yeuTo: [MaYeuTo.DU_HOA, MaYeuTo.THIEN_DUC] },
      { yeuTo: [MaYeuTo.DU_HOA, MaYeuTo.THIEN_XA] },
      { yeuTo: [MaYeuTo.TU_LY, MaYeuTo.THIEN_DUC] },
      { yeuTo: [MaYeuTo.TU_TUYET, MaYeuTo.NGUYET_DUC] },
      { yeuTo: [MaYeuTo.HOI_NHAT, MaYeuTo.THIEN_XA] },
    ] as const) {
      expect(danhGia(LoaiCongViec.CAU_PHUC, context).coKy).toBe(true);
    }
  });

  it('慶賜賞賀: 酉日 suppresses Nên without creating Kị (WYG 010-74b)', () => {
    const result = danhGia(LoaiCongViec.KHANH_THUONG, {
      chiNgay: DiaChi.DAU,
      yeuTo: [MaYeuTo.NGU_LY, MaYeuTo.THIEN_DUC],
    });

    expect(result.coNen).toBe(false);
    expect(result.coKy).toBe(false);
    expectTrangThai(result.dongGop, MaYeuTo.NGU_LY, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.BI_LOAI);
  });

  it('宴會: 五離 + 天徳 is released, but 酉日 remains an independent Q11 Kị', () => {
    const than = danhGia(LoaiCongViec.YEN_HOI, {
      chiNgay: DiaChi.THAN,
      yeuTo: [MaYeuTo.NGU_LY, MaYeuTo.THIEN_DUC],
    });
    const dau = danhGia(LoaiCongViec.YEN_HOI, {
      chiNgay: DiaChi.DAU,
      yeuTo: [MaYeuTo.NGU_LY, MaYeuTo.THIEN_DUC],
    });

    expect(than.coKy).toBe(false);
    expect(dau.coKy).toBe(true);
    expectTrangThai(than.dongGop, MaYeuTo.NGU_LY, TrangThaiDongGop.BI_LOAI);
    expectTrangThai(dau.dongGop, MaYeuTo.NGU_LY, TrangThaiDongGop.BI_LOAI);
  });

  it('月厭 + 月徳 month Dần keeps 般移 Kị but releases 安牀 and 冠帶 (WYG 010-47b..48a)', () => {
    const diChuyen = danhGia(LoaiCongViec.DI_CHUYEN, {
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    const anGiuong = danhGia(LoaiCongViec.AN_GIUONG, {
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });
    const quanDai = danhGia(LoaiCongViec.QUAN_DAI, {
      chiThang: DiaChi.DAN,
      yeuTo: [MaYeuTo.NGUYET_YEM, MaYeuTo.NGUYET_DUC],
    });

    expect(diChuyen.coKy).toBe(true);
    expect(anGiuong.coKy).toBe(false);
    expect(quanDai.coKy).toBe(false);
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
  ngayAmTrongThang?: number;
  dangThoVuong?: boolean;
  yeuTo: readonly MaYeuTo[];
}

function danhGia(activity: LoaiCongViec, input: Input) {
  return service.danhGia(RULES[activity], taoBoiCanh(input));
}

function taoBoiCanh(input: Input): BoiCanhDanhGiaNgay {
  return {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.BINH,
    chiNgay: input.chiNgay ?? DiaChi.TY,
    truc: input.truc ?? ThapNhiTruc.THANH,
    ngayAmTrongThang: input.ngayAmTrongThang,
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
