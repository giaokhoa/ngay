# Chúc mừng ban thưởng / 慶賜賞賀 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 activity contract

Nguồn đã đối chiếu trực tiếp:

- exact Việt Tập I p.848 (working scan PDF page 855), mục **Chúc mừng ban thưởng**;
- Hán `KR3g0051_011.txt`, `WYG_011-10a..10b`, mục `慶賜賞賀`.

Hai bản khớp từng mục.

### Nên — 15 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Ân, Thiên Xá, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Vương Nhật, Tam Hợp, Phúc Đức, Thiên Hỷ, Khai nhật.

### Kị — 12 mục

Nguyệt Phá, Bình nhật, Thu nhật, Bế nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Tứ Phế, Ngũ Ly.

Q11 **không** ghi ngày Dậu là Kị cho `慶賜賞賀`.

## Quan hệ với Yến hội

Q10 phần Nguyệt Hại nói thẳng:

> `慶賜賞賀則宴會之類也`

Do đó production tái dùng Q10 conflict semantics của `宴會〈會親友同〉` cho các target chung, gồm Nguyệt Phá, Bình/Thu/Bế, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Tứ Phế và Ngũ Ly. Không thêm các target không có trong Q11.

Ngũ Ly dùng cùng rule Q10 `WYG_010-65b`: gặp Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Tam Hợp hoặc Lục Hợp thì bỏ Kị.

Nguyệt Yếm ở Dần/Thân/Sửu/Mùi gặp cát cũng bỏ Kị vì residual list `WYG_010-47b..48a` không còn `慶賜賞賀`.

## Ngày Dậu: bỏ Nên, không biến thành Kị

Hán Q10 `WYG_010-74b` ghi:

> `凡酉日忌宴會亦不註宜慶賜賞賀`

Exact Việt Q10 p.835 (working scan PDF page 842) ghi:

> “Phàm ngày Dậu kị yến tiệc, cũng không chú nên chúc mừng ban thưởng, thưởng người có công.”

Vì vậy production encode một **global `BO_NEN`** ở ngày Dậu:

- bỏ toàn bộ contribution Nên của Chúc mừng ban thưởng;
- không tạo Kị mới;
- nếu cùng ngày có Ngũ Ly nhưng Ngũ Ly được cát thần giải, kết quả có thể là **không Nên, không Kị**.

Đây khác Yến hội: Yến hội có `酉日` là Kị Q11 độc lập.

Resolver Q10 được khóa semantics rõ:

- global `BO_NEN` có `boNen` => chỉ bỏ các Nên được liệt kê;
- global `BO_NEN` không có `boNen` => bỏ toàn bộ Nên của activity.

Hai nhánh đều có regression để không làm đổi các Dương Thác rule cũ.

## Q7

Hoàng/Hắc đạo Q7 không blanket-block `慶賜賞賀`, vì danh sách năm nhóm việc Hắc đạo kị không nêu việc này.

## Product mapping

- activity code: `KHANH_THUONG`;
- route: `/khanh-thuong`;
- direct API: `/date-selection/khanh-thuong`;
- consumer title: **Chúc mừng ban thưởng**;
- source label: `慶賜賞賀`;
- một người chủ sự theo personalization contract hiện tại.

## Oracle/tests

- `khanh-thuong-rules.spec.ts`: exact 15 Nên / 12 Kị + Việt/Hán provenance.
- `khanh-thuong-conflict.spec.ts`: Ngũ Ly relief, Dậu bỏ toàn Nên nhưng không Kị, Nguyệt Hại, Nguyệt Yếm, Nguyệt Phá/Tứ Phế.
- `q10-rule-resolver.spec.ts`: global `BO_NEN` toàn cục vs selective.
- `han-q11-oracle.spec.ts`: independent exact `慶賜賞賀` fixture.
- `han-q10-semantic-oracle.spec.ts`: independent Dậu `不註宜` behavior.
