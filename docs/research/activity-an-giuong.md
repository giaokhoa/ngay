# An giường / 安牀 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 exact activity contract

Double-entry đã mở trực tiếp:

- Việt Tập I p.852, mục **Kê giường**.
- Hán `KR3g0051_011.txt`, `WYG_011-15a`, mục `安牀`.

Hai bản khớp exact:

- **Nên:** ngày/trực Nguy (`危日`).
- **Kị:** Nguyệt Phá; Bình nhật; Thu nhật; Bế nhật; Kiếp Sát; Tai Sát; Nguyệt Sát; Nguyệt Hình; Nguyệt Yếm; Đại Thời; Thiên Lại; Tứ Phế; Ngũ Mộ; ngày Thân.

`申日` là **Chi ngày Thân**, không phải một factor thần sát mới.

## Q10 conflict semantics

An giường không được xử lý như một danh sách Kị phẳng. Q10 có phép chế hóa/cân bằng theo tháng và cát thần.

Hai source lock quan trọng:

1. Hán `WYG_010-75b` và Việt p.836 nói khi cát/hung tương để **Di chuyển** không còn chú Kị thì **An giường** cũng không chú Kị, và ngược lại; nếu thuộc loại “gặp Đức vẫn Kị” thì vẫn phải ghi Kị. Vì vậy resolver An giường tái dùng phần Q10 core đã source-lock của Di chuyển thay vì tạo một matrix độc lập trùng lặp.
2. Không được suy thành hai việc hoàn toàn đồng nhất. Ở **Nguyệt Yếm**, Hán `WYG_010-47b..48a` và Việt p.807 ghi tháng Dần/Thân gặp Thành, Sửu/Mùi gặp Khai, lại gặp Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp thì residual Kị vẫn liệt kê `般移` nhưng **không liệt kê `安牀`**. Production vì vậy giữ Di chuyển Kị nhưng bỏ Kị An giường ở nhánh này.

Ngoài ra `歸忌` và `往亡` là Kị của Di chuyển trong Q11 nhưng không nằm trong exact Q11 `安牀`; resolver An giường không được kế thừa hai target này.

## Product mapping

- activity code: `AN_GIUONG`;
- route: `/an-giuong`;
- một người chủ sự, dùng cùng sinh-niên personalization contract của các việc dân dụng khác;
- Hoàng/Hắc đạo Q7 **không** bổ sung blanket blocker cho An giường vì source Q7 chỉ nêu năm nhóm việc khác;
- Q11 rule set: 1 Nên + 14 Kị;
- Q10 semantics: clone có kiểm soát từ core Di chuyển, bỏ Quy Kị/Vãng Vong và override residual Nguyệt Yếm nói trên.

## Oracle/tests

- `an-giuong-rules.spec.ts`: exact Q11 target set và Việt/Hán provenance.
- `an-giuong-conflict.spec.ts`: Q10 target exclusions, Nguyệt Yếm residual difference, Nguyệt Phá “gặp Đức vẫn Kị”, provenance.
- `han-q11-oracle.spec.ts`: independent Hán expected set từ `WYG_011-15a`.
- `han-q10-semantic-oracle.spec.ts`: independent cross-activity vector chứng minh Dần + Nguyệt Yếm + Nguyệt Đức: Di chuyển Kị, An giường không Kị.
