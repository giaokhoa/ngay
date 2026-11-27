# Research: Vòng 60 Can Chi

Status: COMPARED

## Câu hỏi cần trả lời

1. Thứ tự 60 Can Chi trong engine là gì?
2. Làm sao đổi một ngày dương lịch hiện đại sang Can Chi ngày?

Hai câu này phải tách riêng.

## Bản Việt

Nguồn:

- Hiệp Kỷ Biện Phương Thư, Tập 2.
- Quyển 20, Nguyệt biểu.
- PDF 314 / trang in 313 bắt đầu bảng ngày tháng Giêng với Giáp Tý, Ất Sửu, Bính Dần, Đinh Mão...
- Các trang tiếp tục chạy đủ vòng 60 Can Chi.

## Hán bản

Nguồn:

- 欽定協紀辨方書, 卷二十, 月表一.
- https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B720

Bảng đi theo thứ tự 甲子, 乙丑, 丙寅... và kết thúc vòng ở 癸亥.

## Đối chiếu

Hai bản thống nhất về thứ tự vòng: Can tăng tuần tự theo modulo 10, Chi tăng tuần tự theo modulo 12; cặp hợp lệ lặp lại sau 60 bước.

## Logic đã đủ chắc

Có thể biểu diễn một Can Chi theo index 0..59 và suy:

- canIndex = index % 10;
- chiIndex = index % 12.

Điều này đủ để:

- tạo danh sách 60 Can Chi;
- tăng/giảm một số ngày khi đã có một mốc Can Chi ngày đáng tin cậy.

## Phần CHƯA được source này cung cấp

Sách không cho một công thức lập trình hiện đại kiểu Gregorian Date -> Julian Day -> Can Chi ngày với epoch/mốc số cụ thể.

Vì vậy chưa được phép tự chọn một hằng số epoch từ trí nhớ.

Cần task kỹ thuật riêng để:

- chọn thuật toán chuyển Gregorian/Julian Day;
- chọn mốc Can Chi ngày từ nguồn lịch pháp đáng tin;
- kiểm thử nhiều ngày độc lập.

## Oracle / fixture

Nguyệt biểu có thể kiểm:

- thứ tự 60 Can Chi;
- quan hệ giữa Chi ngày và 12 trực;
- thần sát theo từng Can Chi.

Nhưng Nguyệt biểu không gắn mỗi hàng vào một ngày Gregorian cụ thể, nên không phải oracle đủ cho epoch Gregorian -> Can Chi.

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [ ] VERIFIED cho Gregorian -> Can Chi ngày
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
