import { LoaiCongViec } from '../activities/activity-rule';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const CONG_VIEC_DUOC_MIEN = new Set<LoaiCongViec>([
  LoaiCongViec.TE_TU,
  LoaiCongViec.GIAI_TRU,
  LoaiCongViec.CHINH_DUNG_CAT_TOC,
  LoaiCongViec.SUA_MONG_TAY_CHAN,
  LoaiCongViec.QUET_DON_NHA_CUA,
]);

const CONG_VIEC_DA_CO_KY_DANG_NGAY_RIENG = new Set<LoaiCongViec>([
  LoaiCongViec.CAU_PHUC,
  LoaiCongViec.CAU_TU,
]);

const NGUON_VO_LOC: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '無祿日',
    tenGoc: '無祿日',
    daXacMinh: true,
    ghiChu:
      'WYG_010-67a..68b: chỉ chú 祭祀解除沐浴整容剃頭整手足甲掃舍宇修飾垣牆平治道塗破屋壞垣伐木; 餘事不註. Với activity ngoài nhóm miễn, production hiểu là bỏ Nên, không tự tạo Kị.',
  },
];

const NGUON_DANG_NGAY: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '上朔 四離 四絶 晦日',
    tenGoc: '上朔 四離 四絶 晦日',
    daXacMinh: true,
    ghiChu:
      'WYG_010-69a..69b: 上朔/四離/四絶 ngoài nhóm miễn thì 餘事皆忌. Riêng 晦日, chú giải ghi 餘事雖不忌亦不註宜, nên production chỉ bỏ Nên ở Hối nhật.',
  },
];

export function layQuyTacPhuChuQ10(congViec: LoaiCongViec): readonly QuyTacXungDotDataDriven[] {
  if (CONG_VIEC_DUOC_MIEN.has(congViec)) return [];

  const rules: QuyTacXungDotDataDriven[] = [
    {
      ma: `Q10_PHU_CHU_${congViec}_VO_LOC_BO_NEN`,
      dieuKien: { coTatCaYeuTo: [MaYeuTo.VO_LOC] },
      phepXuLy: { loai: 'BO_NEN' },
      precedence: 260,
      moTa: 'Vô Lộc: việc này không thuộc nhóm được Q10 chú Nên; bỏ toàn bộ Nên, không tự tạo Kị.',
      nguon: NGUON_VO_LOC,
    },
    {
      ma: `Q10_PHU_CHU_${congViec}_HOI_NHAT_BO_NEN`,
      dieuKien: { coTatCaYeuTo: [MaYeuTo.HOI_NHAT] },
      phepXuLy: { loai: 'BO_NEN' },
      precedence: 260,
      moTa: 'Hối nhật: Q10 nói các việc ngoài nhóm miễn không Kị riêng nhưng cũng không chú Nên; bỏ toàn bộ Nên.',
      nguon: NGUON_DANG_NGAY,
    },
  ];

  if (!CONG_VIEC_DA_CO_KY_DANG_NGAY_RIENG.has(congViec)) {
    rules.push({
      ma: `Q10_PHU_CHU_${congViec}_THUONG_SOC_TU_LY_TU_TUYET_KY`,
      dieuKien: {
        coBatKyYeuTo: [MaYeuTo.THUONG_SOC, MaYeuTo.TU_LY, MaYeuTo.TU_TUYET],
      },
      phepXuLy: { loai: 'THEM_KY' },
      precedence: 250,
      moTa: 'Thượng Sóc, Tứ Ly hoặc Tứ Tuyệt: việc này không thuộc nhóm miễn, Q10 ghi các việc còn lại đều Kị.',
      nguon: NGUON_DANG_NGAY,
    });
  }

  return rules;
}
