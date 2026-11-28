# Lập khế ước, giao dịch / 立劵交易 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.857 (working scan PDF page 864), mục **Lập khế ước hợp đồng giao dịch**;
- Hán Q11 `WYG_011-20b..21a`, mục `立劵交易`.

Inventory/các bản điện tử có thể dùng dị thể `立券交易`; production source label giữ chữ `劵` theo KR3g0051.

### Nên — 7 mục

Thiên Nguyện, Dân Nhật, Tam Hợp, Mãn nhật, Lục Hợp, Ngũ Phú, Ngũ Hợp.

### Kị — 19 mục

Nguyệt Phá, Đại Hao, Bình nhật, Thu nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Thiên Lại, Tiểu Hao, Tứ Hao, Tứ Phế, Tứ Cùng, Ngũ Mộ, Cửu Không, Ngũ Ly.

Việt p.857 và Hán Q11 khớp trực tiếp 7/19. Khác Khai trương ở hai điểm cần khóa rõ: **không có Bế nhật**, **có Ngũ Ly**.

## Q10 semantics

### Shared target core với Khai trương

Đối với 18 target chung (Bình/Thu + 16 thần sát trừ Ngũ Ly), Q10 cho `立劵交易` cùng outcome với `開市` trong các branch liên quan. Production tái dùng exact source-resolved rules của Khai trương sau khi:

- lọc theo đúng target Q11 của giao dịch;
- không lấy Bế nhật;
- xóa toàn bộ `boNen` activity-specific của Khai trương;
- giữ universal `CAM_MOI_VIEC` thật sự.

Regression khóa các ví dụ:

- Nguyệt Phá + Đức vẫn Kị;
- Tứ Phế + Đức vẫn Kị;
- Kiếp Sát tháng Dần được giải;
- Bình tháng Mão + Nguyệt Đức cân bằng Kị nhưng không xóa các Nên giao dịch khác;
- Tứ Phế + Nguyệt Phá vẫn `諸事皆忌`.

### Ngũ Ly / 五離

Q10 `WYG_010-65b`:

Ngũ Ly gặp một trong các cát thần sau thì bỏ Kị:

- Thiên Đức;
- Nguyệt Đức;
- Thiên Đức Hợp;
- Nguyệt Đức Hợp;
- Thiên Xá;
- Tam Hợp;
- Lục Hợp.

Production dùng exact relief rule đã source-lock ở Yến hội nhưng đổi machine key/label sang Giao dịch. Nếu không có cát relief, baseline Ngũ Ly tự giữ Kị.

### Trường Tinh / Đoản Tinh — Kị bổ sung Q10

Q10 `WYG_010-72a`:

`長星 短星 忌進人口裁製經絡開市立劵交易納財納畜`

Hai sao không nằm Q11 `立劵交易`, nên production giữ baseline độc lập sạch và thêm:

- `TRUONG_TINH` → `THEM_KY`;
- `DOAN_TINH` → `THEM_KY`.

Public UI hiển thị factor và mô tả Kị bổ sung trong phần Nghi kị đã áp dụng.

Factor foundation theo Hán Q9 `WYG_009-33b` + cross-check Q19–30; Việt Tập II chưa materialize trong file surface của phiên foundation nên không claim Việt exact cho hai factor này.

## Q7

Hoàng/Hắc đạo supplementary, không blanket-block Lập khế ước, giao dịch.

## Product mapping

- activity code: `LAP_KHE_UOC_GIAO_DICH`;
- title: **Lập khế ước, giao dịch**;
- source label: `立劵交易`;
- route: `/lap-khe-uoc-giao-dich`;
- API: `/date-selection/lap-khe-uoc-giao-dich`;
- personalization: một người giao dịch theo generic contract.

## Oracle/tests

- `lap-khe-uoc-giao-dich-rules.spec.ts`: exact 7 Nên / 19 Kị; negative Bế/Long/Short baseline;
- `lap-khe-uoc-giao-dich-conflict.spec.ts`: shared target rules, Ngũ Ly relief, Bế exclusion, supplemental stars, universal hard;
- `han-q11-oracle.spec.ts`: independent fixture `立劵交易`;
- `han-q10-semantic-oracle.spec.ts`: Bế exclusion, Ngũ Ly relief, Q10 supplemental star behavior;
- service regression khóa real Q9 star dates qua calendar/factor pipeline.
