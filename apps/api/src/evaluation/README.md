# evaluation

Xử lý Nghi kị và kết luận nội bộ.

## Trách nhiệm

- áp rule Dụng sự;
- xử lý ngoại lệ;
- xử lý phối hợp cát/hung;
- giữ trace rule đã áp và rule còn hiệu lực.

Không được:

- dùng score tùy ý thay thế logic nguồn;
- tính lịch pháp;
- chứa logic HTTP/UI.

## Quyển 10

DI_CHUYEN dùng resolver data-driven theo ADR 0008.

Rule Quyển 10 có thể:

- giữ/bỏ Kị;
- cân bằng contribution;
- hard-ban mọi việc;
- delegate sang blocker/Trực khác;
- thêm Q10-only Kị;
- bỏ contribution Nên cụ thể.

Resolver dùng precedence rõ ràng, fail loud nếu hai rule cùng precedence cho
outcome khác nhau, và có cycle guard cho delegation.

CUOI_HOI hiện vẫn dùng resolver riêng đã được khóa bằng regression tests. Không
tự tái dùng override CUOI_HOI cho activity khác.
