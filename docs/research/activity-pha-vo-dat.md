# Phá, vỡ đất / 破土 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.862, mục **Phá, vỡ đất**;
- Hán Q11 `WYG_011-25b`, mục `破土`.

Hai bản khớp trực tiếp **2 Nên / 18 Kị**.

### Nên — 2

- Ô Phệ / `鳴吠`;
- Ô Phệ Đối / `鳴吠對`.

### Kị — 18

Nguyệt Kiến, Thổ Phủ, Nguyệt Phá, Bình nhật, Thu nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Tứ Phế, Ngũ Mộ, Thổ Phù, Địa Nang, Phục Nhật, Trọng Nhật, sau Thổ Vượng dụng sự.

`破土` là activity riêng, không gộp với `安葬` hay `啓攢` dù ba mục đứng liền nhau ở p.862.

## Q5 — Ô Phệ và Ô Phệ Đối

### Ô Phệ / 鳴吠

Production giữ final Lập thành 13 ngày đã source-lock cho An táng:

- Giáp/Bính/Canh/Nhâm Ngọ;
- Giáp/Bính/Canh/Nhâm Thân;
- Ất/Đinh/Kỷ/Tân/Quý Dậu.

### Ô Phệ Đối / 鳴吠對

`破土` mở dependency production mới `O_PHE_DOI`. Không suy runtime bằng “đối xung” từ Ô Phệ; dùng exact Lập thành Q5 `WYG_005-68a..69a`:

- Bính/Canh/Nhâm Tý;
- Giáp/Bính/Canh/Nhâm Dần;
- Ất/Đinh/Tân/Quý Mão.

Tổng **11 ngày**. Lập thành loại Giáp Tý vì thuần dương và sửa sai truyền cũ từng đưa Giáp Ngọ vào 鳴吠對.

## Q10 semantics

### Nhóm đất dùng full monthly matrix

Các target chung với công việc đất tái dùng source-resolved earthwork Q10 matrix: Nguyệt Kiến, Thổ Phủ, Nguyệt Phá, Bình/Thu, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Tứ Phế, Ngũ Mộ, Thổ Phù, Địa Nang và Thổ Vượng. Targetless hard-day rules cũng được giữ.

Nguyệt Hại không thuộc earthwork baseline cũ nên lấy exact Q10 branch đã source-lock ở Khai trương.

Mọi nhánh `CAN_BANG` loại cả Nên Ô Phệ và Ô Phệ Đối để phản ánh nguyên tắc Q10: khi cát/hung cân bằng thì việc Kị không chú Nên và việc Nên cũng không chú Kị.

### Nguyệt Kiến / Thổ Phủ

Q10 `月建(土府)` vẫn giữ `破土` trong residual Kị sau các cát thần được nêu. Vì vậy Nguyệt Kiến/Thổ Phủ không được tự giải chỉ vì gặp Đức/Xá.

### Ngũ Mộ

Q10 `WYG_010-60b..61a` liệt kê `破土` trong Kị Ngũ Mộ; riêng tháng Ngọ/Tý gặp Nguyệt Đức thì bỏ Kị.

### Thổ Phù / Địa Nang

Q10 `WYG_010-62a..62b` liệt kê `破土` và ghi `與德合赦願併猶忌`. Hai factor vẫn Kị dù gặp Đức/Hợp, Thiên Xá hoặc Thiên Nguyện.

### Phục Nhật / Trọng Nhật

Q10 `WYG_010-64a..65a`:

`復日 重日 忌破土安葬啟攢`.

Gặp Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá hoặc Lục Hợp thì bỏ Kị, nhưng `亦不註宜`. Thiên Nguyện được tính cùng nhóm Lục Hợp theo chú giải source.

Khi Phục/Trọng vẫn Kị, production đồng thời loại contribution Nên Ô Phệ/Ô Phệ Đối để final không vừa Nên vừa Kị chỉ vì Q11 Minh Phệ.

### Nguyệt Kị nhật

Q10 `WYG_010-71a..71b` không liệt kê `破土` trong nhóm `止註`; production chỉ bỏ Nên, không tự tạo Kị.

## Shared calendar annotations Q10

`破土` không thuộc nhóm được miễn của các phụ chú chung:

- Vô Lộc: bỏ Nên, không tự tạo Kị;
- Hối nhật: bỏ Nên;
- Thượng Sóc / Tứ Ly / Tứ Tuyệt: Kị bổ sung.

## Q7

Hoàng/Hắc đạo là lớp supplementary. `破土` không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- activity code: `PHA_VO_DAT`;
- title: **Phá, vỡ đất**;
- source label: `破土`;
- route: `/pha-vo-dat`;
- API: `/date-selection/pha-vo-dat`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `an-tang-factors.spec.ts`: full 60-cycle oracle cho `O_PHE_DOI`, đúng 11 ngày;
- `pha-vo-dat-rules.spec.ts`: exact 2 Nên / 18 Kị + provenance;
- `pha-vo-dat-conflict.spec.ts`: Nguyệt Kiến/Thổ Phủ, Ngũ Mộ relief, Thổ Phù/Địa Nang, Phục/Trọng, Nguyệt Kị, cân bằng và Thổ Vượng;
- `han-q11-oracle.spec.ts`: independent fixture `破土`;
- `han-q10-semantic-oracle.spec.ts`: independent source semantics cho residual earthwork + Phục/Trọng.
