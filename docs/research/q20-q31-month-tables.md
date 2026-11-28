# Quyển 20–31 — inventory Nguyệt biểu 12 tháng

Status: STRUCTURE_INVENTORIED / ORACLE_PARTIAL

## Phạm vi

Mười hai quyển `月表一` → `月表十二` tương ứng **12 tháng tiết khí**, mỗi quyển có:

1. header tháng + tiết (`節`) mở tháng;
2. Thiên Đạo, Thiên Đức/Hợp, Nguyệt Đức/Hợp, Nguyệt Không;
3. Nguyệt Kiến/Phá/Yếm/Hình/Hại, Kiếp/Tai/Nguyệt Sát;
4. các ngày Trường Tinh/Đoản Tinh, Vãng Vong, Tứ Ly/Tứ Tuyệt, Thổ Vượng…;
5. trung khí (`中`) + Nguyệt tướng;
6. **bảng 60 Can-Chi ngày** với Nạp âm, ngũ hành classification, Trực và cát/hung/thần sát/宜忌.

Nguồn Hán: Kanripo `KR3g0051_019.txt` → `_030.txt`, revision pin.

Tập II Việt có canonical fingerprint trong source catalog nhưng working copy hiện không mount; batch này không claim Việt row-by-row double-entry. Secondary public TOC chỉ corroborate Q20–31 là 12 “Biểu tháng” liên tiếp, không dùng làm oracle cell-by-cell.

## Mapping 12 quyển

| Quyển | Tên      | Tháng        | Tiết mở tháng | Trung khí / Nguyệt tướng | Source file |
| ----: | -------- | ------------ | ------------- | ------------------------ | ----------- |
|    20 | 月表一   | 正月 / Dần   | 立春          | 雨水 / Hợi tướng         | `_019`      |
|    21 | 月表二   | 二月 / Mão   | 驚蟄          | 春分 / Tuất tướng        | `_020`      |
|    22 | 月表三   | 三月 / Thìn  | 清明          | 穀雨 / Dậu tướng         | `_021`      |
|    23 | 月表四   | 四月 / Tỵ    | 立夏          | 小滿 / Thân tướng        | `_022`      |
|    24 | 月表五   | 五月 / Ngọ   | 芒種          | 夏至 / Mùi tướng         | `_023`      |
|    25 | 月表六   | 六月 / Mùi   | 小暑          | 大暑 / Ngọ tướng         | `_024`      |
|    26 | 月表七   | 七月 / Thân  | 立秋          | 處暑 / Tỵ tướng          | `_025`      |
|    27 | 月表八   | 八月 / Dậu   | 白露          | 秋分 / Thìn tướng        | `_026`      |
|    28 | 月表九   | 九月 / Tuất  | 寒露          | 霜降 / Mão tướng         | `_027`      |
|    29 | 月表十   | 十月 / Hợi   | 立冬          | 小雪 / Dần tướng         | `_028`      |
|    30 | 月表十一 | 十一月 / Tý  | 大雪          | 冬至 / Sửu tướng         | `_029`      |
|    31 | 月表十二 | 十二月 / Sửu | 小寒          | 大寒 / Tý tướng          | `_030`      |

## Calendar boundary

Các bảng xác nhận month model của repo là **tháng tiết khí**, không phải tháng âm lịch:

- Dần bắt đầu Lập Xuân;
- Mão bắt đầu Kinh Trập;
- …;
- Sửu bắt đầu Tiểu Hàn.

Trung khí giữa tháng dùng để xác định Nguyệt tướng Q7/Q32, không phải ranh đổi chi tháng.

## Oracle coverage hiện tại

Q20–31 đã được dùng làm Hán oracle độc lập cho một số lớp production:

- month boundary / month branch;
- Thập Nhị Trực và shared Q4 positions;
- một số Đức/Hợp, Nguyệt Phá, monthly factor vectors;
- cross-check các factor Q5/Q6 đã implement.

Các test liên quan:

- `han-q4-month-table-oracle.spec.ts`;
- calendar month/solar-term specs;
- các factor oracle Q5/Q6 dùng Hán Nghĩa lệ + table cross-check.

**Không claim toàn bộ 12 × 60 row đã oracle-tested.** `ORACLE_MOT_PHAN` ở manifest vẫn đúng.

## Transcription normalization bắt buộc trước full-table oracle

Kanripo month-table text giữ nhiều glyph/typo của transcription:

- `夘` và `卯` cùng dùng cho Mão;
- có vị trí `巳/己` dễ lẫn trong row/header;
- dị thể `嵗/歲`, `刼/劫`, `徃/往`;
- row text có thể xuống dòng khác nhau, nên parser literal theo Nạp âm không ổn định.

Kiểm thử exploratory cho thấy một số file nhận đủ 60 sexagenary row bằng exact heading, một số chỉ 53–58 nếu không normalize glyph. Đây **không phải chứng cứ bảng thiếu row**, mà là lý do không parse thẳng transcription làm machine truth.

## Chính sách future full-table oracle

Muốn nâng Q20–31 từ partial lên full-table oracle cần:

1. canonical normalization layer cho glyph/typo đã source-lock;
2. parser 60 row × 12 tháng;
3. independent comparison với Tập II scan/canonical row images;
4. discrepancy registry cho mọi khác biệt Việt/Hán/transcription;
5. chỉ sau đó mới dùng table cells như machine expected rộng.

## Kết luận

**Q20–31 đã inventory đủ 12/12 volume structure, mỗi quyển là một tháng tiết khí với design bảng 60 Can-Chi ngày.** Oracle coverage vẫn partial và được giữ trung thực trong manifest.
