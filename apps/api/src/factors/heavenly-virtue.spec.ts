import { describe, expect, it } from 'vitest';

import { DIA_CHI_THEO_THU_TU, DiaChi } from '../calendar/domain/earthly-branch';
import { THIEN_CAN_THEO_THU_TU, ThienCan } from '../calendar/domain/heavenly-stem';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { MaQuaiThienDuc } from './domain/heavenly-virtue-position';
import { TinhYeuToNgayService } from './factors.service';
import { DINH_NGHIA_THIEN_DUC } from './heavenly-virtue-definition';

const { DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI, TY, SUU } = DiaChi;
const { GIAP, AT, BINH, DINH, CANH, TAN, NHAM, QUY } = ThienCan;

// Oracle trực tiếp từ Quyển 5.
// undefined ở Mão/Ngọ/Dậu/Tý là chủ ý: sách giữ Khôn/Càn/Cấn/Tốn, không đổi sang Chi ngày.
const ORACLE_CAN_NGAY: Readonly<Partial<Record<DiaChi, ThienCan>>> = {
  [DAN]: DINH,
  [THIN]: NHAM,
  [TI]: TAN,
  [MUI]: GIAP,
  [THAN]: QUY,
  [TUAT]: BINH,
  [HOI]: AT,
  [SUU]: CANH,
};

const ORACLE_QUAI = {
  [MAO]: {
    ma: MaQuaiThienDuc.KHON,
    ten: 'Khôn',
    hanTu: '坤',
  },
  [NGO]: {
    ma: MaQuaiThienDuc.CAN_THIEN,
    ten: 'Càn',
    hanTu: '乾',
  },
  [DAU]: {
    ma: MaQuaiThienDuc.CAN_SON,
    ten: 'Cấn',
    hanTu: '艮',
  },
  [TY]: {
    ma: MaQuaiThienDuc.TON,
    ten: 'Tốn',
    hanTu: '巽',
  },
} as const;

describe('Thiên Đức — day-factor semantics', () => {
  const service = new TinhYeuToNgayService();

  for (const chiThang of DIA_CHI_THEO_THU_TU) {
    const canMongDoi = ORACLE_CAN_NGAY[chiThang];

    for (const canNgay of THIEN_CAN_THEO_THU_TU) {
      const nenCo = canMongDoi === canNgay;

      it(`${chiThang} / ${canNgay}: ${nenCo ? 'co' : 'khong co'} THIEN_DUC`, () => {
        const ketQua = service.tinh({
          chiThang,
          canNgay,
          chiNgay: DiaChi.TY,
          dangThoVuong: false,
        });

        expect(ketQua.some((yeuTo) => yeuTo.ma === MaYeuTo.THIEN_DUC)).toBe(nenCo);
      });
    }
  }
});

describe('Thiên Đức — source-faithful quẻ metadata', () => {
  it('giữ đúng bốn quẻ thay vì branch substitution', () => {
    expect(DINH_NGHIA_THIEN_DUC.quaiTheoChiThang).toEqual(ORACLE_QUAI);
  });

  it('bốn tháng trọng không có Can ngày để match', () => {
    for (const chiThang of [MAO, NGO, DAU, TY]) {
      expect(DINH_NGHIA_THIEN_DUC.canNgayTheoChiThang[chiThang]).toBeUndefined();
    }
  });

  it('Càn và Cấn có mã ASCII riêng, không đụng nhau', () => {
    expect(MaQuaiThienDuc.CAN_THIEN).not.toBe(MaQuaiThienDuc.CAN_SON);
    expect(DINH_NGHIA_THIEN_DUC.quaiTheoChiThang[NGO]?.ten).toBe('Càn');
    expect(DINH_NGHIA_THIEN_DUC.quaiTheoChiThang[DAU]?.ten).toBe('Cấn');
  });

  it('có provenance Việt và Hán đã xác minh', () => {
    const loaiNguon = new Set(DINH_NGHIA_THIEN_DUC.nguon.map((nguon) => nguon.loaiNguon));

    expect(loaiNguon).toEqual(new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]));
    expect(DINH_NGHIA_THIEN_DUC.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
  });
});
