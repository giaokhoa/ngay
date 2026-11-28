# Tương chủ và chọn giờ — source lock nội bộ

Tài liệu này chỉ phục vụ research/test. Không đưa số quyển, page anchor hay mã nghiên cứu ra consumer UI.

## Tương chủ

Hán bản pin: Kanripo KR3g0051 / WYG.

Anchor: `KR3g0051_WYG_032-32b`.

Nội dung quyết định:

- cổ pháp luận **sinh niên**, không luận sinh nhật;
- sửa/tu tạo lấy mệnh chủ nhà;
- an táng lấy sinh niên người mất;
- tứ trụ thời điểm chọn không nên xung/khắc mệnh.

Anchor: `KR3g0051_WYG_032-35a..35b`.

Thứ tự nặng nhẹ khi Chi thời điểm chọn xung năm sinh:

1. năm thực hiện;
2. tháng;
3. ngày;
4. giờ nhẹ hơn.

Nếu Can của trụ còn khắc Can năm sinh thì thành thiên khắc địa xung.

### Product policy

- consumer nhập năm sinh;
- checkbox “sinh trước Lập Xuân” để dùng năm Can-Chi trước;
- không yêu cầu ngày/giờ sinh chỉ để dựng Bát Tự;
- cưới hỏi hiện xét năm sinh của cả hai người;
- động thổ/sửa nhà lấy chủ nhà;
- an táng lấy người mất;
- di chuyển/khai trương/xuất hành lấy người chủ sự.

## Chọn giờ

Hán source:

- `KR3g0051_WYG_031-1a..2a`: 日表, 六十日時辰定局;
- `KR3g0051_WYG_033-43b..45b`: 用時法.

Policy được encode:

### Thuận

- giờ cùng Chi với ngày (時建 / trợ ngày);
- lục hợp với ngày;
- tam hợp với ngày;
- Lộc của Can ngày đến giờ;
- Dịch Mã của ngày đến giờ.

### Tránh

- giờ phá ngày;
- giờ hình ngày;
- Ngũ Bất Ngộ: Can giờ khắc Can ngày;
- giờ xung Chi năm thực hiện;
- giờ xung Chi tháng tiết khí;
- giờ xung năm sinh người liên quan.

Không gọi chung tất cả các giờ trên là “hoàng đạo”. Đây là lớp chọn giờ theo quan hệ với ngày/mệnh.

## Hán source vectors

`selected-hour.spec.ts` kiểm trực tiếp các dòng đầu của bảng 60 ngày:

### Giáp Tý

- Tý: Nhật Kiến;
- Dần: Nhật Lộc + Nhật Mã;
- Mão: Nhật Hình;
- Ngọ: Nhật Phá + Ngũ Bất Ngộ.

### Ất Sửu

- Mão: Nhật Lộc;
- Tỵ: Ngũ Bất Ngộ;
- Mùi: Nhật Phá;
- Tuất: Nhật Hình.

Các vector này độc lập với UI và evaluator ngày.

## Chưa claim

Chưa claim full toàn bộ hệ giờ của sách:

- Thiên Ất Quý Nhân;
- Quý Đăng Thiên Môn;
- Tứ Đại Cát Thời;
- Kỳ Môn;
- các bảng thiên tinh/phương hướng.

Chúng phải có phase research/oracle riêng trước khi đưa vào product.
