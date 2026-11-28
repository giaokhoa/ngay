# Quyển 34 — Lợi dụng 2 full inventory

Status: HAN_INVENTORIED / VIET_SECONDARY_TOC / EXACT_VIET_SCAN_PENDING / ORACLE_PARTIAL

## Nguồn và denominator

- Hán: Kanripo `KR3g0051_033.txt`, revision pin, 卷三十四 `利用二`.
- Hán TOC có **12 heading chính**.
- Secondary public TOC Việt Tập 2 có **10 mục**. Mục 2 gộp `月吉神總論` + `月凶神總論`; phần đồ hình Mặt Trời trên public TOC không đủ chi tiết để xác định chắc mapping riêng của `時刻方位圖` và `太陽到方圖`.
- Exact canonical Việt Tập 2 chưa mount, nên chênh 10↔12 được giữ `VIET_EXACT_PENDING`, không normalize thành discrepancy đã xác nhận.

## Hán inventory 12/12 heading, map về 10 mục Việt secondary

| Hán heading          | Product                       | Ghi chú                                                                                 |
| -------------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 年神總論             | REFERENCE_SPATIAL             | tổng luận niên thần; Q3/Q14–19 là domain chính                                          |
| 月吉神總論           | REFERENCE_SEMANTIC            | tổng luận cát thần tháng; không override Nghĩa lệ Q4–Q6                                 |
| 月凶神總論           | REFERENCE_SEMANTIC            | public Việt TOC gộp cùng mục 2                                                          |
| 諸家年月日吉凶神附論 | SOURCE_REVIEW                 | so sánh các nhà, không standalone calculator                                            |
| 制煞要法             | REFERENCE_CONFLICT_POLICY     | nguyên tắc chế hóa; không thay exact Q10 semantics của 7 vertical                       |
| 四柱法               | PARTIAL_FOUNDATION            | calendar đã có năm/tháng/ngày/giờ Can Chi, nhưng chưa claim full Q34 four-pillar method |
| 用日法               | REFERENCE / PARTIAL           | ngày-selection hiện dựa Q4–Q11 exact rules, không claim encode toàn mục này             |
| 用時法               | ORACLE_TESTED_PARTIAL         | selected-hour: trợ ngày, hợp/lộc/mã; tránh phá/hình/Ngũ Bất Ngộ                         |
| 時刻方位圖           | BLOCKED_LOCATION_SPATIAL_TIME | cần location + phương vị + time model                                                   |
| 太陽到方圖           | BLOCKED_LOCATION_SPATIAL      | cần solar azimuth/spatial target                                                        |
| 太陽到方時刻表       | BLOCKED_LOCATION_SPATIAL_TIME | bảng location-sensitive, không dùng cố định cho Việt Nam                                |
| 造葬權法             | REFERENCE_ACTIVITY_SPATIAL    | tạo/táng quyền pháp, không thay Q10/Q11 activity contract                               |

## Production subset

`用時法` là phần Q34 đã được source-lock rõ nhất trong current product:

- giờ cùng/giúp ngày;
- tam hợp, lục hợp;
- Lộc, Mã;
- tránh giờ phá, hình;
- Ngũ Bất Ngộ;
- quan hệ với sinh niên được nối với Q33 `相主`.

Chi tiết ở `docs/research/personal-year-and-hour-selection.md`.

Các bảng Mặt Trời/phương vị không được dùng như lookup universal: Q12 đã cho thấy bảng thiên văn của sách có locality Kinh sư và chính source yêu cầu tính theo vĩ độ khi đổi địa phương.

## Kết luận

**Q34 đã structural-inventory đủ 12/12 heading Hán, tương ứng 10 mục trên secondary Việt TOC.** Oracle production vẫn partial; spatial/solar phần còn lại giữ blocker explicit.
