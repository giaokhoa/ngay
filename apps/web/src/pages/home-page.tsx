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
      <div className="hanh-dong-trang-chu">
        <Link className="nut-chinh" to={DUONG_DAN.CUOI_HOI}>
          Lễ cưới, đón dâu
        </Link>
        <Link className="nut-phu" to={DUONG_DAN.DI_CHUYEN}>
          Di chuyển
        </Link>
        <Link className="nut-phu" to={DUONG_DAN.DONG_THO}>
          Khởi tạo động thổ
        </Link>
        <Link className="nut-phu" to={DUONG_DAN.SUA_CUNG_THAT}>
          Sửa cung thất
        </Link>
        <Link className="nut-phu" to={DUONG_DAN.KHAI_TRUONG}>
          Khai trương
        </Link>
        <Link className="nut-phu" to={DUONG_DAN.XUAT_HANH}>
          Xuất hành
        </Link>
      </div>
    </main>
  );
}
