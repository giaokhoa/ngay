# Quyển 11 — Dụng sự full inventory

Status: COMPARED / INVENTORIED / ORACLE_PARTIAL

## Denominator thực của quyển

Bản Việt T1 mở Q11 tại **PDF 846 / trang in 839**. Lời mở đầu nói sách hợp ba catalog:

- Ngự dụng: **67 việc**;
- Dân dụng: **37 việc**;
- Thông thư tuyển trạch: **60 việc**.

Ba số này là catalog nguồn **có overlap**, không được cộng thành 164 rule. Sau khi hợp/canonicalize các việc gần nhau, thân quyển có **73 section Dụng sự chi tiết**. Hán `KR3g0051_011.txt` xác nhận 73 heading nội dung từ `祭祀` đến `啓攢` trước trang kết.

Đây là denominator semantic đúng của Q11. List 60 Thông thư không phải full quyển vì sẽ bỏ sót các section như `修宮室` đang được production consume.

## Product policy

- 14 section hiện có vertical production được exact Hán oracle.
- 59 section còn lại là `OUT_OF_SCOPE_CURRENT_VERTICALS`, **không phải chưa locate**.
- Không tự map một việc ngoài scope vào vertical gần tên chỉ để tăng coverage.
- Nếu mở vertical mới, phải research exact Q11 section + Q10 conflict semantics tương ứng trước.

## Inventory 73/73 section canonical

|   # | Section Hán              | Product status                 | Ghi chú                                                    |
| --: | ------------------------ | ------------------------------ | ---------------------------------------------------------- |
|   1 | 祭祀                     | ORACLE_TESTED                  | `TE_TU`; Hán `WYG_011-6a`; Việt p844 thiếu 福生            |
|   2 | 祈福                     | ORACLE_TESTED                  | `CAU_PHUC`; Hán `WYG_011-6a`, Việt p844 khớp direct items  |
|   3 | 求嗣                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|   4 | 上冊進表章〈上冊受封同〉 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|   5 | 上表章                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|   6 | 頒詔                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|   7 | 覃恩肆赦                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|   8 | 施恩封拜〈襲爵受封同〉   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|   9 | 詔命公卿招賢             | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  10 | 舉正直                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  11 | 施恩惠恤孤惸             | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  12 | 宣政事                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  13 | 布政事                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  14 | 行惠愛雪寃枉緩刑獄       | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  15 | 慶賜賞賀                 | ORACLE_TESTED                  | `KHANH_THUONG`; Hán `WYG_011-10a..10b`, Việt p848 exact    |
|  16 | 宴會〈會親友同〉         | ORACLE_TESTED                  | `YEN_HOI`; Hán `WYG_011-10b`, Việt p848 khớp exact         |
|  17 | 入學                     | ORACLE_TESTED                  | `NHAP_HOC`; Hán `WYG_011-10b..11a`, Việt p848 khớp exact   |
|  18 | 冠帶                     | ORACLE_TESTED                  | `QUAN_DAI`; Hán `WYG_011-11a`, Việt p848 có Bế discrepancy |
|  19 | 行幸遣使〈出行同〉       | ORACLE_TESTED                  | `XUAT_HANH`; WYG_011-11a..11b                              |
|  20 | 安撫邊境                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  21 | 選將訓兵                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  22 | 出師                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  23 | 上官赴任                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  24 | 臨政親民                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  25 | 結婚姻                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  26 | 納采問名                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  27 | 嫁娶                     | ORACLE_TESTED                  | `CUOI_HOI`; WYG_011-13a..13b                               |
|  28 | 進人口                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  29 | 般移〈移徙同〉           | ORACLE_TESTED                  | `DI_CHUYEN`; WYG_011-14a                                   |
|  30 | 遠迴                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  31 | 安牀                     | ORACLE_TESTED                  | vertical `AN_GIUONG`; exact Việt p852 + Hán `WYG_011-15a`  |
|  32 | 解除                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  33 | 沐浴                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  34 | 整容剃頭                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  35 | 整手足甲                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  36 | 求醫療病                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  37 | 療目                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  38 | 針刺                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  39 | 裁製〈裁衣同〉           | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  40 | 營建宮室                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  41 | 修宮室                   | ORACLE_TESTED                  | `SUA_CUNG_THAT`; WYG_011-16a                               |
|  42 | 繕城郭                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  43 | 築隄防                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  44 | 興造動土〈修造同〉       | ORACLE_TESTED                  | `DONG_THO`; WYG_011-17a                                    |
|  45 | 豎柱上梁                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  46 | 修倉庫                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  47 | 鼓鑄                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  48 | 苫蓋                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  49 | 經絡                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  50 | 醞釀                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  51 | 開市                     | ORACLE_TESTED                  | `KHAI_TRUONG`; WYG_011-18b                                 |
|  52 | 立券交易                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  53 | 納財                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  54 | 開倉庫出貨財             | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  55 | 修置産室                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  56 | 開渠穿井                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  57 | 安碓磑                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  58 | 補垣塞穴                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  59 | 掃舍宇                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  60 | 修飾垣墻                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  61 | 平治道塗                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  62 | 破屋壊垣                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  63 | 伐木                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  64 | 捕捉                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  65 | 畋獵                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  66 | 取魚                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  67 | 乘船渡水                 | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  68 | 栽種                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  69 | 牧養                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  70 | 納畜                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  71 | 破土                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |
|  72 | 安葬                     | ORACLE_TESTED                  | `AN_TANG`; WYG_011-25b..26a                                |
|  73 | 啓攢                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current product vertical                       |

## Cross-catalog nuance

Current 14 vertical không phải đều đến từ list 60 Thông thư:

- `行幸遣使〈出行同〉`, `嫁娶`, `般移〈移徙同〉`, `興造動土〈修造同〉`, `開市`, `安葬` đều có canonical detailed section;
- `修宮室` là section riêng trong union 73 dù không xuất hiện như một item độc lập trong list 60 Thông thư; vì thế denominator 60 sẽ làm mất một vertical production thật.

## Oracle hiện có

`han-q11-oracle.spec.ts` chép expected `宜/忌` độc lập cho đủ 14 vertical. Kết quả source comparison hiện có ba discrepancy production đã registry: Xuất hành — Hán Q11 có `月厭` nhưng Việt p849 không in; Quan đới — Việt p848 in thêm Bế nhưng Hán Q11 và Việt/Hán Q10 không Kị `冠帶` ở Bế nhật; Tế tự — Hán Q11 có `福生` nhưng Việt p844 lược mục này, production theo Hán cho riêng contribution Phúc Sinh.

## Kết luận

**Q11 đã inventory đủ 73/73 section Dụng sự canonical.** 14 section là `ORACLE_TESTED`; 59 section còn lại explicit out-of-scope current product. `ORACLE_MOT_PHAN` vẫn là trạng thái book-level đúng.
