# Quyển 1 — inventory đầy đủ Bản nguyên 1

Status: COMPARED / INVENTORIED / ORACLE_PARTIAL

## Denominator nguồn

- Bản Việt Tập 1: mục lục Quyển 1 tại **PDF 37 / trang in 37**, có **17 mục đánh số**.
- Hán Kanripo `KR3g0051_001.txt`, revision pin: có **28 heading** vì bản Hán tách các tiểu mục trong các mục Việt gộp.
- Hai cấu trúc khớp nội dung. Không được hiểu 28 heading Hán là bản Việt thiếu 11 mục.

## Inventory 17 mục Việt / 28 heading Hán

|   # | Mục Việt / Hán                                                                                    | Trạng thái product             | Ghi chú                                                                                                       |
| --: | ------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
|   1 | Hà Đồ, Lạc Thư, Tiên/Hậu thiên Bát quái và phối Hà/Lạc, Giáp lịch / 河圖・洛書・先後天八卦…・甲歷 | REFERENCE / PARTIAL_FOUNDATION | 11 heading Hán gộp trong một mục Việt; nền quẻ/phương vị, không day factor                                    |
|   2 | 10 Can, 12 Chi, 12 Luật, 28 Xá / 十干 十二支 十二律 二十八舍                                      | PARTIAL_IMPLEMENTED            | Can/Chi là primitive production; 12 Luật/28 Xá chưa phải dependency current verticals                         |
|   3 | Tứ tự, Lục thần / 四序・六辰                                                                      | PARTIAL_IMPLEMENTED            | mùa đang có domain; phần Lục thần giữ reference                                                               |
|   4 | 12 tháng Tích quái / 十二月辟卦                                                                   | OUT_OF_SCOPE                   | quẻ tháng, không current dependency                                                                           |
|   5 | 12 Thần – 28 tú tinh tượng / 十二辰二十八宿星象                                                   | OUT_OF_SCOPE_ASTRONOMY         | stellar reference                                                                                             |
|   6 | 28 tú phối ngày / 二十八宿配日                                                                    | OUT_OF_SCOPE_ASTRONOMY         | chưa dùng trong 15 vertical                                                                                   |
|   7 | Ngũ hành / 五行                                                                                   | PARTIAL_IMPLEMENTED            | quan hệ sinh/khắc được dùng ở personal-year layer; chưa có generic public five-element engine                 |
|   8 | Ngũ hành dụng sự / 五行用事                                                                       | ORACLE_TESTED                  | nguồn Thổ Vượng: bốn kỳ 18 civil days trước bốn Lập                                                           |
|   9 | Ngũ hành sinh vượng / 五行生旺                                                                    | REFERENCE                      | nền trạng thái sinh-vượng; không current standalone calculator                                                |
|  10 | Can Chi ngũ hành / 干支五行                                                                       | PARTIAL_IMPLEMENTED            | dùng trong các quan hệ Can/Chi/mệnh; không expose như factor riêng                                            |
|  11 | Tam Hợp / 三合                                                                                    | IMPLEMENTED_FOUNDATION         | quan hệ tam hợp được dùng ở selected-hour/factor semantics; không đồng nhất với Q6 `TAM_HOP` monthly position |
|  12 | Lục Hợp / 六合                                                                                    | IMPLEMENTED_FOUNDATION         | quan hệ lục hợp dùng ở hour/activity semantics; Q6 `LUC_HOP` là monthly day-factor identity riêng             |
|  13 | Ngũ Thử Độn / 五鼠遁                                                                              | ORACLE_TESTED                  | tính Can giờ từ Can ngày (`tinhCanChiGio`)                                                                    |
|  14 | Ngũ Hổ Độn / 五虎遁                                                                               | ORACLE_TESTED                  | tính Can tháng từ Can năm (`tinhCanChiThang`)                                                                 |
|  15 | Ngũ Hợp hóa khí / 五合化氣                                                                        | REFERENCE                      | chưa có current product dependency độc lập                                                                    |
|  16 | Nạp âm / 納音                                                                                     | REFERENCE                      | xuất hiện trong niên/nguyệt biểu, chưa dùng làm universal day factor                                          |
|  17 | Nạp giáp / 納甲                                                                                   | BLOCKED_SPATIAL_TRIGRAM        | nền cho Q2/Q3/Q8; cần quẻ/phương vị/spatial domain                                                            |

## Những identity cùng tên nhưng khác layer

`三合` và `六合` ở Q1 là **quan hệ nền**. Q6 có các thần ngày `Tam Hợp`/`Lục Hợp` theo tháng. Code không được reuse một calculator chỉ vì tên Hán giống nhau.

Tương tự, `納甲` Q1 là phép gắn Can/Chi/quẻ dùng mạnh ở spatial layer; không được rút thành một boolean tốt/xấu của ngày.

## Scope đang oracle-tested

- thứ tự Thiên Can / Địa Chi;
- vòng Can Chi và các quan hệ nền dùng trong calendar;
- Ngũ Thử Độn cho giờ;
- Ngũ Hổ Độn cho tháng;
- Thổ Vượng từ `五行用事`.

Các phần còn lại là foundation/reference hoặc blocker theo domain, nên Quyển 1 vẫn `ORACLE_MOT_PHAN`, không full-volume oracle.

## Kết luận

**Quyển 1 đã inventory đủ 17/17 mục Việt, tương ứng 28/28 heading Hán.** Không còn mục Q1 chưa locate; phần chưa production có lý do explicit thay vì bị coi là TODO mơ hồ.
