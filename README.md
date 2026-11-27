# Ngày

Ứng dụng xem ngày tốt/xấu dựa trên hệ thống quy tắc được nghiên cứu và đối chiếu từ Hiệp Kỷ Biện Phương Thư bản Việt và Hán bản.

## Stack

- Backend: NestJS
- Knowledge/query catalog: PostgreSQL qua `pg` (optional)
- Frontend: React + React Router + Vite
- Package manager: pnpm workspace
- CI: GitHub Actions

## Quy ước đặt tên

Quy ước này được áp dụng cố định cho project:

- Folder và filename: English, kebab-case.
- Class, type, interface, enum, function, biến và hằng nghiệp vụ do project định nghĩa: tiếng Việt không dấu.
- Suffix/kết cấu framework giữ nguyên: Service, Controller, Module, Repository, Dto, Entity, Guard, Pipe, Interceptor.
- API/symbol đến từ thư viện bên thứ ba giữ nguyên tên gốc; không alias sang tiếng Việt chỉ để dịch.
- Text giao diện: tiếng Việt có dấu.
- Hán văn gốc chỉ dùng cho nguồn dẫn, đối chiếu và audit; không dùng làm identifier nghiệp vụ.

Ví dụ file apps/api/src/calendar/calendar.service.ts chứa class TinhLichService và hàm tinhThongTinNgay.

## Production runtime

API production:

```bash
pnpm --filter @ngay/api build
HOST=0.0.0.0 PORT=3000 pnpm --filter @ngay/api start:prod
```

Runtime fail-fast nếu `PORT` ngoài `1..65535` hoặc `HOST` không hợp lệ.
Health probes:

- `/health/live`
- `/health/ready`

Web hiện dùng relative API path, nên deployment baseline là same-origin/reverse proxy.
Không bật CORS wildcard. Chi tiết: `docs/decisions/0009-production-runtime-baseline.md`.

## PostgreSQL rule catalog demo

PostgreSQL là query/audit catalog cho Q10/Q11 + provenance; engine xem ngày vẫn tính
in-memory bằng TypeScript. Chi tiết boundary: `docs/decisions/0010-postgres-knowledge-catalog.md`.

Khởi động Postgres local:

```bash
pnpm pg:up
cp .env.example .env
set -a
. ./.env
set +a
```

Terminal 1:

```bash
pnpm --filter @ngay/api build
pnpm --filter @ngay/api start:prod
```

Khi `DATABASE_URL` có giá trị, API tự tạo schema và sync generated mirror từ catalog
type-safe hiện tại.

Terminal 2:

```bash
pnpm --filter @ngay/web exec vite --host 0.0.0.0
```

Mở:

- `http://localhost:5173/rules`
- `http://localhost:3000/knowledge/stats`
- ví dụ query:
  `/knowledge/rules?activity=AN_TANG&layer=Q10&target=PHUC_NHAT&book=10&page=823`

Dừng Postgres:

```bash
pnpm pg:down
```

## Production-like full stack

Build artifacts:

```bash
pnpm build
```

Không cần Vite dev server ở production. Web package có static server + same-origin
reverse proxy:

```bash
# API
DATABASE_URL=postgresql://... HOST=127.0.0.1 PORT=3000 \
  pnpm --filter @ngay/api start:prod

# Web
API_ORIGIN=http://127.0.0.1:3000 HOST=127.0.0.1 PORT=8080 \
  pnpm --filter @ngay/web start:prod
```

Docker full stack:

```bash
export POSTGRES_PASSWORD='change-me-demo-password'
pnpm prod:up
```

Mở `http://localhost:8080/rules`. Chỉ web port được publish; API/Postgres nằm trong
private compose network.

Observability:

- `/health/live`
- `/health/ready`
- API-internal `/metrics` theo Prometheus text format
- `X-Request-Id` + structured JSON HTTP logs

Production exit checklist: `docs/production-readiness.md`.

## CI là nguồn kiểm chứng chuẩn

Mọi push lên main và mọi pull request đều phải qua:

1. pnpm install --frozen-lockfile
2. pnpm format:check
3. pnpm lint
4. pnpm typecheck
5. pnpm test
6. pnpm build
7. docker compose -f compose.production.yml config
8. docker build API image
9. docker build web image

Không coi môi trường dev cục bộ là bằng chứng build/test thành công.

## Kiến trúc dự kiến

- calendar: lịch pháp nền, Can Chi, tiết khí, tháng theo tiết khí, 12 trực.
- factors: tính thần sát và các yếu tố của ngày.
- activities: quy tắc Dụng sự theo từng công việc.
- evaluation: Nghi kị, ngoại lệ và xử lý cát/hung.
- date-selection: orchestration/API xem ngày.

## Dành cho Agent

Mọi Agent phải đọc AGENTS.md trước khi sửa code.

Tài liệu bắt buộc:

- docs/architecture.md
- docs/source-policy.md
- docs/research-workflow.md
- docs/testing.md
- docs/roadmap.md
- docs/research-index.md
- docs/decisions/

Nếu task liên quan công thức hoặc quy tắc xem ngày mà chưa có trạng thái VERIFIED trong research index, phải research và ghi nguồn trước khi implement.
