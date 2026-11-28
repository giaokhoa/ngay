import { TrangXemNgay } from '../components/activity-date-page';

export function TrangKhanhThuong() {
  return (
    <TrangXemNgay
      tieuDe="Chúc mừng ban thưởng"
      nhanNguon="慶賜賞賀"
      moTa="Chọn ngày chúc mừng, ban thưởng hoặc thưởng công theo các cát thần đã đối chiếu; ngày Dậu không được ghi là ngày nên cho việc này."
      congViec="KHANH_THUONG"
      nhanNguoi={['Người chủ sự']}
    />
  );
}
