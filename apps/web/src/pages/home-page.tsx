import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router';

import {
  DanhGiaCongViecTongQuanApi,
  KetQuaTongQuanThangApi,
  MaCongViecApi,
  NgayTongQuanApi,
  XepLoaiNgayApi,
  xemTongQuanThang,
} from '../api/date-selection';
import { DUONG_DAN } from '../routes';

const THU = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] as const;

const CONG_VIEC: readonly {
  ma: MaCongViecApi;
  ten: string;
  moTa: string;
  to: string;
}[] = [
  {
    ma: 'CUOI_HOI',
    ten: 'Cưới hỏi',
    moTa: 'Xét tuổi của bạn; thêm người còn lại khi cần xét đủ đôi.',
    to: DUONG_DAN.CUOI_HOI,
  },
  {
    ma: 'KHAI_TRUONG',
    ten: 'Khai trương',
    moTa: 'Ngày mở hàng, khai trương theo người chủ sự.',
    to: DUONG_DAN.KHAI_TRUONG,
  },
  {
    ma: 'XUAT_HANH',
    ten: 'Xuất hành',
    moTa: 'Ngày đi xa, khởi hành hoặc bắt đầu hành trình.',
    to: DUONG_DAN.XUAT_HANH,
  },
  {
    ma: 'DI_CHUYEN',
    ten: 'Di chuyển',
    moTa: 'Chuyển nhà, dời chỗ ở hoặc việc quan trọng.',
    to: DUONG_DAN.DI_CHUYEN,
  },
  {
    ma: 'AN_GIUONG',
    ten: 'Kê giường',
    moTa: 'Đặt hoặc kê giường theo người chủ sự.',
    to: DUONG_DAN.AN_GIUONG,
  },
  {
    ma: 'QUAN_DAI',
    ten: 'Quan đới',
    moTa: 'Lễ đội mũ hoặc nghi thức trưởng thành theo người chủ sự.',
    to: DUONG_DAN.QUAN_DAI,
  },
  {
    ma: 'NHAP_HOC',
    ten: 'Nhập học',
    moTa: 'Chọn ngày bắt đầu việc học theo ngày Thành hoặc Khai.',
    to: DUONG_DAN.NHAP_HOC,
  },
  {
    ma: 'YEN_HOI',
    ten: 'Yến hội',
    moTa: 'Yến tiệc, họp họ hàng, bạn bè hoặc thân hữu.',
    to: DUONG_DAN.YEN_HOI,
  },
  {
    ma: 'KHANH_THUONG',
    ten: 'Chúc mừng ban thưởng',
    moTa: 'Chọn ngày chúc mừng, ban thưởng hoặc thưởng công.',
    to: DUONG_DAN.KHANH_THUONG,
  },
  {
    ma: 'TE_TU',
    ten: 'Cúng tế',
    moTa: 'Chọn ngày cúng tế theo cát thần và các điều kị đã đối chiếu.',
    to: DUONG_DAN.TE_TU,
  },
  {
    ma: 'CAU_PHUC',
    ten: 'Cầu phúc',
    moTa: 'Chọn ngày cầu phúc theo cát thần, Vô Lộc và các ngày đặc biệt đã đối chiếu.',
    to: DUONG_DAN.CAU_PHUC,
  },
  {
    ma: 'CAU_TU',
    ten: 'Cầu tự',
    moTa: 'Chọn ngày cầu tự theo cát thần và các điều kị đã đối chiếu.',
    to: DUONG_DAN.CAU_TU,
  },
  {
    ma: 'DONG_THO',
    ten: 'Động thổ',
    moTa: 'Khởi công, đào đắp và việc xây dựng.',
    to: DUONG_DAN.DONG_THO,
  },
  {
    ma: 'SUA_CUNG_THAT',
    ten: 'Sửa nhà',
    moTa: 'Tu sửa nhà cửa, cung thất theo chủ nhà.',
    to: DUONG_DAN.SUA_CUNG_THAT,
  },
  {
    ma: 'AN_TANG',
    ten: 'An táng',
    moTa: 'Cần ngày sinh người mất để cá nhân hóa đúng.',
    to: DUONG_DAN.AN_TANG,
  },
];

const NHAN_YEU_TO: Readonly<Record<string, string>> = {
  THIEN_DUC: 'Thiên Đức',
  NGUYET_DUC: 'Nguyệt Đức',
  THIEN_DUC_HOP: 'Thiên Đức Hợp',
  THIEN_AN: 'Thiên Ân',
  NGUYET_DUC_HOP: 'Nguyệt Đức Hợp',
  THIEN_XA: 'Thiên Xá',
  THIEN_NGUYEN: 'Thiên Nguyện',
  NGUYET_AN: 'Nguyệt Ân',
  TU_TUONG: 'Tứ Tướng',
  THOI_DUC: 'Thời Đức',
  PHUC_DUC: 'Phúc Đức',
  NGUYET_KIEN: 'Nguyệt Kiến',
  THO_PHU: 'Thổ Phủ',
  THO_PHU_TIN: 'Thổ Phù',
  DIA_NANG: 'Địa Nang',
  DAN_NHAT: 'Dân Nhật',
  VUONG_NHAT: 'Vương Nhật',
  NGU_PHU: 'Ngũ Phú',
  DAI_HAO: 'Đại Hao',
  TIEU_HAO: 'Tiểu Hao',
  TU_HAO: 'Tứ Hao',
  CUU_KHONG: 'Cửu Không',
  DICH_MA: 'Dịch Mã',
  CAT_KY: 'Cát Kỳ',
  THIEN_MA: 'Thiên Mã',
  QUY_KY: 'Quy Kị',
  TAM_HOP: 'Tam Hợp',
  THIEN_HY: 'Thiên Hỷ',
  LUC_HOP: 'Lục Hợp',
  NGU_HOP: 'Ngũ Hợp',
  NGU_LY: 'Ngũ Ly',
  THIEN_CAU: 'Thiên Cẩu',
  PHO_HO: 'Phổ Hộ',
  PHUC_SINH: 'Phúc Sinh',
  THANH_TAM: 'Thánh Tâm',
  ICH_HAU: 'Ích Hậu',
  TUC_THE: 'Tục Thế',
  BAT_TUONG: 'Bất Tương',
  NGUYET_PHA: 'Nguyệt Phá',
  KIEP_SAT: 'Kiếp Sát',
  TAI_SAT: 'Tai Sát',
  NGUYET_SAT: 'Nguyệt Sát',
  NGUYET_HINH: 'Nguyệt Hình',
  NGUYET_HAI: 'Nguyệt Hại',
  NGUYET_YEM: 'Nguyệt Yếm',
  YEM_DOI: 'Yếm Đối',
  DAI_THOI: 'Đại Thời',
  THIEN_LAI: 'Thiên Lại',
  DU_HOA: 'Du Họa',
  GIAI_THAN: 'Giải Thần',
  VO_LOC: 'Vô Lộc',
  TU_LY: 'Tứ Ly',
  TU_TUYET: 'Tứ Tuyệt',
  HOI_NHAT: 'Hối nhật',
  THIEN_TAC: 'Thiên Tặc',
  TU_PHE: 'Tứ Phế',
  TU_KY: 'Tứ Kị',
  TU_CUNG: 'Tứ Cùng',
  NGU_MO: 'Ngũ Mộ',
  VANG_VONG: 'Vãng Vong',
  BAT_CHUYEN: 'Bát Chuyên',
  O_PHE: 'Ô Phệ',
  PHUC_NHAT: 'Phục Nhật',
  TRONG_NHAT: 'Trọng Nhật',
};

export function TrangChu() {
  const [ngaySinh, setNgaySinh] = useState('');
  const [thang, setThang] = useState(() => dinhDangThangInput(new Date()));
  const [ketQua, setKetQua] = useState<KetQuaTongQuanThangApi | null>(null);
  const [boLoc, setBoLoc] = useState<MaCongViecApi | 'TAT_CA'>('TAT_CA');
  const [ngayDangXem, setNgayDangXem] = useState<string | null>(null);
  const [dangTai, setDangTai] = useState(false);
  const [loi, setLoi] = useState<string | null>(null);
  const muiGio = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Ho_Chi_Minh',
    [],
  );

  async function gui(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDangTai(true);
    setLoi(null);
    setNgayDangXem(null);

    try {
      const { nam, thangSo } = docThangInput(thang);
      setKetQua(await xemTongQuanThang(ngaySinh, nam, thangSo, muiGio));
    } catch (error) {
      setKetQua(null);
      setLoi(error instanceof Error ? error.message : 'Không thể xem tháng');
    } finally {
      setDangTai(false);
    }
  }

  const ngayChiTiet = ketQua?.ngay.find((item) => item.ngayDanSu === ngayDangXem) ?? null;

  return (
    <main className="trang-chu trang-tong-quan">
      <header className="tong-quan-hero">
        <div className="thuong-hieu-trang-chu">
          <span className="dau-an">日</span>
          <div>
            <strong>Ngày</strong>
            <small>Hiệp Kỷ Biện Phương Thư</small>
          </div>
        </div>

        <div>
          <p className="nhan">Xem ngày theo người</p>
          <h1>Nhập ngày sinh. Xem ngày nào hợp với việc gì.</h1>
          <p className="hero-mo-ta">
            Không cần biết trước mình đang tìm “ngày cưới”, “ngày khai trương” hay một nhãn nào
            khác. Xem cả tháng trước, rồi lọc theo việc khi cần.
          </p>
        </div>
      </header>

      <form className="bo-chon-tong-quan" onSubmit={gui}>
        <label>
          <span>Ngày sinh của bạn</span>
          <input
            type="date"
            min="1900-01-01"
            max="2100-12-31"
            value={ngaySinh}
            onChange={(event) => setNgaySinh(event.target.value)}
            required
          />
          <small>
            Ngày sinh dùng để xác định năm Can-Chi quanh mốc Lập Xuân; nếu sinh đúng ngày giao tiết,
            hệ thống sẽ yêu cầu thêm giờ sinh thay vì đoán.
          </small>
        </label>

        <label>
          <span>Tháng muốn xem</span>
          <input
            type="month"
            value={thang}
            onChange={(event) => setThang(event.target.value)}
            required
          />
          <small>Múi giờ: {muiGio}</small>
        </label>

        <button type="submit" disabled={dangTai}>
          {dangTai ? 'Đang đối chiếu…' : 'Xem cả tháng'}
        </button>
      </form>

      {loi ? <p className="thong-bao-loi">{loi}</p> : null}

      {ketQua ? (
        <>
          <section className="dau-ket-qua-tong-quan">
            <div>
              <p className="nhan">Kết quả theo tháng</p>
              <h2>
                Tháng {ketQua.thang}/{ketQua.nam}
              </h2>
              <p>
                Năm Can-Chi đang dùng:{' '}
                <strong>
                  {nhanCan(ketQua.nguoi.canChiNamSinh.can)}{' '}
                  {nhanDiaChi(ketQua.nguoi.canChiNamSinh.chi)}
                </strong>{' '}
                · sinh {dinhDangNgayViet(ketQua.nguoi.ngaySinh)}
              </p>
            </div>
            <p className="ghi-chu-tong-quan">
              Không có “điểm tốt chung”. Mỗi việc có kết luận riêng. Xung tuổi được ưu tiên khi việc
              đó dùng tuổi của người đang xem.
            </p>
          </section>

          <nav className="bo-loc-cong-viec" aria-label="Lọc theo công việc">
            <button
              type="button"
              className={boLoc === 'TAT_CA' ? 'dang-chon' : ''}
              onClick={() => setBoLoc('TAT_CA')}
            >
              Tất cả việc
            </button>
            {CONG_VIEC.map((item) => (
              <button
                type="button"
                key={item.ma}
                className={boLoc === item.ma ? 'dang-chon' : ''}
                onClick={() => setBoLoc(item.ma)}
              >
                {item.ten}
              </button>
            ))}
          </nav>

          <LichTongQuan
            ketQua={ketQua}
            boLoc={boLoc}
            ngayDangXem={ngayDangXem}
            onChonNgay={setNgayDangXem}
          />

          {ngayChiTiet ? (
            <ChiTietTongQuanNgay
              ngay={ngayChiTiet}
              ngaySinh={ketQua.nguoi.ngaySinh}
              boLoc={boLoc}
            />
          ) : (
            <p className="goi-y-chon-ngay">
              Chọn một ngày trong lịch để xem mức tốt–xấu theo từng việc.
            </p>
          )}
        </>
      ) : (
        <section className="gioi-thieu-tong-quan">
          <div>
            <span>01</span>
            <strong>Nhập ngày sinh</strong>
            <p>Hệ thống tự xử lý mốc Lập Xuân, không bắt bạn hiểu thuật ngữ kỹ thuật.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Xem cả tháng</strong>
            <p>Mỗi ô ngày tóm tắt số việc phù hợp, nên tránh và xung tuổi.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Lọc khi cần</strong>
            <p>Chỉ khi bạn quan tâm một việc cụ thể mới bật bộ lọc tương ứng.</p>
          </div>
        </section>
      )}
    </main>
  );
}

function LichTongQuan({
  ketQua,
  boLoc,
  ngayDangXem,
  onChonNgay,
}: {
  ketQua: KetQuaTongQuanThangApi;
  boLoc: MaCongViecApi | 'TAT_CA';
  ngayDangXem: string | null;
  onChonNgay: (ngay: string) => void;
}) {
  const offset = thuDauThang(ketQua.nam, ketQua.thang);
  const oTrong = Array.from({ length: offset }, (_, index) => index);

  return (
    <section className="lich-tong-quan">
      <div className="hang-thu">
        {THU.map((thu) => (
          <span key={thu}>{thu}</span>
        ))}
      </div>
      <div className="luoi-ngay-tong-quan">
        {oTrong.map((item) => (
          <span className="o-ngay-trong" key={'empty-' + item} />
        ))}
        {ketQua.ngay.map((ngay) => {
          const danhGia = boLoc === 'TAT_CA' ? null : ngay.theoCongViec[boLoc];
          const xepLoai = danhGia?.xepLoai ?? null;

          return (
            <button
              type="button"
              key={ngay.ngayDanSu}
              className={[
                'o-ngay-tong-quan',
                xepLoai ? 'tong-quan-' + xepLoai.toLowerCase().replace('_', '-') : 'tong-quan-moi',
                ngayDangXem === ngay.ngayDanSu ? 'dang-xem' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onChonNgay(ngay.ngayDanSu)}
            >
              <span className="so-ngay">{Number(ngay.ngayDanSu.slice(-2))}</span>
              <strong>
                {nhanCan(ngay.canChiNgay.can)} {nhanDiaChi(ngay.canChiNgay.chi)}
              </strong>
              <small>Trực {nhanTruc(ngay.truc)}</small>
              <small className={'than-hoang-hac than-' + ngay.thanHoangHac.loai.toLowerCase()}>
                {ngay.thanHoangHac.loai === 'HOANG_DAO' ? 'Hoàng đạo' : 'Hắc đạo'} ·{' '}
                {ngay.thanHoangHac.ten}
              </small>

              {danhGia ? (
                <span className={'nhan-xep-loai nhan-' + danhGia.xepLoai.toLowerCase()}>
                  {nhanXepLoai(danhGia.xepLoai)}
                </span>
              ) : (
                <TomTatNgay ngay={ngay} />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TomTatNgay({ ngay }: { ngay: NgayTongQuanApi }) {
  const tranh = ngay.thongKe.NEN_TRANH + ngay.thongKe.DAI_KY;

  return (
    <span className="tom-tat-ngay">
      {ngay.thongKe.TOT > 0 ? <em>{ngay.thongKe.TOT} tốt</em> : null}
      {tranh > 0 ? <em>{tranh} tránh</em> : null}
      {ngay.thongKe.XUNG_TUOI > 0 ? <em>{ngay.thongKe.XUNG_TUOI} xung</em> : null}
      {ngay.thongKe.TRUNG_BINH > 0 ? <em>{ngay.thongKe.TRUNG_BINH} TB</em> : null}
    </span>
  );
}

function ChiTietTongQuanNgay({
  ngay,
  ngaySinh,
  boLoc,
}: {
  ngay: NgayTongQuanApi;
  ngaySinh: string;
  boLoc: MaCongViecApi | 'TAT_CA';
}) {
  const danhSach = boLoc === 'TAT_CA' ? CONG_VIEC : CONG_VIEC.filter((item) => item.ma === boLoc);

  return (
    <section className="chi-tiet-tong-quan">
      <header>
        <div>
          <p className="nhan">Ngày đang xem</p>
          <h2>{dinhDangNgayViet(ngay.ngayDanSu)}</h2>
          <p>
            {nhanCan(ngay.canChiNgay.can)} {nhanDiaChi(ngay.canChiNgay.chi)} · Trực{' '}
            {nhanTruc(ngay.truc)} ·{' '}
            {ngay.thanHoangHac.loai === 'HOANG_DAO' ? 'Hoàng đạo' : 'Hắc đạo'}{' '}
            {ngay.thanHoangHac.ten}
          </p>
        </div>
        {ngay.xungTuoi.length > 0 ? (
          <div className="canh-bao-xung-tuoi">
            <strong>Có xung tuổi</strong>
            <span>{ngay.xungTuoi.map((item) => nhanTru(item.tru)).join(' · ')}</span>
          </div>
        ) : (
          <div className="khong-xung-tuoi">
            <strong>Không xung tuổi ở năm / tháng / ngày</strong>
            <span>Đang xét theo ngày sinh {dinhDangNgayViet(ngaySinh)}</span>
          </div>
        )}
      </header>

      <div className="luoi-danh-gia-cong-viec">
        {danhSach.map((item) => (
          <TheDanhGiaCongViec
            key={item.ma}
            item={item}
            danhGia={ngay.theoCongViec[item.ma]}
            ngaySinh={ngaySinh}
            ngayDanSu={ngay.ngayDanSu}
          />
        ))}
      </div>
    </section>
  );
}

function TheDanhGiaCongViec({
  item,
  danhGia,
  ngaySinh,
  ngayDanSu,
}: {
  item: (typeof CONG_VIEC)[number];
  danhGia: DanhGiaCongViecTongQuanApi;
  ngaySinh: string;
  ngayDanSu: string;
}) {
  const query = new URLSearchParams({
    ngaySinh,
    thang: ngayDanSu.slice(0, 7),
  });
  return (
    <article className={'the-danh-gia-cong-viec muc-' + danhGia.xepLoai.toLowerCase()}>
      <div className="dau-the-danh-gia">
        <div>
          <h3>{item.ten}</h3>
          <p>{item.moTa}</p>
        </div>
        <span className={'nhan-xep-loai nhan-' + danhGia.xepLoai.toLowerCase()}>
          {nhanXepLoai(danhGia.xepLoai)}
        </span>
      </div>

      {danhGia.caNhanHoa === 'CAN_THEM_NGUOI' ? (
        <p className="ghi-chu-ca-nhan-hoa">Đã xét tuổi của bạn; thêm người còn lại để xét đủ.</p>
      ) : null}
      {danhGia.caNhanHoa === 'CAN_NGUOI_MAT' ? (
        <p className="ghi-chu-ca-nhan-hoa">
          Chưa áp tuổi của bạn. An táng phải dùng ngày sinh người mất.
        </p>
      ) : null}

      <div className="ly-do-cong-viec">
        {danhGia.nen.length > 0 ? (
          <div>
            <strong>Nên</strong>
            <p>{danhGia.nen.slice(0, 3).map(nhanLyDo).join(' · ')}</p>
          </div>
        ) : null}
        {danhGia.ky.length > 0 ? (
          <div>
            <strong>Kị</strong>
            <p>{danhGia.ky.slice(0, 3).map(nhanLyDo).join(' · ')}</p>
          </div>
        ) : null}
        {danhGia.nen.length === 0 && danhGia.ky.length === 0 ? (
          <p>Không có điều nên/kị hiệu lực trong tập luật hiện tại.</p>
        ) : null}
      </div>

      <Link className="mo-chi-tiet-cong-viec" to={item.to + '?' + query.toString()}>
        Xem kỹ việc này →
      </Link>
    </article>
  );
}

function nhanLyDo(value: string): string {
  if (value.startsWith('TRUC_')) {
    return 'Trực ' + nhanTruc(value.slice(5));
  }
  if (value.startsWith('CHI_NGAY_')) {
    return 'Ngày ' + nhanDiaChi(value.slice(9));
  }
  if (value === 'THO_VUONG') return 'Thổ Vượng';
  return NHAN_YEU_TO[value] ?? value.replaceAll('_', ' ');
}

function nhanXepLoai(value: XepLoaiNgayApi): string {
  const map: Readonly<Record<XepLoaiNgayApi, string>> = {
    TOT: 'Tốt',
    TRUNG_BINH: 'Trung bình',
    NEN_TRANH: 'Nên tránh',
    DAI_KY: 'Đại kỵ',
    XUNG_TUOI: 'Xung tuổi',
  };
  return map[value];
}

function nhanTru(value: 'NAM' | 'THANG' | 'NGAY' | 'GIO'): string {
  const map = {
    NAM: 'xung năm',
    THANG: 'xung tháng',
    NGAY: 'xung ngày',
    GIO: 'xung giờ',
  } as const;
  return map[value];
}

function nhanCan(value: string): string {
  const map: Readonly<Record<string, string>> = {
    GIAP: 'Giáp',
    AT: 'Ất',
    BINH: 'Bính',
    DINH: 'Đinh',
    MAU: 'Mậu',
    KY: 'Kỷ',
    CANH: 'Canh',
    TAN: 'Tân',
    NHAM: 'Nhâm',
    QUY: 'Quý',
  };
  return map[value] ?? value;
}

function nhanDiaChi(value: string): string {
  const map: Readonly<Record<string, string>> = {
    TY: 'Tý',
    SUU: 'Sửu',
    DAN: 'Dần',
    MAO: 'Mão',
    THIN: 'Thìn',
    TI: 'Tỵ',
    NGO: 'Ngọ',
    MUI: 'Mùi',
    THAN: 'Thân',
    DAU: 'Dậu',
    TUAT: 'Tuất',
    HOI: 'Hợi',
  };
  return map[value] ?? value;
}

function nhanTruc(value: string): string {
  const map: Readonly<Record<string, string>> = {
    KIEN: 'Kiến',
    TRU: 'Trừ',
    MAN: 'Mãn',
    BINH: 'Bình',
    DINH: 'Định',
    CHAP: 'Chấp',
    PHA: 'Phá',
    NGUY: 'Nguy',
    THANH: 'Thành',
    THU: 'Thu',
    KHAI: 'Khai',
    BE: 'Bế',
  };
  return map[value] ?? value;
}

function dinhDangThangInput(date: Date): string {
  const nam = date.getFullYear();
  const thang = String(date.getMonth() + 1).padStart(2, '0');
  return nam + '-' + thang;
}

function docThangInput(value: string): { nam: number; thangSo: number } {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) throw new Error('Tháng muốn xem không hợp lệ');
  const nam = Number(match[1]);
  const thangSo = Number(match[2]);
  if (nam < 1900 || nam > 2100 || thangSo < 1 || thangSo > 12) {
    throw new Error('Tháng muốn xem không hợp lệ');
  }
  return { nam, thangSo };
}

function thuDauThang(nam: number, thang: number): number {
  const thuChuNhat0 = new Date(Date.UTC(nam, thang - 1, 1)).getUTCDay();
  return (thuChuNhat0 + 6) % 7;
}

function dinhDangNgayViet(value: string): string {
  const [nam, thang, ngay] = value.split('-');
  return [ngay, thang, nam].join('/');
}
