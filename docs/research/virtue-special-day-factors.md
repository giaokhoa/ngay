# Research: Virtue and special-day factors — Quyển 5

Status: PARTIAL_VERIFIED

Issue: #13

## Mục tiêu

Xác minh nhóm Đức thần và ngày đặc biệt trong Quyển 5 / Nghĩa lệ 3, đồng thời phân biệt rõ:

- factor theo Can ngày;
- factor theo Chi ngày;
- factor theo Can Chi ngày;
- factor theo mùa;
- factor có yếu tố phương vị/quẻ, không được ép thành Chi ngày.

Scope:

- Thiên Đức
- Nguyệt Đức
- Thiên Đức Hợp
- Nguyệt Đức Hợp
- Nguyệt Không
- Thiên Ân
- Thiên Xá
- Thiên Nguyện
- Mẫu Thương
- Nguyệt Ân
- Tứ Tướng
- Thời Đức

## Nguồn Việt

Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 5 — Nghĩa lệ 3.

| Yếu tố                | Trang PDF | Trang in |
| --------------------- | --------: | -------: |
| Thiên Đạo / Thiên Đức |       394 |      387 |
| Nguyệt Đức            |       402 |      395 |
| Thiên Đức Hợp         |       405 |      398 |
| Nguyệt Đức Hợp        |       407 |      400 |
| Nguyệt Không          |       409 |      402 |
| Thiên Ân              |       411 |      404 |
| Thiên Xá              |       414 |      407 |
| Thiên Nguyện          |   418–419 |  411–412 |
| Mẫu Thương            |       422 |      415 |
| Nguyệt Ân             |   424–425 |  417–418 |
| Tứ Tướng              |   427–428 |  420–421 |
| Thời Đức              |   429–430 |  422–423 |

Các trang đồ hình và phần “Lịch lệ” ngay dưới đồ hình là nguồn chính cho formula.

## Hán bản

Nguồn:

- 欽定協紀辨方書, 卷五, 義例三.
- https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B705

Nguyệt biểu dùng làm oracle theo tháng:

- Quyển 20–31.
- Ví dụ Quyển 21 ghi rõ tháng Mão: “Thiên Đức tại Khôn, Nguyệt Đức tại Giáp, Nguyệt Đức Hợp tại Kỷ, Nguyệt Không tại Canh”.

## 1. Thiên Đức

### Canonical source values

Theo Quyển 5:

| Chi tháng | Giá trị Thiên Đức |
| --------- | ----------------- |
| Dần       | Đinh              |
| Mão       | Khôn              |
| Thìn      | Nhâm              |
| Tỵ        | Tân               |
| Ngọ       | Càn               |
| Mùi       | Giáp              |
| Thân      | Quý               |
| Dậu       | Cấn               |
| Tuất      | Bính              |
| Hợi       | Ất                |
| Tý        | Tốn               |
| Sửu       | Canh              |

### Điểm quyết định

**Không được đổi Khôn/Càn/Cấn/Tốn thành Thân/Hợi/Dần/Tỵ trong engine Hiệp Kỷ.**

Chính phần hiệu đính của sách nói:

- Thiên Đức “không dùng địa chi”;
- tháng Tý bị các thông thư ghi Tỵ là sai và phải sửa;
- bốn tháng trọng dùng quẻ/kho cung.

Quyển 21 tháng Mão cũng giữ nguyên:
`天徳在坤`.

Do đó source semantics là:

- tháng Dần/Thìn/Tỵ/Mùi/Thân/Tuất/Hợi/Sửu: có thể match **Can ngày**;
- tháng Mão/Ngọ/Dậu/Tý: Thiên Đức nằm ở **quẻ/phương vị**, không có một Chi ngày canonical trong Hiệp Kỷ để thay thế.

### Representation đề xuất

Không đưa Thiên Đức vào lookup `chiThang -> chiNgay`.

Tách:

```ts
type ViTriThienDuc = { loai: 'CAN_NGAY'; can: ThienCan } | { loai: 'QUAI'; quai: Quai };
```

Day-factor engine chỉ emit `THIEN_DUC` khi source value là `CAN_NGAY` và Can ngày match.

Phần `QUAI` là directional context, không tự tạo day match.

### Naming blocker

Càn và Cấn đều trở thành `CAN` khi bỏ dấu.

Nếu project thêm enum quẻ, không được tạo hai identifier trùng. Cần naming disambiguation rõ, ví dụ dùng nghĩa quẻ:

- Càn / 乾: `CAN_THIEN`;
- Cấn / 艮: `CAN_SON`.

Chỉ chốt bằng ADR khi direction domain được implement.

### Status

VERIFIED về source semantics.

Implementation day-factor: chỉ 8 tháng Can ngày; direction model defer.

## 2. Nguyệt Đức

Source:

- chính/ngũ/cửu nguyệt: Bính;
- nhị/lục/thập nguyệt: Giáp;
- tam/thất/thập nhất: Nhâm;
- tứ/bát/thập nhị: Canh.

Theo chi tháng:

| Nhóm tháng     | Can ngày |
| -------------- | -------- |
| Dần, Ngọ, Tuất | Bính     |
| Mão, Mùi, Hợi  | Giáp     |
| Thìn, Thân, Tý | Nhâm     |
| Tỵ, Dậu, Sửu   | Canh     |

Representation: `chiThang -> canNgay`.

Status: VERIFIED.

## 3. Thiên Đức Hợp

Quyển 5 ghi:

| Chi tháng | Can ngày          |
| --------- | ----------------- |
| Dần       | Nhâm              |
| Mão       | không có ngày hợp |
| Thìn      | Đinh              |
| Tỵ        | Bính              |
| Ngọ       | không có ngày hợp |
| Mùi       | Kỷ                |
| Thân      | Mậu               |
| Dậu       | không có ngày hợp |
| Tuất      | Tân               |
| Hợi       | Canh              |
| Tý        | không có ngày hợp |
| Sửu       | Ất                |

Sách nói rõ:
“bốn tháng trọng Thiên Đức ở bốn duy nên không có hợp”.

Không được tự lấy lục hợp địa chi để tạo “Thiên Đức Hợp ngày” cho Mão/Ngọ/Dậu/Tý.

Status: VERIFIED.

## 4. Nguyệt Đức Hợp

Là Can hợp với Nguyệt Đức:

| Nhóm tháng     | Can ngày |
| -------------- | -------- |
| Dần, Ngọ, Tuất | Tân      |
| Mão, Mùi, Hợi  | Kỷ       |
| Thìn, Thân, Tý | Đinh     |
| Tỵ, Dậu, Sửu   | Ất       |

Status: VERIFIED.

## 5. Nguyệt Không

Quyển 5:

| Nhóm tháng     | Can ngày |
| -------------- | -------- |
| Dần, Ngọ, Tuất | Nhâm     |
| Mão, Mùi, Hợi  | Canh     |
| Thìn, Thân, Tý | Bính     |
| Tỵ, Dậu, Sửu   | Giáp     |

Hán bản giải thích Nguyệt Không là vị trí đối với Nguyệt Đức:

- Nguyệt Đức Bính -> Nguyệt Không Nhâm;
- Giáp -> Canh;
- Nhâm -> Bính;
- Canh -> Giáp.

Status: VERIFIED.

## 6. Thiên Ân

Không phụ thuộc tháng.

Lịch lệ quy định 15 ngày Can Chi cố định:

```text
Giáp Tý
Ất Sửu
Bính Dần
Đinh Mão
Mậu Thìn

Kỷ Mão
Canh Thìn
Tân Tỵ
Nhâm Ngọ
Quý Mùi

Kỷ Dậu
Canh Tuất
Tân Hợi
Nhâm Tý
Quý Sửu
```

Representation:
`Set<CanChi>`.

Status: VERIFIED.

## 7. Thiên Xá

Theo bốn mùa:

| Mùa  | Can Chi ngày |
| ---- | ------------ |
| Xuân | Mậu Dần      |
| Hạ   | Giáp Ngọ     |
| Thu  | Mậu Thân     |
| Đông | Giáp Tý      |

Season mapping trong date-selection:

- Xuân: tháng Dần/Mão/Thìn;
- Hạ: Tỵ/Ngọ/Mùi;
- Thu: Thân/Dậu/Tuất;
- Đông: Hợi/Tý/Sửu.

Representation:
`mua -> CanChi`.

Status: VERIFIED.

## 8. Thiên Nguyện

Lịch lệ cho bảng 12 tháng:

| Chi tháng | Can Chi ngày |
| --------- | ------------ |
| Dần       | Giáp Ngọ     |
| Mão       | Giáp Tuất    |
| Thìn      | Ất Dậu       |
| Tỵ        | Bính Tý      |
| Ngọ       | Đinh Sửu     |
| Mùi       | Mậu Ngọ      |
| Thân      | Giáp Dần     |
| Dậu       | Bính Thìn    |
| Tuất      | Tân Mão      |
| Hợi       | Mậu Thìn     |
| Tý        | Giáp Tý      |
| Sửu       | Quý Mùi      |

Bản Việt trang 411–412 và Hán bản Quyển 5 khớp.

Representation:
`chiThang -> CanChi`.

Status: VERIFIED.

## 9. Mẫu Thương

Lịch lệ:

- Xuân: Hợi, Tý;
- Hạ: Dần, Mão;
- Thu: Thìn, Tuất, Sửu, Mùi;
- Đông: Thân, Dậu;
- **sau Thổ vượng**: Tỵ, Ngọ.

Điểm cuối làm factor này không thể chỉ map `mùa -> set chiNgày`.

Project hiện chưa có primitive `THO_VUONG` / “Thổ Vương dụng sự” để xác định chính xác khoảng chuyển tiếp mà rule nói tới.

### Status

COMPARED, **chưa VERIFIED để implement production**.

Blocker:

- research và implement primitive Thổ Vương trước;
- sau đó mới xác định precedence giữa seasonal set và `sau Thổ vượng -> Tỵ/Ngọ`.

Không được bỏ điều kiện này và implement bản seasonal rút gọn.

## 10. Nguyệt Ân

Bảng 12 tháng theo Can ngày:

| Chi tháng | Can ngày |
| --------- | -------- |
| Dần       | Bính     |
| Mão       | Đinh     |
| Thìn      | Canh     |
| Tỵ        | Kỷ       |
| Ngọ       | Mậu      |
| Mùi       | Tân      |
| Thân      | Nhâm     |
| Dậu       | Quý      |
| Tuất      | Canh     |
| Hợi       | Ất       |
| Tý        | Giáp     |
| Sửu       | Tân      |

Representation:
`chiThang -> canNgay`.

Status: VERIFIED.

## 11. Tứ Tướng

Theo mùa, match **Can ngày**:

| Mùa  | Can ngày   |
| ---- | ---------- |
| Xuân | Bính, Đinh |
| Hạ   | Mậu, Kỷ    |
| Thu  | Nhâm, Quý  |
| Đông | Giáp, Ất   |

Sách giải thích Canh/Tân không dùng.

Representation:
`mua -> Set<ThienCan>`.

Status: VERIFIED.

## 12. Thời Đức

Còn gọi là Tứ Thời Thiên Đức.

Theo mùa, match **Chi ngày**:

| Mùa  | Chi ngày |
| ---- | -------- |
| Xuân | Ngọ      |
| Hạ   | Thìn     |
| Thu  | Tý       |
| Đông | Dần      |

Bản Việt trang 423 nhấn mạnh:

- Tứ Tướng dùng thiên can;
- Thời Đức dùng địa chi.

Representation:
`mua -> DiaChi`.

Status: VERIFIED.

## Implementation batches đề xuất

Không đưa toàn bộ issue #13 vào một PR implementation.

### Batch Q5-A — simple stem/month factors

Có thể implement ngay:

- Nguyệt Đức
- Thiên Đức Hợp
- Nguyệt Đức Hợp
- Nguyệt Không
- Nguyệt Ân

Input:

- chiThang;
- canNgay.

### Batch Q5-B — fixed/seasonal Can Chi

Có thể implement ngay:

- Thiên Ân
- Thiên Xá
- Thiên Nguyện
- Tứ Tướng
- Thời Đức

Input thêm:

- CanChi ngày;
- mùa suy từ chiThang.

### Batch Q5-C — Thiên Đức

Implement day matcher cho 8 tháng Can ngày.

Không branch-substitute bốn quẻ.

Directional part chỉ làm khi product có direction domain.

### Blocked — Mẫu Thương

Không implement trước khi Thổ Vương được VERIFIED.

## Oracle plan

### Nguyệt biểu

Mỗi Quyển 20–31 header ghi trực tiếp:

- Thiên Đức;
- Nguyệt Đức;
- Nguyệt Đức Hợp;
- Nguyệt Không.

Ví dụ Quyển 21 tháng Mão:

- Thiên Đức tại Khôn;
- Nguyệt Đức tại Giáp;
- Nguyệt Đức Hợp tại Kỷ;
- Nguyệt Không tại Canh.

Đây là oracle mạnh để ngăn việc tự đổi Khôn thành Thân.

### Quyển 9

Dùng:

- bảng ngày thần lấy Can Chi cố định cho Thiên Ân;
- bảng/tháng cho các monthly factors nếu có;
- không reverse-engineer Q9 thay cho Nghĩa lệ.

### Direct formula tests

Thiên Xá, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức có bảng trực tiếp trong Quyển 5 đủ để làm explicit oracle fixture.

## Trạng thái tổng

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED: 11/12 yếu tố về formula/source semantics
- [ ] Mẫu Thương blocked bởi Thổ Vương
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
