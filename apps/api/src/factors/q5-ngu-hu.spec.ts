import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { Mua } from '../calendar/domain/season';
import { tinhMuaTheoChiThang } from '../calendar/season';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { TinhYeuToNgayService } from './factors.service';
import { CHI_NGAY_NGU_HU_THEO_MUA, DINH_NGHIA_NGU_HU } from './q5-ngu-hu-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const ORACLE = {
  [Mua.XUAN]: [TI, DAU, SUU],
  [Mua.HA]: [THAN, TY, THIN],
  [Mua.THU]: [HOI, MAO, MUI],
  [Mua.DONG]: [DAN, NGO, TUAT],
} as const;

describe('Q5 Ngũ Hư / 五虚', () => {
  it('khớp exact Việt p444–445 + Hán WYG_005-47b..48a', () => {
    expect(CHI_NGAY_NGU_HU_THEO_MUA).toEqual(ORACLE);
  });

  it('giữ Việt + Hán provenance verified', () => {
    expect(new Set(DINH_NGHIA_NGU_HU.nguon.map((source) => source.loaiNguon))).toEqual(
      new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
    );
    expect(DINH_NGHIA_NGU_HU.nguon.every((source) => source.daXacMinh)).toBe(true);
  });

  it('FactorsService emit đúng 3 Chi ngày của mỗi mùa qua đủ 12 chi tháng', () => {
    const service = new TinhYeuToNgayService();
    for (const chiThang of DIA_CHI_THEO_THU_TU) {
      const mua = tinhMuaTheoChiThang(chiThang);
      for (const chiNgay of DIA_CHI_THEO_THU_TU) {
        const result = service.tinh({
          chiThang,
          chiNgay,
          canNgay: ThienCan.GIAP,
          dangThoVuong: false,
        });
        expect(
          result.some((item) => item.ma === MaYeuTo.NGU_HU),
          `${chiThang}/${chiNgay}`,
        ).toBe(ORACLE[mua].includes(chiNgay as never));
      }
    }
  });
});
