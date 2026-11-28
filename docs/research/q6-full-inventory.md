# Quyển 6 — inventory đầy đủ Nghĩa lệ 4

Status: COMPARED / INVENTORIED

## Mục tiêu

Khóa phạm vi toàn bộ Quyển 6 để phân biệt ba việc khác nhau:

1. factor đã production và có oracle;
2. mục đã hiểu công thức nhưng không thuộc 7 vertical hiện tại;
3. mục chưa thể production vì calendar/context hiện thiếu input mà chính nguồn đòi hỏi.

**Inventory đủ không đồng nghĩa implement toàn bộ Quyển 6.** Activity engine vẫn bám exact Dụng sự Q11 + Nghi kị Q10; không tự đưa một thần Q6 vào kết luận chỉ vì mục Nghĩa lệ gọi nó cát/hung.

## Nguồn

- Việt: Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 6, trang in 474–563 (working scan PDF 481–570 đã mở trực tiếp).
- Hán: Kanripo `KR3g0051_006.txt`, revision pin của repo, `WYG_006-1a..76a`.
- Oracle phụ: Q9 `KR3g0051_009.txt` cho Thượng Sóc, Phản Chi, Tứ Ly/Tứ Tuyệt, Khí Vãng Vong.
- Exact activity dependency: Q11 fixture `han-q11-oracle.spec.ts` cho 7 vertical production.

## Inventory 40 mục

|   # | Mục Q6                        | Research      | Product hiện tại   | Ghi chú                                                                             |
| --: | ----------------------------- | ------------- | ------------------ | ----------------------------------------------------------------------------------- |
|   1 | Tam Hợp / 三合                | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|   2 | Lâm Nhật / 臨日               | COMPARED      | OUT_OF_SCOPE       | tháng→chi ngày rõ; không có trong 7 exact Q11 vertical                              |
|   3 | Dịch Mã / 驛馬〈天后〉        | ORACLE_TESTED | IMPLEMENTED        | Thiên Hậu là tên cùng vị trí trong mục này                                          |
|   4 | Kiếp Sát / 劫煞               | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|   5 | Tai Sát / 災煞〈天火〉        | ORACLE_TESTED | IMPLEMENTED        | sách sửa Thiên Hỏa theo cùng vị trí; không tạo Thiên Ngục riêng                     |
|   6 | Nguyệt Sát / 月煞〈月虚〉     | ORACLE_TESTED | IMPLEMENTED        | Nguyệt Hư là cùng vị trí                                                            |
|   7 | Nguyệt Hình / 月刑            | ORACLE_TESTED | IMPLEMENTED        | explicit lookup                                                                     |
|   8 | Nguyệt Hại / 月害             | ORACLE_TESTED | IMPLEMENTED        | Lục Hại                                                                             |
|   9 | Đại Thời / 大時〈大敗、咸池〉 | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|  10 | Du Họa / 遊禍                 | COMPARED      | OUT_OF_SCOPE       | Giêng khởi Tỵ, nghịch tứ mạnh; không có trong 7 exact Q11 vertical                  |
|  11 | Thiên Lại / 天吏〈致死〉      | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|  12 | Lục Hợp / 六合〈無翹〉        | ORACLE_TESTED | IMPLEMENTED        | sách bác kiêng cưới theo tên Vô Kiều                                                |
|  13 | Binh Cát / 兵吉               | COMPARED      | OUT_OF_SCOPE       | thần dụng binh; product không có military vertical                                  |
|  14 | Ngũ Phú / 五富                | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|  15 | Thiên Thương / 天倉           | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|  16 | Thiên Tặc / 天賊              | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|  17 | Yếu An / 要安                 | COMPARED      | OUT_OF_SCOPE       | monthly factor; không có trong 7 exact Q11 vertical                                 |
|  18 | Ngọc Vũ / 玉宇                | COMPARED      | OUT_OF_SCOPE       | Việt p513; monthly factor                                                           |
|  19 | Kim Đường / 金堂              | COMPARED      | OUT_OF_SCOPE       | monthly factor                                                                      |
|  20 | Kính An / 敬安                | COMPARED      | OUT_OF_SCOPE       | Việt p515; monthly factor                                                           |
|  21 | Phổ Hộ / 普護                 | COMPARED      | OUT_OF_SCOPE       | monthly factor                                                                      |
|  22 | Phúc Sinh / 福生              | COMPARED      | OUT_OF_SCOPE       | Việt p517; monthly factor                                                           |
|  23 | Thánh Tâm / 聖心              | COMPARED      | OUT_OF_SCOPE       | monthly factor                                                                      |
|  24 | Ích Hậu / 益後                | COMPARED      | OUT_OF_SCOPE       | monthly factor                                                                      |
|  25 | Tục Thế / 續世〈血忌〉        | COMPARED      | OUT_OF_SCOPE       | monthly factor; Huyết Kị là tên gắn trong mục                                       |
|  26 | Cửu Thần Tổng Luận / 九神總論 | COMPARED      | META               | đoạn luận chung Yếu An→Tục Thế, không phải factor thứ mười                          |
|  27 | Dương Đức / 陽徳              | COMPARED      | OUT_OF_SCOPE       | Việt p527; monthly Nạp Giáp sequence                                                |
|  28 | Âm Đức / 陰徳                 | COMPARED      | OUT_OF_SCOPE       | Việt p529; monthly Nạp Giáp sequence                                                |
|  29 | Thiên Mã / 天馬               | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|  30 | Binh Cấm / 兵禁               | COMPARED      | OUT_OF_SCOPE       | Việt p535; military-only                                                            |
|  31 | Địa Nang / 地囊               | ORACLE_TESTED | IMPLEMENTED        | dùng bảng đính chính, không dùng 歴例 sai 23/48 chữ                                 |
|  32 | Thổ Phù / 土符                | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|  33 | Đại Sát / 大煞                | COMPARED      | OUT_OF_SCOPE       | Việt p545; không có trong 7 exact Q11 vertical                                      |
|  34 | Quy Kị / 歸忌                 | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle; sách bác mở rộng kị cưới                                      |
|  35 | Vãng Vong / 往亡              | ORACLE_TESTED | IMPLEMENTED        | Q6 production oracle                                                                |
|  36 | Khí Vãng Vong / 氣往亡        | COMPARED      | OUT_OF_SCOPE       | offset ngày sau 12 tiết; Việt p553–555; không có exact Q11 dependency hiện tại      |
|  37 | Thượng Sóc / 上朔             | ORACLE_TESTED | IMPLEMENTED_FACTOR | Can năm đã đi vào factor context; lookup 10 Can năm → Can Chi ngày                  |
|  38 | Phản Chi / 反支               | ORACLE_TESTED | IMPLEMENTED_FACTOR | dùng chi ngày sóc + ngày âm 1..6 từ astronomical new-moon civil date                |
|  39 | Tứ Ly / 四離; Tứ Tuyệt / 四絶 | COMPARED      | OUT_OF_SCOPE       | ngày trước phân/chí và tứ lập; calendar có tiết khí nhưng 7 Q11 vertical không dùng |
|  40 | Ngày Nguyệt Kị / 月忌日       | ORACLE_TESTED | IMPLEMENTED_FACTOR | mồng 5/14/23 từ lunar-day primitive; không blanket veto                             |

## Các công thức đã khóa nhưng chưa production

### Lâm Nhật

Hán Q6 cho bảng tháng trực tiếp (`正月午...`). Có thể encode bằng `chiThang → chiNgay`, nhưng không xuất hiện trong exact Q11 của 7 vertical hiện tại nên không thêm vào engine chỉ để tăng số lượng thần sát.

### Du Họa

`正月起巳逆行四孟`: Giêng khởi Tỵ, nghịch bốn mạnh. Công thức đủ rõ, nhưng không có dependency current vertical.

### Nhóm Cửu Thần

Yếu An, Ngọc Vũ, Kim Đường, Kính An, Phổ Hộ, Phúc Sinh, Thánh Tâm, Ích Hậu, Tục Thế đều có lịch lệ tháng→chi rõ. `九神總論` là phần luận chung, không phải calculator riêng.

Bản Việt exact scan đã mở trực tiếp các trang Ngọc Vũ p513, Kính An p515, Phúc Sinh p517 và phần tổng luận; Hán Q6 khớp cấu trúc.

### Dương Đức / Âm Đức

Hai mục dùng Nạp Giáp của Càn/Khôn đi theo tháng. Công thức có thể encode nhưng không phải dependency Q11 hiện tại.

### Khí Vãng Vong

Nguồn khóa các offset tính từ ngày giao tiết:

- Lập Xuân +7; Kinh Trập +14; Thanh Minh +21;
- Lập Hạ +8; Mang Chủng +16; Tiểu Thử +24;
- Lập Thu +9; Bạch Lộ +18; Hàn Lộ +27;
- Lập Đông +10; Đại Tuyết +20; Tiểu Hàn +30.

Bản Việt p553–555 và Hán `WYG_006-67b..69a` khớp. Có thể xây từ solar-term instant, nhưng không có current Q11 dependency.

### Thượng Sóc

Q9/Hán khóa theo Can năm:

- Giáp→Quý Hợi; Ất→Kỷ Tỵ; Bính→Ất Hợi; Đinh→Tân Tỵ; Mậu→Đinh Hợi;
- Kỷ→Quý Tỵ; Canh→Kỷ Hợi; Tân→Ất Tỵ; Nhâm→Tân Hợi; Quý→Đinh Tỵ.

Bản Việt p556–557 khớp đồ hình. Production factor context hiện mang Can Chi năm theo Lập Xuân; `THUONG_SOC` được emit trực tiếp từ mapping này.

### Phản Chi

Nguồn dùng **chi của ngày sóc** làm gốc:

- Tuất/Hợi sóc → mồng 1;
- Thân/Dậu → mồng 2;
- Ngọ/Mùi → mồng 3;
- Thìn/Tỵ → mồng 4;
- Dần/Mão → mồng 5;
- Tý/Sửu → mồng 6.

Bản Việt p558–559 và Hán `WYG_006-72b..73a` khớp. Calendar nay có astronomical new-moon primitive và lấy **ngày dân sự địa phương chứa sóc** làm mồng 1, nên `PHAN_CHI` đã được emit an toàn.

### Tứ Ly / Tứ Tuyệt

- Tứ Ly: ngày trước Đông Chí, Hạ Chí, Xuân Phân, Thu Phân.
- Tứ Tuyệt: ngày trước Lập Xuân, Lập Hạ, Lập Thu, Lập Đông.

Việt p560–561 và Hán `WYG_006-74a..74b` khớp. Calendar hiện có solar-term instant nên kỹ thuật có thể làm, nhưng exact Q11 của 7 vertical không dùng hai mục này.

### Ngày Nguyệt Kị

Bản Việt p562–563 và Hán `WYG_006-74b..76a` cùng ghi tục lấy **mồng 5, 14, 23 âm lịch**. `NGUYET_KY` nay được emit từ lunar-day primitive nhưng vẫn chỉ là factor/source marker; không tự trở thành blanket veto.

## Product policy

- 21 factor Q6 hiện production-computable và có oracle/test độc lập, gồm cả Thượng Sóc, Phản Chi, Nguyệt Kị.
- Ba factor mới chỉ đi vào factor engine; không tự thay đổi 7 activity vertical nếu exact Q11/Q10 không dùng chúng.
- Không thêm các mục còn lại vào activity scoring nếu exact Q11/Q10 không cần.
- `OUT_OF_SCOPE` nghĩa là công thức đã hiểu nhưng không thuộc current product claim, không phải “không tồn tại”.
- `BLOCKED_*` nghĩa là source đã đủ nhưng current calendar/context contract chưa đủ input.
- Nếu mở activity mới trong Q11 và activity đó gọi một mục Q6 đang out-of-scope, mở research/implementation riêng và dùng công thức đã khóa ở note này.

## Kết luận

**Quyển 6 đã inventory đủ 40/40 mục.** 21 factor hiện production-computable/Hán-oracle; phần còn lại có trạng thái explicit. Thượng Sóc/Phản Chi/Nguyệt Kị không còn blocker calendar/context.
