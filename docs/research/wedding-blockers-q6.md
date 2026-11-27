# Research: Wedding blockers Quyển 6

Status: VERIFIED

## Phạm vi

Khóa ba factor Quyển 6 được Quyển 11 dùng làm Kị cho `CUOI_HOI`:

- Đại Thời — 大時, còn gọi Đại Bại / Hàm Trì
- Thiên Lại — 天吏, còn gọi Trí Tử
- Vãng Vong — 往亡

## Nguồn Việt

Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 6.

- trang 496–497: Đại Thời / Đại Bại / Hàm Trì; tháng Giêng khởi Mão, nghịch hành tứ trọng.
- trang 500: Thiên Lại / Trí Tử; tháng Giêng khởi Dậu, nghịch hành tứ trọng.
- trang 550: Vãng Vong; Lịch lệ cho bảng Chi ngày đủ 12 tháng.
- trang 555: phần giải thích “khí ngày Vãng Vong” theo offset sau Lập Xuân/Lập Hạ/Lập Thu/Lập Đông.

Điểm trang 555 là identity guard: Vãng Vong dùng trong Quyển 11 là factor bảng tháng ở trang 550; không alias với công thức Khí Vãng Vong.

## Hán bản

欽定協紀辨方書 卷六, đối chiếu lại trên Wikisource.

Bản Việt và Hán khớp về quy luật khởi vị trí, chiều chạy và bảng 12 tháng.

## Representation

Ba factor đều là lookup theo Chi tháng -> Chi ngày.

| Chi tháng | Đại Thời | Thiên Lại | Vãng Vong |
| --------- | -------- | --------- | --------- |
| Dần       | Mão      | Dậu       | Dần       |
| Mão       | Tý       | Ngọ       | Tỵ        |
| Thìn      | Dậu      | Mão       | Thân      |
| Tỵ        | Ngọ      | Tý        | Hợi       |
| Ngọ       | Mão      | Dậu       | Mão       |
| Mùi       | Tý       | Ngọ       | Ngọ       |
| Thân      | Dậu      | Mão       | Dậu       |
| Dậu       | Ngọ      | Tý        | Tý        |
| Tuất      | Mão      | Dậu       | Thìn      |
| Hợi       | Tý       | Ngọ       | Mùi       |
| Tý        | Dậu      | Mão       | Tuất      |
| Sửu       | Ngọ      | Tý        | Sửu       |

Aliases:

- Đại Thời: Đại Bại, Hàm Trì.
- Thiên Lại: Trí Tử.

## Oracle plan

Mỗi factor chạy ma trận độc lập 12 Chi tháng x 12 Chi ngày:

- đúng một Chi ngày match cho mỗi Chi tháng;
- expected table copy từ source, không derive từ production definition;
- Vãng Vong có regression guard để không bị thay bằng solar-term-offset Khí Vãng Vong.

## Trạng thái

- [x] Bản Việt LOCATED
- [x] Việt/Hán COMPARED
- [x] Formula VERIFIED
- [x] Identity Vãng Vong VERIFIED
- [x] Oracle plan độc lập
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
