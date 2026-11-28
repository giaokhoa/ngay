# Cầu phúc / 祈福 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 activity contract

Nguồn exact đã đối chiếu:

- Việt Tập I p.844 (working scan PDF page 850), mục **Cầu phúc**;
- Hán `KR3g0051_011.txt`, `WYG_011-6a`, mục `祈福`.

Hai bản đồng thuận ở các mục in trực tiếp.

### Nên — 16 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Thiên Vu, ngày Khai, Phổ Hộ, Phúc Sinh, Thánh Tâm, Ích Hậu, Tục Thế.

Khác Tế tự p.844 bị lược Phúc Sinh, dòng Cầu phúc **có Phúc Sinh đầy đủ**; không có discrepancy Việt/Hán ở mục này.

### Kị named trong Q11 — 16 mục

Nguyệt Kiến (Trực Kiến), Nguyệt Phá, Bình nhật, Thu nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Du Họa, Thiên Lại, Tứ Phế, Lộc Không/Vô Lộc, Thượng Sóc.

Q11 ghi `又忌禄空上朔等日 / ... Lộc Không, Thượng Sóc đẳng nhật`. Q10 `上朔・四離・四絶・晦日` mở nghĩa `等日`, nên production bổ sung ba contribution Kị source-resolved:

- Tứ Ly;
- Tứ Tuyệt;
- Hối nhật.

Đây là Q10 expansion của `等日`, **không phải discrepancy Q11**.

## Foundation đã khóa trước vertical

### Du Họa / 遊禍

Q6 Việt p.499 + Hán `WYG_006-22b..23a`: Giêng khởi Tỵ, nghịch tứ Mạnh. Factor production trước khi mở Cầu phúc.

Q10 `WYG_010-53b..54a` ghi Du Họa Kị `祈福求嗣...`; gặp Đức/Hợp hoặc Thiên Xá **vẫn Kị**.

### Vô Lộc / 無祿日

Q5 Việt p.455–456 + Hán Q5/Q10 khóa calculator context-aware, không phải blanket 10 ngày. Production chỉ emit `VO_LOC` sau khi xét Đức, năm/tháng điền thực, trung khí Thái Dương, các meeting Tuế Đức/Hợp và tam bằng; riêng Quý Hợi luôn giữ Vô Lộc.

Nếu `VO_LOC` đã emit, Cầu phúc giữ Kị baseline.

### Thượng Sóc / Tứ Ly / Tứ Tuyệt / Hối

- Thượng Sóc đã production từ Q6 lunar/year context.
- Tứ Ly/Tứ Tuyệt: Việt p.560 + Hán Q6/Q9, tính theo ngày dân sự địa phương trước phân/chí hoặc tứ lập.
- Hối: Việt Q10 p.828 + Hán `WYG_010-69a..69b`, là ngày dân sự ngay trước Sóc kế tiếp.

Q10 p.828/`WYG_010-69a..69b` chỉ miễn Tế tự/Giải trừ/...; **Cầu phúc không được miễn**, kể cả gặp Đức/Hợp/Thiên Xá/Thiên Nguyện.

## Q10 conflict semantics

### Nguyệt Kiến / Trực Kiến

`WYG_010-27a..28b`:

- baseline Kị Cầu phúc;
- gặp Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Nguyệt Ân hoặc Tứ Tướng thì các Kị thường ngoài việc đất được giải → bỏ Kị Cầu phúc;
- riêng **tháng Mùi ngày Kỷ Mùi** là Dương Thác, không lấy riêng Thiên Đức Hợp làm Đức Hợp để giải Kị;
- nếu cùng ngày còn một cát thần giải hợp lệ khác, Kị vẫn được bỏ.

### Shared-target Q10 core

Cầu phúc tái dùng các data-driven rule đã source-lock của Khai trương **chỉ** cho target có cùng câu chế hóa nguồn:

- Nguyệt Phá;
- Bình, Thu;
- Kiếp Sát, Tai Sát, Nguyệt Sát;
- Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm;
- Đại Thời, Thiên Lại, Tứ Phế.

Các global rule chỉ được tái dùng nếu là `CAM_MOI_VIEC`; không mang theo global `BO_NEN`/delegate có thể chứa Nên riêng của Khai trương.

Ví dụ đã regression:

- Nguyệt Phá + Đức vẫn Kị Cầu phúc;
- Đại Thời tháng Dần bỏ Kị;
- Tứ Phế + Đức vẫn Kị; Tứ Phế + Nguyệt Phá → mọi việc đều Kị;
- Nguyệt Yếm Mão/Dậu + Nguyệt Phá + Tai Sát → mọi việc đều Kị dù có Đức.

### Du Họa

Rule riêng `GIU_KY_DU_CO_CAT`: Đức/Hợp/Thiên Xá không giải Kị Cầu phúc.

## Q7

Hoàng/Hắc đạo Q7 không blanket-block `祈福`; danh sách năm nhóm việc Hắc đạo kị không nêu Cầu phúc. Q7 chỉ là lớp bổ trợ.

## Product mapping

- activity code: `CAU_PHUC`;
- title consumer: **Cầu phúc**;
- route: `/cau-phuc`;
- direct API: `/date-selection/cau-phuc`;
- source label: `祈福`;
- personalization: một người chủ lễ theo generic contract.

## Oracle/tests

- `cau-phuc-rules.spec.ts`: 16 Nên + 19 Kị source-resolved;
- `cau-phuc-conflict.spec.ts`: Kiến/Đức/Kỷ Mùi, Du Họa, Tứ Phế, Tứ Ly/Tuyệt/Hối, shared core/hard-ban;
- `han-q11-oracle.spec.ts`: independent semantic fixture `祈福`;
- `han-q10-semantic-oracle.spec.ts`: Cầu phúc không có Ngũ Mộ Kị; Kiến/Du Họa/special-calendar semantics độc lập;
- foundation tests cho Du Họa, Vô Lộc, Tứ Ly/Tuyệt/Hối đã merge trước vertical.
