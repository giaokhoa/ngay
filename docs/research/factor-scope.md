# Factor Research Scope

Tài liệu này chia phạm vi nghiên cứu thần sát/yếu tố theo cấu trúc của Hiệp Kỷ Biện Phương Thư để Agent sau không biến Phase 2 thành một task khổng lồ.

Mục tiêu Phase 2 là xây **factor engine có provenance và oracle**, chưa phải phủ hết mọi thần sát trong sách.

## Nguồn tổ chức

Bản Việt Tập 1:

| Quyển | Phần       | Trang PDF mở đầu | Trang in | Vai trò đối với project                                    |
| ----- | ---------- | ---------------: | -------: | ---------------------------------------------------------- |
| 3     | Nghĩa lệ 1 |              209 |      207 | Chủ yếu thần theo năm; để sau MVP                          |
| 4     | Nghĩa lệ 2 |              302 |      295 | Kiến-Trừ, aliases, Nguyệt kiến, Bất Tương và nhóm âm dương |
| 5     | Nghĩa lệ 3 |              392 |      386 | Đức thần, Thiên Xá và ngày đặc biệt                        |
| 6     | Nghĩa lệ 4 |              481 |      474 | Nhóm quan hệ tháng/ngày cốt lõi cho MVP                    |
| 7     | Nghĩa lệ 5 |              571 |      564 | Hoàng/Hắc đạo, quý nhân, nhật thần, giờ; ưu tiên thấp hơn  |
| 8     | Nghĩa lệ 6 |              635 |      628 | Lộc/mã/quý nhân theo năm và yếu tố phương vị; defer        |
| 9     | Lập thành  |              717 |      710 | Bảng tổng hợp; dùng làm oracle/reference                   |

Hán bản phải được mở song song khi rule cụ thể được research.

## Nguyên tắc chia scope

Một Agent research phải trả lời cho từng yếu tố:

1. điều kiện xuất hiện;
2. input cần dùng: tháng, Can/Chi ngày, mùa, tiết khí, năm, giờ hay phương vị;
3. alias/cùng vị trí với yếu tố nào;
4. bản thân yếu tố chỉ là “xuất hiện” hay đã có nghi/kị trong chính mục đó;
5. oracle nào trong Quyển 9 hoặc Nguyệt biểu có thể kiểm;
6. representation: formula, lookup, set Can Chi hay custom evaluator.

Không implement chỉ vì công thức “quen thuộc”.

## Phase 2A.1 — Core monthly relation factors, Quyển 6

Đây là nhóm đầu tiên nên research vì:

- phần lớn phụ thuộc trực tiếp vào chi tháng/chi ngày đã có từ calendar core;
- công thức tương đối độc lập với Dụng sự;
- dễ oracle bằng Nguyệt biểu;
- nhiều yếu tố dùng lại cho nhiều công việc.

### Scope đầu

Research trước:

- Tam Hợp
- Dịch Mã
- Kiếp Sát
- Tai Sát
- Nguyệt Sát
- Nguyệt Hình
- Nguyệt Hại
- Lục Hợp
- Ngũ Phú
- Thiên Thương
- Thiên Tặc

Nguồn Việt:

- Quyển 6, Nghĩa lệ 4, bắt đầu PDF 481 / trang in 474.
- Mục lục tiếp tục ở PDF 482 / trang in 475.
- “Tam hợp” bắt đầu ngay sau mục lục.
- “Dịch mã” nằm trong cùng Quyển 6.

Hán bản Quyển 6 xác nhận nhóm:
`三合, 驛馬, 劫煞, 災煞, 月煞, 月刑, 月害, 六合, 五富, 天倉, 天賊`.

### Trạng thái sau audit đầy đủ

Quyển 6 đã được inventory đủ **40/40 mục** tại `docs/research/q6-full-inventory.md`.

- 29 factor Q6 đang production-computable đã có Hán oracle độc lập; Phổ Hộ/Phúc Sinh/Thánh Tâm/Ích Hậu/Tục Thế là foundation mới cho Tế tự;
- các mục công thức rõ nhưng chưa có current activity dependency được giữ `OUT_OF_SCOPE`;
- Cửu Thần Tổng Luận là `META`, không phải calculator riêng;
- Thượng Sóc, Phản Chi và Ngày Nguyệt Kị đã được mở khóa bằng Can Chi năm + astronomical new-moon/lunar-day context.

Không còn mục Q6 “để sau nhưng chưa rõ vì sao”.

## Phase 2A.2 — Virtue and special-day factors, Quyển 5

Research sau nhóm Quyển 6:

- Thiên Đức
- Nguyệt Đức
- Thiên Đức Hợp
- Nguyệt Đức Hợp
- Nguyệt Không
- Thiên Ân
- Thiên Xá
- Thiên Nguyện
- Mẫu Thương
- Nguyệt Ân
- Tứ Tướng
- Thời Đức

Nguồn Việt:

- Quyển 5, Nghĩa lệ 3, PDF 392 / trang in 386.
- mục Thiên đạo - Thiên đức bắt đầu ngay sau mục lục.

Hán bản Quyển 5 xác nhận cùng nhóm và còn có các ngày/phép phức tạp hơn:

- Ngũ Mộ;
- Tứ Hao/Tứ Phế/Tứ Kị/Tứ Cùng;
- Bát Chuyên;
- Vô Lộc;
- Trùng Nhật;
- Ngũ Hợp/Ngũ Ly;
- Giải Thần;
- Phục Nhật;
- Minh Phệ / Minh Phệ Đối.

Quyển 5 hiện đã được inventory đủ **30/30 section** tại `docs/research/q5-full-inventory.md`. 26 identity đang production có Hán oracle; các section ghép được ghi partial, Thiên Đạo giữ directional; Vô Lộc dùng context năm/tháng/trung khí thay vì danh sách ngày cứng.

### Guardrail Thiên Đức

Thiên Đức có các tháng dùng Can và các tháng dùng quẻ/phương vị (Khôn/Càn/Cấn/Tốn).

Không được tự chuyển các quẻ này thành Chi ngày bằng suy luận hoặc bảng trên internet.

Research phải xác minh:

- sách muốn match ngày theo cách nào;
- Nguyệt biểu biểu diễn chúng ra sao;
- oracle cụ thể cho bốn tháng đặc biệt.

Nếu chưa có oracle rõ, giữ Thiên Đức ở trạng thái COMPARED thay vì VERIFIED.

## Phase 2A.3 — Twelve-officer aliases and wedding-related monthly factors, Quyển 4

Calendar core đã tính Thập Nhị Trực. Quyển 4 cho thấy nhiều tên khác **đồng vị với Trực**, vì vậy không nên tạo calculator riêng cho từng alias.

Nguồn Việt:

- Quyển 4, Nghĩa lệ 2, PDF 302 / trang in 295.
- mục “Kiến trừ mười hai thần” và “Kiến trừ đồng vị khác tên”.

Các alias cần research thành mapping, ví dụ:

- Kiến: Binh Phúc, Tiểu Thời, Thổ Phủ;
- Trừ: Cát Kỳ, Binh Bảo;
- Mãn: Phúc Đức, Thiên Vu;
- Thiên Cẩu là ngoại lệ singleton: chỉ tháng kiến Thân, ngày Tuất; không coi là alias của mọi Trực Mãn;
- Phá: Đại Hao;
- Thành: Thiên Y, Thiên Hỷ;
- Khai: Thời Dương, Sinh Khí;
- Bế: Huyết Chi.

Không coi alias là hai yếu tố độc lập nếu nguồn xác nhận cùng vị trí.

Sau aliases, research:

- Nguyệt Kiến;
- Nguyệt Yếm;
- Yếm Đối;
- Âm Dương Bất Tương;
- các hội âm dương nếu thực sự cần cho activity slice.

### Bất Tương

Ưu tiên representation table-driven theo tháng và Can Chi từ nguồn.

Không cố “rút công thức đẹp” trước khi bảng nguồn đã được nhập và test.

## Quyển 2 — 24 sơn / địa lý nền

Inventory đầy đủ 12/12 section: `docs/research/q2-full-inventory.md`. Các phép Chính Ngũ Hành, Song Sơn, Tam Hợp, Hồng Phạm, khắc Sơn Gia và biến quẻ đều cần spatial/compass target; không kéo vào day-factor engine.

## Quyển 3 — Annual factors

PDF 209 / trang in 207 mở Quyển 3 với các mục như:

- Tuế Đức;
- Tuế Đức Hợp;
- Tuế Can Hợp;
- Tuế Chi Đức;
- Thái Tuế;
- Tuế Phá/Đại Hao;
- Đại Tướng Quân...

Audit đầy đủ đã khóa **36/36 mục đánh số** tại `docs/research/q3-full-inventory.md`. Đây chủ yếu là **annual spatial layer** (`所理之地/方/向`), không phải day-factor layer. Calendar đã có Can Chi năm; blocker thật là current product contract chưa có hướng/tọa-hướng. Giữ book-level `CHUA_IMPLEMENT` cho đến khi có direction-aware vertical.

## Quyển 7 — Day/hour and quý nhân factors

PDF 571 / trang in 564 có:

- Hoàng đạo - Hắc đạo;
- Thiên Ất quý nhân;
- Thiên Quan quý nhân;
- Phúc tinh quý nhân - Hỷ thần;
- Bát lộc;
- Nhật Kiến/Nhật Phá/Nhật Hợp/Nhật Hại/Nhật Hình;
- Tứ đại cát thời;
- Quý đăng thiên môn thời;
- Ngũ bất ngộ thời;
- Cửu xú;
- Tuần trung Không vong;
- Triệt lộ Không vong.

Date-level engine hiện đã chạy và Quyển 7 đã được inventory đủ 13/13 đầu mục. Safe subset đã production gồm Hoàng/Hắc đạo, Thiên Quan, Phúc Tinh, Hỷ Thần, Bát Lộc, Nhật Kiến/Phá/Hợp/Hại/Hình, Ngũ Bất Ngộ và hai marker Không vong. Thiên Ất, Tứ Đại Cát Thời, Quý Đăng Thiên Môn và Cửu Xú giữ `COMPARED` nhưng chưa production vì cần location/sunrise-sunset, Nguyệt tướng tại instant hoặc mô hình 24 vị trí/khắc giờ. Chi tiết: `docs/research/q7-day-hour-auxiliary.md`.

## Quyển 8 — Spatial/directional and advanced annual factors

PDF 635 / trang in 628 mở Quyển 8, gồm các nhóm như:

- Tuế Lộc/Phi Thiên Lộc;
- Phi Thiên Mã;
- Phi cung quý nhân;
- Thông thiên khiếu;
- Tẩu mã lục Nhâm;
- Tứ lợi - Tam nguyên;
- Cái sơn - Hoàng đạo;
- Tam nguyên Cửu tinh;
- Bát tiết - Tam kỳ;
- Tuần sơn La Hầu;
- Tọa sát/Hướng sát;
- các yếu tố phương vị khác.

Inventory đầy đủ 22/22 mục Việt (24 heading Hán do hai cặp bị tách): `docs/research/q8-full-inventory.md`. Giữ ngoài date-selection cho tới khi có domain tọa/hướng/24 sơn/Cửu cung; không để module `factors` hấp thụ logic phương vị.

## Quyển 12–13 — Công quy thiên văn/lịch quan

Inventory: Q12 8/8 top-level, Q13 2/2. Q12 xác nhận sunrise/sunset phụ thuộc latitude và bảng in chỉ cho Kinh sư; Q13 tiếp tục dùng local horizon Kinh sư. Đây là reference cho future solar-event domain, không phải bảng universal để mở khóa Q7. Chi tiết: `docs/research/q12-full-inventory.md`, `docs/research/q13-full-inventory.md`.

## Quyển 9 — Oracle, không phải calculator spec duy nhất

Bản Việt PDF 717 / trang in 710 nói Lập thành chia:

- 10 biểu niên thần;
- 30 biểu nguyệt thần;
- 2 trang nhật thần;
- 6 biểu thời thần.

Project dùng Quyển 9 để:

- xác nhận vị trí thần sát;
- tạo fixture độc lập;
- phát hiện alias/cùng vị trí;
- regression test.

Không chỉ reverse-engineer bảng rồi bỏ qua Nghĩa lệ. Công thức vẫn phải lấy từ Quyển 3–8; Quyển 9 dùng kiểm chứng.

## Thứ tự Phase 2

```text
2A.1 research Quyển 6 core
        ↓
2B.1 implement subset Quyển 6 + oracle
        ↓
2A.2 research Quyển 5 virtue/special days
        ↓
2B.2 implement verified subset
        ↓
2A.3 research Quyển 4 aliases + Bất Tương
        ↓
2B.3 implement verified subset
        ↓
Phase 3: chọn một Dụng sự end-to-end
```

Quyển 3/7/8 chỉ kéo vào khi dependency của một activity thực tế yêu cầu.

## Gate cho implementation

Một factor chỉ vào production khi:

- research note riêng hoặc grouped note có status VERIFIED;
- có mã `MaYeuTo` ổn định;
- có provenance Việt/Hán;
- representation đã chốt;
- có oracle fixture nếu bảng sách cho phép;
- không xung đột với alias mapping đã xác minh.

Nếu chưa đủ, issue phải giữ `status:blocked-source` hoặc research status thấp hơn VERIFIED.

## Quyển 35–36 — Phụ lục và Biện ngụy

- Q35: exact T2 13 mục ↔ 16 heading Hán; `百忌/祀竈/洗頭` gộp, `竒門三元` bị lược và đã vào discrepancy registry.
- Q36: exact T2 26 mục ↔ 27 heading Hán do gộp `章光+五合五離`; TOC “Thiên đạo” là typo, thân bài `Lục đạo/六道` khớp Hán; vẫn là anti-oracle/refutation source.

Chi tiết: `docs/research/q35-full-inventory.md`, `docs/research/q36-full-inventory.md`.
