import { TrangXemNgay } from '../components/activity-date-page';

export function TrangNhapHoc() {
  return (
    <TrangXemNgay
      tieuDe="Nhập học"
      nhanNguon="入學"
      moTa="Chọn ngày bắt đầu việc học theo Trực Thành hoặc Trực Khai; không có điều kị riêng trong mục Nhập học, nhưng vẫn tránh các ngày đại kị áp dụng cho mọi việc."
      congViec="NHAP_HOC"
      nhanNguoi={['Người học']}
    />
  );
}
