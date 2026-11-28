import { TrangXemNgay } from '../components/activity-date-page';

export function TrangDongTho() {
  return (
    <TrangXemNgay
      tieuDe="Khởi tạo động thổ"
      nhanNguon="興造動土〈修造同〉"
      moTa="Chọn ngày khởi tạo động thổ/tu tạo theo Hiệp Kỷ, có xét năm sinh chủ nhà cùng Thổ Phù, Địa Nang và Thổ Vượng."
      congViec="DONG_THO"
      nhanNguoi={['Chủ nhà']}
    />
  );
}

export function TrangSuaCungThat() {
  return (
    <TrangXemNgay
      tieuDe="Sửa cung thất"
      nhanNguon="修宮室"
      moTa="Chọn ngày sửa cung thất theo Hiệp Kỷ, có xét năm sinh chủ nhà, Thổ Phủ, Thổ Phù, Địa Nang và Thổ Vượng."
      congViec="SUA_CUNG_THAT"
      nhanNguoi={['Chủ nhà']}
    />
  );
}
