# Quan đới / 冠帶 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 activity contract

Nguồn đã mở trực tiếp:

- exact Việt Tập I p.848, mục **Lễ đội mũ, đeo thắt lưng**;
- Hán `KR3g0051_011.txt`, `WYG_011-11a`, mục `冠帶`.

Hán Q11:

- **Nên:** Định nhật / Trực Định (`定日`).
- **Kị:** Nguyệt Phá; Bình nhật; Thu nhật; Kiếp Sát; Tai Sát; Nguyệt Sát; Nguyệt Hình; Nguyệt Yếm; Đại Thời; Thiên Lại; Tứ Phế; Ngũ Mộ; ngày Sửu.

Exact Việt p.848 có cùng danh sách nhưng **in thêm ngày Bế**.

## Discrepancy Bế nhật

Không normalize ngầm bản Việt.

Đã kiểm thêm hai lớp nguồn liên quan:

- Hán Q10 `WYG_010-37b..38a`, mục `閉日`, không liệt kê `冠帶` trong Kị;
- exact Việt Q10 p.797, mục **Ngày Bế - Huyết Chi**, cũng không liệt kê “lễ đội mũ, đeo thắt lưng”.

Vì Hán Q11 + Hán Q10 + Việt Q10 đồng thuận, production **không dùng Bế nhật làm blocker Quan đới**. Exact Việt Q11 p.848 được giữ như discrepancy `Q11_QUAN_DAI_VIET_THEM_BE_NHAT`, có regression phân biệt.

## Q10 conflict semantics

Q10 `WYG_010-75a` nói khi cát/hung tương để không chú Kị cho hôn nhân thì `冠帶` cũng không chú Kị; nếu thuộc loại “gặp Đức vẫn Kị” thì vẫn ghi Kị. Các target chung với Di chuyển vì vậy tái dùng Q10 core đã source-lock, nhưng chỉ trong phạm vi target thật sự thuộc Quan đới.

Adapter production:

- giữ Nguyệt Phá, Bình, Thu, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Đại Thời, Thiên Lại, Tứ Phế, Ngũ Mộ và global hard-day semantics;
- bỏ `Bế`, `Quy Kị`, `Vãng Vong` vì không thuộc source-resolved Quan đới;
- Nguyệt Yếm tháng Dần/Thân/Sửu/Mùi + cát: exact Việt p.807 và Hán `WYG_010-47b..48a` residual list **không còn Quan đới**, nên `BO_KY` (khác Di chuyển vẫn Kị);
- Ngũ Mộ tháng Ngọ/Tý + Nguyệt Đức: Việt p.819 / Hán `WYG_010-60b..61a` bỏ Kị;
- Nguyệt Phá + Đức/Hợp vẫn Kị;
- Tứ Phế + Đức/Hợp vẫn Kị; hard-all branches vẫn hard-all.

## Ngày Sửu

Q11 có `丑日` trong Kị. Q10 Bách Kị `WYG_010-72a` cũng ghi `丑日忌冠帶`. Production dùng typed condition `CHI_NGAY:SUU`, không tạo một thần sát giả.

## Product mapping

- activity code: `QUAN_DAI`;
- route: `/quan-dai`;
- direct API: `/date-selection/quan-dai`;
- một người chủ sự, dùng sinh-niên personalization contract hiện tại;
- Q7 Hoàng/Hắc đạo không bổ sung blanket blocker vì source Q7 không liệt kê Quan đới trong nhóm Hắc đạo kị.

## Oracle/tests

- `quan-dai-rules.spec.ts`: Hán Q11 1 Nên/13 Kị, Việt-only Bế discrepancy, typed ngày Sửu, provenance.
- `quan-dai-conflict.spec.ts`: target filter, Nguyệt Yếm relief, Nguyệt Phá still-Kị, Ngũ Mộ relief, Bế negative, Sửu positive, no internal code leak.
- `han-q11-oracle.spec.ts`: expected independent Hán `冠帶` fixture.
- `han-q10-semantic-oracle.spec.ts`: cross-activity residual test: Dần + Nguyệt Yếm + Nguyệt Đức giữ Di chuyển Kị nhưng bỏ Kị An giường và Quan đới.
