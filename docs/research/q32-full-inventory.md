# Quyển 32 — Nhật biểu full inventory

Status: HAN_INVENTORIED / VIET_EXACT_VERIFIED / ORACLE_PARTIAL

## Nguồn và denominator

- Hán: Kanripo `KR3g0051_031.txt`, revision pin, 卷三十二 `日表`.
- Hán mục lục có **3 heading chính**.
- Exact canonical Việt Tập II đã được mở trực tiếp và có đúng **3 mục**, khớp Hán.
- Trang in: 六十日時辰定局 p651, 貴登天門時定局 p677, 四大吉時定局 p683.

## Inventory 3/3

|   # | Mục Hán / Việt secondary                    | Product               | Ghi chú                                                                                                                              |
| --: | ------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
|   1 | 六十日時辰定局 / Thời định cục 60 ngày, giờ | ORACLE_TESTED_PARTIAL | Q32 vectors đang test Can-Chi giờ, Hoàng/Hắc đạo, Nhật Kiến/Lộc/Mã, Phá/Hình, Ngũ Bất Ngộ, Không vong; chưa claim toàn bộ 60×12 cell |
|   2 | 貴登天門時定局 / Quý Đăng Thiên Môn         | BLOCKED_TIME_LOCATION | Q7 đã compare; cần Nguyệt tướng tại instant + Âm/Dương quý + sunrise/sunset thực tế + time model chi tiết                            |
|   3 | 四大吉時定局 / Tứ Đại Cát Thời              | BLOCKED_FINE_TIME     | Q7 đã compare; dùng `八干四卦` và độ phân giải dưới 12 thời thần hiện tại                                                            |

## Vai trò source

Q32 nói rõ: sau khi đã chọn được ngày tốt, “cơ” phát động còn phải xét giờ; giờ lấy ngày làm gốc. Vì vậy Q32 là **hour-table oracle** chứ không phải lý do để mọi nhãn trong một cell tự động thành scoring factor.

Các source vectors hiện production được khóa trong:

- `hoang-hac-dao.spec.ts`;
- `selected-hour.spec.ts`;
- `docs/research/q7-day-hour-auxiliary.md`;
- `docs/research/personal-year-and-hour-selection.md`.

## Kết luận

**Q32 đã exact Việt/Hán structural-double-entry đủ 3/3 mục.** Oracle vẫn partial: bảng 60 ngày đang dùng một subset có test; Quý Đăng Thiên Môn và Tứ Đại Cát Thời giữ blocked đúng theo input/time model.
