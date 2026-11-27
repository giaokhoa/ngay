# ADR 0011: Production Edge and Observability

Status: Accepted

## Bối cảnh

Sau ADR 0010, ứng dụng có API production runtime và PostgreSQL knowledge catalog nhưng:

- web production vẫn chỉ có Vite build artifact, chưa có server runtime;
- same-origin chỉ được mô phỏng bằng Vite dev proxy;
- chưa có correlation ID / access log / metrics;
- chưa có deployment topology được CI build.

## Quyết định

### Web production edge

Dùng một Node HTTP server nhỏ trong `apps/web/server.mjs`.

Nó:

- serve `dist/`;
- SPA fallback về `index.html`;
- cache hashed assets immutable;
- không cache `index.html`;
- proxy same-origin cho `/date-selection`, `/knowledge`, `/health`;
- propagate `X-Request-Id`;
- thêm web security headers.

Không thêm Express/Nginx dependency riêng cho edge vì requirement hiện tại nhỏ và có thể test
trực tiếp bằng Node runtime đang là production dependency của container.

### Metrics private

`GET /metrics` tồn tại ở API nhưng production web edge trả 404 cho path này.

Production compose chỉ publish web port. Monitoring scrape `api:3000/metrics` trong private
container network.

Lý do: metrics là operational surface, không phải public product API.

### Request correlation

Web edge:

- dùng incoming `X-Request-Id` nếu là token an toàn tối đa 128 ký tự;
- nếu không thì sinh UUID;
- forward ID sang API.

API dùng cùng policy và trả `X-Request-Id`.

### Access logging

API ghi một JSON object cho mỗi HTTP request:

- event;
- requestId;
- method;
- route pattern;
- statusCode;
- durationMs.

Không log raw query string trong access event để tránh accidental data leakage và metric
cardinality.

### Metrics

API giữ low-cardinality in-memory counters và duration sums rồi xuất Prometheus text format.

Labels:

- method;
- route;
- status class (2xx/4xx/5xx).

Không label bằng:

- raw URL;
- query string;
- date/user input;
- factor/rule code tự do.

Metrics reset khi process restart; long-term retention thuộc monitoring system, không thuộc app.

### Containers

Hai image:

- API: Node 24 Debian slim, production pnpm deploy output, non-root `node`;
- web: build bằng Node 24, runtime Node 24 Alpine, non-root `node`.

Production compose:

- PostgreSQL private;
- API private;
- web public;
- dependency health gates;
- password bắt buộc qua environment.

### CI

GitHub Verify ngoài application CI còn:

- validate `compose.production.yml`;
- build API image;
- build web image.

Không push image registry trong phase này vì chưa có deployment target/registry policy được chọn.

## Hệ quả

- local demo và container dùng cùng built web artifact;
- không cần CORS cho browser;
- API/PG surface không public mặc định;
- metrics/logs đủ cho production baseline;
- deployment artifact bị CI kiểm chứng thay vì chỉ documentation.
