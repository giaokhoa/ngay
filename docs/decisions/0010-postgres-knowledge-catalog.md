# ADR 0010: Hybrid PostgreSQL Knowledge Catalog

Status: Accepted

## Bối cảnh

Phase 5 đã tạo một engine rất type-safe:

- lịch pháp, Can Chi, Tiết khí và primitive vẫn là code;
- factor identities và activity identities dùng enum/stable code;
- Q11/Q10 rule data hiện nằm trong TypeScript;
- provenance Việt/Hán đi cùng từng rule.

Điểm yếu của cách này không phải tốc độ evaluation. In-memory evaluation của vài chục
rule cho một ngày vốn rất rẻ.

Điểm yếu là **queryability**:

- tìm toàn bộ rule của một activity;
- tìm rule theo Quyển/trang nguồn;
- tìm mọi nơi một factor được dùng;
- audit provenance;
- làm source viewer/admin/research tooling.

## Quyết định

Dùng PostgreSQL như **knowledge/query catalog**, không đưa arithmetic calendar/evaluation
vào database.

### Vẫn giữ trong TypeScript

- `DiaChi`, `ThienCan`, `ThapNhiTruc`;
- phép tính Can Chi / tiết khí / mùa / Thổ Vượng;
- factor calculators;
- generic Q10 resolver algorithm;
- operation types như `BO_KY`, `DELEGATE`, `CAM_MOI_VIEC`;
- stable activity/factor codes.

### Mirror vào PostgreSQL

- activity catalog;
- Q11 activity rules;
- Q10 conflict rules;
- target / condition;
- precedence;
- descriptions;
- source references và verified state.

Target và condition dùng `jsonb` vì Q10 condition có nhiều shape khác nhau. Các bảng
identity/provenance vẫn relational.

### Không query DB trong hot path xem ngày

Date evaluation tiếp tục dùng in-memory TypeScript structures.

PostgreSQL phục vụ:

- source viewer;
- admin/research query;
- audit;
- future migration tooling.

Nếu sau này muốn DB-native rule authoring, cần một phase riêng có validation/schema
versioning rồi mới đổi source-of-truth.

## Schema

- `knowledge_activity`
- `knowledge_rule`
- `knowledge_source`
- `knowledge_rule_source`
- `knowledge_meta`

Primary rule identity:

`(activity_code, layer, code)`.

Indexes:

- activity + layer;
- effect / operation;
- source book + page;
- GIN cho `target jsonb`;
- GIN cho `condition jsonb`.

## Sync

Nếu `DATABASE_URL` tồn tại, API bootstrap:

1. kết nối Postgres;
2. đảm bảo schema;
3. lấy advisory transaction lock;
4. rebuild generated mirror từ current typed catalog;
5. ghi sync metadata.

Nếu `DATABASE_URL` không tồn tại:

- core date-selection vẫn chạy;
- knowledge query endpoint trả unavailable;
- readiness vẫn OK vì PG là optional feature.

Nếu `DATABASE_URL` tồn tại nhưng Postgres chết:

- bootstrap fail nếu chưa start xong;
- readiness fail nếu connection mất sau bootstrap.

## Query API

- `GET /knowledge/status`
- `GET /knowledge/stats`
- `GET /knowledge/rules`

Filters:

- activity;
- layer;
- effect;
- target;
- source book;
- source page;
- text query;
- pagination.

`target` dùng JSONB containment để tận dụng GIN index.

## Demo

Web route:

- `/rules`

Hiển thị:

- số activities/rules/source refs;
- filter SQL-backed;
- target/condition JSONB;
- source Việt/Hán.

## Hệ quả

### Lợi ích

- query/audit tốt hơn rất nhiều so với grep array TypeScript;
- provenance trở thành dữ liệu query được;
- không đánh đổi compile-time safety của engine;
- không thêm DB latency vào xem-ngày hot path;
- tạo nền cho source viewer/admin.

### Chi phí

- catalog hiện là generated mirror, chưa phải canonical authoring store;
- startup có sync cost khi bật Postgres;
- thêm một optional external dependency cho knowledge UI.

Đây là trade-off có chủ ý. PostgreSQL được dùng ở chỗ nó mạnh: query, indexing,
audit và tooling; TypeScript giữ chỗ nó mạnh: typed deterministic calculation.
