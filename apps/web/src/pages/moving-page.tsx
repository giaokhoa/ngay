import { TrangXemNgay } from '../components/activity-date-page';

export function TrangDiChuyen() {
  return (
    <TrangXemNgay
      tieuDe="Di chuyển"
      nhanNguon="般移〈移徙同〉"
      moTa="Chọn ngày di chuyển theo điều nên, kị và ngoại lệ của Hiệp Kỷ, có xét năm sinh người chủ sự."
      congViec="DI_CHUYEN"
      nhanNguoi={['Người chủ sự']}
    />
  );
}
