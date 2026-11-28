# Sửa móng tay chân / 整手足甲 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.853 (working scan PDF page 860), mục **Sửa móng tay, chân**;
- Hán Q11 `WYG_011-16a`, mục `整手足甲`.

### Nên — 3 mục

- ngày Trừ;
- Giải Thần / `解神`;
- Trừ Thần / `除神`, production identity dùng alias `NGU_LY / 五離`.

### Kị — 13 mục

- Nguyệt Kiến / Trực Kiến;
- Nguyệt Phá;
- Kiếp Sát;
- Tai Sát;
- Nguyệt Sát;
- Nguyệt Hình;
- Nguyệt Yếm;
- ngày âm 1;
- ngày âm 6;
- ngày âm 15;
- ngày âm 19;
- ngày âm 21;
- ngày âm 23.

Việt p.853 và Hán `WYG_011-16a` khớp trực tiếp 3/13; không có discrepancy mới.

## Q10 semantics

Q10 đặt `整手足甲` cạnh `整容剃頭` trong toàn bộ target liên quan của vertical này: Nguyệt Kiến, Nguyệt Phá, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, cùng các nhóm miễn Kị như Bình/Thu/Tứ Phế/Vô Lộc/special-calendar days.

Production vì vậy tái dùng resolver Chỉnh dung/cắt tóc sau khi đổi machine key/label, với một ngoại lệ bắt buộc:

- **lọc bỏ `丁日` BO_NEN**, vì Q10 chỉ ghi `丁日忌剃頭亦不註宜整容`; không có câu tương ứng cho `整手足甲`.

Regression khóa ngày Đinh + Trực Trừ + Giải Thần/Trừ Thần vẫn `coNen=true`, `coKy=false` nếu không có Kị khác.

### Nguyệt Kiến và sáu hung thần

Giống source-resolved grooming semantics:

- Kiến có các nhánh Đức/Hợp/Xá/Ân/Tứ Tướng giải Kị, với ngoại lệ Kỷ Mùi;
- Nguyệt Phá + Đức vẫn Kị;
- các target Kiếp/Tai/Nguyệt Sát, Nguyệt Hình/Yếm dùng exact branch Q10 đã machine-lock;
- universal hard-day thật sự `諸事皆忌` vẫn áp.

### Tứ Phế và Ngũ Mộ

Q10 cho `整手足甲` trong nhóm ordinary exemption:

- Tứ Phế đơn độc không Kị;
- Ngũ Mộ đơn độc không Kị;
- nhưng Tứ Phế + Nguyệt Phá vẫn `諸事皆忌`, nên global hard rule được giữ.

### Vô Lộc và special-calendar days

Q10 cho phép `整手足甲` ở:

- Vô Lộc;
- Thượng Sóc;
- Tứ Ly;
- Tứ Tuyệt;
- Hối nhật.

Không tạo blocker từ các factor này.

### Sáu ngày Nhân Thần sở tại

Q10 `WYG_010-71b..72a`, `人神所在日`:

- ngày 1: ở ngón chân cái;
- ngày 6: ở tay;
- ngày 15: khắp thân;
- ngày 19: ở chân;
- ngày 21: ở ngón tay út;
- ngày 23: ở gan và chân;

và ghi `忌整手足甲`.

Production dùng typed `NGAY_AM` từ lunar calendar dựa trên Sóc thiên văn; không suy từ ngày dương và không tạo factor thần sát giả.

## Q7

Hoàng/Hắc đạo Q7 supplementary, không blanket-block Sửa móng tay chân.

## Product mapping

- activity code: `SUA_MONG_TAY_CHAN`;
- title: **Sửa móng tay chân**;
- source label: `整手足甲`;
- route: `/sua-mong-tay-chan`;
- API: `/date-selection/sua-mong-tay-chan`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `sua-mong-tay-chan-rules.spec.ts`: exact 3 Nên / 13 Kị;
- `sua-mong-tay-chan-conflict.spec.ts`: Kiến, Nguyệt Phá, Kiếp Sát, negative ngày Đinh, sáu lunar days, Tứ Phế/Ngũ Mộ, special-calendar exemptions;
- `han-q11-oracle.spec.ts`: independent fixture `整手足甲`;
- `han-q10-semantic-oracle.spec.ts`: parity grooming + negative `丁日`;
- service regression quét lịch thật và bắt đủ ngày âm `1/6/15/19/21/23`.
