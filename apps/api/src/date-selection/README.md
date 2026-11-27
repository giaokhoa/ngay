# date-selection

Lớp orchestration/API cho chức năng xem ngày.

Luồng:

calendar -> factors -> activities -> evaluation -> response

## Activities đã có API

- `GET /date-selection/cuoi-hoi?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`
- `GET /date-selection/di-chuyen?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`

CUOI_HOI dùng Q11 嫁娶 + resolver Q10 riêng. DI_CHUYEN dùng Q11
般移〈移徙同〉 + resolver riêng, hiện khóa invariant Quy Kị theo research đã
xác minh và không nhận các override chỉ dành cho cưới hỏi.

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
