# Nạp tiền của / 納財 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.857 (working scan PDF page 864), mục **Nạp tiền của**;
- Hán Q11 `WYG_011-21a`, mục `納財`.

### Nên — 12 mục

Mẫu Thương, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Dân Nhật, Tam Hợp, Mãn nhật, Thu nhật, Lục Hợp, Ngũ Phú, Thiên Thương.

### Kị — 16 mục

Nguyệt Phá, Đại Hao, Bình nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Thiên Lại, Tiểu Hao, Tứ Hao, Tứ Phế, Tứ Cùng, Cửu Không.

Việt p.857 và Hán `WYG_011-21a` khớp trực tiếp 12/16; không có discrepancy mới.

## Q10 semantics

### Shared target resolver

Q10 và `鋪註條例` ghép `開市 / 立劵交易 / 納財` trong các nhánh cân bằng cát-hung, nên Nạp tài dùng cùng source-resolved target semantics với Khai trương ở đúng các baseline Kị chung:

- Bình nhật;
- Nguyệt Phá / Đại Hao;
- Kiếp Sát, Tai Sát, Nguyệt Sát;
- Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm;
- Đại Thời, Thiên Lại, Tiểu Hao, Tứ Hao;
- Tứ Phế, Tứ Cùng, Cửu Không.

Production lọc theo target Q11 và bỏ `boNen` đặc thù Khai trương trước khi áp.

### Ba negative quan trọng

- **Thu nhật / 收日 là Nên**, không phải Kị. Q10 còn ghi trực tiếp `收日 宜進人口納財捕捉納畜`.
- **Bế nhật / 閉日 không có trong Q11 Kị Nạp tài**.
- **Ngũ Mộ / 五墓 không có trong Q11 Kị Nạp tài** và không được kéo sang chỉ vì Khai trương có Kị này.

Các regression khóa cả ba trường hợp.

### Trường Tinh / Đoản Tinh — Kị bổ sung Q10

Q10 `WYG_010-71b..72a`:

`長星 短星 忌進人口裁製經絡開市立劵交易納財納畜`

Vì Q11 `納財` không liệt kê hai sao này, production giữ baseline Q11 sạch và dùng `THEM_KY` cho:

- `TRUONG_TINH`;
- `DOAN_TINH`.

Public explanation nêu rõ “Trường Tinh / Đoản Tinh là Kị bổ sung Q10 cho nạp tài”.

### Shared calendar annotations Q10

Nạp tài đi qua layer dùng chung đã source-lock:

- `無祿日`: nếu factor còn tồn tại sau các relief của engine, Nạp tài không thuộc nhóm miễn → bỏ Nên, không tự tạo Kị;
- `上朔 / 四離 / 四絶`: ngoài nhóm miễn → Kị bổ sung;
- `晦日`: chỉ bỏ Nên, không tự tạo Kị.

## Q7

Hoàng/Hắc đạo Q7 supplementary, không blanket-block Nạp tài.

## Product mapping

- activity code: `NAP_TAI`;
- title: **Nạp tiền của**;
- source label: `納財`;
- route: `/nap-tai`;
- API: `/date-selection/nap-tai`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `nap-tai-rules.spec.ts`: exact 12 Nên / 16 Kị + negative Thu/Bế/Ngũ Mộ/Trường-Đoản baseline;
- `nap-tai-conflict.spec.ts`: shared target branches, Thu là Nên, Bế/Ngũ Mộ không Kị, supplemental stars, shared calendar annotations;
- `han-q11-oracle.spec.ts`: independent fixture `納財`;
- `han-q10-semantic-oracle.spec.ts`: negative Ngũ Mộ + supplemental stars;
- service regression khóa real 2026 Trường/Đoản Tinh qua calendar thật.
