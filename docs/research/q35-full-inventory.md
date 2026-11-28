# Quyển 35 — Phụ lục inventory

Status: HAN_INVENTORIED / VIET_EXACT_VERIFIED_WITH_DISCREPANCY / NOT_IMPLEMENTED

## Vai trò nguồn

Hán Q35 tự nói đây là **附錄**: những phép tục truyền còn dùng, tài liệu cũ từng chép, hoặc phương pháp hỗ trợ như Nhâm/Độn được đưa vào để tham khảo; không đồng cấp với chính biên. Vì vậy “có trong Q35” không tự động nghĩa là phải trở thành production factor.

Exact canonical Tập II đã được mở trực tiếp. Q35 bắt đầu p828, có 13 mục Việt và kết thúc sau “Cát tướng gia thêm vào giờ” trước Q36 p892.

## Hán inventory 16/16 heading

|   # | Hán heading  | Product policy                                                      |
| --: | ------------ | ------------------------------------------------------------------- |
|   1 | 推測時刻     | REFERENCE_ASTRONOMY; bảng thời khắc, không universal location table |
|   2 | 男女九宫     | OUT_OF_SCOPE / PERSONAL-SPATIAL                                     |
|   3 | 逐日人神所在 | OUT_OF_SCOPE                                                        |
|   4 | 太白逐日遊方 | BLOCKED_SPATIAL                                                     |
|   5 | 長星短星     | CORROBORATES_Q9_PRODUCTION                                          |
|   6 | 百忌日       | REFERENCE_ONLY pending exact activity semantics                     |
|   7 | 祀竈日       | OUT_OF_SCOPE_VERTICAL                                               |
|   8 | 洗頭日       | OUT_OF_SCOPE_VERTICAL                                               |
|   9 | 嫁娶周堂     | OUT_OF_SCOPE current wedding contract; appendix status matters      |
|  10 | 五姓修宅     | BLOCKED_PERSONAL_SPATIAL                                            |
|  11 | 事類總集     | META / reference catalog                                            |
|  12 | 雜用宜忌     | META / miscellaneous reference                                      |
|  13 | 年月神煞     | REFERENCE_SPATIAL                                                   |
|  14 | 天星吉時     | BLOCKED_ADVANCED_TIME                                               |
|  15 | 吉將加時     | BLOCKED_ADVANCED_TIME                                               |
|  16 | 竒門三元     | OUT_OF_SCOPE_SYSTEM; separate Qimen domain                          |

## Exact Việt/Hán mapping

Exact Việt có **13 mục đánh số**:

- mục 6 gộp `百忌日 / 祀竈日 / 洗頭日`, tương ứng 3 heading Hán;
- các mục 7–13 tiếp tục tới `吉將加時`;
- Hán còn section dài `竒門三元` ở `WYG_034-52a..62b`; exact Việt **không có section này** và chuyển thẳng sang Q36.

Đây là discrepancy canonical `Q35_QIMEN_SANYUAN_OMITTED`, không còn là TOC pending.

## Chính sách 長星 / 短星

`長星短星` đã được productionize từ **Q9 Lập thành** (`WYG_009-33b`) và cross-check 12 Nguyệt biểu Q19–30. Q35 chỉ corroborate truyền bảng: chính phần phụ lục này ghi một số phép giải nghĩa suy ra kết quả khác bảng (`未知孰是`) và kết luận phép đã tương truyền lâu nhưng nghĩa không rõ. Vì vậy production **không sửa bảng Q9 theo phép suy Q35**.

Bản Việt Tập II của mục Q35 chưa materialize trong file surface của phiên này; docs không claim Việt exact cho factor foundation này.

## Kết luận

**Q35 đã exact Việt/Hán mapping: 16 heading Hán ↔ 13 mục Việt; ba heading được gộp ở mục 6 và `竒門三元` bị lược khỏi bản Việt exact.** Q35 giữ `CHUA_IMPLEMENT`; từng mục chỉ được kéo vào product khi Q10/Q11 hoặc vertical mới thực sự cần và source rank của Phụ lục được xét đúng.
