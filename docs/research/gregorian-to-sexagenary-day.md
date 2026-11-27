# Research: Ngày dương lịch -> Can Chi ngày

Status: VERIFIED

## Câu hỏi cần trả lời

Cho một ngày Gregorian hiện đại, làm sao xác định đúng Can Chi ngày cho engine xem ngày?

Cần tách hai khái niệm:

1. nhãn Can Chi của một ngày dân sự;
2. chuyển một instant sang ngày dân sự trong timezone đang xem.

## Kết luận

Engine calendar dùng một **ngày dân sự Gregorian** làm input cho Can Chi ngày.

Contract khái niệm:

```ts
type NgayDanSu = string; // YYYY-MM-DD

function tinhCanChiNgay(ngay: NgayDanSu): CanChi;
```

Nếu caller bắt đầu từ một instant, caller phải:

1. chuyển instant sang IANA timezone cần dùng;
2. lấy local civil date YYYY-MM-DD;
3. truyền ngày dân sự đó vào phép tính Can Chi.

Không dùng JS `Date` hoặc UTC midnight làm semantic input của hàm Can Chi ngày.

## Mốc vòng 60 ngày

GB/T 33661-2017 mục 6.3.2 quy định:

- Can Chi ngày chạy tuần tự từ Giáp Tý, Ất Sửu ... đến Quý Hợi;
- 60 ngày một vòng;
- ngày Gregorian 1949-10-01 theo lịch ngày Bắc Kinh là ngày Giáp Tý.

Do đó dùng:

```text
epochDate = 1949-10-01
epochIndex = 0 // GIAP_TY

index = floorMod(daysBetween(epochDate, targetDate), 60)
canIndex = index % 10
chiIndex = index % 12
```

`daysBetween` là số ngày lịch Gregorian giữa hai **civil date**, không phải số millisecond giữa hai local midnight.

## Nguồn kỹ thuật

### GB/T 33661-2017

Bản ghi chính thức SAMR xác nhận tiêu chuẩn `农历的编算和颁行 / Calculation and promulgation of the Chinese calendar` đang hiện hành.

Nội dung đã đối chiếu:

- 3.17: “ngày âm lịch/Chinese calendar day” theo chuẩn là khoảng 00:00 đến 24:00 giờ Bắc Kinh;
- 3.29: vòng 60 Can Chi;
- 6.3.2: mốc 1949-10-01 = Giáp Tý;
- Phụ lục C: thứ tự đầy đủ 60 Can Chi.

Nguồn:

- https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=E107EA4DE9725EDF819F33C60A44B296

## Cross-check độc lập với Hong Kong Observatory

HKO Almanac 2026 công bố nhãn Can Chi cho từng ngày.

Dùng epoch 1949-10-01 = Giáp Tý và phép chênh ngày Gregorian:

| Ngày       | days mod 60 | Kết quả từ epoch | HKO       |
| ---------- | ----------: | ---------------- | --------- |
| 2026-01-01 |          11 | Ất Hợi           | Ất Hợi    |
| 2026-01-10 |          20 | Giáp Thân        | Giáp Thân |
| 2026-01-31 |          41 | Ất Tỵ            | Ất Tỵ     |

HKO tháng 1/2026 cũng cho thấy mỗi ngày tiến đúng một bước:

- 01/01: Ất Hợi;
- 02/01: Bính Tý;
- 03/01: Đinh Sửu;
- ...
- 31/01: Ất Tỵ.

Nguồn:

- https://www.hko.gov.hk/en/gts/astron2026/files/2026cal01.pdf

## Day-boundary contract của project

### Điều source hỗ trợ trực tiếp

GB/T định nghĩa “Chinese calendar day” theo giờ Bắc Kinh từ 00:00 đến 24:00.

Điều này xác nhận rằng một hệ lịch chính thức hiện đại có thể và thực tế dùng boundary civil midnight, không mặc định đổi Can Chi ngày lúc 23:00.

### Quyết định sản phẩm

Project này là engine chọn **ngày dân sự**, không phải engine Bát Tự/Tứ Trụ.

Vì vậy:

- Can Chi ngày của date selection đổi ở local civil midnight;
- khi user chọn `2026-01-01`, kết quả Can Chi ngày là của nhãn ngày dân sự đó;
- không đưa quy ước “giờ Tý đổi ngày” vào calendar core;
- nếu sau này có module Bát Tự dùng convention khác, phải là contract/module/ADR riêng.

Đây là quyết định kiến trúc của project, không được mô tả như một câu nguyên văn của Hiệp Kỷ Biện Phương Thư.

## Timezone

Hàm `tinhCanChiNgay` không cần timezone nếu input đã là `NgayDanSu`.

Timezone chỉ cần khi:

- input ban đầu là instant;
- cần xác định local civil date;
- cần so instant với giao tiết để xác định chi tháng.

Ví dụ:

- cùng một UTC instant có thể thuộc 2 ngày dân sự khác nhau ở 2 timezone;
- sau khi đã lấy ngày dân sự, Can Chi được tính từ date label theo epoch.

## Gregorian convention

Implementation phải dùng Gregorian civil-date arithmetic rõ ràng.

Không:

- chia `milliseconds / 86400000` trên local `Date`;
- dựa vào timezone của server;
- parse `YYYY-MM-DD` bằng API có thể tự gắn UTC rồi dùng local getter.

Có thể:

- dùng một PlainDate representation;
- hoặc dùng thuật toán Gregorian -> ordinal/JDN chỉ cho civil date;
- hoặc dùng Temporal/polyfill nếu project quyết định thêm dependency.

Việc chọn helper/library cụ thể là implementation detail miễn test chứng minh đúng.

## Scope lịch sử

Mốc chuẩn là năm 1949 và oracle HKO là hiện đại.

MVP không tuyên bố xử lý lịch sử chuyển đổi Julian/Gregorian theo từng quốc gia.

Nếu hỗ trợ ngày lịch sử sâu trước khi Gregorian được dùng rộng rãi, phải có ADR riêng về calendar system/proleptic Gregorian.

## Test bắt buộc

### Epoch

- 1949-10-01 -> GIAP_TY.
- 1949-10-02 -> AT_SUU.
- 1949-09-30 -> QUY_HOI.

### HKO oracle

Ít nhất:

- 2026-01-01 -> AT_HOI.
- 2026-01-10 -> GIAP_THAN.
- 2026-01-31 -> AT_TI.

Nên lưu toàn bộ tháng 1/2026 làm fixture độc lập.

### Properties

- target + 1 civil day -> index + 1 mod 60.
- target + 60 civil days -> cùng Can Chi.
- leap day không tạo bước nhảy đặc biệt.

### Timezone edge

Nếu API nhận instant:

- cùng instant có thể map sang ngày khác nhau theo IANA timezone;
- sau khi map sang ngày dân sự, hàm Can Chi phải deterministic và không biết timezone.

## Những gì không được suy ra

- Không suy ra Can Chi giờ từ note này.
- Không suy ra Can Chi năm đổi ở Lập Xuân từ note này.
- Không suy ra “23:00 đổi ngày” từ các trường phái Bát Tự.
- Không dùng epoch khác nếu không có ADR/source chứng minh.

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
