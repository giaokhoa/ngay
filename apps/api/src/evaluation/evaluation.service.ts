import { Injectable } from '@nestjs/common';

import {
  DieuKienDungSu,
  LoaiCongViec,
  QuyTacDungSu,
  TacDongDungSu,
} from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import {
  QUY_TAC_XUNG_DOT_CUOI_HOI,
  QuyTacXungDotCuoiHoi,
  taoNguonXungDotQuyen10,
} from './cuoi-hoi-conflict-rules';
import { QUY_TAC_Q10_AN_GIUONG } from './an-giuong-conflict-rules';
import { QUY_TAC_Q10_CAU_PHUC } from './cau-phuc-conflict-rules';
import { QUY_TAC_Q10_CAU_TU } from './cau-tu-conflict-rules';
import { QUY_TAC_Q10_CAU_Y_TRI_BENH } from './cau-y-tri-benh-conflict-rules';
import { QUY_TAC_Q10_CHINH_DUNG_CAT_TOC } from './chinh-dung-cat-toc-conflict-rules';
import { QUY_TAC_Q10_AN_TANG } from './an-tang-conflict-rules';
import { QUY_TAC_Q10_DI_CHUYEN } from './di-chuyen-conflict-rules';
import { QUY_TAC_Q10_CONG_VIEC_DAT } from './earthwork-conflict-rules';
import { QUY_TAC_Q10_KHAI_TRUONG } from './khai-truong-conflict-rules';
import { QUY_TAC_Q10_GIAI_TRU } from './giai-tru-conflict-rules';
import { QUY_TAC_Q10_KHANH_THUONG } from './khanh-thuong-conflict-rules';
import { QUY_TAC_Q10_NHAP_HOC } from './nhap-hoc-conflict-rules';
import { QUY_TAC_Q10_QUAN_DAI } from './quan-dai-conflict-rules';
import { QUY_TAC_Q10_TE_TU } from './te-tu-conflict-rules';
import { QUY_TAC_Q10_XUAT_HANH } from './xuat-hanh-conflict-rules';
import { QUY_TAC_Q10_YEN_HOI } from './yen-hoi-conflict-rules';
import { QUY_TAC_Q10_CUOI_HOI_Q4 } from './cuoi-hoi-q4-conflict-rules';
import {
  BoiCanhDanhGiaNgay,
  DauVetXungDot,
  DongGopDanhGia,
  KetQuaDanhGia,
  TrangThaiDongGop,
} from './evaluation-domain';
import { apDungResolverQ10 } from './q10-rule-resolver';

const DUC_HOP = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
] as const;

const DUC_HOP_XA_NGUYEN = [...DUC_HOP, MaYeuTo.THIEN_XA, MaYeuTo.THIEN_NGUYEN] as const;

@Injectable()
export class DanhGiaNgayService {
  danhGia(quyTacDungSu: readonly QuyTacDungSu[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
    const dongGop = quyTacDungSu
      .filter((quyTac) => khopDieuKien(quyTac.dieuKien, boiCanh))
      .map<DongGopDanhGia>((quyTac) => ({
        quyTac,
        trangThai: TrangThaiDongGop.HIEU_LUC,
      }));

    const congViec = xacDinhCongViec(quyTacDungSu);
    if (congViec === LoaiCongViec.DI_CHUYEN) {
      return danhGiaDiChuyen(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.AN_GIUONG) {
      return danhGiaAnGiuong(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.QUAN_DAI) {
      return danhGiaQuanDai(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.NHAP_HOC) {
      return danhGiaNhapHoc(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.YEN_HOI) {
      return danhGiaYenHoi(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.KHANH_THUONG) {
      return danhGiaKhanhThuong(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.TE_TU) {
      return danhGiaTeTu(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.CAU_PHUC) {
      return danhGiaCauPhuc(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.CAU_TU) {
      return danhGiaCauTu(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.GIAI_TRU) {
      return danhGiaGiaiTru(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.CHINH_DUNG_CAT_TOC) {
      return danhGiaChinhDungCatToc(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.CAU_Y_TRI_BENH) {
      return danhGiaCauYTriBenh(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.DONG_THO || congViec === LoaiCongViec.SUA_CUNG_THAT) {
      return danhGiaCongViecDat(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.KHAI_TRUONG) {
      return danhGiaKhaiTruong(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.XUAT_HANH) {
      return danhGiaXuatHanh(dongGop, boiCanh);
    }
    if (congViec === LoaiCongViec.AN_TANG) {
      return danhGiaAnTang(dongGop, boiCanh);
    }

    const q4Resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_CUOI_HOI_Q4);
    const daApDung: DauVetXungDot[] = [...q4Resolved.xungDotDaApDung];
    let camMoiViec = q4Resolved.camMoiViec;
    const coKyBoSungQ4 = q4Resolved.coKyBoSung;

    const coYeuTo = (ma: MaYeuTo): boolean => boiCanh.yeuTo.some((yeuTo) => yeuTo.ma === ma);
    const coBatKy = (ds: readonly MaYeuTo[]): boolean => ds.some(coYeuTo);
    const loai = (dieuKien: DieuKienDungSu, lyDo: string): void => {
      for (const item of dongGop) {
        if (
          item.trangThai === TrangThaiDongGop.HIEU_LUC &&
          cungDieuKien(item.quyTac.dieuKien, dieuKien)
        ) {
          item.trangThai = TrangThaiDongGop.BI_LOAI;
          item.lyDoLoai = lyDo;
        }
      }
    };
    const loaiYeuTo = (ma: MaYeuTo, lyDo: string): void => loai({ loai: 'YEU_TO', ma }, lyDo);
    const ghi = (ma: string): void => {
      const rule = QUY_TAC_XUNG_DOT_CUOI_HOI.find((item) => item.ma === ma);
      if (!rule) throw new Error(`Thiếu định nghĩa xung đột ${ma}`);
      daApDung.push(taoDauVet(rule));
    };

    if (coYeuTo(MaYeuTo.NGUYET_PHA) && coBatKy(DUC_HOP)) {
      for (const ma of DUC_HOP)
        if (coYeuTo(ma)) loaiYeuTo(ma, 'Nguyệt Phá thắng Đức/Hợp theo Quyển 10.');
      ghi('NGUYET_PHA_DUC_VAN_KY');
    }

    if (
      coYeuTo(MaYeuTo.NGUYET_PHA) &&
      coYeuTo(MaYeuTo.TAI_SAT) &&
      coYeuTo(MaYeuTo.NGUYET_YEM) &&
      (boiCanh.chiThang === DiaChi.MAO || boiCanh.chiThang === DiaChi.DAU)
    ) {
      camMoiViec = true;
      ghi('NGUYET_PHA_MAO_DAU_TAI_SAT_NGUYET_YEM_CAM_MOI_VIEC');
    }

    if (coYeuTo(MaYeuTo.TU_PHE) && coBatKy(DUC_HOP)) {
      for (const ma of DUC_HOP)
        if (coYeuTo(ma)) loaiYeuTo(ma, 'Tứ Phế không được Đức/Hợp hóa giải.');
      ghi('TU_PHE_DUC_HOP_VAN_KY');
    }

    if (coYeuTo(MaYeuTo.TU_PHE) && coYeuTo(MaYeuTo.NGUYET_PHA)) {
      camMoiViec = true;
      ghi('TU_PHE_NGUYET_PHA_CAM_MOI_VIEC');
    }

    if (
      coYeuTo(MaYeuTo.TU_CUNG) &&
      boiCanh.chiThang === DiaChi.DAN &&
      boiCanh.canNgay === ThienCan.AT &&
      boiCanh.chiNgay === DiaChi.HOI &&
      coYeuTo(MaYeuTo.THIEN_NGUYEN)
    ) {
      loaiYeuTo(MaYeuTo.TU_CUNG, 'Thiên Nguyện hóa Tứ Cùng ở Ất Hợi tháng Dần.');
      ghi('TU_CUNG_DAN_AT_HOI_THIEN_NGUYEN_BO_KY');
    }

    if (
      coYeuTo(MaYeuTo.NGU_MO) &&
      (boiCanh.chiThang === DiaChi.NGO || boiCanh.chiThang === DiaChi.TY) &&
      coYeuTo(MaYeuTo.NGUYET_DUC)
    ) {
      loaiYeuTo(MaYeuTo.NGU_MO, 'Nguyệt Đức hóa Ngũ Mộ ở tháng Ngọ/Tý.');
      ghi('NGU_MO_NGUYET_DUC_BO_KY');
    }

    if (coYeuTo(MaYeuTo.BAT_CHUYEN) && coBatKy(DUC_HOP)) {
      for (const ma of DUC_HOP)
        if (coYeuTo(ma)) loaiYeuTo(ma, 'Bát Chuyên không được Đức/Hợp hóa giải.');
      ghi('BAT_CHUYEN_DUC_HOP_VAN_KY');
    }

    if (coYeuTo(MaYeuTo.BAT_CHUYEN) && coYeuTo(MaYeuTo.THIEN_NGUYEN)) {
      loaiYeuTo(MaYeuTo.BAT_CHUYEN, 'Thiên Nguyện bỏ Kị Bát Chuyên cho cưới hỏi.');
      ghi('BAT_CHUYEN_THIEN_NGUYEN_BO_KY');
    }

    if (coYeuTo(MaYeuTo.VANG_VONG) && coBatKy(DUC_HOP_XA_NGUYEN)) {
      for (const ma of DUC_HOP_XA_NGUYEN) {
        if (coYeuTo(ma)) loaiYeuTo(ma, 'Vãng Vong vẫn Kị dù gặp Đức/Hợp/Xá/Nguyện.');
      }
      ghi('VANG_VONG_DUC_XA_NGUYEN_VAN_KY');
    }

    if (coYeuTo(MaYeuTo.YEM_DOI) && coYeuTo(MaYeuTo.THIEN_XA)) {
      loaiYeuTo(MaYeuTo.YEM_DOI, 'Thiên Xá hóa Yếm Đối cho cưới hỏi.');
      ghi('YEM_DOI_THIEN_XA_BO_KY');
    }

    if (
      coYeuTo(MaYeuTo.NGUYET_HINH) &&
      boiCanh.chiThang === DiaChi.TI &&
      coYeuTo(MaYeuTo.NGUYET_DUC)
    ) {
      loaiYeuTo(MaYeuTo.NGUYET_HINH, 'Nguyệt Đức hóa Nguyệt Hình ở tháng Tỵ.');
      ghi('NGUYET_HINH_TI_NGUYET_DUC_BO_KY');
    }

    if (coYeuTo(MaYeuTo.NGUYET_HINH) && boiCanh.chiThang === DiaChi.TY && !coBatKy(DUC_HOP)) {
      camMoiViec = true;
      ghi('NGUYET_HINH_TY_KHONG_DUC_CAM_MOI_VIEC');
    }

    if (
      coYeuTo(MaYeuTo.THIEN_LAI) &&
      boiCanh.chiThang === DiaChi.DAN &&
      coYeuTo(MaYeuTo.THIEN_DUC)
    ) {
      loaiYeuTo(MaYeuTo.THIEN_LAI, 'Thiên Đức hóa Thiên Lại ở tháng Dần.');
      ghi('THIEN_LAI_DAN_THIEN_DUC_BO_KY');
    }

    if (coYeuTo(MaYeuTo.DAI_THOI) && boiCanh.chiThang === DiaChi.DAN) {
      loaiYeuTo(MaYeuTo.DAI_THOI, 'Đại Thời tháng Dần không Kị cưới hỏi.');
      ghi('DAI_THOI_DAN_BO_KY');
    }

    if (
      coYeuTo(MaYeuTo.THIEN_LAI) &&
      boiCanh.chiThang === DiaChi.TY &&
      coYeuTo(MaYeuTo.NGUYET_HINH)
    ) {
      dongBoTheoYeuTo(
        dongGop,
        MaYeuTo.THIEN_LAI,
        MaYeuTo.NGUYET_HINH,
        'Thiên Lại tháng Tý theo Nguyệt Hình.',
      );
      ghi('THIEN_LAI_TY_THEO_NGUYET_HINH');
    }

    if (
      coYeuTo(MaYeuTo.THIEN_LAI) &&
      boiCanh.chiThang === DiaChi.NGO &&
      boiCanh.truc === ThapNhiTruc.BINH
    ) {
      dongBoTheoTruc(
        dongGop,
        MaYeuTo.THIEN_LAI,
        ThapNhiTruc.BINH,
        'Thiên Lại tháng Ngọ theo Bình nhật.',
      );
      ghi('THIEN_LAI_NGO_THEO_BINH');
    }

    if (
      boiCanh.truc === ThapNhiTruc.THU &&
      boiCanh.chiThang === DiaChi.DAN &&
      coYeuTo(MaYeuTo.KIEP_SAT)
    ) {
      dongBoTrucTheoYeuTo(
        dongGop,
        ThapNhiTruc.THU,
        MaYeuTo.KIEP_SAT,
        'Thu nhật tháng Dần theo Kiếp Sát.',
      );
      ghi('THU_DAN_THEO_KIEP_SAT');
    }

    if (
      boiCanh.truc === ThapNhiTruc.THU &&
      boiCanh.chiThang === DiaChi.MAO &&
      coYeuTo(MaYeuTo.NGUYET_HINH)
    ) {
      dongBoTrucTheoYeuTo(
        dongGop,
        ThapNhiTruc.THU,
        MaYeuTo.NGUYET_HINH,
        'Thu nhật tháng Mão theo Nguyệt Hình.',
      );
      ghi('THU_MAO_THEO_NGUYET_HINH');
    }

    if (camMoiViec) {
      for (const item of dongGop) {
        if (
          item.quyTac.tacDong === TacDongDungSu.NEN &&
          item.trangThai === TrangThaiDongGop.HIEU_LUC
        ) {
          item.trangThai = TrangThaiDongGop.BI_LOAI;
          item.lyDoLoai = 'Quyển 10 xác định trường hợp này mọi việc đều Kị.';
        }
      }
    }

    const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);
    return {
      coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
      coKy:
        camMoiViec ||
        coKyBoSungQ4 ||
        hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
      camMoiViec,
      dongGop,
      xungDotDaApDung: daApDung,
    };
  }
}

function xacDinhCongViec(quyTacDungSu: readonly QuyTacDungSu[]): LoaiCongViec {
  const congViec = quyTacDungSu[0]?.congViec;
  if (!congViec) {
    throw new Error('Không có quy tắc Dụng sự để đánh giá');
  }

  if (quyTacDungSu.some((quyTac) => quyTac.congViec !== congViec)) {
    throw new Error('Không được trộn quy tắc của nhiều công việc trong một lần đánh giá');
  }

  return congViec;
}

function danhGiaDiChuyen(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_DI_CHUYEN);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaAnGiuong(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_AN_GIUONG);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaQuanDai(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_QUAN_DAI);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaNhapHoc(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_NHAP_HOC);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy: resolved.camMoiViec,
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaYenHoi(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_YEN_HOI);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaKhanhThuong(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_KHANH_THUONG);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaTeTu(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_TE_TU);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaCauPhuc(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_CAU_PHUC);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaCauTu(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_CAU_TU);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaGiaiTru(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_GIAI_TRU);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaChinhDungCatToc(
  dongGop: DongGopDanhGia[],
  boiCanh: BoiCanhDanhGiaNgay,
): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_CHINH_DUNG_CAT_TOC);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaCauYTriBenh(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_CAU_Y_TRI_BENH);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);
  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaCongViecDat(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_CONG_VIEC_DAT);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaKhaiTruong(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_KHAI_TRUONG);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaXuatHanh(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_XUAT_HANH);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function danhGiaAnTang(dongGop: DongGopDanhGia[], boiCanh: BoiCanhDanhGiaNgay): KetQuaDanhGia {
  const resolved = apDungResolverQ10(dongGop, boiCanh, QUY_TAC_Q10_AN_TANG);
  const hieuLuc = dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    coNen: hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.NEN),
    coKy:
      resolved.camMoiViec ||
      resolved.coKyBoSung ||
      hieuLuc.some((item) => item.quyTac.tacDong === TacDongDungSu.KY),
    camMoiViec: resolved.camMoiViec,
    dongGop,
    xungDotDaApDung: resolved.xungDotDaApDung,
  };
}

function khopDieuKien(dieuKien: DieuKienDungSu, boiCanh: BoiCanhDanhGiaNgay): boolean {
  switch (dieuKien.loai) {
    case 'YEU_TO':
      return boiCanh.yeuTo.some((yeuTo) => yeuTo.ma === dieuKien.ma);
    case 'TRUC':
      return boiCanh.truc === dieuKien.truc;
    case 'CHI_NGAY':
      return boiCanh.chiNgay === dieuKien.chi;
    case 'CAN_NGAY':
      return boiCanh.canNgay === dieuKien.can;
    case 'NGAY_AM':
      return boiCanh.ngayAmTrongThang === dieuKien.ngay;
    case 'THO_VUONG':
      return boiCanh.dangThoVuong;
  }
}

function cungDieuKien(a: DieuKienDungSu, b: DieuKienDungSu): boolean {
  if (a.loai !== b.loai) return false;
  if (a.loai === 'YEU_TO' && b.loai === 'YEU_TO') return a.ma === b.ma;
  if (a.loai === 'TRUC' && b.loai === 'TRUC') return a.truc === b.truc;
  if (a.loai === 'CHI_NGAY' && b.loai === 'CHI_NGAY') return a.chi === b.chi;
  if (a.loai === 'CAN_NGAY' && b.loai === 'CAN_NGAY') return a.can === b.can;
  if (a.loai === 'NGAY_AM' && b.loai === 'NGAY_AM') return a.ngay === b.ngay;
  if (a.loai === 'THO_VUONG' && b.loai === 'THO_VUONG') return true;
  return false;
}

function trangThaiYeuTo(
  dongGop: readonly DongGopDanhGia[],
  ma: MaYeuTo,
): TrangThaiDongGop | undefined {
  return dongGop.find(
    (item) => item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === ma,
  )?.trangThai;
}

function trangThaiTruc(
  dongGop: readonly DongGopDanhGia[],
  truc: ThapNhiTruc,
): TrangThaiDongGop | undefined {
  return dongGop.find(
    (item) => item.quyTac.dieuKien.loai === 'TRUC' && item.quyTac.dieuKien.truc === truc,
  )?.trangThai;
}

function datTrangThaiYeuTo(
  dongGop: DongGopDanhGia[],
  ma: MaYeuTo,
  trangThai: TrangThaiDongGop,
  lyDo: string,
): void {
  for (const item of dongGop) {
    if (item.quyTac.dieuKien.loai === 'YEU_TO' && item.quyTac.dieuKien.ma === ma) {
      item.trangThai = trangThai;
      if (trangThai === TrangThaiDongGop.BI_LOAI) item.lyDoLoai = lyDo;
    }
  }
}

function datTrangThaiTruc(
  dongGop: DongGopDanhGia[],
  truc: ThapNhiTruc,
  trangThai: TrangThaiDongGop,
  lyDo: string,
): void {
  for (const item of dongGop) {
    if (item.quyTac.dieuKien.loai === 'TRUC' && item.quyTac.dieuKien.truc === truc) {
      item.trangThai = trangThai;
      if (trangThai === TrangThaiDongGop.BI_LOAI) item.lyDoLoai = lyDo;
    }
  }
}

function dongBoTheoYeuTo(
  dongGop: DongGopDanhGia[],
  ma: MaYeuTo,
  maTheo: MaYeuTo,
  lyDo: string,
): void {
  const trangThai = trangThaiYeuTo(dongGop, maTheo);
  if (trangThai) datTrangThaiYeuTo(dongGop, ma, trangThai, lyDo);
}

function dongBoTheoTruc(
  dongGop: DongGopDanhGia[],
  ma: MaYeuTo,
  truc: ThapNhiTruc,
  lyDo: string,
): void {
  const trangThai = trangThaiTruc(dongGop, truc);
  if (trangThai) datTrangThaiYeuTo(dongGop, ma, trangThai, lyDo);
}

function dongBoTrucTheoYeuTo(
  dongGop: DongGopDanhGia[],
  truc: ThapNhiTruc,
  maTheo: MaYeuTo,
  lyDo: string,
): void {
  const trangThai = trangThaiYeuTo(dongGop, maTheo);
  if (trangThai) datTrangThaiTruc(dongGop, truc, trangThai, lyDo);
}

function taoDauVet(rule: QuyTacXungDotCuoiHoi): DauVetXungDot {
  return {
    ma: rule.ma,
    moTa: rule.moTa,
    nguon: taoNguonXungDotQuyen10(rule.trang),
  };
}
