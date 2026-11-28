import { TrangXemNgay } from '../components/activity-date-page';

export function TrangGiaiTru() {
  return (
    <TrangXemNgay
      tieuDe="Giải trừ"
      nhanNguon="解除"
      moTa="Chọn ngày giải trừ theo Giải Thần, Trừ Thần và các cát thần đã đối chiếu; Nguyệt Phá thường được miễn nhưng các hội hung đặc biệt vẫn có thể thành Kị."
      congViec="GIAI_TRU"
      nhanNguoi={['Người thực hiện']}
    />
  );
}
