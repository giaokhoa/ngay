# Source Policy

## Mục tiêu

Engine phải truy được từ kết quả về quy tắc và từ quy tắc về nguồn.

## Nguồn chính

### Bản Việt

Bộ Hiệp Kỷ Biện Phương Thư trọn bộ 2 tập do người dùng cung cấp là nguồn chính để:

- chuẩn hóa thuật ngữ Hán-Việt;
- hiểu cách trình bày dành cho tiếng Việt;
- đối chiếu bảng và quy tắc;
- viết giải thích dễ hiểu cho người dùng.

Không chép văn sách dài vào UI. UI phải diễn giải ngắn, rõ nghĩa và không thay đổi logic.

### Hán bản

Hán bản dùng để:

- kiểm tra nguyên văn;
- xác minh chỗ bản Việt mơ hồ;
- phân biệt thuật ngữ gần nghĩa;
- kiểm tra công thức, bảng và ngoại lệ.

### Wikisource và nguồn số hóa

Chỉ dùng như công cụ tra cứu nhanh để tìm quyển/đoạn Hán văn hoặc đối chiếu text.

Không coi transcription web là bằng chứng cuối cùng nếu có thể kiểm tra ảnh scan/bản gốc.

## Nguồn ngoài

Không đưa Ngọc Hạp, Đổng Công, lịch vạn niên hiện đại, blog, app khác hoặc trường phái khác vào engine mặc định.

Nguồn ngoài chỉ được dùng:

- để nghiên cứu cách triển khai kỹ thuật;
- để phát hiện câu hỏi cần kiểm chứng;
- hoặc khi có ADR riêng chấp thuận mở rộng nguồn.

## Provenance bắt buộc

Mỗi rule nghiệp vụ nên lưu tối thiểu:

- mã nguồn;
- tập/quyển;
- trang hoặc section khi xác định được;
- thuật ngữ gốc nếu cần;
- ghi chú đối chiếu;
- mức tin cậy/xác minh.

Ví dụ khái niệm:

```ts
interface ThamChieuNguon {
  nguon: 'BAN_VIET' | 'HAN_BAN';
  tap?: number;
  quyen: number;
  trang?: number;
  muc?: string;
  nguyenVan?: string;
  ghiChu?: string;
}
```

Đây là contract định hướng; schema thực tế có thể thay đổi bằng ADR.

## Khi hai bản khác nhau

Không tự chọn bản thuận tiện hơn.

Quy trình:

1. ghi lại khác biệt;
2. kiểm tra Hán bản;
3. kiểm tra ngữ cảnh trước/sau;
4. kiểm tra bảng thực hành liên quan;
5. ghi quyết định và lý do;
6. thêm test cho trường hợp phân biệt.

Nếu vẫn chưa chắc, giữ task ở trạng thái research.
