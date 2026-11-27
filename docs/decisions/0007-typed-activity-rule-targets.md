# ADR 0007: Activity rule targets are typed conditions

Status: Accepted

## Bối cảnh

Quyển 11 Dụng sự không chỉ tham chiếu thần sát.

Ví dụ mục 嫁娶 / Lễ cưới, đón dâu kị:

- Nguyệt Phá, Kiếp Sát, ... là factor identities;
- Bình nhật, Thu nhật, Bế nhật là Thập Nhị Trực;
- Hợi nhật là Chi ngày trực tiếp.

Nếu mọi rule bị ép vào `MaYeuTo`, project sẽ phải tạo các “factor giả” cho Trực và Chi ngày, làm lẫn calendar primitive với factor identity.

## Quyết định

Activity rule dùng typed target:

```ts
export type DieuKienDungSu =
  | {
      loai: 'YEU_TO';
      ma: MaYeuTo;
    }
  | {
      loai: 'TRUC';
      truc: ThapNhiTruc;
    }
  | {
      loai: 'CHI_NGAY';
      chi: DiaChi;
    }
  | {
      loai: 'THO_VUONG';
    };
```

Một activity rule giữ:

- công việc;
- typed condition;
- NÊN/KỊ;
- provenance.

## Hệ quả

- Không tạo `BINH_NHAT`, `THU_NHAT`, `BE_NHAT`, `HOI_NHAT` trong `MaYeuTo`.
- Không tạo `THO_VUONG` trong `MaYeuTo`; Q11 `土王用事後` dùng calendar fact `dangThoVuong`.
- Khi source có một identity thật như Nguyệt Phá dù vị trí trùng Trực Phá, vẫn giữ `NGUYET_PHA` vì Quyển 10/11 gọi và xử lý nó như một thần/sát riêng.
- Evaluation nhận facts đã chuẩn hóa thay vì suy lại calendar.

## Nguồn quyết định

Hiệp Kỷ Biện Phương Thư:

- Quyển 11, mục 嫁娶.
- Quyển 11, mục 修宮室 và 興造動土〈修造同〉.
- Bản Việt Tập 1 trang in 851, 854–855.

Chi tiết:
`docs/research/activity-cuoi-hoi.md` và `docs/research/activity-dong-tho-sua-cung-that.md`.
