# Giải trừ / 解除 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.852 (working scan PDF page 859), mục **Giải trừ**;
- Hán Q11 `WYG_011-15b`, mục `解除`.

### Nên production — 12 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Nguyệt Ân, Tứ Tướng, Thời Đức, ngày Trừ, ngày Khai, Giải Thần, Trừ Thần/Ngũ Ly.

### Discrepancy: Việt thêm Thiên Nguyện

Việt p.852 in thêm **Thiên Nguyện** trong Nên. Hán Q11 không có `天願` ở `解除`; Q10 mục `天願` còn nói thẳng `不用以解除療病者療解無取合義`.

Registry: `Q11_GIAI_TRU_VIET_THEM_THIEN_NGUYEN`.

Production policy: **không dùng Thiên Nguyện như Nên Giải trừ**; theo Hán Q11 + Q10, giữ sai khác Việt công khai.

### Kị — 15 mục

Nguyệt Kiến/Trực Kiến, Bình nhật, Tử Thần, Thu nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Đại Thời, Du Họa, Thiên Lại, Tử Khí, Tứ Phế, Ngũ Mộ.

Q11 không Kị Nguyệt Phá và không Kị Nguyệt Hại.

## Q10 semantics

### Nguyệt Phá: thường miễn, hội đặc biệt mới Kị

Ordinary `月破` ghi `止不忌...解除...`; vì vậy **Nguyệt Phá đơn độc không phải blocker Giải trừ**.

Q10 `WYG_010-29b..30a` có các hội ngoại lệ:

- tháng Tý/Ngọ: Nguyệt Phá + Tai Sát, không Đức → `諸事皆忌`; có Đức → vẫn riêng Kị Giải trừ;
- tháng Mùi/Thân: Nguyệt Phá + Nguyệt Hình, không Đức → `諸事皆忌`; có Đức → vẫn riêng Kị Giải trừ;
- tháng Mão/Dậu: Nguyệt Phá + Tai Sát + Nguyệt Yếm → `諸事皆忌` kể cả gặp Đức.

Production dùng global `THEM_KY` cho hai nhánh “có Đức vẫn Kị” vì không có baseline Nguyệt Phá contribution để target.

### Bình nhật + Tử Thần

Q10 gộp `平日(死神)`. Production giữ hai identity Q11 riêng nhưng clone cùng conflict semantics để không để sót duplicate Kị. Ví dụ tháng Hợi được giải cả Bình nhật lẫn Tử Thần.

### Shared-target core

Các target Bình, Thu, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Đại Thời, Thiên Lại, Tứ Phế, Ngũ Mộ dùng cùng source-resolved target rules đã machine-lock ở Khai trương khi outcome của Q10 là activity-independent đối với hai việc này.

Chỉ global `CAM_MOI_VIEC` thật sự universal được tái dùng; không mang theo global suppression activity-specific.

### Nguyệt Kiến

Giống Q10 source branch dùng cho Cầu phúc/Cầu tự:

- gặp Đức/Hợp, Thiên Xá, Nguyệt Ân, Tứ Tướng → bỏ Kị Giải trừ;
- tháng Mùi ngày Kỷ Mùi không lấy riêng Thiên Đức Hợp làm relief;
- các hội hung nặng hơn vẫn delegate/hard theo rule tương ứng.

### Du Họa

`WYG_010-53b..54a`: Du Họa Kị `祈福求嗣解除求醫療病`; gặp Đức/Hợp/Thiên Xá vẫn Kị.

### Tử Khí

`WYG_010-55b..56a`:

- gặp Thiên Đức/Nguyệt Đức/Thiên Đức Hợp/Nguyệt Đức Hợp → Giải trừ được bỏ Kị;
- riêng tháng Thìn/Tuất hội Nguyệt Yếm vẫn Kị dù gặp Đức.

### Tứ Phế và Ngũ Mộ

- Tứ Phế + Đức vẫn Kị; Tứ Phế + Nguyệt Phá → mọi việc đều Kị.
- Ngũ Mộ tháng Ngọ/Tý + Nguyệt Đức → bỏ Kị theo Q10.

### Các ngày Giải trừ được miễn

Q10 xác nhận Giải trừ là ngoại lệ được phép, vì vậy các factor sau **không tạo Kị Giải trừ**:

- Vô Lộc / `無祿日`;
- Thượng Sóc;
- Tứ Ly;
- Tứ Tuyệt;
- Hối nhật.

## Foundation

- Giải Thần / `解神`: Việt p.462–463 + Hán Q5 `WYG_005-59b..60a`, production monthly pair sequence;
- Trừ Thần / `除神`: identity alias của Ngũ Ly / `五離` đã production;
- Tử Thần / `死神`, Tử Khí / `死氣`: production qua Q4 shared-position.

## Product mapping

- activity: `GIAI_TRU`;
- title: **Giải trừ**;
- source label: `解除`;
- route: `/giai-tru`;
- API: `/date-selection/giai-tru`;
- Q7 Hoàng/Hắc đạo chỉ supplementary, không blanket-block.

## Oracle/tests

- `giai-tru-rules.spec.ts`: exact Hán 12 Nên / 15 Kị + negative Thiên Nguyện/Nguyệt Phá;
- `giai-tru-conflict.spec.ts`: Nguyệt Phá exemption/overlap, Bình+Tử Thần, Kiến, Du Họa, Tử Khí, Tứ Phế, Ngũ Mộ, special-day exemptions;
- `han-q11-oracle.spec.ts`: independent `解除` fixture;
- `han-q10-semantic-oracle.spec.ts`: independent Q10 exemption/overlap assertions;
- discrepancy registry khóa Việt thêm Thiên Nguyện.
