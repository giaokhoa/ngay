# ADR 0001: Naming Convention

Status: Accepted

## Quyết định

- Folder và filename dùng English, kebab-case.
- Symbol nghiệp vụ do project định nghĩa dùng tiếng Việt không dấu.
- Suffix framework giữ English.
- API bên thứ ba giữ nguyên.
- UI dùng tiếng Việt có dấu.
- Hán văn chỉ dùng cho source/audit.

## Ví dụ

File:
apps/api/src/calendar/calendar.service.ts

Code:

```ts
export class TinhLichService {
  tinhThongTinNgay(ngay: Date) {}
}
```

## Lý do

Folder/file English phù hợp tooling và ecosystem.

Domain tiếng Việt giúp code bám trực tiếp thuật ngữ bản dịch sách, giảm một lớp dịch ngược khi research và review.

Không dịch Service thành DichVu hoặc Controller thành BoDieuKhien.
