# Research Workflow

## Mục tiêu

Biến nội dung sách thành quy tắc có thể chạy và kiểm thử, không biến project thành bản chép lại sách.

## Một đơn vị research

Mỗi rule hoặc nhóm rule phải trả lời được 6 câu:

1. Nó được gọi là gì?
2. Điều kiện xuất hiện là gì?
3. Nó áp dụng cho công việc nào?
4. Tác động là nghi, kị, điều kiện hay ngoại lệ?
5. Khi gặp yếu tố khác thì kết quả có đổi không?
6. Có bảng/oracle nào trong sách dùng để kiểm tra implementation không?

## Trình tự

### 1. Xác định vị trí

Tìm đúng quyển/mục trong bản Việt.

Nếu cần, dùng Hán bản/Wikisource để locate nguyên văn tương ứng.

### 2. Trích logic, không chép văn

Tạo note ngắn:

- input;
- condition;
- output;
- exceptions;
- source reference.

### 3. Đối chiếu hai bản

Nếu bản dịch Việt rõ và Hán bản xác nhận, đánh dấu VERIFIED.

Nếu có khác biệt, ghi OPEN_QUESTION và chưa implement kết luận đoán.

### 4. Thiết kế representation

Chọn một trong:

- công thức;
- lookup table;
- set Can Chi;
- rule theo công việc;
- rule phối hợp;
- custom evaluator.

Không ép tất cả vào một kiểu calculator.

### 5. Tìm oracle

Ưu tiên các bảng Niên biểu/Nguyệt biểu/Nhật biểu hoặc ví dụ trực tiếp trong sách làm fixture.

### 6. Implement + test

Implementation và test phải cùng PR với source note hoặc source reference.

## Trạng thái research

- TODO: chưa đọc.
- LOCATED: đã tìm vị trí.
- COMPARED: đã so Việt/Hán.
- VERIFIED: logic đủ chắc để implement.
- IMPLEMENTED: đã có code.
- ORACLE_TESTED: đã kiểm bằng bảng/fixture độc lập.

Chỉ VERIFIED trở lên mới được dùng làm logic production.

## Giải thích cho UI

Không dịch văn ngôn từng chữ.

Viết theo mẫu:

- yếu tố là gì;
- vì sao nó xuất hiện trong ngày này;
- ảnh hưởng gì tới việc đang xem;
- có yếu tố nào làm thay đổi tác động không.

Ngắn, dễ đọc, không thêm khẳng định mà source không hỗ trợ.
