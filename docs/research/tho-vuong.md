# Research: Thổ Vượng / Thổ Vương dụng sự

Status: VERIFIED

Issue: #18

## Câu hỏi

Mẫu Thương trong Quyển 5 đổi quy tắc sau khi Thổ Vượng bắt đầu. Calendar core cần xác định khi nào một ngày nằm trong thời kỳ Thổ Vượng.

## Bản Việt — Hiệp Kỷ Biện Phương Thư

Tập 1, Quyển 1, phần Ngũ Hành / Ngũ Hành Dụng Sự.

Trang in 83 ghi:

- ngũ hành đều có thời vượng;
- riêng Thổ không có vị trí cố định;
- Thổ vượng trước bốn vị trí Lập;
- mỗi lần 18 ngày;
- Lập Xuân mở thời Mộc, Lập Hạ mở Hỏa, Lập Thu mở Kim, Lập Đông mở Thủy;
- bốn kỳ Thổ cộng lại thành 72 ngày.

## Hán bản — Quyển 1

Hiệp Kỷ ghi:

`惟土居無所定乃於四立之前各旺一十八日`

và:

`立春木立夏火立秋金立冬水各旺七十二日土於四立之前各旺一十八日`.

Kết luận source-level:

- có bốn kỳ Thổ Vượng;
- mỗi kỳ đứng ngay trước Lập Xuân, Lập Hạ, Lập Thu, Lập Đông;
- mỗi kỳ dài 18 ngày;
- ngày Lập mở thời hành mới.

## Granularity trong lịch phát hành

Thời Hiến thư ghi `土王用事` như một marker trên một ngày lịch.

Tư liệu năm 1795 khi đối chiếu lịch Thanh với lịch Triều Tiên cũng so sánh `土王用事` bằng **ngày**, và ghi hai lịch lệch nhau một ngày.

Vì vậy rule chọn ngày được phát hành ở civil-day granularity.

## Nguồn lịch pháp chính xác hơn

Các lịch pháp cổ như Thụ Thời / Đại Thống có phép `推土王用事`.

Một dạng lấy Cốc Vũ / Đại Thử / Sương Giáng / Đại Hàn rồi trừ `土王策` để ra `土王用事日` hoặc `日辰`.

Các tài liệu này cho thấy phép lịch pháp có thể chứa phần ngày/khắc/phân chi tiết hơn.

Tuy nhiên project đang dùng định khí hiện đại bằng Astronomy Engine. Không được trộn trực tiếp hằng số của Thụ Thời/Đại Thống với exact solar-term instant hiện đại rồi gọi đó là công thức nguyên bản.

## Quyết định cho date-selection engine

Project dùng **civil-date semantics** cho Thổ Vượng.

Với từng tiết:

- Lập Xuân;
- Lập Hạ;
- Lập Thu;
- Lập Đông;

quy trình:

1. tính exact solar-term instant bằng calendar core;
2. chuyển instant sang IANA timezone của calendar context;
3. lấy ngày dân sự chứa tiết đó;
4. trừ 18 civil days;
5. khoảng Thổ Vượng là start inclusive, ngày Lập exclusive.

```text
lapDate = localCivilDate(lapInstant, timezone)
startDate = lapDate - 18 civil days

[startDate, lapDate)
```

Khoảng có đúng 18 ngày dân sự.

## Vì sao không dùng instant - 432h

Hiệp Kỷ nói 18 ngày và lịch phát hành dùng marker ngày.

Các lịch pháp cổ có công thức time-of-day riêng dựa trên hệ lịch riêng. Lấy exact modern Lập instant rồi trừ đúng 432 giờ sẽ là pha hai hệ mà source không trực tiếp quy định.

Do đó date-selection dùng civil-day rule.

## Timezone

Timezone là explicit IANA timezone của calendar context.

- Muốn tái hiện lịch Bắc Kinh: dùng `Asia/Shanghai`.
- Context khác: convert exact Lập instant sang timezone đó trước khi lấy civil date.

Đây là project convention để áp nguồn vào hệ thống đa-timezone, không phải câu nguyên văn của Hiệp Kỷ.

## Mẫu Thương

Quyển 5:

`母倉者五行當王所生者為母倉如遇土王後則以巳午為之`.

Semantics:

- ngoài Thổ Vượng: dùng set theo mùa;
- từ ngày Thổ Vượng bắt đầu tới trước ngày bốn Lập: Mẫu Thương chuyển sang Tỵ/Ngọ;
- Tỵ/Ngọ là replacement theo hành đang vượng, không cộng vĩnh viễn vào seasonal set.

Nguyệt biểu cũng ghi:
`土王用事後 ... 巳午日添母倉`.

## Representation đề xuất

Calendar:

```ts
interface KhoangThoVuong {
  tietKetThuc: TietKhi;
  tuNgay: NgayDanSu;
  denTruocNgay: NgayDanSu;
}
```

Primitive:

```ts
tinhCacKhoangThoVuong(nam: number, muiGio: string): KhoangThoVuong[]

dangThoVuong(ngay: NgayDanSu, muiGio: string): boolean
```

Factor context nhận kết quả đã tính:

```ts
dangThoVuong: boolean;
```

Factor không tự tính tiết khí/timezone.

## Oracle strategy

Mỗi interval:

- dài đúng 18 civil days;
- kết thúc ngay trước civil date của một trong bốn Lập;
- không chứa ngày Lập.

Exact Lập instant vẫn dùng oracle solar-term hiện có.

Timezone regression tối thiểu:

- Asia/Ho_Chi_Minh;
- Asia/Shanghai;
- UTC;
- một timezone âm UTC.

## Trạng thái

- [x] LOCATED
- [x] COMPARED
- [x] VERIFIED
- [ ] IMPLEMENTED
- [ ] ORACLE_TESTED
