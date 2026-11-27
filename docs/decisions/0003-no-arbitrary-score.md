# ADR 0003: No Arbitrary Scoring as Source of Truth

Status: Accepted

## Quyết định

Engine không dùng một điểm số tự đặt để thay thế quy tắc Dụng sự/Nghi kị.

Có thể có ranking hoặc presentation score trong tương lai, nhưng:

- phải tách khỏi kết luận nghiệp vụ;
- phải ghi rõ là chỉ số của hệ thống;
- không được làm mất ngoại lệ/hard prohibition;
- cần ADR mới trước khi triển khai.

## Lý do

Nguồn mô tả quan hệ theo công việc, cát/hung và ngoại lệ. Đếm số thần tốt trừ số thần xấu là representation quá thô và dễ sai.
