import { xemNgayDiChuyen } from '../api/date-selection';
import { TrangXemNgay } from '../components/activity-date-page';

export function TrangDiChuyen() {
  return (
    <TrangXemNgay
      tieuDe="Di chuyển"
      nhanNguon="般移〈移徙同〉"
      moTa="Dụng sự Quyển 11 cho di chuyển (dời bếp), kết hợp Nghi kị Quyển 10 đã được source-lock; các khác biệt Việt–Hán được giữ trong provenance."
      taiKetQua={xemNgayDiChuyen}
    />
  );
}
