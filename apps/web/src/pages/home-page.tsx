import { Link } from 'react-router';

import { DUONG_DAN } from '../routes';

const NHOM_CONG_VIEC = [
  {
    to: DUONG_DAN.CUOI_HOI,
    nhanHan: '嫁娶',
    tieuDe: 'Cưới hỏi',
    moTa: 'Tìm ngày phù hợp với năm sinh của cả hai người.',
    kyHieu: '囍',
  },
  {
    to: DUONG_DAN.DONG_THO,
    nhanHan: '興造動土',
    tieuDe: 'Động thổ',
    moTa: 'Xét chủ nhà, thời tiết khí và các điều kị xây dựng.',
    kyHieu: '土',
  },
  {
    to: DUONG_DAN.SUA_CUNG_THAT,
    nhanHan: '修宮室',
    tieuDe: 'Sửa nhà',
    moTa: 'Chọn thời điểm sửa chữa theo mệnh chủ nhà.',
    kyHieu: '宅',
  },
  {
    to: DUONG_DAN.KHAI_TRUONG,
    nhanHan: '開市',
    tieuDe: 'Khai trương',
    moTa: 'Lọc cả tháng theo ngày phù hợp với người chủ sự.',
    kyHieu: '市',
  },
  {
    to: DUONG_DAN.XUAT_HANH,
    nhanHan: '出行',
    tieuDe: 'Xuất hành',
    moTa: 'Chọn ngày đi xa, có xét xung năm sinh.',
    kyHieu: '行',
  },
  {
    to: DUONG_DAN.DI_CHUYEN,
    nhanHan: '移徙',
    tieuDe: 'Di chuyển',
    moTa: 'Chọn ngày chuyển chỗ ở hoặc dời chuyển việc quan trọng.',
    kyHieu: '移',
  },
  {
    to: DUONG_DAN.AN_TANG,
    nhanHan: '安葬',
    tieuDe: 'An táng',
    moTa: 'Lấy năm sinh người mất làm mệnh chính để chọn ngày.',
    kyHieu: '葬',
  },
] as const;

export function TrangChu() {
  return (
    <main className="trang-chu trang-chu-moi">
      <header className="hero-trang-chu">
        <div className="thuong-hieu-trang-chu">
          <span className="dau-an">日</span>
          <div>
            <strong>Ngày</strong>
            <small>Hiệp Kỷ Biện Phương Thư</small>
          </div>
        </div>

        <div className="hero-noi-dung">
          <p className="nhan">Chọn ngày theo người và công việc</p>
          <h1>
            Tìm ngày phù hợp,
            <span> không chỉ ngày “đẹp” chung chung.</span>
          </h1>
          <p className="hero-mo-ta">
            Chọn việc cần làm, nhập năm sinh người liên quan và xem cả tháng. Hệ thống loại ngày
            xung mệnh trước, sau đó mới xét các điều nên, kị và ngoại lệ đã đối chiếu giữa bản Việt
            và Hán.
          </p>
          <div className="hero-tin-cay">
            <span>Không chấm điểm tùy ý</span>
            <span>Xét theo tiết khí</span>
            <span>Đối chiếu hai nguồn</span>
          </div>
        </div>
      </header>

      <section className="chon-cong-viec">
        <div className="dau-muc-trang-chu">
          <div>
            <p className="nhan">Bắt đầu</p>
            <h2>Bạn cần chọn ngày cho việc gì?</h2>
          </div>
          <p>
            Theo cổ pháp đang dùng, phần tương chủ xét <strong>năm sinh</strong>, không bắt nhập đủ
            ngày giờ sinh.
          </p>
        </div>

        <div className="luoi-cong-viec">
          {NHOM_CONG_VIEC.map((item) => (
            <Link className="the-cong-viec" to={item.to} key={item.to}>
              <span className="ky-hieu-cong-viec">{item.kyHieu}</span>
              <span className="nhan-han">{item.nhanHan}</span>
              <h3>{item.tieuDe}</h3>
              <p>{item.moTa}</p>
              <span className="mo-cong-viec">Xem ngày →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="cach-hoat-dong">
        <div>
          <span className="buoc">01</span>
          <h3>Nhập năm sinh</h3>
          <p>
            Cưới hỏi dùng hai người; sửa/động thổ dùng chủ nhà; an táng dùng năm sinh người mất.
          </p>
        </div>
        <div>
          <span className="buoc">02</span>
          <h3>Xem cả tháng</h3>
          <p>Mỗi ngày được phân loại rõ: phù hợp, trung bình, nên tránh, đại kị hoặc xung tuổi.</p>
        </div>
        <div>
          <span className="buoc">03</span>
          <h3>Mở ngày để xem chi tiết</h3>
          <p>
            Xem Can Chi, Trực, điều nên/kị và nguồn đã đối chiếu. Giờ thực hiện được xét ở bước kế
            tiếp.
          </p>
        </div>
      </section>
    </main>
  );
}
