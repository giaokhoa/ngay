import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';

import { DungSuService } from '../activities/activities.service';
import { TinhLichService } from '../calendar/calendar.service';
import { TinhThoVuongService } from '../calendar/earth-reign.service';
import { TinhTietKhiService } from '../calendar/solar-term.service';
import { DanhGiaNgayService } from '../evaluation/evaluation.service';
import { TinhYeuToNgayService } from '../factors/factors.service';
import { XemNgayController } from './date-selection.controller';
import { XemNgayService } from './date-selection.service';

function taoController(): XemNgayController {
  const tietKhi = new TinhTietKhiService();
  const lich = new TinhLichService(tietKhi, new TinhThoVuongService(tietKhi));
  const service = new XemNgayService(
    lich,
    new TinhYeuToNgayService(),
    new DungSuService(),
    new DanhGiaNgayService(),
  );
  return new XemNgayController(service);
}

describe('XemNgayController', () => {
  it('trả kết quả CUOI_HOI có explanation và source trace', () => {
    const result = taoController().xemCuoiHoi('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.nguon.length > 0)).toBe(true);

    const source = result.danhGia.dongGop[0]?.quyTac.nguon[0];
    expect(source).toBeDefined();
    expect(Object.keys(source ?? {}).sort()).toEqual(['daXacMinh', 'loaiNguon']);
  });

  it('trả kết quả DI_CHUYEN có explanation và Q11 provenance', () => {
    const result = taoController().xemDiChuyen('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'DI_CHUYEN')).toBe(true);
  });

  it('trả kết quả AN_GIUONG có exact Q11 provenance', () => {
    const result = taoController().xemAnGiuong('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'AN_GIUONG')).toBe(true);
  });

  it('trả kết quả QUAN_DAI có source-resolved Q11 provenance', () => {
    const result = taoController().xemQuanDai('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'QUAN_DAI')).toBe(true);
  });

  it('trả kết quả NHAP_HOC có exact Q11 provenance', () => {
    const result = taoController().xemNhapHoc('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'NHAP_HOC')).toBe(true);
  });

  it('trả kết quả YEN_HOI có exact Q11 provenance', () => {
    const result = taoController().xemYenHoi('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'YEN_HOI')).toBe(true);
  });

  it('trả kết quả KHANH_THUONG có exact Q11 provenance', () => {
    const result = taoController().xemKhanhThuong('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'KHANH_THUONG')).toBe(
      true,
    );
  });

  it('trả kết quả TE_TU có exact Q11 provenance', () => {
    const result = taoController().xemTeTu('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'TE_TU')).toBe(true);
  });

  it('trả kết quả CAU_PHUC có source-resolved Q11/Q10 provenance', () => {
    const result = taoController().xemCauPhuc('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'CAU_PHUC')).toBe(true);
  });

  it('trả kết quả CAU_TU có source-resolved Q11/Q10 provenance', () => {
    const result = taoController().xemCauTu('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'CAU_TU')).toBe(true);
  });

  it('trả kết quả GIAI_TRU có exact Hán Q11 + source-resolved Q10 provenance', () => {
    const result = taoController().xemGiaiTru('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'GIAI_TRU')).toBe(true);
  });

  it('trả kết quả CHINH_DUNG_CAT_TOC có exact Q11/Q10 provenance', () => {
    const result = taoController().xemChinhDungCatToc(
      '2026-11-27T05:00:00.000Z',
      'Asia/Ho_Chi_Minh',
    );

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'CHINH_DUNG_CAT_TOC'),
    ).toBe(true);
  });

  it('trả kết quả CAU_Y_TRI_BENH có exact Q11/Q10 provenance', () => {
    const result = taoController().xemCauYTriBenh('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.giaiThich).toBeDefined();
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'CAU_Y_TRI_BENH')).toBe(
      true,
    );
  });

  it('trả kết quả SUA_MONG_TAY_CHAN có exact Q11/Q10 provenance', () => {
    const result = taoController().xemSuaMongTayChan(
      '2026-11-27T05:00:00.000Z',
      'Asia/Ho_Chi_Minh',
    );
    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'SUA_MONG_TAY_CHAN'),
    ).toBe(true);
  });

  it('trả kết quả MAY_DO có exact Q11 + supplemental Q10 provenance', () => {
    const result = taoController().xemMayDo('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');
    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'MAY_DO')).toBe(true);
  });

  it('trả kết quả LAP_KHE_UOC_GIAO_DICH có exact Q11 + supplemental Q10 provenance', () => {
    const result = taoController().xemLapKheUocGiaoDich(
      '2026-11-27T05:00:00.000Z',
      'Asia/Ho_Chi_Minh',
    );
    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'LAP_KHE_UOC_GIAO_DICH'),
    ).toBe(true);
  });

  it('trả kết quả NAP_TAI có exact Q11 + supplemental Q10 provenance', () => {
    const result = taoController().xemNapTai('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');
    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'NAP_TAI')).toBe(true);
  });

  it('trả kết quả MO_KHO_XUAT_HANG_TIEN có exact Q11/Q10 provenance', () => {
    const result = taoController().xemMoKhoXuatHangTien(
      '2026-11-27T05:00:00.000Z',
      'Asia/Ho_Chi_Minh',
    );
    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'MO_KHO_XUAT_HANG_TIEN'),
    ).toBe(true);
  });

  it('trả kết quả SUA_BUONG_SAN_PHU có exact Q11/Q10 provenance', () => {
    const result = taoController().xemSuaBuongSanPhu(
      '2026-11-27T05:00:00.000Z',
      'Asia/Ho_Chi_Minh',
    );
    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'SUA_BUONG_SAN_PHU'),
    ).toBe(true);
  });

  it('trả kết quả DAT_COI_XAY_GIA có exact Q11/Q10 provenance', () => {
    const result = taoController().xemDatCoiXayGia('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');
    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'DAT_COI_XAY_GIA')).toBe(
      true,
    );
  });

  it('trả kết quả QUET_DON_NHA_CUA có exact Q11/Q10 provenance', () => {
    const result = taoController().xemQuetDonNhaCua('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');
    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(
      result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'QUET_DON_NHA_CUA'),
    ).toBe(true);
  });

  it('từ chối thiếu input', () => {
    expect(() => taoController().xemCuoiHoi(undefined, 'Asia/Ho_Chi_Minh')).toThrow(
      BadRequestException,
    );
  });

  it('từ chối timezone IANA không hợp lệ', () => {
    expect(() => taoController().xemCuoiHoi('2026-11-27T05:00:00.000Z', 'Not/A_Timezone')).toThrow(
      BadRequestException,
    );
  });
});

describe('XemNgayController earthwork endpoints', () => {
  it('trả kết quả DONG_THO', () => {
    const result = taoController().xemDongTho('2026-01-20T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.dangThoVuong).toBe(true);
    expect(result.danhGia.dongGop.some((item) => item.quyTac.congViec === 'DONG_THO')).toBe(true);
  });

  it('trả kết quả SUA_CUNG_THAT', () => {
    const result = taoController().xemSuaCungThat('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'SUA_CUNG_THAT')).toBe(
      true,
    );
  });
});

describe('XemNgayController KHAI_TRUONG endpoint', () => {
  it('trả kết quả KHAI_TRUONG với Q11 provenance', () => {
    const result = taoController().xemKhaiTruong('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'KHAI_TRUONG')).toBe(
      true,
    );
  });
});

describe('XemNgayController XUAT_HANH endpoint', () => {
  it('trả kết quả XUAT_HANH với provenance', () => {
    const result = taoController().xemXuatHanh('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.length).toBeGreaterThan(0);
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'XUAT_HANH')).toBe(true);
  });
});

describe('XemNgayController tổng quan tháng', () => {
  it('nhận ngày sinh đầy đủ và trả đủ hai mươi sáu nhóm việc', () => {
    const result = taoController().xemTongQuanThang('1990-02-03', '2026', '11', 'Asia/Ho_Chi_Minh');

    expect(result.nguoi.canChiNamSinh).toEqual({ can: 'KY', chi: 'TI' });
    expect(result.ngay).toHaveLength(30);
    expect(Object.keys(result.ngay[0]?.theoCongViec ?? {})).toHaveLength(26);
    expect(JSON.stringify(result)).not.toMatch(/\bQ\d+\b|Quyển\s+\d+/i);
  });

  it('từ chối ngày sinh sai định dạng', () => {
    expect(() =>
      taoController().xemTongQuanThang('03/02/1990', '2026', '11', 'Asia/Ho_Chi_Minh'),
    ).toThrow(BadRequestException);
  });
});

describe('XemNgayController drill-down theo ngày sinh đầy đủ', () => {
  it('tự suy Lập Xuân cho trang công việc và giữ ngày sinh trong response', () => {
    const result = taoController().xemThang(
      'KHAI_TRUONG',
      '2026',
      '11',
      'Asia/Ho_Chi_Minh',
      undefined,
      undefined,
      '1990-02-03',
    );

    expect(result.nguoiLienQuan[0]?.ngaySinh).toBe('1990-02-03');
    expect(result.nguoiLienQuan[0]?.canChiNamSinh).toEqual({
      can: 'KY',
      chi: 'TI',
    });
  });

  it('báo cần giờ sinh nếu sinh đúng ngày Lập Xuân', () => {
    expect(() =>
      taoController().xemThang(
        'KHAI_TRUONG',
        '2026',
        '11',
        'Asia/Ho_Chi_Minh',
        undefined,
        undefined,
        '2026-02-04',
      ),
    ).toThrow(BadRequestException);
  });

  it('cưới hỏi nhận hai ngày sinh đầy đủ', () => {
    const result = taoController().xemThang(
      'CUOI_HOI',
      '2026',
      '11',
      'Asia/Ho_Chi_Minh',
      undefined,
      undefined,
      ['1990-02-03', '1992-06-10'],
    );

    expect(result.nguoiLienQuan.map((item) => item.ngaySinh)).toEqual(['1990-02-03', '1992-06-10']);
  });

  it('chi tiết ngày dùng cùng Can-Chi năm sinh cho lớp chọn giờ', () => {
    const result = taoController().xemChiTiet(
      'XUAT_HANH',
      '2026-11-27T05:00:00.000Z',
      'Asia/Ho_Chi_Minh',
      undefined,
      undefined,
      '1984-06-15',
    );

    expect(result.gio).toHaveLength(12);
    expect(
      result.gio.some((item) =>
        item.xungTuoi.some(
          (xung) => xung.canChiNamSinh.can === 'GIAP' && xung.canChiNamSinh.chi === 'TY',
        ),
      ),
    ).toBe(true);
  });
});

describe('XemNgayController xem tháng theo năm sinh', () => {
  it('cưới hỏi yêu cầu và nhận hai năm sinh', () => {
    const result = taoController().xemThang(
      'CUOI_HOI',
      '2026',
      '11',
      'Asia/Ho_Chi_Minh',
      ['1990', '1992'],
      ['false', 'true'],
    );

    expect(result.congViec).toBe('CUOI_HOI');
    expect(result.ngay).toHaveLength(30);
  });

  it('từ chối cưới hỏi thiếu một người', () => {
    expect(() =>
      taoController().xemThang('CUOI_HOI', '2026', '11', 'Asia/Ho_Chi_Minh', '1990', undefined),
    ).toThrow(BadRequestException);
  });

  it('các việc khác yêu cầu một năm sinh chủ sự', () => {
    const result = taoController().xemThang(
      'AN_TANG',
      '2026',
      '11',
      'Asia/Ho_Chi_Minh',
      '1984',
      'false',
    );

    expect(result.thongKe.XUNG_TUOI).toBe(30);
  });
});

describe('XemNgayController chi tiết ngày + giờ', () => {
  it('trả ngày public đã làm sạch cùng 12 giờ', () => {
    const result = taoController().xemChiTiet(
      'XUAT_HANH',
      '2026-11-27T05:00:00.000Z',
      'Asia/Ho_Chi_Minh',
      '1984',
      'false',
    );

    expect(result.gio).toHaveLength(12);
    expect(result.ketQuaNgay.ngayDanSu).toBe('2026-11-27');
    expect(JSON.stringify(result)).not.toMatch(
      /\bQ\d+\b|Quyển\s+\d+|KR3g|WYG_|"(?:quyen|trang|muc|revision|sha256|tep|phamViOracle)"/i,
    );
  });
});

describe('XemNgayController AN_TANG endpoint', () => {
  it('trả kết quả AN_TANG với provenance', () => {
    const result = taoController().xemAnTang('2026-11-27T05:00:00.000Z', 'Asia/Ho_Chi_Minh');

    expect(result.ngayDanSu).toBe('2026-11-27');
    expect(result.danhGia.dongGop.every((item) => item.quyTac.congViec === 'AN_TANG')).toBe(true);
  });
});
