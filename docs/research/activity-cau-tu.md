# Cầu tự / 求嗣 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 activity contract

Nguồn exact:

- Việt Tập I p.845 (working scan PDF page 851), mục **Cầu tự**;
- Hán `KR3g0051_011.txt`, `WYG_011-6b`, mục `求嗣`.

### Nên — 12 mục

Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Thiên Nguyện, Nguyệt Ân, Tứ Tướng, Thời Đức, ngày Khai, Ích Hậu, Tục Thế.

Cầu tự **không** kéo bốn Nên riêng của Cầu phúc: Thiên Vu, Phổ Hộ, Phúc Sinh, Thánh Tâm. Q10 cũng cho thấy các dòng riêng `天巫宜祭祀祈福`, `普䕶福生聖心宜祭祀祈福`, trong khi `益後續世宜祭祀祈福求嗣`.

### Kị direct — 14 mục

Nguyệt Kiến, Nguyệt Phá, Bình nhật, Thu nhật, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Đại Thời, Du Họa, Thiên Lại, Tứ Phế.

### Kị inherited từ phụ chú ngay trước — 5 mục

Ở cuối mục Cầu phúc, Hán ghi:

`又忌禄空上朔等日 / 見鋪註條例餘倣此`

Việt p.844–845 dịch tương ứng:

`... Lộc không sớm ngày Thượng sóc xem ở điều về lệ phụ chú. Ngoài ra phỏng theo như thế.`

`餘倣此 / Ngoài ra phỏng theo như thế` làm các mục sau, bắt đầu từ Cầu tự, kế thừa phụ chú Lộc Không + Thượng Sóc đẳng nhật. Q10 mở `等日` thành:

- Vô Lộc / Lộc Không;
- Thượng Sóc;
- Tứ Ly;
- Tứ Tuyệt;
- Hối nhật.

Production ghi rõ đây là **inherited annotation**, không giả rằng năm mục này được in lại trên chính dòng `求嗣`.

## Q10 conflict semantics

Toàn bộ target Kị liên quan trong Q10 đều đặt `祈福求嗣` cùng nhau. Bốn dòng Q10 có `祈福` mà không có `求嗣` đều thuộc lớp Nên riêng của Cầu phúc hoặc chú cũ, không làm thay đổi conflict semantics.

Vì vậy Cầu tự dùng cùng data-driven resolver với Cầu phúc, đổi machine key và nhãn activity:

- Nguyệt Kiến + Đức/Hợp/Xá/Nguyệt Ân/Tứ Tướng giải Kị thường;
- tháng Mùi ngày Kỷ Mùi không lấy riêng Thiên Đức Hợp để giải;
- Nguyệt Phá, Bình/Thu, Kiếp/Tai/Nguyệt Sát, Nguyệt Hình/Hại/Yếm, Đại Thời, Thiên Lại, Tứ Phế dùng cùng source-resolved branches;
- Du Họa gặp Đức/Hợp/Thiên Xá vẫn Kị;
- Vô Lộc chỉ Kị khi calculator context-aware thực sự emit;
- Thượng Sóc/Tứ Ly/Tứ Tuyệt/Hối giữ Kị theo phụ chú inherited.

## Thiên Cẩu / ngày Dần

Q10 `WYG_010-74a..74b`:

`凡天狗寅日忌祭祀不註宜求福祈嗣`

Vì vậy Thiên Cẩu hoặc ngày Dần:

- **bỏ toàn bộ Nên Cầu tự**;
- **không tự tạo Kị Cầu tự**;
- Kị khác nếu có vẫn xử lý độc lập.

## Q7

Hoàng/Hắc đạo Q7 không blanket-block Cầu tự; chỉ là lớp supplementary.

## Product mapping

- activity code: `CAU_TU`;
- title: **Cầu tự**;
- source label: `求嗣`;
- route: `/cau-tu`;
- API: `/date-selection/cau-tu`;
- personalization: một người chủ lễ theo generic contract.

## Oracle/tests

- `cau-tu-rules.spec.ts`: 12 Nên, 14 Kị direct + 5 inherited;
- `cau-tu-conflict.spec.ts`: Thiên Cẩu/Dần, Kiến/Đức/Kỷ Mùi, Du Họa, inherited special days, hard-ban;
- `han-q11-oracle.spec.ts`: independent semantic fixture `求嗣`;
- `han-q10-semantic-oracle.spec.ts`: independent Q10 behavior và Ngũ Mộ exclusion.
