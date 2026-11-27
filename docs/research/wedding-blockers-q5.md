# Research: Wedding blockers Quyển 5

Status: ORACLE_TESTED

## Phạm vi

Khóa năm factor Quyển 5 được Quyển 11 dùng làm Kị cho `CUOI_HOI`:

- Tứ Phế — 四廢
- Tứ Kị — 四忌
- Tứ Cùng — 四窮
- Ngũ Mộ — 五墓
- Bát Chuyên — 八專

## Nguồn Việt

Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 5.

- trang 435: Ngũ Mộ, giải thích vượng can của ngũ hành vào mộ.
- trang 438–440: Tứ Phế, Tứ Kị, Tứ Cùng và nhóm tên Bát Long / Thất Điểu / Cửu Hổ / Lục Xà.
- trang 453–454: Bát Chuyên; sách ghi rõ chỉ có năm ngày và kị việc cưới xin.

Đối chiếu trực tiếp scan Tập 1; PDF page = trang in + 7 trong bản scan đang dùng để research.

## Hán bản

欽定協紀辨方書 卷五, đối chiếu lại trên Wikisource.

- 四廢: 春庚申辛酉，夏壬子癸亥，秋甲寅乙卯，冬丙午丁巳.
- 四忌: 春甲子，夏丙子，秋庚子，冬壬子.
- 四窮: 春乙亥，夏丁亥，秋辛亥，冬癸亥.
- 五墓: 正二月乙未，四五月丙戌，七八月辛丑，十十一月壬辰，四季月戊辰.
- 八專: 丁未、己未、庚申、甲寅、癸丑.

Bản Việt và Hán khớp về các bảng/công thức cần cho calculator.

## Representation

### Tứ Phế

Lookup theo mùa -> tập Can Chi ngày:

| Mùa  | Can Chi            |
| ---- | ------------------ |
| Xuân | Canh Thân, Tân Dậu |
| Hạ   | Nhâm Tý, Quý Hợi   |
| Thu  | Giáp Dần, Ất Mão   |
| Đông | Bính Ngọ, Đinh Tỵ  |

### Tứ Kị

Lookup theo mùa -> một Can Chi ngày:

- Xuân: Giáp Tý
- Hạ: Bính Tý
- Thu: Canh Tý
- Đông: Nhâm Tý

### Tứ Cùng

Lookup theo mùa -> một Can Chi ngày:

- Xuân: Ất Hợi
- Hạ: Đinh Hợi
- Thu: Tân Hợi
- Đông: Quý Hợi

Tên Bát Long / Thất Điểu / Cửu Hổ / Lục Xà là cách gọi nhóm Tứ Kị + Tứ Cùng theo mùa, không tạo calculator riêng.

### Ngũ Mộ

Lookup theo Chi tháng -> Can Chi ngày:

- Dần, Mão -> Ất Mùi
- Thìn, Mùi, Tuất, Sửu -> Mậu Thìn
- Tỵ, Ngọ -> Bính Tuất
- Thân, Dậu -> Tân Sửu
- Hợi, Tý -> Nhâm Thìn

### Bát Chuyên

Set Can Chi cố định, đúng năm ngày:

- Đinh Mùi
- Kỷ Mùi
- Canh Thân
- Giáp Dần
- Quý Sửu

Không thay bằng danh sách “tám ngày” dân gian chỉ vì tên gọi Bát Chuyên.

## Oracle plan

- Tứ Phế: 12 Chi tháng x đủ vòng 60 ngày, expected độc lập theo mùa.
- Tứ Kị/Tứ Cùng: 12 Chi tháng x đủ vòng 60.
- Ngũ Mộ: 12 Chi tháng x đủ vòng 60.
- Bát Chuyên: đủ vòng 60 và guard số phần tử = 5.

## Trạng thái

- [x] Bản Việt LOCATED
- [x] Việt/Hán COMPARED
- [x] Formula VERIFIED
- [x] Representation chốt
- [x] Oracle plan độc lập
- [x] IMPLEMENTED
- [x] ORACLE_TESTED
