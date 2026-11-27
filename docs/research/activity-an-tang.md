# Research: AN_TANG / 安葬

Status: VERIFIED

Issue: #86

## Phạm vi

Vertical cuối Phase 5 theo roadmap:

- `AN_TANG` — an táng.
- Q11 heading: **AN TÁNG / 安葬**.
- Không gộp với:
  - `PHA_VO_DAT` / 破土;
  - `CAI_TANG_KHAI_TOAN` / 啓攢.

Ba mục nằm sát nhau ở Q11 p.862 nhưng có Nên/Kị khác nhau.

Nguồn Việt chính là full scan Tập 1 do người dùng upload.
Hán bản Q5/Q10/Q11 là lớp đối chiếu, không thay source Việt.

## Q11 exact source — bản Việt

Tập 1, Quyển 11, trang in **862**.

### Nên — 8

1. Thiên Đức
2. Nguyệt Đức
3. Thiên Đức Hợp
4. Nguyệt Đức Hợp
5. Thiên Xá
6. Thiên Nguyện
7. Lục Hợp
8. Ô Phệ

### Kị — 16

1. Nguyệt Kiến
2. Nguyệt Phá
3. ngày Bình
4. ngày Thu
5. Kiếp Sát
6. Tai Sát
7. Nguyệt Sát
8. Nguyệt Hình
9. Nguyệt Hại
10. Nguyệt Yếm
11. Tứ Phế
12. Tứ Kị
13. Tứ Cùng
14. Ngũ Mộ
15. ngày Phục
16. ngày Trọng

## Q11 Hán comparison

Hán Q11 mục `安葬`:

- Nên: `天徳 月徳 天徳合 月徳合 天赦 天願 六合 鳴吠`.
- Kị: `月建 月破 平日 收日 劫煞 災煞 月煞 月刑 月害 月厭 四廢 四忌 四窮 五墓 復日 重日`.

Khớp exact bản Việt 8 Nên / 16 Kị.

Không có discrepancy Q11 cần normalize.

## Dependency matrix

### Đã có

- Thiên Đức
- Nguyệt Đức
- Thiên Đức Hợp
- Nguyệt Đức Hợp
- Thiên Xá
- Thiên Nguyện
- Lục Hợp
- Nguyệt Kiến
- Nguyệt Phá
- Trực Bình
- Trực Thu
- Kiếp Sát
- Tai Sát
- Nguyệt Sát
- Nguyệt Hình
- Nguyệt Hại
- Nguyệt Yếm
- Tứ Phế
- Tứ Kị
- Tứ Cùng
- Ngũ Mộ

### Thiếu

- `O_PHE` / 鳴吠
- `PHUC_NHAT` / 復日
- `TRONG_NHAT` / 重日

## Ô Phệ / 鳴吠

### Nguồn Việt

Tập 1, Quyển 5:

- pp.468–469: chép danh sách truyền cũ 14 ngày và phần giải thích cũ;
- p.470: phần Xét / “Lập thành” hiệu chỉnh lại nguyên tắc.

Không được code theo danh sách 14 ngày truyền cũ.

### Hán comparison

Hán Q5 cũng ghi:

- danh sách truyền cũ 14 ngày trước;
- sau đó `神煞起例` giải lại phép;
- phần `立成` chốt **13 ngày 鳴吠**.

Bản Hán `全覽` còn nói rõ thông thư đã nhầm
`庚寅 壬寅` vào 鳴吠 và nhầm `甲午` sang 鳴吠對;
Hiệp Kỷ yêu cầu sửa theo 起例.

### Formula final — 13 ngày

Ô Phệ dùng:

- 4 ngày Ngọ với can Giáp / Bính / Canh / Nhâm;
- 4 ngày Thân với can Giáp / Bính / Canh / Nhâm;
- 5 ngày Dậu với can Ất / Đinh / Kỷ / Tân / Quý.

Exact set:

1. Giáp Ngọ
2. Bính Ngọ
3. Canh Ngọ
4. Nhâm Ngọ
5. Giáp Thân
6. Bính Thân
7. Canh Thân
8. Nhâm Thân
9. Ất Dậu
10. Đinh Dậu
11. Kỷ Dậu
12. Tân Dậu
13. Quý Dậu

### Regression guards

Không được chứa:

- Canh Dần;
- Nhâm Dần.

Phải chứa:

- Giáp Ngọ.

Đây là guard chống quay lại danh sách truyền cũ 14 ngày.

### Representation

`DinhNghiaYeuToCanChiCoDinh`.

Independent oracle:

- full 60-day sexagenary cycle;
- đúng 13 ngày;
- expected set viết độc lập từ Lập thành, không import production definition.

## Phục Nhật / 復日

### Nguồn Việt

Tập 1, Quyển 5, pp.464–465.

Bảng theo tháng âm / Chi tháng:

| Tháng | Chi tháng | Can ngày Phục |
| ----: | --------- | ------------- |
|     1 | Dần       | Giáp          |
|     2 | Mão       | Ất            |
|     3 | Thìn      | Mậu           |
|     4 | Tỵ        | Bính          |
|     5 | Ngọ       | Đinh          |
|     6 | Mùi       | Kỷ            |
|     7 | Thân      | Canh          |
|     8 | Dậu       | Tân           |
|     9 | Tuất      | Mậu           |
|    10 | Hợi       | Nhâm          |
|    11 | Tý        | Quý           |
|    12 | Sửu       | Kỷ            |

Hán Q5 khớp:
`正七月甲庚 二八月乙辛 四十月丙壬 五十一月丁癸 三九六十二月戊巳`.

### Representation

Dùng primitive có sẵn:

`DinhNghiaYeuToTheoCanNgay`.

Oracle:

- 12 Chi tháng × 10 Can ngày;
- mỗi tháng đúng 1 Can ngày Phục;
- không phụ thuộc Chi ngày.

## Trọng Nhật / 重日

### Nguồn Việt

Tập 1, Quyển 5, pp.458–460:

- ngày Tỵ;
- ngày Hợi.

Hán Q5 `歴例` cũng chốt `巳亥二日`.

### Representation

Thêm primitive nhỏ:

```ts
interface DinhNghiaYeuToChiNgayCoDinh extends DinhNghiaYeuTo {
  chiNgay: readonly DiaChi[];
}
```

`TRONG_NHAT` dùng `[TI, HOI]`.

Oracle:

- 12 Chi tháng × 12 Chi ngày;
- mọi tháng chỉ Tỵ/Hợi match;
- không phụ thuộc tháng.

## Q10 source pages

Đã mở lại exact scan Việt:

| Mục                               | Trang in |
| --------------------------------- | -------: |
| Nguyệt Kiến / Tiểu Thời / Thổ Phủ |  787–788 |
| Nguyệt Phá / Đại Hao              |  788–790 |
| Bình nhật                         |  790–793 |
| Thu nhật                          |  794–796 |
| Kiếp Sát                          |  798–800 |
| Tai Sát                           |      800 |
| Nguyệt Sát                        |  801–802 |
| Nguyệt Hình                       |  802–804 |
| Nguyệt Hại                        |  804–805 |
| Nguyệt Yếm / Địa Hỏa              |  806–810 |
| Tứ Phế                            |  816–817 |
| Tứ Kị / Tứ Cùng                   |  817–818 |
| Ngũ Mộ                            |      819 |
| Phục Nhật / Trọng Nhật            |      823 |

Hán Q10 được dùng để đối chiếu các nhánh trên.

## 1. Nguyệt Kiến

Base Q10 Kị có:

- phá/vỡ đất;
- an táng;
- cải táng.

Khi gặp một trong nhóm cát source nêu:

- Thiên Đức
- Nguyệt Đức
- Thiên Đức Hợp
- Nguyệt Đức Hợp
- Thiên Xá
- Nguyệt Ân
- Tứ Tướng

Q10 chỉ còn Kị một nhóm xây dựng/đất nhất định và **không còn an táng**.

### Outcome AN_TANG

| Nhánh                    | Outcome  |
| ------------------------ | -------- |
| có bất kỳ cát source nêu | `BO_KY`  |
| còn lại                  | `GIU_KY` |

Không copy earthwork semantics: earthwork còn nằm trong residual Kị, an táng thì không.

## 2. Nguyệt Phá

Base Kị có an táng.

- gặp Đức/Hợp vẫn Kị an táng;
- Tý/Ngọ + Tai Sát không Đức/Hợp -> mọi việc Kị;
- Mùi/Thân + Nguyệt Hình không Đức/Hợp -> mọi việc Kị;
- Mão/Dậu + Tai Sát + Nguyệt Yếm -> mọi việc Kị dù gặp Đức/Hợp.

Outcome dùng cùng cấu trúc hard-ban đã source-lock ở các vertical trước.

## 3. Bình nhật

AN_TANG nằm trong base Kị Bình.

Cấu trúc theo tháng giống matrix Q10 đã source-lock:

| Nhánh                   | Outcome                   |
| ----------------------- | ------------------------- |
| Hợi                     | `BO_KY`                   |
| Thân + cát source nêu   | `BO_KY`                   |
| Dần / Tỵ / Tý           | `DELEGATE -> NGUYET_HINH` |
| Mão / Dậu + Nguyệt Đức  | `CAN_BANG`                |
| Ngọ + Nguyệt Đức Hợp    | `CAN_BANG`                |
| Thìn / Tuất / Sửu / Mùi | `DELEGATE -> NGUYET_SAT`  |
| còn lại                 | `GIU_KY`                  |

Không tự sinh Nên khi `CAN_BANG`.

## 4. Thu nhật

AN_TANG nằm trong base Kị Thu.

| Nhánh                     | Outcome                   |
| ------------------------- | ------------------------- |
| Dần / Thân / Tỵ / Hợi     | `DELEGATE -> KIEP_SAT`    |
| Mão                       | `DELEGATE -> NGUYET_HINH` |
| Sửu / Tuất                | `DELEGATE -> NGUYET_HINH` |
| Thìn / Mùi + Đức/Hợp      | `BO_KY`                   |
| Tý / Ngọ + Nguyệt Đức Hợp | `CAN_BANG`                |
| Dậu + Nguyệt Đức          | `CAN_BANG`                |
| còn lại                   | `GIU_KY`                  |

## 5. Kiếp Sát

Base Kị có an táng.

### Source-exact correction cần áp dụng cho matrix chung

Q10 Việt p.799 và Hán Q10 cùng xác nhận nhánh tháng Tỵ/Hợi dùng:

- **Thiên Đức**
- **Nguyệt Đức Hợp**

Repo hiện có một số matrix cũ ghi nhầm:

- Nguyệt Đức
- Thiên Đức Hợp

Không được kế thừa cặp sai này sang AN_TANG.

### Outcome

| Nhánh                                                 | Outcome    |
| ----------------------------------------------------- | ---------- |
| Dần / Thân                                            | `BO_KY`    |
| Tỵ / Hợi + Thiên Đức hoặc Nguyệt Đức Hợp              | `BO_KY`    |
| Thìn / Tuất / Sửu / Mùi + Đức/Hợp                     | `BO_KY`    |
| Thìn / Tuất / Sửu / Mùi không Đức/Hợp                 | `CAN_BANG` |
| Tý / Ngọ / Mão / Dậu + Nguyệt Đức hoặc Nguyệt Đức Hợp | `CAN_BANG` |
| còn lại                                               | `GIU_KY`   |

## 6. Tai Sát

Q10: “Kị giống Kiếp Sát”, rồi thêm nhánh tháng.

| Nhánh                               | Outcome                  |
| ----------------------------------- | ------------------------ |
| Tý / Ngọ / Mão / Dậu                | `DELEGATE -> NGUYET_PHA` |
| Dần / Thân / Tỵ / Hợi + Đức/Hợp     | `BO_KY`                  |
| Dần / Thân / Tỵ / Hợi không Đức/Hợp | `CAN_BANG`               |
| Thìn / Tuất / Sửu / Mùi + Đức/Hợp   | `BO_KY`                  |
| còn lại                             | `GIU_KY`                 |

## 7. Nguyệt Sát

Base Kị có an táng.

| Nhánh                                                             | Outcome        |
| ----------------------------------------------------------------- | -------------- |
| Mão / Dậu + Nguyệt Đức + Thiên Nguyện                             | `BO_KY`        |
| Mão / Dậu còn lại                                                 | `CAN_BANG`     |
| Tý / Ngọ + Nguyệt Đức Hợp                                         | `CAN_BANG`     |
| Dần / Thân / Tỵ / Hợi hoặc Thìn / Tuất / Sửu / Mùi, không Đức/Hợp | `CAM_MOI_VIEC` |
| còn lại                                                           | `GIU_KY`       |

## 8. Nguyệt Hình

Base Kị có an táng.

| Nhánh                                          | Outcome                  |
| ---------------------------------------------- | ------------------------ |
| Tỵ + Nguyệt Đức + Thiên Đức Hợp + Thiên Nguyện | `BO_KY`                  |
| Tỵ còn lại                                     | `CAN_BANG`               |
| Ngọ                                            | `DELEGATE -> NGUYET_YEM` |
| Tý / Mão / Mùi / Thân không Đức/Hợp            | `CAM_MOI_VIEC`           |
| Dần / Thìn / Dậu / Hợi / Sửu / Tuất + Đức/Hợp  | `CAN_BANG`               |
| còn lại                                        | `GIU_KY`                 |

## 9. Nguyệt Hại

Base Kị có an táng.

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

## 10. Nguyệt Yếm

Base Kị p.806 có an táng.

### Dần / Thân / Sửu / Mùi

Khi gặp cát source nêu, residual Kị chỉ còn một nhóm việc khác;
**an táng không nằm trong residual list**.

Outcome AN_TANG:

- `BO_KY`.

Điểm này khác XUAT_HANH, vì xuất hành được nêu rõ là vẫn Kị ở nhánh này.

### Thìn / Tuất / Tỵ / Hợi

Gặp cát source nêu:

- cát/hung cân nhau;
- chỗ Kị không ghi Nên;
- chỗ Nên không ghi Kị.

Outcome:

- `CAN_BANG`.

### Tý / Ngọ

- gặp Thiên Xá: theo lệ thường, không chuyển thành hard-all;
- không gặp Thiên Xá: mọi việc Kị -> `CAM_MOI_VIEC`.

### Mão / Dậu

- Nguyệt Phá + Tai Sát + Nguyệt Yếm -> `CAM_MOI_VIEC`
  dù gặp Đức/Hợp.

### Special days p.807–810

Giữ source-exact rules đã khóa:

- Đại hội / Tiểu hội / Tam âm / Âm vị / giao phá / kích xung... -> hard-all khi source nói mọi việc Kị;
- Tuế bạc / Trục trận theo chỗ Kị của Nguyệt Yếm;
- Tỵ/Bính Ngọ và Mùi/Mậu Ngọ không theo Nên của `德願`;
- Mùi/Kỷ Mùi Dương thác không theo Nên của `德合`;
- Âm thác theo Kị của Nguyệt Yếm;
- Dương thác theo Kị của Nguyệt Kiến.

### Dương thác AN_TANG

Khác XUAT_HANH:

- Nguyệt Kiến **có Kị an táng**;
- do đó Dương thác phải theo outcome Nguyệt Kiến, không được bỏ Kị mặc định.

Implementation nên `DELEGATE -> NGUYET_KIEN` cho special-day Dương thác
để giữ luôn ngoại lệ cát của Nguyệt Kiến, thay vì hard-code `THEM_KY`.

## 11. Tứ Phế

Base Kị có an táng.

- gặp Đức/Hợp vẫn Kị;
- - Nguyệt Phá -> mọi việc Kị.

Outcome:

- `GIU_KY_DU_CO_CAT`;
- hard-all khi đi cùng Nguyệt Phá.

## 12. Tứ Kị / Tứ Cùng

Q10 p.817:

- cả Tứ Kị và Tứ Cùng Kị an táng;
- gặp Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp vẫn Kị;
- riêng **tháng Giêng, ngày Ất Hợi + Thiên Nguyện**:
  chỉ còn Kị quân sự, còn lại không Kị.

### Outcome

For both `TU_KY` and `TU_CUNG`:

| Nhánh                             | Outcome            |
| --------------------------------- | ------------------ |
| tháng Dần + Ất Hợi + Thiên Nguyện | `BO_KY`            |
| gặp cát source nêu                | `GIU_KY_DU_CO_CAT` |
| còn lại                           | `GIU_KY`           |

## 13. Ngũ Mộ

Base Kị có an táng.

- tháng Ngọ hoặc Tý + Nguyệt Đức -> `BO_KY`;
- còn lại -> `GIU_KY`.

## 14. Phục Nhật / Trọng Nhật

Q10 Việt p.823 và Hán Q10:

- Kị phá/vỡ đất, an táng, cải táng;
- gặp Thiên Đức / Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp /
  Thiên Xá / Lục Hợp thì không Kị;
- Thiên Nguyện tất là Lục Hợp nên source không lặp lại.

### Ô Phệ interaction

Q10 giữ tục lệ:

- Phục/Trọng gặp Ô Phệ thì vẫn Kị;
- gặp Đức/Xá/Lục Hợp thì không Kị.

Production cần tránh để Q11 Nên Ô Phệ lấn át Kị Phục/Trọng.

### Outcome

Cho mỗi target `PHUC_NHAT`, `TRONG_NHAT`:

1. có cát trong nhóm Đức/Xá/Lục Hợp:
   - `BO_KY`;
2. nếu có Ô Phệ mà không có cát giải:
   - giữ Kị;
   - `BO_NEN` contribution `O_PHE` để final không vừa Nên vừa Kị chỉ vì Q11 Ô Phệ;
3. còn lại:
   - `GIU_KY`.

Precedence cát giải phải cao hơn nhánh Ô Phệ.

## Q10 architecture

AN_TANG không nên copy nguyên matrix earthwork hoặc XUAT_HANH.

Có thể tái dùng helper/data cho **cấu trúc tháng** của:

- Nguyệt Phá
- Bình
- Thu
- Kiếp Sát
- Tai Sát
- Nguyệt Sát
- Nguyệt Hình

nhưng outcome activity-specific phải được test riêng.

Các blocker riêng AN_TANG cần explicit rules:

- Nguyệt Kiến;
- Nguyệt Hại;
- Nguyệt Yếm activity-specific residual whitelist;
- Tứ Kị;
- Tứ Cùng;
- Phục Nhật;
- Trọng Nhật.

## Shared Q10 debt phát hiện trong research

Repo hiện có ở nhiều matrix cũ nhánh:

`KIEP_SAT_TI_HOI_CAT_BO_KY`

với cặp:

- Nguyệt Đức;
- Thiên Đức Hợp.

Exact Q10 Việt p.799 + Hán Q10 cho Tỵ/Hợi là:

- **Thiên Đức**;
- **Nguyệt Đức Hợp**.

Đây là source bug chung, không chỉ AN_TANG.

Phải sửa bằng issue riêng + regression trước hoặc cùng implementation AN_TANG,
nhưng không được copy cặp sai vào vertical mới.

## Implementation plan

### Factor gate

Thêm:

1. `O_PHE`
   - fixed 13 Can Chi;
   - full 60-cycle oracle;
   - explicit negative guards Canh Dần / Nhâm Dần;
   - explicit positive guard Giáp Ngọ.
2. `PHUC_NHAT`
   - month branch -> heavenly stem;
   - 12×10 oracle.
3. `TRONG_NHAT`
   - fixed day branches Tỵ/Hợi;
   - 12×12 oracle.

### Activity gate

Thêm `LoaiCongViec.AN_TANG`.

Exact Q11:

- 8 Nên;
- 16 Kị.

Typed targets:

- `TRUC:BINH`;
- `TRUC:THU`.

Không có synthetic Nên.

### Q10 gate

Reuse generic resolver / ADR 0008.

Bắt buộc regression cho:

- Nguyệt Kiến cát -> bỏ Kị an táng;
- Kiếp Sát Tỵ/Hợi source-exact cát pair;
- Nguyệt Yếm Dần/Thân/Sửu/Mùi cát -> bỏ Kị an táng;
- Dương thác -> delegate Nguyệt Kiến;
- Tứ Kị/Tứ Cùng Dần Ất Hợi + Thiên Nguyện;
- Phục/Trọng vs Ô Phệ;
- Phục/Trọng vs Đức/Xá/Lục Hợp.

### API/UI gate

Chỉ mở sau factors + Q11 + Q10 xanh:

- `GET /date-selection/an-tang`;
- web `/an-tang`.

## Regression vector plan

Tối thiểu:

1. exact Q11 = 8 Nên / 16 Kị.
2. exact Q11 không lẫn Phá Thổ / Cải Táng.
3. Ô Phệ final set = 13 days.
4. Ô Phệ có Giáp Ngọ.
5. Ô Phệ không có Canh Dần.
6. Ô Phệ không có Nhâm Dần.
7. Phục Nhật 12×10.
8. Trọng Nhật chỉ Tỵ/Hợi.
9. Nguyệt Kiến + Thiên Đức bỏ Kị an táng.
10. Nguyệt Phá + Đức/Hợp vẫn Kị.
11. Bình Hợi bỏ Kị.
12. Bình Thìn delegate Nguyệt Sát.
13. Thu Dần delegate Kiếp Sát.
14. Kiếp Sát Tỵ + Thiên Đức bỏ Kị.
15. Kiếp Sát Tỵ + Nguyệt Đức Hợp bỏ Kị.
16. negative: Kiếp Sát Tỵ + Nguyệt Đức không dùng nhầm cặp cũ.
17. Tai Sát Tý delegate Nguyệt Phá.
18. Nguyệt Sát Dần không Đức/Hợp hard-all.
19. Nguyệt Hình Tỵ + required cát bỏ Kị.
20. Nguyệt Hại Mão + Thiên Đức bỏ Kị.
21. Nguyệt Hại Thìn + Thiên Đức Hợp cân bằng.
22. Nguyệt Yếm Dần + Nguyệt Đức bỏ Kị an táng.
23. Nguyệt Yếm Thìn + cát cân bằng.
24. Dương thác Giáp Dần Kị an táng qua Nguyệt Kiến.
25. Dương thác + cát giải Nguyệt Kiến theo đúng delegate.
26. Tuế bạc special day tự sinh Kị khi không có factor Nguyệt Yếm.
27. Tuế bạc bỏ Nên `德願` source-exact.
28. Mùi/Kỷ Mùi bỏ Nên `德合`.
29. Tứ Phế + Đức/Hợp vẫn Kị.
30. Tứ Phế + Nguyệt Phá hard-all.
31. Tứ Kị Dần Ất Hợi + Thiên Nguyện bỏ Kị.
32. Tứ Cùng Dần Ất Hợi + Thiên Nguyện bỏ Kị.
33. Ngũ Mộ Ngọ + Nguyệt Đức bỏ Kị.
34. Phục Nhật + Ô Phệ không cát: Kị, Ô Phệ Nên bị loại.
35. Trọng Nhật + Ô Phệ không cát: Kị, Ô Phệ Nên bị loại.
36. Phục Nhật + Thiên Đức: bỏ Kị.
37. Trọng Nhật + Lục Hợp: bỏ Kị.
38. Phục Nhật + Thiên Nguyện: bỏ Kị qua Lục Hợp semantics.
39. mọi trace Q10 giữ provenance verified.
40. regression các vertical cũ sau khi sửa cặp Kiếp Sát.

## Trạng thái

- [x] exact Vietnamese Q11 p.862 reopened
- [x] Hán Q11 COMPARED
- [x] exact Vietnamese Q5 Trọng Nhật reopened
- [x] exact Vietnamese Q5 Phục Nhật reopened
- [x] exact Vietnamese Q5 Ô Phệ old list + final Lập thành reopened
- [x] Hán Q5 COMPARED
- [x] relevant Vietnamese Q10 pages reopened
- [x] Hán Q10 COMPARED
- [x] full outcome matrix source-locked
- [x] shared Kiếp Sát source bug identified
- [x] independent oracle/regression plan defined
- [ ] missing factors IMPLEMENTED
- [ ] missing factors ORACLE_TESTED
- [ ] AN_TANG rules IMPLEMENTED
- [ ] AN_TANG Q10 ORACLE_TESTED
- [ ] end-to-end API/UI
