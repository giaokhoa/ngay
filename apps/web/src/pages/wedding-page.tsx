import { TrangXemNgay } from '../components/activity-date-page';

export function TrangCuoiHoi() {
  return (
    <TrangXemNgay
      tieuDe="Lễ cưới, đón dâu"
      nhanNguon="嫁娶"
      moTa="Chọn ngày cưới theo các điều nên, kị và ngoại lệ của Hiệp Kỷ; có xét năm sinh của cả hai người."
      congViec="CUOI_HOI"
      nhanNguoi={['Cô dâu', 'Chú rể']}
    />
  );
}
