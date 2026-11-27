# Research: Tính thời điểm tiết khí

Status: VERIFIED

## Câu hỏi cần trả lời

Làm sao tính chính xác instant của 24 tiết khí cho một năm hiện đại để xác định boundary theo timezone?

## Kết luận

Dùng `astronomy-engine` và hàm `SearchSunLongitude` để tìm instant mà tâm Mặt Trời đạt địa tâm thị hoàng kinh tương ứng với tiết khí.

Engine phải:

1. tính instant theo UTC;
2. chỉ sau đó chuyển instant sang timezone IANA của ngữ cảnh đang xem;
3. so sánh instant thật, không rút gọn tiết khí thành một ngày dương cố định.

## Định nghĩa thiên văn

GB/T 33661-2017, mục 3.8 định nghĩa địa tâm thị hoàng kinh là góc hoàng kinh tính từ chân xuân phân trên thiên cầu địa tâm.

Mục 3.13 định nghĩa 24 tiết khí là 24 thời điểm trong một hồi quy niên mà địa tâm thị hoàng kinh của Mặt Trời bằng bội số nguyên của 15 độ.

Mục 5.1 yêu cầu vị trí Mặt Trời/Mặt Trăng theo mô hình của IERS Conventions; mục 5.2 yêu cầu thời điểm sóc và tiết khí tính theo giờ Bắc Kinh đạt độ chính xác 1 giây.

Trang trạng thái chính thức của SAMR xác nhận GB/T 33661-2017 hiện vẫn là tiêu chuẩn hiện hành.

Nguồn:

- https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=E107EA4DE9725EDF819F33C60A44B296
- Bản PDF GB/T 33661-2017 đã đối chiếu cho các mục 3.8, 3.13, 5.1, 5.2 và phụ lục A.

## Mapping 24 tiết khí -> hoàng kinh

| Tiết khí    |  Độ |
| ----------- | --: |
| Xuân Phân   |   0 |
| Thanh Minh  |  15 |
| Cốc Vũ      |  30 |
| Lập Hạ      |  45 |
| Tiểu Mãn    |  60 |
| Mang Chủng  |  75 |
| Hạ Chí      |  90 |
| Tiểu Thử    | 105 |
| Đại Thử     | 120 |
| Lập Thu     | 135 |
| Xử Thử      | 150 |
| Bạch Lộ     | 165 |
| Thu Phân    | 180 |
| Hàn Lộ      | 195 |
| Sương Giáng | 210 |
| Lập Đông    | 225 |
| Tiểu Tuyết  | 240 |
| Đại Tuyết   | 255 |
| Đông Chí    | 270 |
| Tiểu Hàn    | 285 |
| Đại Hàn     | 300 |
| Lập Xuân    | 315 |
| Vũ Thủy     | 330 |
| Kinh Trập   | 345 |

Mapping này khớp phụ lục A của GB/T 33661-2017 và bảng giải thích 24 tiết khí của Hong Kong Observatory.

## 12 boundary dùng cho tháng thần sát

Theo research `solar-term-month-boundary.md`, chỉ 12 “tiết” sau mở tháng:

| Tiết       |  Độ | Chi tháng |
| ---------- | --: | --------- |
| Lập Xuân   | 315 | Dần       |
| Kinh Trập  | 345 | Mão       |
| Thanh Minh |  15 | Thìn      |
| Lập Hạ     |  45 | Tỵ        |
| Mang Chủng |  75 | Ngọ       |
| Tiểu Thử   | 105 | Mùi       |
| Lập Thu    | 135 | Thân      |
| Bạch Lộ    | 165 | Dậu       |
| Hàn Lộ     | 195 | Tuất      |
| Lập Đông   | 225 | Hợi       |
| Đại Tuyết  | 255 | Tý        |
| Tiểu Hàn   | 285 | Sửu       |

## Library

Đề xuất chấp nhận:

- package: `astronomy-engine`;
- API: `SearchSunLongitude(targetLon, startTime, limitDays)`.

Documentation của Astronomy Engine mô tả hàm này tìm thời điểm tâm Mặt Trời đạt apparent ecliptic longitude quan sát từ tâm Trái Đất, theo true ecliptic/equinox of date.

Điều này phù hợp trực tiếp với định nghĩa địa tâm thị hoàng kinh dùng để định nghĩa tiết khí.

Không tự implement VSOP/precession/nutation trong project nếu không có nhu cầu đặc biệt.

## Đối chiếu độc lập với HKO 2026

Hong Kong Observatory công bố thời điểm 24 tiết khí theo HKT (UTC+8) và nói dữ liệu thiên văn dựa trên HM Nautical Almanac Office, UK và United States Naval Observatory.

Đã chạy `astronomy-engine@2.1.19` cho đủ 24 tiết năm 2026. Kết quả khi chuyển UTC -> HKT và làm tròn đến phút khớp bảng HKO cho cả 24 tiết.

Một số checkpoint:

| Tiết       | Astronomy Engine HKT | HKO HKT     |
| ---------- | -------------------- | ----------- |
| Tiểu Hàn   | 2026-01-05 16:23:03  | 05/01 16:23 |
| Lập Xuân   | 2026-02-04 04:01:54  | 04/02 04:02 |
| Kinh Trập  | 2026-03-05 21:58:43  | 05/03 21:59 |
| Thanh Minh | 2026-04-05 02:39:59  | 05/04 02:40 |
| Mang Chủng | 2026-06-05 23:48:59  | 05/06 23:49 |
| Lập Thu    | 2026-08-07 19:42:56  | 07/08 19:43 |
| Hàn Lộ     | 2026-10-08 14:29:58  | 08/10 14:29 |
| Đại Tuyết  | 2026-12-07 10:52:47  | 07/12 10:53 |
| Đông Chí   | 2026-12-22 04:50:22  | 22/12 04:50 |

Sai khác hiển thị chỉ nằm trong phần giây vì HKO công bố đến phút.

Nguồn HKO:

- https://www.hko.gov.hk/en/gts/astronomy/Solar_Term.htm
- https://www.hko.gov.hk/en/gts/astron2026/almanac2026_index.htm

## Timezone contract

Astronomical event là một instant toàn cầu.

Không tính tiết khí “theo múi giờ” bằng cách thay input longitude hoặc dùng ngày địa phương.

Quy trình đúng:

```text
solar longitude event
        ↓
UTC instant
        ↓
convert to requested IANA timezone
        ↓
determine which side of boundary the evaluated instant lies on
```

Timezone chỉ quyết định cách instant được biểu diễn và local civil context; không thay đổi instant thiên văn.

## Search window

Mỗi target longitude chỉ nên tìm trong window hẹp quanh thời điểm dự kiến. Astronomy Engine khuyến nghị window nhỏ hơn 10 ngày nếu có thể.

Implementation nên có seed/window deterministic theo tháng thay vì search cả năm trong một lần gọi.

## Test bắt buộc

### Oracle

Lưu fixture HKO độc lập, ít nhất:

- 12 tiết mở tháng cho năm 2026;
- tốt hơn: đủ 24 tiết 2026.

So sánh instant với tolerance phù hợp. Vì HKO công bố đến phút, test HKO không thể chứng minh sai số giây; nó là independent minute-level oracle.

### Boundary

Với mỗi tiết mở tháng:

- `instant - 1ms`: còn chi tháng cũ;
- `instant`: sang chi tháng mới;
- `instant + 1ms`: chi tháng mới.

### Timezone

Ít nhất:

- Asia/Ho_Chi_Minh;
- UTC;
- một timezone âm UTC để đảm bảo code không dùng local date của runner.

GitHub runner timezone không được ảnh hưởng kết quả.

## Giới hạn xác minh

GB/T đặt yêu cầu 1 giây cho lịch Trung Quốc chính thức. Cross-check hiện tại của project với HKO chỉ ở độ phân giải phút.

Vì vậy project có thể dùng Astronomy Engine cho boundary computation, nhưng không được tuyên bố rằng implementation của project đạt chứng nhận/độ chính xác 1 giây theo GB/T chỉ từ test HKO này.

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
