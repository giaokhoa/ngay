# Quyển 2 — inventory đầy đủ Bản nguyên 2

Status: INVENTORIED / NOT_IMPLEMENTED

## Phạm vi

Quyển 2 là nền **24 sơn / ngũ hành địa lý / biến quẻ / khắc sơn**. Output của phần lớn phép là sơn, hướng, quẻ hoặc tương tác giữa năm-tháng và **sơn gia**, không phải boolean tốt/xấu của một ngày độc lập.

Nguồn:

- Việt T1: mục lục Quyển 2 tại PDF 147 / trang in 146; thân quyển từ PDF 148 đến trước Quyển 3 (PDF 209 / trang in 207), đã mở trực tiếp mục lục và các trang đồ hình/giải thích;
- Hán Kanripo `KR3g0051_002.txt`, revision pin, `WYG_002-1a..54b`;
- current product chưa có tọa sơn/hướng/24-sơn target.

## Inventory 12/12

|   # | Section                                         | Product                    | Ghi chú / blocker                                                          |
| --: | ----------------------------------------------- | -------------------------- | -------------------------------------------------------------------------- |
|   1 | Nhị thập tứ phương vị / 二十四方位              | BLOCKED_SPATIAL_DOMAIN     | định nghĩa 24 sơn bằng 4 duy + 8 can + 12 chi; sơn luôn kéo theo hướng đối |
|   2 | Chính Ngũ Hành / 正五行                         | BLOCKED_SPATIAL_DOMAIN     | ngũ hành của 24 sơn/phương, không phải ngũ hành Can-Chi ngày               |
|   3 | Trung châm Song Sơn Ngũ Hành / 中針雙山五行     | BLOCKED_COMPASS_MODEL      | trung châm lệch nửa vị, dùng cách long                                     |
|   4 | Phùng châm Tam Hợp Ngũ Hành / 縫針三合五行      | BLOCKED_COMPASS_MODEL      | phùng châm lệch nửa vị phía sau, dùng tiêu sa nạp thủy                     |
|   5 | Hồng Phạm Ngũ Hành / 洪範五行                   | BLOCKED_SPATIAL_DOMAIN     | hệ ngũ hành 24 sơn khác Chính Ngũ Hành                                     |
|   6 | Mộ Long biến vận / 墓龍變運                     | BLOCKED_SPATIAL_TIME       | vận của long/mộ theo chu kỳ; cần sơn/long target                           |
|   7 | Niên Nguyệt khắc Sơn Gia / 年月尅山家           | BLOCKED_SPATIAL_YEAR_MONTH | cần năm-tháng **và sơn gia**; không được biến thành blocker ngày chung     |
|   8 | Nhị thập tứ tiết khí phương vị / 二十四節氣方位 | BLOCKED_SPATIAL_SOLAR      | ánh xạ 24 tiết khí vào phương vị; output spatial                           |
|   9 | Bát quái Nạp Giáp Tam Hợp / 八卦納甲三合        | BLOCKED_TRIGRAM_DOMAIN     | nền cho các phép quẻ/sơn Q8                                                |
|  10 | Tiểu Du Niên biến quẻ / 小遊年變卦              | BLOCKED_TRIGRAM_DOMAIN     | biến quẻ theo hệ địa lý                                                    |
|  11 | Đại Du Niên biến quẻ / 大遊年變卦               | BLOCKED_TRIGRAM_DOMAIN     | hệ tương trạch âm-dương phối quẻ                                           |
|  12 | Du Niên biến quẻ đồ / 遊年變卦圖                | META_SPATIAL               | đồ hình tổng hợp cho hai phép biến quẻ                                     |

## Ranh giới với calendar hiện tại

Repo đã có Can-Chi, tiết khí, ngũ hành dùng cho calendar/date-selection. Không được tái sử dụng một cách mơ hồ cho Q2:

- `正五行` Q2 là **ngũ hành sơn/phương**;
- `年月尅山家` cần target sơn gia, không chỉ year/month;
- `二十四節氣方位` là phương vị của tiết khí, không phải month-boundary calculator;
- trung châm/phùng châm là hệ la bàn địa lý, không phải timezone/location.

## Kết luận

**Quyển 2 đã inventory đủ 12/12 section.** Giữ `CHUA_IMPLEMENT`: nguồn đầy đủ nhưng current product thiếu spatial/compass/trigram target model.
