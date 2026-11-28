# Trồng trọt / 栽種 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.861, mục **Trồng trọt**;
- Hán Q11 `WYG_011-24b`, mục `栽種`.

### Nên — 13 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Mẫu Thương, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Dân Nhật, Khai nhật, Ngũ Phú.

### Kị — 21 mục

Nguyệt Kiến, Thổ Phủ, Nguyệt Phá, Bình nhật, Tử Thần, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Địa Hỏa, Đại Thời, Thiên Lại, Tử Khí, Tứ Phế, Ngũ Mộ, Cửu Tiêu, Thổ Phù, Địa Nang, Ất nhật, sau Thổ Vượng dụng sự.

Việt p.861 và Hán Q11 khớp direct **13/21**.

## Identity: 九坎 / 九焦

Q5 đặt `九坎〈九焦〉` cùng một vị trí ngày và Q10 dùng hai tên theo loại việc:

- `九坎` Kị đi thuyền/vượt nước;
- `九焦` Kị đúc, trồng trọt, sửa vườn tược.

Production không tạo factor trùng lặp: dùng canonical `CUU_KHAM`, thêm alias **Cửu Tiêu**, UI hiển thị **Cửu Khảm / Cửu Tiêu**. Công thức ngày lấy từ bảng Q5 đã source-lock.

## Q10 semantics

### Earthwork-shared targets

Nguyệt Kiến, Thổ Phủ, Nguyệt Phá, Bình nhật, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Đại Thời, Thiên Lại, Tứ Phế, Ngũ Mộ, Thổ Phù, Địa Nang và Thổ Vượng tái dùng full Q10 earthwork matrix, không viết lại blanket rule.

### Tử Thần / 死神

Tử Thần cùng vị trí Bình nhật nhưng Q11 liệt kê riêng. Production clone exact Bình-day resolver sang target `TU_THAN`, giữ contribution độc lập.

### Nguyệt Yếm + Địa Hỏa / 月厭〈地火〉

Q10 ghi `又為地火忌栽種修築園圃`.

Điểm source-critical: ở các nhánh Dần/Thân/Sửu/Mùi gặp cát, câu kết vẫn liệt kê `栽種` trong residual Kị (`...般移遠迴栽種餘皆不忌`). Vì vậy production override generic earthwork branch:

- Nguyệt Yếm **vẫn Kị Trồng trọt** trong nhánh này;
- Địa Hỏa đồng thời vẫn Kị;
- không được “giải ké” Trồng trọt theo các việc đất khác.

### Tử Khí / 死氣

Tái dùng exact Q10 Tử Khí branch đã source-lock:

- gặp Thiên Đức / Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp thì Kị trồng trọt được giải;
- riêng tháng Thìn/Tuất hội Nguyệt Yếm vẫn Kị dù gặp Đức.

### Cửu Tiêu / 九焦

Q10 `WYG_010-61b..62a`:

`又為九焦忌鼓鑄栽種修築園圃` và `與德合併猶忌`.

Do đó `CUU_KHAM` khi dùng cho Trồng trọt mang nghĩa Cửu Tiêu và vẫn Kị dù gặp Đức/Hợp.

### Thổ Phù / Địa Nang

Q10 giữ Kị dù gặp Đức/Hợp, Thiên Xá hoặc Thiên Nguyện.

### Ất nhật / 乙日

Q10 百忌日 ghi `乙不栽植千株不長`; Q11 cũng ghi trực tiếp `乙日`. Production dùng typed `CAN_NGAY: AT`, không tạo thần sát giả.

### Thổ Vượng dụng sự

Q10 ghi `土王用事` Kị `栽種`; production dùng typed `THO_VUONG`.

### Nguyệt Kị nhật / 月忌日

Q10 `WYG_010-71a..71b` chỉ cho phép chú một danh sách hẹp; `栽種` không nằm trong đó (`餘事不註`). Production vì vậy **bỏ Nên nhưng không tự tạo Kị** vào Nguyệt Kị nhật.

## Shared calendar annotations

`栽種` không thuộc các exemption list của Vô Lộc hay Thượng Sóc/Tứ Ly/Tứ Tuyệt/Hối:

- Vô Lộc: bỏ Nên;
- Thượng Sóc / Tứ Ly / Tứ Tuyệt: Kị bổ sung;
- Hối nhật: bỏ Nên.

## Q7

Hoàng/Hắc đạo supplementary; `栽種` không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- activity code: `TRONG_TROT`;
- title: **Trồng trọt**;
- source label: `栽種`;
- route: `/trong-trot`;
- API: `/date-selection/trong-trot`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `trong-trot-rules.spec.ts`: exact 13 Nên / 21 Kị;
- `trong-trot-conflict.spec.ts`: earthwork targets, Tử Thần, Nguyệt Yếm+Địa Hỏa residual, Tử Khí, Cửu Tiêu, Thổ Phù/Địa Nang, Ất nhật, Thổ Vượng, Nguyệt Kị/shared annotations;
- `han-q11-oracle.spec.ts`: independent fixture `栽種`;
- `han-q10-semantic-oracle.spec.ts`: independent Q10 residual/suppression semantics.
