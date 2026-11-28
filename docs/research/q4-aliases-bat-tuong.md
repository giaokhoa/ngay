# Research: Quyển 4 — shared positions, monthly factors and Bất Tương

Status: VERIFIED

Q10 follow-up: các ngày hội Âm/Dương của Q4 có nhánh “mọi việc đều Kị” được source-lock bằng `q4-hard-days.ts`; xem phần cuối tài liệu.

Issue: #14

## Mục tiêu

Research Quyển 4 / Nghĩa lệ 2 để:

1. tái sử dụng Thập Nhị Trực đã có thay vì tạo calculator trùng;
2. phân biệt **cùng vị trí** với **cùng semantics**;
3. xác minh Nguyệt Kiến, Nguyệt Yếm, Yếm Đối;
4. nhập Âm Dương Bất Tương theo bảng nguồn, không phát minh công thức rút gọn.

## Nguồn Việt

Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 4 — Nghĩa lệ 2.

Các mốc chính:

- PDF 302 / trang in 295: mục lục Quyển 4.
- PDF 304+ / trang in 297+: Kiến Trừ mười hai thần.
- PDF 309+ / trang in 302+: “cùng ngôi vị với Kiến Trừ song khác tên”.
- PDF 310–336 / trang in 303–329: từng Trực và các thần cùng vị trí.
- PDF 351 / trang in 344: Nguyệt Kiến.
- PDF 354 / trang in 347: Nguyệt Yếm / Địa Hỏa.
- PDF 360 / trang in 353: Yếm Đối / Lục Nghi / Chiêu Diêu.
- PDF 363–365 / trang in 356–358: Âm Dương Bất Tương và bảng 12 tháng.

## Hán bản

Nguồn:

- 欽定協紀辨方書, 卷四, 義例二.
- https://zh.wikisource.org/wiki/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B704

Hán bản xác nhận:

- 建除同位異名;
- 月厭 / 地火;
- 厭對 / 六儀 / 招搖;
- 陰陽不將;
- bảng Bất Tương theo 12 tháng.

## Quyết định model: cùng vị trí ≠ alias display

Quyển 4 dùng khái niệm “đồng vị khác tên”.

Không được hiểu tất cả tên cùng vị trí là một semantic factor duy nhất.

Ví dụ Hán bản nói:

- Yếm Đối và Lục Nghi cùng vị trí;
- Yếm Đối kị cưới;
- Lục Nghi lại có việc nên dùng;
- sách giữ cả hai vì ý nghĩa/tác dụng khác nhau.

Do đó project phải tách:

```text
calculation of position
        ↓
one or more source factor identities
        ↓
Dụng sự/Nghi kị áp semantics riêng từng identity
```

Implementation nên chia sẻ primitive/lookup, nhưng có thể emit nhiều `MaYeuTo` cùng lúc nếu sách giữ nhiều thần cùng vị trí.

Không dùng một field `tenKhac[]` để collapse các trường hợp có semantics khác nhau.

## 1. Các thần cùng vị trí với 12 Trực

Canonical mapping theo mục lục Hán/Việt:

| Trực  | Các tên/thần cùng vị trí                             |
| ----- | ---------------------------------------------------- |
| Kiến  | Binh Phúc, Tiểu Thời, Thổ Phủ                        |
| Trừ   | Cát Kỳ, Binh Bảo                                     |
| Mãn   | Phúc Đức, Thiên Vu                                   |
| Bình  | tháng dương: Thiên Cương; tháng âm: Hà Khôi; Tử Thần |
| Định  | Thời Âm, Quan Phù, Tử Khí                            |
| Chấp  | Chi Đức, Tiểu Hao                                    |
| Phá   | Đại Hao                                              |
| Nguy  | không có tên cùng vị trí trong heading               |
| Thành | Thiên Y, Thiên Hỷ                                    |
| Thu   | tháng dương: Hà Khôi; tháng âm: Thiên Cương          |
| Khai  | Thời Dương, Sinh Khí                                 |
| Bế    | Huyết Chi                                            |

### Ngoại lệ Thiên Cẩu: không phải mọi Trực Mãn

Heading Q4 đặt `天狗` cạnh `滿〈福德 天巫 天狗〉`, nhưng phần biện giải sau đó bác cách coi đây là alias đồng vị phổ quát. Exact Việt p.310–311 và Hán `WYG_004-15b..16a` đều chốt:

- không phải mọi ngày Mãn đều là Thiên Cẩu;
- **Thiên Cẩu chỉ là ngày Tuất trong tháng kiến Thân** (`申建之戌`);
- vì chỉ có một vị trí nên sách nói không đưa vào đồ hình chung.

Production vì vậy giữ Phúc Đức/Thiên Vu theo Trực Mãn, nhưng tính `THIEN_CAU` riêng theo `chiThang=THAN && chiNgay=TUAT`. Regression có phản ví dụ Trực Mãn tháng Dần/ngày Thìn: vẫn có Phúc Đức + Thiên Vu nhưng **không** có Thiên Cẩu.

### Tháng dương / tháng âm

Ở mục Bình, bản Việt ghi:
“Tháng dương trước Kiến ba thời là Thiên Cương, sau ba thời là Hà Khôi. Tháng âm Kiến là ngược lại.”

Với calendar hiện tại:

- tháng dương = chi tháng dương: Dần, Thìn, Ngọ, Thân, Tuất, Tý;
- tháng âm = Mão, Tỵ, Mùi, Dậu, Hợi, Sửu.

Vì vậy Thiên Cương/Hà Khôi không thể chỉ map cố định vào một Trực cho mọi tháng:

- tháng dương: Bình = Thiên Cương, Thu = Hà Khôi;
- tháng âm: Bình = Hà Khôi, Thu = Thiên Cương.

### Representation đề xuất

Không tạo calculator riêng cho từng tên.

Dùng một registry theo:

- `truc`;
- optional polarity của chi tháng.

Ví dụ:

```ts
interface DinhNghiaYeuToTheoTruc {
  ma: MaYeuTo;
  truc: ThapNhiTruc;
  amDuongThang?: 'DUONG' | 'AM';
  nguon: ThamChieuNguon[];
}
```

Mỗi identity vẫn có `MaYeuTo` riêng nếu Dụng sự/Nghi kị có thể gọi tên riêng.

## 2. Nguyệt Kiến

Nguồn Việt PDF 351 / trang in 344:

“Tháng Giêng kiến Dần, đi thuận mười hai thời.”

Canonical:

```text
chiNgay = chiThang
```

Đây chính là vị trí Trực Kiến.

### Representation

Không cần lookup riêng:

- `truc === KIEN`, hoặc
- `chiNgay === chiThang`.

Nên có `MaYeuTo.NGUYET_KIEN` vì Dụng sự/Nghi kị có thể gọi Nguyệt Kiến bằng tên riêng.

Không cần một calculator thứ hai.

Status: VERIFIED.

## 3. Nguyệt Yếm / Địa Hỏa

Nguồn Việt PDF 354 / trang in 347.

Hán bản:

- Nguyệt Yếm: tháng Giêng khởi Tuất, nghịch hành 12 chi.
- Địa Hỏa cũng cùng vị trí.
- phần án nói rõ Địa Hỏa chính là Nguyệt Yếm về vị trí, nên đặt cùng mục.

Canonical:

| Chi tháng | Vị trí |
| --------- | ------ |
| Dần       | Tuất   |
| Mão       | Dậu    |
| Thìn      | Thân   |
| Tỵ        | Mùi    |
| Ngọ       | Ngọ    |
| Mùi       | Tỵ     |
| Thân      | Thìn   |
| Dậu       | Mão    |
| Tuất      | Dần    |
| Hợi       | Sửu    |
| Tý        | Tý     |
| Sửu       | Hợi    |

### Semantics

Không collapse `DIA_HOA` thành text alias nếu downstream rule có thể gọi Địa Hỏa riêng.

Dùng chung bảng vị trí, giữ identity riêng.

Status: VERIFIED.

## 4. Yếm Đối / Lục Nghi / Chiêu Diêu

Nguồn Việt PDF 360 / trang in 353.

Hán bản:

- Yếm Đối là chi xung của Nguyệt Yếm;
- tháng Giêng khởi Thìn, nghịch hành 12 chi;
- Lục Nghi cũng cùng vị trí;
- Chiêu Diêu cũng cùng vị trí.

Canonical:

| Chi tháng | Vị trí |
| --------- | ------ |
| Dần       | Thìn   |
| Mão       | Mão    |
| Thìn      | Dần    |
| Tỵ        | Sửu    |
| Ngọ       | Tý     |
| Mùi       | Hợi    |
| Thân      | Tuất   |
| Dậu       | Dậu    |
| Tuất      | Thân   |
| Hợi       | Mùi    |
| Tý        | Ngọ    |
| Sửu       | Tỵ     |

### Semantics phải tách

Hán bản giữ mâu thuẫn nguồn một cách có chủ ý:

- Yếm Đối: kị cưới;
- Lục Nghi: có việc như thị sự/lâm quan nên dùng;
- Chiêu Diêu: có điều kị liên quan thuyền/nước.

Vì vậy production phải có ba identities:

- `YEM_DOI`;
- `LUC_NGHI`;
- `CHIEU_DIEU`.

Cả ba dùng cùng position lookup.

Status: VERIFIED.

## 5. Âm Dương Bất Tương

Nguồn Việt:

- PDF 363 / trang in 356: đồ hình.
- PDF 364–365 / trang in 357–358: bảng Lịch lệ đủ 12 tháng.

Hán bản Quyển 4 có cùng bảng.

### Modeling rule

**Table-driven.**

Không cố rút thành công thức algebraic trong production đầu tiên.

Lý giải âm dương trong sách được lưu trong research/provenance; oracle production là bảng Can Chi theo tháng.

### Canonical table

Tháng được hiểu theo `chiThang` đã tính theo tiết khí.

#### Dần / tháng Giêng

- Tân Hợi
- Tân Sửu
- Tân Mão
- Canh Tý
- Canh Dần
- Kỷ Hợi
- Kỷ Sửu
- Kỷ Mão
- Đinh Hợi
- Đinh Sửu
- Đinh Mão
- Bính Tý
- Bính Dần

#### Mão / tháng Hai

- Canh Tuất
- Canh Tý
- Canh Dần
- Kỷ Hợi
- Kỷ Sửu
- Đinh Hợi
- Đinh Sửu
- Bính Tuất
- Bính Tý
- Bính Dần
- Ất Hợi
- Ất Sửu

#### Thìn / tháng Ba

- Kỷ Dậu
- Kỷ Hợi
- Kỷ Sửu
- Đinh Dậu
- Đinh Hợi
- Đinh Sửu
- Bính Tuất
- Bính Tý
- Ất Dậu
- Ất Hợi
- Ất Sửu
- Giáp Tuất
- Giáp Tý

#### Tỵ / tháng Tư

- Đinh Dậu
- Đinh Hợi
- Bính Thân
- Bính Tuất
- Bính Tý
- Ất Dậu
- Ất Hợi
- Giáp Thân
- Giáp Tuất
- Giáp Tý
- Mậu Thân
- Mậu Tuất
- Mậu Tý

#### Ngọ / tháng Năm

- Bính Thân
- Bính Tuất
- Ất Mùi
- Ất Dậu
- Ất Hợi
- Giáp Thân
- Giáp Tuất
- Mậu Thân
- Mậu Tuất
- Quý Mùi
- Quý Dậu
- Quý Hợi

#### Mùi / tháng Sáu

- Ất Mùi
- Ất Dậu
- Giáp Ngọ
- Giáp Thân
- Giáp Tuất
- Mậu Ngọ
- Mậu Thân
- Mậu Tuất
- Quý Mùi
- Quý Dậu
- Nhâm Ngọ
- Nhâm Thân
- Nhâm Tuất

#### Thân / tháng Bảy

- Ất Tỵ
- Ất Mùi
- Ất Dậu
- Giáp Ngọ
- Giáp Thân
- Mậu Ngọ
- Mậu Thân
- Quý Tỵ
- Quý Mùi
- Quý Dậu
- Nhâm Ngọ
- Nhâm Thân

#### Dậu / tháng Tám

- Giáp Thìn
- Giáp Ngọ
- Giáp Thân
- Mậu Thìn
- Mậu Ngọ
- Mậu Thân
- Quý Tỵ
- Quý Mùi
- Nhâm Thìn
- Nhâm Ngọ
- Nhâm Thân
- Tân Tỵ
- Tân Mùi
- Canh Thìn
- Canh Ngọ

#### Tuất / tháng Chín

- Mậu Thìn
- Mậu Ngọ
- Quý Mão
- Quý Tỵ
- Quý Mùi
- Nhâm Thìn
- Nhâm Ngọ
- Tân Mão
- Tân Tỵ
- Tân Mùi
- Canh Thìn
- Canh Ngọ

#### Hợi / tháng Mười

- Quý Mão
- Quý Tỵ
- Nhâm Dần
- Nhâm Thìn
- Nhâm Ngọ
- Tân Mão
- Tân Tỵ
- Canh Dần
- Canh Thìn
- Canh Ngọ
- Kỷ Mão
- Kỷ Tỵ

#### Tý / tháng Mười Một

- Nhâm Dần
- Nhâm Thìn
- Tân Sửu
- Tân Mão
- Tân Tỵ
- Canh Dần
- Canh Thìn
- Kỷ Sửu
- Kỷ Mão
- Kỷ Tỵ
- Đinh Sửu
- Đinh Mão
- Đinh Tỵ

#### Sửu / tháng Chạp

- Tân Sửu
- Tân Mão
- Canh Tý
- Canh Dần
- Canh Thìn
- Kỷ Sửu
- Kỷ Mão
- Đinh Sửu
- Đinh Mão
- Bính Tý
- Bính Dần
- Bính Thìn

Status: VERIFIED.

## Oracle strategy

### Shared-position factors

Test from source identities to positions:

- each Trực-derived factor must appear exactly on its shared Trực;
- Thiên Cương/Hà Khôi additionally test both month polarities;
- source identities remain distinct even when positions are the same.

### Nguyệt Kiến

12 × 12 Chi:

- match only `chiNgay === chiThang`.

### Nguyệt Yếm / Địa Hỏa

12 × 12 Chi using explicit oracle table.

### Yếm Đối / Lục Nghi / Chiêu Diêu

12 × 12 Chi using explicit oracle table.

### Bất Tương

12 × 60 Can Chi.

Expected sets must be copied into test fixture independently from production data.

## Implementation split đề xuất

### Q4-A — shared positions + monthly relations

Implement:

- Trực-derived identities;
- Nguyệt Kiến;
- Nguyệt Yếm;
- Địa Hỏa;
- Yếm Đối;
- Lục Nghi;
- Chiêu Diêu.

Không đưa Dụng sự semantics vào calculator.

### Q4-B — Bất Tương

Implement riêng:

- `BAT_TUONG`;
- table `chiThang -> Set<CanChi>`;
- oracle 12 × 60.

Tách PR vì bảng lớn, dễ review hơn.

## Q10 follow-up — ngày “mọi việc đều Kị”

Audit Q10 cho thấy các hội Âm/Dương cuối Q4 đã đi vào production semantics dù không phải `MaYeuTo` độc lập. Hán `WYG_010-48a..51a` liệt kê các ngày “諸事皆忌”; production khóa thành một canonical set tại `q4-hard-days.ts`.

Canonical hard-ban set hiện có 34 identity/vector:

- Đại Hội, Tiểu Hội;
- Tam Âm, Âm Vị;
- Âm Dương Giao Phá, Âm Dương Kích Xung;
- Dương Phá Âm Xung, Âm Đạo Xung Dương;
- bốn Âm Thác trùng Nguyệt Phá/Đại Hội bị nâng thành hard-ban;
- Tuyệt Âm tháng Tỵ ngày Mậu Thìn;
- Tuyệt Dương tháng Hợi ngày Mậu Tuất.

Ngoài ra `q4-yem-special-days.ts` khóa ba bảng source-data không-hard:

- Tuế Bạc / Trục Trận: theo chỗ Kị của Nguyệt Yếm;
- Âm Thác: non-hard theo chỗ Kị của Nguyệt Yếm;
- Dương Thác: non-hard theo chỗ Kị của Kiến;
- các ngoại lệ `不從德願所宜` / `不從德合所宜` được giữ thành `boNen`, không suy từ tên ngày.

Một civil day có thể mang nhiều danh xưng, nên test khóa **identity unique** chứ không giả định bộ ba tháng/ngày là unique.

Fix production sau audit:

- trước đó Di chuyển/Động thổ/Khai trương đã có phần lớn hard-day list bằng ba bản copy riêng;
- Xuất hành và An táng kế thừa một phần từ các matrix này;
- **Cưới hỏi bỏ sót toàn bộ lớp global hard-day**;
- cả ba bản copy cũ đều thiếu Tuyệt Âm/Tuyệt Dương.

Sau fix, cùng canonical hard-ban set được test áp cho đủ 21 vertical. Audit tiếp Nguyệt Yếm cho Cưới hỏi bổ sung đúng các nhánh Tuế Bạc/Trục Trận, Âm/Dương Thác, hard tháng Tý/Ngọ và cân bằng Đức thần. Hành Ngoan/Liễu Lệ/Cô Thần không bị tạo thành factor độc lập nếu Q10 không yêu cầu một outcome riêng.

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED
- [x] IMPLEMENTED cho scope production/Q10 hiện có
- [x] ORACLE_TESTED cho scope production/Q10 hiện có
