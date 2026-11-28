import { describe, expect, it } from 'vitest';

import { LoaiCongViec } from '../activities/activity-rule';
import { DungSuService } from '../activities/activities.service';
import { TinhLichService } from '../calendar/calendar.service';
import { TinhThoVuongService } from '../calendar/earth-reign.service';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { TietKhi } from '../calendar/domain/solar-term';
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

describe('XemNgayService QUAN_DAI end-to-end', () => {
  it('orchestrates calendar -> factors -> source-resolved Q11 -> Q10 Quan đới resolver', () => {
    const result = taoService().xemQuanDai(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'QUAN_DAI')).toBe(true);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for QUAN_DAI', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemQuanDai(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemQuanDai(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService NHAP_HOC end-to-end', () => {
  it('orchestrates calendar -> factors -> exact Q11 忌無 -> universal Q10 hard-ban subset', () => {
    const result = taoService().xemNhapHoc(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'NHAP_HOC')).toBe(true);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for NHAP_HOC', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemNhapHoc(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemNhapHoc(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService YEN_HOI end-to-end', () => {
  it('orchestrates calendar -> Q5 factors -> exact Q11 -> Q10 Yến hội resolver', () => {
    const result = taoService().xemYenHoi(new Date('2026-11-27T05:00:00.000Z'), 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'YEN_HOI')).toBe(true);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for YEN_HOI', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemYenHoi(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemYenHoi(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService KHANH_THUONG end-to-end', () => {
  it('orchestrates calendar -> exact Q11 -> Q10 Khánh thưởng resolver', () => {
    const result = taoService().xemKhanhThuong(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'KHANH_THUONG')).toBe(
      true,
    );
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for KHANH_THUONG', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemKhanhThuong(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemKhanhThuong(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService TE_TU end-to-end', () => {
  it('orchestrates calendar -> Q6 ritual factors -> exact Hán Q11 -> Q10 universal hard subset', () => {
    const result = taoService().xemTeTu(new Date('2026-11-27T05:00:00.000Z'), 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'TE_TU')).toBe(true);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for TE_TU', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemTeTu(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemTeTu(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService CAU_PHUC end-to-end', () => {
  it('orchestrates calendar -> Q5/Q6/calendar factors -> Q11/Q10 Cầu phúc resolver', () => {
    const result = taoService().xemCauPhuc(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'CAU_PHUC')).toBe(true);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for CAU_PHUC', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemCauPhuc(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemCauPhuc(input, 'Asia/Ho_Chi_Minh'),
    );
  });
});

describe('XemNgayService AN_GIUONG end-to-end', () => {
  it('orchestrates calendar -> factors -> exact Q11 -> Q10 An giường resolver', () => {
    const result = taoService().xemAnGiuong(
      new Date('2026-11-27T05:00:00.000Z'),
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'AN_GIUONG')).toBe(true);
    expect(result.danhGia.dongGop.length).toBe(
      result.giaiThich.nen.length + result.giaiThich.ky.length + result.giaiThich.biLoai.length,
    );
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.nguon.every((nguon) => nguon.daXacMinh)),
    ).toBe(true);
  });

  it('is deterministic for AN_GIUONG', () => {
    const service = taoService();
    const input = new Date('2026-06-15T03:00:00.000Z');

    expect(service.xemAnGiuong(input, 'Asia/Ho_Chi_Minh')).toEqual(
      service.xemAnGiuong(input, 'Asia/Ho_Chi_Minh'),
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

describe('XemNgayService tổng quan tháng không bắt chọn việc', () => {
  it('tự suy Can-Chi năm sinh theo ngày sinh và mốc Lập Xuân', () => {
    const result = taoService().xemTongQuanThang('1990-02-03', 2026, 11, 'Asia/Ho_Chi_Minh');

    expect(result.nguoi.canChiNamSinh).toEqual({ can: 'KY', chi: 'TI' });
    expect(result.ngay).toHaveLength(30);
  });

  it('không giả định 12 giờ trưa khi sinh đúng ngày Lập Xuân', () => {
    expect(() => taoService().xemTongQuanThang('2026-02-04', 2026, 11, 'Asia/Ho_Chi_Minh')).toThrow(
      /Sinh đúng ngày Lập Xuân cần giờ sinh/,
    );
  });

  it('cùng một ngày giữ kết luận độc lập cho từng công việc', () => {
    const result = taoService().xemTongQuanThang('1990-06-15', 2026, 11, 'Asia/Ho_Chi_Minh');

    expect(
      result.ngay.some(
        (ngay) => new Set(Object.values(ngay.theoCongViec).map((item) => item.xepLoai)).size > 1,
      ),
    ).toBe(true);
    expect(result.ngay.every((ngay) => Object.keys(ngay.theoCongViec).length === 14)).toBe(true);
  });

  it('không lấy nhầm tuổi người đang xem để cá nhân hóa an táng', () => {
    const result = taoService().xemTongQuanThang('1984-06-15', 2026, 11, 'Asia/Ho_Chi_Minh');

    expect(result.ngay.every((ngay) => ngay.theoCongViec.KHAI_TRUONG.xepLoai === 'XUNG_TUOI')).toBe(
      true,
    );
    expect(result.ngay.every((ngay) => ngay.theoCongViec.AN_TANG.xepLoai !== 'XUNG_TUOI')).toBe(
      true,
    );
    expect(result.ngay[0]?.theoCongViec.AN_TANG.caNhanHoa).toBe('CAN_NGUOI_MAT');
  });
});

describe('Hoàng/Hắc đạo Q7 — cross-activity regression', () => {
  it('đổi theo Nguyệt kiến đúng instant giao tiết, không chờ ranh ngày hay tháng âm lịch', () => {
    const tietKhi = new TinhTietKhiService();
    const lapXuan = tietKhi.tinhThoiDiemTietKhi(2026, TietKhi.LAP_XUAN);
    const service = taoService();
    const truoc = service.xemCuoiHoi(new Date(lapXuan.getTime() - 1), 'Asia/Ho_Chi_Minh');
    const sau = service.xemCuoiHoi(lapXuan, 'Asia/Ho_Chi_Minh');

    // Cùng một ngày dân sự và cùng Can-Chi ngày; chỉ Nguyệt kiến đổi tại giao tiết.
    expect(truoc.ngayDanSu).toBe(sau.ngayDanSu);
    expect(truoc.canChiNgay).toEqual(sau.canChiNgay);
    expect(truoc.chiThang).toBe(DiaChi.SUU);
    expect(sau.chiThang).toBe(DiaChi.DAN);
    expect(truoc.thanHoangHac.ma).not.toBe(sau.thanHoangHac.ma);
  });

  it('Hắc đạo is an additional blocker only for the five activities named by Hán source', () => {
    const service = taoService();
    const result = service.xemTongQuanThang('1990-06-15', 2026, 11, 'Asia/Ho_Chi_Minh');
    const hac = result.ngay.find((ngay) => ngay.thanHoangHac.loai === 'HAC_DAO');
    const hoang = result.ngay.find((ngay) => ngay.thanHoangHac.loai === 'HOANG_DAO');

    expect(hac).toBeDefined();
    expect(hoang).toBeDefined();

    for (const activity of [
      LoaiCongViec.CUOI_HOI,
      LoaiCongViec.DI_CHUYEN,
      LoaiCongViec.DONG_THO,
      LoaiCongViec.SUA_CUNG_THAT,
      LoaiCongViec.XUAT_HANH,
    ]) {
      expect(hac?.theoCongViec[activity].coKy).toBe(true);
      expect(hac?.theoCongViec[activity].ky).toContain('Hắc đạo: ' + hac?.thanHoangHac.ten);
      expect(hoang?.theoCongViec[activity].ky).not.toContain('Hắc đạo: ' + hoang?.thanHoangHac.ten);
    }

    for (const activity of [
      LoaiCongViec.KHAI_TRUONG,
      LoaiCongViec.AN_GIUONG,
      LoaiCongViec.QUAN_DAI,
      LoaiCongViec.NHAP_HOC,
      LoaiCongViec.YEN_HOI,
      LoaiCongViec.KHANH_THUONG,
      LoaiCongViec.TE_TU,
      LoaiCongViec.CAU_PHUC,
      LoaiCongViec.AN_TANG,
    ]) {
      expect(hac?.theoCongViec[activity].ky).not.toContain('Hắc đạo: ' + hac?.thanHoangHac.ten);
    }
  });

  it('never changes the activity rule verdict when a Q7 marker is added', () => {
    const service = taoService();
    const detail = service.xemCuoiHoi(new Date('2026-11-01T05:00:00.000Z'), 'Asia/Ho_Chi_Minh');
    expect(detail.thanHoangHac.loai).toBe('HAC_DAO');
    expect(detail.hacDaoKyCongViec).toBe(true);

    // The Q10/Q11 evaluator stays independently auditable.
    expect(detail.danhGia.dongGop.length).toBe(
      detail.giaiThich.nen.length + detail.giaiThich.ky.length + detail.giaiThich.biLoai.length,
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
