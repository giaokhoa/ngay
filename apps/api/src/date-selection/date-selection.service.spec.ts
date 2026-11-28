import { describe, expect, it } from 'vitest';

import { LoaiCongViec } from '../activities/activity-rule';
import { DungSuService } from '../activities/activities.service';
import { TinhLichService } from '../calendar/calendar.service';
import { TinhThoVuongService } from '../calendar/earth-reign.service';
import { TinhTietKhiService } from '../calendar/solar-term.service';
import { DanhGiaNgayService } from '../evaluation/evaluation.service';
import { TinhYeuToNgayService } from '../factors/factors.service';
import { XemNgayService } from './date-selection.service';

function taoService(): XemNgayService {
  const tietKhi = new TinhTietKhiService();
  const thoVuong = new TinhThoVuongService(tietKhi);
  const lich = new TinhLichService(tietKhi, thoVuong);
  return new XemNgayService(
    lich,
    new TinhYeuToNgayService(),
    new DungSuService(),
    new DanhGiaNgayService(),
  );
}

describe('XemNgayService CUOI_HOI end-to-end', () => {
  it('orchestrates calendar -> factors -> Q11 -> Q10 with explanation', () => {
    const result = taoService().xemCuoiHoi(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.yeuTo.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for the same instant and timezone', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemCuoiHoi(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemCuoiHoi(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService DI_CHUYEN end-to-end', () => {
  it('orchestrates calendar -> factors -> Q11 DI_CHUYEN -> activity-specific evaluation', () => {
    const result = taoService().xemDiChuyen(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.yeuTo.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'DI_CHUYEN')).toBe(true);
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for DI_CHUYEN with the same instant and timezone', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemDiChuyen(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemDiChuyen(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService earthwork end-to-end', () => {
  it('DONG_THO carries real Thổ Vượng calendar fact into typed Q11 blocker', () => {
    const result = taoService().xemDongTho(
      new Date('2026-01-20T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-01-20');
    expect(result.dangThoVuong).toBe(true);
    expect(
      result.danhGia.dongGop.some(
        (item) =>
          item.quyTac.congViec === 'DONG_THO' &&
          item.quyTac.dieuKien.loai === 'THO_VUONG' &&
          item.trangThai === 'HIEU_LUC',
      ),
    ).toBe(true);
    expect(result.danhGia.coKy).toBe(true);
    expect(
      result.danhGia.xungDotDaApDung.some((item) => item.ma === 'EARTHWORK_Q10_THO_VUONG_GIU_KY'),
    ).toBe(true);
  });

  it('SUA_CUNG_THAT uses its own Q11 contract and verified provenance', () => {
    const result = taoService().xemSuaCungThat(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'SUA_CUNG_THAT')).toBe(
      true,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });
});

describe('XemNgayService KHAI_TRUONG end-to-end', () => {
  it('orchestrates calendar -> factors -> Q11 -> full Q10 KHAI_TRUONG', () => {
    const result = taoService().xemKhaiTruong(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.yeuTo.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'KHAI_TRUONG')).toBe(
      true,
    );
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for KHAI_TRUONG', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemKhaiTruong(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemKhaiTruong(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService XUAT_HANH end-to-end', () => {
  it('orchestrates calendar -> factors -> exact Q11 + Q10 supplement/resolver', () => {
    const result = taoService().xemXuatHanh(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.yeuTo.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'XUAT_HANH')).toBe(true);
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for XUAT_HANH', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemXuatHanh(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemXuatHanh(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService xem tháng + tương chủ', () => {
  it('trả đủ ngày trong tháng và xếp loại không dùng điểm cộng trừ', () => {
    const result = taoService().xemThang(2026, 11, 'Asia/Ho_Chi_Minh', LoaiCongViec.AN_TANG, [
      { namSinh: 1990 },
    ]);

    expect(result.ngay).toHaveLength(30);
    expect(Object.values(result.thongKe).reduce((sum, value) => sum + value, 0)).toBe(30);
    expect(
      result.ngay.every((item) =>
        ['TOT', 'TRUNG_BINH', 'NEN_TRANH', 'DAI_KY', 'XUNG_TUOI'].includes(item.xepLoai),
      ),
    ).toBe(true);
  });

  it('năm chọn xung năm sinh thì mọi ngày trong tháng đều bị xung tuổi', () => {
    // 1984 = Giáp Tý; 2026 sau Lập Xuân = Bính Ngọ.
    const result = taoService().xemThang(2026, 11, 'Asia/Ho_Chi_Minh', LoaiCongViec.KHAI_TRUONG, [
      { namSinh: 1984 },
    ]);

    expect(result.ngay.every((item) => item.xepLoai === 'XUNG_TUOI')).toBe(true);
    expect(
      result.ngay.every((item) => item.xungTuoi[0]?.xung.some((xung) => xung.tru === 'NAM')),
    ).toBe(true);
  });
});

describe('XemNgayService chi tiết ngày + giờ thực hiện', () => {
  it('trả 12 giờ và giữ tương chủ cho giờ', () => {
    const result = taoService().xemChiTietNgay(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
      LoaiCongViec.XUAT_HANH,
      [{ namSinh: 1984 }],
    );

    expect(result.gio).toHaveLength(12);
    expect(
      result.gio.every((item) =>
        ['NEN_DUNG', 'TRUNG_BINH', 'NEN_TRANH', 'XUNG_TUOI'].includes(item.xepLoai),
      ),
    ).toBe(true);
    expect(result.gio.some((item) => item.xungTuoi.length > 0)).toBe(true);
  });
});

describe('XemNgayService AN_TANG end-to-end', () => {
  it('orchestrates calendar -> factors -> exact Q11 -> full Q10 AN_TANG', () => {
    const result = taoService().xemAnTang(new Date('2026-11-27T05:00:00.000Z'), 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.yeuTo.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'AN_TANG')).toBe(true);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for AN_TANG', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemAnTang(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemAnTang(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});
