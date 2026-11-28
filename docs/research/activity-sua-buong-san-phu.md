# Sửa buồng sản phụ / 修置産室 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.858, mục **Bố trí và sửa sang buồng sản phụ**;
- Hán Q11 `WYG_011-21b`, mục `修置産室`.

### Nên — 1 mục

- Khai nhật / 開日.

### Kị — 21 mục

Nguyệt Kiến, Thổ Phủ, Nguyệt Phá, Bình nhật, Tử Thần, Thu nhật, Bế nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Thiên Lại, Tử Khí, Tứ Phế, Ngũ Mộ, Thổ Phù, Địa Nang, sau Thổ Vượng dụng sự.

Việt p.858 và Hán `WYG_011-21b` khớp direct 1/21, không có discrepancy mới.

Hai cặp phải giữ tách identity:

- `平日` là Trực Bình, còn `死神` là Tử Thần. Q4 đặt Tử Thần cùng vị trí Bình nhưng Q11 liệt kê riêng vì có Kị chuyên biệt.
- `土府` là Thổ Phủ, còn `土符` là Thổ Phù. Không canonical hóa thành một factor.

`土王用事後` dùng typed calendar fact `THO_VUONG`, theo project convention đã source-lock: từ ngày Thổ Vượng bắt đầu (18 ngày trước Tứ Lập) tới trước ngày Lập.

## Q10 semantics

### Earthwork-shared targets

Các target chung với nhóm công việc đất tái dùng full Q10 resolver đã source-lock: Nguyệt Kiến, Thổ Phủ, Nguyệt Phá, Bình/Thu/Bế, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Đại Thời, Thiên Lại, Tứ Phế, Ngũ Mộ, Thổ Phù, Địa Nang và Thổ Vượng.

Điều này giữ đúng các nhánh hard-all, cát relief, cân bằng và delegate theo tháng của Q10, thay vì viết lại matrix giản lược.

### Tử Thần / 死神

Q10 `WYG_010-31b..33b` đặt `死神` trong heading `平日(死神)` và ghi riêng `忌...修置產室...`. Các nhánh tháng sau đó quyết định khi Bình/Tử Thần được giải, cân bằng hoặc theo hung khác. Production tái dùng branch Bình nhật nhưng đổi target sang `TU_THAN`, vì đây là cùng vị trí ngày nhưng contribution Q11 riêng.

### Nguyệt Hại / 月害

Q11 Sửa buồng sản phụ có Nguyệt Hại trong khi baseline earthwork chung không cần target này. Resolver lấy exact Q10 branch Nguyệt Hại đã source-lock ở Khai trương, bỏ `boNen` activity-specific.

### Tử Khí / 死氣

Q10 `WYG_010-55b..56a`:

- Tử Khí Kị sửa buồng sản phụ;
- gặp Thiên Đức / Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp thì ngoài quân sự và trị bệnh, các việc khác được giải;
- riêng tháng Thìn/Tuất hội Nguyệt Yếm vẫn Kị dù gặp Đức.

Production tái dùng exact branch Tử Khí đã source-lock ở Giải trừ, đổi nhãn activity nhưng giữ precedence.

### Thổ Phù / Địa Nang / Thổ Vượng

Q10 `WYG_010-62a..62b` ghi `土符 地囊` Kị `修置産室` và `與德合赦願併猶忌`; không dùng cát để hóa.

Q10 `WYG_010-70b` ghi `土王用事` Kị `修置産室`, nghĩa cùng Thổ Phủ. Production giữ `THO_VUONG` là typed calendar condition chứ không tạo thần sát giả.

## Shared calendar annotations Q10

Vertical đi qua shared layer hiện có:

- `無祿日`: ngoài nhóm miễn → bỏ Nên, không tự tạo Kị;
- `上朔 / 四離 / 四絶`: ngoài nhóm miễn → Kị bổ sung;
- `晦日`: chỉ bỏ Nên.

## Q7

Hoàng/Hắc đạo Q7 supplementary; `修置産室` không nằm trong five-activity Hắc đạo blocker list hiện production.

## Product mapping

- activity code: `SUA_BUONG_SAN_PHU`;
- title: **Sửa buồng sản phụ**;
- source label: `修置産室`;
- route: `/sua-buong-san-phu`;
- API: `/date-selection/sua-buong-san-phu`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `sua-buong-san-phu-rules.spec.ts`: exact 1 Nên / 21 Kị + provenance;
- `sua-buong-san-phu-conflict.spec.ts`: Nguyệt Kiến/Thổ Phủ hard, Tử Thần relief, Nguyệt Hại, Tử Khí relief + Thìn/Tuất exception, Ngũ Mộ, Thổ Phù/Địa Nang, Thổ Vượng, Khai nhật;
- `han-q11-oracle.spec.ts`: independent fixture `修置産室`;
- `han-q10-semantic-oracle.spec.ts`: independent semantic branches;
- service regression kiểm calendar/factor/evaluation end-to-end.
