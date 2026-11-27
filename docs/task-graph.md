# Task Graph

Đây là thứ tự phụ thuộc cấp cao để Agent không làm task về sau trước khi nền tảng đã được xác minh.

## Graph

```text
Phase 0 Foundation
        |
        v
#1 Research calendar foundation
        |
        v
#2 Implement verified calendar foundation
        |
        v
#11 Phase 2A.1 Research core monthly factors (Quyển 6)
        |
        v
#12 Phase 2B.1 Implement VERIFIED Quyển 6 subset + oracle
        |
        +-------------------------+
        |                         |
        v                         v
#13 Research Quyển 5         #14 Research Quyển 4
virtue/special days          aliases/Bất Tương
        |                         |
        +------------+------------+
                     |
                     v
Phase 2B.2/2B.3 Implement only VERIFIED subsets
                     |
                     v
Phase 3A Research one activity from Dung su
        |
        v
Phase 3B One activity end-to-end
        |
        v
Phase 4 Research + implement Nghi ky / conflict / exceptions
        |
        v
Phase 5 Expand activity coverage
        |
        v
Phase 6 Production hardening
```

## Gate rules

### Gate A - Research -> implementation

Implementation task chỉ được mở khóa khi:

- research note có đủ source;
- research-index đánh dấu VERIFIED;
- câu hỏi ảnh hưởng thuật toán đã được giải quyết hoặc tách rõ khỏi scope.

### Gate B - Implementation -> next domain layer

Không xây factors khi calendar primitive còn chưa ổn định.

Không xây activity evaluation bằng dữ liệu giả chỉ để demo.

Không xây ranking/UI semantics trước khi kết luận nội bộ có representation rõ.

### Gate C - CI

Mọi PR phải qua Verify:

- frozen install;
- formatting;
- lint;
- typecheck;
- unit test;
- production build.

### Gate D - Oracle

Một nhóm rule có bảng đối chiếu trong sách chưa được coi là hoàn tất nếu chưa có oracle test hợp lý.

## Issue dependency convention

Trong body issue dùng rõ:

- Blocked by #N
- Blocks #N
- Source prerequisite
- Research prerequisite

Nếu issue đang blocked:

- gắn status:blocked-source nếu thiếu nguồn;
- không implement workaround đoán.

## Agent scheduling

Ưu tiên một chuỗi dependency rõ hơn nhiều Agent cùng sửa cùng layer.

Có thể chạy song song khi phạm vi độc lập, ví dụ:

- một Agent research nguồn;
- một Agent chuẩn bị test harness không chứa expected nghiệp vụ;
- một Agent làm frontend shell không tự tính rule.

Không chạy song song hai Agent cùng tự định nghĩa một domain concept chưa có ADR/schema chung.
