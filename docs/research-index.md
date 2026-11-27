# Research Index

Đây là bảng theo dõi tri thức đã được xác minh. Không đánh dấu VERIFIED nếu chưa đối chiếu đủ nguồn cần thiết.

| Chủ đề                    | Module   | Nguồn chính                             | Trạng thái    | Implementation                   | Oracle test                                | Ghi chú                                          |
| ------------------------- | -------- | --------------------------------------- | ------------- | -------------------------------- | ------------------------------------------ | ------------------------------------------------ |
| Thiên Can                 | calendar | T1 Q1 p55, p91 + Hán Q1                 | ORACLE_TESTED | domain/heavenly-stem.ts          | calendar-domain.spec.ts                    | docs/research/heavenly-stems-earthly-branches.md |
| Địa Chi                   | calendar | T1 Q1 p55, p91 + Hán Q1                 | ORACLE_TESTED | domain/earthly-branch.ts         | calendar-domain.spec.ts                    | TY = Tý, TI = Tỵ                                 |
| Vòng 60 Can Chi           | calendar | T2 Q20 + GB/T 33661                     | ORACLE_TESTED | sexagenary-day.ts                | sexagenary-day.spec.ts                     | Epoch 1949-10-01 = Giáp Tý                       |
| Gregorian -> Can Chi ngày | calendar | GB/T 33661 + HKO 2026                   | ORACLE_TESTED | civil-date.ts, sexagenary-day.ts | civil-date.spec.ts, sexagenary-day.spec.ts | Civil-date semantics theo ADR 0005               |
| Tháng theo tiết khí       | calendar | T2 Q20..Q31 + Hán Q20..Q31              | ORACLE_TESTED | solar-term.service.ts            | solar-term.service.spec.ts                 | 12 tiết mở tháng                                 |
| Instant của tiết khí      | calendar | GB/T 33661 + Astronomy Engine + HKO     | ORACLE_TESTED | solar-term.service.ts            | HKO đủ 24 tiết 2026                        | ADR 0004                                         |
| Thập Nhị Trực             | calendar | T2 Q20 p311, p313-314 + Hán Q20/Q21/Q30 | ORACLE_TESTED | twelve-officer.ts                | twelve-officer.spec.ts                     | Oracle tháng Dần/Mão                             |
| Thổ Vượng                 | calendar | T1 Q1 p83 + Hán Q1 + Thời Hiến lịch     | ORACLE_TESTED | earth-reign.service.ts           | earth-reign.service.spec.ts                | 18 civil days trước bốn Lập; ADR 0006            |

## Factors — Quyển 6 core

| Chủ đề       | Module  | Nguồn chính                     | Trạng thái    | Implementation        | Oracle test             | Ghi chú                                       |
| ------------ | ------- | ------------------------------- | ------------- | --------------------- | ----------------------- | --------------------------------------------- |
| Tam Hợp      | factors | T1 Q6 p476 + Hán Q6             | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts | core-monthly-factors.md                       |
| Dịch Mã      | factors | T1 Q6 p481 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts | Thiên Hậu cùng vị trí                         |
| Kiếp Sát     | factors | T1 Q6 p485 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts |                                               |
| Tai Sát      | factors | T1 Q6 p486 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts | Thiên Hỏa cùng hệ; không tạo Thiên Ngục riêng |
| Nguyệt Sát   | factors | T1 Q6 p491 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts | Nguyệt Hư cùng vị trí                         |
| Nguyệt Hình  | factors | T1 Q6 p493 + Hán Q6 + Lập thành | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts | explicit lookup                               |
| Nguyệt Hại   | factors | T1 Q6 p494 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts | Lục Hại                                       |
| Lục Hợp      | factors | T1 Q6 p502 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts | Vô Kiều bị sách bác bỏ                        |
| Ngũ Phú      | factors | T1 Q6 p506 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts | dùng chuỗi thuận theo Lịch lệ/Lập thành       |
| Thiên Thương | factors | T1 Q6 p508 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts |                                               |
| Thiên Tặc    | factors | T1 Q6 p510 + Hán Q6 + Q9        | ORACLE_TESTED | factor-definitions.ts | factors.service.spec.ts |                                               |

Chi tiết: `docs/research/core-monthly-factors.md`.

## Factors — Quyển 5 virtue / special days

| Chủ đề         | Module  | Nguồn chính                       | Trạng thái    | Implementation                       | Oracle test                    | Ghi chú                                                |
| -------------- | ------- | --------------------------------- | ------------- | ------------------------------------ | ------------------------------ | ------------------------------------------------------ |
| Thiên Đức      | factors | T1 Q5 p387 + Hán Q5 + Nguyệt biểu | ORACLE_TESTED | heavenly-virtue-definition.ts        | heavenly-virtue.spec.ts        | 8 tháng Can ngày, 4 tháng quẻ; không đổi quẻ thành Chi |
| Nguyệt Đức     | factors | T1 Q5 p395 + Hán Q5               | ORACLE_TESTED | monthly-stem-factor-definitions.ts   | monthly-stem-factors.spec.ts   | chiThang -> Can ngày                                   |
| Thiên Đức Hợp  | factors | T1 Q5 p398 + Hán Q5               | ORACLE_TESTED | monthly-stem-factor-definitions.ts   | monthly-stem-factors.spec.ts   | bốn tháng trọng không có ngày hợp                      |
| Nguyệt Đức Hợp | factors | T1 Q5 p400 + Hán Q5               | ORACLE_TESTED | monthly-stem-factor-definitions.ts   | monthly-stem-factors.spec.ts   | chiThang -> Can ngày                                   |
| Nguyệt Không   | factors | T1 Q5 p402 + Hán Q5               | ORACLE_TESTED | monthly-stem-factor-definitions.ts   | monthly-stem-factors.spec.ts   | chiThang -> Can ngày                                   |
| Thiên Ân       | factors | T1 Q5 p404 + Hán Q5 + Q9          | ORACLE_TESTED | fixed-seasonal-factor-definitions.ts | fixed-seasonal-factors.spec.ts | 15 Can Chi cố định                                     |
| Thiên Xá       | factors | T1 Q5 p407 + Hán Q5               | ORACLE_TESTED | fixed-seasonal-factor-definitions.ts | fixed-seasonal-factors.spec.ts | mùa -> Can Chi                                         |
| Thiên Nguyện   | factors | T1 Q5 p411-412 + Hán Q5           | ORACLE_TESTED | fixed-seasonal-factor-definitions.ts | fixed-seasonal-factors.spec.ts | chiThang -> Can Chi                                    |
| Mẫu Thương     | factors | T1 Q5 p415 + Hán Q5 + Thổ Vượng   | ORACLE_TESTED | maternal-storehouse-definition.ts    | maternal-storehouse.spec.ts    | seasonal set; Thổ Vượng chuyển sang Tỵ/Ngọ             |
| Nguyệt Ân      | factors | T1 Q5 p417-418 + Hán Q5           | ORACLE_TESTED | monthly-stem-factor-definitions.ts   | monthly-stem-factors.spec.ts   | chiThang -> Can ngày                                   |
| Tứ Tướng       | factors | T1 Q5 p420-421 + Hán Q5           | ORACLE_TESTED | fixed-seasonal-factor-definitions.ts | fixed-seasonal-factors.spec.ts | mùa -> 2 Can ngày                                      |
| Thời Đức       | factors | T1 Q5 p422-423 + Hán Q5           | ORACLE_TESTED | fixed-seasonal-factor-definitions.ts | fixed-seasonal-factors.spec.ts | mùa -> Chi ngày                                        |

Chi tiết: `docs/research/virtue-special-day-factors.md`.

## Factors — Quyển 4 shared positions / Bất Tương

| Chủ đề                          | Module  | Nguồn chính             | Trạng thái    | Implementation                    | Oracle test                        | Ghi chú                                         |
| ------------------------------- | ------- | ----------------------- | ------------- | --------------------------------- | ---------------------------------- | ----------------------------------------------- |
| Thần cùng vị trí 12 Trực        | factors | T1 Q4 p302-329 + Hán Q4 | ORACLE_TESTED | q4-shared-position-definitions.ts | q4-shared-position-factors.spec.ts | giữ identity riêng, dùng chung phép tính vị trí |
| Nguyệt Kiến                     | factors | T1 Q4 p344 + Hán Q4     | ORACLE_TESTED | q4-shared-position-definitions.ts | q4-shared-position-factors.spec.ts | cùng vị trí Trực Kiến                           |
| Nguyệt Yếm / Địa Hỏa            | factors | T1 Q4 p347 + Hán Q4     | ORACLE_TESTED | q4-shared-position-definitions.ts | q4-shared-position-factors.spec.ts | cùng vị trí, identity riêng                     |
| Yếm Đối / Lục Nghi / Chiêu Diêu | factors | T1 Q4 p353 + Hán Q4     | ORACLE_TESTED | q4-shared-position-definitions.ts | q4-shared-position-factors.spec.ts | cùng vị trí nhưng semantics khác nhau           |
| Âm Dương Bất Tương              | factors | T1 Q4 p356-358 + Hán Q4 | ORACLE_TESTED | bat-tuong-definition.ts           | bat-tuong.spec.ts                  | table-driven 12 tháng × Can Chi                 |

Chi tiết: `docs/research/q4-aliases-bat-tuong.md`.

## Factors — Activity dependencies

| Chủ đề     | Module  | Nguồn chính          | Trạng thái    | Implementation              | Oracle test           | Ghi chú                                       |
| ---------- | ------- | -------------------- | ------------- | --------------------------- | --------------------- | --------------------------------------------- |
| Nguyệt Phá | factors | T2 Q20 + Hán Q10/Q20 | ORACLE_TESTED | monthly-break-definition.ts | monthly-break.spec.ts | cùng vị trí Trực Phá nhưng giữ identity riêng |

## Activities — Quyển 11

| Chủ đề          | Module     | Nguồn chính                  | Trạng thái | Implementation | Oracle test | Ghi chú                                             |
| --------------- | ---------- | ---------------------------- | ---------- | -------------- | ----------- | --------------------------------------------------- |
| CUOI_HOI / 嫁娶 | activities | T1 Q11 PDF858 p851 + Hán Q11 | VERIFIED   | -              | planned     | 10 Nghi / 19 Kị; docs/research/activity-cuoi-hoi.md |

Trạng thái hợp lệ:

- TODO
- LOCATED
- COMPARED
- VERIFIED
- IMPLEMENTED
- ORACLE_TESTED

## Ý nghĩa ORACLE_TESTED

Một mục chỉ được ghi ORACLE_TESTED khi:

1. logic đã được đối chiếu nguồn;
2. implementation đã tồn tại;
3. có test độc lập với implementation;
4. GitHub Actions Verify đã chạy xanh với test đó.

## Quy tắc đọc trạng thái

Một chủ đề lớn có thể tách thành nhiều hàng nếu chỉ một phần đã VERIFIED.

Không được dùng trạng thái VERIFIED/ORACLE_TESTED của một phần để hợp thức hóa phần khác chưa được xác minh.

Khi thêm một thần sát, quy tắc Dụng sự hoặc Nghi kị, thêm dòng vào bảng này hoặc tách thành bảng con theo module nếu danh sách lớn.
