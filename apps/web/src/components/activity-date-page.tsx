import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

import {
  DongGopDanhGiaApi,
  GioThucHienApi,
  KetQuaChiTietNgayApi,
  KetQuaXemNgayApi,
  KetQuaXemThangApi,
  NgayTrongThangApi,
  NguoiLienQuanXemNgayApi,
  ThamChieuNguonApi,
  xemChiTietNgay,
  xemThang,
} from '../api/date-selection';
import { DUONG_DAN } from '../routes';

const NHAN_YEU_TO: Readonly<Record<string, string>> = {
  THIEN_DUC: 'Thiên Đức',
  NGUYET_DUC: 'Nguyệt Đức',
  THIEN_DUC_HOP: 'Thiên Đức Hợp',
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

const THU = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] as const;

export interface CauHinhTrangXemNgay {
  tieuDe: string;
  nhanNguon: string;
  moTa: string;
  congViec: string;
  nhanNguoi: readonly string[];
}

interface FormNguoi {
  namSinh: string;
  truocLapXuan: boolean;
}

export function TrangXemNgay({
  tieuDe,
  nhanNguon,
  moTa,
  congViec,
  nhanNguoi,
}: CauHinhTrangXemNgay) {
  const [thang, setThang] = useState(() => dinhDangThangInput(new Date()));
  const [nguoi, setNguoi] = useState<readonly FormNguoi[]>(() =>
    nhanNguoi.map(() => ({ namSinh: '', truocLapXuan: false })),
  );
  const muiGio = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Ho_Chi_Minh',
    [],
  );
  const [ketQuaThang, setKetQuaThang] = useState<KetQuaXemThangApi | null>(null);
  const [chiTietNgay, setChiTietNgay] = useState<KetQuaChiTietNgayApi | null>(null);
  const [nguoiDaXem, setNguoiDaXem] = useState<readonly NguoiLienQuanXemNgayApi[]>([]);
  const [ngayDangXem, setNgayDangXem] = useState<string | null>(null);
  const [dangTai, setDangTai] = useState(false);
  const [dangTaiNgay, setDangTaiNgay] = useState(false);
  const [loi, setLoi] = useState<string | null>(null);

  useEffect(() => {
    document.title = tieuDe + ' — Ngày';
  }, [tieuDe]);

  async function gui(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDangTai(true);
    setLoi(null);
    setChiTietNgay(null);
    setNgayDangXem(null);

    try {
      const { nam, thangSo } = docThangInput(thang);
      const nguoiLienQuan = docNguoiLienQuan(nguoi);
      setNguoiDaXem(nguoiLienQuan);
      setKetQuaThang(await xemThang(congViec, nam, thangSo, muiGio, nguoiLienQuan));
    } catch (error) {
      setKetQuaThang(null);
      setLoi(error instanceof Error ? error.message : 'Không thể xem tháng');
    } finally {
      setDangTai(false);
    }
  }

  async function xemChiTiet(ngay: string) {
    setDangTaiNgay(true);
    setLoi(null);
    setNgayDangXem(ngay);

    try {
      setChiTietNgay(await xemChiTietNgay(congViec, taoNoonLocalDate(ngay), muiGio, nguoiDaXem));
    } catch (error) {
      setChiTietNgay(null);
      setLoi(error instanceof Error ? error.message : 'Không thể xem chi tiết ngày');
    } finally {
      setDangTaiNgay(false);
    }
  }

  function suaNguoi(index: number, patch: Partial<FormNguoi>) {
    setNguoi((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    );
  }

  return (
    <main className="trang-xem-ngay">
      <header className="dau-trang dau-trang-xem-ngay">
        <Link className="thuong-hieu" to={DUONG_DAN.TRANG_CHU}>
          Ngày
        </Link>
        <div>
          <p className="nhan">Hiệp Kỷ Biện Phương Thư · {nhanNguon}</p>
          <h1>{tieuDe}</h1>
          <p className="mo-ta">{moTa}</p>
        </div>
      </header>

      <section className="ghi-chu-tuong-chu">
        <strong>Xét theo năm sinh, không bắt buộc ngày giờ sinh.</strong>
        <p>
          Hiệp Kỷ dùng năm sinh của người liên quan để tránh xung mệnh. Nếu sinh trước Lập Xuân
          (thường đầu tháng 2), đánh dấu để dùng Can-Chi của năm trước. Khi chọn được ngày, bước
          tiếp theo mới xét giờ của thời điểm thực hiện.
        </p>
      </section>

      <form className="bo-chon-thang" onSubmit={gui}>
        <label className="truong-thang">
          <span>Tháng muốn xem</span>
          <input
            type="month"
            value={thang}
            onChange={(event) => setThang(event.target.value)}
            required
          />
        </label>

        {nguoi.map((item, index) => (
          <fieldset className="truong-nguoi" key={nhanNguoi[index] ?? index}>
            <legend>{nhanNguoi[index] ?? 'Người liên quan'}</legend>
            <label>
              <span>Năm sinh</span>
              <input
                type="number"
                min="1900"
                max="2100"
                inputMode="numeric"
                placeholder="Ví dụ: 1990"
                value={item.namSinh}
                onChange={(event) => suaNguoi(index, { namSinh: event.target.value })}
                required
              />
            </label>
            <label className="chon-lap-xuan">
              <input
                type="checkbox"
                checked={item.truocLapXuan}
                onChange={(event) => suaNguoi(index, { truocLapXuan: event.target.checked })}
              />
              <span>Sinh trước Lập Xuân</span>
            </label>
          </fieldset>
        ))}

        <div className="hanh-dong-xem-thang">
          <span className="mui-gio">Múi giờ: {muiGio}</span>
          <button type="submit" disabled={dangTai}>
            {dangTai ? 'Đang đối chiếu…' : 'Tìm ngày phù hợp'}
          </button>
        </div>
      </form>

      {loi ? <p className="thong-bao-loi">{loi}</p> : null}

      {ketQuaThang ? (
        <KetQuaThang
          ketQua={ketQuaThang}
          nhanNguoi={nhanNguoi}
          ngayDangXem={ngayDangXem}
          onChonNgay={xemChiTiet}
        />
      ) : null}

      {dangTaiNgay ? <p className="dang-tai-ngay">Đang mở chi tiết ngày…</p> : null}
      {chiTietNgay ? (
        <section className="chi-tiet-ngay">
          <div className="tieu-de-chi-tiet">
            <p className="nhan">Chi tiết ngày đã chọn</p>
            <h2>{dinhDangNgayViet(chiTietNgay.ketQuaNgay.ngayDanSu)}</h2>
          </div>
          <KetQuaXemNgay ketQua={chiTietNgay.ketQuaNgay} />
          <BangGio gio={chiTietNgay.gio} nhanNguoi={nhanNguoi} />
        </section>
      ) : null}
    </main>
  );
}

function KetQuaThang({
  ketQua,
  nhanNguoi,
  ngayDangXem,
  onChonNgay,
}: {
  ketQua: KetQuaXemThangApi;
  nhanNguoi: readonly string[];
  ngayDangXem: string | null;
  onChonNgay: (ngay: string) => void;
}) {
  const offset = thuDauThang(ketQua.nam, ketQua.thang);
  const oTrong = Array.from({ length: offset }, (_, index) => index);

  return (
    <section className="ket-qua-thang" aria-live="polite">
      <div className="dau-ket-qua-thang">
        <div>
          <p className="nhan">Kết quả theo tháng</p>
          <h2>
            Tháng {ketQua.thang}/{ketQua.nam}
          </h2>
        </div>
        <div className="thong-ke-thang">
          <ThongKeNgay value={ketQua.thongKe.TOT} label="Tốt" loai="tot" />
          <ThongKeNgay value={ketQua.thongKe.TRUNG_BINH} label="Trung bình" loai="trung-binh" />
          <ThongKeNgay value={ketQua.thongKe.NEN_TRANH} label="Nên tránh" loai="nen-tranh" />
          <ThongKeNgay value={ketQua.thongKe.DAI_KY} label="Đại kỵ" loai="dai-ky" />
          <ThongKeNgay value={ketQua.thongKe.XUNG_TUOI} label="Xung tuổi" loai="xung-tuoi" />
        </div>
      </div>

      <div className="menh-da-dung">
        {ketQua.nguoiLienQuan.map((nguoi, index) => (
          <div key={(nhanNguoi[index] ?? index) + ':' + nguoi.namSinh}>
            <span>{nhanNguoi[index] ?? 'Người liên quan'}</span>
            <strong>
              {nhanCan(nguoi.canChiNamSinh.can)} {nhanDiaChi(nguoi.canChiNamSinh.chi)}
            </strong>
            <small>
              Sinh năm {nguoi.namSinh}
              {nguoi.truocLapXuan ? ' · tính theo năm Can-Chi trước' : ''}
            </small>
          </div>
        ))}
      </div>

      <p className="giai-thich-xep-loai">
        Không dùng điểm cộng trừ. Ngày xung năm sinh được loại trước; tiếp đến đại kỵ và các điều kị
        đang hiệu lực. “Tốt” là ngày có điều nên mà không còn điều kị hiệu lực.
      </p>

      <div className="lich-thang">
        {THU.map((thu) => (
          <div className="ten-thu" key={thu}>
            {thu}
          </div>
        ))}
        {oTrong.map((index) => (
          <div className="o-ngay o-trong" key={'blank-' + index} />
        ))}
        {ketQua.ngay.map((ngay) => (
          <NgayCard
            key={ngay.ngayDanSu}
            ngay={ngay}
            nhanNguoi={nhanNguoi}
            dangChon={ngayDangXem === ngay.ngayDanSu}
            onChon={() => onChonNgay(ngay.ngayDanSu)}
          />
        ))}
      </div>
    </section>
  );
}

function NgayCard({
  ngay,
  nhanNguoi,
  dangChon,
  onChon,
}: {
  ngay: NgayTrongThangApi;
  nhanNguoi: readonly string[];
  dangChon: boolean;
  onChon: () => void;
}) {
  const ngaySo = Number(ngay.ngayDanSu.slice(-2));

  return (
    <button
      type="button"
      className={
        'o-ngay ngay-' +
        ngay.xepLoai.toLowerCase().replace('_', '-') +
        (dangChon ? ' dang-chon' : '')
      }
      onClick={onChon}
    >
      <span className="so-ngay">{ngaySo}</span>
      <span className="can-chi-ngay">
        {nhanCan(ngay.canChiNgay.can)} {nhanDiaChi(ngay.canChiNgay.chi)}
      </span>
      <span className="truc-ngay">Trực {nhanTruc(ngay.truc)}</span>
      <small className={'than-hoang-hac than-' + ngay.thanHoangHac.loai.toLowerCase()}>
        {ngay.thanHoangHac.loai === 'HOANG_DAO' ? 'Hoàng đạo' : 'Hắc đạo'} · {ngay.thanHoangHac.ten}
      </small>
      <strong className="nhan-xep-loai">{nhanXepLoai(ngay.xepLoai)}</strong>
      {ngay.xungTuoi.length > 0 ? (
        <small className="ly-do-tuoi">
          {ngay.xungTuoi
            .map((item) => {
              const ten = nhanNguoi[item.nguoiIndex] ?? 'Người liên quan';
              const tru = item.xung.map((xung) => nhanTru(xung.tru)).join(', ');
              return ten + ': xung ' + tru;
            })
            .join(' · ')}
        </small>
      ) : null}
    </button>
  );
}

function ThongKeNgay({ value, label, loai }: { value: number; label: string; loai: string }) {
  return (
    <div className={'thong-ke-ngay ' + loai}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function BangGio({
  gio,
  nhanNguoi,
}: {
  gio: readonly GioThucHienApi[];
  nhanNguoi: readonly string[];
}) {
  return (
    <section className="the bang-gio">
      <div className="dau-bang-gio">
        <div>
          <p className="nhan">Giờ thực hiện</p>
          <h3>Chọn giờ sau khi đã chọn ngày</h3>
        </div>
        <p>Ưu tiên giờ trợ ngày; tránh giờ phá, hình, Ngũ Bất Ngộ và giờ xung năm sinh.</p>
      </div>
      <div className="luoi-gio">
        {gio.map((item) => (
          <article
            className={'the-gio gio-' + item.xepLoai.toLowerCase().replace('_', '-')}
            key={item.chiGio}
          >
            <div className="ten-gio">
              <strong>Giờ {nhanDiaChi(item.chiGio)}</strong>
              <span>{item.khoangGio}</span>
            </div>
            <p className="can-chi-gio">
              {nhanCan(item.canChiGio.can)} {nhanDiaChi(item.canChiGio.chi)}
            </p>
            <small className={'than-hoang-hac than-' + item.thanHoangHac.loai.toLowerCase()}>
              {item.thanHoangHac.loai === 'HOANG_DAO' ? 'Hoàng đạo' : 'Hắc đạo'} ·{' '}
              {item.thanHoangHac.ten}
            </small>
            <span className="nhan-gio">{nhanXepLoaiGio(item.xepLoai)}</span>
            {item.lyDoTot.length > 0 ? (
              <ul className="ly-do-gio ly-do-tot">
                {item.lyDoTot.map((lyDo) => (
                  <li key={lyDo}>{lyDo}</li>
                ))}
              </ul>
            ) : null}
            {item.lyDoTranh.length > 0 ? (
              <ul className="ly-do-gio ly-do-tranh">
                {item.lyDoTranh.map((lyDo) => (
                  <li key={lyDo}>{lyDo}</li>
                ))}
              </ul>
            ) : null}
            {item.xungTuoi.length > 0 ? (
              <p className="xung-tuoi-gio">
                {item.xungTuoi
                  .map((xung) => (nhanNguoi[xung.nguoiIndex] ?? 'Người liên quan') + ': xung tuổi')
                  .join(' · ')}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function KetQuaXemNgay({ ketQua }: { ketQua: KetQuaXemNgayApi }) {
  const hieuLuc = ketQua.danhGia.dongGop.filter((item) => item.trangThai === 'HIEU_LUC');
  const nen = hieuLuc.filter((item) => item.quyTac.tacDong === 'NEN');
  const ky = hieuLuc.filter((item) => item.quyTac.tacDong === 'KY');
  const biLoai = ketQua.danhGia.dongGop.filter((item) => item.trangThai === 'BI_LOAI');

  return (
    <section className="ket-qua">
      <div className="tong-quan">
        <div>
          <p className="nhan">Can Chi ngày</p>
          <h2>
            {nhanCan(ketQua.canChiNgay.can)} {nhanDiaChi(ketQua.canChiNgay.chi)}
          </h2>
        </div>
        <div className="thong-so">
          <span>Tháng tiết khí: {nhanDiaChi(ketQua.chiThang)}</span>
          <span>Trực: {nhanTruc(ketQua.truc)}</span>
          <span>
            {ketQua.thanHoangHac.loai === 'HOANG_DAO' ? 'Hoàng đạo' : 'Hắc đạo'}:{' '}
            {ketQua.thanHoangHac.ten}
          </span>
          {ketQua.dangThoVuong ? <span className="nhan-trang-thai">Đang Thổ Vượng</span> : null}
          {ketQua.danhGia.camMoiViec ? <strong>Đối chiếu nghi kị: mọi việc đều kị</strong> : null}
        </div>
      </div>

      <p className="chu-thich-than-ngay">
        Hoàng/Hắc đạo là một lớp xét bổ sung, không thay thế các điều nên, kị theo công việc.
        {ketQua.hacDaoKyCongViec
          ? ' Hắc đạo của ngày này thuộc nhóm kị đối với việc đang xem.'
          : ''}
      </p>

      <div className="hai-cot">
        <NhomDongGop tieuDe="Nên" items={nen} rong="Không có điều nên đang hiệu lực." />
        <NhomDongGop tieuDe="Kị" items={ky} rong="Không có điều kị đang hiệu lực." />
      </div>

      {ketQua.danhGia.xungDotDaApDung.length > 0 ? (
        <section className="the">
          <h3>Nghi kị đã áp dụng</h3>
          <ul className="danh-sach-trace">
            {ketQua.danhGia.xungDotDaApDung.map((trace) => (
              <li key={trace.ma}>
                <p>{trace.moTa}</p>
                <Nguon nguon={trace.nguon} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {biLoai.length > 0 ? (
        <details className="the">
          <summary>Các điều đã được hóa giải hoặc loại</summary>
          <ul className="danh-sach-trace">
            {biLoai.map((item) => (
              <li key={item.quyTac.ma}>
                <p>
                  <strong>{nhanDieuKien(item)}</strong>
                  {item.lyDoLoai ? ' — ' + item.lyDoLoai : ''}
                </p>
                <Nguon nguon={item.quyTac.nguon} />
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <details className="the">
        <summary>Thần sát và nguồn đối chiếu</summary>
        <ul className="danh-sach-trace">
          {ketQua.yeuTo.map((yeuTo) => (
            <li key={yeuTo.ma}>
              <p>{NHAN_YEU_TO[yeuTo.ma] ?? yeuTo.ma}</p>
              <Nguon nguon={yeuTo.nguon} />
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

function NhomDongGop({
  tieuDe,
  items,
  rong,
}: {
  tieuDe: string;
  items: readonly DongGopDanhGiaApi[];
  rong: string;
}) {
  return (
    <section className="the">
      <h3>{tieuDe}</h3>
      {items.length === 0 ? (
        <p className="rong">{rong}</p>
      ) : (
        <ul className="danh-sach-rule">
          {items.map((item) => (
            <li key={item.quyTac.ma}>
              <strong>{nhanDieuKien(item)}</strong>
              <Nguon nguon={item.quyTac.nguon} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Nguon({ nguon }: { nguon: readonly ThamChieuNguonApi[] }) {
  const coViet = nguon.some((item) => item.loaiNguon === 'BAN_VIET');
  const coHan = nguon.some((item) => item.loaiNguon === 'HAN_BAN');
  const labels = [
    coViet ? 'Bản Việt đã đối chiếu' : null,
    coHan ? 'Hán bản đã đối chiếu' : null,
  ].filter((item): item is string => item !== null);

  return <small className="nguon">{labels.join(' · ')}</small>;
}

function docNguoiLienQuan(nguoi: readonly FormNguoi[]): readonly NguoiLienQuanXemNgayApi[] {
  return nguoi.map((item) => {
    const namSinh = Number(item.namSinh);
    const namHienTai = new Date().getFullYear();

    if (!Number.isInteger(namSinh) || namSinh < 1900 || namSinh > namHienTai) {
      throw new RangeError('Năm sinh phải từ 1900 đến ' + namHienTai);
    }

    return {
      namSinh,
      truocLapXuan: item.truocLapXuan,
    };
  });
}

function nhanDieuKien(item: DongGopDanhGiaApi): string {
  const condition = item.quyTac.dieuKien;
  if (condition.loai === 'YEU_TO') {
    return NHAN_YEU_TO[condition.ma ?? ''] ?? condition.ma ?? '';
  }
  if (condition.loai === 'TRUC') {
    return 'Trực ' + nhanTruc(condition.truc ?? '');
  }
  if (condition.loai === 'CHI_NGAY') {
    return 'Ngày ' + nhanDiaChi(condition.chi ?? '');
  }
  return 'Thổ Vượng dụng sự';
}

function nhanXepLoai(value: NgayTrongThangApi['xepLoai']): string {
  const map: Readonly<Record<NgayTrongThangApi['xepLoai'], string>> = {
    TOT: 'Tốt',
    TRUNG_BINH: 'Trung bình',
    NEN_TRANH: 'Nên tránh',
    DAI_KY: 'Đại kỵ',
    XUNG_TUOI: 'Xung tuổi',
  };
  return map[value];
}

function nhanXepLoaiGio(value: GioThucHienApi['xepLoai']): string {
  const map: Readonly<Record<GioThucHienApi['xepLoai'], string>> = {
    NEN_DUNG: 'Nên dùng',
    TRUNG_BINH: 'Trung bình',
    NEN_TRANH: 'Nên tránh',
    XUNG_TUOI: 'Xung tuổi',
  };
  return map[value];
}

function nhanTru(value: 'NAM' | 'THANG' | 'NGAY' | 'GIO'): string {
  const map = {
    NAM: 'năm',
    THANG: 'tháng',
    NGAY: 'ngày',
    GIO: 'giờ',
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
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0')].join('-');
}

function docThangInput(value: string): { nam: number; thangSo: number } {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) throw new RangeError('Tháng không hợp lệ');

  const nam = Number(match[1]);
  const thangSo = Number(match[2]);
  if (thangSo < 1 || thangSo > 12) {
    throw new RangeError('Tháng không hợp lệ');
  }
  return { nam, thangSo };
}

function taoNoonLocalDate(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new RangeError('Ngày không hợp lệ');

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0, 0);
}

function thuDauThang(nam: number, thang: number): number {
  const sundayBased = new Date(Date.UTC(nam, thang - 1, 1)).getUTCDay();
  return (sundayBased + 6) % 7;
}

function dinhDangNgayViet(value: string): string {
  const [nam, thang, ngay] = value.split('-');
  return [ngay, thang, nam].join('/');
}
