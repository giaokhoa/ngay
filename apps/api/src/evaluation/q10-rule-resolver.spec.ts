import { describe, expect, it } from 'vitest';

import { LoaiCongViec, QuyTacDungSu, TacDongDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { TietKhi } from '../calendar/domain/solar-term';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DongGopDanhGia, TrangThaiDongGop } from './evaluation-domain';
import { QuyTacXungDotDataDriven, apDungResolverQ10 } from './q10-rule-resolver';

describe('generic Q10 rule resolver', () => {
  it('fail loud khi delegation tạo cycle', () => {
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'A_TO_B',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT },
        phepXuLy: { loai: 'DELEGATE', den: { loai: 'YEU_TO', ma: MaYeuTo.TAI_SAT } },
        precedence: 10,
        moTa: 'A -> B',
        nguon: [],
      },
      {
        ma: 'B_TO_A',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.TAI_SAT },
        phepXuLy: { loai: 'DELEGATE', den: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT } },
        precedence: 10,
        moTa: 'B -> A',
        nguon: [],
      },
    ];

    expect(() =>
      apDungResolverQ10(
        [dongGopKy(MaYeuTo.KIEP_SAT)],
        boiCanh([MaYeuTo.KIEP_SAT, MaYeuTo.TAI_SAT]),
        rules,
      ),
    ).toThrow('Cycle trong Q10 delegation');
  });

  it('fail loud khi hai rule cùng precedence cho outcome khác nhau', () => {
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'KEEP',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT },
        phepXuLy: { loai: 'GIU_KY' },
        precedence: 10,
        moTa: 'keep',
        nguon: [],
      },
      {
        ma: 'REMOVE',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT },
        phepXuLy: { loai: 'BO_KY' },
        precedence: 10,
        moTa: 'remove',
        nguon: [],
      },
    ];

    expect(() =>
      apDungResolverQ10([dongGopKy(MaYeuTo.KIEP_SAT)], boiCanh([MaYeuTo.KIEP_SAT]), rules),
    ).toThrow('Xung đột Q10 cùng precedence');
  });

  it('global DELEGATE thêm Kị khi target giữ Kị', () => {
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'GLOBAL_TO_KIEP',
        phepXuLy: { loai: 'DELEGATE', den: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT } },
        precedence: 50,
        moTa: 'global delegates',
        nguon: [],
      },
      {
        ma: 'KIEP_KEEP',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT },
        phepXuLy: { loai: 'GIU_KY' },
        precedence: 10,
        moTa: 'keep',
        nguon: [],
      },
    ];

    const result = apDungResolverQ10([], boiCanh([]), rules);

    expect(result.coKyBoSung).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toEqual(['GLOBAL_TO_KIEP', 'KIEP_KEEP']);
  });

  it('global DELEGATE không thêm Kị khi target được cát giải', () => {
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'GLOBAL_TO_KIEP',
        phepXuLy: { loai: 'DELEGATE', den: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT } },
        precedence: 50,
        moTa: 'global delegates',
        nguon: [],
      },
      {
        ma: 'KIEP_REMOVE_WITH_DUC',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT },
        dieuKien: { coTatCaYeuTo: [MaYeuTo.THIEN_DUC] },
        phepXuLy: { loai: 'BO_KY' },
        precedence: 20,
        moTa: 'remove',
        nguon: [],
      },
      {
        ma: 'KIEP_KEEP',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT },
        phepXuLy: { loai: 'GIU_KY' },
        precedence: 10,
        moTa: 'keep',
        nguon: [],
      },
    ];

    const result = apDungResolverQ10([], boiCanh([MaYeuTo.THIEN_DUC]), rules);

    expect(result.coKyBoSung).toBe(false);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toEqual([
      'GLOBAL_TO_KIEP',
      'KIEP_REMOVE_WITH_DUC',
    ]);
  });

  it('global rule có thể match exact tiết khí trong ngày', () => {
    const nen = dongGopNen(MaYeuTo.THIEN_DUC);
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'SOLAR_TERM_REMOVE_NEN',
        dieuKien: { coBatKyTietKhiTrongNgay: [TietKhi.XUAN_PHAN, TietKhi.HA_CHI] },
        phepXuLy: { loai: 'BO_NEN' },
        precedence: 10,
        moTa: 'exact solar-term day suppresses Nên',
        nguon: [],
      },
    ];

    apDungResolverQ10(
      [nen],
      boiCanh([MaYeuTo.THIEN_DUC], { tietKhiTrongNgay: [TietKhi.XUAN_PHAN] }),
      rules,
    );
    expect(nen.trangThai).toBe(TrangThaiDongGop.BI_LOAI);
  });

  it('solar-term condition không match ngày thường', () => {
    const nen = dongGopNen(MaYeuTo.THIEN_DUC);
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'SOLAR_TERM_REMOVE_NEN',
        dieuKien: { coBatKyTietKhiTrongNgay: [TietKhi.DONG_CHI] },
        phepXuLy: { loai: 'BO_NEN' },
        precedence: 10,
        moTa: 'exact solar-term day suppresses Nên',
        nguon: [],
      },
    ];

    apDungResolverQ10([nen], boiCanh([MaYeuTo.THIEN_DUC]), rules);
    expect(nen.trangThai).toBe(TrangThaiDongGop.HIEU_LUC);
  });

  it('global BO_NEN không có danh sách mục tiêu thì bỏ toàn bộ Nên', () => {
    const nenA = dongGopNen(MaYeuTo.THIEN_DUC);
    const nenB = dongGopNen(MaYeuTo.NGUYET_DUC);
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'GLOBAL_REMOVE_ALL_NEN',
        dieuKien: { chiNgay: [DiaChi.DAN] },
        phepXuLy: { loai: 'BO_NEN' },
        precedence: 10,
        moTa: 'remove all Nên',
        nguon: [],
      },
    ];

    apDungResolverQ10([nenA, nenB], boiCanh([MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC]), rules);

    expect(nenA.trangThai).toBe(TrangThaiDongGop.BI_LOAI);
    expect(nenB.trangThai).toBe(TrangThaiDongGop.BI_LOAI);
  });

  it('global BO_NEN có danh sách mục tiêu vẫn chỉ bỏ Nên được chỉ định', () => {
    const nenA = dongGopNen(MaYeuTo.THIEN_DUC);
    const nenB = dongGopNen(MaYeuTo.NGUYET_DUC);
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'GLOBAL_REMOVE_SELECTED_NEN',
        phepXuLy: { loai: 'BO_NEN' },
        precedence: 10,
        moTa: 'remove one Nên',
        nguon: [],
        boNen: [{ loai: 'YEU_TO', ma: MaYeuTo.THIEN_DUC }],
      },
    ];

    apDungResolverQ10([nenA, nenB], boiCanh([MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC]), rules);

    expect(nenA.trangThai).toBe(TrangThaiDongGop.BI_LOAI);
    expect(nenB.trangThai).toBe(TrangThaiDongGop.HIEU_LUC);
  });

  it('Q10 target matching supports CAN_NGAY and NGAY_AM', () => {
    const canContribution = dongGopKyDieuKien('CAN', { loai: 'CAN_NGAY', can: ThienCan.DINH });
    const lunarContribution = dongGopKyDieuKien('LUNAR', { loai: 'NGAY_AM', ngay: 12 });
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'REMOVE_DINH',
        mucTieu: { loai: 'CAN_NGAY', can: ThienCan.DINH },
        phepXuLy: { loai: 'BO_KY' },
        precedence: 10,
        moTa: 'remove stem target',
        nguon: [],
      },
      {
        ma: 'REMOVE_LUNAR_12',
        mucTieu: { loai: 'NGAY_AM', ngay: 12 },
        phepXuLy: { loai: 'BO_KY' },
        precedence: 10,
        moTa: 'remove lunar target',
        nguon: [],
      },
    ];

    apDungResolverQ10(
      [canContribution, lunarContribution],
      boiCanh([], { canNgay: ThienCan.DINH, ngayAmTrongThang: 12 }),
      rules,
    );

    expect(canContribution.trangThai).toBe(TrangThaiDongGop.BI_LOAI);
    expect(lunarContribution.trangThai).toBe(TrangThaiDongGop.BI_LOAI);
  });

  it('Q10 delegate validates CAN_NGAY / NGAY_AM against context', () => {
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'GLOBAL_TO_DINH',
        phepXuLy: { loai: 'DELEGATE', den: { loai: 'CAN_NGAY', can: ThienCan.DINH } },
        precedence: 30,
        moTa: 'global to stem',
        nguon: [],
      },
      {
        ma: 'DINH_TO_LUNAR',
        mucTieu: { loai: 'CAN_NGAY', can: ThienCan.DINH },
        phepXuLy: { loai: 'DELEGATE', den: { loai: 'NGAY_AM', ngay: 12 } },
        precedence: 20,
        moTa: 'stem delegates to lunar day',
        nguon: [],
      },
      {
        ma: 'LUNAR_KEEP',
        mucTieu: { loai: 'NGAY_AM', ngay: 12 },
        phepXuLy: { loai: 'GIU_KY' },
        precedence: 10,
        moTa: 'keep lunar',
        nguon: [],
      },
    ];

    expect(
      apDungResolverQ10([], boiCanh([], { canNgay: ThienCan.DINH, ngayAmTrongThang: 12 }), rules)
        .coKyBoSung,
    ).toBe(true);
    expect(() =>
      apDungResolverQ10([], boiCanh([], { canNgay: ThienCan.DINH, ngayAmTrongThang: 13 }), rules),
    ).toThrow('Q10 delegate tới ngày âm không khớp context: 12');
  });

  it('rule precedence cao hơn thắng rule tổng quát', () => {
    const contribution = dongGopKy(MaYeuTo.KIEP_SAT);
    const rules: readonly QuyTacXungDotDataDriven[] = [
      {
        ma: 'BASE_KEEP',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT },
        phepXuLy: { loai: 'GIU_KY' },
        precedence: 10,
        moTa: 'base',
        nguon: [],
      },
      {
        ma: 'SPECIAL_REMOVE',
        mucTieu: { loai: 'YEU_TO', ma: MaYeuTo.KIEP_SAT },
        dieuKien: { chiThang: [DiaChi.DAN] },
        phepXuLy: { loai: 'BO_KY' },
        precedence: 20,
        moTa: 'special',
        nguon: [],
      },
    ];

    const result = apDungResolverQ10([contribution], boiCanh([MaYeuTo.KIEP_SAT]), rules);

    expect(contribution.trangThai).toBe(TrangThaiDongGop.BI_LOAI);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toEqual(['SPECIAL_REMOVE']);
  });
});

function dongGopKyDieuKien(suffix: string, dieuKien: QuyTacDungSu['dieuKien']): DongGopDanhGia {
  return {
    quyTac: {
      ma: 'TEST_' + suffix,
      congViec: LoaiCongViec.DI_CHUYEN,
      dieuKien,
      tacDong: TacDongDungSu.KY,
      nguon: [],
    },
    trangThai: TrangThaiDongGop.HIEU_LUC,
  };
}

function dongGopNen(ma: MaYeuTo): DongGopDanhGia {
  const quyTac: QuyTacDungSu = {
    ma: 'TEST_NEN_' + ma,
    congViec: LoaiCongViec.DI_CHUYEN,
    dieuKien: { loai: 'YEU_TO', ma },
    tacDong: TacDongDungSu.NEN,
    nguon: [],
  };

  return { quyTac, trangThai: TrangThaiDongGop.HIEU_LUC };
}

function dongGopKy(ma: MaYeuTo): DongGopDanhGia {
  const quyTac: QuyTacDungSu = {
    ma: 'TEST_' + ma,
    congViec: LoaiCongViec.DI_CHUYEN,
    dieuKien: { loai: 'YEU_TO', ma },
    tacDong: TacDongDungSu.KY,
    nguon: [],
  };

  return {
    quyTac,
    trangThai: TrangThaiDongGop.HIEU_LUC,
  };
}

function boiCanh(
  yeuTo: readonly MaYeuTo[],
  overrides: Partial<{
    canNgay: ThienCan;
    ngayAmTrongThang: number;
    tietKhiTrongNgay: readonly TietKhi[];
  }> = {},
) {
  return {
    chiThang: DiaChi.DAN,
    canNgay: overrides.canNgay ?? ThienCan.GIAP,
    chiNgay: DiaChi.DAN,
    ngayAmTrongThang: overrides.ngayAmTrongThang,
    truc: ThapNhiTruc.KIEN,
    dangThoVuong: false,
    tietKhiTrongNgay: overrides.tietKhiTrongNgay,
    yeuTo: yeuTo.map((ma) => ({
      ma,
      loai: LoaiYeuTo.THAN_SAT,
      tenKhac: [],
      nguon: [],
    })),
  };
}
