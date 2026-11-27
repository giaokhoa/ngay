# Research: DI_CHUYEN conflict semantics Quyển 10

Status: VERIFIED

## Mục tiêu

Khóa đầy đủ cách Quyển 10 xử lý 15 Kị của \`DI_CHUYEN\` / 般移 trước khi
nâng vertical này lên end-to-end ORACLE_TESTED.

Nguồn Việt chính là exact full scan Tập 1 do người dùng cung cấp, fingerprint ở
\`docs/source-catalog.md\`. Hán bản được mở lại theo Quyển 10 để đối chiếu;
transcription online chỉ là lớp đối chiếu thứ hai vì chưa có Hán scan user upload.

## Phạm vi

15 Kị Quyển 11 của DI_CHUYEN:

1. Nguyệt Phá
2. Bình nhật
3. Thu nhật
4. Bế nhật
5. Kiếp Sát
6. Tai Sát
7. Nguyệt Sát
8. Nguyệt Hình
9. Nguyệt Yếm
10. Đại Thời
11. Thiên Lại
12. Tứ Phế
13. Ngũ Mộ
14. Quy Kị
15. Vãng Vong

## Nguồn Việt đã mở lại

Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 10:

- 788–790: Nguyệt Phá / Đại Hao
- 790–793: Bình nhật / Tử Thần
- 794–796: Thu nhật
- 797–798: Bế nhật / Huyết Chi
- 798–800: Kiếp Sát
- 800: Tai Sát / Thiên Hỏa
- 801–802: Nguyệt Sát / Nguyệt Hư
- 802–805: Nguyệt Hình
- 806–810: Nguyệt Yếm / Địa Hỏa
- 811–812: Đại Thời / Đại Bại / Hàm Trì
- 813–814: Thiên Lại / Trí Tử
- 816–817: Tứ Phế
- 819: Ngũ Mộ
- 822: Quy Kị; Vãng Vong / Khí Vãng Vong

Trong full scan canonical hiện tại, PDF page = trang in + 7 ở dải này.

## Vocabulary của evaluator

Không dùng score. Q10 cần các operation riêng:

- \`GIU_KY\`: blocker vẫn hiệu lực.
- \`BO_KY\`: bỏ blocker cho DI_CHUYEN.
- \`CAN_BANG\`: nếu DI_CHUYEN đồng thời có contribution Nên thuộc cát thần mà
  nhánh source đang xét, không để một phía tự thắng; không tự tạo Nên.
- \`CAM_MOI_VIEC\`: mọi việc đều Kị.
- \`CHI_CON_QUAN_Y\`: chỉ quân sự / chữa bệnh còn Kị; DI_CHUYEN được bỏ Kị.
- \`DELEGATE\`: kết quả của blocker này phải theo blocker mạnh hơn đã chỉ rõ.
- \`GIU_KY_DU_CO_CAT\`: source nói rõ Đức/Hợp/Xá/Nguyện không hóa blocker.

Delegation phải recursive và cycle-safe. Không áp resolver của CUOI_HOI sang
DI_CHUYEN chỉ vì hai activity cùng có một factor Kị.

## Ma trận 15 blocker

### 1. Nguyệt Phá — 月破

Nguồn Việt: 788–790.

Base: Kị DI_CHUYEN.

- Gặp Thiên Đức / Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp: vẫn Kị.
- Tý, Ngọ gặp Tai Sát; Mùi, Thân gặp Nguyệt Hình:
  - có Đức/Hợp thì vẫn theo mức Kị của Nguyệt Phá cho DI_CHUYEN;
  - không có Đức/Hợp: mọi việc đều Kị.
- Mão, Dậu đồng thời Tai Sát + Nguyệt Yếm: dù có Đức/Hợp vẫn mọi việc đều Kị.
- Các ngày âm dương giao phá / dương phá âm xung được nêu riêng: mọi việc đều Kị.

Operation: \`GIU_KY_DU_CO_CAT\`, có các nhánh \`CAM_MOI_VIEC\`.

### 2. Bình nhật — 平日

Nguồn Việt: 790–793.

Base: Kị DI_CHUYEN.

Theo Chi tháng:

- Hợi: Tướng + Thời Đức + Lục Hợp; chỉ còn Kị quân sự / chữa bệnh.
  DI_CHUYEN -> \`BO_KY\`.
- Thân: Tướng + Nguyệt Hại; khi gặp cát thần mà source nêu thì chỉ quân sự /
  chữa bệnh còn Kị; không gặp thì theo thường lệ.
  Có khác biệt tên thần: scan Việt p.791 in “Thiên Đức, Thiên Đức Hợp”, trong
  khi Hán nguyên văn là `天德、月德合` = Thiên Đức + Nguyệt Đức Hợp.
  Vì Hán bản là nguyên văn dùng để phân biệt identity gần nghĩa, implementation
  của nhánh này phải dùng `THIEN_DUC` + `NGUYET_DUC_HOP`; provenance vẫn
  ghi lỗi khác biệt của bản Việt.
- Dần, Tỵ: đồng thời Nguyệt Hình -> \`DELEGATE NGUYET_HINH\`.
- Tý, Ngọ, Mão, Dậu: đồng thời Thiên Lại.
  - Mão, Dậu gặp Nguyệt Đức; Ngọ gặp Nguyệt Đức Hợp: cát/hung cân bằng.
  - Tý đồng thời Nguyệt Hình -> \`DELEGATE NGUYET_HINH\`.
- Thìn, Tuất, Sửu, Mùi: đồng thời Nguyệt Sát -> \`DELEGATE NGUYET_SAT\`.

Q10 còn nêu sáu cấp độ cát/hung; evaluator phải giữ operation thay vì quy về
một boolean chung.

### 3. Thu nhật — 收日

Nguồn Việt: 794–796.

Base: Kị DI_CHUYEN.

- Dần, Thân, Tỵ, Hợi: đồng thời Kiếp Sát -> \`DELEGATE KIEP_SAT\`.
- Tý, Ngọ, Mão, Dậu: đồng thời Đại Thời.
  - Tý, Ngọ gặp Nguyệt Đức Hợp; Dậu gặp Nguyệt Đức: cát/hung cân bằng.
  - Mão đồng thời Nguyệt Hình -> \`DELEGATE NGUYET_HINH\`.
- Sửu, Tuất: đồng thời Nguyệt Hình -> \`DELEGATE NGUYET_HINH\`.
- Thìn, Mùi gặp Đức/Hợp: chỉ quân sự / chữa bệnh còn Kị -> DI_CHUYEN \`BO_KY\`.
  Không gặp thì theo thường lệ.

### 4. Bế nhật — 閉日

Nguồn Việt: 797–798.

Base: Kị DI_CHUYEN.

- Tý, Ngọ, Mão, Dậu: Vương nhật.
- Thìn, Tuất, Sửu, Mùi: Quan nhật + Thiên Lại.
- Hai nhóm trên nếu gặp Đức/Hợp/Xá/Nguyện theo source: cát/hung cân bằng;
  không gặp: theo thường lệ.
- Dần, Thân, Tỵ, Hợi: đồng thời Nguyệt Sát -> \`DELEGATE NGUYET_SAT\`.

### 5. Kiếp Sát — 劫煞

Nguồn Việt: 798–800.

Base: Kị DI_CHUYEN.

- Dần, Thân: Thu nhật + trường sinh; Dần/Thân còn có Lục Hợp theo source.
  Chỉ quân sự / chữa bệnh còn Kị -> DI_CHUYEN \`BO_KY\`.
- Tỵ, Hợi: Thu nhật + Nguyệt Hại.
  Gặp Nguyệt Đức / Thiên Đức Hợp theo source -> chỉ quân sự / chữa bệnh còn Kị.
  Không gặp: theo thường lệ.
- Thìn, Tuất, Sửu, Mùi: Trừ nhật + Tướng nhật.
  Gặp bốn Đức/Hợp -> chỉ quân sự / chữa bệnh còn Kị.
  Không gặp: cát/hung chỉ đủ cân bằng; không tự sinh Nên.
- Tý, Ngọ, Mão, Dậu: Chấp nhật.
  Gặp Nguyệt Đức / Nguyệt Đức Hợp -> cát/hung cân bằng.
  Không gặp: theo thường lệ.

### 6. Tai Sát — 災煞 / Thiên Hỏa

Nguồn Việt: 800.

Base: Kị giống Kiếp Sát, cộng nghĩa Thiên Hỏa.

- Dần, Thân, Tỵ, Hợi: Khai nhật.
- Thìn, Tuất, Sửu, Mùi: Mãn nhật.
- Hai nhóm trên gặp bốn Đức/Hợp -> chỉ quân sự / chữa bệnh còn Kị.
- Dần, Thân, Tỵ, Hợi không gặp Đức: cát/hung cân bằng.
- Thìn, Tuất, Sửu, Mùi không gặp Đức: theo thường lệ.
- Tý, Ngọ, Mão, Dậu: đồng thời Nguyệt Phá -> \`DELEGATE NGUYET_PHA\`.

### 7. Nguyệt Sát — 月煞 / Nguyệt Hư

Nguồn Việt: 801–802.

Base: Kị giống Kiếp Sát.

- Mão, Dậu: Lục Hợp.
  Gặp Nguyệt Đức + Thiên Nguyện theo source -> chỉ quân sự / chữa bệnh còn Kị;
  DI_CHUYEN \`BO_KY\`.
  Không gặp: cát/hung cân bằng.
- Tý, Ngọ: Nguyệt Hại.
  Gặp Nguyệt Đức Hợp -> cát/hung cân bằng.
  Không gặp: theo thường lệ.
- Dần, Thân, Tỵ, Hợi: Bế nhật.
- Thìn, Tuất, Sửu, Mùi: Bình nhật.
  Với bốn Đức/Hợp: theo thường lệ.
  Không có Đức/Hợp: mọi việc đều Kị.

### 8. Nguyệt Hình — 月刑

Nguồn Việt: 802–805.

Base: Kị DI_CHUYEN.

- Tỵ: Bình + Tướng + Lục Hợp.
  Gặp Nguyệt Đức + Thiên Đức Hợp + Thiên Nguyện theo source:
  chỉ quân sự / chữa bệnh còn Kị -> DI_CHUYEN \`BO_KY\`.
  Không gặp: cát/hung cân bằng.
- Dần: Bình + Tướng + Lục Hại.
- Thìn, Dậu, Hợi: Kiến nhật.
- Sửu, Tuất: Thu nhật.
  Các nhóm trên gặp bốn Đức/Hợp: cát/hung cân bằng; không gặp: theo thường lệ.
- Tý: Bình + Thiên Lại.
- Mão: Thu + Đại Thời.
- Mùi, Thân: Nguyệt Phá.
  Các nhóm này gặp Đức/Hợp: vẫn theo thường lệ; không gặp: mọi việc đều Kị.
- Ngọ: đồng thời Nguyệt Yếm -> \`DELEGATE NGUYET_YEM\`.

### 9. Nguyệt Yếm — 月厭 / Địa Hỏa

Nguồn Việt: 806–810.

Base: Kị DI_CHUYEN và đi xa trở về.

- Dần, Thân: Thành nhật.
- Sửu, Mùi: Khai nhật.
  Gặp Nguyệt Đức / Thiên Đức Hợp / Nguyệt Đức Hợp:
  source vẫn liệt kê DI_CHUYEN trong phần còn Kị -> \`GIU_KY_DU_CO_CAT\`.
- Thìn, Tuất: Định nhật.
- Tỵ, Hợi: Mãn nhật.
  Gặp Thiên Đức / Nguyệt Đức / Nguyệt Đức Hợp: cát/hung cân bằng.
  Không gặp: theo thường lệ.
- Tý, Ngọ: Nguyệt Yếm + Kiến.
  Gặp Thiên Xá: theo thường lệ; không gặp: mọi việc đều Kị.
- Mão, Dậu: Nguyệt Phá + Tai Sát.
  Dù gặp Đức/Hợp vẫn mọi việc đều Kị.

Q10 còn liệt kê nhiều ngày hội / xung / phá / âm dương đặc biệt.

Các nhánh ảnh hưởng trực tiếp DI_CHUYEN:

- Đại hội, Tiểu hội, Âm vị, Âm dương giao phá, Âm dương kích xung,
  Dương phá âm xung, Âm đạo xung dương, Tam âm, Âm dương câu thác,
  Tuyệt âm, Tuyệt dương ở các Can Chi/tháng được sách liệt kê:
  `CAM_MOI_VIEC`.
- Tuế bạc / Trục trận được ghi “theo chỗ Kị của Nguyệt Yếm”:
  DI_CHUYEN vẫn `GIU_KY`.
  Riêng tháng Tư Bính Ngọ và tháng Sáu Mậu Ngọ còn ghi không theo chỗ Nên
  của **Đức, Nguyện** / `德願`: loại Thiên Đức, Nguyệt Đức, Thiên Nguyện;
  không tự mở rộng sang các factor Hợp.
- Nhóm **Dương thác**: ngoài ngày đã đồng thời là Tiểu hội/hard-ban, source nói
  “đều theo chỗ Kị của Kiến”. Q10 Kiến nhật không có 般移 trong danh sách Kị,
  nên với DI_CHUYEN phải `BO_KY` thay vì giữ Kị Nguyệt Yếm.
- Riêng Dương thác tháng Sáu Kỷ Mùi còn bị ghi không theo chỗ Nên của
  **Đức Hợp** / `德合`: DI_CHUYEN không nhận Kị từ Nguyệt Yếm, đồng thời
  loại nhóm Đức + Hợp (Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp);
  không tự mở rộng sang Thiên Nguyện.
- Nhóm **Âm thác**: ngoài các ngày đồng thời Nguyệt Phá / Đại hội hard-ban,
  source nói theo Kị của Nguyệt Yếm, nên DI_CHUYEN vẫn `GIU_KY`.
- Riêng tháng Sáu, Đinh Tỵ và Kỷ Tỵ thuộc Đại hội nên `CAM_MOI_VIEC`;
  câu sau còn ghi Kỷ Tỵ không theo chỗ Nên của Đức Hợp.

Những ngày được source nói “mọi việc đều Kị” phải là hard prohibition, không
được phép được một Nên thông thường gỡ bỏ.

### 10. Đại Thời — 大時 / Đại Bại / Hàm Trì

Nguồn Việt: 811–812.

Base: Kị DI_CHUYEN.

- Dần, Thân, Tỵ, Hợi: Trừ + Quan; chỉ quân sự còn Kị -> DI_CHUYEN \`BO_KY\`.
- Thìn, Tuất: Chấp + Lục Hợp; chỉ quân sự còn Kị -> DI_CHUYEN \`BO_KY\`.
- Sửu, Mùi: Chấp + Lục Hại.
  Gặp hai Đức được source nêu -> chỉ quân sự còn Kị; không gặp: theo thường lệ.
- Tý, Ngọ, Mão, Dậu: Thu nhật.
  Tý, Ngọ gặp Nguyệt Đức Hợp; Dậu gặp Nguyệt Đức: cát/hung cân bằng.
  Không gặp: theo thường lệ.
  Mão đồng thời Nguyệt Hình -> \`DELEGATE NGUYET_HINH\`.

### 11. Thiên Lại — 天吏 / Trí Tử

Nguồn Việt: 813–814.

Base: Kị DI_CHUYEN.

- Dần, Thân, Tỵ, Hợi: Nguy nhật.
  Gặp bốn Đức/Hợp -> chỉ quân sự / chữa bệnh còn Kị -> DI_CHUYEN \`BO_KY\`.
  Không gặp: theo thường lệ.
- Thìn, Tuất, Sửu, Mùi: Bế nhật.
  Gặp Đức/Hợp/Xá/Nguyện theo source: cát/hung cân bằng; không gặp: thường lệ.
- Ngọ, Mão, Dậu: Bình nhật -> \`DELEGATE BINH\`.
- Tý: đồng thời Nguyệt Hình -> \`DELEGATE NGUYET_HINH\`.

### 12. Tứ Phế — 四廢

Nguồn Việt: 816–817.

Base: Kị DI_CHUYEN.

- Gặp Đức/Hợp vẫn Kị.
- Đồng thời Nguyệt Phá: mọi việc đều Kị.

Operation: \`GIU_KY_DU_CO_CAT\`; Tứ Phế + Nguyệt Phá -> \`CAM_MOI_VIEC\`.

### 13. Ngũ Mộ — 五墓

Nguồn Việt: 819.

Base: Kị DI_CHUYEN.

- Tháng Năm và tháng Mười Một, nếu đồng thời Nguyệt Đức: không Kị.
- Source giải thích không lấy Đức Hợp cho ngoại lệ này.

Trong month-by-term semantics của project, hai vị trí tháng tương ứng Chi tháng
Ngọ và Tý đã được dùng nhất quán trong factor/evaluator hiện tại.

Operation: Ngọ/Tý + Nguyệt Đức -> \`BO_KY\`; còn lại \`GIU_KY\`.

### 14. Quy Kị — 歸忌

Nguồn Việt: 822.

Bản Việt:

- Kị di chuyển, đi xa trở về.
- Gặp Đức, Nguyện, Xá vẫn phải Kị.

Hán bản:

- \`忌般移遠迴\`
- \`與德合赦願併猶忌\`

Khác biệt source phải giữ nguyên: Hán có chữ \`合\`, câu Việt ở trang 822 không
nêu “Hợp”.

Không tự chọn một bản để xóa khác biệt. Invariant production an toàn:

- Quy Kị match -> DI_CHUYEN vẫn Kị.
- Không dùng Nên để tự xóa blocker.
- Các contribution Nên vẫn được trace độc lập; không tự tạo phép triệt.

Operation: \`GIU_KY_DU_CO_CAT\`.

### 15. Vãng Vong — 往亡

Nguồn Việt: 822.

Base: Kị DI_CHUYEN.

Bản Việt ghi gặp Đức Hợp, Xá, Nguyện vẫn phải Kị. Hán bản cũng ghi
\`與德合赦願併猶忌\`.

Operation: \`GIU_KY_DU_CO_CAT\`.

## Đối chiếu Việt / Hán

Các bảng tháng, delegation và các ngoại lệ chính ở trên khớp logic giữa bản Việt
và Hán bản Quyển 10.

Khác biệt đã phát hiện trong phạm vi này:

### Quy Kị — chữ 合

- Việt p.822: “Đức, Nguyện, Xá”.
- Hán: \`德合赦願\`.

Không sửa bản dịch trong code, không mở rộng danh sách Việt bằng suy đoán.
Provenance phải giữ ghi chú khác biệt.

### Bình nhật tháng Thân — identity cát thần

- Việt p.791: “Thiên Đức, Thiên Đức Hợp”.
- Hán: `天德、月德合` = Thiên Đức + Nguyệt Đức Hợp.

Đây là khác biệt làm thay đổi identity factor. Theo source policy, Hán bản dùng
để phân biệt thuật ngữ gần nghĩa; nhánh production phải dùng
`THIEN_DUC + NGUYET_DUC_HOP`, đồng thời giữ ghi chú rằng bản Việt in
“Thiên Đức Hợp”.

### Thuật ngữ

- Việt dùng “Bế nhật”, Hán \`閉日\`.
- Việt dùng “Thu nhật”, Hán \`收日\`.
- “Thiên Lại” tương ứng \`天吏\`, alias “Trí Tử”.
- “Quy Kị” trong scan viết heading “QUI KỊ”, Hán \`歸忌\`; code giữ tên nghiệp
  vụ đã chuẩn hóa \`QUY_KY\`.

Ngoài hai điểm trên, chưa phát hiện khác biệt làm thay đổi formula/nhánh quyết
định khác trong 15 blocker chính.

## Delegation graph

Evaluator cần graph riêng, không copy chuỗi if của CUOI_HOI:

\`\`\`text
BINH
-> NGUYET_HINH
-> NGUYET_SAT

THU
-> KIEP_SAT
-> NGUYET_HINH

BE
-> NGUYET_SAT

TAI_SAT
-> NGUYET_PHA

NGUYET_HINH
-> NGUYET_YEM

NGUYET_YEM (nhánh Dương thác)
-> danh sách Kị của KIEN; DI_CHUYEN không nằm trong Kị Kiến nên BO_KY

DAI_THOI
-> NGUYET_HINH

THIEN_LAI
-> BINH
-> NGUYET_HINH
\`\`\`

Graph hiện không có cycle trong các nhánh source-lock ở trên, nhưng resolver
vẫn phải có visited-set để fail loud nếu dữ liệu tương lai tạo cycle.

## Regression vectors bắt buộc

Tối thiểu implementation PR phải có:

| Case                                                  | Expected DI_CHUYEN                        |
| ----------------------------------------------------- | ----------------------------------------- |
| Nguyệt Phá + Thiên Đức                                | vẫn Kị                                    |
| Nguyệt Phá tháng Mão/Dậu ở nhánh Tai Sát + Nguyệt Yếm | mọi việc Kị                               |
| Bình tháng Hợi                                        | bỏ Kị                                     |
| Bình tháng Dần                                        | delegate Nguyệt Hình                      |
| Bình tháng Thìn                                       | delegate Nguyệt Sát                       |
| Thu tháng Dần                                         | delegate Kiếp Sát                         |
| Thu tháng Mão                                         | delegate Nguyệt Hình                      |
| Thu tháng Thìn + Đức/Hợp                              | bỏ Kị                                     |
| Bế tháng Dần                                          | delegate Nguyệt Sát                       |
| Bế tháng Thìn + Đức/Hợp/Xá/Nguyện                     | cân bằng                                  |
| Kiếp Sát tháng Dần                                    | bỏ Kị                                     |
| Kiếp Sát tháng Tỵ + source virtue                     | bỏ Kị                                     |
| Tai Sát tháng Tý                                      | delegate Nguyệt Phá                       |
| Nguyệt Sát tháng Mão + Nguyệt Đức + Thiên Nguyện      | bỏ Kị                                     |
| Nguyệt Sát tháng Dần không Đức/Hợp                    | mọi việc Kị                               |
| Nguyệt Hình tháng Tỵ + source virtue                  | bỏ Kị                                     |
| Nguyệt Hình tháng Tý không Đức/Hợp                    | mọi việc Kị                               |
| Nguyệt Hình tháng Ngọ                                 | delegate Nguyệt Yếm                       |
| Nguyệt Yếm tháng Dần + Đức/Hợp                        | vẫn Kị DI_CHUYEN                          |
| Nguyệt Yếm tháng Tý không Thiên Xá                    | mọi việc Kị                               |
| Nguyệt Yếm tháng Mão dù có Đức/Hợp                    | mọi việc Kị                               |
| Nguyệt Yếm tháng Giêng ngày Giáp Dần (Dương thác)     | theo Kị Kiến -> bỏ Kị DI_CHUYEN           |
| Nguyệt Yếm tháng Tư ngày Kỷ Tỵ (Tiểu hội)             | mọi việc Kị                               |
| Nguyệt Yếm tháng Sáu ngày Kỷ Mùi (Dương thác)         | bỏ Kị, không nhận Nên Đức Hợp ở nhánh này |
| Nguyệt Yếm tháng Sáu ngày Kỷ Tỵ (Âm thác / Đại hội)   | mọi việc Kị                               |
| Đại Thời tháng Dần                                    | bỏ Kị                                     |
| Đại Thời tháng Mão                                    | delegate Nguyệt Hình                      |
| Thiên Lại tháng Dần + Đức/Hợp                         | bỏ Kị                                     |
| Thiên Lại tháng Ngọ                                   | delegate Bình                             |
| Thiên Lại tháng Tý                                    | delegate Nguyệt Hình                      |
| Tứ Phế + Đức/Hợp                                      | vẫn Kị                                    |
| Tứ Phế + Nguyệt Phá                                   | mọi việc Kị                               |
| Ngũ Mộ tháng Ngọ + Nguyệt Đức                         | bỏ Kị                                     |
| Ngũ Mộ tháng Tý + Nguyệt Đức                          | bỏ Kị                                     |
| Quy Kị + Thiên Đức                                    | vẫn Kị; giữ provenance Việt/Hán           |
| Quy Kị + Thiên Đức Hợp                                | vẫn Kị; không giả vờ Việt đã ghi chữ Hợp  |
| Vãng Vong + Thiên Xá                                  | vẫn Kị                                    |

## Representation đề xuất

Không tiếp tục mở rộng \`DanhGiaNgayService\` bằng hard-coded if theo từng
activity.

Nên chuyển Q10 thành data-driven rules:

\`\`\`ts
type PhepXuLyXungDot =
| { loai: 'GIU_KY' }
| { loai: 'BO_KY' }
| { loai: 'CAN_BANG'; catThan: readonly MaYeuTo[] }
| { loai: 'CAM_MOI_VIEC' }
| { loai: 'CHI_CON_QUAN_Y' }
| { loai: 'DELEGATE'; den: MaRuleDanhGia }
| { loai: 'GIU_KY_DU_CO_CAT'; catThan?: readonly MaYeuTo[] };
\`\`\`

Rule phải có:

- activity;
- blocker/Trực;
- điều kiện Chi tháng / Can Chi ngày / factor đồng thời;
- operation;
- precedence;
- source refs Việt + Hán;
- ghi chú khác biệt nếu có.

Resolver:

1. xác định contribution Q11 match;
2. tìm Q10 rules phù hợp;
3. chọn rule theo precedence source-defined;
4. delegate recursive khi cần;
5. fail loud nếu hai rule cùng precedence nhưng cho kết quả khác;
6. giữ trace operation + source;
7. không tự sinh Nên.

Implementation còn hỗ trợ Q10-only special-day operations `THEM_KY` và
`BO_NEN` cho các nhánh như Tuế bạc/Trục trận và Dương/Âm thác, vì các rule
này có thể áp dụng ngay cả khi không có contribution factor `NGUYET_YEM`.

## Trạng thái

- [x] exact Vietnamese pages 788–822 reopened from canonical user upload
- [x] corresponding Hán Q10 sections reopened
- [x] 15/15 DI_CHUYEN blockers mapped
- [x] Việt/Hán difference recorded explicitly
- [x] delegation graph defined
- [x] DI_CHUYEN regression vectors defined
- [x] representation requirements defined
- [x] generic Q10 resolver IMPLEMENTED
- [x] regression vectors ORACLE_TESTED
- [x] DI_CHUYEN end-to-end ORACLE_TESTED
