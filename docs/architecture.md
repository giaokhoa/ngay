# Architecture

## Mục tiêu kiến trúc

Tách rõ ba lớp:

1. Lịch pháp: tính dữ liệu khách quan của thời điểm.
2. Tri thức trạch cát: thần sát, Dụng sự, Nghi kị, ngoại lệ.
3. Ứng dụng: tìm ngày, API và giao diện.

Một module không được biết nhiều hơn trách nhiệm của nó.

## Backend boundaries

### calendar

Đầu vào: ngày/giờ, timezone và các tham số lịch pháp cần thiết.

Đầu ra dự kiến:

- Thiên Can, Địa Chi;
- Can Chi năm/tháng/ngày/giờ khi cần;
- tiết khí;
- tháng theo tiết khí;
- Thập Nhị Trực;
- các primitive lịch pháp khác đã được xác minh.

Không được:

- gắn nhãn ngày tốt/xấu;
- biết công việc cưới hỏi, động thổ, an táng;
- áp Nghi kị.

### factors

Nhận dữ liệu từ calendar và sinh các yếu tố có thể kiểm chứng như thần, sát, quan hệ hoặc ngày đặc biệt.

Không được:

- quyết định cuối cùng ngày tốt hay xấu;
- chứa rule UI;
- đọc request HTTP trực tiếp.

### activities

Biểu diễn Dụng sự: một công việc quan tâm đến yếu tố nào, nghi gì, kị gì và điều kiện liên quan.

Một yếu tố có thể có tác động khác nhau với các công việc khác nhau.

### evaluation

Áp dụng:

- quy tắc Nghi kị;
- mức mạnh/yếu nếu nguồn quy định;
- ngoại lệ;
- quy tắc phối hợp;
- điều kiện hóa giải;
- hard prohibition nếu có.

Đây là nơi tạo kết luận nội bộ. Không dùng score tùy ý làm nguồn chân lý.

### date-selection

Orchestration:

- nhận yêu cầu xem ngày;
- gọi calendar;
- gọi factors;
- lấy activity rules;
- gọi evaluation;
- trả DTO/API.

Không chứa bảng thần sát hay công thức Can Chi.

### knowledge

Optional PostgreSQL query/audit catalog:

- mirror Q10/Q11 rule identities;
- mirror target/condition JSONB;
- lưu provenance Việt/Hán dạng relational;
- phục vụ source viewer, research/admin query và audit.

Không được:

- thay arithmetic lịch pháp bằng SQL;
- thêm DB round-trip vào hot path xem ngày;
- trở thành canonical authoring store nếu chưa có migration/validation phase riêng.

Chi tiết: `docs/decisions/0010-postgres-knowledge-catalog.md`.

## Frontend

React Router chịu trách nhiệm:

- chọn công việc;
- chọn khoảng ngày;
- hiển thị danh sách;
- hiển thị lý do;
- hiển thị nguồn khi cần.

Frontend không tự tính cát/hung. Backend là nguồn kết quả nghiệp vụ.

## Dependency direction

date-selection -> calendar
date-selection -> factors
date-selection -> activities
date-selection -> evaluation
factors -> calendar domain types
evaluation -> activities/factors domain types
knowledge -> activities/evaluation/source data (mirror/query only)

Không cho calendar phụ thuộc ngược lên evaluation hoặc activities.
Knowledge không được trở thành dependency của date-selection hot path.

## Dữ liệu và code

Ưu tiên:

- công thức toán/lịch ổn định: code;
- bảng ánh xạ có nguồn: data/table;
- Dụng sự/Nghi kị/ngoại lệ: data-driven rule khi có thể;
- custom evaluator chỉ dùng khi rule không biểu diễn sạch bằng schema chung.

Mọi custom evaluator phải có source reference và test.
