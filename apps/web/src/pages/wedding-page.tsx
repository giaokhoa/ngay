import { xemNgayCuoiHoi } from '../api/date-selection';
import { TrangXemNgay } from '../components/activity-date-page';

export function TrangCuoiHoi() {
  return (
    <TrangXemNgay
      tieuDe="Lễ cưới, đón dâu"
      nhanNguon="嫁娶"
      moTa="Kết quả dựa trên Dụng sự Quyển 11 và các ngoại lệ Nghi kị Quyển 10, không dùng điểm số cộng trừ tùy ý."
      taiKetQua={xemNgayCuoiHoi}
    />
  );
}
