import { TrangXemNgay } from '../components/activity-date-page';

export function TrangXuatHanh() {
  return (
    <TrangXemNgay
      tieuDe="Xuất hành"
      nhanNguon="行幸遣使〈出行同〉"
      moTa="Chọn ngày xuất hành theo Hiệp Kỷ, có xét năm sinh của người xuất hành."
      congViec="XUAT_HANH"
      nhanNguoi={['Người xuất hành']}
    />
  );
}
