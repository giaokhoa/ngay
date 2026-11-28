# Tế tự / 祭祀 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 activity contract

Nguồn đã đối chiếu trực tiếp:

- exact Việt Tập I p.844 (working scan PDF page 850), mục **Cúng tế**;
- Hán `KR3g0051_011.txt`, `WYG_011-6a`, mục `祭祀`.

### Hán Q11 — 16 Nên / 2 Kị

**Nên:** Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Thiên Vu, ngày Khai, Phổ Hộ, **Phúc Sinh**, Thánh Tâm, Ích Hậu, Tục Thế.

**Kị:** Thiên Cẩu, ngày Dần.

### Discrepancy Việt/Hán: Việt thiếu Phúc Sinh

Exact Việt p.844 in:

- ... Thiên Vu, ngày Khai, Phổ Hộ, Thánh Tâm, Ích Hậu, Tục Thế;
- Kị Thiên Cẩu, ngày Dần.

Hán Q11 lại ghi rõ `... 天巫開日普護福生聖心益後續世`.

Sai khác được registry bằng `Q11_TE_TU_VIET_THIEU_PHUC_SINH`.

Production policy:

- giữ **Phúc Sinh là Nên Tế tự** theo Hán Q11;
- identity/công thức Phúc Sinh đã double-entry Việt/Hán ở Q6;
- contribution Phúc Sinh chỉ cite Hán Q11 + Hán Q6, không giả rằng Việt Q11 p.844 có mục này;
- 15 Nên còn lại + 2 Kị dùng provenance Việt/Hán đồng thuận.

## Q6 ritual factors

Tế tự tạo dependency trực tiếp lên năm factor Q6 đã production:

- Phổ Hộ / `普䕶`: Việt p.516 in “Phả Hộ”, Hán `WYG_006-39b..40a`;
- Phúc Sinh / `福生`: Việt p.517, Hán `WYG_006-40b..41a`;
- Thánh Tâm / `聖心`: Việt p.518, Hán `WYG_006-41b..42a`;
- Ích Hậu / `益後`: Việt p.520, Hán `WYG_006-43b..44a`;
- Tục Thế / `續世`: Việt p.522, Hán `WYG_006-44b..45a`.

Mỗi factor có bảng exact 12 tháng → chi ngày và independent Hán Q6 oracle. `血忌` không bị suy thành alias của Tục Thế.

## Thiên Cẩu

Q4 Việt/Hán đã correction foundation trước khi mở Tế tự:

- không phải mọi Trực Mãn đều là Thiên Cẩu;
- **Thiên Cẩu chỉ là tháng kiến Thân, ngày Tuất** (`申建之戌`);
- Phúc Đức/Thiên Vu vẫn theo Trực Mãn, Thiên Cẩu được tính riêng.

Q10 `WYG_010-36b..37a` ghi tháng Thân ngày Mãn lại là Thiên Cẩu, **Kị Tế tự; gặp Đức vẫn Kị**.

## Q10 conflict semantics

Tế tự là activity được Q10 miễn phần lớn Kị thường. Nhiều mục ghi thẳng `止不忌祭祀`, gồm các nhánh Nguyệt Phá, Bình/Thu, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình/Nguyệt Yếm, Tứ Phế...

Vì vậy production **không clone Kị thường** của Cưới hỏi/Yến hội/Di chuyển.

Production chỉ bổ sung các nhánh Q10 thật sự nói `諸事皆忌`, dùng cùng universal hard-ban subset đã source-lock ở Nhập học:

- Nguyệt Phá chồng Tai Sát / Nguyệt Hình / Nguyệt Yếm theo `WYG_010-29b..30a`;
- Nguyệt Sát / Nguyệt Hình hạ hung không Đức/Hợp;
- Nguyệt Yếm Mão/Dậu, Tý/Ngọ không Thiên Xá và 34 hard-day hội/xung Q4/Q10;
- Tứ Phế gặp Nguyệt Phá.

Các category Q10 khác còn cho thấy Tế tự là ngoại lệ được phép:

- `無祿日`: chỉ chú Tế tự/giải trừ/...;
- `上朔、四離、四絶、晦日`: `止不忌祭祀...`;
- `月忌日`: chỉ chú Tế tự/yến hội/...;
- do đó các category này **không** được biến thành hard blocker Tế tự.

Kị ngày Dần được Q10 `百忌日` xác nhận (`寅日忌祭祀`). Q10 `WYG_010-74a..74b` nhắc lại `凡天狗寅日忌祭祀`.

## Q7

Hoàng/Hắc đạo Q7 không blanket-block Tế tự: danh sách năm nhóm việc Hắc đạo kị không nêu `祭祀`. Q7 chỉ là lớp bổ trợ hiển thị.

## Product mapping

- activity code: `TE_TU`;
- consumer title: **Cúng tế**;
- route: `/te-tu`;
- direct API: `/date-selection/te-tu`;
- source label: `祭祀`;
- personalization dùng một người chủ lễ theo generic contract hiện tại.

## Oracle/tests

- `te-tu-rules.spec.ts`: exact Hán 16 Nên / 2 Kị; provenance Phúc Sinh tách riêng;
- `te-tu-conflict.spec.ts`: ordinary exemption, Thiên Cẩu, ngày Dần, universal hard-ban;
- `han-q11-oracle.spec.ts`: independent exact `祭祀` fixture;
- `han-q10-semantic-oracle.spec.ts`: Tế tự được loại khỏi generic Kị thường, nhưng vẫn chịu universal hard-ban;
- `han-source-discrepancies.spec.ts`: Việt Q11 thiếu Phúc Sinh được registry explicit;
- Q6 ritual factor tests/oracle khóa năm dependency monthly factors.
