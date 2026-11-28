# Quyển 14–19 — inventory Niên biểu 60 năm

Status: HAN_INVENTORIED / VIET_EXACT_VERIFIED / NOT_IMPLEMENTED

## Phạm vi

Sáu quyển `年表一` → `年表六` chia một vòng Lục Thập Hoa Giáp thành **6 block × 10 năm**. Đây là bảng **niên-phương/spatial** để tra mở sơn, lập hướng, tu phương cát–hung; không phải bảng đánh giá một civil date độc lập.

Nguồn:

- Q14: Wikisource 四庫全書本 fallback, revision `627109`, vì Kanripo revision pin thiếu đúng 卷十四;
- Q15–19: Kanripo KR3g0051 revision pin, lần lượt `KR3g0051_014.txt` → `_018.txt`;
- Exact canonical Tập II 1001 trang đã được mở và đối chiếu trực tiếp; SHA-256 khớp `docs/source-catalog.md`.
- Trang in mở sáu quyển lần lượt: Q14 p5, Q15 p56, Q16 p107, Q17 p158, Q18 p209, Q19 p260.
- Page map/điểm lệch chi tiết: `docs/research/t2-exact-viet-han-crosscheck.md`.

## Sáu block 10 năm

| Quyển | Tên    | Range heading | Nguồn text          | Product        |
| ----: | ------ | ------------- | ------------------- | -------------- |
|    14 | 年表一 | 甲子 → 癸酉   | Wikisource fallback | CHUA_IMPLEMENT |
|    15 | 年表二 | 甲戌 → 癸未   | Kanripo `_014`      | CHUA_IMPLEMENT |
|    16 | 年表三 | 甲申 → 癸巳   | Kanripo `_015`      | CHUA_IMPLEMENT |
|    17 | 年表四 | 甲午 → 癸卯   | Kanripo `_016`      | CHUA_IMPLEMENT |
|    18 | 年表五 | 甲辰 → 癸丑   | Kanripo `_017`      | CHUA_IMPLEMENT |
|    19 | 年表六 | 甲寅 → 癸亥   | Kanripo `_018`      | CHUA_IMPLEMENT |

Các range nối tiếp đúng một vòng 60 Can-Chi, không overlap và không gap.

## Cấu trúc mỗi năm

Một entry năm điển hình có các nhóm:

- `太歲` + Can/Chi + Nạp âm;
- `開山立向修方吉`: Tuế Đức/Hợp/Chi Đức, Dương/Âm Quý Nhân, Tuế Lộc, Tuế Mã, Tấu Thư, Bác Sĩ;
- `三元紫白` theo Thượng/Trung/Hạ nguyên;
- Cái Sơn Hoàng Đạo, Thông Thiên Khiếu, Tẩu Mã Lục Nhâm, Tứ Lợi Tam Nguyên;
- `開山立向修方凶`: Thái Tuế, Tuế Phá, Tam Sát, Tọa Sát/Hướng Sát, Phù Thiên Không Vong;
- `開山凶`: Niên Khắc Sơn Gia, Âm Phủ Thái Tuế, Lục Hại, Tử Phù, Cứu Thoái…;
- `立向凶`: Tuần Sơn La Hầu, Bệnh Phù;
- `修方凶` và các bảng phi cung/thần sát liên quan.

Đây chính là **Lập thành theo năm** cho nhiều phép đã inventory ở Q3/Q8. Nếu sau này mở spatial domain, Q14–19 là oracle/table rất mạnh để kiểm calculator Q3/Q8.

## Không dùng text Kanripo như bảng máy sạch nếu chưa source-correct

Range heading của Q15–19 rõ, nhưng transcription Kanripo có dị tự/typo ở một số row heading. Ví dụ:

- Q15 `己卯` xuất hiện thành `太嵗巳卯`;
- Q16 `己丑` thành `太歲巳丑`;
- Q17 `己亥` thành `太歲巳亥`.

Exact Việt Tập II xác nhận các row đúng là **Kỷ Mão p82, Kỷ Sửu p133, Kỷ Hợi p184**. Do đó đây là lỗi transcription `己`→`巳`, không phải thiếu row. Q18 còn dùng dị thể `太歳` ở Canh Tuất.

Chính sách: trước khi biến Niên biểu thành machine oracle, cần normalization/source vectors; không parse thẳng text transcription thành production table. Ba lỗi `己`→`巳` đã được source-lock bằng exact Việt scan.

## Quan hệ current product

Current date-selection có Can-Chi năm của người liên quan để xét xung tuổi, nhưng **không có spatial target**. Niên biểu Q14–19 trả lời câu hỏi kiểu:

- sơn/phương nào cát/hung trong năm;
- mở sơn/lập hướng/tu phương nên tránh gì;
- sao/cung nào phi đến đâu.

Nó không phải lý do để đánh cả một ngày là Kị nếu không biết sơn/hướng đang tác động.

## Kết luận

**Q14–19 đã exact Việt/Hán structural-double-entry đủ 6/6 volume blocks, bao phủ range 60/60 Can-Chi.** Giữ `CHUA_IMPLEMENT`; blocker product là spatial domain. Audit xác nhận structure + representative vectors, chưa claim machine-oracle mọi cell của 60 bảng năm.
