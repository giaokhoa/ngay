# Agent Handoff

Tài liệu này mô tả cách một Agent bàn giao công việc để Agent kế tiếp không phải dựng lại ngữ cảnh từ chat.

## Trước khi bắt đầu

Agent phải:

1. đọc AGENTS.md;
2. đọc issue được giao;
3. đọc các ADR liên quan;
4. đọc research note liên quan;
5. kiểm tra trạng thái CI của main.

## Trong khi làm

Nếu task là research:

- cập nhật docs/research/;
- cập nhật docs/research-index.md;
- không viết production logic cho phần chưa VERIFIED.

Nếu task là implementation:

- chỉ dùng rule đã VERIFIED;
- thêm test cùng thay đổi;
- giữ module boundary;
- mở PR, không push trực tiếp main.

## Bàn giao

PR body phải có:

- vấn đề đã xử lý;
- file chính đã thay đổi;
- nguồn đã dùng;
- research status;
- test đã thêm;
- câu hỏi mở;
- link CI run.

## Khi bị chặn

Không tự giải quyết bằng phỏng đoán.

Tạo hoặc cập nhật issue với label status:blocked-source và mô tả:

- điểm chưa rõ;
- nguồn đã kiểm;
- điều cần xác minh tiếp.

## Definition of Done

Một task implementation chỉ Done khi:

- code đúng boundary;
- source provenance có;
- test có;
- docs/research-index.md cập nhật;
- PR merge được;
- CI Verify xanh.
