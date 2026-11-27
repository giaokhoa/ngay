# Testing Strategy

## CI là chuẩn

Workflow .github/workflows/ci.yml là nguồn kiểm chứng chính.

Pipeline bắt buộc:

1. install frozen lockfile;
2. format check;
3. lint;
4. typecheck;
5. unit tests;
6. production build.

## Các tầng test

### Primitive tests

Dùng cho:

- vòng Can Chi;
- quan hệ Can/Chi;
- tiết khí;
- Thập Nhị Trực;
- phép modulo/index.

Các test này kiểm công thức kỹ thuật.

### Rule tests

Mỗi rule Dụng sự/Nghi kị phải có:

- trường hợp match;
- trường hợp không match;
- ngoại lệ nếu có;
- source reference trong fixture hoặc mô tả test.

### Oracle tests

Quan trọng nhất.

Dùng bảng có sẵn trong sách để kiểm output engine độc lập với implementation.

Ví dụ định hướng:

- một tháng cụ thể -> danh sách vị trí thần sát theo Nguyệt biểu;
- một Can Chi cụ thể -> kết quả phải khớp bảng sách.

Không tạo expected bằng cùng function đang test.

### Regression tests

Mỗi bug nghiệp vụ phải tạo fixture tái hiện bug trước khi sửa.

## Quy tắc khi test fail

Không:

- sửa expected cho khớp code mà chưa đọc lại nguồn;
- bỏ test để CI xanh;
- giảm strictness typecheck vì một lỗi cục bộ.

Phải xác định lỗi nằm ở:

- source extraction;
- representation;
- implementation;
- fixture;
- timezone/calendar boundary.

## Timezone

Mọi test liên quan tiết khí hoặc ranh giới ngày phải ghi rõ timezone.

Không phụ thuộc timezone mặc định của runner CI.
