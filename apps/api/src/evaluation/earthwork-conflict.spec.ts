import { describe, expect, it } from 'vitest';

import { QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_DONG_THO, QUY_TAC_SUA_CUNG_THAT } from '../activities/earthwork-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

describe('earthwork Q10 base semantics', () => {
  it('Thổ Phù + Thiên Đức vẫn giữ Kị DONG_THO', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THO_PHU_TIN, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_THO_PHU_TIN_VAN_KY',
    );
  });

  it('Địa Nang + Thiên Xá vẫn giữ Kị DONG_THO', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.DIA_NANG, MaYeuTo.THIEN_XA],
    });

    expectYeuTo(result.dongGop, MaYeuTo.DIA_NANG, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_DIA_NANG_VAN_KY',
    );
  });

  it('Thổ Phù vẫn là blocker SUA_CUNG_THAT khi không có cát thần', () => {
    const result = danhGiaSuaCungThat({
      yeuTo: [MaYeuTo.THO_PHU_TIN],
    });

    expectYeuTo(result.dongGop, MaYeuTo.THO_PHU_TIN, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(
      'EARTHWORK_Q10_THO_PHU_TIN_GIU_KY',
    );
  });

  it('Địa Nang vẫn là blocker SUA_CUNG_THAT khi không có cát thần', () => {
    const result = danhGiaSuaCungThat({
      yeuTo: [MaYeuTo.DIA_NANG],
    });

    expectYeuTo(result.dongGop, MaYeuTo.DIA_NANG, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
  });

  it('dangThoVuong=true match typed THO_VUONG blocker và giữ Kị', () => {
    const result = danhGiaDongTho({
      dangThoVuong: true,
      yeuTo: [MaYeuTo.THIEN_DUC],
    });

    const item = result.dongGop.find((candidate) => candidate.quyTac.dieuKien.loai === 'THO_VUONG');
    expect(item?.trangThai).toBe(TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((trace) => trace.ma)).toContain(
      'EARTHWORK_Q10_THO_VUONG_GIU_KY',
    );
  });

  it('dangThoVuong=false không match THO_VUONG rule', () => {
    const result = danhGiaDongTho({
      dangThoVuong: false,
      yeuTo: [],
    });

    expect(result.dongGop.some((item) => item.quyTac.dieuKien.loai === 'THO_VUONG')).toBe(false);
  });

  it('Q10 trace của blocker đất luôn giữ provenance Việt + Hán verified', () => {
    const result = danhGiaDongTho({
      yeuTo: [MaYeuTo.THO_PHU_TIN, MaYeuTo.THIEN_DUC],
    });

    for (const trace of result.xungDotDaApDung) {
      expect(trace.nguon).toHaveLength(2);
      expect(trace.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});

interface Input {
  chiThang?: DiaChi;
  canNgay?: ThienCan;
  chiNgay?: DiaChi;
  truc?: ThapNhiTruc;
  dangThoVuong?: boolean;
  yeuTo: readonly MaYeuTo[];
}

function danhGiaDongTho(input: Input) {
  return service.danhGia(QUY_TAC_DONG_THO, taoBoiCanh(input));
}

function danhGiaSuaCungThat(input: Input) {
  return service.danhGia(QUY_TAC_SUA_CUNG_THAT, taoBoiCanh(input));
}

function taoBoiCanh(input: Input): BoiCanhDanhGiaNgay {
  return {
    chiThang: input.chiThang ?? DiaChi.DAN,
    canNgay: input.canNgay ?? ThienCan.GIAP,
    chiNgay: input.chiNgay ?? DiaChi.DAN,
    truc: input.truc ?? ThapNhiTruc.KIEN,
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

function expectYeuTo(
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
