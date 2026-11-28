import { TrangXemNgay } from '../components/activity-date-page';

export function TrangCauYTriBenh() {
  return (
    <TrangXemNgay
      tieuDe="Cầu y, trị bệnh"
      nhanNguon="求醫療病"
      moTa="Chọn ngày cầu thầy hoặc trị bệnh theo Thiên Y, Thiên Hậu, ngày Trừ/Phá/Khai và Giải Thần; tránh ngày Mùi, ngày âm 15, Sóc–Huyền–Vọng cùng các hung thần đã đối chiếu."
      congViec="CAU_Y_TRI_BENH"
      nhanNguoi={['Người cần trị bệnh']}
    />
  );
}
