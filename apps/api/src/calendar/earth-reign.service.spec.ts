import { describe, expect, it } from 'vitest';

import { soSanhNgayDanSu } from './civil-date';
import { TietKhi } from './domain/solar-term';
import { TinhThoVuongService } from './earth-reign.service';
import { TinhTietKhiService } from './solar-term.service';

describe('TinhThoVuongService', () => {
  const service = new TinhThoVuongService(new TinhTietKhiService());

  it('tao dung 4 khoang 18 civil days o Asia/Ho_Chi_Minh nam 2026', () => {
    expect(service.tinhCacKhoangThoVuong(2026, 'Asia/Ho_Chi_Minh')).toEqual([
      {
        tietKetThuc: TietKhi.LAP_XUAN,
        tuNgay: '2026-01-17',
        denTruocNgay: '2026-02-04',
      },
      {
        tietKetThuc: TietKhi.LAP_HA,
        tuNgay: '2026-04-17',
        denTruocNgay: '2026-05-05',
      },
      {
        tietKetThuc: TietKhi.LAP_THU,
        tuNgay: '2026-07-20',
        denTruocNgay: '2026-08-07',
      },
      {
        tietKetThuc: TietKhi.LAP_DONG,
        tuNgay: '2026-10-20',
        denTruocNgay: '2026-11-07',
      },
    ]);
  });

  it('moi khoang co dung 18 civil days', () => {
    for (const khoang of service.tinhCacKhoangThoVuong(2026, 'Asia/Ho_Chi_Minh')) {
      expect(soSanhNgayDanSu(khoang.denTruocNgay, khoang.tuNgay)).toBe(18);
    }
  });

  it('start inclusive va ngay Lap exclusive', () => {
    expect(service.dangThoVuong('2026-01-16', 'Asia/Ho_Chi_Minh')).toBe(false);
    expect(service.dangThoVuong('2026-01-17', 'Asia/Ho_Chi_Minh')).toBe(true);
    expect(service.dangThoVuong('2026-02-03', 'Asia/Ho_Chi_Minh')).toBe(true);
    expect(service.dangThoVuong('2026-02-04', 'Asia/Ho_Chi_Minh')).toBe(false);
  });

  it('boundary thay doi theo civil date cua timezone context', () => {
    const hcm = service.tinhCacKhoangThoVuong(2026, 'Asia/Ho_Chi_Minh')[0];
    const utc = service.tinhCacKhoangThoVuong(2026, 'UTC')[0];
    const losAngeles = service.tinhCacKhoangThoVuong(2026, 'America/Los_Angeles')[0];

    expect(hcm).toEqual({
      tietKetThuc: TietKhi.LAP_XUAN,
      tuNgay: '2026-01-17',
      denTruocNgay: '2026-02-04',
    });
    expect(utc).toEqual({
      tietKetThuc: TietKhi.LAP_XUAN,
      tuNgay: '2026-01-16',
      denTruocNgay: '2026-02-03',
    });
    expect(losAngeles).toEqual(utc);
  });
});
