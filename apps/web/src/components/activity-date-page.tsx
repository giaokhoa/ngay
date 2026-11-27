import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

import { DongGopDanhGiaApi, KetQuaXemNgayApi, ThamChieuNguonApi } from '../api/date-selection';
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
  THO_PHU: 'Thổ Phủ (土府)',
  THO_PHU_TIN: 'Thổ Phù (土符)',
  DIA_NANG: 'Địa Nang',
  DAN_NHAT: 'Dân nhật',
  DICH_MA: 'Dịch Mã',
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
  TU_PHE: 'Tứ Phế',
  TU_KY: 'Tứ Kị',
  TU_CUNG: 'Tứ Cùng',
  NGU_MO: 'Ngũ Mộ',
  VANG_VONG: 'Vãng Vong',
  BAT_CHUYEN: 'Bát Chuyên',
};

export interface CauHinhTrangXemNgay {
  tieuDe: string;
  nhanNguon: string;
  moTa: string;
  taiKetQua: (thoiDiem: Date, muiGio: string) => Promise<KetQuaXemNgayApi>;
}

export function TrangXemNgay({ tieuDe, nhanNguon, moTa, taiKetQua }: CauHinhTrangXemNgay) {
  const [ngay, setNgay] = useState(() => dinhDangNgayInput(new Date()));
  const muiGio = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Ho_Chi_Minh',
    [],
  );
  const [ketQua, setKetQua] = useState<KetQuaXemNgayApi | null>(null);
  const [dangTai, setDangTai] = useState(false);
  const [loi, setLoi] = useState<string | null>(null);

  useEffect(() => {
    document.title = tieuDe + ' — Ngày';
  }, [tieuDe]);

  async function gui(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDangTai(true);
    setLoi(null);

    try {
      const thoiDiem = taoNoonLocalDate(ngay);
      setKetQua(await taiKetQua(thoiDiem, muiGio));
    } catch (error) {
      setKetQua(null);
      setLoi(error instanceof Error ? error.message : 'Không thể xem ngày');
    } finally {
      setDangTai(false);
    }
  }

  return (
    <main className="trang-xem-ngay">
      <header className="dau-trang">
        <Link className="thuong-hieu" to={DUONG_DAN.TRANG_CHU}>
          Ngày
        </Link>
        <div>
          <p className="nhan">Hiệp Kỷ Biện Phương Thư · {nhanNguon}</p>
          <h1>{tieuDe}</h1>
          <p className="mo-ta">{moTa}</p>
        </div>
      </header>

      <form className="bo-chon-ngay" onSubmit={gui}>
        <label>
          <span>Ngày muốn xem</span>
          <input
            type="date"
            value={ngay}
            onChange={(event) => setNgay(event.target.value)}
            required
          />
        </label>
        <label>
          <span>Múi giờ</span>
          <input type="text" value={muiGio} readOnly />
        </label>
        <button type="submit" disabled={dangTai}>
          {dangTai ? 'Đang đối chiếu…' : 'Xem ngày'}
        </button>
      </form>

      {loi ? <p className="thong-bao-loi">{loi}</p> : null}
      {ketQua ? <KetQuaXemNgay ketQua={ketQua} /> : null}
    </main>
  );
}

function KetQuaXemNgay({ ketQua }: { ketQua: KetQuaXemNgayApi }) {
  const hieuLuc = ketQua.danhGia.dongGop.filter((item) => item.trangThai === 'HIEU_LUC');
  const nen = hieuLuc.filter((item) => item.quyTac.tacDong === 'NEN');
  const ky = hieuLuc.filter((item) => item.quyTac.tacDong === 'KY');
  const biLoai = ketQua.danhGia.dongGop.filter((item) => item.trangThai === 'BI_LOAI');

  return (
    <section className="ket-qua" aria-live="polite">
      <div className="tong-quan">
        <div>
          <p className="nhan">Ngày dân sự {ketQua.ngayDanSu}</p>
          <h2>
            {nhanCan(ketQua.canChiNgay.can)} {nhanDiaChi(ketQua.canChiNgay.chi)}
          </h2>
        </div>
        <div className="thong-so">
          <span>Tháng: {nhanDiaChi(ketQua.chiThang)}</span>
          <span>Trực: {nhanTruc(ketQua.truc)}</span>
          {ketQua.dangThoVuong ? <span className="nhan-trang-thai">Đang Thổ Vượng</span> : null}
          {ketQua.danhGia.camMoiViec ? <strong>Quyển 10: mọi việc đều kị</strong> : null}
        </div>
      </div>

      <div className="hai-cot">
        <NhomDongGop tieuDe="Nên" items={nen} rong="Không có Nên đang hiệu lực." />
        <NhomDongGop tieuDe="Kị" items={ky} rong="Không có Kị đang hiệu lực." />
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
        <section className="the">
          <h3>Rule bị triệt/loại</h3>
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
        </section>
      ) : null}

      <details className="the">
        <summary>Yếu tố ngày và provenance</summary>
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
  return (
    <small className="nguon">
      {nguon
        .map((item) => {
          const ban = item.loaiNguon === 'BAN_VIET' ? 'Bản Việt' : 'Hán bản';
          const tap = item.tap ? ' Tập ' + item.tap : '';
          const trang = item.trang ? ' tr. ' + item.trang : '';
          return ban + tap + ' · Q' + item.quyen + trang;
        })
        .join(' · ')}
    </small>
  );
}

function nhanDieuKien(item: DongGopDanhGiaApi): string {
  const condition = item.quyTac.dieuKien;
  if (condition.loai === 'YEU_TO') return NHAN_YEU_TO[condition.ma ?? ''] ?? condition.ma ?? '';
  if (condition.loai === 'TRUC') return 'Trực ' + nhanTruc(condition.truc ?? '');
  if (condition.loai === 'CHI_NGAY') return 'Ngày ' + nhanDiaChi(condition.chi ?? '');
  return 'Thổ Vượng dụng sự';
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

function dinhDangNgayInput(date: Date): string {
  const nam = date.getFullYear();
  const thang = String(date.getMonth() + 1).padStart(2, '0');
  const ngay = String(date.getDate()).padStart(2, '0');
  return [nam, thang, ngay].join('-');
}

function taoNoonLocalDate(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    throw new RangeError('Ngày không hợp lệ');
  }

  const nam = Number(match[1]);
  const thang = Number(match[2]);
  const ngay = Number(match[3]);
  return new Date(nam, thang - 1, ngay, 12, 0, 0, 0);
}
