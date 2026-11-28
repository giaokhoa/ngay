# Quyển 12 — inventory đầy đủ Công quy 1

Status: INVENTORIED / NOT_IMPLEMENTED

## Phạm vi

Quyển 12 không phải Nghĩa lệ chọn ngày. Đây là **Công quy**: nghi lễ triều đình, lịch tục, khí hậu và thiên văn quan trắc.

Nguồn:

- Việt T1: mục lục Quyển 12 tại PDF 870 / trang in 863, đã mở trực tiếp;
- Hán Kanripo `KR3g0051_012.txt`, revision pin, `WYG_012-1a..29b`.

Mục lục Việt 8 mục khớp 8 heading top-level Hán; các heading tế tự/bảng phía sau là tiểu mục, không tăng denominator.

## Inventory 8/8 top-level section

|   # | Section                                                | Product             | Ghi chú                                                                |
| --: | ------------------------------------------------------ | ------------------- | ---------------------------------------------------------------------- |
|   1 | Phép tắc về tế lễ / 祀典                               | OUT_OF_SCOPE        | lịch nghi lễ nhà Thanh/triều đình                                      |
|   2 | Xuân Ngưu Kinh / 春牛經                                | OUT_OF_SCOPE        | tạo Xuân Ngưu/Mang thần theo năm, ngày Lập Xuân và vật liệu/màu sắc    |
|   3 | Ghi việc hàng năm / 歲時紀事                           | OUT_OF_SCOPE        | tục lệ và mốc năm như xã nhật, tam phục, mai thiên                     |
|   4 | Khí hậu / 氣候                                         | REFERENCE_ONLY      | 72 hậu theo 24 tiết khí; không phải weather forecast hiện đại          |
|   5 | Đường Mặt Trời vận hành qua các cung / 日躔過宮        | REFERENCE_ASTRONOMY | Mặt Trời qua cung theo trung khí                                       |
|   6 | Thời khắc Mặt Trời xuất nhập ngày đêm / 日出入晝夜時刻 | REFERENCE_METHOD    | phương pháp + bảng **Kinh sư**; không được dùng trực tiếp cho Việt Nam |
|   7 | Phương vị Mặt Trời xuất nhập / 日出入方位              | REFERENCE_METHOD    | phương vị mọc/lặn theo vĩ độ; bảng in tính cho Kinh sư                 |
|   8 | Giới hạn mông ảnh / 朦影限                             | REFERENCE_METHOD    | twilight 18°, thời lượng phụ thuộc mùa và vĩ độ; bảng Kinh sư          |

## Quan hệ với blocker Q7

Quyển 7 yêu cầu phân ngày/đêm Thiên Ất bằng **mặt trời mọc/lặn thực tế**. Quyển 12 xác nhận cách hiểu đó nhưng cũng chặn shortcut dùng bảng cố định:

- `WYG_012-16a..16b`: người ở Nam/Bắc khác nhau thì giờ mọc/lặn khác nhau;
- sách ghi **Kinh sư Bắc cực xuất địa 39°55′** rồi mới lập bảng phía sau;
- các tỉnh khác phải dùng độ cao cực/vĩ độ địa phương + xích vĩ Mặt Trời để tính lại (`各省日出入時刻不同`).

Vì vậy bảng Q12 **không mở khóa production Q7** khi API chưa nhận vị trí địa lý. Timezone `Asia/Ho_Chi_Minh` không đủ để suy sunrise/sunset.

## Kết luận

**Quyển 12 đã inventory đủ 8/8 top-level section.** Giữ `CHUA_IMPLEMENT`; các phần thiên văn là reference/method, không phải oracle cho 7 activity hiện tại.
