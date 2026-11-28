import { TrangXemNgay } from '../components/activity-date-page';

export function TrangLapKheUocGiaoDich() {
  return (
    <TrangXemNgay
      tieuDe="Lập khế ước, giao dịch"
      nhanNguon="立劵交易"
      moTa="Chọn ngày ký kết hợp đồng hoặc giao dịch theo Thiên Nguyện, Dân Nhật, Tam Hợp, Mãn, Lục Hợp, Ngũ Phú và Ngũ Hợp; tránh các Kị Q11 cùng Trường Tinh, Đoản Tinh bổ sung từ Q10."
      congViec="LAP_KHE_UOC_GIAO_DICH"
      nhanNguoi={['Người giao dịch']}
    />
  );
}
