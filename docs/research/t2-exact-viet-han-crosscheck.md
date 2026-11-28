# Tập II — exact Việt/Hán cross-check

Status: EXACT_VIET_SCAN_VERIFIED / HAN_PINNED / STRUCTURAL_DOUBLE_ENTRY_COMPLETE

## Identity

Canonical Việt Tập II do người dùng cung cấp:

- 1001 PDF pages;
- SHA-256 `2bd06dc981e8146c7de68243ebcf58d063ed7a9961c66dc66c3d5f173772672c`;
- Vũ Hoàng – Lân Bình, _Hiệp Kỷ Biện Phương Thư_, Tập II.

Audit này đã mở exact scan, rà toàn dải 1001 trang ở contact-sheet level và mở chi tiết các trang title/TOC/điểm lệch. Từ đây **không còn dùng secondary public TOC làm bằng chứng chính cho Q14–36**.

Nguồn Hán đối chiếu:

- Kanripo `KR3g0051`, revision pin của repo;
- Q14 dùng Wikisource 四庫全書本 revision pin vì Kanripo thiếu 卷十四.

## Page map exact Tập II

| Quyển | Nội dung                          | Trang in bắt đầu |
| ----: | --------------------------------- | ---------------: |
|    14 | Niên biểu 1 — Giáp Tý → Quý Dậu   |                5 |
|    15 | Niên biểu 2 — Giáp Tuất → Quý Mùi |               56 |
|    16 | Niên biểu 3 — Giáp Thân → Quý Tị  |              107 |
|    17 | Niên biểu 4 — Giáp Ngọ → Quý Mão  |              158 |
|    18 | Niên biểu 5 — Giáp Thìn → Quý Sửu |              209 |
|    19 | Niên biểu 6 — Giáp Dần → Quý Hợi  |              260 |
|    20 | Biểu tháng 1                      |              311 |
|    21 | Biểu tháng 2                      |              339 |
|    22 | Biểu tháng 3                      |              367 |
|    23 | Biểu tháng 4                      |              396 |
|    24 | Biểu tháng 5                      |              423 |
|    25 | Biểu tháng 6                      |              451 |
|    26 | Biểu tháng 7                      |              480 |
|    27 | Biểu tháng 8                      |              507 |
|    28 | Biểu tháng 9                      |              535 |
|    29 | Biểu tháng 10                     |              565 |
|    30 | Biểu tháng 11                     |              594 |
|    31 | Biểu tháng 12                     |              622 |
|    32 | Nhật biểu                         |              651 |
|    33 | Lợi cho sử dụng 1                 |              687 |
|    34 | Lợi cho sử dụng 2                 |              754 |
|    35 | Phụ lục                           |              828 |
|    36 | Biện ngụy                         |              892 |

## Q14–19 — Niên biểu

Exact Việt scan xác nhận đủ **6 block × 10 năm = 60 Can-Chi**, đúng range Hán:

- Q14 `甲子 → 癸酉`;
- Q15 `甲戌 → 癸未`;
- Q16 `甲申 → 癸巳`;
- Q17 `甲午 → 癸卯`;
- Q18 `甲辰 → 癸丑`;
- Q19 `甲寅 → 癸亥`.

Representative double-entry Q14 Giáp Tý khớp Hán fallback ở các trường phân biệt: Tuế Đức/Hợp/Chi Đức, quý nhân, Tuế Lộc/Mã, Tam nguyên, Cái Sơn Hoàng Đạo, Thông Thiên Khiếu, Tẩu Mã Lục Nhâm, Tứ Lợi Tam Nguyên và các nhóm khai sơn/lập hướng/tu phương hung.

Exact Việt cũng xác nhận ba row-title mà Kanripo transcription chép nhầm Can `己` thành `巳`:

- Q15 Kỷ Mão — Việt p82: `己卯`;
- Q16 Kỷ Sửu — Việt p133: `己丑`;
- Q17 Kỷ Hợi — Việt p184: `己亥`.

Đây là **structural + representative-vector verification**, chưa phải parser machine-oracle mọi cell của 60 bảng năm.

## Q20–31 — 12 Nguyệt biểu

Exact Việt scan xác nhận đủ 12 quyển tháng liên tiếp ở các trang in 311/339/367/396/423/451/480/507/535/565/594/622. Cấu trúc khớp Hán: tháng tiết khí, tiết mở tháng, trung khí/Nguyệt tướng và bảng 60 Can-Chi ngày.

Audit này xác nhận exact structure/page map; **không claim 720 row đã cell-by-cell oracle-tested**. Kanripo vẫn cần normalization glyph/typo trước khi parse máy rộng.

## Q32 — Nhật biểu

Exact Việt có đúng **3 mục**, khớp Hán:

1. Thời định cục 60 ngày, giờ — p651;
2. Định cục giờ Quý Đăng Thiên Môn — p677;
3. Định cục bốn giờ đại cát — p683.

Không có structural discrepancy.

## Q33 — Lợi cho sử dụng 1

Exact Việt có **14 mục**, Hán có 15 heading. Chênh lệch chỉ do cách gộp:

- Việt mục 13, p748: **“Luận dùng bàn kế, La kinh đồ”**;
- Hán tách `論用盤針` và `羅經圖` thành hai heading.

Không thiếu nội dung theo TOC/body mapping.

## Q34 — Lợi cho sử dụng 2

Exact Việt có **10 mục**, Hán có 12 heading.

Một chênh là grouping:

- Việt mục 2 gộp `月吉神總論` + `月凶神總論`.

Một chênh là **nội dung bị lược**:

- Hán có heading/đồ `時刻方位圖` và `太陽到方圖` riêng;
- Việt p818 chỉ in **“Đồ hình Thái dương đến phương”**, tương ứng `太陽到方圖`;
- ngay sau phần giải thích là **“Biểu về thời khắc Thái dương đến phương”** p820, tương ứng `太陽到方時刻表`;
- không có đồ `時刻方位圖` trong exact Tập II.

Đăng ký discrepancy `Q34_THOI_KHAC_PHUONG_VI_DO_OMITTED`.

## Q35 — Phụ lục

Exact Việt có **13 mục**, Hán có 16 heading.

- Việt mục 6 gộp ba heading Hán: `百忌日 / 祀竈日 / 洗頭日`.
- Các mục Việt 7–13 tiếp tục tương ứng `嫁娶周堂` → `吉將加時`.
- Hán còn một section dài `竒門三元` sau `吉將加時` (`WYG_034-52a..62b`).
- Exact Việt kết thúc Q35 sau “Cát tướng gia thêm vào giờ”, rồi sang Q36; **không có `竒門三元`**.

Đăng ký discrepancy `Q35_QIMEN_SANYUAN_OMITTED`.

## Q36 — Biện ngụy

Exact Việt có **26 mục**, Hán có 27 heading.

- Việt mục 17 gộp `章光` + `五合五離`; vì vậy 26↔27 không phải mất nội dung.
- Tuy nhiên TOC Việt mục 24 in **“Thiên đạo”**.
- Thân bài Việt p982 in rõ **“LỤC ĐẠO (SÁU CON ĐƯỜNG)”** và nội dung “Thiên, Địa, Binh, Nhân, Quỷ, Tử là Lục đạo…” khớp Hán `六道` (`WYG_035-54a..55b`).

Do đó đây là **TOC/title typo**, không phải semantic discrepancy. Đăng ký `Q36_LUC_DAO_TOC_THIEN_DAO` để chặn việc tạo nhầm một identity “Thiên đạo”.

## Kết luận

- Q14–33: exact Tập II thay secondary TOC làm nguồn Việt structural chính; các grouping đã được xác nhận trực tiếp.
- Q34: xác nhận một omission Việt (`時刻方位圖`).
- Q35: xác nhận một omission Việt (`竒門三元`).
- Q36: xác nhận một TOC typo Việt (“Thiên đạo” → thân bài “Lục đạo/六道”), còn 26↔27 là grouping `章光 + 五合五離`.
- Các phát hiện này là **source comparison**; không tự nâng bất kỳ quyển nào thành full-volume implementation/oracle.
