# Research: Thập Nhị Trực

Status: VERIFIED

## Câu hỏi cần trả lời

Trực của ngày được suy từ Chi tháng và Chi ngày như thế nào?

## Kết luận

Chuỗi 12 trực theo thứ tự:

1. Kiến
2. Trừ
3. Mãn
4. Bình
5. Định
6. Chấp
7. Phá
8. Nguy
9. Thành
10. Thu
11. Khai
12. Bế

Với Chi ngày trùng Chi tháng thì là Kiến. Mỗi khi Chi ngày tiến một bước thì trực tiến một bước.

Do đó:

```ts
offset =
  (chiNgayIndex - chiThangIndex + 12) %
  (12)[(KIEN, TRU, MAN, BINH, DINH, CHAP, PHA, NGUY, THANH, THU, KHAI, BE)][offset];
```

## Bản Việt

Nguồn:

- Hiệp Kỷ Biện Phương Thư, Tập 2.
- Quyển 20, Nguyệt biểu tháng Giêng.
- PDF 312 / trang in 311 xác nhận tháng Giêng Nguyệt kiến tại Dần.
- PDF 314 / trang in 313:
  - Giáp Tý: Khai nhật;
  - Ất Sửu: Bế nhật;
  - Bính Dần: Kiến nhật.
- PDF 315 / trang in 314:
  - Đinh Mão: Trừ nhật;
  - Mậu Thìn: Mãn nhật.

Các dòng tiếp theo tiếp tục đúng chuỗi 12 trực.

## Hán bản

Nguồn:

- Quyển 20:
  https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B720
- Quyển 21:
  https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B721
- Quyển 30 có tháng Tý và tiếp tục cùng quy luật.

Quyển 20 cho Dần là Kiến; Quyển 21 cho Mão là Kiến; các Chi sau đi lần lượt Trừ, Mãn, Bình...

## Representation

Đây là công thức primitive, không cần lưu table 12 x 12 nếu code modulo rõ và test đủ.

Tuy nhiên test oracle nên dùng hàng thật từ Nguyệt biểu, không tự generate expected bằng cùng công thức.

## Oracle / fixture tối thiểu

Tháng Dần:

- Tý -> Khai
- Sửu -> Bế
- Dần -> Kiến
- Mão -> Trừ
- Thìn -> Mãn

Tháng Mão:

- Mão -> Kiến
- Thìn -> Trừ
- Tỵ -> Mãn

Nên mở rộng thành 12 tháng x 12 Chi từ Nguyệt biểu khi implementation bắt đầu.

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
