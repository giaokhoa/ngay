# Quyển 9 — Lập thành full inventory

Status: COMPARED / INVENTORIED / ORACLE_PARTIAL

## Vai trò nguồn

Quyển 9 `立成` là **bảng tổng hợp để tra và kiểm chứng**, không phải calculator spec duy nhất.

Ngay lời mở đầu, sách nói Nghĩa lệ đã trình bày nguồn gốc thần sát nhưng các mục rời nhau khó xem tổng thể, nên gom thần sát năm/tháng/ngày/giờ thành bảng theo loại. Project vì vậy dùng Q9 để:

- tạo oracle/cross-check độc lập;
- phát hiện alias/cùng vị trí;
- kiểm cách một rule Nghĩa lệ biểu hiện trong bảng;
- **không** reverse-engineer bảng để thay cho công thức Q3–Q8.

## Denominator Việt

Đã mở trực tiếp working scan Tập 1 tại **PDF 717 / trang in 710**. Trang mở Quyển 9 ghi rõ 4 phần:

1. **10 biểu niên thần**;
2. **30 biểu nguyệt thần**;
3. **2 trang nhật thần**;
4. **6 biểu thời thần**.

Tổng cấu trúc là **4/4 phần, 48 đơn vị bảng/trang**. Đây là denominator do chính bản Việt nêu, không suy từ số heading transcription.

Hán Kanripo `KR3g0051_009.txt` cùng revision pin có cùng bốn lớp `年神 / 月神 / 日神 / 時神` và các bảng khởi lệ tương ứng.

## Inventory 4 phần

| Phần | Scope               | Product hiện tại                              | Chính sách                                                                                               |
| ---: | ------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
|    1 | 10 biểu niên thần   | REFERENCE_SPATIAL / NOT_CONSUMED              | chủ yếu annual/spatial, thuộc domain Q3/Q8/Q14–19 chưa production                                        |
|    2 | 30 biểu nguyệt thần | ORACLE_TESTED_PARTIAL                         | cross-check Q4/Q5/Q6 month→day identities; không phải mọi table cell đã oracle                           |
|    3 | 2 trang nhật thần   | ORACLE_TESTED_PARTIAL                         | cross-check fixed/special-day identities như Thiên Ân, Tứ Ly/Tứ Tuyệt, Thượng Sóc… tùy scope đã research |
|    4 | 6 biểu thời thần    | ORACLE_TESTED_PARTIAL / BLOCKED_ADVANCED_TIME | một số hour relation đã production qua Q7/Q32/Q34; phần advanced vẫn blocked                             |

## Các oracle production đang dựa Q9

Ví dụ đã source-lock trong repo:

- Dịch Mã, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hại, Lục Hợp, Ngũ Phú, Thiên Thương, Thiên Tặc;
- Thiên Ân và một số special-day cross-check;
- Phản Chi, Thượng Sóc, Tứ Ly/Tứ Tuyệt và Khí Vãng Vong ở research Q6;
- final `鳴吠` 13-day correction được Nghĩa lệ + Lập thành cùng xác nhận.
- `長星 / 短星`: production theo exact nhật-thần table `WYG_009-33b`, cross-check độc lập bằng 12 Nguyệt biểu Q19–30; dùng `chiThang` tiết khí + ngày âm từ Sóc.

Danh sách này **không** có nghĩa 48 bảng/trang đã được machine-oracle toàn bộ.

## Guardrail

- Q9 chỉ xác nhận vị trí/biểu hiện của rule; công thức vẫn phải quay về Nghĩa lệ tương ứng.
- Tên trùng/cùng vị trí trong bảng không tự động có nghĩa cùng identity product.
- Không parse toàn bộ Q9 transcription thành source truth nếu chưa có normalization + independent fixture.
- `ORACLE_MOT_PHAN` là trạng thái đúng.

## Kết luận

**Q9 đã inventory đủ 4/4 phần = 10 niên + 30 nguyệt + 2 nhật + 6 thời.** Không còn mơ hồ về cấu trúc quyển; oracle coverage vẫn chỉ là subset production đã kiểm.
