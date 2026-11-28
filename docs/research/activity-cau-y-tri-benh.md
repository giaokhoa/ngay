# Cầu y, trị bệnh / 求醫療病 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.853 (working scan PDF page 860), mục **Cầu thầy, chữa bệnh**;
- Hán Q11 `WYG_011-16b`, mục `求醫療病`.

### Nên — 15 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Nguyệt Ân, Tứ Tướng, Thời Đức, Thiên Hậu, ngày Trừ, ngày Phá, Thiên Y, ngày Khai, Giải Thần, Trừ Thần.

Production identity mapping:

- `天后` dùng `DICH_MA`, vì Q10 ghi `驛馬(天后/) ... 又為天后宜求醫療病`; Q6 cũng source-lock Thiên Hậu là tên cùng vị trí của Dịch Mã;
- `除神` dùng alias production `NGU_LY / 五離`.

### Kị — 22 mục

Nguyệt Kiến/Trực Kiến, Bình nhật, Tử Thần, Thu nhật, Mãn nhật, Bế nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Du Họa, Thiên Lại, Tử Khí, Tứ Phế, Ngũ Mộ, Vãng Vong, ngày Mùi, ngày âm 15, Sóc–Huyền–Vọng.

Việt p.853 và Hán Q11 khớp trực tiếp 15/22; không có discrepancy mới.

## Q10 semantics

### Nguyệt Kiến

Dùng source-resolved branch đã khóa cho Cầu phúc/Cầu tự:

- gặp Đức/Hợp, Thiên Xá, Nguyệt Ân, Tứ Tướng có thể giải Kị;
- tháng Mùi ngày Kỷ Mùi không lấy riêng Thiên Đức Hợp làm relief;
- hội hung nặng hơn vẫn theo branch nặng hơn.

### Nguyệt Phá: ordinary exempt, overlap mới khôi phục Kị

Q11 không đưa Nguyệt Phá vào Kị của `求醫療病`. Q10 `WYG_010-29b..30a` cũng ghi ordinary `月破` trong nhóm `止不忌 ... 求醫療病`.

Các hội ngoại lệ:

- tháng Tý/Ngọ + Tai Sát: không Đức → `諸事皆忌`; có Đức → vẫn riêng Kị trị bệnh;
- tháng Mùi/Thân + Nguyệt Hình: không Đức → `諸事皆忌`; có Đức → vẫn riêng Kị trị bệnh;
- tháng Mão/Dậu + Tai Sát + Nguyệt Yếm → `諸事皆忌` kể cả có Đức.

Production dùng global `THEM_KY` cho hai nhánh có Đức vì ordinary Nguyệt Phá không có baseline contribution.

### Bình nhật + Tử Thần

Q10 `平日(死神)` thường giải nhiều việc khi gặp cát, nhưng các nhánh tốt vẫn ghi riêng `求醫療病` trong residual Kị, ví dụ tháng Hợi hoặc tháng Thân khi cát thắng.

Production giữ hai Q11 identity `BINH` và `TU_THAN` riêng, clone cùng target semantics nhưng đổi các `BO_KY` của vertical khác thành `GIU_KY_DU_CO_CAT` cho trị bệnh. Các nhánh `CAN_BANG`/`DELEGATE` chỉ giữ khi Q10 thật sự viết “không ghi Nên, không ghi Kị” hoặc “theo hung thần nặng hơn”.

### Thu, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình/Hại/Yếm, Thiên Lại

Đây là nhóm “residual medical Kị”: nhiều branch Q10 giải các việc khác nhưng vẫn viết `求醫療病` trong phần còn Kị.

Resolver vì vậy:

- tái dùng exact month/overlap/delegate structure của Q10;
- mọi `BO_KY` vốn dành cho activity khác được đổi thành `GIU_KY_DU_CO_CAT` khi source medical vẫn residual;
- `CAN_BANG`, `DELEGATE`, `CAM_MOI_VIEC` giữ nguyên khi đúng câu nguồn;
- không mang `boNen` activity-specific của Khai trương sang Cầu y/trị bệnh.

Nguyệt Yếm chỉ dùng sáu rule standard; các rule sinh động đặc thù vertical khác không được clone. Universal hard-day `諸事皆忌` vẫn áp độc lập.

### Mãn nhật

Q10 `WYG_010-36b..37a` cho Mãn Kị trị bệnh, nhưng ở tháng Dần/Thân/Tý/Ngọ/Mão/Dậu có thể bỏ Kị khi hội đúng cát set được ghi:

- Nguyệt Đức;
- Thiên Đức Hợp;
- Nguyệt Đức Hợp;
- Nguyệt Ân;
- Tứ Tướng.

Không mở rộng thành “mọi Đức”. Regression khóa trường hợp chỉ Thiên Đức vẫn giữ Kị Mãn.

### Bế nhật

Q10 `WYG_010-37b..38a`:

- nhóm tháng Tứ Sinh theo Nguyệt Sát;
- các nhóm còn lại khi hội Đức/Hợp/Xá/Nguyện dùng cân bằng `凡所忌者則不註宜所宜者亦不註忌`.

Production tái dùng exact `CAN_BANG`/`DELEGATE` target rule.

### Đại Thời

Khác nhóm residual ở trên: Q10 `WYG_010-52b..53b` có các nhánh thật sự giải Kị trị bệnh.

Production giữ nguyên resolver Đại Thời đã source-lock:

- Tứ Sinh và Thìn/Tuất được bỏ Kị;
- Sửu/Mùi gặp hai Đức được bỏ Kị;
- các nhánh Tý/Ngọ/Dậu cân bằng hoặc theo Nguyệt Hình như nguồn.

### Du Họa

`WYG_010-53b..54a`: `遊禍` Kị `祈福求嗣解除求醫療病`; gặp Đức/Hợp/Thiên Xá vẫn Kị.

### Tử Khí

Q10 `WYG_010-55b..56a` khi gặp Đức vẫn ghi residual `求醫療病`. Đây là điểm khác Giải trừ: **Tử Khí + Đức vẫn Kị trị bệnh**.

### Tứ Phế

`WYG_010-58a..58b`: Tứ Phế + Đức vẫn Kị; Tứ Phế + Nguyệt Phá → `諸事皆忌`.

### Ngũ Mộ

`WYG_010-60b..61a`: tháng Ngọ/Tý (tháng 5/11 theo Nguyệt kiến) gặp Nguyệt Đức thì bỏ Kị. Resolver giữ nguyên branch exact này.

### Vãng Vong

`WYG_010-63b..64a`: Vãng Vong Kị trị bệnh; gặp Đức/Hợp/Xá/Nguyện vẫn Kị.

### Ngày Mùi

Q10 `百忌日` `WYG_010-72a`: `未日忌求醫療病`. Đây là direct Kị theo chi ngày, không cần factor thần sát.

### Ngày âm 15

Q10 `WYG_010-71b`: `十五日 忌求醫療病`, nghĩa đồng Vọng nhật. Production dùng typed `NGAY_AM:15` từ lunar calendar dựa trên Sóc thiên văn.

### Sóc–Huyền–Vọng

Việt Q10 p.829 và Hán `WYG_010-71a` đều ghi `朔弦望 忌求醫療病`.

Foundation `SOC_HUYEN_VONG` tính bốn phase 0°/90°/180°/270° và chỉ emit khi phase instant thực sự nằm trong ngày dân sự tại timezone; không xấp xỉ bằng ngày âm 1/8/15/23.

## Q7

Hoàng/Hắc đạo Q7 không blanket-block Cầu y/trị bệnh; chỉ là lớp supplementary.

## Product mapping

- activity code: `CAU_Y_TRI_BENH`;
- title: **Cầu y, trị bệnh**;
- source label: `求醫療病`;
- route: `/cau-y-tri-benh`;
- API: `/date-selection/cau-y-tri-benh`;
- personalization: một người cần trị bệnh theo generic contract.

## Oracle/tests

- `cau-y-tri-benh-rules.spec.ts`: exact 15 Nên / 22 Kị + alias Thiên Hậu;
- `cau-y-tri-benh-conflict.spec.ts`: Nguyệt Phá exemption/overlap, Kiến, Mãn, Bế, Bình/Tử Thần, Kiếp Sát, Đại Thời, Tử Khí, Ngũ Mộ, Du Họa/Vãng Vong, Tứ Phế, Mùi/15/phase;
- `han-q11-oracle.spec.ts`: independent fixture `求醫療病`;
- `han-q10-semantic-oracle.spec.ts`: independent residual medical behavior;
- service regression khóa 10/02/2024 Sóc và 24/02/2024 Vọng + ngày âm 15 qua calendar thật.
