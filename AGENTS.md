# AGENTS.md

Tài liệu này là hướng dẫn bắt buộc cho mọi Agent làm việc trong repository này.

## Mục tiêu

Xây dựng ứng dụng xem ngày tốt/xấu dựa trên hệ thống quy tắc của Hiệp Kỷ Biện Phương Thư, ưu tiên tính đúng, truy được nguồn và kiểm chứng được bằng test.

## Trước khi sửa code

1. Đọc README.md.
2. Đọc docs/architecture.md.
3. Đọc docs/source-policy.md.
4. Đọc docs/research-workflow.md nếu task liên quan công thức, thần sát, nghi kị hoặc dụng sự.
5. Đọc docs/testing.md trước khi thêm logic.
6. Kiểm tra docs/decisions/ để không mở lại quyết định đã chốt nếu không có lý do mới.

## Quy ước đặt tên

- Folder và filename: English, kebab-case.
- Class, type, interface, enum, function, biến và hằng nghiệp vụ do project định nghĩa: tiếng Việt không dấu.
- Suffix framework giữ nguyên tiếng Anh: Service, Controller, Module, Repository, Dto, Entity, Guard, Pipe, Interceptor.
- Symbol/API của thư viện bên thứ ba giữ nguyên tên gốc.
- Text hiển thị: tiếng Việt có dấu.
- Hán văn chỉ nằm trong dữ liệu nguồn, audit hoặc tài liệu nghiên cứu.

Ví dụ:

- file: apps/api/src/calendar/calendar.service.ts
- class: TinhLichService
- function: tinhThongTinNgay
- enum: ThienCan
- enum value: GIAP

## Luật nguồn

Không được thêm quy tắc xem ngày chỉ từ trí nhớ, kiến thức phổ thông, blog, lịch vạn niên hoặc suy đoán.

Mọi quy tắc nghiệp vụ phải có ít nhất một tham chiếu nguồn đã kiểm tra. Với quy tắc quan trọng hoặc chỗ dịch mơ hồ, phải đối chiếu bản Việt và Hán bản theo docs/source-policy.md.

Nếu source chưa đủ:

- không bịa;
- không tự hòa giải mâu thuẫn;
- ghi rõ điểm chưa xác minh;
- tách task research trước task implementation.

## Luật thuật toán

- Không coi một ngày là tốt/xấu tuyệt đối nếu rule gốc phụ thuộc công việc.
- Không đưa điểm số tùy ý vào engine để thay thế quy tắc cát/hung.
- Không cộng/trừ số lượng thần sát một cách cơ học nếu nguồn không quy định như vậy.
- Các ngoại lệ và quy tắc phối hợp phải được biểu diễn rõ, có test riêng.
- Calculation primitive có thể viết bằng code; knowledge/rule nên data-driven khi phù hợp.
- Không trộn trường phái hoặc nguồn khác vào engine mà không có quyết định kiến trúc được duyệt.

## Luật test

- GitHub Actions là nguồn kiểm chứng chuẩn.
- Mọi thay đổi logic phải có test.
- Ưu tiên fixture/oracle lấy từ bảng trong sách thay vì test tự suy ra từ implementation.
- Không sửa expected chỉ để làm CI xanh nếu chưa kiểm tra lại nguồn.
- Không merge khi CI đỏ.

## Phạm vi module

- calendar: lịch pháp nền, không kết luận tốt/xấu.
- factors: sinh thần sát/yếu tố từ dữ liệu lịch pháp.
- activities: quy tắc Dụng sự theo công việc.
- evaluation: Nghi kị, ngoại lệ, phối hợp cát/hung và kết luận nội bộ.
- date-selection: orchestration/API, không chứa công thức nghiệp vụ lõi.

Không đặt logic ở module khác chỉ để đi nhanh.

## Khi hoàn thành một task

PR/commit phải nêu:

- thay đổi gì;
- nguồn nào hỗ trợ;
- test nào chứng minh;
- còn điểm nào chưa chắc;
- CI run tương ứng.

Nếu thay đổi kiến trúc hoặc convention, thêm ADR trong docs/decisions/.
