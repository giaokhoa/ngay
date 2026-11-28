import { describe, expect, it } from 'vitest';

import { QUY_TAC_CUOI_HOI } from '../activities/cuoi-hoi-rules';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { QUY_TAC_Q10_AN_GIUONG } from './an-giuong-conflict-rules';
import { QUY_TAC_Q10_AN_TANG } from './an-tang-conflict-rules';
import { QUY_TAC_Q10_CAU_PHUC } from './cau-phuc-conflict-rules';
import { QUY_TAC_Q10_CAU_TU } from './cau-tu-conflict-rules';
import { QUY_TAC_Q10_CAU_Y_TRI_BENH } from './cau-y-tri-benh-conflict-rules';
import { QUY_TAC_Q10_DI_CHUYEN } from './di-chuyen-conflict-rules';
import { QUY_TAC_Q10_GIAI_TRU } from './giai-tru-conflict-rules';
import { QUY_TAC_Q10_CHINH_DUNG_CAT_TOC } from './chinh-dung-cat-toc-conflict-rules';
import { QUY_TAC_Q10_CUOI_HOI_Q4 } from './cuoi-hoi-q4-conflict-rules';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { DanhGiaNgayService } from './evaluation.service';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QUY_TAC_Q10_KHANH_THUONG } from './khanh-thuong-conflict-rules';
import { QUY_TAC_Q10_MAY_DO } from './may-do-conflict-rules';
import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { QUY_TAC_Q10_QUAN_DAI } from './quan-dai-conflict-rules';
import { QUY_TAC_Q10_SUA_MONG_TAY_CHAN } from './sua-mong-tay-chan-conflict-rules';
import { QUY_TAC_Q10_TE_TU } from './te-tu-conflict-rules';
import { NGAY_CAM_MOI_VIEC_Q4 } from './q4-hard-days';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';
import { QUY_TAC_Q10_XUAT_HANH } from './xuat-hanh-conflict-rules';
import { QUY_TAC_Q10_YEN_HOI } from './yen-hoi-conflict-rules';

const HAN_Q4_Q10_HARD_DAY_KEYS = [
  'DAN:GIAP:TUAT:DAI_HOI_1',
  'MAO:AT:DAU:DAI_HOI_2',
  'NGO:BINH:NGO:DAI_HOI_5',
  'MUI:DINH:TI:DAI_HOI_6',
  'THAN:CANH:THIN:DAI_HOI_7',
  'DAU:TAN:MAO:DAI_HOI_8',
  'TY:NHAM:TY:DAI_HOI_11',
  'SUU:QUY:HOI:DAI_HOI_12',
  'MAO:KY:MAO:TIEU_HOI_2',
  'THIN:MAU:THIN:TIEU_HOI_3',
  'TI:KY:TI:TIEU_HOI_4',
  'NGO:MAU:NGO:TIEU_HOI_5',
  'DAU:KY:DAU:TIEU_HOI_8',
  'TUAT:MAU:TUAT:TIEU_HOI_9',
  'HOI:KY:HOI:TIEU_HOI_10',
  'TY:MAU:TY:TIEU_HOI_11',
  'DAN:TAN:DAU:TAM_AM_1',
  'THAN:AT:MAO:TAM_AM_7',
  'THIN:CANH:THIN:AM_VI_3',
  'TUAT:GIAP:TUAT:AM_VI_9',
  'TI:QUY:HOI:AM_DUONG_GIAO_PHA_4',
  'HOI:DINH:TI:AM_DUONG_GIAO_PHA_10',
  'NGO:NHAM:TY:AM_DUONG_KICH_XUNG_5',
  'TY:BINH:NGO:AM_DUONG_KICH_XUNG_11',
  'MUI:QUY:SUU:DUONG_PHA_AM_XUNG_6',
  'SUU:DINH:MUI:DUONG_PHA_AM_XUNG_12',
  'MAO:KY:DAU:DAO_AM_XUNG_DUONG_2',
  'DAU:KY:MAO:DAO_AM_XUNG_DUONG_8',
  'MAO:TAN:DAU:AM_THAC_2_TAN_DAU',
  'DAU:AT:MAO:AM_THAC_8_AT_MAO',
  'MUI:DINH:TI:AM_THAC_6_DINH_TI',
  'MUI:KY:TI:AM_THAC_6_KY_TI',
  'TI:MAU:THIN:TUYET_AM_4',
  'HOI:MAU:TUAT:TUYET_DUONG_10',
] as const;

describe('Q4/Q10 canonical hard days', () => {
  it('matches the explicit Hán WYG_010-48a..49b hard-day set', () => {
    expect(
      NGAY_CAM_MOI_VIEC_Q4.map(
        (item) => item.chiThang + ':' + item.canNgay + ':' + item.chiNgay + ':' + item.suffix,
      ),
    ).toEqual(HAN_Q4_Q10_HARD_DAY_KEYS);
  });

  it('keeps rule identities unique even when named conditions overlap one civil day', () => {
    const suffixes = NGAY_CAM_MOI_VIEC_Q4.map((item) => item.suffix);
    expect(new Set(suffixes).size).toBe(suffixes.length);

    const dayKeys = NGAY_CAM_MOI_VIEC_Q4.map(
      (item) => item.chiThang + ':' + item.canNgay + ':' + item.chiNgay,
    );
    expect(new Set(dayKeys).size).toBeLessThan(dayKeys.length);
  });

  it.each([
    ['CUOI_HOI', QUY_TAC_Q10_CUOI_HOI_Q4],
    ['DI_CHUYEN', QUY_TAC_Q10_DI_CHUYEN],
    ['AN_GIUONG', QUY_TAC_Q10_AN_GIUONG],
    ['QUAN_DAI', QUY_TAC_Q10_QUAN_DAI],
    ['NHAP_HOC', QUY_TAC_Q10_NHAP_HOC],
    ['YEN_HOI', QUY_TAC_Q10_YEN_HOI],
    ['KHANH_THUONG', QUY_TAC_Q10_KHANH_THUONG],
    ['TE_TU', QUY_TAC_Q10_TE_TU],
    ['CAU_PHUC', QUY_TAC_Q10_CAU_PHUC],
    ['CAU_TU', QUY_TAC_Q10_CAU_TU],
    ['GIAI_TRU', QUY_TAC_Q10_GIAI_TRU],
    ['CHINH_DUNG_CAT_TOC', QUY_TAC_Q10_CHINH_DUNG_CAT_TOC],
    ['CAU_Y_TRI_BENH', QUY_TAC_Q10_CAU_Y_TRI_BENH],
    ['SUA_MONG_TAY_CHAN', QUY_TAC_Q10_SUA_MONG_TAY_CHAN],
    ['MAY_DO', QUY_TAC_Q10_MAY_DO],
    ['DONG_THO/SUA_CUNG_THAT', QUY_TAC_Q10_CONG_VIEC_DAT],
    ['KHAI_TRUONG', QUY_TAC_Q10_KHAI_TRUONG],
    ['XUAT_HANH', QUY_TAC_Q10_XUAT_HANH],
    ['AN_TANG', QUY_TAC_Q10_AN_TANG],
  ] as const)('%s contains every canonical hard-day ban', (_name, rules) => {
    for (const day of NGAY_CAM_MOI_VIEC_Q4) {
      expect(coHardRule(rules, day.suffix, day.chiThang, day.canNgay, day.chiNgay)).toBe(true);
    }
  });

  it.each(NGAY_CAM_MOI_VIEC_Q4)(
    'CUOI_HOI bans $suffix instead of silently skipping the Q4/Q10 global rule',
    (day) => {
      const result = new DanhGiaNgayService().danhGia(QUY_TAC_CUOI_HOI, {
        chiThang: day.chiThang,
        canNgay: day.canNgay,
        chiNgay: day.chiNgay,
        truc: ThapNhiTruc.NGUY,
        dangThoVuong: false,
        yeuTo: [],
      });

      expect(result.camMoiViec).toBe(true);
      expect(
        result.xungDotDaApDung.some((item) => item.ma === 'CUOI_HOI_Q10_Q4_HARD_' + day.suffix),
      ).toBe(true);
    },
  );
});

function coHardRule(
  rules: readonly QuyTacXungDotDataDriven[],
  suffix: string,
  chiThang: string,
  canNgay: string,
  chiNgay: string,
): boolean {
  return rules.some(
    (rule) =>
      !rule.mucTieu &&
      rule.ma.includes(suffix) &&
      rule.phepXuLy.loai === 'CAM_MOI_VIEC' &&
      rule.dieuKien?.chiThang?.includes(chiThang as never) &&
      rule.dieuKien?.canNgay?.includes(canNgay as never) &&
      rule.dieuKien?.chiNgay?.includes(chiNgay as never),
  );
}
