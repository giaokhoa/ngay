import { TrangXemNgay } from '../components/activity-date-page';

export function TrangAnGiuong() {
  return (
    <TrangXemNgay
      tieuDe="Kê giường"
      nhanNguon="安牀"
      moTa="Chọn ngày kê giường theo Trực Nguy, các điều kị và ngoại lệ của Hiệp Kỷ, có xét năm sinh người chủ sự."
      congViec="AN_GIUONG"
      nhanNguoi={['Người chủ sự']}
    />
  );
}
