import { TrangXemNgay } from '../components/activity-date-page';

export function TrangQuanDai() {
  return (
    <TrangXemNgay
      tieuDe="Lễ đội mũ / Quan đới"
      nhanNguon="冠帶"
      moTa="Chọn ngày cho lễ đội mũ hoặc nghi thức Quan đới theo Trực Định, các điều kị và ngoại lệ của Hiệp Kỷ, có xét năm sinh người chủ sự."
      congViec="QUAN_DAI"
      nhanNguoi={['Người chủ sự']}
    />
  );
}
