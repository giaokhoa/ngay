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

export interface KetQuaXemNgayCuoiHoi {
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

@Injectable()
export class XemNgayService {
  constructor(
    private readonly lich: TinhLichService,
    private readonly yeuToNgay: TinhYeuToNgayService,
    private readonly dungSu: DungSuService,
    private readonly danhGiaNgay: DanhGiaNgayService,
  ) {}

  xemCuoiHoi(thoiDiem: Date, muiGio: string): KetQuaXemNgayCuoiHoi {
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
    const danhGia = this.danhGiaNgay.danhGia(this.dungSu.layQuyTac(LoaiCongViec.CUOI_HOI), {
      chiThang,
      canNgay: canChiNgay.can,
      chiNgay: canChiNgay.chi,
      truc,
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

function taoGiaiThich(danhGia: KetQuaDanhGia): KetQuaXemNgayCuoiHoi['giaiThich'] {
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
          `${moTaDieuKien(item.quyTac.dieuKien)}: ${item.lyDoLoai ?? 'bị loại bởi Quyển 10'}`,
      ),
    xungDot: danhGia.xungDotDaApDung.map((item) => item.moTa),
  };
}

function moTaDieuKien(dieuKien: KetQuaDanhGia['dongGop'][number]['quyTac']['dieuKien']): string {
  switch (dieuKien.loai) {
    case 'YEU_TO':
      return dieuKien.ma;
    case 'TRUC':
      return `TRUC_${dieuKien.truc}`;
    case 'CHI_NGAY':
      return `CHI_NGAY_${dieuKien.chi}`;
  }
}
