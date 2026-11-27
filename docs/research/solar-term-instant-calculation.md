# Research: Tính thời điểm tiết khí

Status: TODO

## Câu hỏi cần trả lời

Làm sao tính chính xác instant của 24 tiết khí cho một năm hiện đại để xác định boundary theo timezone?

## Vì sao tách khỏi rule sách

Hiệp Kỷ Biện Phương Thư xác định rõ tháng theo tiết khí, nhưng không cung cấp API/công thức số hiện đại phù hợp trực tiếp với Date/UTC.

Đây là bài toán kỹ thuật thiên văn/lịch pháp.

## Yêu cầu trước khi VERIFIED

Cần chọn một nguồn kỹ thuật đủ tin cậy cho:

- solar longitude;
- time scale;
- sai số chấp nhận;
- chuyển UTC/timezone.

Cần so kết quả với một nguồn lịch/ephemeris độc lập cho nhiều năm.

## Không được làm

- hard-code ngày dương cố định cho tiết khí;
- giả định tiết khí đổi lúc 00:00 local;
- dùng công thức blog không rõ sai số;
- trộn timezone của server vào domain.

## Test bắt buộc

- test instant cho nhiều năm;
- test boundary ngay trước/sau giao tiết;
- test ít nhất timezone Asia/Ho_Chi_Minh;
- test không phụ thuộc timezone mặc định của GitHub runner.

## Trạng thái

- [ ] LOCATED
- [ ] COMPARED
- [ ] VERIFIED
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
