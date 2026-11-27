# date-selection

Lớp orchestration/API cho chức năng xem ngày.

Luồng dự kiến:

calendar -> factors -> activities -> evaluation -> response

Trách nhiệm:

- nhận input;
- gọi đúng module;
- hợp nhất kết quả;
- map sang DTO.

Không được:

- chứa bảng thần sát;
- chứa công thức Can Chi;
- chứa rule Dụng sự/Nghi kị trực tiếp.
