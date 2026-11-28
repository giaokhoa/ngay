# Cải táng (Khai toản) / 啓攢 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.862, mục **Cải táng (Khai toản)**;
- Hán Q11 `WYG_011-26a`, mục `啓攢`.

Hai bản khớp trực tiếp **1 Nên / 14 Kị**.

### Nên — 1

- Ô Phệ Đối / `鳴吠對`.

### Kị — 14

Nguyệt Kiến, Nguyệt Phá, Bình nhật, Thu nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Tứ Phế, Ngũ Mộ, Phục Nhật, Trọng Nhật.

Không gộp `啓攢` với `安葬` hoặc `破土`; ba mục đứng liền nhau ở p.862 nhưng Nên/Kị khác nhau.

## Q5 — Ô Phệ Đối / 鳴吠對

Tái dùng exact production identity `O_PHE_DOI` đã source-lock từ Q5 `WYG_005-68a..69a`, final Lập thành 11 ngày. Không suy runtime từ Ô Phệ bằng đối xung.

## Q10 semantics

### Khung chung với An táng

Resolver tái dùng source-resolved Q10 của `AN_TANG` theo đúng 14 target Q11:

- Nguyệt Kiến;
- Nguyệt Phá;
- Bình/Thu;
- Kiếp/Tai/Nguyệt Sát;
- Nguyệt Hình/Hại/Yếm;
- Tứ Phế;
- Ngũ Mộ;
- Phục/Trọng.

Tứ Kị/Tứ Cùng là Kị riêng của An táng, không được kéo sang Khai toản.

Mọi nhánh `CAN_BANG` loại contribution Nên Ô Phệ Đối, đúng nguyên tắc Q10 `凡所忌者則不註宜所宜者亦不註忌`.

### Nguyệt Kiến

Q10 `月建(土府)` có `啟攢` trong danh sách Kị ban đầu, nhưng sau khi gặp nhóm cát source nêu thì residual Kị chỉ còn các việc Thổ Phủ chuyên Kị; `啟攢` không nằm trong residual đó. Vì vậy Nguyệt Kiến có thể được cát giải cho activity này, giống An táng.

### Ngũ Mộ

Q10 `WYG_010-60b..61a` liệt kê `啟攢` trong Kị Ngũ Mộ; riêng tháng Ngọ/Tý gặp Nguyệt Đức thì bỏ Kị.

### Phục Nhật / Trọng Nhật

Q10 `WYG_010-64a..65a`:

`復日 重日 忌破土安葬啟攢`.

Gặp Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá hoặc Lục Hợp thì bỏ Kị, nhưng source ghi rõ `亦不註宜`.

Production vì vậy:

- khi Phục/Trọng còn Kị và đồng hiện Ô Phệ Đối: Kị giữ, Nên Ô Phệ Đối bị loại;
- khi Phục/Trọng gặp cát giải: Kị được bỏ **nhưng Nên Ô Phệ Đối vẫn bị loại**.

Đây là khác biệt cần khóa riêng, không chỉ clone outcome `BO_KY` từ An táng.

### Nguyệt Kị nhật

Q10 `WYG_010-71a..71b` không liệt kê `啟攢` trong nhóm `止註`; production chỉ bỏ Nên, không tự tạo Kị.

### Quy tắc An táng ↔ Khai toản

Q10 `WYG_010-76b`:

`凡吉凶相抵有宜安葬不註忌啟攢有宜啟攢不註忌安葬`.

Đây là quy tắc trong ngữ cảnh **吉凶相抵**. Production biểu diễn bằng các nhánh `CAN_BANG`, không biến thành blanket “có Nên An táng thì mọi Kị Khai toản đều mất”.

### Khai nhật

Q10 cũng ghi `凡開日不註宜破土安葬啟攢亦不註忌遇忌則註`: Khai nhật tự nó không tạo baseline Nên/Kị cho Khai toản; nếu gặp Kị khác thì vẫn chú Kị. Vì Q11 không có Khai nhật, production không tạo rule giả.

## Shared calendar annotations Q10

`啟攢` không thuộc nhóm được miễn của các phụ chú chung:

- Vô Lộc: bỏ Nên;
- Hối nhật: bỏ Nên;
- Thượng Sóc / Tứ Ly / Tứ Tuyệt: Kị bổ sung.

## Q7

Hoàng/Hắc đạo supplementary; `啟攢` không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- activity code: `CAI_TANG_KHAI_TOAN`;
- title: **Cải táng (Khai toản)**;
- source label: `啓攢`;
- route: `/cai-tang-khai-toan`;
- API: `/date-selection/cai-tang-khai-toan`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `cai-tang-khai-toan-rules.spec.ts`: exact 1 Nên / 14 Kị + negative Tứ Kị/Tứ Cùng;
- `cai-tang-khai-toan-conflict.spec.ts`: Ô Phệ Đối, Nguyệt Kiến relief, Ngũ Mộ relief, CAN_BANG, Phục/Trọng giữ Kị + cát giải nhưng vẫn bỏ Nên, Nguyệt Kị và hard-day;
- `han-q11-oracle.spec.ts`: independent fixture `啓攢`;
- `han-q10-semantic-oracle.spec.ts`: independent Nguyệt Kiến + Phục/Trọng semantics.
