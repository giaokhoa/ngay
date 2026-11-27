# date-selection

Lớp orchestration/API cho chức năng xem ngày.

Luồng:

calendar -> factors -> activities -> evaluation -> response

## Activities đã có API

- `GET /date-selection/cuoi-hoi?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`
- `GET /date-selection/di-chuyen?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`
- `GET /date-selection/dong-tho?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`
- `GET /date-selection/sua-cung-that?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`
- `GET /date-selection/khai-truong?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`
- `GET /date-selection/xuat-hanh?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`
- `GET /date-selection/an-tang?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`

CUOI_HOI dùng Q11 嫁娶 + resolver Q10 riêng. DI_CHUYEN dùng Q11
般移〈移徙同〉 + resolver data-driven Q10. DONG_THO và SUA_CUNG_THAT dùng
exact Q11 rules + full Q10 earthwork semantics. KHAI_TRUONG dùng Q11 開市
và resolver Q10 riêng đã source-lock từ Quyển 10. XUAT_HANH giữ exact Q11
Việt 16 Nên/15 Kị, bổ sung Nguyệt Yếm từ Q10 và tái dùng matrix shared với
DI_CHUYEN cho các blocker chung. AN_TANG dùng exact Q11 安葬 8 Nên/16 Kị,
3 factor Q5 source-lock (Ô Phệ/Phục/Trọng), và resolver Q10 riêng.

`THO_VUONG` là typed activity target lấy từ calendar fact `dangThoVuong`,
không phải factor giả trong `MaYeuTo`.

Response giữ:

- calendar facts (ngày dân sự, Can Chi ngày, Chi tháng, Trực, Thổ Vượng);
- factors và provenance;
- contribution Nên/Kị Q11;
- trace override Q10 và provenance;
- explanation về contribution còn hiệu lực và contribution bị loại.

## Trách nhiệm

- nhận input;
- gọi đúng module;
- hợp nhất kết quả;
- map sang DTO/response.

Không được:

- chứa bảng thần sát;
- chứa công thức Can Chi;
- chứa rule Dụng sự/Nghi kị trực tiếp.
