# Research: KHAI_TRUONG

Status: VERIFIED

Issue: #76

## Phạm vi

Source-lock activity `KHAI_TRUONG` từ Quyển 11, hai factor còn thiếu từ Quyển 5,
và semantics Quyển 10 cho toàn bộ 19 mục Kị.

Nguồn Việt chính là **full scan Tập 1 do người dùng upload**.
Hán bản chỉ là lớp đối chiếu; không dùng transcription web để thay bản Việt.

## Q11 — Khai trương

Nguồn Việt: Tập 1, Quyển 11, trang in 857.

### Nên — 6

1. Thiên Nguyện
2. Dân Nhật — 民日
3. ngày Mãn
4. ngày Thành
5. ngày Khai
6. Ngũ Phú

### Correction quan trọng: Dân Nhật, không phải Dần nhật

Ảnh scan ghi **“ngày Dân”**.

Hán Q11:

`開市 宜天願民日滿日成日開日五富`

Vì vậy:

- dùng `MaYeuTo.DAN_NHAT`;
- không dùng `CHI_NGAY:DAN`;
- không tạo factor mới.

### Kị — 19

1. Nguyệt Phá
2. Đại Hao
3. ngày Bình
4. ngày Thu
5. ngày Bế
6. Kiếp Sát
7. Tai Sát
8. Nguyệt Sát
9. Nguyệt Hình
10. Nguyệt Hại
11. Nguyệt Yếm
12. Đại Thời
13. Thiên Lại
14. Tiểu Hao
15. Tứ Hao
16. Tứ Phế
17. Tứ Cùng
18. Ngũ Mộ
19. Cửu Không

Hán Q11:

`忌月破大耗平日收日閉日劫煞災煞月煞月刑月害月厭大時天吏小耗四耗四廢四窮五墓九空`

Hai bản khớp.

## Typed representation Q11

Nên:

- `YEU_TO:THIEN_NGUYEN`
- `YEU_TO:DAN_NHAT`
- `TRUC:MAN`
- `TRUC:THANH`
- `TRUC:KHAI`
- `YEU_TO:NGU_PHU`

Kị:

- 16 factor targets;
- `TRUC:BINH`;
- `TRUC:THU`;
- `TRUC:BE`.

Không cần thêm target type mới.

## Dependency matrix

### Đã có production

- Thiên Nguyện
- Dân Nhật
- Ngũ Phú
- Trực Mãn / Thành / Khai
- Nguyệt Phá
- Đại Hao
- Bình / Thu / Bế
- Kiếp Sát
- Tai Sát
- Nguyệt Sát
- Nguyệt Hình
- Nguyệt Hại
- Nguyệt Yếm
- Đại Thời
- Thiên Lại
- Tiểu Hao
- Tứ Phế
- Tứ Cùng
- Ngũ Mộ

### Còn thiếu

- Tứ Hao — 四耗
- Cửu Không — 九空

## Tứ Hao — 四耗

### Nguồn Việt

Tập 1, Quyển 5, trang in 436–437.

“Lịch lệ” và “Khảo nguyên” cùng cho:

| Mùa  | Can Chi ngày |
| ---- | ------------ |
| Xuân | Nhâm Tý      |
| Hạ   | Ất Mão       |
| Thu  | Mậu Ngọ      |
| Đông | Tân Dậu      |

### Hán đối chiếu

`四耗者四時休幹臨旺支也春壬子夏乙卯秋戊午冬辛酉`

Khớp bản Việt.

### Representation

`Can Chi theo mùa`.

Dùng `DinhNghiaYeuToCanChiTheoMua`.

### Oracle

- 12 Chi tháng x full 60-day sexagenary cycle.
- expected độc lập:
  - Xuân Nhâm Tý;
  - Hạ Ất Mão;
  - Thu Mậu Ngọ;
  - Đông Tân Dậu.

## Cửu Không — 九空

### Nguồn Việt

Tập 1, Quyển 5, trang in 432.

“Lịch lệ”:

“Cửu Không, tháng Giêng khởi Thìn, nghịch hành tứ quý.”

Bảng 12 tháng:

| Chi tháng | Chi ngày |
| --------- | -------- |
| Dần       | Thìn     |
| Mão       | Sửu      |
| Thìn      | Tuất     |
| Tỵ        | Mùi      |
| Ngọ       | Thìn     |
| Mùi       | Sửu      |
| Thân      | Tuất     |
| Dậu       | Mùi      |
| Tuất      | Thìn     |
| Hợi       | Sửu      |
| Tý        | Tuất     |
| Sửu       | Mùi      |

### Hán đối chiếu

`九空者正月辰逆行四季`

Khớp bản Việt.

### Representation

`Chi tháng -> một Chi ngày`.

Dùng `DinhNghiaYeuToTheoChiThang`.

### Oracle

- 12 Chi tháng x 12 Chi ngày.
- sequence expected độc lập:
  `THIN, SUU, TUAT, MUI` lặp ba lần.

# Q10 — KHAI_TRUONG conflict semantics

## Source pages đã mở lại

| Mục                  | Trang in |
| -------------------- | -------: |
| Nguyệt Phá / Đại Hao |  788–790 |
| Bình nhật            |  790–793 |
| Thu nhật             |  794–796 |
| Bế nhật              |  797–798 |
| Kiếp Sát             |  798–800 |
| Tai Sát              |      800 |
| Nguyệt Sát           |  801–802 |
| Nguyệt Hình          |  802–805 |
| Nguyệt Hại           |  805–806 |
| Nguyệt Yếm           |  806–810 |
| Đại Thời             |  811–812 |
| Thiên Lại            |  813–814 |
| Tiểu Hao             |      815 |
| Tứ Hao               |      816 |
| Tứ Phế               |  816–817 |
| Tứ Cùng              |  817–818 |
| Ngũ Mộ               |      819 |
| Cửu Không            |      820 |

Đã đối chiếu Hán Quyển 10 cho cùng các mục.

## 1. Nguyệt Phá / Đại Hao

Q10 coi Đại Hao là alias của Nguyệt Phá trong mục `月破〈大耗〉`.

Khai trương nằm trong danh sách Kị.

Gặp bốn Đức/Hợp vẫn Kị khai trương.

Hard branches dùng cùng precedence như vertical đã source-lock:

- Tý/Ngọ + Tai Sát, không Đức/Hợp -> `CAM_MOI_VIEC`.
- Mùi/Thân + Nguyệt Hình, không Đức/Hợp -> `CAM_MOI_VIEC`.
- Mão/Dậu + Tai Sát + Nguyệt Yếm -> `CAM_MOI_VIEC` dù có Đức/Hợp.

### Outcome

- Nguyệt Phá: base `GIU_KY_DU_CO_CAT`.
- Đại Hao: cùng semantics với Nguyệt Phá.
- hard overlay thắng.

## 2. Bình nhật

| Nhánh                                | Outcome KHAI_TRUONG       |
| ------------------------------------ | ------------------------- |
| Hợi                                  | `BO_KY`                   |
| Thân + Thiên Đức hoặc Nguyệt Đức Hợp | `BO_KY`                   |
| Dần / Tỵ / Tý                        | `DELEGATE -> NGUYET_HINH` |
| Mão / Dậu + Nguyệt Đức               | `CAN_BANG`                |
| Ngọ + Nguyệt Đức Hợp                 | `CAN_BANG`                |
| Thìn / Tuất / Sửu / Mùi              | `DELEGATE -> NGUYET_SAT`  |
| còn lại                              | `GIU_KY`                  |

## 3. Thu nhật

| Nhánh                     | Outcome                   |
| ------------------------- | ------------------------- |
| Dần / Thân / Tỵ / Hợi     | `DELEGATE -> KIEP_SAT`    |
| Mão                       | `DELEGATE -> NGUYET_HINH` |
| Sửu / Tuất                | `DELEGATE -> NGUYET_HINH` |
| Thìn / Mùi + Đức/Hợp      | `BO_KY`                   |
| Tý / Ngọ + Nguyệt Đức Hợp | `CAN_BANG`                |
| Dậu + Nguyệt Đức          | `CAN_BANG`                |
| còn lại                   | `GIU_KY`                  |

## 4. Bế nhật

| Nhánh                                       | Outcome                  |
| ------------------------------------------- | ------------------------ |
| Dần / Thân / Tỵ / Hợi                       | `DELEGATE -> NGUYET_SAT` |
| Tý / Ngọ / Mão / Dậu + Đức/Hợp/Xá/Nguyện    | `CAN_BANG`               |
| Thìn / Tuất / Sửu / Mùi + Đức/Hợp/Xá/Nguyện | `CAN_BANG`               |
| còn lại                                     | `GIU_KY`                 |

## 5. Kiếp Sát

| Nhánh                                                 | Outcome    |
| ----------------------------------------------------- | ---------- |
| Dần / Thân                                            | `BO_KY`    |
| Tỵ / Hợi + Nguyệt Đức hoặc Thiên Đức Hợp              | `BO_KY`    |
| Thìn / Tuất / Sửu / Mùi + Đức/Hợp                     | `BO_KY`    |
| Thìn / Tuất / Sửu / Mùi không Đức/Hợp                 | `CAN_BANG` |
| Tý / Ngọ / Mão / Dậu + Nguyệt Đức hoặc Nguyệt Đức Hợp | `CAN_BANG` |
| còn lại                                               | `GIU_KY`   |

## 6. Tai Sát

| Nhánh                               | Outcome                  |
| ----------------------------------- | ------------------------ |
| Tý / Ngọ / Mão / Dậu                | `DELEGATE -> NGUYET_PHA` |
| Dần / Thân / Tỵ / Hợi + Đức/Hợp     | `BO_KY`                  |
| Dần / Thân / Tỵ / Hợi không Đức/Hợp | `CAN_BANG`               |
| Thìn / Tuất / Sửu / Mùi + Đức/Hợp   | `BO_KY`                  |
| còn lại                             | `GIU_KY`                 |

## 7. Nguyệt Sát

| Nhánh                                                            | Outcome        |
| ---------------------------------------------------------------- | -------------- |
| Mão / Dậu + Nguyệt Đức + Thiên Nguyện                            | `BO_KY`        |
| Mão / Dậu còn lại                                                | `CAN_BANG`     |
| Tý / Ngọ + Nguyệt Đức Hợp                                        | `CAN_BANG`     |
| Dần / Thân / Tỵ / Hợi hoặc Thìn / Tuất / Sửu / Mùi không Đức/Hợp | `CAM_MOI_VIEC` |
| cùng nhóm nhưng có Đức/Hợp                                       | `GIU_KY`       |
| còn lại                                                          | `GIU_KY`       |

## 8. Nguyệt Hình

| Nhánh                                          | Outcome                  |
| ---------------------------------------------- | ------------------------ |
| Tỵ + Nguyệt Đức + Thiên Đức Hợp + Thiên Nguyện | `BO_KY`                  |
| Tỵ còn lại                                     | `CAN_BANG`               |
| Ngọ                                            | `DELEGATE -> NGUYET_YEM` |
| Tý / Mão / Mùi / Thân không Đức/Hợp            | `CAM_MOI_VIEC`           |
| Tý / Mão / Mùi / Thân có Đức/Hợp               | `GIU_KY`                 |
| Dần / Thìn / Dậu / Hợi / Sửu / Tuất + Đức/Hợp  | `CAN_BANG`               |
| còn lại                                        | `GIU_KY`                 |

## 9. Nguyệt Hại

Khai trương nằm trong Kị gốc.

| Nhánh                                           | Outcome                   |
| ----------------------------------------------- | ------------------------- |
| Mão / Dậu + Thiên Đức hoặc Nguyệt Đức           | `BO_KY`                   |
| Sửu / Mùi + Thiên Đức hoặc Nguyệt Đức           | `BO_KY`                   |
| Thìn / Tuất + Thiên Đức Hợp hoặc Nguyệt Đức Hợp | `CAN_BANG`                |
| Tý / Ngọ                                        | `DELEGATE -> NGUYET_SAT`  |
| Tỵ / Hợi                                        | `DELEGATE -> KIEP_SAT`    |
| Dần                                             | `DELEGATE -> NGUYET_HINH` |
| Thân                                            | `DELEGATE -> BINH`        |
| còn lại                                         | `GIU_KY`                  |

Hán Q10 xác nhận:

- `卯酉...` và `丑未...` gặp Thiên Đức/Nguyệt Đức thì ngoài quân sự/chữa bệnh không Kị;
- `辰戌...` gặp Đức Hợp thì chỉ cân bằng;
- `子午月值月煞 巳亥月值刼煞 寅月值月刑 申月值平日 各從重論`.

## 10. Nguyệt Yếm

Khai trương nằm trong Kị gốc.

### Month branches

| Nhánh                                                                | Outcome        |
| -------------------------------------------------------------------- | -------------- |
| Dần / Thân / Sửu / Mùi + Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp | `BO_KY`        |
| Thìn / Tuất / Tỵ / Hợi + Thiên Đức / Nguyệt Đức / Nguyệt Đức Hợp     | `CAN_BANG`     |
| Tý / Ngọ + Thiên Xá                                                  | `GIU_KY`       |
| Tý / Ngọ không Thiên Xá                                              | `CAM_MOI_VIEC` |
| Mão / Dậu + Nguyệt Phá + Tai Sát                                     | `CAM_MOI_VIEC` |

### Special days

Hard groups “mọi việc đều Kị” -> `CAM_MOI_VIEC`.

Tuế bạc / Trục trận theo Kị Nguyệt Yếm -> khai trương vẫn Kị.

Riêng Tỵ/Bính Ngọ và Mùi/Mậu Ngọ:

- vẫn Kị;
- không theo chỗ Nên của `德願`.
- KHAI_TRUONG Q11 chỉ có Thiên Nguyện trong nhóm này, nên loại contribution
  `THIEN_NGUYEN`; không tự mở rộng sang factor Hợp.

### Dương thác

Dương thác theo chỗ Kị của **Kiến**.

Q10 Nguyệt Kiến **không Kị khai trương**, vì vậy KHAI_TRUONG trên Dương thác:

- không nhận Kị từ Nguyệt Yếm;
- `BO_KY`/không tự sinh Kị.

Tháng Sáu Kỷ Mùi có thêm `德合`, nhưng KHAI_TRUONG Q11 không có Đức/Hợp
trong tập Nên, nên không có contribution Nên liên quan để loại.

### Âm thác

Theo Kị Nguyệt Yếm -> khai trương Kị.

Hard exceptions vẫn hard-ban.

## 11. Đại Thời

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

| Nhánh                                       | Outcome                   |
| ------------------------------------------- | ------------------------- |
| Dần / Thân / Tỵ / Hợi + Đức/Hợp             | `BO_KY`                   |
| Thìn / Tuất / Sửu / Mùi + Đức/Hợp/Xá/Nguyện | `CAN_BANG`                |
| Ngọ / Mão / Dậu                             | `DELEGATE -> BINH`        |
| Tý                                          | `DELEGATE -> NGUYET_HINH` |
| còn lại                                     | `GIU_KY`                  |

## 13. Tiểu Hao

Nguồn Việt: p.815.

Kị gốc có:

- sửa kho tàng;
- khai trương;
- lập hợp đồng;
- giao dịch;
- nạp tài;
- mở kho;
- xuất tài hàng.

Gặp Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Nguyện:

- chỉ còn Kị quân sự/chữa bệnh;
- KHAI_TRUONG -> `BO_KY`.

Ngoại lệ Tý/Ngọ/Mão/Dậu khi đồng thời Kiếp Sát và nhánh Nguyệt Đức /
Nguyệt Đức Hợp vẫn giữ Kị khai trương.

### Outcome

- cát branch thường: `BO_KY`.
- cardinal + Kiếp Sát special branch: `GIU_KY`.
- base: `GIU_KY`.

## 14. Tứ Hao

Nguồn Việt: p.816.

Kị gốc có khai trương.

Các nhánh sau chỉ còn Kị quân sự, nên KHAI_TRUONG `BO_KY`:

- tháng Thìn + Thiên Đức hoặc Nguyệt Đức;
- tháng Dần / Thân + Thiên Đức Hợp;
- tháng Tỵ + Nguyệt Đức Hợp;
- tháng Thìn / Tuất / Sửu / Mùi + Tam Hợp.

Còn lại `GIU_KY`.

## 15. Tứ Phế

Kị gốc có khai trương.

- gặp Đức/Hợp vẫn Kị;
- - Nguyệt Phá -> mọi việc đều Kị.

Outcome:

- base `GIU_KY_DU_CO_CAT`;
- - Nguyệt Phá `CAM_MOI_VIEC`.

## 16. Tứ Cùng

Nguồn Việt: pp.817–818.

Tứ Cùng kị thêm:

- sửa kho tàng;
- khai trương;
- lập hợp đồng;
- giao dịch;
- nạp tài;
- mở kho;
- xuất tài hàng.

Đặc biệt tháng Dần, ngày Ất Hợi gặp Thiên Nguyện:

- chỉ còn Kị quân sự;
- KHAI_TRUONG `BO_KY`.

Còn lại `GIU_KY`.

## 17. Ngũ Mộ

Nguồn Việt: p.819.

Kị gốc có khai trương.

Tháng Ngọ hoặc Tý + Nguyệt Đức:

- KHAI_TRUONG `BO_KY`.

Còn lại `GIU_KY`.

## 18. Cửu Không

Nguồn Việt: p.820.

Kị gốc có:

- tiến nhân khẩu;
- sửa kho tàng;
- khai trương;
- lập hợp đồng;
- giao dịch;
- nạp tài;
- mở kho;
- xuất tài hàng.

### Branches

- Dần / Thân + Mãn;
- Tý / Ngọ / Mão / Dậu + Khai;

nếu đồng thời có:

- Nguyệt Đức;
- Thiên Đức Hợp;
- Nguyệt Đức Hợp;

thì chỉ còn Kị quân sự, nên KHAI_TRUONG `BO_KY`.

- Thìn / Tuất / Sửu / Mùi -> `DELEGATE -> NGUYET_PHA`.
- Tỵ / Hợi -> `DELEGATE -> NGUYET_YEM`.
- còn lại -> `GIU_KY`.

## Đại Hao identity

Q11 liệt kê cả `NGUYET_PHA` và `DAI_HAO`.

Production phải giữ hai contribution identity như Q11, nhưng Q10 semantics của
`DAI_HAO` delegate/alias về `NGUYET_PHA`.

Không xóa một identity chỉ vì Q10 đặt cùng heading `月破〈大耗〉`.

## Regression-vector plan

Tối thiểu:

1. Q11 exact 6 Nên / 19 Kị.
2. Dân Nhật là factor, không phải Chi Dần.
3. Tứ Hao full seasonal 60-cycle oracle.
4. Cửu Không 12x12 oracle.
5. Nguyệt Phá + Thiên Đức vẫn Kị.
6. Đại Hao dùng cùng Q10 outcome Nguyệt Phá.
7. Bình Hợi bỏ Kị.
8. Bình Thìn delegate Nguyệt Sát.
9. Thu Dần delegate Kiếp Sát.
10. Bế Dần delegate Nguyệt Sát.
11. Kiếp Sát Dần bỏ Kị.
12. Tai Sát Tý delegate Nguyệt Phá.
13. Nguyệt Sát Dần không Đức/Hợp hard-ban.
14. Nguyệt Hình Tỵ + required cát bỏ Kị.
15. Nguyệt Hại Mão + Thiên Đức bỏ Kị.
16. Nguyệt Hại Thìn + Thiên Đức Hợp cân bằng.
17. Nguyệt Hại Tý delegate Nguyệt Sát.
18. Nguyệt Yếm Dần + Nguyệt Đức bỏ Kị.
19. Dương thác Giáp Dần không tự sinh Kị KHAI_TRUONG.
20. Tuế bạc Tỵ/Bính Ngọ vẫn Kị và loại Thiên Nguyện.
21. Đại Thời Dần bỏ Kị.
22. Thiên Lại Ngọ delegate Bình.
23. Tiểu Hao + Thiên Nguyện bỏ Kị.
24. Tiểu Hao cardinal + Kiếp Sát special branch vẫn Kị.
25. Tứ Hao Thìn + Thiên Đức bỏ Kị.
26. Tứ Hao Thìn + Tam Hợp bỏ Kị.
27. Tứ Phế + Đức/Hợp vẫn Kị.
28. Tứ Cùng Dần/Ất Hợi + Thiên Nguyện bỏ Kị.
29. Ngũ Mộ Ngọ + Nguyệt Đức bỏ Kị.
30. Cửu Không Dần + Mãn + Nguyệt Đức bỏ Kị.
31. Cửu Không Thìn delegate Nguyệt Phá.
32. Cửu Không Tỵ delegate Nguyệt Yếm.
33. Q10-only special day chạy khi không có Nguyệt Yếm factor.
34. CUOI_HOI / DI_CHUYEN / earthwork regression vẫn xanh.

## Implementation gates

1. implement + ORACLE_TEST `TU_HAO`;
2. implement + ORACLE_TEST `CUU_KHONG`;
3. add exact Q11 `KHAI_TRUONG` rules;
4. reuse generic Q10 resolver; no new if-chain;
5. preserve source-exact `德願` / `德合`;
6. Đại Hao keeps Q11 identity but follows Nguyệt Phá semantics;
7. no synthetic Nên;
8. hard-ban wins;
9. trace keeps Việt/Hán provenance;
10. API/UI only after factors + Q10 regression green.

## Trạng thái

- [x] exact Vietnamese Q11 p.857 reopened
- [x] Dân Nhật identity corrected
- [x] Hán Q11 COMPARED
- [x] dependency matrix complete
- [x] Tứ Hao Việt/Hán VERIFIED
- [x] Cửu Không Việt/Hán VERIFIED
- [x] relevant Vietnamese Q10 pages reopened
- [x] Hán Q10 COMPARED
- [x] full 19-blocker outcome matrix source-locked
- [x] independent oracle/regression plan
- [x] missing factors IMPLEMENTED
- [x] missing factors ORACLE_TESTED
- [x] KHAI_TRUONG rules IMPLEMENTED
- [x] full Q10 KHAI_TRUONG ORACLE_TESTED
- [x] end-to-end API/UI
