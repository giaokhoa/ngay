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

### Ngũ Bất Ngộ và transcription defects

Exact Việt Tập II cho phép source-lock operational mapping thay vì chỉ dựa vào transcription Hán:

- printed p.653–656 chứa mười ngày đầu của vòng 60 và xác nhận đủ 10 lớp Can của Ngũ Bất Ngộ: Giáp→Ngọ, Ất→Tỵ, Bính→Thìn, Đinh→Mão, Mậu→Dần, Kỷ→Sửu/Hợi, Canh→Tý/Tuất, Tân→Dậu, Nhâm→Thân, Quý→Mùi;
- riêng **Mậu Thìn–giờ Dần** được exact Việt đánh Ngũ Bất Ngộ, nên operational table không áp trực tiếp lời biện Q7 về “ngày Thổ gặp Dần/Mão” như một cancellation rule;
- printed p.667–668 xác nhận row **Kỷ Hợi**; Kanripo chép nhầm header thành `巳亥`;
- printed p.671–672 xác nhận row **Nhâm Tý** đầy đủ và giờ Thân có “Thanh Long / Ngũ Bất Ngộ”; Kanripo text bỏ toàn row này khi nhảy từ `辛亥` sang `癸丑`.

Ba vấn đề được đăng ký lần lượt ở source discrepancy registry: `Q7_NGU_BAT_NGO_COMMENTARY_VS_Q32_TABLE`, `Q32_KY_HOI_KANRIPO_JI_AS_SI`, `Q32_NHAM_TY_KANRIPO_ROW_OMITTED`.

Production selected-hour theo **Q32 operational table**. Q7 prose vẫn được giữ như internal source tension, không bị xóa hay diễn giải ngầm thành một heuristic mới.

Các source vectors hiện production được khóa trong:

- `hoang-hac-dao.spec.ts`;
- `selected-hour.spec.ts`;
- `docs/research/q7-day-hour-auxiliary.md`;
- `docs/research/personal-year-and-hour-selection.md`.

## Kết luận

**Q32 đã exact Việt/Hán structural-double-entry đủ 3/3 mục.** Ngũ Bất Ngộ operational mapping đã được exact Việt source-lock cùng hai defect Kanripo; oracle toàn bảng vẫn partial vì chưa claim mọi nhãn trong 60×12 cell. Quý Đăng Thiên Môn và Tứ Đại Cát Thời giữ blocked đúng theo input/time model.
