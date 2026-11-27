# Production Readiness

Tài liệu này là exit checklist cho Phase 6. Nó không thay thế source/research gates của
logic trạch cát.

## Runtime

- [x] API validate `HOST` / `PORT` và fail-fast.
- [x] Graceful shutdown hooks cho API.
- [x] Production web server chạy trực tiếp artifact `dist/`, không cần Vite dev server.
- [x] SPA history fallback cho các route như `/rules`, `/an-tang`.
- [x] Same-origin reverse proxy cho `/date-selection`, `/knowledge`, `/health`.
- [x] API/PG không cần publish ra host trong production compose.

## Persistence / knowledge catalog

- [x] PostgreSQL là optional query/audit catalog.
- [x] Q10/Q11 + provenance được sync deterministic từ typed rule catalog.
- [x] Date-selection hot path không round-trip PostgreSQL.
- [x] JSONB target/condition có GIN index.
- [x] Readiness kiểm PostgreSQL khi `DATABASE_URL` được cấu hình.

## Source viewer / research tooling

- [x] `/rules` query được activity, Q10/Q11, target, Quyển, trang và text.
- [x] UI hiển thị provenance Việt/Hán và JSONB target/condition.
- [x] Stable source/rule identities có constraint ở PostgreSQL.

## Performance

- [x] Evaluation vẫn in-memory.
- [x] Knowledge query có relational indexes + GIN JSONB.
- [x] Query plan demo xác nhận dùng composite activity/layer index và target GIN index.
- [x] Static assets có cache immutable; `index.html` no-cache.

Không thêm cache ứng dụng khi chưa có benchmark chứng minh bottleneck.

## Observability

- [x] `X-Request-Id` được sinh/propagate qua web edge và API.
- [x] API có structured JSON access log: request ID, method, route, status, duration.
- [x] `GET /metrics` xuất Prometheus-compatible counters/duration sum/process uptime.
- [x] Metric label dùng route pattern/status class, không dùng query string hoặc URL động.
- [x] `/health/live` tách khỏi `/health/ready`.

Production compose chỉ publish web. Monitoring nên scrape `api:3000/metrics` từ private
container network thay vì public Internet.

## Security

- [x] Nest security headers bật ở API.
- [x] Web edge có CSP, frame deny, nosniff, referrer policy, COOP.
- [x] Không bật wildcard CORS; browser đi same-origin qua web proxy.
- [x] API và web containers chạy non-root Node user.
- [x] Production compose bắt buộc cung cấp `POSTGRES_PASSWORD`.
- [x] Web proxy giới hạn request body 1 MiB.
- [x] Chỉ web port được publish trong production compose.

## Deployment

Production topology:

```text
browser
   |
   v
web :8080
   |  static SPA
   |  reverse proxy
   v
api :3000
   |
   v
postgres :5432
```

Artifacts:

- `Dockerfile.api`
- `Dockerfile.web`
- `compose.production.yml`

GitHub Verify phải:

1. frozen install;
2. format/lint/typecheck/tests/build;
3. validate production compose;
4. build API image;
5. build web image.

## Local production-like smoke without Docker

Dùng PostgreSQL local bất kỳ rồi:

```bash
pnpm build

DATABASE_URL=postgresql://... HOST=127.0.0.1 PORT=3000 \
  pnpm --filter @ngay/api start:prod

API_ORIGIN=http://127.0.0.1:3000 HOST=127.0.0.1 PORT=8080 \
  pnpm --filter @ngay/web start:prod
```

Smoke:

```bash
curl -fsS http://127.0.0.1:8080/
curl -fsS http://127.0.0.1:8080/rules
curl -fsS http://127.0.0.1:8080/health/ready
curl -fsS 'http://127.0.0.1:8080/knowledge/rules?activity=AN_TANG&layer=Q10&target=PHUC_NHAT&book=10&page=823'
curl -fsS http://127.0.0.1:3000/metrics
```

## Docker production-like demo

Chọn password URL-safe cho demo:

```bash
export POSTGRES_PASSWORD='change-me-demo-password'
export WEB_PORT=8080

pnpm prod:up
```

Mở `http://localhost:8080/rules`.

Dừng:

```bash
pnpm prod:down
```

## Phase 6 exit

Phase 6 được coi là hoàn tất khi:

- checklist trên vẫn xanh;
- full CI xanh;
- GitHub Verify build được cả hai container image;
- production-like smoke chạy được từ built artifacts;
- không có issue/PR Phase 6 đang mở.
