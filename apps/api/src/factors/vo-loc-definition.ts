import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { TietKhi } from '../calendar/domain/solar-term';
import { LoaiNguon } from '../sources/source-reference';
import { LoaiYeuTo } from './domain/day-factor';
import { MaYeuTo } from './domain/factor-code';
import { BoiCanhTinhYeuToNgay } from './factor-context';
import { DinhNghiaYeuTo } from './factor-definition';

const { TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI } = DiaChi;
const { GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY } = ThienCan;

export const DINH_NGHIA_VO_LOC: DinhNghiaYeuTo = {
  ma: MaYeuTo.VO_LOC,
  loai: LoaiYeuTo.THAN_SAT,
  tenKhac: ['Lộc Không', 'Thập Ác Đại Bại'],
  nguon: [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 5,
      trang: 455,
      muc: 'Vô Lộc',
      tenGoc: '無禄',
      ghiChu:
        'Exact scan p.455–456 liệt kê 10 candidate và bác cách khái kị không xét năm/tháng: Lộc gặp điền thực thì không còn Không.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 5,
      muc: '無禄',
      tenGoc: '無禄',
      ghiChu: 'WYG_005-54b..55b: 10 candidate; 填實則不空, không được khái kị cố định.',
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: '無禄日',
      tenGoc: '無禄日',
      ghiChu:
        'WYG_010-67a..68b: exact relief theo Đức, năm/tháng, Thái Dương trung khí, Tuế Đức/Hợp và tam bằng; 癸亥 vẫn là 無禄.',
      daXacMinh: true,
    },
  ],
};

interface CandidateVoLoc {
  can: ThienCan;
  chi: DiaChi;
  chiLoc: DiaChi;
  trungKhiGiai?: TietKhi;
}

export const CAC_NGAY_CANDIDATE_VO_LOC: readonly CandidateVoLoc[] = [
  { can: GIAP, chi: THIN, chiLoc: DAN, trungKhiGiai: TietKhi.TIEU_TUYET },
  { can: AT, chi: TI, chiLoc: MAO, trungKhiGiai: TietKhi.SUONG_GIANG },
  { can: CANH, chi: THIN, chiLoc: THAN, trungKhiGiai: TietKhi.TIEU_MAN },
  { can: TAN, chi: TI, chiLoc: DAU, trungKhiGiai: TietKhi.COC_VU },
  { can: BINH, chi: THAN, chiLoc: TI, trungKhiGiai: TietKhi.XU_THU },
  { can: MAU, chi: TUAT, chiLoc: TI, trungKhiGiai: TietKhi.XU_THU },
  { can: DINH, chi: HOI, chiLoc: NGO, trungKhiGiai: TietKhi.DAI_THU },
  { can: KY, chi: SUU, chiLoc: NGO, trungKhiGiai: TietKhi.DAI_THU },
  { can: NHAM, chi: THAN, chiLoc: HOI, trungKhiGiai: TietKhi.VU_THUY },
  { can: QUY, chi: HOI, chiLoc: TY },
];

interface GiaiTheoNamThang {
  canNam: readonly ThienCan[];
  chiThang: readonly DiaChi[];
  canNgay: ThienCan;
  chiNgay: DiaChi;
}

// 歲德合月德合所會之辰 — WYG_010-67b..68a.
const GIAI_TUE_DUC_HOP_NGUYET_DUC_HOP: readonly GiaiTheoNamThang[] = [
  { canNam: [GIAP, KY], chiThang: [HOI, MAO, MUI], canNgay: KY, chiNgay: SUU },
  { canNam: [AT, CANH], chiThang: [TI, DAU, SUU], canNgay: AT, chiNgay: TI },
  { canNam: [BINH, TAN], chiThang: [DAN, NGO, TUAT], canNgay: TAN, chiNgay: TI },
  { canNam: [DINH, NHAM], chiThang: [THAN, TY, THIN], canNgay: DINH, chiNgay: HOI },
];

// 天德合歲德所會之辰 — WYG_010-68a.
const GIAI_THIEN_DUC_HOP_TUE_DUC: readonly GiaiTheoNamThang[] = [
  { canNam: [AT, CANH], chiThang: [HOI], canNgay: CANH, chiNgay: THIN },
  { canNam: [BINH, TAN], chiThang: [TI], canNgay: BINH, chiNgay: THAN },
  { canNam: [DINH, NHAM], chiThang: [DAN], canNgay: NHAM, chiNgay: THAN },
  { canNam: [MAU, QUY], chiThang: [THAN], canNgay: MAU, chiNgay: TUAT },
];

export function laVoLoc(
  boiCanh: BoiCanhTinhYeuToNgay,
  maYeuToHienCo: ReadonlySet<MaYeuTo>,
): boolean {
  const candidate = CAC_NGAY_CANDIDATE_VO_LOC.find(
    (item) => item.can === boiCanh.canNgay && item.chi === boiCanh.chiNgay,
  );
  if (!candidate) return false;

  // 癸亥干支俱盡: dù gặp Đức / năm-tháng / Thái Dương điền thực vẫn luận 無祿.
  if (candidate.can === QUY && candidate.chi === HOI) return true;

  // Với 9 candidate còn lại, thiếu context có thể che một nhánh điền thực; không được suy hung.
  if (!boiCanh.canChiNam || !boiCanh.canChiThang || !boiCanh.trungKhiHienHanh) return false;

  if (maYeuToHienCo.has(MaYeuTo.THIEN_DUC) || maYeuToHienCo.has(MaYeuTo.NGUYET_DUC)) {
    return false;
  }

  // 歲月填實祿空: Thái Tuế hoặc Nguyệt Kiến đóng đúng chi Lộc.
  if (boiCanh.canChiNam.chi === candidate.chiLoc || boiCanh.chiThang === candidate.chiLoc) {
    return false;
  }

  // 太陽填實祿空: trung khí hiện hành đưa Thái Dương vào đúng cung Lộc.
  if (candidate.trungKhiGiai === boiCanh.trungKhiHienHanh) {
    return false;
  }

  if (khopGiaiTheoNamThang(boiCanh, GIAI_TUE_DUC_HOP_NGUYET_DUC_HOP)) return false;
  if (khopGiaiTheoNamThang(boiCanh, GIAI_THIEN_DUC_HOP_TUE_DUC)) return false;

  // 歲德、歲德合、天干三朋: Can năm = Can tháng = Can ngày.
  if (boiCanh.canChiNam.can === boiCanh.canNgay && boiCanh.canChiThang.can === boiCanh.canNgay) {
    return false;
  }

  return true;
}

function khopGiaiTheoNamThang(
  boiCanh: BoiCanhTinhYeuToNgay,
  rules: readonly GiaiTheoNamThang[],
): boolean {
  return rules.some(
    (rule) =>
      rule.canNam.includes(boiCanh.canChiNam!.can) &&
      rule.chiThang.includes(boiCanh.chiThang) &&
      rule.canNgay === boiCanh.canNgay &&
      rule.chiNgay === boiCanh.chiNgay,
  );
}
