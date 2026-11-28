import { TrangXemNgay } from '../components/activity-date-page';

export function TrangTeTu() {
  return (
    <TrangXemNgay
      tieuDe="Cúng tế"
      nhanNguon="祭祀"
      moTa="Chọn ngày cúng tế theo các cát thần đã đối chiếu; tránh Thiên Cẩu, ngày Dần và các trường hợp đại kị áp dụng cho mọi việc."
      congViec="TE_TU"
      nhanNguoi={['Người chủ lễ']}
    />
  );
}
