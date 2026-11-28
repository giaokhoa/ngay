import { TrangXemNgay } from '../components/activity-date-page';

export function TrangKhaiTruong() {
  return (
    <TrangXemNgay
      tieuDe="Khai trương"
      nhanNguon="開市"
      moTa="Chọn ngày khai trương theo điều nên, kị và ngoại lệ của Hiệp Kỷ, có xét năm sinh người chủ sự."
      congViec="KHAI_TRUONG"
      nhanNguoi={['Người chủ sự']}
    />
  );
}
