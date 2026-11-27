# Research: Động thổ / Sửa cung thất

Status: VERIFIED

Issue: #63

## Phạm vi

Vertical tiếp theo của Phase 5 dùng hai mục Quyển 11 có cùng tập Kị nhưng khác tập Nên:

- `SUA_CUNG_THAT` — Sửa cung thất — 修宮室.
- `DONG_THO` — Khởi tạo động thổ / tu tạo — 興造動土〈修造同〉.

Nguồn Việt chính là **full scan Tập 1 do người dùng upload**. Hán bản chỉ là lớp đối chiếu.
Không dùng transcription web để thay file Việt.

## Q11 — Sửa cung thất

Bản Việt Tập 1, Quyển 11, trang in 854–855.

### Nên — 6

1. Nguyệt Ân
2. Tứ Tướng
3. Thời Đức
4. Tam Hợp
5. Phúc Đức
6. ngày Khai

Hán bản Quyển 11:

`修宮室 宜月恩四相時徳三合福徳開日`

Hai bản khớp.

### Kị — 18

1. Nguyệt Kiến
2. Thổ Phủ — 土府
3. Nguyệt Phá
4. ngày Bình
5. ngày Thu
6. ngày Bế
7. Kiếp Sát
8. Tai Sát
9. Nguyệt Sát
10. Nguyệt Hình
11. Nguyệt Yếm
12. Đại Thời
13. Thiên Lại
14. Tứ Phế
15. Ngũ Mộ
16. Thổ Phù — 土符
17. Địa Nang — 地囊
18. sau Thổ Vượng dụng sự — 土王用事後

Hán bản:

`忌月建土府月破平日收日閉日劫煞災煞月煞月刑月厭大時天吏四廢五墓土符地囊土王用事後`

Hai bản khớp.

## Q11 — Khởi tạo động thổ / tu tạo

Bản Việt Tập 1, Quyển 11, trang in 855.

### Nên — 11

1. Thiên Đức
2. Nguyệt Đức
3. Thiên Đức Hợp
4. Nguyệt Đức Hợp
5. Thiên Xá
6. Thiên Nguyện
7. Nguyệt Ân
8. Tứ Tướng
9. Thời Đức
10. Tam Hợp
11. ngày Khai

Hán bản:

`興造動土〈修造同〉 宜天徳月徳天徳合月徳合天赦天願月恩四相時徳三合開日`

Hai bản khớp.

### Kị — 18

Tập Kị giống hoàn toàn `SUA_CUNG_THAT`:

- Nguyệt Kiến;
- Thổ Phủ 土府;
- Nguyệt Phá;
- Bình / Thu / Bế;
- Kiếp Sát;
- Tai Sát;
- Nguyệt Sát;
- Nguyệt Hình;
- Nguyệt Yếm;
- Đại Thời;
- Thiên Lại;
- Tứ Phế;
- Ngũ Mộ;
- Thổ Phù 土符;
- Địa Nang 地囊;
- Thổ Vượng dụng sự.

Hán bản Quyển 11 cho cùng 18 mục và khớp bản Việt.

## Phân biệt Thổ Phủ 土府 và Thổ Phù 土符

Đây là **hai identity khác nhau**.

Repo đã có:

- `MaYeuTo.THO_PHU`
- display: Thổ Phủ
- Hán: 土府
- đồng vị Trực Kiến theo Quyển 4.

Không được dùng `THO_PHU` cho 土符.

Để tránh collision khi bỏ dấu, production code dùng:

- `THO_PHU` = Thổ Phủ / 土府 — giữ backward compatibility.
- `THO_PHU_TIN` = Thổ Phù / 土符 — tên code lấy từ giải thích “phù tín” ở Quyển 6.
- display vẫn là **Thổ Phù**.
- `DIA_NANG` = Địa Nang / 地囊.

## Thổ Phù — 土符

### Nguồn Việt

Tập 1, Quyển 6, trang in 542.

“Tổng yếu lịch” nói Thổ Phù là Thổ thần; ngày này kị phá thổ, đào giếng, khai cừ, xây tường.

“Lịch lệ” cho vị trí 12 tháng:

| Chi tháng | Chi ngày Thổ Phù |
| --------- | ---------------- |
| Dần       | Sửu              |
| Mão       | Tỵ               |
| Thìn      | Dậu              |
| Tỵ        | Dần              |
| Ngọ       | Ngọ              |
| Mùi       | Tuất             |
| Thân      | Mão              |
| Dậu       | Mùi              |
| Tuất      | Hợi              |
| Hợi       | Thìn             |
| Tý        | Thân             |
| Sửu       | Tý               |

### Hán bản

Quyển 6:

`土符者正月丑二月巳三月酉四月寅五月午六月戌七月卯八月未九月亥十月辰十一月申十二月子`

Bảng khớp bản Việt.

### Representation

Lookup:

`Chi tháng -> một Chi ngày`.

Có thể dùng `DinhNghiaYeuToTheoChiThang`.

### Oracle

- 12 Chi tháng x 12 Chi ngày.
- đúng một Chi ngày match mỗi tháng.
- expected table copy trực tiếp từ source, không derive từ production definition.

## Địa Nang — 地囊

### Cảnh báo source

Tập 1, Quyển 6, trang in 538 có bảng “Lịch lệ” truyền cũ với nhiều lỗi chép.

Trang 540–541, phần **Xét**, Hiệp Kỷ tự đính chính lại công thức và nói rõ:

- bản cũ truyền chép nhầm;
- trong 48 chữ nhầm 23 chữ;
- phải dùng bảng suy lại theo quẻ tam hợp / nạp Giáp.

Production **không được** dùng bảng Lịch lệ cũ ở trang 538.

Hán bản Quyển 6 cũng có cùng phần `按地囊...` và cùng ghi nhận lỗi truyền bản.

### Bảng đã đính chính

| Chi tháng | Hai ngày Địa Nang    |
| --------- | -------------------- |
| Dần       | Canh Tý, Canh Ngọ    |
| Mão       | Ất Mùi, Quý Sửu      |
| Thìn      | Giáp Tý, Nhâm Ngọ    |
| Tỵ        | Kỷ Mão, Kỷ Dậu       |
| Ngọ       | Nhâm Tuất, Giáp Thìn |
| Mùi       | Bính Thìn, Bính Tuất |
| Thân      | Đinh Tỵ, Đinh Hợi    |
| Dậu       | Bính Dần, Bính Thân  |
| Tuất      | Tân Sửu, Tân Mùi     |
| Hợi       | Mậu Dần, Mậu Thân    |
| Tý        | Tân Mão, Tân Dậu     |
| Sửu       | Quý Dậu, Ất Mão      |

### Hán đối chiếu

Phần đính chính Hán cho cùng các cặp:

- 正月 庚子 / 庚午
- 二月 乙未 / 癸丑
- 三月 甲子 / 壬午
- 四月 己卯 / 己酉
- 五月 壬戌 / 甲辰
- 六月 丙辰 / 丙戌
- 七月 丁巳 / 丁亥
- 八月 丙寅 / 丙申
- 九月 辛丑 / 辛未
- 十月 戊寅 / 戊申
- 十一月 辛卯 / 辛酉
- 十二月 癸酉 / 乙卯

Khớp phần Xét bản Việt.

### Representation

Repo đã có `DinhNghiaYeuToTapCanChiTheoChiThang`:

`Chi tháng -> readonly CanChi[2]`.

Không cần tạo calculator kiểu quẻ/nạp Giáp ở runtime; calculator dùng bảng source-locked.
Giải thích quẻ là provenance cho bảng, không phải input runtime.

### Oracle

- 12 Chi tháng x full sexagenary 60-day cycle.
- mỗi tháng phải match đúng 2 Can Chi.
- expected table lấy từ phần **Xét/按 đã đính chính**, không lấy từ “Lịch lệ” cũ.
- regression guard riêng cho vài chỗ truyền bản sai:
  - tháng Mão phải có Ất Mùi, không phải Quý Mùi;
  - tháng Thìn phải có Nhâm Ngọ, không phải Giáp Dần;
  - tháng Tỵ phải có Kỷ Dậu, không phải Kỷ Sửu;
  - tháng Mùi phải là Bính Thìn/Bính Tuất.

## Thổ Vượng dụng sự — 土王用事後

Không tạo factor giả.

Project đã VERIFIED + IMPLEMENTED primitive calendar:

`dangThoVuong: boolean`

Semantics hiện có:

- bốn khoảng;
- mỗi khoảng 18 civil days ngay trước Lập Xuân/Lập Hạ/Lập Thu/Lập Đông;
- start inclusive;
- ngày Lập exclusive.

Q11 nói `土王用事後`. Trong project convention đã khóa cho Mẫu Thương, “sau Thổ Vượng dụng sự” là từ ngày marker Thổ Vượng bắt đầu tới trước ngày Lập.

### Typed activity target

Mở rộng `DieuKienDungSu` bằng calendar fact thật:

```ts
| { loai: 'THO_VUONG' }
```

Không thêm `MaYeuTo.THO_VUONG`.

Evaluation context phải nhận `dangThoVuong` đã tính từ calendar/date-selection.

## Q10 — Thổ Phù / Địa Nang

### Bản Việt

Tập 1, Quyển 10, trang in 821, mục **THỔ PHÙ - ĐỊA NANG**.

Kị gồm rõ:

- xây dựng cung thất;
- sửa cung thất;
- ...
- khởi tạo động thổ;
- ...

Sau danh sách:

“Gộp cùng với Đức hợp, Xá Nguyện vẫn phải kị.”

### Hán bản

`土符 地囊`:

- Kị có `營建宮室`, `修宮室`, `興造動土`;
- `與德合赦願併猶忌`.

### Kết luận

Cho cả `SUA_CUNG_THAT` và `DONG_THO`:

- Thổ Phù / Địa Nang là hard blocker theo contribution;
- Đức/Hợp/Xá/Nguyện không tự xóa blocker này;
- giữ source trace Việt + Hán.

Không suy rộng “mọi việc đều Kị”; Q10 chỉ nói các việc trong danh sách vẫn Kị.

## Q10 — Thổ Vượng dụng sự

### Bản Việt

Tập 1, Quyển 10, trang in 829, mục **THỔ VƯỢNG DỤNG SỰ**.

Kị gồm:

- xây dựng cung thất;
- sửa cung thất;
- ...
- khởi tạo động thổ;
- ...

Và ghi:

“Nghĩa giống Thổ phủ.”

### Hán bản

`土王用事`:

- Kị có `營建宮室`, `修宮室`, `興造動土`;
- `義同土府`.

Khớp bản Việt.

### Kết luận

Khi `dangThoVuong === true`:

- Q11 contribution `THO_VUONG` match;
- với hai activity này contribution vẫn Kị;
- Q10 semantics theo Thổ Phủ cho nhóm việc xây/sửa/động thổ.

## Q10 — liên hệ Thổ Phủ

Hán Q10 mục `月建〈小時 土府〉` xác nhận Thổ Phủ chuyên Kị nhóm xây dựng/động thổ.

Ngay cả khi đồng thời có Thiên Đức / Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp / Thiên Xá / Nguyệt Ân / Tứ Tướng, các việc xây dựng/động thổ trong danh sách vẫn Kị.

Do Q10 Thổ Vượng ghi “nghĩa giống Thổ Phủ”, đây là hard semantic cần giữ cho earthwork vertical.

## Dependency matrix

### Đã có production factor / primitive

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
- Tam Hợp
- Phúc Đức
- Trực Khai

Kị:

- Nguyệt Kiến
- Thổ Phủ 土府
- Nguyệt Phá
- Trực Bình
- Trực Thu
- Trực Bế
- Kiếp Sát
- Tai Sát
- Nguyệt Sát
- Nguyệt Hình
- Nguyệt Yếm
- Đại Thời
- Thiên Lại
- Tứ Phế
- Ngũ Mộ
- calendar fact `dangThoVuong`

### Còn thiếu production factor

- `THO_PHU_TIN` — Thổ Phù 土符.
- `DIA_NANG` — Địa Nang 地囊.

## Implementation gates

Trước khi đưa earthwork activity vào production:

1. implement + ORACLE_TEST Thổ Phù;
2. implement + ORACLE_TEST Địa Nang bằng **bảng đính chính**;
3. mở rộng typed activity target với `THO_VUONG`;
4. thêm Q11 exact-set tests:
   - SUA_CUNG_THAT = 6 Nên / 18 Kị;
   - DONG_THO = 11 Nên / 18 Kị;
5. thêm Q10 regression tối thiểu:
   - Thổ Phù + Đức/Hợp/Xá/Nguyện vẫn Kị;
   - Địa Nang + Đức/Hợp/Xá/Nguyện vẫn Kị;
   - đang Thổ Vượng vẫn Kị;
   - không giả factor cho Thổ Vượng;
6. sau base vertical mới mở rộng full Q10 semantics cho toàn bộ 18 blocker nếu còn nhánh activity-specific chưa khóa.

## Trạng thái

- [x] exact Vietnamese Q11 pages reopened from canonical user upload
- [x] Q11 Việt/Hán COMPARED
- [x] exact Vietnamese Q6 Thổ Phù / Địa Nang reopened
- [x] Hán Q6 COMPARED
- [x] corrected Địa Nang table VERIFIED
- [x] Thổ Phù formula VERIFIED
- [x] exact Vietnamese Q10 pages 821 / 829 reopened
- [x] Q10 Việt/Hán COMPARED for missing earth blockers
- [x] Thổ Vượng typed representation decided
- [x] independent oracle plan defined
- [ ] missing factors IMPLEMENTED
- [ ] missing factors ORACLE_TESTED
- [ ] activity rules IMPLEMENTED
- [ ] end-to-end ORACLE_TESTED
