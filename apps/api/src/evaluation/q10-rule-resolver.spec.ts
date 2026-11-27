import { describe, expect, it } from 'vitest';

import { LoaiCongViec, QuyTacDungSu, TacDongDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
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

function boiCanh(yeuTo: readonly MaYeuTo[]) {
  return {
    chiThang: DiaChi.DAN,
    canNgay: ThienCan.GIAP,
    chiNgay: DiaChi.DAN,
    truc: ThapNhiTruc.KIEN,
    dangThoVuong: false,
    yeuTo: yeuTo.map((ma) => ({
      ma,
      loai: LoaiYeuTo.THAN_SAT,
      tenKhac: [],
      nguon: [],
    })),
  };
}
