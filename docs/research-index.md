# Research Index

Đây là bảng theo dõi tri thức đã được xác minh. Không đánh dấu VERIFIED nếu chưa đối chiếu đủ nguồn cần thiết.

| Chủ đề                    | Module   | Nguồn chính                             | Trạng thái    | Implementation                   | Oracle test                                | Ghi chú                                          |
| ------------------------- | -------- | --------------------------------------- | ------------- | -------------------------------- | ------------------------------------------ | ------------------------------------------------ |
| Thiên Can                 | calendar | T1 Q1 p55, p91 + Hán Q1                 | ORACLE_TESTED | domain/heavenly-stem.ts          | calendar-domain.spec.ts                    | docs/research/heavenly-stems-earthly-branches.md |
| Địa Chi                   | calendar | T1 Q1 p55, p91 + Hán Q1                 | ORACLE_TESTED | domain/earthly-branch.ts         | calendar-domain.spec.ts                    | TY = Tý, TI = Tỵ                                 |
| Vòng 60 Can Chi           | calendar | T2 Q20 + GB/T 33661                     | ORACLE_TESTED | sexagenary-day.ts                | sexagenary-day.spec.ts                     | Epoch 1949-10-01 = Giáp Tý                       |
| Gregorian -> Can Chi ngày | calendar | GB/T 33661 + HKO 2026                   | ORACLE_TESTED | civil-date.ts, sexagenary-day.ts | civil-date.spec.ts, sexagenary-day.spec.ts | Civil-date semantics theo ADR 0005               |
| Tháng theo tiết khí       | calendar | T2 Q20..Q31 + Hán Q20..Q31              | ORACLE_TESTED | solar-term.service.ts            | solar-term.service.spec.ts                 | 12 tiết mở tháng                                 |
| Instant của tiết khí      | calendar | GB/T 33661 + Astronomy Engine + HKO     | ORACLE_TESTED | solar-term.service.ts            | HKO đủ 24 tiết 2026                        | ADR 0004                                         |
| Thập Nhị Trực             | calendar | T2 Q20 p311, p313-314 + Hán Q20/Q21/Q30 | ORACLE_TESTED | twelve-officer.ts                | twelve-officer.spec.ts                     | Oracle tháng Dần/Mão                             |

Trạng thái hợp lệ:

- TODO
- LOCATED
- COMPARED
- VERIFIED
- IMPLEMENTED
- ORACLE_TESTED

## Ý nghĩa ORACLE_TESTED

Một mục chỉ được ghi ORACLE_TESTED khi:

1. logic đã được đối chiếu nguồn;
2. implementation đã tồn tại;
3. có test độc lập với implementation;
4. GitHub Actions Verify đã chạy xanh với test đó.

## Quy tắc đọc trạng thái

Một chủ đề lớn có thể tách thành nhiều hàng nếu chỉ một phần đã VERIFIED.

Không được dùng trạng thái VERIFIED/ORACLE_TESTED của một phần để hợp thức hóa phần khác chưa được xác minh.

Khi thêm một thần sát, quy tắc Dụng sự hoặc Nghi kị, thêm dòng vào bảng này hoặc tách thành bảng con theo module nếu danh sách lớn.
