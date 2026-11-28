# Chăn thả gia súc, gia cầm / 牧養 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Việt Tập I p.861 và Hán Q11 `WYG_011-24b..25a` khớp trực tiếp **13 Nên / 13 Kị**.

### Nên — 13 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Mẫu Thương, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Dân Nhật, Khai nhật, Ngũ Phú.

### Kị — 13 mục

Nguyệt Phá, Bình nhật, Tử Thần, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Thiên Lại, Tứ Phế, Ngũ Mộ.

## Q10 semantics

### Cát thần trực tiếp

Q10 ghi `牧養` trong Nên của Thiên/Nguyệt Đức và Đức Hợp (`WYG_010-8a..8b`), Thiên Xá (`10a..10b`), Mẫu Thương (`10b..11a`), Thiên Nguyện (`11b..12a`), Nguyệt Ân/Tứ Tướng/Thời Đức (`12b..13a`), Dân Nhật (`14a`), Khai nhật (`21b..22a`) và Ngũ Phú (`23a..23b`).

### Bình nhật / Tử Thần

Q10 `WYG_010-31a..32b` ghi Bình nhật Kị `牧養`; cùng heading `平日(死神)` còn ghi riêng `死神忌...牧養納畜`. Production giữ **hai contribution riêng**:

- `TRUC:BINH`;
- `TU_THAN`.

Hai target có thể dùng cùng monthly branch logic Q10 nhưng không canonical hóa thành một identity. Các tháng hội cát/hung có thể giải, cân bằng, delegate hoặc nâng thành hard-day theo đúng matrix nguồn.

### Nguyệt Phá / Tam Sát / Nguyệt Hình / Nguyệt Yếm / Đại Thời / Thiên Lại

Production tái dùng full Q10 matrix đã source-lock của họ earthwork cho các target cùng semantic. Không viết lại blanket Kị, vì Q10 có nhiều nhánh tháng:

- cát thắng → bỏ Kị;
- cát/hung cân bằng → không Nên không Kị;
- `從...論` → delegate;
- hội hung nặng → `諸事皆忌`.

### Nguyệt Hại

Q10 `WYG_010-45b..46b` liệt kê `牧養` trong Kị Nguyệt Hại. Các tháng Mão/Dậu hoặc Sửu/Mùi gặp Đức có thể chỉ còn Kị quân sự/y bệnh; Thìn/Tuất gặp Đức Hợp cân bằng; các tháng hội Nguyệt Sát/Kiếp Sát/Nguyệt Hình/Bình nhật theo rule nặng hơn. Production tái dùng exact branch Nguyệt Hại đã source-lock, đổi activity target nhưng không đổi precedence.

### Tứ Phế

Q10 `WYG_010-58a..58b` liệt kê `牧養` trong Kị Tứ Phế và ghi `與德合併猶忌`; gặp Nguyệt Phá còn nâng thành `諸事皆忌`.

### Ngũ Mộ

Q10 `WYG_010-60b..61a` liệt kê `牧養` trong Kị Ngũ Mộ; **tháng 5 và tháng 11 gặp Nguyệt Đức thì không Kị**. Production giữ đúng relief riêng này.

### Tử Khí không phải Kị 牧養

Q10 `WYG_010-55b..56a` nói rõ `死神忌進人口牧養納畜而死氣不忌者...`. Vì vậy Q11 có Tử Thần nhưng **không có Tử Khí**, và production tuyệt đối không clone `TU_KHI` từ Trồng trọt sang Chăn thả.

## Shared calendar annotations

`牧養` không nằm trong các exemption đặc biệt của Vô Lộc / Thượng Sóc-Tứ Ly-Tứ Tuyệt-Hối như Quét dọn, Trang trí tường hay Sửa đường. Shared Q10 layer áp policy thông thường.

Riêng `月忌日` (`WYG_010-71a..71b`) không liệt kê `牧養` trong nhóm được chú, nên production có rule **bỏ Nên, không tự tạo Kị**.

## Product mapping

- code: `CHAN_THA_GIA_SUC_GIA_CAM`;
- title: **Chăn thả gia súc, gia cầm**;
- Hán: `牧養`;
- route: `/chan-tha-gia-suc-gia-cam`;
- API: `/date-selection/chan-tha-gia-suc-gia-cam`.

## Oracle/tests

- baseline exact 13 Nên / 13 Kị;
- Bình nhật và Tử Thần là hai target riêng;
- Nguyệt Hại source-resolved;
- Ngũ Mộ relief tháng 5/11 + Nguyệt Đức;
- Tử Khí không được tạo Kị;
- Nguyệt Kị chỉ bỏ Nên;
- independent Q10/Q11 oracle + service/controller/monthly integration.
