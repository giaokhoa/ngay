# Mở kho xuất hàng, tiền / 開倉庫出貨財 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.858 (working scan PDF page 865), mục **Mở kho tàng xuất hàng, tiền**;
- Hán Q11 `WYG_011-21a..21b`, mục `開倉庫出貨財`.

### Nên — 5 mục

Nguyệt Ân, Tứ Tướng, Thời Đức, Mãn nhật, Ngũ Phú.

### Kị — 23 tên nguồn / 22 điều kiện canonical

Q11 liệt kê:

Nguyệt Kiến, Nguyệt Phá, Đại Hao, Bình nhật, Thu nhật, Bế nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hư, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Thiên Lại, Tiểu Hao, Thiên Tặc, Tứ Hao, Tứ Phế, Tứ Cùng, Ngũ Hư, Cửu Không, ngày Giáp.

`月煞〈月虚〉` là cùng một vị trí/identity theo Q6/Q10; production vì vậy dùng **một** factor `NGUYET_SAT`, không tạo `NGUYET_HU` song song. Baseline runtime có 22 điều kiện Kị nhưng provenance giữ rõ Q11 in cả hai tên.

Việt p.858 và Hán Q11 khớp nội dung; không có discrepancy mới.

## Q10 semantics

### Nguyệt Kiến

Q10 `WYG_010-27a..28b` Kị `開倉庫出貨財`, nhưng gặp Thiên/Nguyệt Đức, Đức Hợp, Thiên Xá, Nguyệt Ân hoặc Tứ Tướng thì residual Kị chỉ còn nhóm đất/xây dựng và sửa kho; **mở kho xuất hàng tiền được giải**.

Ngoại lệ bắt buộc:

- tháng Mùi ngày Kỷ Mùi là Dương Thác;
- nếu chỉ có Thiên Đức Hợp thì không lấy Đức Hợp để giải Kị;
- nếu có cát khác trong exact set vẫn theo branch cát tương ứng.

Production dùng target `NGUYET_KIEN`, không đánh đồng identity với Trực Kiến trong baseline này.

### Nguyệt Phá / Đại Hao / Bình / Thu / Bế / tam sát / Nguyệt Hình-Hại-Yếm / Đại Thời / Thiên Lại / Tiểu Hao / Tứ Hao / Tứ Phế / Tứ Cùng / Cửu Không

Các target này dùng exact branch Q10 đã source-lock ở resolver Khai trương, lọc theo đúng baseline Mở kho và bỏ toàn bộ `boNen` activity-specific của Khai trương. Universal `諸事皆忌` vẫn áp.

### Nguyệt Sát / Nguyệt Hư

Q10 ghi:

`月煞(月虚/) 忌同刼煞 又為月虚忌修倉庫開倉庫出貨財`

Đây là một factor canonical nhưng có nghĩa bổ sung cho kho. Branch semantics:

- Mão/Dậu gặp Nguyệt Đức + Thiên Nguyện: các việc ngoài residual quân sự/y trị được giải, nên Mở kho bỏ Kị;
- Tý/Ngọ + Nguyệt Đức Hợp: cân bằng, không chú Nên/Kị tương ứng;
- nhóm còn lại thiếu Đức/Hợp có thể thành `諸事皆忌` theo exact Q10 branch.

Regression khóa một contribution `NGUYET_SAT` duy nhất, không nhân đôi vì alias `月虚`.

### Thiên Tặc

Q10 `WYG_010-56b`:

`天賊 忌行幸遣使修倉庫開倉庫出貨財 與德合併猶忌`

Thiên Tặc vẫn Kị Mở kho dù gặp Đức/Hợp. Resolver dùng `GIU_KY_DU_CO_CAT` để lưu dấu provenance khi cát cùng xuất hiện.

### Ngũ Hư

Factor foundation exact từ Việt Q5 p.444–445 + Hán `WYG_005-47b..48a`:

- Xuân: Tỵ–Dậu–Sửu;
- Hạ: Thân–Tý–Thìn;
- Thu: Hợi–Mão–Mùi;
- Đông: Dần–Ngọ–Tuất.

Q10 `WYG_010-59b..60a`:

`五虚 忌修倉庫開倉庫出貨財 與天德月德天德合月德合六合併則不忌`

Production bỏ Kị Ngũ Hư khi gặp một trong Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp hoặc Lục Hợp; nếu không thì giữ Kị.

### Ngày Giáp

Q10 `百忌日 WYG_010-72a`:

`甲日忌開倉庫出貨財`

Đây là direct typed baseline `CAN_NGAY:GIAP`, không tạo factor thần sát giả.

### Shared calendar annotations

Vertical đi qua shared Q10 layer:

- Vô Lộc: ngoài nhóm miễn → bỏ Nên, không tự Kị;
- Thượng Sóc/Tứ Ly/Tứ Tuyệt: ngoài nhóm miễn → Kị bổ sung;
- Hối nhật: chỉ bỏ Nên.

## Q7

Hoàng/Hắc đạo Q7 supplementary, không blanket-block Mở kho xuất hàng, tiền.

## Product mapping

- activity code: `MO_KHO_XUAT_HANG_TIEN`;
- title: **Mở kho xuất hàng, tiền**;
- source label: `開倉庫出貨財`;
- route: `/mo-kho-xuat-hang-tien`;
- API: `/date-selection/mo-kho-xuat-hang-tien`.

## Oracle/tests

- `mo-kho-xuat-hang-tien-rules.spec.ts`: exact 5 Nên / 22 canonical Kị + alias lock;
- `mo-kho-xuat-hang-tien-conflict.spec.ts`: Nguyệt Kiến/Kỷ Mùi, Ngũ Hư relief, Thiên Tặc residual, Giáp nhật, 月煞/月虚 canonical, shared annotations;
- `han-q11-oracle.spec.ts`: independent canonical fixture `開倉庫出貨財`;
- `han-q10-semantic-oracle.spec.ts`: independent Q10 behavior for the warehouse-specific branches.
