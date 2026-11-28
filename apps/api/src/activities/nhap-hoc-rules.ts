import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { LoaiNguon, ThamChieuNguon } from '../sources/source-reference';
import { LoaiCongViec, QuyTacDungSu, TacDongDungSu } from './activity-rule';

const NGUON_Q11: readonly ThamChieuNguon[] = [
  {
    loaiNguon: LoaiNguon.BAN_VIET,
    tap: 1,
    quyen: 11,
    trang: 848,
    muc: 'Nhập học',
    tenGoc: '入學',
    daXacMinh: true,
    ghiChu: 'Bản Việt ghi “Nghi: ngày Thành, ngày Khai; Vô kị”, khớp Hán Q11.',
  },
  {
    loaiNguon: LoaiNguon.HAN_BAN,
    quyen: 11,
    muc: '入學',
    tenGoc: '入學',
    daXacMinh: true,
    ghiChu: 'WYG_011-10b..11a: 宜成日開日，忌無.',
  },
];

export const QUY_TAC_NHAP_HOC: readonly QuyTacDungSu[] = [
  {
    ma: 'NHAP_HOC_NEN_THANH_NHAT',
    congViec: LoaiCongViec.NHAP_HOC,
    dieuKien: { loai: 'TRUC', truc: ThapNhiTruc.THANH },
    tacDong: TacDongDungSu.NEN,
    nguon: NGUON_Q11,
  },
  {
    ma: 'NHAP_HOC_NEN_KHAI_NHAT',
    congViec: LoaiCongViec.NHAP_HOC,
    dieuKien: { loai: 'TRUC', truc: ThapNhiTruc.KHAI },
    tacDong: TacDongDungSu.NEN,
    nguon: NGUON_Q11,
  },
];
