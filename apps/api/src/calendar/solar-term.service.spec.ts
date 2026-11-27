import { describe, expect, it } from 'vitest';

import { DiaChi } from './domain/earthly-branch';
import { TietKhi } from './domain/solar-term';
import { MOC_TIET_KHI_HKO_2026 } from './fixtures/hko-solar-terms-2026';
import { TinhTietKhiService } from './solar-term.service';

const MOT_PHUT_MILLISECOND = 60_000;

describe('TinhTietKhiService', () => {
  const service = new TinhTietKhiService();

  it.each(MOC_TIET_KHI_HKO_2026)(
    'khop HKO 2026 o do phan giai phut: $tietKhi',
    ({ tietKhi, thoiGianHkt }) => {
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
  ])('doi chi thang dung tai instant $tietKhi', (tietKhi, chiTruoc, chiSau) => {
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
