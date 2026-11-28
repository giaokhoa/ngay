# Nhận, nạp gia súc / 納畜 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.861–862, mục **Nhận, nạp gia súc**;
- Hán Q11 `WYG_011-25a`, mục `納畜`.

### Nên — 13 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Mẫu Thương, Thiên Nguyện, Dân Nhật, Tam Hợp, Thu nhật, Lục Hợp, Ngũ Phú, Thiên Thương.

### Kị — 13 mục

Nguyệt Phá, Bình nhật, Tử Thần, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Thiên Lại, Tứ Phế, Ngũ Mộ.

Việt p.861–862 và Hán Q11 khớp direct **13/13**.

## Quan hệ với 牧養

Q11 cho `牧養` và `納畜` **cùng exact 13 Kị** nhưng 13 Nên khác nhau.

Q10 phần 鋪註條例 ghi:

`凡吉凶相抵不註忌牧養亦不註忌納畜不註忌納畜亦不註忌牧養`

Nghĩa là khi cát–hung cân bằng làm không chú Kị một activity thì activity còn lại cũng không chú Kị. Production vì vậy tái dùng nguyên conflict semantics của `牧養`, nhưng giữ baseline Nên/Q11 identity riêng cho `納畜`.

## Q10 semantics

### Thu nhật / 收日 — Nên, không Kị

Q10 ghi `收日 宜進人口納財捕捉納畜`. Phần chú giải cũng nêu rõ Thu nhật không Kị `納畜`.

Do đó `TRUC:THU` là Nên riêng của `納畜`; không được kéo Thu nhật Kị từ các vertical khác.

### Tử Thần / 死神 và Tử Khí / 死氣

Q10 `平日(死神)` Kị `牧養納畜`; production giữ Tử Thần như target riêng, cùng exact Bình-day resolver.

Q10 chú rõ:

`死神忌進人口牧養納畜而死氣不忌者...`

Vì vậy `TU_KHI` không phải Kị của `納畜`, giống `牧養`.

### Nguyệt Hại / Nguyệt Yếm / các Kị chung

`納畜` dùng cùng exact Q10 branches với `牧養` cho:

- Nguyệt Phá;
- Bình/Tử Thần;
- Kiếp/Tai/Nguyệt Sát;
- Nguyệt Hình;
- Nguyệt Hại;
- Nguyệt Yếm;
- Đại Thời;
- Thiên Lại;
- Tứ Phế;
- Ngũ Mộ.

Đặc biệt, Dần/Thân/Sửu/Mùi gặp cát thì `納畜` không nằm trong residual Kị của Nguyệt Yếm, nên được giải như `牧養`, khác `栽種`.

### Trường Tinh / Đoản Tinh — Q10-only supplemental Kị

Q10 `WYG_010-71b..72a`:

`長星 短星 忌進人口裁製經絡開市立劵交易納財納畜`

Hai sao này **không xuất hiện trong exact Q11 13 Kị**, nên production không đưa chúng vào baseline Q11. Chúng được encode ở conflict layer bằng `THEM_KY`:

- `TRUONG_TINH` → supplemental Kị `納畜`;
- `DOAN_TINH` → supplemental Kị `納畜`.

Đây là cùng pattern đã dùng cho May đo/Nạp tài.

### Nguyệt Kị nhật

Q10 `月忌日` không liệt kê `納畜` trong danh sách được chú (`餘事不註`). Production vì vậy **bỏ Nên nhưng không tự tạo Kị**.

## Shared calendar annotations

`納畜` không thuộc exact exemption lists của Vô Lộc hay Thượng Sóc/Tứ Ly/Tứ Tuyệt/Hối:

- Vô Lộc: bỏ Nên;
- Thượng Sóc / Tứ Ly / Tứ Tuyệt: Kị bổ sung;
- Hối nhật: bỏ Nên.

## Q7

Hoàng/Hắc đạo supplementary; `納畜` không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- activity code: `NHAN_NAP_GIA_SUC`;
- title: **Nhận, nạp gia súc**;
- source label: `納畜`;
- route: `/nhan-nap-gia-suc`;
- API: `/date-selection/nhan-nap-gia-suc`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `nhan-nap-gia-suc-rules.spec.ts`: exact 13 Nên / 13 Kị; negative Trường/Đoản Tinh không pollute Q11;
- `nhan-nap-gia-suc-conflict.spec.ts`: Thu nhật Nên, exact shared Kị, Tử Khí non-Kị, Nguyệt Hại/Yếm relief, Trường/Đoản Tinh supplemental, Nguyệt Kị suppressor;
- `han-q11-oracle.spec.ts`: independent fixture `納畜`;
- `han-q10-semantic-oracle.spec.ts`: independent shared semantics + Q10-only Trường/Đoản Tinh.
