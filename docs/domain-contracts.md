# Domain Contracts

Tài liệu này khóa shape khái niệm ở mức kiến trúc để các Agent không tự tạo model khác nhau cho cùng một nghiệp vụ.

Đây là contract định hướng. Khi implementation đầu tiên cần thay đổi contract, phải cập nhật tài liệu và tạo ADR nếu thay đổi có ảnh hưởng rộng.

## Calendar domain

```ts
export enum ThienCan {
  GIAP = 'GIAP',
  AT = 'AT',
  BINH = 'BINH',
  DINH = 'DINH',
  MAU = 'MAU',
  KY = 'KY',
  CANH = 'CANH',
  TAN = 'TAN',
  NHAM = 'NHAM',
  QUY = 'QUY',
}

export enum DiaChi {
  TY = 'TY',
  SUU = 'SUU',
  DAN = 'DAN',
  MAO = 'MAO',
  THIN = 'THIN',
  TI = 'TI',
  NGO = 'NGO',
  MUI = 'MUI',
  THAN = 'THAN',
  DAU = 'DAU',
  TUAT = 'TUAT',
  HOI = 'HOI',
}

export interface CanChi {
  can: ThienCan;
  chi: DiaChi;
}

export interface ThongTinNgay {
  thoiDiem: string;
  muiGio: string;
  nam: CanChi;
  thang: CanChi;
  ngay: CanChi;
  tietKhi: TietKhi;
  chiThang: DiaChi;
  truc: ThapNhiTruc;
}
```

Ghi chú bắt buộc:

- TY = Tý.
- TI = Tỵ.
- Calendar không chứa kết luận cát/hung.

## Factor domain

Không giả định mọi yếu tố đều là sao.

```ts
export interface YeuToNgay {
  ma: MaYeuTo;
  loai: LoaiYeuTo;
  nguon: ThamChieuNguon[];
}
```

MaYeuTo là registry ổn định cho yếu tố đã VERIFIED.

Loại yếu tố có thể gồm thần/sát, trực, quan hệ Can Chi, ngày đặc biệt hoặc thời kỳ. Không khóa enum cuối cùng trước khi research đủ.

## Activity domain

```ts
export interface QuyTacDungSu {
  ma: string;
  congViec: LoaiCongViec;
  yeuTo: MaYeuTo;
  tacDong: TacDongDungSu;
  dieuKien?: DieuKien;
  nguon: ThamChieuNguon[];
}

export enum TacDongDungSu {
  NEN = 'NEN',
  KY = 'KY',
}
```

Không thêm mức điểm tùy ý vào QuyTacDungSu nếu nguồn không có.

## Evaluation domain

Evaluation phải giữ được dấu vết rule nào quyết định kết quả.

```ts
export interface KetQuaDanhGia {
  congViec: LoaiCongViec;
  yeuToXuatHien: MaYeuTo[];
  quyTacDaApDung: string[];
  quyTacBiVoHieu?: string[];
  quyTacConHieuLuc: string[];
  ketLuan: KetLuanNgay;
  nguon: ThamChieuNguon[];
}
```

Tên field có thể tinh chỉnh khi implementation, nhưng các invariant không được mất:

- biết yếu tố nào xuất hiện;
- biết rule nào đã áp;
- biết rule nào bị ngoại lệ/hóa giải nếu có;
- biết rule nào còn hiệu lực;
- truy được nguồn.

## Provenance

Dùng contract trong docs/source-reference.md.

Một rule không có provenance không được coi là production-ready.

## Invariant toàn hệ thống

1. Tính lịch và đánh giá ngày là hai lớp khác nhau.
2. Yếu tố xuất hiện không đồng nghĩa tự động tốt/xấu cho mọi việc.
3. Dụng sự quyết định yếu tố nào liên quan công việc.
4. Nghi kị/evaluation xử lý ngoại lệ và phối hợp.
5. Presentation label không được thay đổi logic engine.
6. Không dùng score tùy ý làm source of truth.
