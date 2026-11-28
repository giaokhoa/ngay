# Chỉnh dung, cắt tóc / 整容剃頭 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.853 (working scan PDF page 860), mục **Trang điểm dung nhan, cạo đầu, cắt tóc**;
- Hán Q11 `WYG_011-16a`, mục `整容剃頭`.

### Nên — 3 mục

- ngày Trừ;
- Giải Thần / `解神`;
- Trừ Thần / `除神`, production identity dùng alias Ngũ Ly / `五離` (`NGU_LY`).

### Kị — 10 mục

- Nguyệt Kiến / Trực Kiến;
- Nguyệt Phá;
- Kiếp Sát;
- Tai Sát;
- Nguyệt Sát;
- Nguyệt Hình;
- Nguyệt Yếm;
- ngày **Đinh**;
- ngày âm **12**;
- ngày âm **15**.

Hai condition cuối cùng dùng typed `NGAY_AM` lấy từ lunar day tính theo Sóc thiên văn và timezone; ngày Đinh dùng typed `CAN_NGAY`, không string-parse Can-Chi.

## Q10 semantics

### Ngày Đinh: Kị + bỏ Nên

Q10 `百忌日` ghi `丁日忌剃頭`; phần `表例` `WYG_010-74b` ghi rõ:

`凡丁日忌剃頭亦不註宜整容`

Production vì vậy:

- giữ Kị ngày Đinh từ Q11;
- đồng thời áp global `BO_NEN` để bỏ mọi contribution Nên chỉnh dung/cắt tóc trên ngày Đinh.

### Ngày âm 12 và 15

Q11 ghi trực tiếp `每月十二日十五日`; lunar context production match exact ngày âm 12/15. Hai ngày này tạo Kị trực tiếp; không tự suy thêm “bỏ Nên” khi Q10 không có câu tương ứng.

### Nguyệt Kiến

Dùng cùng source-resolved branch Q10 đã khóa cho các activity tương ứng:

- gặp Đức/Hợp, Thiên Xá, Nguyệt Ân hoặc Tứ Tướng → Kị thường được giải;
- tháng Mùi ngày Kỷ Mùi không lấy riêng Thiên Đức Hợp để giải Kị.

### Nguyệt Phá và sáu hung thần

Các target `月破 / 劫煞 / 災煞 / 月煞 / 月刑 / 月厭` dùng target-specific Q10 rules đã source-lock. Chỉ target rules và global `CAM_MOI_VIEC` thật sự universal được tái dùng; mọi `boNen` activity-specific từ vertical khác bị loại khi clone.

Ví dụ regression:

- Nguyệt Phá + Thiên Đức vẫn Kị chỉnh dung/cắt tóc;
- Kiếp Sát tháng Dần được Q10 giải;
- hội Q4/Q10 thật sự `諸事皆忌` vẫn hard-ban.

### Tứ Phế

Q10 `WYG_010-58a..58b` ghi grooming trong nhóm ngoại lệ `止不忌...整容剃頭...`; vì vậy Tứ Phế đơn độc **không Kị** chỉnh dung/cắt tóc.

Nhưng cùng đoạn ghi `與月破併諸事皆忌`, nên production có một global hard rule riêng cho **Tứ Phế + Nguyệt Phá**. Không kéo toàn bộ Tứ Phế target semantics vào baseline.

### Các mục không phải Kị của vertical này

Q10/Q11 không cho grooming Kị ở:

- Bình nhật, Thu nhật;
- Ngũ Mộ;
- Vô Lộc;
- Thượng Sóc, Tứ Ly, Tứ Tuyệt, Hối nhật.

Các factor này vì vậy không bị thêm chỉ vì vertical khác có dùng.

## Q7

Hoàng/Hắc đạo Q7 không blanket-block chỉnh dung/cắt tóc; chỉ là lớp supplementary.

## Product mapping

- activity code: `CHINH_DUNG_CAT_TOC`;
- title: **Chỉnh dung, cắt tóc**;
- source label: `整容剃頭`;
- route: `/chinh-dung-cat-toc`;
- API: `/date-selection/chinh-dung-cat-toc`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `chinh-dung-cat-toc-rules.spec.ts`: exact 3 Nên / 10 Kị + negative baseline;
- `chinh-dung-cat-toc-conflict.spec.ts`: Kiến, Nguyệt Phá, Kiếp Sát, Đinh, lunar 12/15, Tứ Phế + Nguyệt Phá, exemptions;
- `han-q11-oracle.spec.ts`: independent fixture `整容剃頭`;
- `han-q10-semantic-oracle.spec.ts`: independent Nguyệt Phá/Tứ Phế/Ngũ Mộ/Đinh/lunar assertions;
- service regression chứng minh lunar context thật kích hoạt ngày âm 12 và 15.
