# Quyển 35 — Phụ lục inventory

Status: HAN_INVENTORIED / VIET_SECONDARY_TOC / EXACT_VIET_SCAN_PENDING / NOT_IMPLEMENTED

## Vai trò nguồn

Hán Q35 tự nói đây là **附錄**: những phép tục truyền còn dùng, tài liệu cũ từng chép, hoặc phương pháp hỗ trợ như Nhâm/Độn được đưa vào để tham khảo; không đồng cấp với chính biên. Vì vậy “có trong Q35” không tự động nghĩa là phải trở thành production factor.

Exact Tập 2 scan Việt hiện không có trong execution context. Secondary public TOC của Tập 2 được dùng chỉ để corroborate structure; wording/trang phải chờ canonical scan.

## Hán inventory 16/16 heading

|   # | Hán heading  | Product policy                                                      |
| --: | ------------ | ------------------------------------------------------------------- |
|   1 | 推測時刻     | REFERENCE_ASTRONOMY; bảng thời khắc, không universal location table |
|   2 | 男女九宫     | OUT_OF_SCOPE / PERSONAL-SPATIAL                                     |
|   3 | 逐日人神所在 | OUT_OF_SCOPE                                                        |
|   4 | 太白逐日遊方 | BLOCKED_SPATIAL                                                     |
|   5 | 長星短星     | OUT_OF_SCOPE                                                        |
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

## Public Việt TOC discrepancy pending exact scan

Secondary Việt TOC có **13 mục đánh số**:

- mục 6 gộp `百忌日 / 祀竈日 / 洗頭日`, tương ứng 3 heading Hán;
- các mục 7–13 tiếp tục tới `吉將加時`;
- TOC public không hiện `竒門三元` dù Hán có heading riêng cuối mục lục Q35.

Do exact Tập 2 scan chưa truy cập được, repo **không kết luận** đây là thiếu mục trong bản dịch, lỗi OCR/TOC của website, hay cách biên tập gộp/loại. Ghi là `VIET_EXACT_PENDING`, không đưa vào discrepancy registry canonical cho đến khi mở được scan.

## Kết luận

**Hán Q35 đã inventory 16/16 heading.** Secondary Việt TOC có 13 mục và một điểm chưa khớp quanh `竒門三元`. Q35 giữ `CHUA_IMPLEMENT`; từng mục chỉ được kéo vào product khi Q10/Q11 hoặc vertical mới thực sự cần và source rank của Phụ lục được xét đúng.
