# ADR 0008: Data-driven Quyển 10 conflict resolver

Status: Accepted

## Bối cảnh

Quyển 10 không thể biểu diễn đúng bằng một phép "cát thắng hung" hoặc một chuỗi
`if` dùng chung cho mọi công việc.

Cùng một blocker có thể:

- giữ Kị;
- bỏ Kị cho công việc đang xét;
- cân bằng cát/hung;
- biến thành "mọi việc đều Kị";
- chỉ còn Kị quân sự/chữa bệnh;
- chuyển sang semantics của blocker/Trực khác;
- tạo Kị từ một ngày đặc biệt của Quyển 10 dù không có factor tương ứng;
- loại contribution Nên cụ thể.

Ngoài ra Quyển 10 có delegation nhiều tầng. Ví dụ DI_CHUYEN có các nhánh
Thiên Lại -> Bình -> Nguyệt Hình và Tai Sát -> Nguyệt Phá.

## Quyết định

Evaluation dùng một resolver Quyển 10 data-driven cho các activity mới.

Mỗi rule giữ:

- activity;
- target có kiểu khi rule áp lên contribution Q11;
- điều kiện tháng, Can/Chi ngày, Trực và factor đồng thời;
- operation;
- precedence;
- source refs Việt/Hán;
- ghi chú khác biệt nguồn khi có.

Các operation hiện cần:

- `GIU_KY`;
- `BO_KY`;
- `CAN_BANG`;
- `CAM_MOI_VIEC`;
- `CHI_CON_QUAN_Y`;
- `DELEGATE`;
- `GIU_KY_DU_CO_CAT`;
- `THEM_KY` cho Q10-only prohibition;
- `BO_NEN` cho Q10-only suppression của contribution Nên.

## Precedence

Khi nhiều rule cùng match một target:

1. precedence cao hơn thắng;
2. nếu nhiều rule cùng precedence và cùng outcome thì có thể cùng giữ trace;
3. nếu cùng precedence nhưng outcome khác nhau, resolver phải fail loud.

Không chọn rule theo thứ tự file.

## Delegation

`DELEGATE` được resolve recursive.

Resolver phải:

- kiểm tra target delegate thật sự có trong context;
- giữ trace của cả rule delegate và rule đích;
- dùng visited-set;
- throw khi phát hiện cycle.

Không fallback im lặng nếu source-data không nhất quán.

## Rule toàn cục Quyển 10

Một số ngày đặc biệt ở Quyển 10 tạo kết luận dù factor Q11 không match, ví dụ:

- Đại hội / Tiểu hội hard-ban;
- Tuế bạc / Trục trận theo Kị Nguyệt Yếm;
- Âm thác / Dương thác với semantics riêng.

Các rule này không được ép thành factor giả. Resolver hỗ trợ rule không có
target để:

- bật `CAM_MOI_VIEC`;
- thêm `THEM_KY`;
- áp `BO_NEN`.

## CAN_BANG

Theo câu source kiểu "không chủ phải kị, cũng không chủ là nên làm",
`CAN_BANG` triệt contribution Kị đang xét và contribution Nên liên quan được
rule chỉ ra hoặc suy ra từ cát thần match.

Nó không tạo Nên mới.

## Provenance

Mọi trace rule Quyển 10 phải mang source refs đã xác minh.

Nếu Việt/Hán khác nhau:

- không tự hòa giải;
- ghi khác biệt trong provenance;
- nếu khác biệt làm đổi identity, dùng Hán nguyên văn để phân biệt thuật ngữ
  theo source policy và giữ ghi chú bản Việt.

## Phạm vi migration

DI_CHUYEN là activity đầu tiên dùng resolver data-driven đầy đủ.

CUOI_HOI giữ resolver hiện tại trong PR này để tránh thay đổi hai vertical cùng
lúc. Migration CUOI_HOI chỉ được làm khi toàn bộ regression hiện có được giữ và
có task riêng.

## Hệ quả

- Q10 semantics tách khỏi orchestration và khỏi factor calculator.
- Activity mới có thể thêm rule data + oracle regression thay vì thêm nhánh
  hard-coded vào service.
- Rule table có thể audit từ result trace trở lại exact source.
