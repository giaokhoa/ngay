import { Injectable } from '@nestjs/common';

import { LoaiCongViec, TacDongDungSu } from '../activities/activity-rule';
import { DungSuService } from '../activities/activities.service';
import { TinhLichService } from '../calendar/calendar.service';
import { tinhNgayDanSuTaiMuiGio } from '../calendar/civil-date-timezone';
import { CanChi } from '../calendar/domain/sexagenary-cycle';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { DanhGiaNgayService } from '../evaluation/evaluation.service';
import { KetQuaDanhGia, TrangThaiDongGop } from '../evaluation/evaluation-domain';
import { YeuToNgay } from '../factors/domain/day-factor';
import { TinhYeuToNgayService } from '../factors/factors.service';

export interface KetQuaXemNgay {
  ngayDanSu: string;
  canChiNgay: CanChi;
  chiThang: ReturnType<TinhLichService['tinhChiThangTaiThoiDiem']>;
  truc: ThapNhiTruc;
  dangThoVuong: boolean;
  yeuTo: readonly YeuToNgay[];
  danhGia: KetQuaDanhGia;
  giaiThich: {
    nen: readonly string[];
    ky: readonly string[];
    biLoai: readonly string[];
    xungDot: readonly string[];
  };
}

export type KetQuaXemNgayCuoiHoi = KetQuaXemNgay;
export type KetQuaXemNgayDiChuyen = KetQuaXemNgay;
export type KetQuaXemNgayDongTho = KetQuaXemNgay;
export type KetQuaXemNgaySuaCungThat = KetQuaXemNgay;

@Injectable()
export class XemNgayService {
  constructor(
    private readonly lich: TinhLichService,
    private readonly yeuToNgay: TinhYeuToNgayService,
    private readonly dungSu: DungSuService,
    private readonly danhGiaNgay: DanhGiaNgayService,
  ) {}

  xemCuoiHoi(thoiDiem: Date, muiGio: string): KetQuaXemNgayCuoiHoi {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.CUOI_HOI);
  }

  xemDiChuyen(thoiDiem: Date, muiGio: string): KetQuaXemNgayDiChuyen {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.DI_CHUYEN);
  }

  xemDongTho(thoiDiem: Date, muiGio: string): KetQuaXemNgayDongTho {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.DONG_THO);
  }

  xemSuaCungThat(thoiDiem: Date, muiGio: string): KetQuaXemNgaySuaCungThat {
    return this.xem(thoiDiem, muiGio, LoaiCongViec.SUA_CUNG_THAT);
  }

  private xem(thoiDiem: Date, muiGio: string, congViec: LoaiCongViec): KetQuaXemNgay {
    if (Number.isNaN(thoiDiem.getTime())) {
      throw new RangeError('Thời điểm không hợp lệ');
    }

    const ngayDanSu = tinhNgayDanSuTaiMuiGio(thoiDiem, muiGio);
    const canChiNgay = this.lich.tinhCanChiNgay(ngayDanSu);
    const chiThang = this.lich.tinhChiThangTaiThoiDiem(thoiDiem);
    const truc = this.lich.tinhTruc(chiThang, canChiNgay.chi);
    const dangThoVuong = this.lich.dangThoVuong(ngayDanSu, muiGio);
    const yeuTo = this.yeuToNgay.tinh({
      chiThang,
      canNgay: canChiNgay.can,
      chiNgay: canChiNgay.chi,
      dangThoVuong,
    });
    const danhGia = this.danhGiaNgay.danhGia(this.dungSu.layQuyTac(congViec), {
      chiThang,
      canNgay: canChiNgay.can,
      chiNgay: canChiNgay.chi,
      truc,
      dangThoVuong,
      yeuTo,
    });

    return {
      ngayDanSu,
      canChiNgay,
      chiThang,
      truc,
      dangThoVuong,
      yeuTo,
      danhGia,
      giaiThich: taoGiaiThich(danhGia),
    };
  }
}

function taoGiaiThich(danhGia: KetQuaDanhGia): KetQuaXemNgay['giaiThich'] {
  const hieuLuc = danhGia.dongGop.filter((item) => item.trangThai === TrangThaiDongGop.HIEU_LUC);

  return {
    nen: hieuLuc
      .filter((item) => item.quyTac.tacDong === TacDongDungSu.NEN)
      .map((item) => moTaDieuKien(item.quyTac.dieuKien)),
    ky: hieuLuc
      .filter((item) => item.quyTac.tacDong === TacDongDungSu.KY)
      .map((item) => moTaDieuKien(item.quyTac.dieuKien)),
    biLoai: danhGia.dongGop
      .filter((item) => item.trangThai === TrangThaiDongGop.BI_LOAI)
      .map(
        (item) =>
          moTaDieuKien(item.quyTac.dieuKien) + ': ' + (item.lyDoLoai ?? 'bị loại bởi Quyển 10'),
      ),
    xungDot: danhGia.xungDotDaApDung.map((item) => item.moTa),
  };
}

function moTaDieuKien(dieuKien: KetQuaDanhGia['dongGop'][number]['quyTac']['dieuKien']): string {
  switch (dieuKien.loai) {
    case 'YEU_TO':
      return dieuKien.ma;
    case 'TRUC':
      return 'TRUC_' + dieuKien.truc;
    case 'CHI_NGAY':
      return 'CHI_NGAY_' + dieuKien.chi;
    case 'THO_VUONG':
      return 'THO_VUONG';
  }
}
