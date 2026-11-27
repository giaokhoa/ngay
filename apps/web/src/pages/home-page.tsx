import { Link } from 'react-router';

import { DUONG_DAN } from '../routes';

export function TrangChu() {
  return (
    <main className="trang-chu">
      <p className="nhan">Hiệp Kỷ Biện Phương Thư</p>
      <h1>Ngày</h1>
      <p>
        Xem ngày theo quy tắc có nguồn đối chiếu, giữ riêng lịch pháp, thần sát, Dụng sự và Nghi kị.
      </p>
      <Link className="nut-chinh" to={DUONG_DAN.CUOI_HOI}>
        Xem ngày lễ cưới, đón dâu
      </Link>
    </main>
  );
}
