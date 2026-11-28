# May đo, cắt may quần áo / 裁製〈裁衣同〉 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.854 (working scan PDF page 861), mục **May đo - cắt may quần áo**;
- Hán Q11 `WYG_011-17a`, mục `裁製〈裁衣同〉`.

### Nên — 14 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Vương Nhật, Tam Hợp, Mãn nhật, Khai nhật, Phục Nhật.

### Kị — 9 mục

Nguyệt Phá, Bình nhật, Thu nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Tứ Phế.

Việt p.854 và Hán Q11 khớp trực tiếp 14/9; không có discrepancy mới.

## Q10 semantics

### Baseline target resolver

Q10 cho `裁製` cùng outcome với resolver source-resolved Khai trương ở đúng 9 target Q11:

- Bình nhật;
- Thu nhật;
- Nguyệt Phá;
- Kiếp Sát;
- Tai Sát;
- Nguyệt Sát;
- Nguyệt Hình;
- Nguyệt Yếm;
- Tứ Phế.

Production tái dùng exact target branch `BO_KY / CAN_BANG / DELEGATE / GIU_KY / CAM_MOI_VIEC` đã machine-lock, nhưng **xóa toàn bộ `boNen` activity-specific của Khai trương** trước khi áp cho May đo.

Ví dụ regression:

- Nguyệt Phá + Đức vẫn Kị;
- Tứ Phế + Nguyệt Đức vẫn Kị;
- Kiếp Sát tháng Dần được giải;
- Bình nhật tháng Mão + Nguyệt Đức cân bằng Kị, nhưng Nên May đo khác vẫn còn hiệu lực;
- hội `諸事皆忌` thật sự vẫn hard-ban.

### Trường Tinh / Đoản Tinh — Kị bổ sung Q10, không phải Q11 baseline

Q10 `WYG_010-72a`:

`長星 短星 忌進人口裁製經絡開市立劵交易納財納畜`

Vì Q11 `裁製` không liệt kê hai sao này, production giữ baseline Q11 sạch và thêm hai global resolver rules:

- `TRUONG_TINH` → `THEM_KY`;
- `DOAN_TINH` → `THEM_KY`.

`THEM_KY` làm `coKy=true` nhưng không giả tạo một contribution Q11. Public UI hiển thị lý do trong **Nghi kị đã áp dụng** và đồng thời hiển thị factor Trường/Đoản Tinh trong danh sách thần sát.

### Nguồn Trường/Đoản Tinh

Factor foundation production theo:

- Hán Q9 `WYG_009-33b`, bảng `長星 / 短星`;
- cross-check 12 Nguyệt biểu Q19–30;
- tháng là tháng tiết khí / Nguyệt kiến, ngày là ngày âm tính từ Sóc thiên văn.

Q35 chỉ corroborate truyền bảng và tự ghi một số phép giải nghĩa cho kết quả khác bảng; production không “sửa” bảng Q9 theo phép Q35.

Bản Việt Tập II của foundation Trường/Đoản Tinh chưa materialize trong file surface của phiên triển khai, nên **không claim Việt exact cho hai factor này**. Điều này không ảnh hưởng double-entry Việt/Hán của baseline Q11 May đo.

## Q7

Hoàng/Hắc đạo Q7 supplementary, không blanket-block May đo.

## Product mapping

- activity code: `MAY_DO`;
- title: **May đo, cắt may quần áo**;
- source label: `裁製〈裁衣同〉`;
- route: `/may-do`;
- API: `/date-selection/may-do`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `may-do-rules.spec.ts`: exact 14 Nên / 9 Kị và negative Trường/Đoản baseline;
- `may-do-conflict.spec.ts`: Nguyệt Phá, Tứ Phế, Kiếp Sát, Bình cân bằng, supplemental stars, universal hard;
- `han-q11-oracle.spec.ts`: independent fixture `裁製〈裁衣同〉`;
- `han-q10-semantic-oracle.spec.ts`: supplemental star Kị + target branch behavior;
- service regression khóa real 2026 Trường Tinh / Đoản Tinh và public `xungDot` reason.
