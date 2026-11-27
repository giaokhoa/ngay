# Research: Di chuyển / 般移〈移徙同〉

Status: ORACLE_TESTED

## Phạm vi

Vertical slice Phase 5 kế tiếp:

- mã nghiệp vụ dự kiến: DI_CHUYEN
- tên UI: Di chuyển
- tên Việt trong Quyển 11: Di chuyển (dời bếp)
- Hán: 般移〈移徙同〉

Không đồng nhất activity này với:

- 遠迴 / Từ xa về;
- 出行 / Xuất hành;
- 安牀 / Kê giường.

## Nguồn Việt canonical

Hiệp Kỷ Biện Phương Thư, Tập 1, full scan user upload đã fingerprint ở
docs/source-catalog.md.

### Dân nhật

Quyển 5, trang in 425–426, PDF page 432–433.

Lịch lệ ghi:

- Xuân: Ngọ
- Hạ: Dậu
- Thu: Tý
- Đông: Mão

Representation: mùa -> Chi ngày.

### Thiên Mã

Quyển 6, trang in 532, PDF page 539.

Bản Việt ghi tháng Giêng khởi Ngọ, thuận hành sáu thời dương.

Chuỗi 12 tháng:

| Chi tháng | Chi ngày Thiên Mã |
| --------- | ----------------- |
| Dần       | Ngọ               |
| Mão       | Thân              |
| Thìn      | Tuất              |
| Tỵ        | Tý                |
| Ngọ       | Dần               |
| Mùi       | Thìn              |
| Thân      | Ngọ               |
| Dậu       | Thân              |
| Tuất      | Tuất              |
| Hợi       | Tý                |
| Tý        | Dần               |
| Sửu       | Thìn              |

Representation: Chi tháng -> Chi ngày.

### Quy Kị

Quyển 6, trang in 547, PDF page 554.

Bản Việt ghi:

- tháng Mạnh: Sửu;
- tháng Trọng: Dần;
- tháng Quý: Tý.

Suy ra theo 12 Chi tháng:

- Dần, Tỵ, Thân, Hợi -> Sửu;
- Mão, Ngọ, Dậu, Tý -> Dần;
- Thìn, Mùi, Tuất, Sửu -> Tý.

Representation: Chi tháng -> Chi ngày.

### Dụng sự Di chuyển

Quyển 11, trang in 852, PDF page 859.

Nên:

1. Thiên Đức
2. Nguyệt Đức
3. Thiên Đức Hợp
4. Nguyệt Đức Hợp
5. Thiên Xá
6. Thiên Nguyện
7. Nguyệt Ân
8. Tứ Tướng
9. Thời Đức
10. Dân nhật
11. Dịch Mã
12. Thiên Mã
13. Thành nhật
14. Khai nhật

Kị:

1. Nguyệt Phá
2. Bình nhật
3. Thu nhật
4. Bế nhật
5. Kiếp Sát
6. Tai Sát
7. Nguyệt Sát
8. Nguyệt Hình
9. Nguyệt Yếm
10. Đại Thời
11. Thiên Lại
12. Tứ Phế
13. Ngũ Mộ
14. Quy Kị
15. Vãng Vong

## Đối chiếu Hán bản

欽定協紀辨方書 卷五:

- 民日 là 午 / 酉 / 子 / 卯 theo Xuân / Hạ / Thu / Đông.

欽定協紀辨方書 卷六:

- 天馬: 正月起午，順行六陽辰.
- 歸忌: 孟月丑，仲月寅，季月子.

欽定協紀辨方書 卷十一:

般移〈移徙同〉 có đúng 14 Nên và 15 Kị như bản Việt ở trên.

Không phát hiện khác biệt logic giữa bản Việt và Hán trong ba formula hoặc
activity list này.

## Quyển 10 — conflict semantics cần cho DI_CHUYEN

Ma trận đầy đủ 15 Kị, delegation graph và regression vectors nằm ở
`di-chuyen-conflict-semantics-q10.md`.

### Dân nhật

民日 trực tiếp Nên 般移.

Chưa thấy rule Q10 làm Dân nhật tự thắng một blocker khác. Không dùng nó như
global "cát thắng hung".

### Thiên Mã

天馬 trực tiếp Nên 般移.

Không suy rộng sang mọi activity di chuyển khác.

### Quy Kị

歸忌 trực tiếp Kị 般移 / 遠迴.

Bản Việt Quyển 10, trang in 822 / PDF page 829 ghi:

- kị di chuyển, đi xa trở về;
- gặp cùng với Đức, Nguyện, Xá vẫn phải kị.

Hán bản ghi `與德合赦願併猶忌`. Có khác biệt cần giữ lại trong provenance:
Hán bản có chữ `合`, trong khi câu Việt ở trang 822 không nêu “Hợp”.

Không tự hòa giải khác biệt này thành một danh sách rộng hơn. Invariant production được
khóa ở mức cả hai bản cùng hỗ trợ: khi Quy Kị đã match thì blocker di chuyển vẫn
giữ hiệu lực; contribution Nên không được tự động xóa Quy Kị.

Các tổ hợp cụ thể với Thiên Đức Hợp / Nguyệt Đức Hợp được giữ dưới dạng điểm
đối chiếu Hán, không dùng để tạo phép triệt mới cho tới khi có quyết định source
rõ hơn.

## Dependency matrix

### Đã có

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
- Trực Thành
- Trực Khai
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
- Vãng Vong

### Còn thiếu production factor

- Dân nhật
- Thiên Mã
- Quy Kị

## Oracle plan

### Dân nhật

12 Chi tháng x 12 Chi ngày.

Expected không derive từ production definition; dùng bảng mùa độc lập:

- Dần/Mão/Thìn -> Ngọ
- Tỵ/Ngọ/Mùi -> Dậu
- Thân/Dậu/Tuất -> Tý
- Hợi/Tý/Sửu -> Mão

### Thiên Mã

12 x 12 oracle theo bảng source ở trên.

Guard:

- Dần -> Ngọ;
- Tỵ -> Tý;
- Hợi -> Tý;
- không alias với Dịch Mã.

### Quy Kị

12 x 12 oracle theo ba nhóm Mạnh/Trọng/Quý.

Regression:

- Dần -> Sửu;
- Mão -> Dần;
- Thìn -> Tý;
- pattern lặp theo từng quý của bốn mùa.

## Trạng thái

- [x] exact bản Việt user upload LOCATED
- [x] Việt/Hán COMPARED
- [x] Dân nhật VERIFIED
- [x] Thiên Mã VERIFIED
- [x] Quy Kị VERIFIED
- [x] Q11 DI_CHUYEN exact list VERIFIED
- [x] Q10 Quy Kị conflict semantics VERIFIED
- [x] oracle plan defined
- [x] missing factors IMPLEMENTED
- [x] activity/evaluation IMPLEMENTED cho Q11 + invariant Quy Kị đã source-lock
- [ ] end-to-end ORACLE_TESTED (giữ mở cho rà đầy đủ Q10 và khác biệt `合`)
