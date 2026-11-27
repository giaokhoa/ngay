# ADR 0005: Civil Date Semantics for Sexagenary Day

Status: Accepted

## Bối cảnh

Date-selection engine cần một nghĩa ổn định cho “Can Chi ngày”.

JavaScript `Date` là instant-centric và dễ làm logic ngày phụ thuộc timezone runtime. Ngoài ra một số hệ Bát Tự có convention riêng về việc đổi ngày quanh giờ Tý, nhưng đó không phải scope hiện tại.

## Quyết định

Can Chi ngày trong project được tính từ **Gregorian civil date**.

Semantic input là:

```ts
type NgayDanSu = string; // YYYY-MM-DD
```

Quy tắc:

- epoch: 1949-10-01 = Giáp Tý theo GB/T 33661-2017;
- mỗi civil day tiến một vị trí trong vòng 60;
- boundary của ngày trong date-selection là local civil midnight;
- nếu input là instant, convert sang civil date theo IANA timezone trước khi gọi calendar day calculation.

Không dùng 23:00/giờ Tý làm boundary trong module date-selection.

## Vì sao

- GB/T cung cấp epoch chính thức và định nghĩa Chinese calendar day theo 00:00-24:00 giờ Bắc Kinh.
- HKO 2026 xác nhận phép cộng civil-day từ epoch cho nhãn Can Chi ngày hiện đại.
- Date-selection UI/API làm việc theo ngày dân sự, nên contract này rõ hơn và tránh timezone bug.

## Không đồng nghĩa

ADR này không khẳng định mọi trường phái truyền thống đều dùng cùng boundary cho mọi mục đích.

Nếu tương lai thêm Bát Tự/Tứ Trụ:

- module đó có thể có convention riêng;
- không được thay đổi semantics của `tinhCanChiNgay` đang dùng cho date selection;
- phải có ADR mới.

## Implementation guardrail

Không tính chênh ngày bằng local milliseconds.

Phải dùng civil-date arithmetic deterministic:

- PlainDate/ordinal/JDN tương đương;
- test không phụ thuộc TZ của Node/GitHub runner.

## Validation

Oracle ban đầu:

- GB/T epoch 1949-10-01 = Giáp Tý;
- HKO January 2026 daily sexagenary labels.

Chi tiết: `docs/research/gregorian-to-sexagenary-day.md`.
