# ADR 0006: Thiên Đức mixed stem/trigram semantics

Status: Accepted

## Bối cảnh

Quyển 5 của Hiệp Kỷ Biện Phương Thư không biểu diễn Thiên Đức bằng cùng một loại giá trị cho cả 12 tháng.

Tám tháng dùng Thiên Can, bốn tháng trọng dùng quẻ:

- Mão -> Khôn / 坤
- Ngọ -> Càn / 乾
- Dậu -> Cấn / 艮
- Tý -> Tốn / 巽

Hán bản còn giải thích rõ Thiên Đức không dùng địa chi và bốn quẻ được dùng thay cho vị trí mộ ở bốn tháng trọng.

Một số lịch phổ thông chuyển bốn quẻ này thành địa chi ngày. Project này không làm vậy.

## Quyết định

### Day-factor semantics

`THIEN_DUC` chỉ được emit như một factor của ngày khi:

- tháng đó có giá trị Thiên Đức là một Thiên Can;
- Can ngày trùng giá trị đó.

Với Mão/Ngọ/Dậu/Tý:

- không emit `THIEN_DUC` dựa trên Chi ngày;
- chỉ lưu quẻ/phương vị như source metadata.

### Mã quẻ

Do Càn và Cấn đều mất dấu thành `CAN`, dùng mã disambiguated:

- Khôn -> `KHON`
- Càn / 乾 -> `CAN_THIEN`
- Cấn / 艮 -> `CAN_SON`
- Tốn / 巽 -> `TON`

Tên hiển thị vẫn là “Càn”, “Cấn”.

## Hệ quả

- Không có branch substitution trong definition Thiên Đức.
- Nếu sau này product có chức năng phương vị, metadata quẻ có thể được nâng thành direction domain.
- Direction domain không được làm thay đổi semantics day-factor đã khóa ở đây.

## Nguồn

- Bản Việt, Tập 1, Quyển 5, trang in 387.
- Hán bản Quyển 5, mục 天道 天德.
- Nguyệt biểu tháng Mão giữ nguyên “天德在坤”.

Chi tiết research:
`docs/research/virtue-special-day-factors.md`.
