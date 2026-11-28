# Phá nhà, hủy tường / 破屋壞垣 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Việt Tập I p.860, mục **Phá nhà, hủy tường**, và Hán Q11 `WYG_011-23a..23b` khớp trực tiếp:

- **Nên:** Nguyệt Phá / `月破`;
- **Kị:** Nguyệt Kiến, Thổ Phủ, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Thổ Phù, Địa Nang, sau Thổ Vượng dụng sự.

Tổng: **1 Nên / 10 Kị**.

Đây là vertical đảo chiều quan trọng: `月破` là Nên, không phải Kị.

## Q10 semantics

### Nguyệt Phá là Nên

Q10 `月破` ghi `止不忌 ... 破屋壞垣 ...`. Q11 đi xa hơn và ghi trực tiếp `宜月破`.

Production giữ một contribution Nên `NGUYET_PHA`; không tái dùng baseline Kị Nguyệt Phá của các vertical khác.

### Tai Sát `從月破論`

Q10 `災煞` ở tháng Tý/Ngọ/Mão/Dậu ghi `值破日從月破論`. Với `破屋壞垣`, vì Nguyệt Phá là Nên, nhánh delegate sang Nguyệt Phá phải **bỏ Kị Tai Sát và giữ Nên Nguyệt Phá**. Production remap riêng `DELEGATE → NGUYET_PHA` thành `BO_KY`; không thay resolver chung.

### Cân bằng phải triệt Nên Nguyệt Phá

Các nhánh Q10 kiểu:

`凡所忌者則不註宜 所宜者亦不註忌`

được production biểu diễn bằng `CAN_BANG`. Vì activity này có source Nên `月破`, mọi `CAN_BANG` applicable phải loại cả:

- contribution Kị của hung target;
- contribution Nên Nguyệt Phá.

Ví dụ Kiếp Sát tháng Tứ Mộ không gặp đủ Đức: verdict đúng là **không Nên, không Kị**, chứ không được giữ Nên Nguyệt Phá.

### Nguyệt Kiến / Thổ Phủ

Q10 `WYG_010-27a..28a` liệt kê `破屋壞垣` trong Kị Nguyệt Kiến và chuyên Kị Thổ Phủ. Gặp nhóm cát được nêu, `破屋壞垣` vẫn nằm trong residual earthwork list nên Kị vẫn hiệu lực.

### Kiếp/Tai/Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm

Production tái dùng full monthly Q10 matrix cho các target này, nhưng:

- hard `CAM_MOI_VIEC` lấy từ global-hard-only subset;
- `CAN_BANG` thêm explicit `boNen: NGUYET_PHA`;
- delegate về Nguyệt Phá được remap như trên.

Nhờ vậy các nhánh cát relief, cân bằng, delegate và `諸事皆忌` đều giữ đúng source mà không biến Nguyệt Phá thành Kị giả.

### Thổ Phù / Địa Nang / Thổ Vượng

Q10 `土符 地囊` và `土王用事` đều liệt kê `破屋壞垣` trong Kị. Thổ Phù/Địa Nang gặp Đức/Hợp, Thiên Xá hoặc Thiên Nguyện vẫn Kị; Thổ Vượng dùng typed calendar condition `THO_VUONG`.

## Shared calendar annotations

### Vô Lộc — được miễn

Q10 `無祿日` allowed-note list có `破屋壞垣`, nên Vô Lộc không bỏ Nên Nguyệt Phá.

### Thượng Sóc / Tứ Ly / Tứ Tuyệt / Hối — được miễn

Q10 `WYG_010-69a..69b`:

`止不忌 ... 平治道塗破屋壞垣伐木 餘事皆忌`

`破屋壞垣` thuộc exact exemption list, nên không nhận generic Kị/bỏ Nên từ shared layer.

### Nguyệt Kị — không được chú Nên

Q10 `月忌日` allowed-note list dừng ở `平治道塗`; không có `破屋壞垣`. Production vì vậy thêm global `BO_NEN` riêng:

- bỏ Nên Nguyệt Phá;
- **không tự tạo Kị**.

## Q7

Hoàng/Hắc đạo supplementary; `破屋壞垣` không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- code: `PHA_NHA_HUY_TUONG`;
- title: **Phá nhà, hủy tường**;
- Hán: `破屋壞垣` (`破屋壊垣` trong Kanripo glyph variant);
- route: `/pha-nha-huy-tuong`;
- API: `/date-selection/pha-nha-huy-tuong`.

## Oracle/tests

- `pha-nha-huy-tuong-rules.spec.ts`: exact 1 Nên / 10 Kị + Việt/Hán provenance;
- `pha-nha-huy-tuong-conflict.spec.ts`: Nguyệt Phá Nên, Tai Sát delegate, CAN_BANG bỏ Nên, Nguyệt Kị suppress-only, shared exemptions, earth blockers và hard-day;
- `han-q11-oracle.spec.ts`: independent fixture `破屋壞垣`;
- `han-q10-semantic-oracle.spec.ts`: independent inverse Nguyệt Phá semantics.
