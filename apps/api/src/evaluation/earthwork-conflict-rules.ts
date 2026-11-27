import { DieuKienDungSu } from '../activities/activity-rule';
import { MaYeuTo } from '../factors/domain/factor-code';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { QuyTacXungDotDataDriven } from './q10-rule-resolver';

const Y = (ma: MaYeuTo): DieuKienDungSu => ({ loai: 'YEU_TO', ma });
const DUC_HOP_XA_NGUYEN = [
  MaYeuTo.THIEN_DUC,
  MaYeuTo.NGUYET_DUC,
  MaYeuTo.THIEN_DUC_HOP,
  MaYeuTo.NGUYET_DUC_HOP,
  MaYeuTo.THIEN_XA,
  MaYeuTo.THIEN_NGUYEN,
] as const;

export const QUY_TAC_Q10_CONG_VIEC_DAT: readonly QuyTacXungDotDataDriven[] = [
  {
    ma: 'EARTHWORK_Q10_THO_PHU_TIN_VAN_KY',
    mucTieu: Y(MaYeuTo.THO_PHU_TIN),
    dieuKien: { coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 80,
    moTa: 'Thổ Phù vẫn Kị việc sửa cung thất / động thổ dù gặp Đức, Hợp, Xá, Nguyện.',
    nguon: taoNguon(821, 'Thổ Phù - Địa Nang', '土符 地囊'),
  },
  {
    ma: 'EARTHWORK_Q10_DIA_NANG_VAN_KY',
    mucTieu: Y(MaYeuTo.DIA_NANG),
    dieuKien: { coBatKyYeuTo: DUC_HOP_XA_NGUYEN },
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 80,
    moTa: 'Địa Nang vẫn Kị việc sửa cung thất / động thổ dù gặp Đức, Hợp, Xá, Nguyện.',
    nguon: taoNguon(821, 'Thổ Phù - Địa Nang', '土符 地囊'),
  },
  {
    ma: 'EARTHWORK_Q10_THO_PHU_TIN_GIU_KY',
    mucTieu: Y(MaYeuTo.THO_PHU_TIN),
    phepXuLy: { loai: 'GIU_KY' },
    precedence: 20,
    moTa: 'Thổ Phù Kị việc sửa cung thất / khởi tạo động thổ.',
    nguon: taoNguon(821, 'Thổ Phù - Địa Nang', '土符 地囊'),
  },
  {
    ma: 'EARTHWORK_Q10_DIA_NANG_GIU_KY',
    mucTieu: Y(MaYeuTo.DIA_NANG),
    phepXuLy: { loai: 'GIU_KY' },
    precedence: 20,
    moTa: 'Địa Nang Kị việc sửa cung thất / khởi tạo động thổ.',
    nguon: taoNguon(821, 'Thổ Phù - Địa Nang', '土符 地囊'),
  },
  {
    ma: 'EARTHWORK_Q10_THO_VUONG_GIU_KY',
    mucTieu: { loai: 'THO_VUONG' },
    phepXuLy: { loai: 'GIU_KY_DU_CO_CAT' },
    precedence: 50,
    moTa: 'Thổ Vượng dụng sự Kị việc sửa cung thất / khởi tạo động thổ; Q10 ghi nghĩa giống Thổ Phủ.',
    nguon: taoNguon(829, 'Thổ Vượng dụng sự', '土王用事'),
  },
];

function taoNguon(trang: number, muc: string, tenGoc: string): readonly ThamChieuNguon[] {
  return [
    {
      loaiNguon: LoaiNguon.BAN_VIET,
      tap: 1,
      quyen: 10,
      trang,
      muc,
      tenGoc,
      daXacMinh: true,
    },
    {
      loaiNguon: LoaiNguon.HAN_BAN,
      quyen: 10,
      muc: tenGoc,
      tenGoc,
      daXacMinh: true,
    },
  ];
}
