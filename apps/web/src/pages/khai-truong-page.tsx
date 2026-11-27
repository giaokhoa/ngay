import { xemNgayKhaiTruong } from '../api/date-selection';
import { TrangXemNgay } from '../components/activity-date-page';

export function TrangKhaiTruong() {
  return (
    <TrangXemNgay
      tieuDe="Khai trương"
      nhanNguon="開市"
      moTa="Dụng sự Quyển 11 cho khai trương, kết hợp toàn bộ Nghi kị Quyển 10 đã source-lock từ bản Việt canonical và Hán bản đối chiếu."
      taiKetQua={xemNgayKhaiTruong}
    />
  );
}
