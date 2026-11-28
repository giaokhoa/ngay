import { describe, expect, it } from 'vitest';

import { QUY_TAC_QUET_DON_NHA_CUA } from '../activities/quet-don-nha-cua-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

describe('QUET_DON_NHA_CUA Q10 semantics', () => {
  it('Trừ nhật hoặc Trừ Thần/Ngũ Ly là Nên', () => {
    expect(danhGia({ truc: ThapNhiTruc.TRU }).coNen).toBe(true);
    expect(danhGia({ yeuTo: [MaYeuTo.NGU_LY] }).coNen).toBe(true);
  });

  it('ordinary 月破 / 四廢 / 月厭 do not invent Kị for 掃舍宇', () => {
    for (const factor of [MaYeuTo.NGUYET_PHA, MaYeuTo.TU_PHE, MaYeuTo.NGUYET_YEM]) {
      const result = danhGia({ truc: ThapNhiTruc.TRU, yeuTo: [factor] });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(false);
    }
  });

  it('Vô Lộc keeps Nên because 掃舍宇 is explicitly exempt', () => {
    const result = danhGia({ truc: ThapNhiTruc.TRU, yeuTo: [MaYeuTo.VO_LOC] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
    expect(result.xungDotDaApDung.some((x) => x.ma.endsWith('_VO_LOC_BO_NEN'))).toBe(false);
  });

  it.each([MaYeuTo.THUONG_SOC, MaYeuTo.TU_LY, MaYeuTo.TU_TUYET, MaYeuTo.HOI_NHAT] as const)(
    '%s does not suppress or add Kị because 掃舍宇 is in the Q10 exemption list',
    (factor) => {
      const result = danhGia({ truc: ThapNhiTruc.TRU, yeuTo: [factor] });
      expect(result.coNen).toBe(true);
      expect(result.coKy).toBe(false);
    },
  );

  it('月忌日 does not suppress the source Nên for 掃舍宇', () => {
    const result = danhGia({ truc: ThapNhiTruc.TRU, yeuTo: [MaYeuTo.NGUYET_KY] });
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(false);
  });

  it('canonical Q4/Q10 諸事皆忌 still wins', () => {
    const result = danhGia({
      chiThang: DiaChi.MAO,
      canNgay: ThienCan.AT,
      chiNgay: DiaChi.DAU,
      truc: ThapNhiTruc.TRU,
      yeuTo: [MaYeuTo.NGU_LY],
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
  yeuTo?: readonly MaYeuTo[];
}) {
  return service.danhGia(QUY_TAC_QUET_DON_NHA_CUA, {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.CANH,
    chiNgay: input.chiNgay ?? DiaChi.TY,
    truc: input.truc ?? ThapNhiTruc.DINH,
    dangThoVuong: false,
    yeuTo: (input.yeuTo ?? []).map(yeuTo),
  });
}

function yeuTo(ma: MaYeuTo): YeuToNgay {
  return { ma, loai: LoaiYeuTo.THAN_SAT, tenKhac: [], nguon: [] };
}
