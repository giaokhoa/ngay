# Research Index

Đây là bảng theo dõi tri thức đã được xác minh. Không đánh dấu VERIFIED nếu chưa đối chiếu đủ nguồn cần thiết.

| Chủ đề                    | Module   | Nguồn chính                             | Trạng thái    | Implementation                   | Oracle test                                | Ghi chú                                          |
| ------------------------- | -------- | --------------------------------------- | ------------- | -------------------------------- | ------------------------------------------ | ------------------------------------------------ |
| Thiên Can                 | calendar | T1 Q1 p55, p91 + Hán Q1                 | ORACLE_TESTED | domain/heavenly-stem.ts          | calendar-domain.spec.ts                    | docs/research/heavenly-stems-earthly-branches.md |
| Địa Chi                   | calendar | T1 Q1 p55, p91 + Hán Q1                 | ORACLE_TESTED | domain/earthly-branch.ts         | calendar-domain.spec.ts                    | TY = Tý, TI = Tỵ                                 |
| Vòng 60 Can Chi           | calendar | T2 Q20 + GB/T 33661                     | ORACLE_TESTED | sexagenary-day.ts                | sexagenary-day.spec.ts                     | Epoch 1949-10-01 = Giáp Tý                       |
| Gregorian -> Can Chi ngày | calendar | GB/T 33661 + HKO 2026                   | ORACLE_TESTED | civil-date.ts, sexagenary-day.ts | civil-date.spec.ts, sexagenary-day.spec.ts | Civil-date semantics theo ADR 0005               |
| Tháng theo tiết khí       | calendar | T2 Q20..Q31 + Hán Q20..Q31              | ORACLE_TESTED | solar-term.service.ts            | solar-term.service.spec.ts                 | 12 tiết mở tháng                                 |
| Instant của tiết khí      | calendar | GB/T 33661 + internal ephemeris + HKO   | ORACLE_TESTED | astronomy/ephemeris.ts           | HKO đủ 24 tiết 2026 + transition fixtures  | ADR 0012                                         |
| Thập Nhị Trực             | calendar | T2 Q20 p311, p313-314 + Hán Q20/Q21/Q30 | ORACLE_TESTED | twelve-officer.ts                | twelve-officer.spec.ts                     | Oracle tháng Dần/Mão                             |
| Thổ Vượng                 | calendar | T1 Q1 p83 + Hán Q1 + Thời Hiến lịch     | ORACLE_TESTED | earth-reign.service.ts           | earth-reign.service.spec.ts                | 18 civil days trước bốn Lập; ADR 0006            |

## Factors — Quyển 6 core

| Chủ đề         | Module  | Nguồn chính                     | Trạng thái        | Implementation                      | Oracle test                                                         | Ghi chú                                                          |
| -------------- | ------- | ------------------------------- | ----------------- | ----------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Tam Hợp        | factors | T1 Q6 p476 + Hán Q6             | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             | core-monthly-factors.md                                          |
| Dịch Mã        | factors | T1 Q6 p481 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             | Thiên Hậu cùng vị trí                                            |
| Kiếp Sát       | factors | T1 Q6 p485 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             |                                                                  |
| Tai Sát        | factors | T1 Q6 p486 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             | Thiên Hỏa cùng hệ; không tạo Thiên Ngục riêng                    |
| Nguyệt Sát     | factors | T1 Q6 p491 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             | Nguyệt Hư cùng vị trí                                            |
| Nguyệt Hình    | factors | T1 Q6 p493 + Hán Q6 + Lập thành | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             | explicit lookup                                                  |
| Nguyệt Hại     | factors | T1 Q6 p494 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             | Lục Hại                                                          |
| Lục Hợp        | factors | T1 Q6 p502 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             | Vô Kiều bị sách bác bỏ                                           |
| Ngũ Phú        | factors | T1 Q6 p506 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             | dùng chuỗi thuận theo Lịch lệ/Lập thành                          |
| Thiên Thương   | factors | T1 Q6 p508 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             |                                                                  |
| Thiên Tặc      | factors | T1 Q6 p510 + Hán Q6 + Q9        | ORACLE_TESTED     | factor-definitions.ts               | factors.service.spec.ts                                             |                                                                  |
| Vô Lộc         | factors | T1 Q5 p455–456 + Hán Q5/Q10     | ORACLE_TESTED     | vo-loc-definition.ts                | vo-loc.spec.ts + han-q5-oracle.spec.ts                              | context-aware; 癸亥 override; Cầu phúc prerequisite              |
| Giải Thần      | factors | T1 Q5 p462–463 + Hán Q5         | ORACLE_TESTED     | q5-giai-than-definition.ts          | q5-giai-than.spec.ts + han-q5-oracle.spec.ts                        | Giải trừ prerequisite; monthly pair sequence                     |
| Tứ Ly          | factors | T1 Q6 p560 + Hán Q6/Q9          | ORACLE_TESTED     | special-calendar-day-definitions.ts | solar-term.service.spec.ts + han-q6-special-calendar-oracle.spec.ts | ngày dân sự trước phân/chí                                       |
| Tứ Tuyệt       | factors | T1 Q6 p560 + Hán Q6/Q9          | ORACLE_TESTED     | special-calendar-day-definitions.ts | solar-term.service.spec.ts + han-q6-special-calendar-oracle.spec.ts | ngày dân sự trước tứ lập                                         |
| Hối nhật       | factors | T1 Q10 p828 + Hán Q10           | ORACLE_TESTED     | special-calendar-day-definitions.ts | lunar-day.spec.ts + han-q6-special-calendar-oracle.spec.ts          | ngày dân sự trước Sóc kế tiếp                                    |
| Sóc–Huyền–Vọng | factors | T1 Q10 p829 + Hán Q10           | ORACLE_TESTED     | soc-huyen-vong-definition.ts        | lunar-day.spec.ts + han-q10-soc-huyen-vong-oracle.spec.ts           | 0°/90°/180°/270° theo ngày dân sự địa phương; Cầu y prerequisite |
| Trường Tinh    | factors | Hán Q9 `WYG_009-33b` + Q19–30   | ORACLE_TESTED_HAN | q9-long-short-star-definitions.ts   | q9-long-short-star.spec.ts + han-q9-long-short-star-oracle.spec.ts  | tháng tiết khí + ngày âm; Việt exact T2 chưa materialize         |
| Đoản Tinh      | factors | Hán Q9 `WYG_009-33b` + Q19–30   | ORACLE_TESTED_HAN | q9-long-short-star-definitions.ts   | q9-long-short-star.spec.ts + han-q9-long-short-star-oracle.spec.ts  | giữ bảng Q9; không “sửa” theo phép Q35 bất nhất                  |
| Du Họa         | factors | T1 Q6 p499 + Hán Q6             | ORACLE_TESTED     | q6-du-hoa-definition.ts             | q6-du-hoa.spec.ts + han-q6-oracle.spec.ts                           | Cầu phúc prerequisite; `正月起巳逆行四孟`                        |
| Phổ Hộ         | factors | T1 Q6 p516 “Phả Hộ” + Hán Q6    | ORACLE_TESTED     | q6-ritual-factor-definitions.ts     | q6-ritual-factors.spec.ts + han-q6-oracle.spec.ts                   | canonical Phổ Hộ; Việt in Phả Hộ; Tế tự prerequisite             |
| Phúc Sinh      | factors | T1 Q6 p517 + Hán Q6             | ORACLE_TESTED     | q6-ritual-factor-definitions.ts     | q6-ritual-factors.spec.ts + han-q6-oracle.spec.ts                   | Tế tự prerequisite; tháng→chi ngày exact                         |
| Thánh Tâm      | factors | T1 Q6 p518 + Hán Q6             | ORACLE_TESTED     | q6-ritual-factor-definitions.ts     | q6-ritual-factors.spec.ts + han-q6-oracle.spec.ts                   | Tế tự prerequisite; tháng→chi ngày exact                         |
| Ích Hậu        | factors | T1 Q6 p520 + Hán Q6             | ORACLE_TESTED     | q6-ritual-factor-definitions.ts     | q6-ritual-factors.spec.ts + han-q6-oracle.spec.ts                   | Tế tự prerequisite; tháng→chi ngày exact                         |
| Tục Thế        | factors | T1 Q6 p522 + Hán Q6             | ORACLE_TESTED     | q6-ritual-factor-definitions.ts     | q6-ritual-factors.spec.ts + han-q6-oracle.spec.ts                   | không suy Huyết Kị thành alias                                   |

Chi tiết core: `docs/research/core-monthly-factors.md`. Inventory đủ 40/40 mục Q6: `docs/research/q6-full-inventory.md`.

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

Chi tiết core: `docs/research/virtue-special-day-factors.md`. Inventory đủ Q5: `docs/research/q5-full-inventory.md`.

## Foundations — Quyển 1

| Scope                              | Trạng thái                   | Product                                                                                   |
| ---------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| 17/17 mục Việt = 28/28 heading Hán | INVENTORIED / ORACLE_PARTIAL | Can/Chi, Ngũ Thử/Ngũ Hổ, Thổ Vượng implemented; phần còn lại foundation/reference/spatial |

Chi tiết: `docs/research/q1-full-inventory.md`.

## Foundations — Quyển 2

| Scope         | Trạng thái  | Product        | Ghi chú                                                                 |
| ------------- | ----------- | -------------- | ----------------------------------------------------------------------- |
| 12/12 section | INVENTORIED | CHUA_IMPLEMENT | 24 sơn, compass/ngũ hành địa lý, biến quẻ; thiếu spatial/compass target |

Chi tiết: `docs/research/q2-full-inventory.md`.

## Annual/spatial — Quyển 3

| Scope                                 | Trạng thái  | Product        | Ghi chú                                                                                        |
| ------------------------------------- | ----------- | -------------- | ---------------------------------------------------------------------------------------------- |
| 36/36 mục đánh số + closing Tổng luận | INVENTORIED | CHUA_IMPLEMENT | annual spatial layer; calendar có Can Chi năm nhưng current contracts không có hướng/tọa-hướng |

Chi tiết: `docs/research/q3-full-inventory.md`.

## Factors — Quyển 4 shared positions / Bất Tương

| Chủ đề                          | Module  | Nguồn chính             | Trạng thái    | Implementation                    | Oracle test                        | Ghi chú                                         |
| ------------------------------- | ------- | ----------------------- | ------------- | --------------------------------- | ---------------------------------- | ----------------------------------------------- |
| Thần cùng vị trí 12 Trực        | factors | T1 Q4 p302-329 + Hán Q4 | ORACLE_TESTED | q4-shared-position-definitions.ts | q4-shared-position-factors.spec.ts | giữ identity riêng, dùng chung phép tính vị trí |
| Nguyệt Kiến                     | factors | T1 Q4 p344 + Hán Q4     | ORACLE_TESTED | q4-shared-position-definitions.ts | q4-shared-position-factors.spec.ts | cùng vị trí Trực Kiến                           |
| Nguyệt Yếm / Địa Hỏa            | factors | T1 Q4 p347 + Hán Q4     | ORACLE_TESTED | q4-shared-position-definitions.ts | q4-shared-position-factors.spec.ts | cùng vị trí, identity riêng                     |
| Yếm Đối / Lục Nghi / Chiêu Diêu | factors | T1 Q4 p353 + Hán Q4     | ORACLE_TESTED | q4-shared-position-definitions.ts | q4-shared-position-factors.spec.ts | cùng vị trí nhưng semantics khác nhau           |
| Âm Dương Bất Tương              | factors | T1 Q4 p356-358 + Hán Q4 | ORACLE_TESTED | bat-tuong-definition.ts           | bat-tuong.spec.ts                  | table-driven 12 tháng × Can Chi                 |

Chi tiết core: `docs/research/q4-aliases-bat-tuong.md`. Inventory đủ Q4: `docs/research/q4-full-inventory.md`.

## Spatial/advanced — Quyển 8

| Scope                           | Trạng thái  | Product        | Ghi chú                                                                 |
| ------------------------------- | ----------- | -------------- | ----------------------------------------------------------------------- |
| 22/22 mục Việt (24 heading Hán) | INVENTORIED | CHUA_IMPLEMENT | phi cung, 24 sơn, tọa-hướng, Cửu cung; thiếu spatial/Nine-Palace domain |

Chi tiết: `docs/research/q8-full-inventory.md`.

## Day/hour — Quyển 7

| Chủ đề                     | Trạng thái    | Product     | Nguồn / blocker                                |
| -------------------------- | ------------- | ----------- | ---------------------------------------------- |
| Hoàng/Hắc đạo ngày + giờ   | ORACLE_TESTED | IMPLEMENTED | T1 Q7 + Hán Q7/Q31                             |
| Thiên Ất Quý Nhân          | COMPARED      | BLOCKED     | cần location + sunrise/sunset thực tế          |
| Thiên Quan Quý Nhân        | ORACLE_TESTED | IMPLEMENTED | Q7/Q31                                         |
| Phúc Tinh Quý Nhân         | ORACLE_TESTED | IMPLEMENTED | Q7/Q31                                         |
| Hỷ Thần                    | ORACLE_TESTED | IMPLEMENTED | Q7/Q31; không thắng Nhật Phá                   |
| Bát Lộc                    | ORACLE_TESTED | IMPLEMENTED | Q7/Q31                                         |
| Nhật Kiến/Phá/Hợp/Hại/Hình | ORACLE_TESTED | IMPLEMENTED | Q7/Q31                                         |
| Tứ Đại Cát Thời            | COMPARED      | BLOCKED     | cần model 24 vị trí/khắc giờ                   |
| Quý Đăng Thiên Môn         | COMPARED      | BLOCKED     | cần Nguyệt tướng + sunrise/sunset + time model |
| Ngũ Bất Ngộ                | ORACLE_TESTED | IMPLEMENTED | operational Q32; Q7 prose tension đã registry  |
| Cửu Xú                     | COMPARED      | BLOCKED     | cần Nguyệt tướng tại instant giờ               |
| Tuần trung Không vong      | ORACLE_TESTED | INFO_MARKER | không blanket veto                             |
| Triệt lộ Không vong        | ORACLE_TESTED | INFO_MARKER | không blanket veto                             |

**Inventory Quyển 7: 13/13 đầu mục.** Production vẫn là safe subset, không claim full-volume oracle. Chi tiết: `docs/research/q7-day-hour-auxiliary.md`.

## Factors — Activity dependencies

| Chủ đề     | Module  | Nguồn chính          | Trạng thái    | Implementation              | Oracle test           | Ghi chú                                       |
| ---------- | ------- | -------------------- | ------------- | --------------------------- | --------------------- | --------------------------------------------- |
| Nguyệt Phá | factors | T2 Q20 + Hán Q10/Q20 | ORACLE_TESTED | monthly-break-definition.ts | monthly-break.spec.ts | cùng vị trí Trực Phá nhưng giữ identity riêng |

## Activities — Quyển 11

| Chủ đề                         | Module     | Nguồn chính                     | Trạng thái    | Implementation                                     | Oracle test                                                            | Ghi chú                                                                                |
| ------------------------------ | ---------- | ------------------------------- | ------------- | -------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| CUOI_HOI / 嫁娶                | activities | T1 Q11 p851 + Hán Q11           | ORACLE_TESTED | cuoi-hoi-rules.ts + Q10 resolver                   | cuoi-hoi-rules.spec.ts / cuoi-hoi-conflict.spec.ts                     | docs/research/activity-cuoi-hoi.md                                                     |
| DI_CHUYEN / 般移〈移徙同〉     | activities | T1 Q11 + Hán Q11                | ORACLE_TESTED | di-chuyen-rules.ts + data-driven Q10               | di-chuyen-conflict.spec.ts                                             | docs/research/activity-di-chuyen.md                                                    |
| AN_GIUONG / 安牀               | activities | T1 Q11 p852 + Hán Q11           | ORACLE_TESTED | an-giuong-rules.ts + Q10 resolver                  | an-giuong-rules.spec.ts / an-giuong-conflict.spec.ts                   | docs/research/activity-an-giuong.md                                                    |
| QUAN_DAI / 冠帶                | activities | T1 Q11 p848 + Hán Q11/Q10       | ORACLE_TESTED | quan-dai-rules.ts + source-resolved Q10            | quan-dai-rules.spec.ts / quan-dai-conflict.spec.ts                     | Việt p848 thêm Bế; Hán Q11 + Việt/Hán Q10 không Kị; docs/research/activity-quan-dai.md |
| NHAP_HOC / 入學                | activities | T1 Q11 p848 + Hán Q11/Q10       | ORACLE_TESTED | nhap-hoc-rules.ts + universal hard Q10             | nhap-hoc-rules.spec.ts / nhap-hoc-conflict.spec.ts                     | Q11 `忌無`; chỉ giữ Q10 `諸事皆忌`; docs/research/activity-nhap-hoc.md                 |
| YEN_HOI / 宴會                 | activities | T1 Q11 p848 + Hán Q5/Q10/Q11    | ORACLE_TESTED | yen-hoi-rules.ts + data-driven Q10                 | yen-hoi-rules.spec.ts / yen-hoi-conflict.spec.ts                       | Ngũ Hợp/Ngũ Ly production; docs/research/activity-yen-hoi.md                           |
| KHANH_THUONG / 慶賜賞賀        | activities | T1 Q11 p848 + Hán Q10/Q11       | ORACLE_TESTED | khanh-thuong-rules.ts + Yến hội Q10 core           | khanh-thuong-rules.spec.ts / khanh-thuong-conflict.spec.ts             | Dậu chỉ bỏ Nên, không thành Kị; docs/research/activity-khanh-thuong.md                 |
| TE_TU / 祭祀                   | activities | T1 Q11 p844 + Hán Q4/Q6/Q10/Q11 | ORACLE_TESTED | te-tu-rules.ts + universal hard Q10                | te-tu-rules.spec.ts / te-tu-conflict.spec.ts                           | Việt p844 thiếu 福生; production theo Hán; docs/research/activity-te-tu.md             |
| CAU_PHUC / 祈福                | activities | T1 Q11 p844 + Hán Q5/Q6/Q10/Q11 | ORACLE_TESTED | cau-phuc-rules.ts + source-resolved Q10            | cau-phuc-rules.spec.ts / cau-phuc-conflict.spec.ts                     | 上朔等日 expanded by Q10; docs/research/activity-cau-phuc.md                           |
| CAU_TU / 求嗣                  | activities | T1 Q11 p845 + Hán Q10/Q11       | ORACLE_TESTED | cau-tu-rules.ts + shared Q10 semantics             | cau-tu-rules.spec.ts / cau-tu-conflict.spec.ts                         | 12 Nên; 14 Kị direct + 5 inherited via 餘倣此; docs/research/activity-cau-tu.md        |
| GIAI_TRU / 解除                | activities | T1 Q11 p852 + Hán Q5/Q10/Q11    | ORACLE_TESTED | giai-tru-rules.ts + source-resolved Q10            | giai-tru-rules.spec.ts / giai-tru-conflict.spec.ts                     | Việt thêm 天願; Nguyệt Phá ordinary exempt; docs/research/activity-giai-tru.md         |
| CHINH_DUNG_CAT_TOC / 整容剃頭  | activities | T1 Q11 p853 + Hán Q10/Q11       | ORACLE_TESTED | chinh-dung-cat-toc-rules.ts + source-resolved Q10  | chinh-dung-cat-toc-rules.spec.ts / chinh-dung-cat-toc-conflict.spec.ts | typed ngày Đinh + lunar 12/15; docs/research/activity-chinh-dung-cat-toc.md            |
| CAU_Y_TRI_BENH / 求醫療病      | activities | T1 Q11 p853 + Hán Q10/Q11       | ORACLE_TESTED | cau-y-tri-benh-rules.ts + medical Q10 resolver     | cau-y-tri-benh-rules.spec.ts / cau-y-tri-benh-conflict.spec.ts         | 15 Nên / 22 Kị; phase 朔弦望; docs/research/activity-cau-y-tri-benh.md                 |
| SUA_MONG_TAY_CHAN / 整手足甲   | activities | T1 Q11 p853 + Hán Q10/Q11       | ORACLE_TESTED | sua-mong-tay-chan-rules.ts + grooming Q10 resolver | sua-mong-tay-chan-rules.spec.ts / sua-mong-tay-chan-conflict.spec.ts   | six typed lunar days; docs/research/activity-sua-mong-tay-chan.md                      |
| DONG_THO / 興造動土            | activities | T1 Q11 p855 + Hán Q11           | ORACLE_TESTED | earthwork-rules.ts + full Q10                      | earthwork-rules.spec.ts / earthwork-conflict.spec.ts                   | docs/research/activity-dong-tho-sua-cung-that.md                                       |
| SUA_CUNG_THAT / 修宮室         | activities | T1 Q11 p854 + Hán Q11           | ORACLE_TESTED | earthwork-rules.ts + full Q10                      | earthwork-rules.spec.ts / earthwork-conflict.spec.ts                   | docs/research/activity-dong-tho-sua-cung-that.md                                       |
| KHAI_TRUONG / 開市             | activities | T1 Q11 p857 + Hán Q11           | ORACLE_TESTED | khai-truong-rules.ts + full Q10                    | khai-truong-rules.spec.ts / khai-truong-conflict.spec.ts               | docs/research/activity-khai-truong.md                                                  |
| XUAT_HANH / 行幸遣使〈出行同〉 | activities | T1 Q11 p849 + Q10 + Hán Q11/Q10 | ORACLE_TESTED | xuat-hanh-rules.ts + derived Q10 resolver          | xuat-hanh-rules.spec.ts / xuat-hanh-conflict.spec.ts                   | Q11 Việt thiếu 月厭; bổ sung blocker từ Q10; docs/research/activity-xuat-hanh.md       |
| AN_TANG / 安葬                 | activities | T1 Q11 p862 + Q5/Q10 + Hán      | ORACLE_TESTED | an-tang-rules.ts + full Q10 resolver               | an-tang-rules.spec.ts / an-tang-conflict.spec.ts                       | Ô Phệ final 13 ngày; Phục/Trọng source-lock; docs/research/activity-an-tang.md         |

## Reference tables — Lập thành Q9

Q9 đã inventory full structure 10 niên + 30 nguyệt + 2 trang nhật + 6 biểu thời; xem `docs/research/q9-full-inventory.md`. Đây là double-entry oracle, không phải calculator spec duy nhất.

## Reference tables — Niên biểu

Q14–19 đã inventory đủ 6 block × 10 năm, xem `docs/research/q14-q19-annual-tables.md`. Đây là bảng spatial theo năm để future-oracle Q3/Q8; current date-selection không consume. Q14 giữ Wikisource fallback pin, Q15–19 Kanripo.

## Reference tables — Nguyệt biểu

Q20–31 đã inventory đủ 12/12 volume structure; xem `docs/research/q20-q31-month-tables.md`. Mỗi volume = một tháng tiết khí + design bảng 60 Can-Chi ngày. Current Hán oracle chỉ claim subset đã test, không claim 720-row full oracle.

## Appendix / refutation — Quyển 35–36

| Scope         | Research status                                                      | Product                          |
| ------------- | -------------------------------------------------------------------- | -------------------------------- |
| Q35 Phụ lục   | exact T2 13 items ↔ Hán 16 headings; 竒門三元 omitted                | CHUA_IMPLEMENT / reference       |
| Q36 Biện ngụy | exact T2 26 items ↔ Hán 27 headings; TOC Thiên đạo/body Lục đạo typo | ANTI_ORACLE / source-review only |

Chi tiết: `docs/research/q35-full-inventory.md`, `docs/research/q36-full-inventory.md`.

## Semantics / activities — Quyển 10–11

|      Quyển | Structural inventory                    | Product/oracle                                                                                            |
| ---------: | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 10 Nghi kị | 51/51 mục Việt = 99/99 Hán TOC headings | exact semantic oracle cho 19 current vertical; remaining groups explicit source-only/blocked/out-of-scope |
| 11 Dụng sự | 73/73 canonical activity sections       | 19 ORACLE_TESTED; 54 OUT_OF_SCOPE_CURRENT_VERTICALS; source catalogs 67/37/60 overlap                     |

Chi tiết: `docs/research/q10-full-inventory.md`, `docs/research/q11-full-inventory.md`.

## Oracle/reference — Quyển 9, 32–34

| Quyển | Structural inventory                           | Product/oracle                                                    |
| ----: | ---------------------------------------------- | ----------------------------------------------------------------- |
|     9 | 4 phần = 10 niên + 30 nguyệt + 2 nhật + 6 thời | ORACLE_PARTIAL; index/cross-check, không calculator spec duy nhất |
|    32 | exact T2 3/3 mục ↔ Hán 3 headings              | ORACLE_PARTIAL; 60-day hour subset; advanced hour rules blocked   |
|    33 | exact T2 14 items ↔ 15 Hán headings            | ORACLE_PARTIAL; `相主`; compass/spatial remainder blocked         |
|    34 | exact T2 10 items ↔ 12 Hán headings            | ORACLE_PARTIAL; `用時法`; `時刻方位圖` omission registered        |

Chi tiết: `docs/research/q9-full-inventory.md`, `docs/research/q32-full-inventory.md`, `docs/research/q33-full-inventory.md`, `docs/research/q34-full-inventory.md`.

## Exact Tập II cross-check

Canonical Tập II 1001 trang đã được mở trực tiếp và exact-map với Hán Q14–36. Page map + grouping + discrepancy: `docs/research/t2-exact-viet-han-crosscheck.md`.

## Hán double-entry coverage

Bảng này là lớp bổ sung cho `ORACLE_TESTED`. Nó chỉ đánh dấu scope có expected/vector
độc lập từ Hán source pin, không có nghĩa cả quyển đã được implement.

| Scope                           | Hán source pin                     | Trạng thái                | Test                                          |
| ------------------------------- | ---------------------------------- | ------------------------- | --------------------------------------------- |
| Q4 29/29 section inventory      | KR3g0051 WYG Q4/Q10 + Q20..31      | HAN_ORACLE_TESTED_PARTIAL | q4-hard/yem specs + month-table oracle        |
| Q5 30/30 section inventory      | KR3g0051 WYG Q5                    | HAN_ORACLE_TESTED_PARTIAL | han-q5-oracle.spec.ts                         |
| Q7 13/13 mục đã inventory       | KR3g0051 WYG Q7 / Q32              | HAN_ORACLE_TESTED_PARTIAL | hoang-hac-dao.spec.ts / selected-hour.spec.ts |
| Q6 40/40 mục đã inventory       | KR3g0051 WYG Q6                    | HAN_ORACLE_TESTED_PARTIAL | han-q6-oracle.spec.ts                         |
| Q10 semantics của 19 vertical   | KR3g0051 WYG Q10                   | HAN_ORACLE_TESTED_PARTIAL | han-q10-semantic-oracle.spec.ts               |
| Q11 exact 宜/忌 của 19 vertical | KR3g0051 WYG Q11                   | HAN_ORACLE_TESTED         | han-q11-oracle.spec.ts                        |
| 36-volume corpus inventory      | KR3g0051 + Wikisource Q14 fallback | INVENTORIED               | han-source-manifest.spec.ts                   |

Full-volume status: **0/36**.

Chi tiết: `docs/han-source-completeness.md`.

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

## Calendar context — lunar/new-moon

Q6 `上朔 / 反支 / 月忌日` đã được mở khóa bằng Can Chi năm theo Lập Xuân và astronomical new-moon civil date theo múi giờ. Ngày chứa sóc được coi là mồng 1 cho toàn ngày dân sự địa phương. Xem `apps/api/src/calendar/lunar-day.ts` và `docs/research/q6-full-inventory.md`.
