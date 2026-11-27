# ADR 0008: Q10 conflict resolver is data-driven and source-exact

Status: Accepted

## Bối cảnh

Quyển 10 không chỉ sửa trạng thái của một factor đã có.

Một số nhánh đặc biệt của Nguyệt Yếm có thể:

- tự sinh Kị cho một công việc dù ngày đó không emit factor `NGUYET_YEM`;
- bỏ một Nên cụ thể;
- delegate sang rule khác;
- cấm mọi việc;
- cân bằng một cặp Nên/Kị.

Nếu mỗi activity tự viết chuỗi `if`, các cụm nguồn ngắn như Đức, Hợp,
Xá, Nguyện rất dễ bị mở rộng sai.

## Quyết định

Dùng một generic Q10 resolver với rule data:

- target hoặc global rule;
- condition;
- operation;
- explicit precedence;
- provenance Việt + Hán;
- cycle guard cho delegation;
- fail loud khi hai outcome khác nhau cùng precedence.

Các operation hiện có gồm:

- `GIU_KY`;
- `BO_KY`;
- `CAN_BANG`;
- `CAM_MOI_VIEC`;
- `CHI_CON_QUAN_Y`;
- `DELEGATE`;
- `GIU_KY_DU_CO_CAT`;
- `THEM_KY`;
- `BO_NEN`.

## Source-exact group semantics

Không tự suy một cụm cát thần rộng hơn chữ nguồn.

Q10 trang in 808 của bản Việt canonical do người dùng cung cấp ghi:

- Tuế bạc tháng Tư Bính Ngọ và Trục trận tháng Sáu Mậu Ngọ
  “không theo chỗ nên làm của Đức, Nguyện”.
- Dương thác tháng Sáu Kỷ Mùi
  “không theo chỗ nên làm của Đức hợp”.
- Âm thác tháng Sáu Kỷ Tỵ thuộc Đại hội, mọi việc đều Kị; câu sau còn
  nhắc không theo chỗ Nên của Đức hợp.

Hán bản Quyển 10 đối chiếu:

- `四月丙午六月戊午亦不從德願所宜`;
- `六月己未亦不從德合所宜`;
- `六月己巳亦不從德合所宜`.

Representation cho vertical DI_CHUYEN:

- `德願` = Đức + Nguyện:
  - Thiên Đức;
  - Nguyệt Đức;
  - Thiên Nguyện.
    Không tự thêm Thiên Đức Hợp / Nguyệt Đức Hợp.
- `德合` = nhóm Đức + Hợp:
  - Thiên Đức;
  - Nguyệt Đức;
  - Thiên Đức Hợp;
  - Nguyệt Đức Hợp.
    Không tự thêm Thiên Nguyện.

Nếu một hard-ban “mọi việc đều Kị” đồng thời match, hard-ban thắng và loại
mọi contribution Nên; không cần tạo một outcome thứ hai chỉ để biểu diễn
việc loại riêng nhóm Đức/Hợp.

## Provenance policy

- Bản Việt canonical upload là nguồn chính cho wording/thuật ngữ.
- Hán bản là lớp đối chiếu.
- Khi hai bản khác chữ, provenance phải giữ khác biệt thay vì normalize
  âm thầm.
- Web transcription không thay thế exact uploaded Vietnamese scan.

## Hệ quả

- Activity sau tái dùng resolver contract thay vì fork logic.
- Regression test phải có cả positive và negative group guards, ví dụ
  `德願` không được loại factor Hợp.
- Mọi special-day global rule phải có source page và trace.
