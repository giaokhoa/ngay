import { TrangXemNgay } from '../components/activity-date-page';

export function TrangNapTai() {
  return (
    <TrangXemNgay
      tieuDe="Nạp tiền của"
      nhanNguon="納財"
      moTa="Chọn ngày nạp tiền của theo Mẫu Thương, Thiên Nguyện, Dân Nhật, Tam Hợp, Mãn/Thu, Lục Hợp, Ngũ Phú và Thiên Thương; tránh các Kị Q11 cùng Trường Tinh, Đoản Tinh bổ sung từ Q10."
      congViec="NAP_TAI"
      nhanNguoi={['Người thực hiện']}
    />
  );
}
