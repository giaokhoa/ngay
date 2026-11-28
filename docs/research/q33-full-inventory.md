# Quyển 33 — Lợi dụng 1 full inventory

Status: HAN_INVENTORIED / VIET_EXACT_VERIFIED / ORACLE_PARTIAL

## Nguồn và denominator

- Hán: Kanripo `KR3g0051_032.txt`, revision pin, 卷三十三 `利用一`.
- Hán TOC có **15 heading chính**.
- Exact Việt Tập II Q33 bắt đầu p687 và có **14 mục**.
- Mục 13 p748 in “Luận dùng bàn kế, La kinh đồ”, xác nhận trực tiếp việc gộp `論用盤針` + `羅經圖` của 15 heading Hán.

## Inventory 14 mục Việt / 15 heading Hán

|   # | Mục                             | Product                      | Lý do                                                                                        |
| --: | ------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
|   1 | 選擇要論 / Tuyển trạch yếu luận | REFERENCE_SEMANTIC           | nguyên tắc chọn dùng, source-review; không standalone calculator                             |
|   2 | 楊筠松造命歌                    | REFERENCE                    | ca quyết cần diễn giải cùng prose, không parse thành rule máy trực tiếp                      |
|   3 | 疑龍經                          | REFERENCE_SPATIAL            | long/sơn/phương; ngoài date-only domain                                                      |
|   4 | 論造葬                          | REFERENCE_ACTIVITY_SPATIAL   | liên quan tạo/táng nhưng không thay Q10/Q11 activity contract                                |
|   5 | 論正五行生旺取用                | BLOCKED_SPATIAL_FIVE_ELEMENT | dùng sinh-vượng gắn long/sơn/hướng                                                           |
|   6 | 論補龍                          | BLOCKED_SPATIAL              | cần long/sơn target                                                                          |
|   7 | 論扶山                          | BLOCKED_SPATIAL              | cần sơn target                                                                               |
|   8 | 論立向                          | BLOCKED_SPATIAL              | cần hướng target                                                                             |
|   9 | 論相主                          | ORACLE_TESTED_PARTIAL        | production dùng **sinh niên**, không dựng Bát tự từ sinh nhật/giờ sinh; tránh xung/khắc mệnh |
|  10 | 論開山立向與修山修向不同        | BLOCKED_SPATIAL              | phân loại thao tác theo sơn/hướng                                                            |
|  11 | 論修方                          | BLOCKED_SPATIAL              | cần phương tu sửa                                                                            |
|  12 | 論修方兼山向及中宫              | BLOCKED_SPATIAL              | cần phương + sơn/hướng + trung cung                                                          |
|  13 | 論用盤針 + 羅經圖               | BLOCKED_COMPASS              | Hán tách 2 heading; exact Việt p748 gộp 1 mục                                                |
|  14 | 定方隅法                        | BLOCKED_SPATIAL_COMPASS      | phép định phương góc, không biểu diễn trong current contracts                                |

## Scope production đã khóa

`論相主` là phần Q33 đang được consume rõ nhất:

- source nói luận **sinh niên**, không luận sinh nhật;
- sửa/tu tạo lấy chủ nhà, an táng lấy sinh niên người mất;
- năm/tháng/ngày/giờ của thời điểm chọn không nên xung/khắc mệnh;
- mức nặng giảm dần năm → tháng → ngày → giờ.

Repo đã encode/test phần này ở `personal-year.ts` / `personal-year.spec.ts` và drill-down activity.

## Kết luận

**Q33 đã exact Việt/Hán structural-double-entry đủ 14 mục Việt = 15 heading Hán.** Oracle production vẫn partial, chủ yếu `相主`; phần lớn quyển là spatial/compass doctrine và giữ blocked thay vì bị ép thành day factor.
