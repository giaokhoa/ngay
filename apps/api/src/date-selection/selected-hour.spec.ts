import { describe, expect, it } from 'vitest';

import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { tinhCanChiGio, xetCacGioTrongNgay } from './selected-hour';

describe('giờ thực hiện theo bảng giờ Hán', () => {
  it('Ngũ Thử Độn tính đúng Can giờ', () => {
    expect(tinhCanChiGio(ThienCan.GIAP, DiaChi.TY)).toEqual({
      can: ThienCan.GIAP,
      chi: DiaChi.TY,
    });
    expect(tinhCanChiGio(ThienCan.GIAP, DiaChi.NGO)).toEqual({
      can: ThienCan.CANH,
      chi: DiaChi.NGO,
    });
    expect(tinhCanChiGio(ThienCan.AT, DiaChi.MAO)).toEqual({
      can: ThienCan.KY,
      chi: DiaChi.MAO,
    });
  });

  it('Giáp Tý: giờ Tý tốt, Dần có Lộc/Mã, Mão hình, Ngọ phá + Ngũ Bất Ngộ', () => {
    const gio = xetCacGioTrongNgay({
      canChiNgay: { can: ThienCan.GIAP, chi: DiaChi.TY },
      canChiNam: { can: ThienCan.BINH, chi: DiaChi.THIN },
      canChiThang: { can: ThienCan.MAU, chi: DiaChi.TI },
      nguoiLienQuan: [],
    });

    expect(lay(gio, DiaChi.TY)).toMatchObject({
      xepLoai: 'NEN_DUNG',
      lyDoTot: expect.arrayContaining(['Giờ đồng Chi với ngày']),
    });
    expect(lay(gio, DiaChi.DAN)).toMatchObject({
      xepLoai: 'NEN_TRANH',
      thanHoangHac: { ma: 'BACH_HO', loai: 'HAC_DAO' },
      lyDoTot: expect.arrayContaining(['Lộc của Can ngày đến giờ', 'Dịch Mã của ngày đến giờ']),
      lyDoTranh: expect.arrayContaining(['Giờ Hắc đạo: Bạch Hổ']),
    });
    expect(lay(gio, DiaChi.MAO)).toMatchObject({
      xepLoai: 'NEN_TRANH',
      lyDoTranh: expect.arrayContaining(['Giờ hình ngày']),
    });
    expect(lay(gio, DiaChi.THAN)).toMatchObject({
      xepLoai: 'NEN_DUNG',
      dauGioThamKhao: ['TRIET_LO_KHONG'],
    });
    expect(lay(gio, DiaChi.NGO)).toMatchObject({
      xepLoai: 'NEN_TRANH',
      lyDoTranh: expect.arrayContaining(['Giờ phá ngày', 'Ngũ Bất Ngộ']),
    });
  });

  it('Ất Sửu: Mão là Lộc, Tỵ Ngũ Bất Ngộ, Mùi phá, Tuất hình', () => {
    const gio = xetCacGioTrongNgay({
      canChiNgay: { can: ThienCan.AT, chi: DiaChi.SUU },
      canChiNam: { can: ThienCan.GIAP, chi: DiaChi.DAN },
      canChiThang: { can: ThienCan.BINH, chi: DiaChi.MAO },
      nguoiLienQuan: [],
    });

    expect(lay(gio, DiaChi.MAO).lyDoTot).toContain('Lộc của Can ngày đến giờ');
    expect(lay(gio, DiaChi.TI).lyDoTranh).toContain('Ngũ Bất Ngộ');
    expect(lay(gio, DiaChi.MUI).lyDoTranh).toContain('Giờ phá ngày');
    expect(lay(gio, DiaChi.TUAT).lyDoTranh).toContain('Giờ hình ngày');
  });

  it('Ngũ Bất Ngộ khớp bảng Q7/Q31, không over-flag giờ cùng hành khắc', () => {
    const vectors = [
      [{ can: ThienCan.GIAP, chi: DiaChi.TY }, [DiaChi.NGO]],
      [{ can: ThienCan.AT, chi: DiaChi.SUU }, [DiaChi.TI]],
      [{ can: ThienCan.BINH, chi: DiaChi.DAN }, [DiaChi.THIN]],
      [{ can: ThienCan.DINH, chi: DiaChi.MAO }, [DiaChi.MAO]],
      [{ can: ThienCan.MAU, chi: DiaChi.THIN }, [DiaChi.DAN]],
      [{ can: ThienCan.KY, chi: DiaChi.TI }, [DiaChi.SUU, DiaChi.HOI]],
      [{ can: ThienCan.CANH, chi: DiaChi.NGO }, [DiaChi.TY, DiaChi.TUAT]],
      [{ can: ThienCan.TAN, chi: DiaChi.MUI }, [DiaChi.DAU]],
      [{ can: ThienCan.NHAM, chi: DiaChi.THAN }, [DiaChi.THAN]],
      [{ can: ThienCan.QUY, chi: DiaChi.DAU }, [DiaChi.MUI]],
    ] as const;

    for (const [canChiNgay, expected] of vectors) {
      const gio = xetCacGioTrongNgay({
        canChiNgay,
        canChiNam: { can: ThienCan.GIAP, chi: DiaChi.DAN },
        canChiThang: { can: ThienCan.BINH, chi: DiaChi.MAO },
        nguoiLienQuan: [],
      });

      expect(
        gio.filter((item) => item.lyDoTranh.includes('Ngũ Bất Ngộ')).map((item) => item.chiGio),
      ).toEqual(expected);
    }

    const giapTy = xetCacGioTrongNgay({
      canChiNgay: { can: ThienCan.GIAP, chi: DiaChi.TY },
      canChiNam: { can: ThienCan.BINH, chi: DiaChi.THIN },
      canChiThang: { can: ThienCan.MAU, chi: DiaChi.TI },
      nguoiLienQuan: [],
    });
    expect(lay(giapTy, DiaChi.MUI).lyDoTranh).not.toContain('Ngũ Bất Ngộ');
  });

  it('xung năm sinh ưu tiên loại giờ dù giờ có điều thuận', () => {
    const gio = xetCacGioTrongNgay({
      canChiNgay: { can: ThienCan.GIAP, chi: DiaChi.TY },
      canChiNam: { can: ThienCan.BINH, chi: DiaChi.THIN },
      canChiThang: { can: ThienCan.MAU, chi: DiaChi.TI },
      nguoiLienQuan: [{ namSinh: 1984 }],
    });

    const ngo = lay(gio, DiaChi.NGO);
    expect(ngo.xepLoai).toBe('XUNG_TUOI');
    expect(ngo.xungTuoi[0]?.canChiNamSinh).toEqual({
      can: ThienCan.GIAP,
      chi: DiaChi.TY,
    });
  });
});

function lay(gio: ReturnType<typeof xetCacGioTrongNgay>, chi: DiaChi) {
  const item = gio.find((value) => value.chiGio === chi);
  if (!item) throw new Error('Thiếu giờ ' + chi);
  return item;
}
