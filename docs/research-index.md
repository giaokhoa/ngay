# Research Index

Đây là bảng theo dõi tri thức đã được xác minh. Không đánh dấu VERIFIED nếu chưa đối chiếu đủ nguồn cần thiết.

| Chủ đề                         | Module   | Bản Việt                             | Hán bản                             | Trạng thái | Implementation | Oracle test      | Ghi chú                                          |
| ------------------------------ | -------- | ------------------------------------ | ----------------------------------- | ---------- | -------------- | ---------------- | ------------------------------------------------ |
| Thiên Can                      | calendar | T1 Q1 p55, p91                       | Q1                                  | VERIFIED   | -              | -                | docs/research/heavenly-stems-earthly-branches.md |
| Địa Chi                        | calendar | T1 Q1 p55, p91                       | Q1                                  | VERIFIED   | -              | -                | docs/research/heavenly-stems-earthly-branches.md |
| Vòng 60 Can Chi                | calendar | T2 Q20 p313+                         | Q20                                 | COMPARED   | -              | -                | Thứ tự chắc; epoch Gregorian chưa xác minh       |
| Ngày Gregorian -> Can Chi ngày | calendar | Không đủ                             | Cần nguồn kỹ thuật                  | TODO       | -              | -                | docs/research/gregorian-to-sexagenary-day.md     |
| Tháng theo tiết khí            | calendar | T2 Q20 p311                          | Q20..Q31                            | VERIFIED   | -              | -                | Mapping tiết -> chi tháng đã chắc                |
| Instant của tiết khí           | calendar | Quy tắc tháng có, công thức số không | GB/T 33661 + Astronomy Engine + HKO | VERIFIED   | -              | HKO 2026 planned | docs/research/solar-term-instant-calculation.md  |
| Thập Nhị Trực                  | calendar | T2 Q20 p311, p313-314                | Q20, Q21, Q30                       | VERIFIED   | -              | -                | docs/research/twelve-officers.md                 |

Trạng thái hợp lệ:

- TODO
- LOCATED
- COMPARED
- VERIFIED
- IMPLEMENTED
- ORACLE_TESTED

## Quy tắc đọc trạng thái

Một chủ đề lớn có thể tách thành nhiều hàng nếu chỉ một phần đã VERIFIED.

Ví dụ:

- mapping tháng theo tiết khí đã VERIFIED;
- thuật toán tính instant tiết khí cũng đã VERIFIED độc lập bằng GB/T + Astronomy Engine + HKO;
- Gregorian -> Can Chi ngày vẫn là task riêng cho tới khi epoch/day-boundary được khóa.

Không được dùng trạng thái VERIFIED của một phần để hợp thức hóa phần khác chưa được xác minh.

Khi thêm một thần sát, quy tắc Dụng sự hoặc Nghi kị, thêm dòng vào bảng này hoặc tách thành bảng con theo module nếu danh sách lớn.
