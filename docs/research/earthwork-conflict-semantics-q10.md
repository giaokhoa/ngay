# Research: Earthwork conflict semantics Quyển 10

Status: VERIFIED

Issue: #72

## Phạm vi

Khóa đầy đủ semantics Quyển 10 cho 18 mục Kị Quyển 11 dùng chung bởi:

- `DONG_THO` — Khởi tạo động thổ / tu tạo — 興造動土〈修造同〉.
- `SUA_CUNG_THAT` — Sửa cung thất — 修宮室.

Nguồn Việt chính là **full scan Tập 1 do người dùng upload**.
Hán bản Quyển 10 là lớp đối chiếu. Không dùng transcription web để thay
nguồn Việt.

## Source pages đã mở lại

Các trang in Quyển 10 dùng cho vertical này:

| Mục                               | Trang in |
| --------------------------------- | -------: |
| Nguyệt Kiến / Tiểu Thời / Thổ Phủ |      787 |
| Nguyệt Phá                        |  788–790 |
| Bình nhật                         |  790–793 |
| Thu nhật                          |  794–796 |
| Bế nhật                           |  797–798 |
| Kiếp Sát                          |  798–800 |
| Tai Sát                           |      800 |
| Nguyệt Sát                        |  801–802 |
| Nguyệt Hình                       |  802–805 |
| Nguyệt Yếm                        |  806–810 |
| Đại Thời                          |  811–812 |
| Thiên Lại                         |  813–814 |
| Tứ Phế                            |  816–817 |
| Ngũ Mộ                            |      819 |
| Thổ Phù / Địa Nang                |      821 |
| Thổ Vượng dụng sự                 |      829 |

PDF working copy dùng khi research có offset ổn định:

`PDF page = trang in + 7`.

## Hán bản đối chiếu

Đã đối chiếu 欽定協紀辨方書 卷十 cho cùng các mục.

Các điểm nền khớp bản Việt:

- danh sách Kị của từng thần/trực;
- các nhánh theo tháng;
- `從月刑論`, `從月煞論`, `從刼煞論`;
- nhánh “chỉ còn Kị quân sự/chữa bệnh”;
- nhánh cát/hung chỉ đủ cân bằng;
- hard-ban “諸事皆忌”;
- special-day của 月厭;
- 土符 / 地囊 vẫn Kị khi gặp 德合赦願;
- 土王用事 “義同土府”.

Khi wording Việt/Hán khác, production provenance phải giữ khác biệt, không
normalize âm thầm.

## Vocabulary outcome

Dùng generic Q10 resolver hiện có:

- `GIU_KY` — giữ contribution Kị.
- `GIU_KY_DU_CO_CAT` — vẫn Kị dù có nhóm cát được source nêu.
- `BO_KY` — bỏ Kị cho activity đang xét.
- `CAN_BANG` — cát/hung chỉ đủ triệt thế thắng; không tự biến thành Nên.
- `CAM_MOI_VIEC` — mọi việc đều Kị; thắng các phép cục bộ.
- `DELEGATE` — theo rule của target khác.
- `THEM_KY` — Q10-only special day tự sinh Kị dù không có factor contribution.
- `BO_NEN` — Q10-only special day bỏ contribution Nên được source nêu.

Hai activity earthwork dùng cùng outcome Q10 cho 18 blocker.
Khác biệt kết quả cuối chỉ có thể đến từ **tập Nên Q11 khác nhau**:

- DONG_THO có Đức/Hợp/Xá/Nguyện trong Nên.
- SUA_CUNG_THAT không có nhóm đó trong Nên.

Vì vậy một nhánh `CAN_BANG` có thể hiển thị cả Nên/Kị ở DONG_THO, trong khi
SUA_CUNG_THAT không nhất thiết có contribution Nên tương ứng để hiển thị.

## 1. Nguyệt Kiến / Thổ Phủ

Nguồn Việt: p.787.

Kị gốc có cả:

- xây dựng cung thất;
- sửa cung thất;
- khởi tạo động thổ.

Thổ Phủ là Kị chuyên cho nhóm công việc đất/xây dựng này.

Khi gặp Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá,
Nguyệt Ân, Tứ Tướng, source vẫn giữ các việc earthwork trong danh sách Kị.

### Outcome

- base: `GIU_KY_DU_CO_CAT`.
- tháng Tý/Ngọ nếu đồng thời Nguyệt Yếm: xét thêm Nguyệt Yếm.
- tháng Thìn/Ngọ/Dậu/Hợi nếu đồng thời Nguyệt Hình: xét thêm Nguyệt Hình.
- không dùng cát thần global để tự xóa Nguyệt Kiến/Thổ Phủ.

## 2. Nguyệt Phá

Nguồn Việt: pp.788–790.

Kị gốc có cả hai earthwork activity.

Gặp bốn Đức/Hợp vẫn Kị earthwork.

### Hard branches

- tháng Tý/Ngọ + Tai Sát, không có Đức/Hợp -> `CAM_MOI_VIEC`.
- tháng Mùi/Thân + Nguyệt Hình, không có Đức/Hợp -> `CAM_MOI_VIEC`.
- tháng Mão/Dậu + Tai Sát + Nguyệt Yếm -> `CAM_MOI_VIEC` ngay cả khi có Đức/Hợp.
- các special hard-day giao phá/xung từ Nguyệt Yếm vẫn `CAM_MOI_VIEC`.

### Outcome

- base: `GIU_KY_DU_CO_CAT`.
- hard overlays có precedence cao hơn.

## 3. Bình nhật

Nguồn Việt: pp.790–793.

### Matrix

| Nhánh                                      | Outcome earthwork         |
| ------------------------------------------ | ------------------------- |
| tháng Hợi                                  | `BO_KY`                   |
| tháng Thân + Thiên Đức hoặc Nguyệt Đức Hợp | `BO_KY`                   |
| tháng Dần / Tỵ                             | `DELEGATE -> NGUYET_HINH` |
| tháng Tý                                   | `DELEGATE -> NGUYET_HINH` |
| tháng Mão / Dậu + Nguyệt Đức               | `CAN_BANG`                |
| tháng Ngọ + Nguyệt Đức Hợp                 | `CAN_BANG`                |
| tháng Thìn / Tuất / Sửu / Mùi              | `DELEGATE -> NGUYET_SAT`  |
| còn lại                                    | `GIU_KY`                  |

## 4. Thu nhật

Nguồn Việt: pp.794–796.

| Nhánh                     | Outcome earthwork         |
| ------------------------- | ------------------------- |
| Dần / Thân / Tỵ / Hợi     | `DELEGATE -> KIEP_SAT`    |
| Mão                       | `DELEGATE -> NGUYET_HINH` |
| Sửu / Tuất                | `DELEGATE -> NGUYET_HINH` |
| Thìn / Mùi + Đức/Hợp      | `BO_KY`                   |
| Tý / Ngọ + Nguyệt Đức Hợp | `CAN_BANG`                |
| Dậu + Nguyệt Đức          | `CAN_BANG`                |
| còn lại                   | `GIU_KY`                  |

## 5. Bế nhật

Nguồn Việt: pp.797–798.

Kị gốc có rõ xây/sửa cung thất và khởi tạo động thổ.

| Nhánh                                       | Outcome                  |
| ------------------------------------------- | ------------------------ |
| Dần / Thân / Tỵ / Hợi                       | `DELEGATE -> NGUYET_SAT` |
| Tý / Ngọ / Mão / Dậu + Đức/Hợp/Xá/Nguyện    | `CAN_BANG`               |
| Thìn / Tuất / Sửu / Mùi + Đức/Hợp/Xá/Nguyện | `CAN_BANG`               |
| còn lại                                     | `GIU_KY`                 |

Câu nguồn “chỗ Kị không chú Nên, chỗ Nên không chú Kị” không được đổi thành
“cát thắng”.

## 6. Kiếp Sát

Nguồn Việt: pp.798–800.

| Nhánh                                                 | Outcome    |
| ----------------------------------------------------- | ---------- |
| Dần / Thân                                            | `BO_KY`    |
| Tỵ / Hợi + Nguyệt Đức hoặc Thiên Đức Hợp              | `BO_KY`    |
| Thìn / Tuất / Sửu / Mùi + bốn Đức/Hợp                 | `BO_KY`    |
| Thìn / Tuất / Sửu / Mùi không Đức/Hợp                 | `CAN_BANG` |
| Tý / Ngọ / Mão / Dậu + Nguyệt Đức hoặc Nguyệt Đức Hợp | `CAN_BANG` |
| còn lại                                               | `GIU_KY`   |

## 7. Tai Sát

Nguồn Việt: p.800.

| Nhánh                                 | Outcome                  |
| ------------------------------------- | ------------------------ |
| Tý / Ngọ / Mão / Dậu                  | `DELEGATE -> NGUYET_PHA` |
| Dần / Thân / Tỵ / Hợi + bốn Đức/Hợp   | `BO_KY`                  |
| Dần / Thân / Tỵ / Hợi không Đức/Hợp   | `CAN_BANG`               |
| Thìn / Tuất / Sửu / Mùi + bốn Đức/Hợp | `BO_KY`                  |
| còn lại                               | `GIU_KY`                 |

## 8. Nguyệt Sát

Nguồn Việt: pp.801–802.

| Nhánh                                                             | Outcome                 |
| ----------------------------------------------------------------- | ----------------------- |
| Mão / Dậu + Nguyệt Đức + Thiên Nguyện                             | `BO_KY`                 |
| Mão / Dậu còn lại                                                 | `CAN_BANG`              |
| Tý / Ngọ + Nguyệt Đức Hợp                                         | `CAN_BANG`              |
| Dần / Thân / Tỵ / Hợi hoặc Thìn / Tuất / Sửu / Mùi, không Đức/Hợp | `CAM_MOI_VIEC`          |
| cùng các nhóm trên nhưng có Đức/Hợp                               | `GIU_KY` theo thường lệ |
| còn lại                                                           | `GIU_KY`                |

Đức ở nhánh cuối chỉ tránh hard-all; không tự bỏ earthwork Kị.

## 9. Nguyệt Hình

Nguồn Việt: pp.802–805.

| Nhánh                                          | Outcome                  |
| ---------------------------------------------- | ------------------------ |
| Tỵ + Nguyệt Đức + Thiên Đức Hợp + Thiên Nguyện | `BO_KY`                  |
| Tỵ còn lại                                     | `CAN_BANG`               |
| Ngọ                                            | `DELEGATE -> NGUYET_YEM` |
| Tý / Mão / Mùi / Thân không Đức/Hợp            | `CAM_MOI_VIEC`           |
| Tý / Mão / Mùi / Thân có Đức/Hợp               | `GIU_KY`                 |
| Dần / Thìn / Dậu / Hợi / Sửu / Tuất + Đức/Hợp  | `CAN_BANG`               |
| còn lại                                        | `GIU_KY`                 |

## 10. Nguyệt Yếm

Nguồn Việt: pp.806–810.

Đây là mục có khác biệt activity-specific lớn nhất so với DI_CHUYEN.

### Month branches

| Nhánh                                                                | Outcome earthwork |
| -------------------------------------------------------------------- | ----------------- |
| Dần / Thân / Sửu / Mùi + Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp | `BO_KY`           |
| Thìn / Tuất / Tỵ / Hợi + Thiên Đức / Nguyệt Đức / Nguyệt Đức Hợp     | `CAN_BANG`        |
| Tý / Ngọ + Thiên Xá                                                  | `GIU_KY`          |
| Tý / Ngọ không Thiên Xá                                              | `CAM_MOI_VIEC`    |
| Mão / Dậu + Nguyệt Phá + Tai Sát                                     | `CAM_MOI_VIEC`    |

Điểm khác DI_CHUYEN:

Ở Dần/Thân/Sửu/Mùi gặp cát, danh sách Kị còn lại trên p.807 **không có**
xây dựng/sửa cung thất/khởi tạo động thổ, nên earthwork `BO_KY`.

### Hard special days

Các nhóm Đại hội, Tiểu hội, Tam âm, Âm vị, Âm dương giao phá, Âm dương kích
xung, Dương phá âm xung, Đạo âm xung dương... được source ghi “mọi việc đều
phải Kị” -> `CAM_MOI_VIEC`.

### Tuế bạc / Trục trận

Theo chỗ Kị của Nguyệt Yếm -> earthwork vẫn Kị.

Riêng:

- tháng Tư Bính Ngọ;
- tháng Sáu Mậu Ngọ;

source ghi không theo chỗ Nên của `德願`.

Với DONG_THO:

- `THEM_KY`;
- `BO_NEN` đúng nhóm Đức + Nguyện theo ADR 0008.

Với SUA_CUNG_THAT, tập Nên Q11 không có các contribution này, nên
`BO_NEN` thường không thay đổi visible Nên.

### Dương thác

Source nói theo chỗ Kị của **Kiến**.

Khác DI_CHUYEN:

- earthwork vốn bị Nguyệt Kiến / Thổ Phủ Kị;
- vì vậy Dương thác **vẫn Kị earthwork**, không được dùng rule DI_CHUYEN
  “bỏ Kị”.

Tháng Sáu Kỷ Mùi còn ghi không theo chỗ Nên của `德合`:

- giữ earthwork Kị;
- DONG_THO bỏ contribution Nên Đức + Hợp theo ADR 0008.

Tỵ/Kỷ Tỵ là Tiểu hội hard-ban -> `CAM_MOI_VIEC`.

### Âm thác

Theo chỗ Kị của Nguyệt Yếm -> earthwork Kị.

Các ngày đồng thời Đại hội/Nguyệt Phá/hard group vẫn `CAM_MOI_VIEC`.

Tháng Sáu:

- Đinh Tỵ;
- Kỷ Tỵ;

thuộc Đại hội -> mọi việc Kị.

## 11. Đại Thời

Nguồn Việt: pp.811–812.

| Nhánh                     | Outcome                   |
| ------------------------- | ------------------------- |
| Dần / Thân / Tỵ / Hợi     | `BO_KY`                   |
| Thìn / Tuất               | `BO_KY`                   |
| Sửu / Mùi + Đức/Hợp       | `BO_KY`                   |
| Mão                       | `DELEGATE -> NGUYET_HINH` |
| Tý / Ngọ + Nguyệt Đức Hợp | `CAN_BANG`                |
| Dậu + Nguyệt Đức          | `CAN_BANG`                |
| còn lại                   | `GIU_KY`                  |

## 12. Thiên Lại

Nguồn Việt: pp.813–814.

| Nhánh                                       | Outcome                   |
| ------------------------------------------- | ------------------------- |
| Dần / Thân / Tỵ / Hợi + bốn Đức/Hợp         | `BO_KY`                   |
| Thìn / Tuất / Sửu / Mùi + Đức/Hợp/Xá/Nguyện | `CAN_BANG`                |
| Ngọ / Mão / Dậu                             | `DELEGATE -> BINH`        |
| Tý                                          | `DELEGATE -> NGUYET_HINH` |
| còn lại                                     | `GIU_KY`                  |

## 13. Tứ Phế

Nguồn Việt: pp.816–817.

Danh sách Kị có rõ:

- xây dựng cung thất;
- sửa cung thất;
- khởi tạo động thổ.

Gặp Đức/Hợp vẫn Kị.

Gặp thêm Nguyệt Phá -> mọi việc đều Kị.

### Outcome

- base: `GIU_KY_DU_CO_CAT`.
- - Nguyệt Phá: `CAM_MOI_VIEC`.

## 14. Ngũ Mộ

Nguồn Việt: p.819.

Kị có đủ nhóm earthwork.

- tháng Ngọ hoặc Tý + Nguyệt Đức -> `BO_KY`.
- còn lại -> `GIU_KY`.

## 15. Thổ Phù / Địa Nang

Nguồn Việt: p.821.

Kị rõ:

- xây dựng cung thất;
- sửa cung thất;
- khởi tạo động thổ.

“Gộp cùng với Đức hợp, Xá Nguyện vẫn phải Kị.”

### Outcome

- `GIU_KY_DU_CO_CAT`.

Base vertical đã implement semantic này.

## 16. Thổ Vượng dụng sự

Nguồn Việt: p.829.

Kị rõ:

- xây dựng cung thất;
- sửa cung thất;
- khởi tạo động thổ.

“Nghĩa giống Thổ Phủ.”

### Outcome

Typed calendar target `THO_VUONG`:

- `GIU_KY_DU_CO_CAT`.
- không tạo `MaYeuTo.THO_VUONG`.
- dùng `boiCanh.dangThoVuong`.

Base vertical đã implement semantic này.

## Shared outcome matrix

Hai activity dùng cùng Q10 outcome cho Kị tương ứng.

| Blocker               | Default | Branch chính                        |
| --------------------- | ------- | ----------------------------------- |
| Nguyệt Kiến / Thổ Phủ | giữ Kị  | cát không xóa earthwork             |
| Nguyệt Phá            | giữ Kị  | hard overlays                       |
| Bình                  | giữ Kị  | BO / CAN_BANG / delegate            |
| Thu                   | giữ Kị  | BO / CAN_BANG / delegate            |
| Bế                    | giữ Kị  | CAN_BANG / delegate                 |
| Kiếp Sát              | giữ Kị  | BO / CAN_BANG                       |
| Tai Sát               | giữ Kị  | BO / CAN_BANG / delegate Phá        |
| Nguyệt Sát            | giữ Kị  | BO / CAN_BANG / hard                |
| Nguyệt Hình           | giữ Kị  | BO / CAN_BANG / delegate Yếm / hard |
| Nguyệt Yếm            | giữ Kị  | BO / CAN_BANG / special-day / hard  |
| Đại Thời              | giữ Kị  | BO / CAN_BANG / delegate Hình       |
| Thiên Lại             | giữ Kị  | BO / CAN_BANG / delegate Bình/Hình  |
| Tứ Phế                | giữ Kị  | Đức không hóa; + Phá hard           |
| Ngũ Mộ                | giữ Kị  | Ngọ/Tý + Nguyệt Đức BO              |
| Thổ Phù               | giữ Kị  | Đức/Hợp/Xá/Nguyện không hóa         |
| Địa Nang              | giữ Kị  | Đức/Hợp/Xá/Nguyện không hóa         |
| Thổ Vượng             | giữ Kị  | nghĩa giống Thổ Phủ                 |

## Regression-vector plan

Tối thiểu phải có các vector độc lập:

1. Nguyệt Kiến + Nguyệt Ân vẫn Kị earthwork.
2. Nguyệt Phá + Thiên Đức vẫn Kị.
3. Nguyệt Phá Mão + Tai Sát + Nguyệt Yếm -> hard-all.
4. Bình tháng Hợi -> bỏ Kị.
5. Bình Mão + Nguyệt Đức -> `CAN_BANG`.
6. Bình Thìn -> delegate Nguyệt Sát.
7. Thu Dần -> delegate Kiếp Sát.
8. Thu Thìn + Thiên Đức -> bỏ Kị.
9. Bế Dần -> delegate Nguyệt Sát.
10. Bế Thìn + Thiên Xá -> `CAN_BANG`.
11. Kiếp Sát Dần -> bỏ Kị.
12. Tai Sát Tý -> delegate Nguyệt Phá.
13. Nguyệt Sát Mão + Nguyệt Đức + Thiên Nguyện -> bỏ Kị.
14. Nguyệt Sát Dần không Đức/Hợp -> hard-all.
15. Nguyệt Hình Tỵ + required cát -> bỏ Kị.
16. Nguyệt Hình Tý không Đức/Hợp -> hard-all.
17. Nguyệt Yếm Dần + Nguyệt Đức -> **bỏ Kị earthwork**.
18. Nguyệt Yếm Dương thác Giáp Dần -> **vẫn Kị earthwork**.
19. Nguyệt Yếm Mùi/Kỷ Mùi -> vẫn Kị + DONG_THO bỏ Nên Đức/Hợp.
20. Nguyệt Yếm Mùi/Kỷ Tỵ -> hard-all.
21. Đại Thời Dần -> bỏ Kị.
22. Đại Thời Mão -> delegate Nguyệt Hình.
23. Thiên Lại Dần + Thiên Đức -> bỏ Kị.
24. Thiên Lại Ngọ -> delegate Bình.
25. Tứ Phế + Đức/Hợp -> vẫn Kị.
26. Tứ Phế + Nguyệt Phá -> hard-all.
27. Ngũ Mộ Ngọ + Nguyệt Đức -> bỏ Kị.
28. Thổ Phù + Thiên Xá -> vẫn Kị.
29. Địa Nang + Thiên Nguyện -> vẫn Kị.
30. `dangThoVuong=true` + cát -> vẫn Kị.
31. cùng một `CAN_BANG` vector chạy cả DONG_THO và SUA_CUNG_THAT để guard
    khác biệt visible Nên do Q11 set khác nhau.
32. Q10 special-day global rule chạy được khi không có `NGUYET_YEM` factor.

## Implementation constraints

1. Tái dùng generic resolver theo ADR 0008; không fork chuỗi `if`.
2. Hard-ban thắng local balance/removal.
3. Delegation recursive + cycle-safe.
4. Equal-precedence outcome conflict phải fail loud.
5. Q10-only special-day operations có thể chạy không cần factor contribution.
6. `德願` và `德合` phải giữ source-exact group semantics.
7. Dương thác earthwork không được copy outcome của DI_CHUYEN.
8. Không tự sinh Nên.
9. Không biến `CAN_BANG` thành global “cát thắng”.
10. Trace phải giữ nguồn Việt/Hán.

## Trạng thái

- [x] exact Vietnamese Q10 pages reopened from canonical user-uploaded source
- [x] Hán Q10 COMPARED
- [x] all 18 Q11 blockers mapped
- [x] delegation branches source-locked
- [x] hard-ban branches source-locked
- [x] Nguyệt Yếm special Can-Chi branches source-locked
- [x] Dương thác earthwork difference VERIFIED
- [x] independent regression-vector plan defined
- [ ] full Q10 earthwork rules IMPLEMENTED
- [ ] full Q10 earthwork regression vectors ORACLE_TESTED
