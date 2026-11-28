import { TrangXemNgay } from '../components/activity-date-page';

export function TrangMoKhoXuatHangTien() {
  return (
    <TrangXemNgay
      tieuDe="Mở kho xuất hàng, tiền"
      nhanNguon="開倉庫出貨財"
      moTa="Chọn ngày mở kho, xuất hàng hoặc tiền theo Nguyệt Ân, Tứ Tướng, Thời Đức, Mãn nhật và Ngũ Phú; tránh các Kị Q11, trong đó Nguyệt Sát/Nguyệt Hư là cùng một identity, cùng Ngũ Hư, Thiên Tặc và ngày Giáp."
      congViec="MO_KHO_XUAT_HANG_TIEN"
      nhanNguoi={['Người thực hiện']}
    />
  );
}
