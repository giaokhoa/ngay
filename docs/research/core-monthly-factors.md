# Research: Core monthly relation factors — Quyển 6

Status: VERIFIED

Issue: #11

## Mục tiêu

Xác minh nhóm factor theo chi tháng/chi ngày dùng làm vertical slice đầu tiên của factor engine.

Scope:

- Tam Hợp
- Dịch Mã
- Kiếp Sát
- Tai Sát
- Nguyệt Sát
- Nguyệt Hình
- Nguyệt Hại
- Lục Hợp
- Ngũ Phú
- Thiên Thương
- Thiên Tặc

## Nguồn Việt

Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 6 — Nghĩa lệ 4.

| Yếu tố                 | Trang PDF | Trang in |
| ---------------------- | --------: | -------: |
| Tam Hợp                |       483 |      476 |
| Dịch Mã / Thiên Hậu    |       488 |      481 |
| Kiếp Sát               |       492 |      485 |
| Tai Sát / Thiên Hỏa    |       493 |      486 |
| Nguyệt Sát / Nguyệt Hư |       498 |      491 |
| Nguyệt Hình            |       500 |      493 |
| Nguyệt Hại             |       501 |      494 |
| Lục Hợp                |       509 |      502 |
| Ngũ Phú                |       513 |      506 |
| Thiên Thương           |       515 |      508 |
| Thiên Tặc              |       517 |      510 |

Các trang trên có đồ hình tháng -> địa chi và phần giải thích ngay dưới đồ hình.

## Hán bản

Nguồn chính:

- 欽定協紀辨方書, 卷六, 義例四.
- https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B706

Oracle tổng hợp:

- Quyển 9 — Lập thành.
- Nguyệt biểu Quyển 20–31 dùng spot-check theo từng tháng.

## Contract chung

Input cho nhóm này là `chiThang` đã được calendar core xác định theo tiết khí.

Không dùng số tháng âm lịch.

Một factor match khi `chiNgay` nằm đúng vị trí/set được source quy định cho `chiThang`.

```ts
interface BoiCanhYeuToThang {
  chiThang: DiaChi;
  chiNgay: DiaChi;
}
```

## MaYeuTo đề xuất

```ts
export enum MaYeuTo {
  TAM_HOP = 'TAM_HOP',
  DICH_MA = 'DICH_MA',
  KIEP_SAT = 'KIEP_SAT',
  TAI_SAT = 'TAI_SAT',
  NGUYET_SAT = 'NGUYET_SAT',
  NGUYET_HINH = 'NGUYET_HINH',
  NGUYET_HAI = 'NGUYET_HAI',
  LUC_HOP = 'LUC_HOP',
  NGU_PHU = 'NGU_PHU',
  THIEN_THUONG = 'THIEN_THUONG',
  THIEN_TAC = 'THIEN_TAC',
}
```

Alias không đồng nghĩa tạo factor riêng.

## Bảng canonical 12 tháng

Thứ tự tháng theo calendar core:

`DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI, TY, SUU`.

| Chi tháng | Tam Hợp    | Dịch Mã | Kiếp Sát | Tai Sát | Nguyệt Sát | Nguyệt Hình | Nguyệt Hại | Lục Hợp | Ngũ Phú | Thiên Thương | Thiên Tặc |
| --------- | ---------- | ------- | -------- | ------- | ---------- | ----------- | ---------- | ------- | ------- | ------------ | --------- |
| Dần       | Ngọ, Tuất  | Thân    | Hợi      | Tý      | Sửu        | Tỵ          | Tỵ         | Hợi     | Hợi     | Dần          | Sửu       |
| Mão       | Mùi, Hợi   | Tỵ      | Thân     | Dậu     | Tuất       | Tý          | Thìn       | Tuất    | Dần     | Sửu          | Tý        |
| Thìn      | Tý, Thân   | Dần     | Tỵ       | Ngọ     | Mùi        | Thìn        | Mão        | Dậu     | Tỵ      | Tý           | Hợi       |
| Tỵ        | Sửu, Dậu   | Hợi     | Dần      | Mão     | Thìn       | Thân        | Dần        | Thân    | Thân    | Hợi          | Tuất      |
| Ngọ       | Dần, Tuất  | Thân    | Hợi      | Tý      | Sửu        | Ngọ         | Sửu        | Mùi     | Hợi     | Tuất         | Dậu       |
| Mùi       | Mão, Hợi   | Tỵ      | Thân     | Dậu     | Tuất       | Sửu         | Tý         | Ngọ     | Dần     | Dậu          | Thân      |
| Thân      | Tý, Thìn   | Dần     | Tỵ       | Ngọ     | Mùi        | Dần         | Hợi        | Tỵ      | Tỵ      | Thân         | Mùi       |
| Dậu       | Sửu, Tỵ    | Hợi     | Dần      | Mão     | Thìn       | Dậu         | Tuất       | Thìn    | Thân    | Mùi          | Ngọ       |
| Tuất      | Dần, Ngọ   | Thân    | Hợi      | Tý      | Sửu        | Mùi         | Dậu        | Mão     | Hợi     | Ngọ          | Tỵ        |
| Hợi       | Mão, Mùi   | Tỵ      | Thân     | Dậu     | Tuất       | Hợi         | Thân       | Dần     | Dần     | Tỵ           | Thìn      |
| Tý        | Thìn, Thân | Dần     | Tỵ       | Ngọ     | Mùi        | Mão         | Mùi        | Sửu     | Tỵ      | Thìn         | Mão       |
| Sửu       | Tỵ, Dậu    | Hợi     | Dần      | Mão     | Thìn       | Tuất        | Ngọ        | Tý      | Thân    | Mão          | Dần       |

Bảng này được lập từ các đồ hình Việt + quy tắc Hán và cross-check với Lập thành/Nguyệt biểu khi có dữ liệu trực tiếp.

## 1. Tam Hợp

### Nguồn

Quyển 6 nêu bốn cục:

- Dần–Ngọ–Tuất;
- Tỵ–Dậu–Sửu;
- Thân–Tý–Thìn;
- Hợi–Mão–Mùi.

Hán bản ghi rõ Tam Hợp là các chi khác vị trí nhưng cùng khí; mỗi tháng lấy hai chi còn lại để hợp thành cục với Nguyệt kiến.

### Representation

Không cần bảng 12 tháng thủ công trong production nếu dùng bốn nhóm cố định.

```ts
const NHOM_TAM_HOP = [
  [DAN, NGO, TUAT],
  [TI, DAU, SUU],
  [THAN, TY, THIN],
  [HOI, MAO, MUI],
];
```

Match khi:

- `chiThang` và `chiNgay` cùng nhóm;
- `chiNgay !== chiThang`.

### Status

VERIFIED.

## 2. Dịch Mã

### Nguồn

Bản Việt: “tháng Giêng khởi ở Thân, nghịch hành tứ mạnh”.

Hán bản:
`驛馬者正月起申逆行四孟`.

Hán bản còn giải thích theo nhóm:

- Dần–Ngọ–Tuất -> Thân;
- Thân–Tý–Thìn -> Dần;
- Hợi–Mão–Mùi -> Tỵ;
- Tỵ–Dậu–Sửu -> Hợi.

### Alias

Thiên Hậu cùng vị trí với Dịch Mã trong Quyển 6.

Không cần calculator `THIEN_HAU` riêng nếu product chỉ cần vị trí. Alias/provenance có thể được lưu trên cùng definition.

### Status

VERIFIED.

## 3. Kiếp Sát

### Nguồn

Bản Việt: “tháng Giêng khởi ở Hợi, nghịch hành tứ mạnh”.

Hán:
`刼煞者正月起亥逆行四孟`.

Canonical:

- Dần/Ngọ/Tuất -> Hợi;
- Mão/Mùi/Hợi -> Thân;
- Thìn/Thân/Tý -> Tỵ;
- Tỵ/Dậu/Sửu -> Dần.

### Status

VERIFIED.

## 4. Tai Sát

### Nguồn

Bản Việt có đồ hình “Tai Sát — Thiên Ngục — Thiên Hỏa”.

Hán bản Quyển 6 chỉnh rõ:

- Nguyệt Tai Sát dùng cùng nghĩa với Tuế Tai Sát;
- vị trí chuẩn theo chuỗi `Tý, Dậu, Ngọ, Mão` lặp lại;
- ghi chép “Thiên Ngục” bị coi là trùng/sai và kết luận nên bỏ;
- Thiên Hỏa được sửa theo cùng chuỗi nghịch hành bốn trọng.

Canonical:

- Dần/Ngọ/Tuất -> Tý;
- Mão/Mùi/Hợi -> Dậu;
- Thìn/Thân/Tý -> Ngọ;
- Tỵ/Dậu/Sửu -> Mão.

### Alias policy

Production:

- factor canonical: `TAI_SAT`;
- có thể lưu “Thiên Hỏa” như tên cùng vị trí/source alias;
- **không tạo `THIEN_NGUC` thành factor độc lập**.

“Thiên Ngục” chỉ được giữ trong provenance/note lịch sử bản dịch nếu cần.

### Status

VERIFIED.

## 5. Nguyệt Sát

### Nguồn

Bản Việt: “tháng Giêng khởi ở Sửu, nghịch hành tứ quý”.

Hán:
`月煞者正月起丑逆行四季`.

Canonical:

- Dần/Ngọ/Tuất -> Sửu;
- Mão/Mùi/Hợi -> Tuất;
- Thìn/Thân/Tý -> Mùi;
- Tỵ/Dậu/Sửu -> Thìn.

### Alias

Nguyệt Hư cùng vị trí theo Quyển 6.

### Status

VERIFIED.

## 6. Nguyệt Hình

### Nguồn

Bản Việt đồ hình PDF 500 / trang in 493 cho đủ 12 tháng.

Hán bản nói:
`月刑之義與歲刑同`.

Lập thành/table tradition cho chuỗi theo tháng:

`Tỵ, Tý, Thìn, Thân, Ngọ, Sửu, Dần, Dậu, Mùi, Hợi, Mão, Tuất`.

### Representation

Dùng explicit lookup table.

Không cố rút thành một phép cộng modulo vì quan hệ hình không phải một offset đều.

### Status

VERIFIED.

## 7. Nguyệt Hại

### Nguồn

Bản Việt: “tháng Giêng khởi ở Tỵ, nghịch hành mười hai thời”.

Hán:
`月害者正月起巳逆行十二辰`.

Hán còn giải thích đây là Lục Hại và lấy việc xung với chi hợp của Nguyệt kiến làm hại.

Các cặp:

- Tý–Mùi;
- Sửu–Ngọ;
- Dần–Tỵ;
- Mão–Thìn;
- Thân–Hợi;
- Dậu–Tuất.

### Representation

Dùng pair map Lục Hại, không cần 12-entry duplicate table nếu helper rõ.

### Status

VERIFIED.

## 8. Lục Hợp

### Nguồn

Bản Việt: “tháng Giêng tại Hợi, nghịch hành mười hai thời”.

Hán:
`六合者正月在亥逆行十二辰`.

Các cặp:

- Tý–Sửu;
- Dần–Hợi;
- Mão–Tuất;
- Thìn–Dậu;
- Tỵ–Thân;
- Ngọ–Mùi.

### Vô Kiều

Nguồn cũ gọi cùng ngày Lục Hợp là Vô Kiều và lại gán kị cưới, nhưng chính phần án của sách bác lý do này và kết luận nên bỏ cách gọi/kiêng đó.

Do đó:

- không tạo `VO_KIEU` làm factor production;
- có thể lưu trong provenance như historical/rejected alias.

### Status

VERIFIED.

## 9. Ngũ Phú

### Nguồn

Lịch lệ:
`正月起亥順行四孟`.

Bản Việt:
“tháng Giêng khởi ở Hợi thuận hành tứ mạnh”.

Canonical sequence theo tháng:
`Hợi, Dần, Tỵ, Thân` lặp lại.

Hán bản có lưu thêm một thuyết giải thích khác nói “nên nghịch hành tứ mạnh”, nhưng **Lập thành Quyển 9 dùng chuỗi thuận**:
`亥, 寅, 巳, 申` lặp lại.

Vì project lấy bảng chính thức của chính sách làm oracle, production dùng chuỗi thuận.

### Status

VERIFIED.

## 10. Thiên Thương

### Nguồn

Bản Việt:
“tháng Giêng khởi ở Dần, nghịch hành mười hai thời”.

Hán:
`天倉者正月起寅逆行十二辰`.

Lập thành xác nhận:
`Dần, Sửu, Tý, Hợi, Tuất, Dậu, Thân, Mùi, Ngọ, Tỵ, Thìn, Mão`.

### Status

VERIFIED.

## 11. Thiên Tặc

### Nguồn

Bản Việt:
“tháng Giêng tại Sửu, nghịch hành mười hai thời”.

Hán:
`天賊者正月在丑逆行十二辰`.

Lập thành xác nhận:
`Sửu, Tý, Hợi, Tuất, Dậu, Thân, Mùi, Ngọ, Tỵ, Thìn, Mão, Dần`.

### Status

VERIFIED.

## Oracle plan cho implementation #12

### Oracle A — Quyển 9 / Lập thành

Dùng bảng 12 tháng độc lập để test:

- Dịch Mã;
- Kiếp Sát;
- Tai Sát;
- Nguyệt Sát;
- Nguyệt Hình;
- Nguyệt Hại;
- Lục Hợp;
- Ngũ Phú;
- Thiên Thương;
- Thiên Tặc.

### Oracle B — Nguyệt biểu

Spot-check ít nhất tháng Giêng:

- Nguyệt Hình = Tỵ;
- Nguyệt Hại = Tỵ;
- Kiếp Sát = Hợi;
- Tai Sát = Tý;
- Nguyệt Sát = Sửu.

Thêm tháng Mão và một tháng ở nửa sau năm để tránh test chỉ một vùng.

### Tam Hợp

Test 12 tháng từ danh sách chính Quyển 6 và đồ hình Việt.

## Representation đề xuất

Không dựng một “calculator DSL” quá tổng quát ở PR đầu tiên.

Đủ dùng:

```ts
interface DinhNghiaYeuToTheoChiThang {
  ma: MaYeuTo;
  chiNgayTheoChiThang: ReadonlyMap<DiaChi, ReadonlySet<DiaChi>>;
  nguon: ThamChieuNguon[];
}
```

Một factor một vị trí dùng set một phần tử.

Tam Hợp dùng set hai phần tử.

Nếu sau này nhiều factor có công thức ổn định và cần tối ưu representation, refactor sau khi test oracle đã khóa semantics.

## Không thuộc scope #12

Không đưa vào cùng implementation:

- nghi/kị theo công việc;
- cát/hung;
- hóa giải;
- aliases bị sách bác bỏ;
- các factor còn lại của Quyển 6;
- Quyển 5/4.

Factor engine của #12 chỉ trả lời:

> Với context ngày này, những `MaYeuTo` nào đang xuất hiện?

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
