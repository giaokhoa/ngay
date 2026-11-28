import { TrangXemNgay } from '../components/activity-date-page';

export function TrangSuaMongTayChan() {
  return (
    <TrangXemNgay
      tieuDe="Sửa móng tay chân"
      nhanNguon="整手足甲"
      moTa="Chọn ngày sửa móng tay chân theo ngày Trừ, Giải Thần và Trừ Thần; tránh Nguyệt Phá, các hung thần liên quan và ngày âm 1, 6, 15, 19, 21, 23."
      congViec="SUA_MONG_TAY_CHAN"
      nhanNguoi={['Người thực hiện']}
    />
  );
}
