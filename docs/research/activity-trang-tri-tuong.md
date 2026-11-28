# Trang trí tường / 修飾垣墻 — source lock

Status: ORACLE_TESTED / PRODUCTION_WITH_DISCREPANCY

## Q11 baseline

Nguồn:

- Việt Tập I p.859, mục **Trang trí tường**;
- Hán Q11 `WYG_011-22b..23a`, mục `修飾垣墻`;
- Hán Q10 `WYG_010-19a`, mục `平日`.

### Nên — 1 mục

- Bình nhật / `平日`.

Hán Q11 ghi trực tiếp `宜平日`; Hán Q10 cũng ghi `平日 宜修飾垣墻平治道塗`. Exact Việt p.859 **lược toàn bộ dòng Nên** và đi thẳng vào dòng Kị. Sai khác được đăng ký bằng `Q11_TRANG_TRI_TUONG_VIET_THIEU_BINH_NHAT`.

Production policy: **giữ Bình nhật là Nên** theo Hán Q11 + Q10 đồng thuận. Rule Nên chỉ mang Hán provenance; không gắn bản Việt p.859 như thể bản Việt có in điều này.

### Kị — 11 mục

Thổ Phủ, Nguyệt Phá, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Tứ Phế, Thổ Phù, Địa Nang, sau Thổ Vượng dụng sự.

11 Kị trên khớp trực tiếp Việt p.859 và Hán Q11.

## Q10 semantics

Production lọc full earthwork resolver theo đúng 11 target Q11, giữ các global hard-day rules và bỏ `boNen` đặc thù Động thổ/Sửa cung thất.

### Bình nhật / Tử Thần

Q10 `WYG_010-19a` nêu Bình nhật là **Nên** `修飾垣墻`.

Trong `平日(死神)` ở `WYG_010-31b..33a`, `修飾垣墻` lại nằm trong nhóm `止不忌`; phần chú giải nhắc lại `不忌...修飾垣墻`. Tử Thần vì vậy không tạo Kị riêng cho activity này.

### Nguyệt Phá

Q10 `WYG_010-29a..30b` liệt kê `修飾垣墻` trong Kị Nguyệt Phá và ghi gặp bốn Đức/Hợp vẫn Kị. Các hard overlap `諸事皆忌` tiếp tục được giữ qua full resolver.

### Kiếp/Tai/Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm

Tái dùng nguyên source-resolved monthly branches Q10: cát relief, cân bằng, delegate và hard-all theo tháng. Không giản lược thành blanket rule.

### Tứ Phế

Q10 `WYG_010-58a..58b` liệt kê `修飾垣墻` trong Kị Tứ Phế; `與德合併猶忌`.

### Thổ Phù / Địa Nang

Q10 `WYG_010-62a..62b`:

`土符 地囊 ... 忌 ... 修飾垣墻 ... 與德合赦願併猶忌`

Hai factor giữ Kị dù gặp Đức/Hợp, Thiên Xá hoặc Thiên Nguyện.

### Thổ Vượng dụng sự

Q10 `WYG_010-70b` liệt kê `修飾垣墻` trong Kị `土王用事`, nghĩa cùng Thổ Phủ. Production dùng typed calendar condition `THO_VUONG`.

## Exact shared exemptions

`修飾垣牆` nằm trong các danh sách được miễn/được chú của Q10:

- `無祿日`: danh sách `止註` có `修飾垣牆`;
- `上朔 四離 四絶 晦日`: danh sách `止不忌` có `修飾垣牆`;
- `月忌日`: danh sách `止註` có `修飾垣牆`.

Do đó Vô Lộc không bỏ Nên; Thượng Sóc/Tứ Ly/Tứ Tuyệt không thêm generic Kị; Hối không bỏ Nên; Nguyệt Kị cũng không suppress Bình nhật Nên.

## Q7

Hoàng/Hắc đạo supplementary; `修飾垣墻` không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- activity code: `TRANG_TRI_TUONG`;
- title: **Trang trí tường**;
- source label: `修飾垣墻`;
- route: `/trang-tri-tuong`;
- API: `/date-selection/trang-tri-tuong`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `trang-tri-tuong-rules.spec.ts`: Bình nhật Hán-only provenance + exact 11 Kị Việt/Hán + negative Thu/Bế/Ngũ Mộ/Tử Thần;
- `trang-tri-tuong-conflict.spec.ts`: Bình/Tử Thần, Nguyệt Phá, Thổ Phủ, Thổ Phù/Địa Nang, Thổ Vượng, exact shared exemptions và global hard-day;
- `han-source-discrepancies.spec.ts`: Việt p.859 thiếu Bình nhật;
- `han-q11-oracle.spec.ts`: independent Hán fixture `修飾垣墻`;
- `han-q10-semantic-oracle.spec.ts`: independent Bình/Tử Thần + shared exemption checks.
