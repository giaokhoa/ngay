# Quyển 8 — inventory đầy đủ Nghĩa lệ 6

Status: INVENTORIED / NOT_IMPLEMENTED

## Phạm vi

Quyển 8 là lớp **phi cung / sơn phương / tọa hướng / Cửu cung** nâng cao. Đây không phải danh sách day-factor có thể gắn vào kết quả ngày hiện tại.

Nguồn:

- Việt T1, Quyển 8: working scan PDF 635–716, đã mở trực tiếp toàn dải contact sheet và các đồ hình;
- Hán Kanripo `KR3g0051_008.txt`, revision pin, `WYG_008-1a..`;
- current product chưa có tọa/hướng/24 sơn/Cửu cung target.

## Inventory 22/22

|   # | Mục Việt / Hán                         | Trạng thái product                               | Blocker chính                                                      |
| --: | -------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
|   1 | Tuế Lộc – Phi Thiên Lộc / 歲禄・飛天禄 | BLOCKED_SPATIAL_YEAR / BLOCKED_NINE_PALACE       | bản Việt gộp 1 mục; Hán tách 2 heading; đều cho output phương/cung |
|   2 | Phi Thiên Mã / 飛天馬                  | BLOCKED_NINE_PALACE                              | phi Mã qua cung/sơn                                                |
|   3 | Phi Cung Quý Nhân / 飛宫貴人           | BLOCKED_NINE_PALACE                              | Can-Chi năm + tháng + cung                                         |
|   4 | Thông Thiên Khiếu / 通天竅             | BLOCKED_SPATIAL                                  | 8 can 4 duy / song sơn, tu tạo–táng–lập hướng                      |
|   5 | Tẩu Mã Lục Nhâm / 走馬六壬             | BLOCKED_SPATIAL                                  | 12 tướng + sơn/phương                                              |
|   6 | Tứ Lợi – Tam Nguyên / 四利三元         | BLOCKED_SPATIAL_YEAR                             | 12 phương quanh Thái Tuế, hợp các niên thần khác                   |
|   7 | Cái Sơn – Hoàng Đạo / 葢山黄道         | BLOCKED_SPATIAL_TRIGRAM                          | quẻ bản cung + Nạp Giáp/tam hợp                                    |
|   8 | Tam Nguyên Cửu Tinh / 三元九星         | BLOCKED_NINE_PALACE                              | năm/tháng nhập trung cung, phi Cửu cung                            |
|   9 | Bát Tiết – Tam Kỳ / 八節三竒           | BLOCKED_NINE_PALACE_TERM                         | 8 tiết + âm/dương độn + Cửu cung + sơn phương                      |
|  10 | Tuần Sơn La Hầu / 巡山羅㬋             | BLOCKED_24_MOUNTAINS                             | kị lập hướng/khai sơn/tu phương theo 24 sơn                        |
|  11 | Tọa Sát – Hướng Sát / 坐煞向煞         | BLOCKED_24_MOUNTAINS                             | cần tọa/hướng, Tam Sát/Phục Binh/Đại Họa                           |
|  12 | Cứu Thoái – Độc Hỏa / 灸退・獨火       | BLOCKED_SPATIAL_YEAR / BLOCKED_TRIGRAM_DIRECTION | bản Việt gộp 1 mục; Hán tách 2 heading                             |
|  13 | Phù Thiên Không Vong / 浮天空亡        | BLOCKED_TRIGRAM_DIRECTION                        | biến quẻ/Nạp Giáp, sơn-hướng                                       |
|  14 | Âm Phủ – Thái Tuế / 隂府太嵗           | BLOCKED_24_MOUNTAINS                             | hóa khí năm khắc hóa khí sơn gia                                   |
|  15 | Thiên Quan Phù / 天官符                | BLOCKED_SPATIAL_YEAR                             | niên-phương                                                        |
|  16 | Phi Thiên Quan Phù / 飛天官符          | BLOCKED_NINE_PALACE                              | phi cung theo tháng/năm                                            |
|  17 | Phi Địa Quan Phù / 飛地官符            | BLOCKED_NINE_PALACE                              | phi cung                                                           |
|  18 | Phi Đại Sát / 飛大煞                   | BLOCKED_NINE_PALACE                              | phi cung                                                           |
|  19 | Tiểu Nguyệt Kiến / 小月建              | BLOCKED_SPATIAL_MONTH                            | nguyệt phương / phi cung, không phải day Nguyệt Kiến Q4            |
|  20 | Đại Nguyệt Kiến / 大月建               | BLOCKED_SPATIAL_MONTH                            | nguyệt phương, không day factor                                    |
|  21 | Bính Đinh Độc Hỏa / 丙丁獨火           | BLOCKED_SPATIAL_TIME                             | can tháng/ngày/giờ chiếu sơn-phương                                |
|  22 | Nguyệt Du Hỏa / 月遊火                 | BLOCKED_SPATIAL_MONTH                            | nguyệt hỏa phi phương                                              |

## Quyết định mô hình

### Không dùng địa chỉ người dùng thay cho “hướng”

Location địa lý không đồng nghĩa tọa/hướng. Dù product sau này có latitude/longitude để tính mặt trời mọc/lặn Q7, Q8 vẫn cần một contract riêng cho:

- tọa sơn;
- hướng;
- phương cần sửa/động thổ/mở cửa/mộ;
- hệ 24 sơn hoặc cung/quẻ tương ứng.

### Cửu cung là state riêng

`三元九星` source có cả năm và tháng nhập trung cung; `飛天禄/馬/貴人` dùng phép phi. Không nên nhét các giá trị này vào `MaYeuTo` day-factor vì output đúng là **cung/phương**, không phải true/false của ngày.

### Các tên gần Q3/Q4 không cùng identity

- `小月建/大月建` Q8 là spatial/month system, không phải `月建` Q4 day factor.
- `飛大煞` Q8 không phải `大煞` Q3/Q6.
- `獨火` Q8 là phương/quẻ, không phải một blocker ngày chung.

## Kết luận

**Quyển 8 đã inventory đủ 22/22 mục đánh số của bản Việt.** Hán có 24 heading vì tách `歲禄/飛天禄` và `灸退/獨火` thành các heading riêng; đây không phải hai mục Việt bị thiếu. Trạng thái quyển vẫn `CHUA_IMPLEMENT`; blocker là thiếu spatial target + Nine-Palace/24-mountain domain, không phải thiếu công thức nguồn.
