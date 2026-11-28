# Đi thuyền vượt sông nước / 乘船渡水 — source lock

Status: ORACLE_TESTED / PRODUCTION

## Q11 baseline

Nguồn exact:

- Việt Tập I p.861, mục **Đi thuyền vượt sông nước**;
- Hán Q11 `WYG_011-24a`, mục `乘船渡水`.

Q11 không có Nên riêng và có đúng 5 Kị:

- Chiêu Diêu / 招搖;
- Hàm Trì / 咸池;
- Bát Phong / 八風;
- Cửu Khảm / 九坎;
- Xúc Thủy Long / 觸水龍.

Hán Q11 phần kết luận còn nói `遠迴乘船渡水無宜日除所忌之外無日不宜也`: các việc đi xa bằng thuyền/vượt nước không có ngày Nên riêng; ngoài các điều Kị thì không mặc định là bất nghi.

Production canonicalize `咸池` bằng identity `DAI_THOI / 大時`, vì Q6/Q10 source-lock `大時(大敗)(咸池)` là cùng identity.

## Q5 factor definitions

### Cửu Khảm / 九坎

Q5 `WYG_005-45b..47a`, Việt p.442–443:

- `九坎者月中殺神也其日忌乘船渡水...`;
- bảng tháng được phần `按` của chính sách hiệu đính thành chuỗi theo bốn tam hợp:
  - Dần–Ngọ–Tuất → Thìn–Mão–Dần;
  - Hợi–Mão–Mùi → Sửu–Tý–Hợi;
  - Thân–Tý–Thìn → Tuất–Dậu–Thân;
  - Tỵ–Dậu–Sửu → Mùi–Ngọ–Tỵ.

Production dùng đúng month→day-branch sequence hiệu đính này.

### Bát Phong / 八風

Q5 `WYG_005-48b..50a`, Việt p.446:

Phần `按` của sách chốt bảng hiệu đính:

- Xuân: `丁丑、丁巳`;
- Hạ: `甲申、甲辰`;
- Thu: `丁未、丁亥`;
- Đông: `甲戌、甲寅`.

Đây là bảng production. Không dùng literal bảng lịch cũ ở đầu đoạn nếu mâu thuẫn với phần khảo đính cuối.

### Xúc Thủy Long / 觸水龍

Q5 `WYG_005-48b..50b`, Việt p.447:

- `丙子、癸未、癸丑`;
- không phân mùa, cả ba ngày đều Kị vượt sông nước.

## Q10 conflict semantics

### Chiêu Diêu / 招搖

Q10 `WYG_010-51b..52a`:

`厭對(招搖)` Kị `取魚乘船渡水`; gặp Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp hoặc Thiên Xá thì không Kị. Thiên Nguyện không được dùng để giải.

### Hàm Trì / 咸池 = Đại Thời / 大時

Q10 `WYG_010-52b..53b` ghi riêng `又為咸池忌取魚乘船渡水` và có các nhánh tháng:

- Dần/Thân/Tỵ/Hợi: ngoài quân sự, các việc khác không Kị;
- Thìn/Tuất: rơi Chấp nhật + Lục Hợp, ngoài quân sự không Kị;
- Sửu/Mùi: gặp Thiên Đức hoặc Nguyệt Đức thì ngoài quân sự không Kị;
- Tý/Ngọ + Nguyệt Đức Hợp, Dậu + Nguyệt Đức: Kị/Nên cân bằng, không giữ Kị đi thuyền;
- Mão: theo Nguyệt Hình; gặp bốn Đức/Hợp thì trở về Kị thường Nguyệt Hình, mà `乘船渡水` không nằm trong Kị thường; không có Đức/Hợp thì `諸事皆忌`.

### Bát Phong / 八風

Q10 `WYG_010-60a..60b`: Kị đi thuyền/vượt nước; gặp bốn Đức/Hợp hoặc Lục Hợp thì bỏ Kị.

### Cửu Khảm / 九坎

Q10 `WYG_010-61b..62a`: Kị `取魚乘船渡水`; `與德合併猶忌` — gặp Đức/Hợp vẫn Kị.

### Xúc Thủy Long / 觸水龍

Q10 `WYG_010-66b..67a`: Kị `取魚乘船渡水`; gặp Đức/Hợp hoặc Thiên Nguyện vẫn Kị.

## Global hard days

Q11 không có Nên riêng và chỉ nêu 5 Kị, nhưng Q10/Q4 vẫn có một subset nói thẳng `諸事皆忌`. Production tái dùng global-hard-only resolver đã source-lock, không biến các ordinary hung khác thành baseline Kị của `乘船渡水`.

## Product mapping

- activity code: `DI_THUYEN_VUOT_SONG_NUOC`;
- title: **Đi thuyền vượt sông nước**;
- source label: `乘船渡水`;
- route: `/di-thuyen-vuot-song-nuoc`;
- API: `/date-selection/di-thuyen-vuot-song-nuoc`;
- personalization: một người thực hiện theo generic contract.

## Oracle/tests

- `q5-water-travel-factors.spec.ts`: exact Cửu Khảm/Bát Phong/Xúc Thủy Long generation;
- `han-q5-oracle.spec.ts`: independent Hán Q5 formulas;
- `di-thuyen-vuot-song-nuoc-rules.spec.ts`: exact 0 Nên / 5 Kị;
- `di-thuyen-vuot-song-nuoc-conflict.spec.ts`: exact Q10 relief/hard branches;
- `han-q10-semantic-oracle.spec.ts` + `han-q11-oracle.spec.ts`: independent semantic/baseline fixtures.
