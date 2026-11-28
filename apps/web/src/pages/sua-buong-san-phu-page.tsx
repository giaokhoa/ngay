import { TrangXemNgay } from '../components/activity-date-page';

export function TrangSuaBuongSanPhu() {
  return (
    <TrangXemNgay
      tieuDe="Bố trí, sửa sang buồng sản phụ"
      nhanNguon="修置産室"
      moTa="Chọn ngày bố trí hoặc sửa sang buồng sản phụ theo Khai nhật; tránh các Kị Q11, trong đó Bình nhật/Tử Thần và Thổ Phủ/Thổ Phù là các identity riêng, cùng Tử Khí, Địa Nang và sau Thổ Vượng dụng sự."
      congViec="SUA_BUONG_SAN_PHU"
      nhanNguoi={['Người thực hiện']}
    />
  );
}
