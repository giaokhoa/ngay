# ADR 0009: Production Runtime Baseline

Status: Accepted

## Bối cảnh

Sau Phase 5, API đã có đầy đủ các vertical ưu tiên nhưng bootstrap production vẫn
chỉ đọc `PORT` bằng `Number(...)` rồi `listen`.

Repo hiện:

- chưa có external database/cache;
- web gọi API bằng relative path `/date-selection/...`;
- không có nhu cầu CORS cross-origin đã được chốt;
- health chỉ có `/health`;
- chưa bật lifecycle shutdown hook.

Phase 6 phải harden theo gap thật, không thêm persistence/cache hoặc hạ tầng
không có nhu cầu đo được.

## Quyết định

### Runtime config

API đọc:

- `PORT`: mặc định `3000`, bắt buộc integer `1..65535` nếu được set;
- `HOST`: mặc định `0.0.0.0`, không chấp nhận giá trị rỗng hoặc có whitespace.

Invalid config fail trước khi tạo/listen application.

### Security headers

Dùng `app.useSecurityHeaders()` của NestJS 12.

Không thêm dependency Helmet riêng khi framework đã có primitive tương đương.

### Graceful shutdown

Production bootstrap gọi `app.enableShutdownHooks()` để Nest chạy lifecycle
shutdown khi process nhận signal hỗ trợ như SIGTERM/SIGINT.

Integration test có thể tắt hook để tránh tạo signal listeners không cần thiết
trong test runner.

### Health endpoints

Giữ backward compatibility:

- `GET /health`.

Thêm semantic endpoints:

- `GET /health/live`: process HTTP đang sống;
- `GET /health/ready`: process đã bootstrap và sẵn sàng phục vụ.

Hiện chưa có external dependency, nên readiness và liveness cùng trả
`{ "trangThai": "ok" }`.

Nếu sau này thêm database/cache/queue, readiness phải kiểm dependency cần thiết
trước khi được coi là production-ready; liveness không được biến thành dependency
probe.

### Same-origin và CORS

Không bật CORS trong baseline.

Web hiện dùng relative API URL, nên contract triển khai mặc định là same-origin
hoặc reverse proxy làm cho API xuất hiện cùng origin.

Nếu deployment sau này tách origin:

1. xác định exact allowed origins;
2. thêm config + test;
3. không dùng wildcard mặc định.

### Cache/persistence

Không thêm trong baseline.

Chỉ thêm khi có requirement dữ liệu hoặc benchmark chứng minh bottleneck.

## Validation

- unit test runtime config;
- HTTP integration test liveness/readiness;
- integration test baseline security headers và không có `X-Powered-By`;
- full CI.

## Hệ quả

- bootstrap có contract production explicit và fail-fast;
- deployment platform sau chỉ cần cung cấp `HOST`/`PORT`;
- security baseline không phụ thuộc package mới;
- future observability/deployment work có health endpoints ổn định để dùng.
