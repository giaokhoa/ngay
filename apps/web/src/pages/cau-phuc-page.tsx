import { TrangXemNgay } from '../components/activity-date-page';

export function TrangCauPhuc() {
  return (
    <TrangXemNgay
      tieuDe="Cầu phúc"
      nhanNguon="祈福"
      moTa="Chọn ngày cầu phúc theo các cát thần đã đối chiếu; tránh Vô Lộc, Du Họa, Thượng Sóc, Tứ Ly, Tứ Tuyệt, Hối nhật và các Kị riêng của việc cầu phúc."
      congViec="CAU_PHUC"
      nhanNguoi={['Người chủ lễ']}
    />
  );
}
