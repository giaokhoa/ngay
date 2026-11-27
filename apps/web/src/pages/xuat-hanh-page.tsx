import { xemNgayXuatHanh } from '../api/date-selection';
import { TrangXemNgay } from '../components/activity-date-page';

export function TrangXuatHanh() {
  return (
    <TrangXemNgay
      tieuDe="Xuất hành"
      nhanNguon="行幸遣使〈出行同〉"
      moTa="Dụng sự Quyển 11 cho đế vương xuất hành, sai sứ và xuất hành; giữ nguyên khác biệt Q11 Việt/Hán về Nguyệt Yếm và bổ sung blocker này từ Quyển 10."
      taiKetQua={xemNgayXuatHanh}
    />
  );
}
