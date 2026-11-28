# Sửa sang đường sá / 平治道塗 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Việt Tập I p.859 và Hán Q11 `WYG_011-23a` khớp trực tiếp:

- **Nên:** Bình nhật / `平日`;
- **Kị:** Thổ Phủ, Nguyệt Yếm, Thổ Phù, Địa Nang, sau Thổ Vượng dụng sự.

Tổng: **1 Nên / 5 Kị**.

## Q10 semantics

### Bình nhật

Q10 `WYG_010-19a`: `平日 宜修飾垣墻平治道塗`. Bình nhật là Nên trực tiếp.

### Ordinary hung không tự Kị

Q11 không có Nguyệt Phá, Tam Sát, Nguyệt Hình hay Tứ Phế. Q10 còn đặt `平治道塗` trong nhóm `止不忌` của một số hung như Kiếp Sát và Nguyệt Hình. Production vì vậy không kéo các baseline Kị đất khác sang.

Tuy nhiên, các tổ hợp Q10 ghi `諸事皆忌` vẫn áp dụng toàn cục. Resolver ghép:

- 5 target-specific earthwork rules của Q11;
- global-hard-only subset đã source-lock ở Nhập học.

Cách này tránh cả overblock ordinary hung lẫn bỏ sót hard-day.

### Nguyệt Yếm

Nguyệt Yếm là Kị Q11. Production dùng full source-resolved Q10 branches: theo tháng có thể giữ Kị, cân bằng, được Đức giải hoặc nâng thành chư sự giai kị. Ví dụ tháng Dần gặp Nguyệt Đức thì Kị sửa đường được giải.

### Thổ Phủ

Q10 `月建(土府)` liệt kê `平治道塗` trong chuyên Kị của Thổ Phủ và vẫn nằm trong residual earthwork list sau cát relief.

### Thổ Phù / Địa Nang

Q10 `WYG_010-62a..62b`: `土符 地囊` Kị `平治道塗`; gặp Đức/Hợp, Thiên Xá hoặc Thiên Nguyện vẫn Kị.

### Thổ Vượng dụng sự

Q10 `WYG_010-70b`: `土王用事` Kị `平治道塗`, nghĩa cùng Thổ Phủ. Production dùng typed condition `THO_VUONG`.

## Exact exemptions

`平治道塗` nằm trong exact lists của Q10:

- `無祿日`: được chú, nên Vô Lộc không bỏ Nên;
- `上朔 四離 四絶 晦日`: thuộc nhóm miễn, nên không generic Kị/bỏ Nên;
- `月忌日`: thuộc allowed-note list, nên không suppress Bình nhật Nên.

## Q7

Hoàng/Hắc đạo supplementary; activity không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- code: `SUA_SANG_DUONG_SA`;
- title: **Sửa sang đường sá**;
- Hán: `平治道塗`;
- route: `/sua-sang-duong-sa`;
- API: `/date-selection/sua-sang-duong-sa`.
