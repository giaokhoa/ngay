import { describe, expect, it } from 'vitest';

import { QuyTacDungSu } from '../activities/activity-rule';
import { QUY_TAC_CUOI_HOI } from '../activities/cuoi-hoi-rules';
import { QUY_TAC_DI_CHUYEN } from '../activities/di-chuyen-rules';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiYeuTo, YeuToNgay } from '../factors/domain/day-factor';
import { MaYeuTo } from '../factors/domain/factor-code';
import { MA_XUNG_DOT_QUY_KY } from './di-chuyen-conflict-rules';
import { BoiCanhDanhGiaNgay, TrangThaiDongGop } from './evaluation-domain';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

describe('DI_CHUYEN evaluation dispatch', () => {
  it('Quy Kị + Thiên Đức: cả Nên và Kị còn hiệu lực, Quy Kị không bị xóa', () => {
    const result = danhGiaDiChuyen([MaYeuTo.QUY_KY, MaYeuTo.THIEN_DUC]);

    expectTrangThai(result.dongGop, MaYeuTo.QUY_KY, TrangThaiDongGop.HIEU_LUC);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC, TrangThaiDongGop.HIEU_LUC);
    expect(result.coNen).toBe(true);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(MA_XUNG_DOT_QUY_KY);
  });

  it.each([MaYeuTo.NGUYET_DUC, MaYeuTo.THIEN_XA, MaYeuTo.THIEN_NGUYEN])(
    'Quy Kị + %s: giữ blocker và trace Q10',
    (catThan) => {
      const result = danhGiaDiChuyen([MaYeuTo.QUY_KY, catThan]);
      expectTrangThai(result.dongGop, MaYeuTo.QUY_KY, TrangThaiDongGop.HIEU_LUC);
      expect(result.coKy).toBe(true);
      expect(result.xungDotDaApDung.map((item) => item.ma)).toContain(MA_XUNG_DOT_QUY_KY);
    },
  );

  it('Quy Kị + Thiên Đức Hợp: không tự hòa giải khác biệt Việt/Hán thành phép triệt', () => {
    const result = danhGiaDiChuyen([MaYeuTo.QUY_KY, MaYeuTo.THIEN_DUC_HOP]);

    expectTrangThai(result.dongGop, MaYeuTo.QUY_KY, TrangThaiDongGop.HIEU_LUC);
    expectTrangThai(result.dongGop, MaYeuTo.THIEN_DUC_HOP, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung).toHaveLength(0);
  });

  it('không chạy override riêng của CUOI_HOI lên DI_CHUYEN', () => {
    const result = danhGiaDiChuyen([MaYeuTo.DAI_THOI], DiaChi.DAN);

    expectTrangThai(result.dongGop, MaYeuTo.DAI_THOI, TrangThaiDongGop.HIEU_LUC);
    expect(result.coKy).toBe(true);
    expect(result.xungDotDaApDung.some((item) => item.ma === 'DAI_THOI_DAN_BO_KY')).toBe(false);
  });

  it('CUOI_HOI regression vẫn dispatch vào resolver cũ', () => {
    const boiCanh = taoBoiCanh([MaYeuTo.DAI_THOI], DiaChi.DAN);
    const result = service.danhGia(QUY_TAC_CUOI_HOI, boiCanh);

    expectTrangThai(result.dongGop, MaYeuTo.DAI_THOI, TrangThaiDongGop.BI_LOAI);
    expect(result.xungDotDaApDung.some((item) => item.ma === 'DAI_THOI_DAN_BO_KY')).toBe(true);
  });

  it('trace Quy Kị giữ provenance Việt Q10 tr.822 và Hán Q10', () => {
    const result = danhGiaDiChuyen([MaYeuTo.QUY_KY, MaYeuTo.THIEN_XA]);
    const trace = result.xungDotDaApDung.find((item) => item.ma === MA_XUNG_DOT_QUY_KY);

    expect(trace?.nguon).toHaveLength(2);
    expect(trace?.nguon[0]).toMatchObject({ tap: 1, quyen: 10, trang: 822, daXacMinh: true });
    expect(trace?.nguon[1]).toMatchObject({ quyen: 10, daXacMinh: true });
  });

  it('từ chối trộn rule của nhiều activity', () => {
    const mixed: readonly QuyTacDungSu[] = [QUY_TAC_CUOI_HOI[0]!, QUY_TAC_DI_CHUYEN[0]!];
    expect(() => service.danhGia(mixed, taoBoiCanh([]))).toThrow(
      'Không được trộn quy tắc của nhiều công việc',
    );
  });
});

function danhGiaDiChuyen(yeuTo: readonly MaYeuTo[], chiThang = DiaChi.DAN) {
  return service.danhGia(QUY_TAC_DI_CHUYEN, taoBoiCanh(yeuTo, chiThang));
}

function taoBoiCanh(yeuTo: readonly MaYeuTo[], chiThang = DiaChi.DAN): BoiCanhDanhGiaNgay {
  return {
    chiThang,
    canNgay: ThienCan.GIAP,
    chiNgay: DiaChi.DAN,
    truc: ThapNhiTruc.KIEN,
    yeuTo: yeuTo.map(taoYeuTo),
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
