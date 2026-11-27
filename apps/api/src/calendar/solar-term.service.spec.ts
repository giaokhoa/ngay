import { describe, expect, it } from 'vitest';

import { DiaChi } from './domain/earthly-branch';
import { TietKhi } from './domain/solar-term';
import { TinhTietKhiService } from './solar-term.service';

const MOT_PHUT_MILLISECOND = 60_000;

// Oracle: Hong Kong Observatory Almanac 2026.
// HKO publishes these times in HKT (UTC+8) to minute precision.
// Source: https://www.hko.gov.hk/en/gts/astron2026/almanac2026_index.htm
const MOC_TIET_KHI_HKO_2026 = [
  [TietKhi.TIEU_HAN, '2026-01-05T16:23:00+08:00'],
  [TietKhi.DAI_HAN, '2026-01-20T09:45:00+08:00'],
  [TietKhi.LAP_XUAN, '2026-02-04T04:02:00+08:00'],
  [TietKhi.VU_THUY, '2026-02-18T23:52:00+08:00'],
  [TietKhi.KINH_TRAP, '2026-03-05T21:59:00+08:00'],
  [TietKhi.XUAN_PHAN, '2026-03-20T22:46:00+08:00'],
  [TietKhi.THANH_MINH, '2026-04-05T02:40:00+08:00'],
  [TietKhi.COC_VU, '2026-04-20T09:39:00+08:00'],
  [TietKhi.LAP_HA, '2026-05-05T19:49:00+08:00'],
  [TietKhi.TIEU_MAN, '2026-05-21T08:37:00+08:00'],
  [TietKhi.MANG_CHUNG, '2026-06-05T23:48:00+08:00'],
  [TietKhi.HA_CHI, '2026-06-21T16:25:00+08:00'],
  [TietKhi.TIEU_THU, '2026-07-07T09:57:00+08:00'],
  [TietKhi.DAI_THU, '2026-07-23T03:13:00+08:00'],
  [TietKhi.LAP_THU, '2026-08-07T19:43:00+08:00'],
  [TietKhi.XU_THU, '2026-08-23T10:19:00+08:00'],
  [TietKhi.BACH_LO, '2026-09-07T22:41:00+08:00'],
  [TietKhi.THU_PHAN, '2026-09-23T08:05:00+08:00'],
  [TietKhi.HAN_LO, '2026-10-08T14:29:00+08:00'],
  [TietKhi.SUONG_GIANG, '2026-10-23T17:38:00+08:00'],
  [TietKhi.LAP_DONG, '2026-11-07T17:52:00+08:00'],
  [TietKhi.TIEU_TUYET, '2026-11-22T15:23:00+08:00'],
  [TietKhi.DAI_TUYET, '2026-12-07T10:53:00+08:00'],
  [TietKhi.DONG_CHI, '2026-12-22T04:50:00+08:00'],
] as const;

describe('TinhTietKhiService', () => {
  const service = new TinhTietKhiService();

  it.each(MOC_TIET_KHI_HKO_2026)(
    'khop HKO 2026 o do phan giai phut: %s',
    (tietKhi, thoiGianHkt) => {
      const thucTe = service.tinhThoiDiemTietKhi(2026, tietKhi);
      const oracleHko = new Date(thoiGianHkt);
      const chenhLech = Math.abs(thucTe.getTime() - oracleHko.getTime());

      expect(chenhLech).toBeLessThanOrEqual(MOT_PHUT_MILLISECOND);
    },
  );

  it.each([
    [TietKhi.TIEU_HAN, DiaChi.TY, DiaChi.SUU],
    [TietKhi.LAP_XUAN, DiaChi.SUU, DiaChi.DAN],
    [TietKhi.KINH_TRAP, DiaChi.DAN, DiaChi.MAO],
    [TietKhi.THANH_MINH, DiaChi.MAO, DiaChi.THIN],
    [TietKhi.LAP_HA, DiaChi.THIN, DiaChi.TI],
    [TietKhi.MANG_CHUNG, DiaChi.TI, DiaChi.NGO],
    [TietKhi.TIEU_THU, DiaChi.NGO, DiaChi.MUI],
    [TietKhi.LAP_THU, DiaChi.MUI, DiaChi.THAN],
    [TietKhi.BACH_LO, DiaChi.THAN, DiaChi.DAU],
    [TietKhi.HAN_LO, DiaChi.DAU, DiaChi.TUAT],
    [TietKhi.LAP_DONG, DiaChi.TUAT, DiaChi.HOI],
    [TietKhi.DAI_TUYET, DiaChi.HOI, DiaChi.TY],
  ] as const)('doi chi thang dung tai instant %s', (tietKhi, chiTruoc, chiSau) => {
    const giaoTiet = service.tinhThoiDiemTietKhi(2026, tietKhi);

    expect(service.tinhChiThangTaiThoiDiem(new Date(giaoTiet.getTime() - 1))).toBe(chiTruoc);
    expect(service.tinhChiThangTaiThoiDiem(giaoTiet)).toBe(chiSau);
    expect(service.tinhChiThangTaiThoiDiem(new Date(giaoTiet.getTime() + 1))).toBe(chiSau);
  });

  it('truoc Tieu Han van la thang Ty cua Dai Tuyet nam truoc', () => {
    const tieuHan = service.tinhThoiDiemTietKhi(2026, TietKhi.TIEU_HAN);

    expect(service.tinhChiThangTaiThoiDiem(new Date(tieuHan.getTime() - 1))).toBe(DiaChi.TY);
  });
});
