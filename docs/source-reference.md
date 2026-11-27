# Source Reference Contract

Mục tiêu của source reference là để từ một kết quả nghiệp vụ có thể truy ngược về rule, rồi từ rule về đúng nguồn.

Schema dưới đây là định hướng ban đầu, chưa phải database schema cố định.

```ts
export enum LoaiNguon {
  BAN_VIET = 'BAN_VIET',
  HAN_BAN = 'HAN_BAN',
}

export interface ThamChieuNguon {
  loaiNguon: LoaiNguon;
  tap?: number;
  quyen: number;
  trang?: number;
  muc?: string;

  tenGoc?: string;
  nguyenVanNgan?: string;
  ghiChu?: string;

  daXacMinh: boolean;
}
```

## Nguyên tắc

- Không bắt buộc lưu nguyên văn dài.
- Trang phải là trang thực tế của nguồn được đối chiếu, không ghi số đoán.
- Nếu Wikisource chỉ dùng để locate, ghi nguồn scan/bản gốc ở note nghiên cứu khi có thể.
- Một rule có thể có nhiều ThamChieuNguon.
- daXacMinh chỉ true khi Agent thực sự mở nguồn và kiểm tra.
