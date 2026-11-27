# Research: Tháng theo tiết khí

Status: VERIFIED

## Câu hỏi cần trả lời

Tháng dùng để tính Nguyệt kiến/thần sát bắt đầu theo mùng 1 âm lịch hay theo tiết khí?

## Kết luận

Đối với Nguyệt biểu của Hiệp Kỷ Biện Phương Thư, 12 tháng được neo vào 12 tiết khí “tiết” và Nguyệt kiến tương ứng:

| Tháng | Tiết bắt đầu | Chi tháng / Nguyệt kiến |
| ----- | ------------ | ----------------------- |
| Giêng | Lập Xuân     | Dần                     |
| 2     | Kinh Trập    | Mão                     |
| 3     | Thanh Minh   | Thìn                    |
| 4     | Lập Hạ       | Tỵ                      |
| 5     | Mang Chủng   | Ngọ                     |
| 6     | Tiểu Thử     | Mùi                     |
| 7     | Lập Thu      | Thân                    |
| 8     | Bạch Lộ      | Dậu                     |
| 9     | Hàn Lộ       | Tuất                    |
| 10    | Lập Đông     | Hợi                     |
| 11    | Đại Tuyết    | Tý                      |
| 12    | Tiểu Hàn     | Sửu                     |

Đây là context tháng phải dùng cho rule thần sát theo tháng, không lấy ranh giới mùng 1 âm lịch.

## Bản Việt

Nguồn trực tiếp:

- Hiệp Kỷ Biện Phương Thư, Tập 2.
- Quyển 20, Nguyệt biểu.
- PDF 312 / trang in 311.

Trang mở đầu tháng Giêng ghi:

- “Tiết Lập Xuân tháng Giêng”;
- “Nguyệt kiến tại Dần”;
- đồng thời liệt kê Nguyệt phá tại Thân và các sát theo tháng.

## Hán bản

Nguồn:

- Quyển 20: https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B720
- Quyển 21..31 tiếp tục các tháng sau.

Quyển 20 ghi “立春正月節” và 月建在寅.
Quyển 21 cho tháng hai bắt đầu ở 驚蟄 và 建卯.
Quyển 31 cho tháng mười hai bắt đầu ở 小寒 và 建丑.

Các quyển Nguyệt biểu 20..31 tạo đủ chuỗi 12 tháng.

## Điều quan trọng cho implementation

Ta cần phân biệt hai thứ:

1. Quy tắc nghiệp vụ “tháng nào bắt đầu ở tiết nào” — VERIFIED.
2. Thuật toán thiên văn tính chính xác instant của tiết khí trong UTC/timezone — CHƯA VERIFIED ở note này.

Không được dùng ngày cố định như “Lập Xuân luôn 4/2 lúc 00:00”.

Implementation phải tính/tra instant tiết khí rồi chuyển sang timezone yêu cầu.

## Oracle / fixture

Oracle từ Nguyệt biểu:

- ngay sau Lập Xuân: chiThang = DAN;
- ngay sau Kinh Trập: chiThang = MAO;
- ...
- ngay sau Tiểu Hàn: chiThang = SUU.

Boundary test phải kiểm ngay trước/ngay sau instant giao tiết.

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED cho mapping tiết -> chi tháng
- [ ] VERIFIED cho thuật toán tính instant tiết khí
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
