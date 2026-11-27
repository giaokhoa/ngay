import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';

export const MA_XUNG_DOT_QUY_KY = 'DI_CHUYEN_QUY_KY_VAN_KY' as const;

export const MO_TA_XUNG_DOT_QUY_KY =
  'Quy Kị vẫn là blocker di chuyển khi đồng thời có cát thần; không tự động lấy Nên để xóa Kị.';

export const NGUON_XUNG_DOT_QUY_KY: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 10,
    trang: 822,
    muc: 'Quy Kị',
    tenGoc: '歸忌',
    ghiChu: 'Bản Việt ghi gặp Đức, Nguyện, Xá vẫn phải kị.',
    daXacMinh: true,
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 10,
    muc: '歸忌',
    tenGoc: '歸忌',
    ghiChu:
      'Hán bản ghi 與德合赦願併猶忌; có chữ 合 mà câu Việt trang 822 không nêu, nên không dùng khác biệt này để tạo phép triệt mới.',
    daXacMinh: true,
  },
];
