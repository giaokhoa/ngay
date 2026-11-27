# ADR 0004: Solar Term Calculation

Status: Accepted

## Bối cảnh

Hiệp Kỷ Biện Phương Thư xác định tháng thần sát theo tiết khí. Engine cần một cách xác định instant giao tiết cho ngày hiện đại.

Tự viết mô hình thiên văn sẽ tăng rủi ro sai số và tạo một subsystem ngoài trọng tâm sản phẩm.

## Quyết định

Dùng package `astronomy-engine`, API `SearchSunLongitude`, để tìm instant Mặt Trời đạt hoàng kinh mục tiêu.

Implementation:

- tính event thành UTC instant;
- dùng target longitudes theo research đã VERIFIED;
- chuyển instant sang IANA timezone chỉ ở bước tạo local context;
- không hard-code ngày/giờ tiết khí theo lịch bảng.

Lockfile là nguồn pin version thực tế.

## Validation

Trước khi chấp nhận ADR:

- định nghĩa apparent geocentric solar longitude đã đối chiếu với GB/T 33661-2017;
- API semantics đã đối chiếu với docs Astronomy Engine;
- đủ 24 tiết năm 2026 đã cross-check với Hong Kong Observatory và khớp khi làm tròn đến phút.

Chi tiết: `docs/research/solar-term-instant-calculation.md`.

## Hệ quả

### Tích cực

- Không tự duy trì thuật toán thiên văn phức tạp.
- Có oracle độc lập từ HKO.
- Boundary có thể test ở mức instant.

### Rủi ro

- Dependency bên ngoài trở thành thành phần critical của calendar core.
- Update dependency phải chạy lại oracle fixtures.
- HKO fixture đến phút không xác minh precision cấp giây.

## Guardrail

Không upgrade major/minor của dependency rồi cập nhật fixture theo output mới một cách cơ học.

Nếu output thay đổi đáng kể:

1. kiểm HKO/ephemeris độc lập;
2. xác định nguyên nhân;
3. cập nhật ADR/research nếu semantics thay đổi.
