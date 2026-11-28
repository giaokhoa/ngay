# Đặt cối xay, giã / 安碓磑 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.859, mục **Đặt cối xay, giã**;
- Hán Q11 `WYG_011-22a`, mục `安碓磑`.

### Nên — 2 mục

- Tam Hợp / 三合;
- Khai nhật / 開日.

### Kị — 11 mục

Thổ Phủ, Nguyệt Phá, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Tứ Phế, Thổ Phù, Địa Nang, sau Thổ Vượng dụng sự.

Việt p.859 và Hán `WYG_011-22a` khớp direct 2/11.

## Q10 semantics

Production lọc từ full earthwork resolver theo đúng 11 target Q11, đồng thời giữ các global hard-day rules Q4/Q10. `boNen` đặc thù Động thổ/Sửa cung thất không được kéo sang.

### Negative source lock: Bình nhật không Kị

Q10 `WYG_010-31b..33a`, ngay trong `平日(死神)`, liệt kê `安碓磑` ở nhóm **止不忌** và phần chú giải nhắc lại:

`不忌整容剃頭整手足甲安碓磑補垣塞穴修飾垣墻...`

Vì vậy production không có baseline Kị `TRUC:BINH` và cũng không tạo Kị Tử Thần cho `安碓磑`, dù Bình/Tử Thần là blocker ở một số việc khác.

### Thổ Phủ

Q10 `WYG_010-27a..28a`: `土府` chuyên Kị `安碓磑`; kể cả khi Nguyệt Kiến gặp nhóm cát được nêu, `安碓磑` vẫn nằm trong residual earthwork list. Production giữ Kị qua filtered earthwork resolver.

### Nguyệt Phá / Tam Sát / Nguyệt Hình / Nguyệt Yếm

Các nhánh được tái dùng nguyên matrix Q10 đã source-lock, gồm hard-all, cát relief, cân bằng và delegate theo tháng. Không viết lại thành blanket Kị/giải đơn giản.

### Tứ Phế

Q10 `WYG_010-58a..58b` có `安碓磑` trong danh sách Kị và ghi `與德合併猶忌`; production giữ Kị dù gặp Đức.

### Thổ Phù / Địa Nang

Q10 `WYG_010-62a..62b`:

`土符 地囊 ... 忌 ... 安碓磑 ... 與德合赦願併猶忌`

Do đó hai factor vẫn Kị dù gặp Đức/Hợp, Thiên Xá hoặc Thiên Nguyện.

### Thổ Vượng dụng sự

Q10 `WYG_010-70b` ghi `土王用事` Kị `安碓磑`, nghĩa cùng Thổ Phủ. Production dùng typed calendar fact `THO_VUONG`, không tạo thần sát giả.

## Shared calendar annotations Q10

Vertical đi qua shared layer hiện có:

- `無祿日`: ngoài nhóm miễn → bỏ Nên, không tự tạo Kị;
- `上朔 / 四離 / 四絶`: ngoài nhóm miễn → Kị bổ sung;
- `晦日`: chỉ bỏ Nên.

## Q7

Hoàng/Hắc đạo supplementary; `安碓磑` không nằm trong five-activity Hắc đạo blocker list hiện production.

## Product mapping

- activity code: `DAT_COI_XAY_GIA`;
- title: **Đặt cối xay, giã**;
- source label: `安碓磑`;
- route: `/dat-coi-xay-gia`;
- API: `/date-selection/dat-coi-xay-gia`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `dat-coi-xay-gia-rules.spec.ts`: exact 2 Nên / 11 Kị + negative Bình/Thu/Bế/Ngũ Mộ/Tử Thần;
- `dat-coi-xay-gia-conflict.spec.ts`: Bình/Tử Thần không Kị, Nguyệt Phá/Thổ Phủ, Thổ Phù/Địa Nang, Thổ Vượng, Khai/Tam Hợp và shared annotations;
- `han-q11-oracle.spec.ts`: independent fixture `安碓磑`;
- `han-q10-semantic-oracle.spec.ts`: independent negative Bình/Tử Thần và chuyên Kị đất.
