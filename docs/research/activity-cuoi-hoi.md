# Research: Cưới hỏi / Lễ cưới, đón dâu — 嫁娶

Status: VERIFIED

## Mục tiêu

Khóa vertical slice đầu tiên của product theo đúng mục Dụng sự Quyển 11.

Không gom chung ba việc hôn nhân khác nhau trong sách:

1. Kết mối hôn nhân — 結婚姻
2. Nạp thái, hỏi tên — 納采問名
3. Lễ cưới, đón dâu — 嫁娶

Vertical slice này chỉ làm mục **嫁娶**.

Mã nghiệp vụ dự kiến:
`CUOI_HOI`.

Tên UI ưu tiên:
**Lễ cưới, đón dâu**.

## Nguồn Việt

Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 11 — Dụng sự.

- PDF 846: mở Quyển 11.
- PDF 857 / trang in 850: “Kết mối hôn nhân”.
- PDF 858 / trang in 851: “Nạp thái, hỏi tên” và “Lễ cưới, đón dâu”.

Mục “Lễ cưới, đón dâu” ghi:

### Nên dùng

- Thiên Đức
- Nguyệt Đức
- Thiên Đức Hợp
- Nguyệt Đức Hợp
- Thiên Xá
- Thiên Nguyện
- Tam Hợp
- Thiên Hỷ
- Lục Hợp
- Bất Tương

### Kiêng

- Nguyệt Phá
- Bình nhật
- Thu nhật
- Bế nhật
- Kiếp Sát
- Tai Sát
- Nguyệt Sát
- Nguyệt Hình
- Nguyệt Hại
- Nguyệt Yếm
- Yếm Đối
- Đại Thời
- Thiên Lại
- Tứ Phế
- Tứ Kị
- Tứ Cùng
- Ngũ Mộ
- Vãng Vong
- Bát Chuyên
- ngày Hợi

## Hán bản

欽定協紀辨方書 卷十一, mục `嫁娶`:

```text
宜 天徳 月徳 天徳合 月徳合 天赦 天願 三合 天喜 六合 不將

忌 月破 平日 收日 閉日 劫煞 災煞 月煞 月刑 月害 月厭 厭對
   大時 天吏 四廢 四忌 四窮 五墓 往亡 八專 亥日
```

Nguồn số hóa:
https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B711

Bản Việt và Hán khớp hoàn toàn về danh sách Nghi/Kị.

## Dependency matrix

### Nghi — 10/10 đã có trong engine

| Quyển 11       | Code           | Trạng thái    |
| -------------- | -------------- | ------------- |
| Thiên Đức      | THIEN_DUC      | ORACLE_TESTED |
| Nguyệt Đức     | NGUYET_DUC     | ORACLE_TESTED |
| Thiên Đức Hợp  | THIEN_DUC_HOP  | ORACLE_TESTED |
| Nguyệt Đức Hợp | NGUYET_DUC_HOP | ORACLE_TESTED |
| Thiên Xá       | THIEN_XA       | ORACLE_TESTED |
| Thiên Nguyện   | THIEN_NGUYEN   | ORACLE_TESTED |
| Tam Hợp        | TAM_HOP        | ORACLE_TESTED |
| Thiên Hỷ       | THIEN_HY       | ORACLE_TESTED |
| Lục Hợp        | LUC_HOP        | ORACLE_TESTED |
| Bất Tương      | BAT_TUONG      | ORACLE_TESTED |

Không cần thêm factor thuận lợi nào để dựng vertical slice.

### Kị — đã có primitive/factor

| Quyển 11    | Representation hiện có |
| ----------- | ---------------------- |
| Bình nhật   | `ThapNhiTruc.BINH`     |
| Thu nhật    | `ThapNhiTruc.THU`      |
| Bế nhật     | `ThapNhiTruc.BE`       |
| Kiếp Sát    | `KIEP_SAT`             |
| Tai Sát     | `TAI_SAT`              |
| Nguyệt Sát  | `NGUYET_SAT`           |
| Nguyệt Hình | `NGUYET_HINH`          |
| Nguyệt Hại  | `NGUYET_HAI`           |
| Nguyệt Yếm  | `NGUYET_YEM`           |
| Yếm Đối     | `YEM_DOI`              |
| ngày Hợi    | `chiNgay === HOI`      |

### Kị — còn thiếu production factor

- Nguyệt Phá
- Đại Thời
- Thiên Lại
- Tứ Phế
- Tứ Kị
- Tứ Cùng
- Ngũ Mộ
- Vãng Vong
- Bát Chuyên

## Phát hiện kiến trúc: activity rule không thể chỉ trỏ tới MaYeuTo

Quyển 11 gọi trực tiếp:

- thần/sát;
- một Trực cụ thể;
- một Chi ngày cụ thể.

Do đó contract kiểu:

```ts
interface QuyTacDungSu {
  yeuTo: MaYeuTo;
}
```

là quá hẹp.

Activity engine cần target có kiểu.

Đề xuất:

```ts
type DieuKienDungSu =
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
    };
```

Rule:

```ts
interface QuyTacDungSu {
  ma: string;
  congViec: LoaiCongViec;
  dieuKien: DieuKienDungSu;
  tacDong: TacDongDungSu;
  nguon: ThamChieuNguon[];
}
```

Không tạo factor giả như `BINH_NHAT`, `THU_NHAT`, `HOI_NHAT` chỉ để ép mọi rule qua `MaYeuTo`.

## Nguyệt Phá

Quyển 20 header tháng Giêng ghi trực tiếp:

- Nguyệt Kiến tại Dần;
- Nguyệt Phá tại Thân.

Quyển 10 ghi:
`月破〈大耗〉` và giải thích Nguyệt Phá là chi xung của Nguyệt Kiến.

Về vị trí, nó trùng Trực Phá.

Tuy nhiên Quyển 11 gọi tên `Nguyệt Phá`, nên production nên có identity `NGUYET_PHA`, dùng chung phép tính với Trực Phá, thay vì activity rule trỏ thẳng `PHA`.

Lý do:

- provenance đúng tên source;
- Quyển 10 có semantics riêng cho Nguyệt Phá;
- downstream explanation phải nói “phạm Nguyệt Phá”, không chỉ “Trực Phá”.

Status: VERIFIED về vị trí/identity; chưa IMPLEMENTED.

## Evaluation chưa được phép làm kiểu boolean Kị thắng tất cả

Quyển 10 cho thấy blocker cưới hỏi có mức xử lý khác nhau.

Ví dụ đã xác minh từ Hán bản:

### Nguyệt Phá

- Kị 嫁娶.
- Gặp Thiên Đức/Nguyệt Đức/Thiên Đức Hợp/Nguyệt Đức Hợp vẫn còn Kị.
- Một số tổ hợp nặng hơn thành “mọi việc đều kị”.

Đối với cưới hỏi, đây là blocker mạnh.

### Tứ Phế

- Kị 嫁娶.
- Gặp Đức/Hợp vẫn còn Kị.
- Gặp Nguyệt Phá thì “mọi việc đều kị”.

### Tứ Kị / Tứ Cùng

- Kị 嫁娶.
- Gặp Nguyệt Đức/Thiên Đức Hợp/Nguyệt Đức Hợp vẫn Kị.
- Ngoại lệ: tháng Giêng Ất Hợi đồng thời Thiên Nguyện thì chỉ còn kị việc quân sự, các việc khác không kị.

Đây là explicit exception, không thể biểu diễn bằng global `coDuc`.

### Ngũ Mộ

- Kị 嫁娶.
- Tháng Năm và tháng Mười Một nếu đồng thời Nguyệt Đức thì không kị.

### Vãng Vong

- Kị 嫁娶.
- Gặp Đức/Hợp/Xá/Nguyện vẫn Kị.

### Bát Chuyên

Quyển 10 có rule riêng và ngoại lệ liên quan Thiên Nguyện; phải research exact text trước khi code evaluator.

## Vertical-slice gates

Không implement kết luận cưới hỏi production cho tới khi:

1. 9 factor Kị còn thiếu đã VERIFIED + ORACLE_TESTED;
2. Quyển 10 semantics cho 19 Kị đã được research;
3. activity rule target contract hỗ trợ YEU_TO/TRUC/CHI_NGAY;
4. explicit override rules cho các ngoại lệ đã có test.

## Trạng thái

- [x] Q11 activity rule LOCATED
- [x] Việt/Hán COMPARED
- [x] Nghi/Kị list VERIFIED
- [x] dependency matrix lập xong
- [ ] missing blockers implemented
- [ ] Q10 conflict semantics VERIFIED đầy đủ
- [ ] activity rules IMPLEMENTED
- [ ] end-to-end ORACLE_TESTED
