# Research: Ngày dương lịch -> Can Chi ngày

Status: TODO

## Câu hỏi cần trả lời

Cho một instant/ngày Gregorian và timezone, làm sao xác định đúng Can Chi ngày?

## Điều đã biết từ source sách

Vòng 60 Can Chi và thứ tự của nó đã được xác nhận trong Nguyệt biểu.

## Điều chưa có

Cần một epoch/mốc tuyệt đối đáng tin cậy nối lịch Gregorian/Julian Day với index 0..59.

Không được lấy hằng số từ trí nhớ hoặc copy code không rõ nguồn.

## Yêu cầu research

- chọn Julian Day convention rõ ràng;
- xác định ngày đổi Can Chi theo timezone/domain convention;
- lấy ít nhất một nguồn lịch pháp/astronomical đáng tin cậy cho epoch hoặc bảng đối chiếu;
- cross-check nhiều ngày cách xa nhau;
- ghi rõ xử lý trước/sau 00:00 và nếu có vấn đề “đổi ngày từ giờ Tý” thì phải xác minh riêng, không tự giả định.

## Test bắt buộc

- nhiều ngày độc lập;
- boundary timezone;
- leap year không được ảnh hưởng sai;
- property: tăng 1 civil day -> tăng Can Chi 1 bước nếu convention boundary đã cố định.

## Trạng thái

- [ ] LOCATED
- [ ] COMPARED
- [ ] VERIFIED
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
