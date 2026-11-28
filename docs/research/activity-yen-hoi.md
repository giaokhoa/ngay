# Yến hội / 宴會〈會親友同〉 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 activity contract

Nguồn đã đối chiếu trực tiếp:

- exact Việt Tập I p.848 (working scan PDF page 855), mục **Yến tiệc - Họp họ hàng, bạn bè, thân thuộc**;
- Hán `KR3g0051_011.txt`, `WYG_011-10b`, mục `宴會〈會親友同〉`.

Hai bản khớp từng mục.

### Nên — 18 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Ân, Thiên Xá, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, Vương Nhật, Dân Nhật, Tam Hợp, Phúc Đức, Thiên Hỷ, Khai nhật, Lục Hợp, Ngũ Hợp.

### Kị — 13 mục

Nguyệt Phá, Bình nhật, Thu nhật, Bế nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Tứ Phế, Ngũ Ly, ngày Dậu.

`酉日` được giữ là typed condition `CHI_NGAY:DAU`, độc lập với `五離`. Điều này quan trọng vì Ngũ Ly có thể được Q10 giải Kị trong khi ngày Dậu vẫn là một Kị Q11 riêng.

## Ngũ Hợp / Ngũ Ly

Yến hội tạo dependency mới lên hai factor Q5 trước đây chưa cần cho current verticals.

Nguồn Việt mở trực tiếp:

- Tập I p.459: “Ngũ hợp là ngày Dần Mão”.
- Tập I p.460: “Ngũ ly là ngày Thân Dậu”, đồng thời dùng tên **Trừ thần**.

Hán double-entry:

- Q5 `WYG_005-57a..57b`: `五合者寅夘日也`.
- Q5 `WYG_005-58a`: `五離者申酉日是也`, alias `除神`.
- Q9 bảng thần sát lặp lại `五合 寅夘` và `除神(五離/) 申酉`.

Production vì vậy encode:

- `NGU_HOP`: Dần/Mão;
- `NGU_LY`: Thân/Dậu, `tenKhac = Trừ Thần`.

## Q10 conflict semantics

Các Kị chung với Di chuyển tái dùng Q10 core chỉ khi target và semantics nguồn thật sự trùng: Nguyệt Phá, Bình, Thu, Bế, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Yếm, Tứ Phế. Target riêng của Di chuyển như Đại Thời, Thiên Lại, Ngũ Mộ, Quy Kị, Vãng Vong không được clone vào Yến hội.

### Nguyệt Yếm

Hán `WYG_010-47b..51a`:

- Mão/Dậu: mọi việc đều Kị;
- Tý/Ngọ không Thiên Xá: mọi việc đều Kị;
- các hard-day hội/xung đặc biệt vẫn áp toàn cục;
- Dần/Thân/Sửu/Mùi gặp cát: residual Kị không có `宴會`, nên Yến hội **bỏ Kị** ở nhánh này, khác Di chuyển vẫn còn `般移` trong residual list;
- Dương Thác theo chỗ Kị của Nguyệt Kiến; Q10 mục 月建 không Kị Yến hội, nên contribution Nguyệt Yếm bị bỏ ở nhánh này.

### Nguyệt Hại

Hán `WYG_010-45b..46b`:

- Mão/Dậu/Sửu/Mùi + Thiên Đức hoặc Nguyệt Đức: bỏ Kị Yến hội;
- Thìn/Tuất + Thiên Đức Hợp hoặc Nguyệt Đức Hợp: cát/hung cân bằng;
- Tý/Ngọ theo Nguyệt Sát;
- Tỵ/Hợi theo Kiếp Sát;
- Dần theo Nguyệt Hình;
- Thân theo Bình nhật.

### Ngũ Ly

Hán `WYG_010-65b` ghi Ngũ Ly Kị `慶賜賞賀、宴會、結婚姻、納采問名、立劵交易`, nhưng gặp Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Tam Hợp hoặc Lục Hợp thì không Kị.

Production giữ `酉日` riêng. Vì vậy ngày Dậu + Ngũ Ly + Thiên Đức: contribution Ngũ Ly bị loại, nhưng contribution ngày Dậu vẫn hiệu lực.

## Q7

Hoàng/Hắc đạo Q7 không blanket-block Yến hội vì danh sách năm nhóm việc Hắc đạo kị không nêu `宴會`.

## Product mapping

- activity code: `YEN_HOI`;
- route: `/yen-hoi`;
- direct API: `/date-selection/yen-hoi`;
- một người chủ sự theo personalization contract hiện tại;
- source label consumer: `宴會〈會親友同〉`.

## Oracle/tests

- `q5-fixed-branch-factors.spec.ts`: 12 chi khóa Ngũ Hợp/Ngũ Ly.
- `han-q5-oracle.spec.ts`: independent Q5/Q9 double-entry oracle.
- `yen-hoi-rules.spec.ts`: exact 18 Nên / 13 Kị + provenance.
- `yen-hoi-conflict.spec.ts`: Ngũ Ly vs Dậu độc lập; Nguyệt Hại theo tháng; Nguyệt Yếm residual; hard-ban; Tứ Phế; Kiếp Sát/Nguyệt Phá.
- `han-q11-oracle.spec.ts`: independent exact `宴會〈會親友同〉` fixture.
- `han-q10-semantic-oracle.spec.ts`: cross-activity source semantics, không ép Ngũ Mộ vào Yến hội.
