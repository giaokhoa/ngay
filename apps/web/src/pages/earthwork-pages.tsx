import { xemNgayDongTho, xemNgaySuaCungThat } from '../api/date-selection';
import { TrangXemNgay } from '../components/activity-date-page';

export function TrangDongTho() {
  return (
    <TrangXemNgay
      tieuDe="Khởi tạo động thổ"
      nhanNguon="興造動土〈修造同〉"
      moTa="Dụng sự Quyển 11 cho khởi tạo động thổ/tu tạo, kết hợp Nghi kị Quyển 10 đã source-lock cho Thổ Phù, Địa Nang và Thổ Vượng."
      taiKetQua={xemNgayDongTho}
    />
  );
}

export function TrangSuaCungThat() {
  return (
    <TrangXemNgay
      tieuDe="Sửa cung thất"
      nhanNguon="修宮室"
      moTa="Dụng sự Quyển 11 cho sửa cung thất, giữ riêng Thổ Phủ 土府, Thổ Phù 土符, Địa Nang và calendar fact Thổ Vượng."
      taiKetQua={xemNgaySuaCungThat}
    />
  );
}
