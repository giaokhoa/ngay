# Research: Thiên Can và Địa Chi

Status: VERIFIED

## Câu hỏi cần trả lời

Project dùng danh sách Thiên Can/Địa Chi nào và thứ tự chuẩn nào trong code?

## Thuật ngữ

- Tên Việt: Thiên Can, Địa Chi
- Tên Hán: 十干, 十二支
- Mã dự kiến trong code: ThienCan, DiaChi

## Bản Việt

Nguồn:

- Hiệp Kỷ Biện Phương Thư, Tập 1.
- Quyển 1, Cội nguồn 1.
- PDF/trang in 55: mục “Mười can - mười hai chi - mười hai kiến - hai mươi tám xá”.
- PDF/trang in 91: mục “Can Chi ngũ hành”.

Trang 55 ghi rõ:

- mười Can: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý;
- mười hai Chi: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi.

Trang 91 xác nhận cách dùng Can/Chi trong hệ ngũ hành của sách.

## Hán bản

Nguồn:

- 欽定協紀辨方書, 卷一, 本原一.
- Wikisource: https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B701

Mục 十干 十二支 ghi:

- 甲乙丙丁戊己庚辛壬癸;
- 子丑寅卯辰巳午未申酉戌亥.

## Đối chiếu

Hai bản khớp về số lượng, thứ tự và tên tương ứng.

## Logic có thể triển khai

Thứ tự ordinal phải cố định:

```ts
ThienCan: (GIAP, AT, BINH, DINH, MAU, KY, CANH, TAN, NHAM, QUY);

DiaChi: (TY, SUU, DAN, MAO, THIN, TI, NGO, MUI, THAN, DAU, TUAT, HOI);
```

Ghi chú bắt buộc:

- TY = Tý (子).
- TI = Tỵ (巳).

Không dùng dấu tiếng Việt trong identifier.

## Oracle / fixture

Fixture đơn giản:

- số lượng Can = 10;
- số lượng Chi = 12;
- thứ tự phải đúng như source.

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
