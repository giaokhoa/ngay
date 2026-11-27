import { xemNgayAnTang } from '../api/date-selection';
import { TrangXemNgay } from '../components/activity-date-page';

export function TrangAnTang() {
  return (
    <TrangXemNgay
      tieuDe="An táng"
      nhanNguon="安葬"
      moTa="Dụng sự Quyển 11 cho an táng, giữ riêng với phá thổ và cải táng; Quyển 10 xử lý đầy đủ Nguyệt Kiến, Nguyệt Yếm, Phục/Trọng và Ô Phệ."
      taiKetQua={xemNgayAnTang}
    />
  );
}
