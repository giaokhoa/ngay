# Quyển 4 — inventory đầy đủ Nghĩa lệ 2

Status: COMPARED / INVENTORIED

## Mục tiêu

Khóa toàn bộ 29 section mục lục Quyển 4 và phân biệt:

- calendar/factor identity đã production;
- section “đồng vị khác tên” dùng chung primitive nhưng giữ semantics riêng;
- section Q4 không cần thành `MaYeuTo` vì Q10 dùng nó như **semantic input** để quyết định hard-ban / cân bằng / theo Kiến-Yếm;
- không tạo thêm factor chỉ để đủ số lượng mục.

Nguồn dùng song song:

- Việt T1, Quyển 4: PDF 302–391 / trang in 295–384, đã mở scan trực tiếp;
- Hán Kanripo `KR3g0051_004.txt`, revision pin, `WYG_004-3b..69b`;
- semantics áp dụng: Hán Q10 `WYG_010-47b..51b` + Việt Q10 p802–810.

## Inventory 29 section

|   # | Section Q4                                                       | Research      | Product              | Ghi chú                                                                                 |
| --: | ---------------------------------------------------------------- | ------------- | -------------------- | --------------------------------------------------------------------------------------- |
|   1 | Kiến Trừ 12 thần / 建除十二神                                    | ORACLE_TESTED | IMPLEMENTED          | primitive Thập Nhị Trực theo tháng tiết khí                                             |
|   2 | Kiến Trừ đồng vị dị danh / 建除同位異名                          | ORACLE_TESTED | IMPLEMENTED          | model “cùng vị trí ≠ cùng semantics”                                                    |
|   3 | Kiến / 建〈兵福 小時 土府〉                                      | ORACLE_TESTED | IMPLEMENTED          | Binh Phúc, Tiểu Thời, Thổ Phủ                                                           |
|   4 | Trừ / 除〈吉期 兵寶〉                                            | ORACLE_TESTED | IMPLEMENTED          | Cát Kỳ, Binh Bảo                                                                        |
|   5 | Mãn / 滿〈福德 天巫 天狗〉                                       | ORACLE_TESTED | IMPLEMENTED          | ba identity riêng                                                                       |
|   6 | Bình / 平〈天罡 河魁 死神〉                                      | ORACLE_TESTED | IMPLEMENTED          | Thiên Cương/Hà Khôi đổi theo âm-dương tháng                                             |
|   7 | Định / 定〈時陰 官符 死氣〉                                      | ORACLE_TESTED | IMPLEMENTED          | ba identity riêng                                                                       |
|   8 | Chấp / 執〈枝德 小耗〉                                           | ORACLE_TESTED | IMPLEMENTED          | Chi Đức, Tiểu Hao                                                                       |
|   9 | Phá / 破〈大耗〉                                                 | ORACLE_TESTED | IMPLEMENTED          | Đại Hao                                                                                 |
|  10 | Nguy / 危                                                        | ORACLE_TESTED | IMPLEMENTED          | không có alias heading riêng                                                            |
|  11 | Thành / 成〈天醫 天喜〉                                          | ORACLE_TESTED | IMPLEMENTED          | Thiên Y, Thiên Hỷ                                                                       |
|  12 | Thu / 收〈河魁 天罡〉                                            | ORACLE_TESTED | IMPLEMENTED          | đối vị Bình theo âm-dương tháng                                                         |
|  13 | Khai / 開〈時陽 生氣〉                                           | ORACLE_TESTED | IMPLEMENTED          | Thời Dương, Sinh Khí                                                                    |
|  14 | Bế / 閉〈血支〉                                                  | ORACLE_TESTED | IMPLEMENTED          | Huyết Chi                                                                               |
|  15 | 12 thần sở hợp tùng thần / 建除十二神所合叢辰                    | ORACLE_TESTED | META_IMPLEMENTED     | registry dùng chung vị trí, không factor mới                                            |
|  16 | Nguyệt Kiến / 月建                                               | ORACLE_TESTED | IMPLEMENTED          | cùng vị trí Trực Kiến, identity riêng                                                   |
|  17 | Nguyệt Yếm〈Địa Hỏa〉 / 月厭〈地火〉                             | ORACLE_TESTED | IMPLEMENTED          | factor + Q10 month-group/special-day semantics                                          |
|  18 | Yếm Đối〈Lục Nghi, Chiêu Diêu〉 / 厭對〈六儀 招搖〉              | ORACLE_TESTED | IMPLEMENTED          | cùng vị trí nhưng semantics riêng                                                       |
|  19 | Âm Dương Bất Tương / 陰陽不將                                    | ORACLE_TESTED | IMPLEMENTED          | bảng độc lập 12×60; tháng 6 Mậu Ngọ bị Trục Trận loại                                   |
|  20 | Âm Dương Đại Hội / 陰陽大會                                      | ORACLE_TESTED | SEMANTIC_IMPLEMENTED | 8 ngày hard-ban Q10; không cần `MaYeuTo` riêng                                          |
|  21 | Âm Dương Tiểu Hội / 陰陽小會                                     | ORACLE_TESTED | SEMANTIC_IMPLEMENTED | 8 ngày hard-ban Q10; bảng hiệu đính dùng Kỷ Mão/Kỷ Dậu đúng vị trí                      |
|  22 | Hành Ngoan – Liễu Lệ – Cô Thần / 行狠 了戾 孤辰                  | COMPARED      | SEMANTIC_INPUT       | Q10 dùng để giải thích nhóm Thìn/Tuất/Tỵ/Hợi của Nguyệt Yếm; không blanket-factor riêng |
|  23 | Đơn Âm – Thuần Âm – Cô Dương – Thuần Dương / 單陰 純陰 孤陽 純陽 | COMPARED      | SEMANTIC_INPUT       | phát sinh từ Tiểu Hội; Q10 refine theo Nguyệt Yếm, không tạo factor độc lập             |
|  24 | Tuế Bạc – Trục Trận / 歲薄 逐陣                                  | ORACLE_TESTED | SEMANTIC_IMPLEMENTED | canonical Q4 data; theo Kị của Nguyệt Yếm + ngoại lệ bỏ Nên Đức/Nguyện                  |
|  25 | Âm Dương Giao Phá – Kích Xung / 陰陽交破 陰陽擊衝                | ORACLE_TESTED | SEMANTIC_IMPLEMENTED | hard-day canonical Q10                                                                  |
|  26 | Dương Phá Âm Xung – Âm Đạo Xung Dương / 陽破陰衝 陰道衝陽        | ORACLE_TESTED | SEMANTIC_IMPLEMENTED | hard-day canonical Q10                                                                  |
|  27 | Âm Vị – Tam Âm / 陰位 三陰                                       | ORACLE_TESTED | SEMANTIC_IMPLEMENTED | hard-day canonical Q10; Tam Âm dùng bảng hiệu đính Tân Dậu/Ất Mão                       |
|  28 | Dương Thác – Âm Thác – Âm Dương Câu Thác / 陽錯 陰錯 陰陽俱錯    | ORACLE_TESTED | SEMANTIC_IMPLEMENTED | non-hard Dương theo Kiến, non-hard Âm theo Yếm; Câu Thác hard                           |
|  29 | Tuyệt Âm – Tuyệt Dương / 絕陰 絕陽                               | ORACLE_TESTED | SEMANTIC_IMPLEMENTED | Q10 chốt Tỵ/Mậu Thìn và Hợi/Mậu Tuất đều “mọi việc Kị”                                  |

## Quyết định quan trọng

### Không biến mọi tên Q4 thành factor độc lập

Q4 bản thân giải thích hệ Hành Ngoan→Tuyệt Dương là các phép phát sinh từ Âm Kiến / Dương Kiến. Bản Việt p383–384 nói đây là hệ ngày không cát, nhưng đồng thời phần hiệu đính xóa/sửa nhiều truyền lệ sai.

Q10 là lớp áp dụng cụ thể hơn và **phân nặng nhẹ từng tháng**:

- Đại/Tiểu Hội, các giao phá/xung, Tam Âm, Âm Vị, Câu Thác, Tuyệt Âm/Tuyệt Dương → hard-ban;
- Tuế Bạc/Trục Trận → theo Nguyệt Yếm;
- Dương Thác non-hard → theo Kiến;
- Âm Thác non-hard → theo Nguyệt Yếm;
- Hành Ngoan/Liễu Lệ/Cô Thần được dùng làm lý do cho nhóm tháng Thìn/Tuất/Tỵ/Hợi, nơi gặp đúng Đức thần thì cát hung cân bằng.

Vì vậy product encode **outcome Q10**, không nhân đôi thành 20 thần sát rồi double-count.

### Canonical source-data

- `q4-hard-days.ts`: 34 identity/vector hard-ban Q4/Q10.
- `q4-yem-special-days.ts`: Tuế Bạc/Trục Trận, Dương Thác, Âm Thác và `boNen` exceptions.
- `cuoi-hoi-q4-conflict-rules.ts`: phần Q10 Nguyệt Yếm/Q4 còn thiếu riêng cho 嫁娶.
- `q4-shared-position-definitions.ts`: shared positions 12 Trực + Nguyệt Kiến/Yếm/Yếm Đối.
- `bat-tuong-definition.ts`: bảng Bất Tương 12 tháng.

## Bug production tìm được trong audit

1. Cưới hỏi từng bỏ sót toàn bộ Q4 global hard-day layer.
2. Ba matrix copy cũ bỏ sót Tuyệt Âm/Tuyệt Dương.
3. Cưới hỏi từng thiếu Nguyệt Yếm Tý/Ngọ hard-ban, nhánh cân bằng Thìn/Tuất/Tỵ/Hợi, Tuế Bạc/Trục Trận và Âm/Dương Thác.
4. Ba bảng special-day copy đã được thay bằng một source-data canonical để tránh drift.

## Kết luận

**Quyển 4 đã inventory đủ 29/29 section mục lục.** Production/Q10 scope đã có oracle cho các factor và semantic outcome đang dùng. Không còn section Q4 chưa locate hoặc chưa rõ vì sao không có `MaYeuTo` riêng.
