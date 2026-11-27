# ADR 0006: Civil-date boundary for Thổ Vượng

Status: Accepted

## Bối cảnh

Hiệp Kỷ quy định Thổ vượng 18 ngày trước bốn Lập.

Project đã dùng exact solar-term instants cho calendar month boundary, nhưng Mẫu Thương là factor theo ngày. Nguồn lịch sử cho thấy Thời Hiến thư phát hành `土王用事` như một marker ngày.

## Quyết định

Thổ Vượng trong date-selection là bốn interval civil-date:

```text
localDate(Lập instant, timezone) - 18 days
    <= ngày <
localDate(Lập instant, timezone)
```

Áp cho:

- Lập Xuân;
- Lập Hạ;
- Lập Thu;
- Lập Đông.

Start inclusive, ngày Lập exclusive.

## Timezone

Timezone là explicit IANA timezone của calendar context.

Không dùng timezone mặc định của process.

Muốn tái hiện Beijing almanac thì truyền `Asia/Shanghai`.

## Hệ quả

- Calendar core cần civil-date arithmetic và instant -> civil-date theo IANA timezone.
- Mẫu Thương nhận `dangThoVuong` từ calendar context.
- Không claim project tái hiện time-of-day của mọi thuật toán lịch cổ.

## Nguồn

Chi tiết: `docs/research/tho-vuong.md`.
