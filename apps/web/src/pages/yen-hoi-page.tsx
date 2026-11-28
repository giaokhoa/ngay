import { TrangXemNgay } from '../components/activity-date-page';

export function TrangYenHoi() {
  return (
    <TrangXemNgay
      tieuDe="Yến hội"
      nhanNguon="宴會〈會親友同〉"
      moTa="Chọn ngày yến tiệc, họp họ hàng, bạn bè hoặc thân hữu theo các cát thần và ngày đã đối chiếu; các trường hợp đại kị vẫn được loại riêng."
      congViec="YEN_HOI"
      nhanNguoi={['Người chủ tiệc']}
    />
  );
}
