# Quét dọn nhà cửa / 掃舍宇 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.859, mục **Quét dọn nhà cửa**;
- Hán Q11 `WYG_011-22b`, mục `掃舍宇`.

Q11 ghi:

- **Nên:** Trừ nhật / `除日`; Trừ Thần / `除神`;
- **Kị:** không / `忌無`.

Production canonicalize `除神` bằng factor `NGU_LY / 五離`, vốn có alias verified `Trừ Thần` từ Q5.

## Q10 semantics

`忌無` không có nghĩa bỏ các ngày mà Q10 nói thẳng `諸事皆忌`. Production tái dùng exact global-hard-only resolver đã source-lock cho `入學`, gồm các hard overlap của Nguyệt Phá, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Q4 hard-day set và Tứ Phế + Nguyệt Phá. Không tạo baseline hung contribution giả.

### Trừ nhật

Q10 `WYG_010-17b..18a`:

`除日 ... 宜解除沐浴整容剃頭整手足甲求醫療病掃舍宇`

Đây là Nên trực tiếp của activity.

### Nguyệt Phá / Bình / Thu / Tứ Phế thường không Kị

Q10 đặt `掃舍宇` trong nhóm `止不忌` của các mục hung tương ứng, ví dụ:

- Nguyệt Phá `WYG_010-29b`: `止不忌 ... 掃舍宇 ...`;
- Bình nhật `WYG_010-31b..32a`: `止不忌 ... 掃舍宇 ...`;
- Thu nhật `WYG_010-35a`: `止不忌 ... 掃舍宇 ...`;
- Tứ Phế `WYG_010-58a..58b`: `止不忌 ... 掃舍宇 ...`.

Vì vậy production không clone Kị thường từ các vertical khác. Chỉ khi một tổ hợp Q10 được nâng thành `諸事皆忌` thì global-hard resolver mới chặn.

### Vô Lộc — explicit exemption

Q10 `WYG_010-67a..68b`:

`無祿日 止註祭祀解除沐浴整容剃頭整手足甲掃舍宇修飾垣墻平治道塗破屋壞垣伐木餘事不註`

Do đó `掃舍宇` được thêm vào exact exemption set của shared annotation: Vô Lộc không bỏ Nên activity này.

### Thượng Sóc / Tứ Ly / Tứ Tuyệt / Hối — explicit exemption

Q10 `WYG_010-69a..69b`:

`上朔 四離 四絶 晦日 止不忌祭祀解除沐浴整容剃頭整手足甲補垣塞穴掃舍宇...`

Quét dọn nhà cửa thuộc nhóm miễn. Production không thêm generic Kị cho Thượng Sóc/Tứ Ly/Tứ Tuyệt và không dùng Hối nhật để bỏ Nên.

### Nguyệt Kị nhật

Q10 `WYG_010-71a..71b`:

`月忌日 止註祭祀宴㑹沐浴整容剃頭整手足甲求醫療病補垣掃舍宇修飾垣牆平治道塗餘事不註`

Vì `掃舍宇` nằm trong danh sách được chú, production không tạo suppressor Nguyệt Kị cho activity này.

## Q7

Hoàng/Hắc đạo supplementary; `掃舍宇` không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- activity code: `QUET_DON_NHA_CUA`;
- title: **Quét dọn nhà cửa**;
- source label: `掃舍宇`;
- route: `/quet-don-nha-cua`;
- API: `/date-selection/quet-don-nha-cua`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `quet-don-nha-cua-rules.spec.ts`: exact 2 Nên / 0 Kị + provenance;
- `quet-don-nha-cua-conflict.spec.ts`: ordinary hung non-Kị, Vô Lộc/special-day exemptions, Nguyệt Kị allowed, global hard-day still wins;
- `q10-shared-calendar-annotations.spec.ts`: exact shared exemption matrix;
- `han-q11-oracle.spec.ts`: independent fixture `掃舍宇`;
- `han-q10-semantic-oracle.spec.ts`: independent ordinary-hung/exemption/hard-day semantics.

## Blocked adjacent section: 補垣塞穴

Không gộp `補垣塞穴` thành một vertical hiện tại. Q11 ghi `土王用事後止忌補垣`; Q10 còn ghi:

`凡土府土符地囊止註忌補垣亦不註宜塞穴`

Tức là Thổ Phủ/Thổ Phù/Địa Nang chỉ **Kị vá tường**, nhưng đối với **lấp hố/hang** cũng không được ghi Nên. Contract hiện chỉ có activity-level verdict, không có subtype để biểu diễn đúng hai outcome này. Cần tách `補垣` / `塞穴` hoặc thêm subtype trước khi productionize.
