# Research: XUAT_HANH / 出行

Status: VERIFIED

Issue: #82

## Phạm vi

Vertical Phase 5 kế tiếp theo roadmap:

- `XUAT_HANH` — Xuất hành.
- Q11 heading: **Đế vương xuất hành, sai sứ, xuất hành**.
- Hán: `行幸遣使〈出行同〉`.

Nguồn Việt chính là **full scan Tập 1 do người dùng upload**.
Hán bản là lớp đối chiếu. Không dùng web transcription để thay source Việt.

## Q11 exact source — bản Việt

Tập 1, Quyển 11, trang in **849**.

### Nên — 16

1. Thiên Đức
2. Nguyệt Đức
3. Thiên Đức Hợp
4. Nguyệt Đức Hợp
5. Thiên Xá
6. Thiên Nguyện
7. Nguyệt Ân
8. Tứ Tướng
9. Thời Đức
10. Vương Nhật
11. Dịch Mã
12. Thiên Mã
13. ngày Kiến
14. Cát Kỳ
15. Thiên Hỷ
16. ngày Khai

### Kị — 15 trong bản Việt p.849

1. Nguyệt Phá
2. ngày Bình
3. ngày Thu
4. ngày Bế
5. Kiếp Sát
6. Tai Sát
7. Nguyệt Sát
8. Nguyệt Hình
9. Đại Thời
10. Thiên Lại
11. Thiên Tặc
12. Tứ Phế
13. Ngũ Mộ
14. Vãng Vong
15. ngày Tỵ

Bản Việt **không in “Nguyệt Yếm”** trong dòng Kị Q11 này.

## Q11 Hán comparison

Hán Quyển 11:

`行幸遣使〈出行同〉`

Nên:

`天徳 月徳 天徳合 月徳合 天赦 天願 月恩 四相 時徳 王日 驛馬 天馬 建日 吉期 天喜 開日`

Khớp 16 Nên của bản Việt.

Kị:

`月破 平日 收日 閉日 劫煞 災煞 月煞 月刑 月厭 大時 天吏 天賊 四廢 五墓 往亡 巳日`

Hán có **月厭 / Nguyệt Yếm**, tức 16 Kị.

### Discrepancy policy

Không sửa ngầm Q11 Việt thành Hán.

Production representation:

1. exact Q11 Việt rule set giữ **16 Nên / 15 Kị**;
2. Nguyệt Yếm được thêm bằng một **activity blocker nguồn Q10 riêng**,
   vì Q10 Việt p.806 ghi trực tiếp “đế vương xuất hành, sai sứ” trong Kị;
3. Hán Q11 được ghi trong research/provenance như corroboration rằng omission
   của Q11 Việt là khác biệt source thực sự.

Như vậy:

- exact Q11 test vẫn trung thực với scan Việt;
- final behavior vẫn source-complete nhờ Q10;
- không giả rằng chữ “Nguyệt Yếm” có trên p.849 Việt.

## Vương Nhật / 王日

Đây là dependency production còn thiếu.

### Nguồn Việt

Tập 1, Quyển 5, pp.425–427, mục:

**VƯƠNG - QUAN - THỦ - TƯỚNG - DÂN nhật**

p.426 chép “Lịch lệ” với lịch sử đổi vị trí:

- Vương nhật: Xuân Dần, Hạ Tỵ, Thu Thân, Đông Hợi — “nay đổi là Quan nhật”.
- Quan nhật: Xuân Mão, Hạ Ngọ, Thu Dậu, Đông Tý — “nay đổi là Vương nhật”.

Nếu chỉ đọc câu này có thể chọn sai bảng.

### Phần Xét p.427

Hiệp Kỷ phân tích việc hậu nhân đổi Vương/Quan và kết luận thuyết cũ hợp lý hơn:

- Vương Nhật thường ở **Dần / Tỵ / Thân / Hợi**;
- Quan Nhật ở **Mão / Ngọ / Dậu / Tý**;
- việc đổi hai vị trí là không bằng thuyết cũ.

### Hán comparison

Hán Quyển 5 có cùng đoạn:

- `王日者春寅夏巳秋申冬亥〈今易為官日〉`
- `官日者春卯夏午秋酉冬子〈今易為王日〉`

và phần `按` nói hậu nhân đổi hai vị trí, nhưng “細繹其理不如舊說為高”.

### Production mapping

`VUONG_NHAT` dùng mapping source-final:

| Mùa  | Chi ngày |
| ---- | -------- |
| Xuân | Dần      |
| Hạ   | Tỵ       |
| Thu  | Thân     |
| Đông | Hợi      |

Representation:

`DinhNghiaYeuToChiNgayTheoMua`.

Không alias với Quan Nhật.

### Oracle

12 Chi tháng × 12 Chi ngày:

- mỗi tháng đúng 1 Chi ngày Vương Nhật;
- 3 tháng cùng mùa dùng cùng Chi;
- expected oracle viết độc lập từ bảng trên, không import production definition.

## ngày Tỵ

Q11 p.849 ghi “ngày Tị” trong Kị.

Hán Q11 ghi `巳日`.

Q10 bản Việt p.830, **Ngày Bách Kị**, cũng ghi:

“Ngày Tị kị xuất hành”.

Hán Q10:

`巳日忌出行`.

### Representation

Dùng typed target đã có:

```ts
{ loai: 'CHI_NGAY', chi: DiaChi.TI }
```

Không tạo factor `NGAY_TI`.

## Dependency matrix

### Đã có

Nên:

- Thiên Đức
- Nguyệt Đức
- Thiên Đức Hợp
- Nguyệt Đức Hợp
- Thiên Xá
- Thiên Nguyện
- Nguyệt Ân
- Tứ Tướng
- Thời Đức
- Dịch Mã
- Thiên Mã
- Trực Kiến
- Cát Kỳ
- Thiên Hỷ
- Trực Khai

Kị:

- Nguyệt Phá
- Trực Bình
- Trực Thu
- Trực Bế
- Kiếp Sát
- Tai Sát
- Nguyệt Sát
- Nguyệt Hình
- Nguyệt Yếm factor
- Đại Thời
- Thiên Lại
- Thiên Tặc
- Tứ Phế
- Ngũ Mộ
- Vãng Vong
- typed Chi ngày Tỵ

### Thiếu

- `VUONG_NHAT` / 王日.

Không cần factor mới nào khác.

## Q10 source pages

Đã mở lại exact scan Việt:

| Mục                                             | Trang in |
| ----------------------------------------------- | -------: |
| Nguyệt Kiến / Thổ Phủ — dùng để giải Dương thác |      787 |
| Nguyệt Phá / Đại Hao                            |  788–790 |
| Bình nhật                                       |  790–793 |
| Thu nhật                                        |  794–796 |
| Bế nhật                                         |  797–798 |
| Kiếp Sát                                        |  798–800 |
| Tai Sát                                         |      800 |
| Nguyệt Sát                                      |  801–802 |
| Nguyệt Hình                                     |  802–805 |
| Nguyệt Yếm                                      |  806–810 |
| Đại Thời                                        |  811–812 |
| Thiên Lại                                       |  813–814 |
| Thiên Tặc                                       |      815 |
| Tứ Phế                                          |  816–817 |
| Ngũ Mộ                                          |      819 |
| Vãng Vong                                       |      822 |
| Ngày Bách Kị                                    |      830 |

Hán Q10 đã đối chiếu cho cùng các mục.

## Shared Q10 semantics với DI_CHUYEN

Đối với các blocker chung sau, source Q10 đặt:

- “đế vương xuất hành, sai sứ”;
- “di chuyển”;

trong cùng danh sách Kị và cùng nhánh ngoại lệ.

Vì vậy XUAT_HANH dùng cùng outcome matrix đã source-lock ở DI_CHUYEN cho:

- Nguyệt Phá;
- Bình;
- Thu;
- Bế;
- Kiếp Sát;
- Tai Sát;
- Nguyệt Sát;
- Nguyệt Hình;
- Nguyệt Yếm;
- Đại Thời;
- Thiên Lại;
- Tứ Phế;
- Ngũ Mộ.

Không copy rule bằng tên activity; tái dùng/derive data table hoặc helper để tránh hai
matrix drift.

## 1. Nguyệt Phá

Base Kị có “đế vương xuất hành, sai sứ”.

- gặp Đức/Hợp vẫn Kị;
- Tý/Ngọ + Tai Sát không Đức/Hợp -> `CAM_MOI_VIEC`;
- Mùi/Thân + Nguyệt Hình không Đức/Hợp -> `CAM_MOI_VIEC`;
- Mão/Dậu + Tai Sát + Nguyệt Yếm -> hard-all ngay cả có Đức/Hợp.

Outcome giống DI_CHUYEN.

## 2. Bình nhật

| Nhánh                                | Outcome                   |
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

| Nhánh                                 | Outcome                  |
| ------------------------------------- | ------------------------ |
| Dần / Thân / Tỵ / Hợi                 | `DELEGATE -> NGUYET_SAT` |
| các tháng còn lại + Đức/Hợp/Xá/Nguyện | `CAN_BANG`               |
| còn lại                               | `GIU_KY`                 |

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

| Nhánh                                                             | Outcome        |
| ----------------------------------------------------------------- | -------------- |
| Mão / Dậu + Nguyệt Đức + Thiên Nguyện                             | `BO_KY`        |
| Mão / Dậu còn lại                                                 | `CAN_BANG`     |
| Tý / Ngọ + Nguyệt Đức Hợp                                         | `CAN_BANG`     |
| Dần / Thân / Tỵ / Hợi hoặc Thìn / Tuất / Sửu / Mùi, không Đức/Hợp | `CAM_MOI_VIEC` |
| còn lại                                                           | `GIU_KY`       |

## 8. Nguyệt Hình

| Nhánh                                          | Outcome                  |
| ---------------------------------------------- | ------------------------ |
| Tỵ + Nguyệt Đức + Thiên Đức Hợp + Thiên Nguyện | `BO_KY`                  |
| Tỵ còn lại                                     | `CAN_BANG`               |
| Ngọ                                            | `DELEGATE -> NGUYET_YEM` |
| Tý / Mão / Mùi / Thân không Đức/Hợp            | `CAM_MOI_VIEC`           |
| Dần / Thìn / Dậu / Hợi / Sửu / Tuất + Đức/Hợp  | `CAN_BANG`               |
| còn lại                                        | `GIU_KY`                 |

## 9. Nguyệt Yếm — Q10-sourced blocker

### Direct source

p.806 Kị list ghi rõ:

- “đế vương xuất hành, sai sứ”;
- cùng nhiều việc khác.

Do đó dù Q11 Việt p.849 bỏ sót chữ Nguyệt Yếm, Q10 Việt tự đủ để tạo blocker.

### Month branches

Outcome giống DI_CHUYEN:

| Nhánh                                                                | Outcome            |
| -------------------------------------------------------------------- | ------------------ |
| Dần / Thân / Sửu / Mùi + Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp | `GIU_KY_DU_CO_CAT` |
| Thìn / Tuất / Tỵ / Hợi + Thiên Đức / Nguyệt Đức / Nguyệt Đức Hợp     | `CAN_BANG`         |
| Tý / Ngọ + Thiên Xá                                                  | `GIU_KY`           |
| Tý / Ngọ không Thiên Xá                                              | `CAM_MOI_VIEC`     |
| Mão / Dậu + Nguyệt Phá + Tai Sát                                     | `CAM_MOI_VIEC`     |

Ở Dần/Thân/Sửu/Mùi, p.807 **vẫn liệt kê “đế vương xuất hành, sai sứ”** trong
những việc còn Kị khi gặp cát.

### Special days

- Đại hội / Tiểu hội / Tam âm / Âm vị / giao phá / kích xung... -> hard-all.
- Tuế bạc / Trục trận theo Kị Nguyệt Yếm -> `THEM_KY`.
- Tỵ/Bính Ngọ và Mùi/Mậu Ngọ còn `BO_NEN` đúng nhóm `德願`.
- Âm thác theo Kị Nguyệt Yếm.
- Dương thác theo Kị của Kiến.

### Dương thác XUAT_HANH

Q10 p.787 Nguyệt Kiến **không Kị xuất hành**.

Vì vậy Dương thác:

- không tự sinh Kị XUAT_HANH;
- nếu contribution Nguyệt Yếm có mặt thì `BO_KY`;
- Mùi/Kỷ Mùi vẫn `BO_NEN` nhóm `德合` theo p.808.

Giống DI_CHUYEN, khác earthwork.

## 10. Đại Thời

Outcome giống DI_CHUYEN:

- Dần/Thân/Tỵ/Hợi -> `BO_KY`;
- Thìn/Tuất -> `BO_KY`;
- Sửu/Mùi + Đức/Hợp -> `BO_KY`;
- Mão -> delegate Nguyệt Hình;
- Tý/Ngọ + Nguyệt Đức Hợp -> `CAN_BANG`;
- Dậu + Nguyệt Đức -> `CAN_BANG`;
- còn lại giữ Kị.

## 11. Thiên Lại

Outcome giống DI_CHUYEN:

- Dần/Thân/Tỵ/Hợi + Đức/Hợp -> `BO_KY`;
- Thìn/Tuất/Sửu/Mùi + Đức/Hợp/Xá/Nguyện -> `CAN_BANG`;
- Ngọ/Mão/Dậu -> delegate Bình;
- Tý -> delegate Nguyệt Hình;
- còn lại giữ Kị.

## 12. Thiên Tặc

Nguồn Việt p.815:

“Kị: Đế vương xuất hành, sai sứ, sửa kho tàng, mở kho tàng, xuất tiền của hàng hóa.”

“Gộp cùng với Đức hợp vẫn còn kị (Xá, Nguyện không gộp được với Thiên tặc).”

### Outcome

- base `GIU_KY`;
- gặp Đức/Hợp vẫn `GIU_KY_DU_CO_CAT`;
- không tạo nhánh Xá/Nguyện vì source nói không đồng hiện.

## 13. Tứ Phế

Nguồn p.816–817.

- xuất hành nằm trong Kị;
- gặp Đức/Hợp vẫn Kị;
- - Nguyệt Phá -> mọi việc đều Kị.

Outcome giống DI_CHUYEN.

## 14. Ngũ Mộ

Nguồn p.819.

Kị có “đế vương xuất hành, sai sứ”.

- tháng Ngọ hoặc Tý + Nguyệt Đức -> `BO_KY`;
- còn lại giữ Kị.

## 15. Vãng Vong

Nguồn Việt p.822.

Kị có:

- “đế vương xuất hành, sai sứ”.

Gặp Đức/Hợp/Xá/Nguyện vẫn Kị.

Phần Xét còn nói rõ Vãng Vong đã Kị xuất hành nên các việc cùng nghĩa phải
gộp Kị.

### Outcome

- `GIU_KY_DU_CO_CAT`.

## 16. ngày Tỵ

Q11 Việt p.849 + Q10 p.830 Bách Kị cùng Kị xuất hành.

### Outcome

- typed `CHI_NGAY: TI`;
- `GIU_KY`;
- không có source exception cát riêng.

## Effective activity rule set

### Q11 Việt exact

- 16 Nên;
- 15 Kị.

### Q10 supplement

- 1 blocker Nguyệt Yếm từ p.806.

### Effective base before conflict resolution

- 16 Nên;
- 16 Kị identities.

Tests phải phân biệt:

- exact Q11 set;
- Q10 supplemental blocker.

Không được viết test “Q11 có 16 Kị” cho bản Việt.

## Implementation plan

### Factor gate

Thêm `MaYeuTo.VUONG_NHAT`:

- season -> Chi ngày;
- 12×12 independent oracle;
- source p.425–427 Việt + Hán Q5;
- regression guard:
  - Xuân = Dần, **không phải Mão**;
  - Hạ = Tỵ, không phải Ngọ;
  - Thu = Thân, không phải Dậu;
  - Đông = Hợi, không phải Tý.

### Activity gate

`LoaiCongViec.XUAT_HANH`.

Exact Q11 rules:

- 16 Nên;
- 15 Kị.

Q10 supplement:

- Nguyệt Yếm Kị sourced from p.806.

### Q10 gate

Tái dùng generic resolver / ADR 0008.

Ưu tiên shared rule data/helper cho matrix giống DI_CHUYEN để giảm drift.

Activity-specific additions:

- Thiên Tặc;
- Vãng Vong;
- typed ngày Tỵ;
- Q10 supplemental Nguyệt Yếm contribution.

### API/UI gate

Chỉ mở sau factor + exact Q11 + Q10 regression xanh:

- `GET /date-selection/xuat-hanh`;
- web `/xuat-hanh`.

## Regression vector plan

Tối thiểu:

1. exact Q11 Việt = 16 Nên / 15 Kị.
2. Hán discrepancy Nguyệt Yếm được ghi trong source note, không lẫn vào exact Q11.
3. effective rules có Q10 supplemental Nguyệt Yếm.
4. Vương Nhật Xuân Dần; negative Xuân Mão.
5. ngày Tỵ typed Kị.
6. Nguyệt Phá + Thiên Đức vẫn Kị.
7. Bình Hợi bỏ Kị.
8. Bình Thìn delegate Nguyệt Sát.
9. Thu Dần delegate Kiếp Sát.
10. Bế Dần delegate Nguyệt Sát.
11. Kiếp Sát Dần bỏ Kị.
12. Tai Sát Tý delegate Nguyệt Phá.
13. Nguyệt Sát Dần không Đức/Hợp hard-all.
14. Nguyệt Hình Tỵ + required cát bỏ Kị.
15. Nguyệt Yếm Dần + Nguyệt Đức **vẫn Kị xuất hành**.
16. Nguyệt Yếm Thìn + cát cân bằng.
17. Dương thác Giáp Dần không tự sinh Kị.
18. Dương thác Giáp Dần bỏ Nguyệt Yếm contribution nếu factor có mặt.
19. Tuế bạc Tỵ/Bính Ngọ tự sinh Kị + bỏ Nên Đức/Nguyện source-exact.
20. Mùi/Kỷ Mùi Dương thác bỏ Nên `德合`.
21. Mùi/Kỷ Tỵ hard-all.
22. Đại Thời Dần bỏ Kị.
23. Thiên Lại Ngọ delegate Bình.
24. Thiên Tặc + Đức/Hợp vẫn Kị.
25. Tứ Phế + Đức/Hợp vẫn Kị.
26. Tứ Phế + Nguyệt Phá hard-all.
27. Ngũ Mộ Ngọ + Nguyệt Đức bỏ Kị.
28. Vãng Vong + Thiên Xá vẫn Kị.
29. typed ngày Tỵ Kị dù không có thần sát.
30. global Q10 special day chạy khi không có factor Nguyệt Yếm.
31. mọi trace Q10 giữ Việt/Hán provenance.
32. regression các activity cũ không đổi.

## Trạng thái

- [x] exact Vietnamese Q11 p.849 reopened
- [x] Hán Q11 COMPARED
- [x] Q11 Nguyệt Yếm discrepancy recorded
- [x] exact Vietnamese Q5 pp.425–427 reopened
- [x] Vương Nhật mapping VERIFIED
- [x] typed ngày Tỵ representation decided
- [x] relevant Vietnamese Q10 pages reopened
- [x] Hán Q10 COMPARED
- [x] full outcome matrix source-locked
- [x] independent oracle/regression plan defined
- [ ] Vương Nhật IMPLEMENTED
- [ ] Vương Nhật ORACLE_TESTED
- [ ] XUAT_HANH rules IMPLEMENTED
- [ ] XUAT_HANH Q10 ORACLE_TESTED
- [ ] end-to-end API/UI
