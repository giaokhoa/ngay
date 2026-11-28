# Quyển 3 — inventory đầy đủ Nghĩa lệ 1

Status: COMPARED / INVENTORIED / NOT_IMPLEMENTED

## Mục tiêu

Khóa phạm vi toàn bộ Quyển 3 mà **không biến thần sát phương vị theo năm thành day factor**.

Quyển 3 là lớp annual/spatial: nguồn lặp lại các cụm `所理之地`, `所理之方`, `不可向之`, tức vị trí/phương hướng theo Can Chi năm. Calendar core đã tính được Can Chi năm theo Lập Xuân, nhưng factor/evaluation context hiện chỉ có tháng/ngày/Thổ Vượng, không có hướng tọa-hướng hay spatial target.

Do đó trạng thái book-level vẫn là `CHUA_IMPLEMENT`. Inventory đủ không được dùng để nâng giả thành `ORACLE_MOT_PHAN`.

## Nguồn

- Việt: Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 3, PDF 209–301 / trang in 207–294; mục lục scan p207–208 đã mở trực tiếp.
- Hán: Kanripo `KR3g0051_003.txt`, revision pin, `WYG_003`.
- Hai mục lục khớp **36 mục đánh số**. Hán còn có một `總論` kết quyển không đánh số, ghi riêng dưới đây như closing meta.

## Inventory 36 mục đánh số

|   # | Mục Q3                                                   | Research | Product hiện tại        | Lý do                                                                       |
| --: | -------------------------------------------------------- | -------- | ----------------------- | --------------------------------------------------------------------------- |
|   1 | Tổng luận / 總論                                         | COMPARED | META                    | nguyên tắc chung, không calculator                                          |
|   2 | Tuế Đức / 歲德                                           | COMPARED | BLOCKED_SPATIAL_CONTEXT | theo Can năm, `所理之地`                                                    |
|   3 | Tuế Đức Hợp / 歲德合                                     | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual stem direction                                                       |
|   4 | Tuế Can Hợp / 歲幹合                                     | COMPARED | BLOCKED_SPATIAL_CONTEXT | source nói phương có thể tu tạo, cưới, đi xa                                |
|   5 | Tuế Chi Đức / 歲枝德                                     | COMPARED | BLOCKED_SPATIAL_CONTEXT | vị trí theo chi năm + can hợp                                               |
|   6 | Thái Tuế / 太歲                                          | COMPARED | BLOCKED_SPATIAL_CONTEXT | phương Thái Tuế, kị xâm phạm/hướng tới                                      |
|   7 | Tuế Phá〈Đại Hao〉 / 歲破〈大耗〉                        | COMPARED | BLOCKED_SPATIAL_CONTEXT | phương xung Thái Tuế; Đại Hao là cùng lớp annual                            |
|   8 | Đại Tướng Quân / 大將軍                                  | COMPARED | BLOCKED_SPATIAL_CONTEXT | phương vị theo năm, quân sự/tu tạo                                          |
|   9 | Tấu Thư / 奏書                                           | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction                                                            |
|  10 | Bác Sĩ / 博士                                            | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction, đối Tấu Thư                                               |
|  11 | Lực Sĩ / 力士                                            | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction                                                            |
|  12 | Tằm Thất / 蠶室                                          | COMPARED | OUT_OF_SCOPE_VERTICAL   | phương vị nuôi tằm; current product không có sericulture vertical           |
|  13 | Tằm Quan / 蠶官                                          | COMPARED | OUT_OF_SCOPE_VERTICAL   | phương vị nuôi tằm                                                          |
|  14 | Tằm Mệnh / 蠶命                                          | COMPARED | OUT_OF_SCOPE_VERTICAL   | phương vị nuôi tằm                                                          |
|  15 | Tang Môn / 喪門                                          | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction; không đồng nhất với activity An táng                      |
|  16 | Thái Âm〈Điếu Khách〉 / 太陰〈弔客〉                     | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction; Điếu Khách cùng lớp                                       |
|  17 | Quần Xú / 羣醜                                           | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction                                                            |
|  18 | Quan Phù〈Súc Quan〉 / 官符〈畜官〉                      | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction; không phải Q4 Quan Phù day identity                       |
|  19 | Bạch Hổ / 白虎                                           | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction; không nhập với tên trùng ở lớp khác                       |
|  20 | Hoàng Phan / 黃幡                                        | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction                                                            |
|  21 | Báo Vĩ / 豹尾                                            | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction; sách nói nhiều năm trùng vị trí thần khác                 |
|  22 | Bệnh Phù / 病符                                          | COMPARED | BLOCKED_SPATIAL_CONTEXT | thường ở sau Thái Tuế một辰                                                 |
|  23 | Tử Phù〈Tiểu Hao〉 / 死符〈小耗〉                        | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual layer; không reuse Q4 `TIEU_HAO`                                     |
|  24 | Kiếp Sát / 劫煞                                          | COMPARED | BLOCKED_SPATIAL_CONTEXT | **annual** Kiếp Sát; không reuse Q6 month→day Kiếp Sát                      |
|  25 | Tai Sát / 災煞                                           | COMPARED | BLOCKED_SPATIAL_CONTEXT | **annual** Tai Sát; không reuse Q6 day factor                               |
|  26 | Tuế Sát / 歲煞                                           | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual Tam Sát direction                                                    |
|  27 | Phục Binh – Đại Họa / 伏兵 大禍                          | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual 五兵, thiên về phương quân sự                                        |
|  28 | Ngũ Binh Tổng Đồ / 五兵總圖                              | COMPARED | META                    | đồ tổng hợp Phục Binh/Đại Họa/Tam Sát                                       |
|  29 | Tuế Hình / 歲刑                                          | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction; nguồn nêu chiến trận + động thổ                           |
|  30 | Đại Sát / 大煞                                           | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual identity; không nhập với Q6 `大煞` cùng tên                          |
|  31 | Phi Liêm / 飛廉                                          | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction, còn gọi Đại Sát trong một truyền thống                    |
|  32 | Kim Thần / 金神                                          | COMPARED | BLOCKED_SPATIAL_CONTEXT | directional annual metal-spirit layer                                       |
|  33 | Ngũ Quỷ / 五鬼                                           | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction                                                            |
|  34 | Phá Bại Ngũ Quỷ / 破敗五鬼                               | COMPARED | BLOCKED_SPATIAL_CONTEXT | annual direction theo quái/nạp can                                          |
|  35 | Ngày xuất du của Thái Tuế trở xuống / 太歲已下神煞出遊日 | COMPARED | BLOCKED_TIME_SPATIAL    | lịch ngày các thần annual rời/trở vị trí; cần spatial target + day schedule |
|  36 | Ngày Du Thần / 日遊神                                    | COMPARED | BLOCKED_TIME_SPATIAL    | phương du thần theo ngày; nguồn áp cho sản thất/giường/đi đường             |

### Closing `總論` không đánh số

Hán bản có một `總論` cuối quyển sau `日遊神`; bản Việt mục lục không đánh thành mục 37. Đây là closing meta, không tăng denominator 36.

## Các namespace collision phải giữ riêng

Q3 có nhiều tên trùng lớp đã production nhưng **không cùng calculator**:

- `劫煞`, `災煞`: Q3 là annual spatial; Q6 production là month→day factor.
- `小耗`: Q3 gắn `死符` annual; Q4 production `TIEU_HAO` là identity đồng vị với Trực Chấp.
- `官符`: Q3 annual spatial; Q4 production Quan Phù là identity đồng vị Trực Định.
- `大煞`: Q3 annual; Q6 cũng có mục `大煞` theo tháng/ngày nhưng current product không implement mục Q6 đó.

Không được “tái sử dụng” `MaYeuTo` chỉ vì Hán tự giống nhau.

## Vì sao Q3 chưa production

### Calendar không phải blocker chính

`TinhLichService.tinhCanChiNamTaiThoiDiem()` đã tính Can Chi năm theo Lập Xuân. Nghĩa là engine **không thiếu year calendar primitive**.

### Blocker thật là spatial/product contract

Current contracts:

- `BoiCanhTinhYeuToNgay`: `chiThang`, `canNgay`, `chiNgay`, `dangThoVuong`;
- `BoiCanhDanhGiaNgay`: thêm `truc`, `yeuTo`;
- không có tọa/hướng, phương đích, hướng khởi hành, vị trí công trình hoặc orientation.

Q3 lại chủ yếu nói `方/地/向`. Nếu chỉ thêm Can/Chi năm vào factor context rồi emit “THÁI TUẾ = Kị ngày” sẽ làm sai loại dữ liệu.

## Quan hệ với 26 vertical hiện tại

Q10/Q11 có các tên trùng như `劫煞`, `災煞`, `小耗`, `大煞`, nhưng current production mappings của chúng thuộc Q4/Q5/Q6 month/day layers. Không có `MaYeuTo` Q3-specific như Thái Tuế/Tuế Phá/Tuế Đức annual direction trong exact 26 vertical hiện tại.

Khi product mở **direction-aware** selection, Q3 phải được thiết kế thành spatial layer riêng trước khi nối vào activity semantics.

## Kết luận

**Quyển 3 đã inventory đủ 36/36 mục đánh số + closing Tổng luận không đánh số.** Book-level status vẫn `CHUA_IMPLEMENT` có chủ ý: source đã hiểu phạm vi, nhưng current product contract không biểu diễn đúng loại dữ liệu phương vị theo năm.
