import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { TietKhi } from '../calendar/domain/solar-term';
import { LoaiNguon } from '../sources/source-reference';
import { MaYeuTo } from './domain/factor-code';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import { TinhYeuToNgayService } from './factors.service';
import { CAC_NGAY_CANDIDATE_VO_LOC, DINH_NGHIA_VO_LOC, laVoLoc } from './vo-loc-definition';

const { TY, SUU, DAN, MAO, THIN, TI, THAN, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

const BASE: BoiCanhTinhYeuToNgay = {
  chiThang: TUAT,
  canNgay: GIAP,
  chiNgay: THIN,
  dangThoVuong: false,
  canChiNam: { can: CANH, chi: TY },
  canChiThang: { can: BINH, chi: TUAT },
  trungKhiHienHanh: TietKhi.THU_PHAN,
};

const NONE = new Set<MaYeuTo>();

describe('Vô Lộc / 無祿 source-resolved calculator', () => {
  it('khóa đúng 10 candidate Q5', () => {
    expect(CAC_NGAY_CANDIDATE_VO_LOC.map((x) => [x.can, x.chi])).toEqual([
      [GIAP, THIN],
      [AT, TI],
      [CANH, THIN],
      [TAN, TI],
      [BINH, THAN],
      [MAU, TUAT],
      [DINH, HOI],
      [KY, SUU],
      [NHAM, THAN],
      [QUY, HOI],
    ]);
  });

  it('giữ provenance Việt Q5 + Hán Q5/Q10', () => {
    expect(new Set(DINH_NGHIA_VO_LOC.nguon.map((source) => source.loaiNguon))).toEqual(
      new Set([LoaiNguon.BAN_VIET, LoaiNguon.HAN_BAN]),
    );
    expect(DINH_NGHIA_VO_LOC.nguon.every((source) => source.daXacMinh)).toBe(true);
  });

  it.each(CAC_NGAY_CANDIDATE_VO_LOC.filter((x) => x.can !== QUY))(
    '$can $chi là Vô Lộc khi đủ context và không có điền thực',
    ({ can, chi }) => {
      expect(laVoLoc({ ...BASE, canNgay: can, chiNgay: chi }, NONE)).toBe(true);
    },
  );

  it.each(CAC_NGAY_CANDIDATE_VO_LOC.filter((x) => x.can !== QUY))(
    '$can $chi không bị suy Vô Lộc khi thiếu context',
    ({ can, chi }) => {
      expect(
        laVoLoc({ chiThang: TUAT, canNgay: can, chiNgay: chi, dangThoVuong: false }, NONE),
      ).toBe(false);
    },
  );

  it('Thiên Đức hoặc Nguyệt Đức giải Vô Lộc thường', () => {
    expect(laVoLoc({ ...BASE, canNgay: GIAP, chiNgay: THIN }, new Set([MaYeuTo.THIEN_DUC]))).toBe(
      false,
    );
    expect(laVoLoc({ ...BASE, canNgay: AT, chiNgay: TI }, new Set([MaYeuTo.NGUYET_DUC]))).toBe(
      false,
    );
  });

  it('Thái Tuế hoặc Nguyệt Kiến đóng chi Lộc thì điền thực', () => {
    expect(
      laVoLoc({ ...BASE, canNgay: GIAP, chiNgay: THIN, canChiNam: { can: CANH, chi: DAN } }, NONE),
    ).toBe(false);
    expect(
      laVoLoc(
        {
          ...BASE,
          chiThang: MAO,
          canNgay: AT,
          chiNgay: TI,
          canChiThang: { can: KY, chi: MAO },
        },
        NONE,
      ),
    ).toBe(false);
  });

  it.each(CAC_NGAY_CANDIDATE_VO_LOC.filter((x) => x.trungKhiGiai))(
    'Thái Dương tại $trungKhiGiai giải $can $chi',
    ({ can, chi, trungKhiGiai }) => {
      expect(
        laVoLoc({ ...BASE, canNgay: can, chiNgay: chi, trungKhiHienHanh: trungKhiGiai }, NONE),
      ).toBe(false);
    },
  );

  it.each([
    [GIAP, HOI, KY, SUU],
    [CANH, TI, AT, TI],
    [BINH, DAN, TAN, TI],
    [NHAM, THAN, DINH, HOI],
  ] as const)(
    'Tuế Đức Hợp + Nguyệt Đức Hợp meeting giải case %s/%s %s%s',
    (canNam, chiThang, canNgay, chiNgay) => {
      expect(
        laVoLoc(
          {
            ...BASE,
            chiThang,
            canNgay,
            chiNgay,
            canChiNam: { can: canNam, chi: TY },
            canChiThang: { can: MAU, chi: chiThang },
          },
          NONE,
        ),
      ).toBe(false);
    },
  );

  it.each([
    [CANH, HOI, CANH, THIN],
    [TAN, TI, BINH, THAN],
    [NHAM, DAN, NHAM, THAN],
    [QUY, THAN, MAU, TUAT],
  ] as const)(
    'Thiên Đức Hợp + Tuế Đức meeting giải case %s/%s %s%s',
    (canNam, chiThang, canNgay, chiNgay) => {
      expect(
        laVoLoc(
          {
            ...BASE,
            chiThang,
            canNgay,
            chiNgay,
            canChiNam: { can: canNam, chi: TY },
            canChiThang: { can: GIAP, chi: chiThang },
          },
          NONE,
        ),
      ).toBe(false);
    },
  );

  it.each([
    [GIAP, THIN],
    [AT, TI],
    [BINH, THAN],
    [DINH, HOI],
    [MAU, TUAT],
    [KY, SUU],
    [CANH, THIN],
    [TAN, TI],
    [NHAM, THAN],
  ] as const)('Can năm = Can tháng = Can ngày giải tam bằng %s%s', (canNgay, chiNgay) => {
    expect(
      laVoLoc(
        {
          ...BASE,
          canNgay,
          chiNgay,
          canChiNam: { can: canNgay, chi: TY },
          canChiThang: { can: canNgay, chi: TUAT },
        },
        NONE,
      ),
    ).toBe(false);
  });

  it('Quý Hợi luôn là Vô Lộc dù Đức/năm-tháng/Thái Dương đều điền thực', () => {
    expect(
      laVoLoc(
        {
          ...BASE,
          chiThang: TY,
          canNgay: QUY,
          chiNgay: HOI,
          canChiNam: { can: QUY, chi: TY },
          canChiThang: { can: QUY, chi: TY },
          trungKhiHienHanh: TietKhi.DONG_CHI,
        },
        new Set([MaYeuTo.THIEN_DUC, MaYeuTo.NGUYET_DUC]),
      ),
    ).toBe(true);
  });

  it('FactorsService chỉ emit VO_LOC sau khi xét các cát thần relief', () => {
    const service = new TinhYeuToNgayService();
    const hard = service.tinh({ ...BASE, canNgay: MAU, chiNgay: TUAT });
    expect(hard.map((item) => item.ma)).toContain(MaYeuTo.VO_LOC);

    const relieved = service.tinh({
      ...BASE,
      canNgay: GIAP,
      chiNgay: THIN,
      canChiNam: { can: CANH, chi: DAN },
    });
    expect(relieved.map((item) => item.ma)).not.toContain(MaYeuTo.VO_LOC);
  });
});
