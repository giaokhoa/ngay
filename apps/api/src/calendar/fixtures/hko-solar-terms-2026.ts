import { TietKhi } from '../domain/solar-term';

export interface MocTietKhiHko {
  tietKhi: TietKhi;
  thoiGianHkt: string;
}

export const MOC_TIET_KHI_HKO_2026: readonly MocTietKhiHko[] = [
  { tietKhi: TietKhi.TIEU_HAN, thoiGianHkt: '2026-01-05T16:23:00+08:00' },
  { tietKhi: TietKhi.DAI_HAN, thoiGianHkt: '2026-01-20T09:45:00+08:00' },
  { tietKhi: TietKhi.LAP_XUAN, thoiGianHkt: '2026-02-04T04:02:00+08:00' },
  { tietKhi: TietKhi.VU_THUY, thoiGianHkt: '2026-02-18T23:52:00+08:00' },
  { tietKhi: TietKhi.KINH_TRAP, thoiGianHkt: '2026-03-05T21:59:00+08:00' },
  { tietKhi: TietKhi.XUAN_PHAN, thoiGianHkt: '2026-03-20T22:46:00+08:00' },
  { tietKhi: TietKhi.THANH_MINH, thoiGianHkt: '2026-04-05T02:40:00+08:00' },
  { tietKhi: TietKhi.COC_VU, thoiGianHkt: '2026-04-20T09:39:00+08:00' },
  { tietKhi: TietKhi.LAP_HA, thoiGianHkt: '2026-05-05T19:49:00+08:00' },
  { tietKhi: TietKhi.TIEU_MAN, thoiGianHkt: '2026-05-21T08:37:00+08:00' },
  { tietKhi: TietKhi.MANG_CHUNG, thoiGianHkt: '2026-06-05T23:48:00+08:00' },
  { tietKhi: TietKhi.HA_CHI, thoiGianHkt: '2026-06-21T16:25:00+08:00' },
  { tietKhi: TietKhi.TIEU_THU, thoiGianHkt: '2026-07-07T09:57:00+08:00' },
  { tietKhi: TietKhi.DAI_THU, thoiGianHkt: '2026-07-23T03:13:00+08:00' },
  { tietKhi: TietKhi.LAP_THU, thoiGianHkt: '2026-08-07T19:43:00+08:00' },
  { tietKhi: TietKhi.XU_THU, thoiGianHkt: '2026-08-23T10:19:00+08:00' },
  { tietKhi: TietKhi.BACH_LO, thoiGianHkt: '2026-09-07T22:41:00+08:00' },
  { tietKhi: TietKhi.THU_PHAN, thoiGianHkt: '2026-09-23T08:05:00+08:00' },
  { tietKhi: TietKhi.HAN_LO, thoiGianHkt: '2026-10-08T14:29:00+08:00' },
  { tietKhi: TietKhi.SUONG_GIANG, thoiGianHkt: '2026-10-23T17:38:00+08:00' },
  { tietKhi: TietKhi.LAP_DONG, thoiGianHkt: '2026-11-07T17:52:00+08:00' },
  { tietKhi: TietKhi.TIEU_TUYET, thoiGianHkt: '2026-11-22T15:23:00+08:00' },
  { tietKhi: TietKhi.DAI_TUYET, thoiGianHkt: '2026-12-07T10:53:00+08:00' },
  { tietKhi: TietKhi.DONG_CHI, thoiGianHkt: '2026-12-22T04:50:00+08:00' },
];
