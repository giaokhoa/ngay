# date-selection

Lớp orchestration/API cho chức năng xem ngày.

Luồng:

calendar -> factors -> activities -> evaluation -> response

## CUOI_HOI

Endpoint đầu tiên:

`GET /date-selection/cuoi-hoi?thoiDiem=<ISO-8601>&muiGio=<IANA timezone>`

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
