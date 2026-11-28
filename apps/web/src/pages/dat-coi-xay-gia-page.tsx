import { TrangXemNgay } from '../components/activity-date-page';

export function TrangDatCoiXayGia() {
  return (
    <TrangXemNgay
      tieuDe="Đặt cối xay, giã"
      nhanNguon="安碓磑"
      moTa="Chọn ngày đặt cối xay, giã theo Tam Hợp hoặc Khai nhật; tránh Thổ Phủ, Nguyệt Phá, Tam Sát, Nguyệt Hình/Yếm, Tứ Phế, Thổ Phù, Địa Nang và sau Thổ Vượng dụng sự. Bình nhật không phải Kị riêng của việc này."
      congViec="DAT_COI_XAY_GIA"
      nhanNguoi={['Người thực hiện']}
    />
  );
}
