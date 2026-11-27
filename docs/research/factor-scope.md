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

### Chưa kéo vào batch đầu

Các yếu tố còn lại của Quyển 6 như:

- Đại thời/Đại bại/Hàm trì;
- Du họa;
- Thiên lại/Trí tử;
- Binh cát;
- Yếu an, Ngọc vũ, Kim đường, Kính an, Phổ hộ, Phúc sinh;
- Dương đức, Âm đức, Thiên mã;
- Binh cấm, Địa nang, Thổ phù;
- Đại sát, Quy kị, Vãng vong, Khí vãng vong;
- Thượng sóc, Phản chi;
- Tứ ly/Tứ tuyệt;
- Ngày Nguyệt kị.

Không bỏ chúng; chỉ tách khỏi batch đầu để review/test nhỏ.

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

Các mục phức tạp này là batch sau, không trộn vào PR đầu.

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
- Mãn: Phúc Đức, Thiên Vu, Thiên Cẩu;
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

## Quyển 3 — Annual factors

PDF 209 / trang in 207 mở Quyển 3 với các mục như:

- Tuế Đức;
- Tuế Đức Hợp;
- Tuế Can Hợp;
- Tuế Chi Đức;
- Thái Tuế;
- Tuế Phá/Đại Hao;
- Đại Tướng Quân...

Đây là nhóm theo năm và có thể cần sau, nhưng không chặn vertical slice ngày theo tháng/ngày.

Defer khỏi Phase 2 core trừ khi một Dụng sự MVP bắt buộc dùng.

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

Một phần đáng dùng về sau nhưng chứa logic giờ và hệ quý nhân. Không đưa vào Phase 2 core trước khi date-level engine chạy.

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

Defer khỏi MVP date-selection. Không để module `factors` hấp thụ logic phương vị khi product chưa có input hướng/phương.

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
