# Nhập học / 入學 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 activity contract

Nguồn đã đối chiếu trực tiếp:

- exact Việt Tập I p.848, mục **Nhập học** (working scan PDF page 855);
- Hán `KR3g0051_011.txt`, `WYG_011-10b..11a`, mục `入學`.

Hai bản đồng thuận hoàn toàn:

- **Nên:** ngày Thành (`成日`), ngày Khai (`開日`).
- **Kị:** không (`忌無` / “Vô kị”).

Q10 `WYG_010-20b..21b` cũng giải thích trực tiếp Thành là “hợp cục chi chung”, Khai là “sinh khí chi thủy”, nên `入學` lấy nghĩa “nguyên thủy yếu chung”.

## “Vô kị” và hard-ban Q10

`忌無` là baseline của activity, không có nghĩa miễn các tổ hợp Q10 ghi **`諸事皆忌`** / mọi việc đều kị.

Q10 nhiều lần xác nhận `入學` nằm trong nhóm **`止不忌`** của các Kị thường, gồm Nguyệt Phá (`WYG_010-29b`), Bình nhật (`31b`), Thu nhật (`35a`), Kiếp Sát (`39a`), Nguyệt Yếm (`47b`), Tứ Phế (`58a`). Vì vậy production **không clone Kị thường** của cưới hỏi/di chuyển sang Nhập học.

Ngược lại, production vẫn giữ các nhánh universal hard-ban mà nguồn nói thẳng `諸事皆忌` và hiện engine có đủ input:

- Nguyệt Phá ở các nhánh chồng Tai Sát / Nguyệt Hình / Nguyệt Yếm theo `WYG_010-29b..30a`;
- Nguyệt Sát ở nhánh hạ hung không Đức/Hợp, `WYG_010-42a..43a`;
- Nguyệt Hình ở nhánh hạ hung không Đức/Hợp, `WYG_010-44b..45a`;
- Nguyệt Yếm Tý/Ngọ, Mão/Dậu và 34 ngày hội/xung/âm-dương đặc biệt, `WYG_010-48a..51a`;
- Tứ Phế gặp Nguyệt Phá, `WYG_010-58a..58b`.

Các mục Q10 khác cần input chưa có trong production (ví dụ 無祿日, 上朔/四離/四絶/晦日 theo contract riêng) không được giả lập ở vertical này.

## Q7

Hoàng/Hắc đạo Q7 không bổ sung blanket blocker cho `入學`: danh sách Hắc đạo kị ở Q7 không nêu Nhập học. Q7 vẫn hiển thị như lớp bổ trợ.

## Product mapping

- activity code: `NHAP_HOC`;
- route dự kiến: `/nhap-hoc`;
- direct API dự kiến: `/date-selection/nhap-hoc`;
- baseline chỉ có Trực Thành/Khai là Nên; không có Q11 Kị;
- Q10 evaluator phải có path riêng để không rơi vào default Cưới hỏi semantics.

## Oracle/tests cần khóa

- Q11 independent fixture: `TRUC:THANH`, `TRUC:KHAI`, zero Kị;
- ordinary Nguyệt Phá/Bình/Thu/Kiếp Sát không tự sinh Kị Nhập học;
- universal hard-ban vẫn `camMoiViec`;
- Q7 Hắc đạo không tự thêm Kị Nhập học;
- source trace không lộ mã nghiên cứu ra text UI.
