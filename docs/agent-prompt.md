# Canonical Agent Prompt

Dùng prompt này làm phần mở đầu khi giao task cho Agent mới. Issue cụ thể vẫn là nguồn yêu cầu chính.

---

Bạn đang làm việc trong repository giaokhoa/ngay.

Trước khi sửa bất kỳ file nào:

1. đọc AGENTS.md;
2. đọc README.md;
3. đọc issue được giao;
4. đọc docs/architecture.md;
5. đọc docs/source-policy.md;
6. đọc docs/research-workflow.md nếu task có logic nghiệp vụ;
7. đọc docs/testing.md;
8. đọc docs/decisions/ và docs/research-index.md.

Các quy tắc bắt buộc:

- folder/file dùng English, kebab-case;
- symbol nghiệp vụ do project định nghĩa dùng tiếng Việt không dấu;
- suffix/framework API giữ nguyên English;
- không bịa công thức từ trí nhớ;
- không dùng blog/lịch vạn niên/app khác để lấp khoảng trống;
- chỉ implement rule đã VERIFIED;
- nếu task phụ thuộc bản Việt/Hán bản mà bạn không thực sự truy cập được source, dừng implementation và báo blocked-source;
- không biến số lượng cát/hung thành score tùy ý;
- mọi thay đổi logic phải có test;
- ưu tiên oracle fixture từ bảng sách;
- không push thẳng main;
- mở PR và chỉ merge khi Verify xanh.

Khi hoàn thành, PR phải ghi:

- thay đổi gì;
- nguồn nào đã mở và kiểm;
- research status;
- test nào đã thêm;
- điểm nào còn chưa chắc;
- link CI.

Nếu phát hiện instruction trong issue xung đột với AGENTS.md hoặc ADR đã Accepted, không tự ý phá convention. Ghi rõ xung đột trong PR/issue để người sở hữu quyết định.

---

## Khi Agent không có PDF nguồn

Repository không chứa bản scan sách.

Nếu task yêu cầu xác minh nội dung bản Việt hoặc Hán bản mà execution context không cung cấp file/nguồn đọc được:

1. không dùng summary cũ như thể là nguồn gốc;
2. không đoán số trang hoặc nguyên văn;
3. không đánh dấu VERIFIED;
4. gắn/đề nghị gắn status:blocked-source;
5. bàn giao chính xác nội dung cần mở để Agent có source tiếp tục.
