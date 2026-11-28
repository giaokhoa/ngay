import { TrangXemNgay } from '../components/activity-date-page';

export function TrangAnTang() {
  return (
    <TrangXemNgay
      tieuDe="An táng"
      nhanNguon="安葬"
      moTa="Chọn ngày an táng theo Hiệp Kỷ, lấy năm sinh người mất làm mệnh chính và xét các điều nên, kị liên quan."
      congViec="AN_TANG"
      nhanNguoi={['Người mất']}
    />
  );
}
