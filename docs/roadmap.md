# Roadmap

Roadmap ưu tiên vertical slice có thể kiểm chứng, không nhập toàn bộ sách trước khi engine chạy.

## Phase 0 - Foundation

Mục tiêu:

- CI xanh;
- convention cố định;
- AGENTS.md;
- kiến trúc module;
- source/research/testing policy.

Exit criteria:

- Agent mới có thể đọc repo và biết cách làm việc mà không cần hỏi lại convention.

## Phase 1 - Calendar Foundation

Phạm vi:

- Thiên Can;
- Địa Chi;
- vòng 60 Can Chi;
- tiết khí;
- tháng theo tiết khí;
- Thập Nhị Trực.

Không làm:

- thần sát đầy đủ;
- đánh giá tốt/xấu.

Exit criteria:

- API/domain trả được dữ liệu lịch pháp xác định;
- boundary tests ở tiết khí;
- CI xanh.

## Phase 2 - Verified Factors

Chỉ implement các yếu tố đã VERIFIED qua research.

Ưu tiên yếu tố dùng chung cho nhiều công việc.

Exit criteria:

- factor registry có provenance;
- có oracle tests từ sách cho các bảng đã triển khai.

## Phase 3 - One Activity End-to-End

Chọn một công việc có nguồn đủ rõ.

Luồng:
date -> calendar -> factors -> activity rules -> evaluation -> API -> UI.

Exit criteria:

- một công việc chạy end-to-end;
- mọi kết luận có lý do;
- không có score tùy ý;
- có source reference.

## Phase 4 - Conflict and Exceptions

Mở rộng Quyển Nghi kị:

- phối hợp cát/hung;
- ngoại lệ;
- Đức/thần liên quan;
- hard prohibitions khi source quy định.

Exit criteria:

- rule phối hợp có test phân biệt;
- không dùng boolean hoặc score quá thô để thay thế ngoại lệ.

## Phase 5 - Activity Coverage

Mở rộng lần lượt các công việc trong Dụng sự.

Ưu tiên:

- cưới hỏi;
- chuyển nhà/nhập trạch;
- động thổ/sửa chữa;
- khai trương;
- xuất hành;
- an táng.

Danh sách cuối phải bám nguồn, không bám popularity.

## Phase 6 - Production Hardening

- persistence/cache khi thực sự cần;
- source viewer/admin research tooling;
- performance;
- observability;
- security;
- deployment.

## Nguyên tắc phase

Không nhảy phase bằng cách hard-code kết quả.

Nếu một phase bị chặn bởi source chưa rõ, mở research task thay vì đoán.
