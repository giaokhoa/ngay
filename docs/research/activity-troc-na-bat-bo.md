# Tróc nã, bắt bớ / 捕捉 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Việt Tập I p.860, mục **Tróc nã, bắt bớ**, và Hán Q11 `WYG_011-23b` khớp trực tiếp:

- **Nên:** Chấp nhật / `執日`; Thu nhật / `收日`;
- **Kị:** Vãng Vong / `往亡`.

Tổng: **2 Nên / 1 Kị**.

## Q10 semantics

### Chấp / Thu là Nên

Q10:

- `執日 宜捕捉`;
- `收日 宜進人口納財捕捉納畜`.

Production giữ hai source Nên độc lập.

### Vãng Vong chuyên Kị

Q10 `WYG_010-63b..64a`, `徃亡 氣徃亡`:

- Kị `捕捉畋獵取魚`;
- `與德合赦願併猶忌`.

Vì vậy Vãng Vong vẫn Kị dù gặp Đức/Hợp, Thiên Xá hoặc Thiên Nguyện.

### Ordinary hung không tự Kị

Q10 đặt `捕捉畋獵取魚` trong nhóm `止不忌` của nhiều mục như Nguyệt Phá, Bình nhật, Kiếp Sát, Nguyệt Hình, Nguyệt Yếm, Tứ Phế. Production không clone các Kị thường của activity khác.

Các tổ hợp nói thẳng `諸事皆忌` vẫn được áp qua global-hard-only resolver đã source-lock ở Nhập học.

## Exact solar-term-day suppressor

Q10 `WYG_010-70a`, mục `冬至 夏至 春分 秋分`:

`不註 ... 捕捉畋獵取魚`

Production hiểu đúng nghĩa: vào **chính ngày dân sự chứa giao tiết** Xuân phân / Hạ chí / Thu phân / Đông chí:

- bỏ contribution Nên Chấp/Thu;
- không tự tạo Kị.

Để biểu diễn source này mà không tạo factor giả, engine thêm typed Q10 context:

- `BoiCanhDanhGiaNgay.tietKhiTrongNgay?: readonly TietKhi[]`;
- `DieuKienQ10.coBatKyTietKhiTrongNgay`;
- `TinhTietKhiService.tinhTietKhiTrongNgay(ngayDanSu, muiGio)`.

HKO 2026 oracle khóa exact day theo `Asia/Ho_Chi_Minh` cho Xuân phân, Hạ chí, Thu phân, Đông chí.

## Nguyệt Kị — suppress-only

Q10 `WYG_010-71a..71b` `月忌日` chỉ cho phép chú một danh sách hữu hạn và **không có `捕捉`**. `餘事不註` được production biểu diễn:

- bỏ Nên;
- không tự tạo Kị.

## Shared calendar annotations

`捕捉` không thuộc exact exemption lists của `無祿日` và `上朔 四離 四絶 晦日`, nên shared policy áp bình thường:

- Vô Lộc: bỏ Nên, không tự tạo Kị;
- Hối: bỏ Nên;
- Thượng Sóc / Tứ Ly / Tứ Tuyệt: thêm Kị theo `餘事皆忌`.

## Q7

Hoàng/Hắc đạo supplementary; `捕捉` không nằm trong five-activity Hắc đạo blocker list production.

## Product mapping

- code: `TROC_NA_BAT_BO`;
- title: **Tróc nã, bắt bớ**;
- Hán: `捕捉`;
- route: `/troc-na-bat-bo`;
- API: `/date-selection/troc-na-bat-bo`.

## Blocked adjacent section: 伐木

`伐木` chưa productionize vì Q11 yêu cầu composite Nên:

`宜立冬後立春前危日午日申日`

Nghĩa là **sau Lập Đông, trước Lập Xuân AND (Trực Nguy OR ngày Ngọ OR ngày Thân)**. `DieuKienDungSu` hiện chỉ biểu diễn một điều kiện đơn và chưa có composite AND / seasonal range. Tách thành ba rule Nên độc lập sẽ cho Nên sai ngoài mùa, nên section này giữ `OUT_OF_SCOPE_CURRENT_VERTICALS` với blocker modeling explicit.
