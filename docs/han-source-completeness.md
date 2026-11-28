# Hán Source Completeness

Mục tiêu của tài liệu này là trả lời chính xác hai câu khác nhau:

1. Hán bản tìm trên mạng có đúng cùng tác phẩm với bản Việt đang dùng không?
2. Phần functionality hiện có đã được kiểm độc lập bằng Hán bản tới đâu?

Không được suy từ câu trả lời “cùng tác phẩm” sang kết luận “đã implement/test toàn bộ 36 quyển”.

## Kết luận về identity của tác phẩm

Nguồn Hán được pin là:

- tác phẩm: `欽定協紀辨方書`;
- corpus: Kanripo `KR3g0051`;
- base edition do corpus khai báo: `WYG` — 文淵閣四庫全書;
- revision pin:
  `8b5522eb0299afbd575f1cb556e972c71c40c42a`.

Cấu trúc quyển/mục Hán khớp hệ 36 quyển của bản Việt Vũ Hoàng–Lân Bình:

- Q1–2 本原;
- Q3–8 義例;
- Q9 立成;
- Q10 宜忌;
- Q11 用事;
- Q12–13 公規;
- Q14–19 年表;
- Q20–31 月表;
- Q32 日表;
- Q33–34 利用;
- Q35 附錄;
- Q36 辨訛.

Vì vậy đây là **cùng tác phẩm/cùng hệ văn bản**, đủ điều kiện làm nguồn đối chiếu thứ hai.

Điều này **không** có nghĩa bản Việt và transcription Hán online giống từng ký tự.

## Corpus pin và gap Q14

Kanripo revision ở trên có 35 file text:

- `KR3g0051_001.txt` … `KR3g0051_013.txt`: Q1 … Q13;
- **không có 卷十四**;
- `KR3g0051_014.txt`: Q15;
- …
- `KR3g0051_035.txt`: Q36.

Q14 dùng fallback:

- Wikisource 四庫全書本;
- page `欽定協紀辨方書 (四庫全書本)/卷14`;
- revision `627109`;
- timestamp `2016-10-14T03:23:42Z`;
- raw SHA-256:
  `0db8d3d973392758282bfb49b98e71de30447114d8a8bf06ff54ebeaf01c3c8e`.

Không được giấu gap Kanripo bằng cách đánh lại số file.

Machine-readable manifest + SHA-256 từng file nằm ở:

`apps/api/src/sources/han-source-manifest.ts`.

## Trạng thái 36 quyển hiện tại

Đây là **book-level completeness**, không phải số lượng test.

| Quyển | Hán mục     | Trạng thái      | Scope hiện có                                                                                          |
| ----: | ----------- | --------------- | ------------------------------------------------------------------------------------------------------ |
|     1 | 本原一      | ORACLE_MOT_PHAN | Can/Chi, Thổ Vượng                                                                                     |
|     2 | 本原二      | CHUA_IMPLEMENT  | —                                                                                                      |
|     3 | 義例一      | CHUA_IMPLEMENT  | —                                                                                                      |
|     4 | 義例二      | ORACLE_MOT_PHAN | 12 Trực shared identities, 月厭/厭對, 陰陽不將                                                         |
|     5 | 義例三      | ORACLE_MOT_PHAN | Đức/Hợp, special days, 王日/民日, 四廢/四忌/四窮/五墓/八專/復日/重日/鳴吠…                             |
|     6 | 義例四      | ORACLE_MOT_PHAN | 40/40 mục đã inventory; 18 factor production có Hán oracle, phần còn lại explicit out-of-scope/blocked |
|     7 | 義例五      | ORACLE_MOT_PHAN | 13/13 mục đã inventory; safe subset đã oracle, 4 mục advanced bị block theo input/time model           |
|     8 | 義例六      | CHUA_IMPLEMENT  | —                                                                                                      |
|     9 | 立成        | ORACLE_MOT_PHAN | cross-check một số factor Q5/Q6                                                                        |
|    10 | 宜忌        | ORACLE_MOT_PHAN | semantic vectors cho 7 vertical hiện implement                                                         |
|    11 | 用事        | ORACLE_MOT_PHAN | exact 宜/忌 cho 7 vertical hiện implement                                                              |
|    12 | 公規一      | CHUA_IMPLEMENT  | —                                                                                                      |
|    13 | 公規二      | CHUA_IMPLEMENT  | —                                                                                                      |
|    14 | 年表一      | CHUA_IMPLEMENT  | Wikisource fallback; chưa implement                                                                    |
| 15–19 | 年表二–六   | CHUA_IMPLEMENT  | —                                                                                                      |
| 20–31 | 月表一–十二 | ORACLE_MOT_PHAN | month boundary/bảng tháng/Trực và các factor đã implement                                              |
|    32 | 日表        | ORACLE_MOT_PHAN | 60-day hour-table source vectors cho chọn giờ                                                          |
|    33 | 利用一      | ORACLE_MOT_PHAN | tương chủ theo sinh niên, xung/khắc mệnh                                                               |
|    34 | 利用二      | ORACLE_MOT_PHAN | nguyên tắc dùng giờ: trợ ngày, hợp/lộc/mã, tránh phá/hình/Ngũ Bất Ngộ                                  |
|    35 | 附錄        | CHUA_IMPLEMENT  | —                                                                                                      |
|    36 | 辨訛        | CHUA_IMPLEMENT  | —                                                                                                      |

Tổng hiện tại:

- 36 quyển được inventory;
- 23 quyển có Hán oracle **một phần**;
- 13 quyển chưa implement;
- **0 quyển** được đánh dấu full-volume oracle.

## Double-entry oracle hiện có

### Q4 + Nguyệt biểu

`han-q4-month-table-oracle.spec.ts` khóa trực tiếp:

- 建除十二神 rotation;
- 月破 12 tháng;
- 月厭 12 tháng;
- 厭對 12 tháng;
- 陰陽不將 tháng Giêng từ danh sách Hán.

Ngoài ra test Việt/source-independent hiện có vẫn chạy:

- `q4-shared-position-factors.spec.ts`: 12×12;
- `bat-tuong.spec.ts`: 12×60;
- `monthly-break.spec.ts`: 12×12.

### Q5

`han-q5-oracle.spec.ts` kiểm độc lập **toàn bộ 24 identity Q5 đang production**:

- 天徳;
- 月徳 / 天徳合 / 月徳合 / 月空 / 月恩;
- 天恩 / 天赦 / 天願;
- 母倉 / 四相 / 時徳;
- 王日 / 民日;
- 九空 / 五墓 / 四耗 / 四廢 / 四忌 / 四窮 / 八專;
- 復日 / 重日;
- 鳴吠 final 13-day correction.

### Q6

`han-q6-oracle.spec.ts` kiểm độc lập **toàn bộ factor Q6 hiện đang production**, không chỉ batch core ban đầu:

- core month→day-branch: 三合, 驛馬, 劫煞, 災煞, 月煞, 月刑, 月害, 六合, 五富, 天倉, 天賊;
- wedding/activity blockers: 大時, 天吏, 往亡;
- moving/auspicious factors: 天馬, 歸忌;
- earthwork factors: 土符 và 地囊.

Riêng `地囊` oracle khóa bảng đính chính ở `WYG_006-57a..58a`, không dùng bảng `歴例` cũ mà chính sách nói sai 23/48 chữ.

`docs/research/q6-full-inventory.md` khóa **40/40 mục Quyển 6**. Ngoài 18 factor production, các mục còn lại được phân `OUT_OF_SCOPE`, `META`, `BLOCKED_CONTEXT` hoặc `BLOCKED_CALENDAR`; không còn mục Q6 chưa locate. Phản Chi cần ngày sóc, Nguyệt Kị cần ngày âm lịch, Thượng Sóc cần Can năm.

### Q7

`hoang-hac-dao.spec.ts`, `selected-hour.spec.ts` và `docs/research/q7-day-hour-auxiliary.md` khóa scope đã implement bằng Hán source pin, đồng thời đã đối chiếu working scan bản Việt theo đúng trang in:

- 12 thần Hoàng/Hắc đạo và phép tháng→ngày, ngày→giờ;
- Bảo Quang thay tên Thiên Đức của riêng vòng Hoàng đạo này;
- Hắc đạo chỉ bổ sung kị cho nhóm việc nguồn nêu;
- Thiên Quan, Phúc Tinh, Hỷ Thần, Bát Lộc;
- Nhật Kiến/Hợp và Nhật Phá/Hại/Hình;
- Ngũ Bất Ngộ theo bảng đã hiệu chỉnh;
- Tuần trung Không vong và Triệt lộ Không vong dưới dạng marker tham khảo, không blanket veto.

Không phát hiện discrepancy Việt/Hán trong scope đã production. **Section inventory Q7 đã đủ 13/13 đầu mục**, nhưng Q7 vẫn chỉ là oracle một phần: Thiên Ất, Tứ Đại Cát Thời, Quý Đăng Thiên Môn và Cửu Xú chưa production vì contract hiện tại thiếu location/sunrise-sunset hoặc độ phân giải thời gian cần thiết.

### Q10

`han-q10-semantic-oracle.spec.ts` không copy nguyên matrix production.

Nó dùng source vectors để kiểm các mechanism:

- Kị vẫn giữ khi gặp Đức/Hợp;
- cát hóa Kị;
- residual activity list;
- hard-all;
- special exception;
- Phục/Trọng + 鳴吠;
- activity-specific differences.

Suite này đã tìm ra một bug thật mà test Việt cũ bỏ sót:

**CUOI_HOI — 卯/酉月 月破 + 災煞 + 月厭** phải `CAM_MOI_VIEC` dù gặp Đức/Hợp.

Bug đã được thêm regression và sửa trong evaluator.

### Tương chủ + giờ thực hiện

`personal-year.spec.ts`, `selected-hour.spec.ts` và
`docs/research/personal-year-and-hour-selection.md` khóa:

- dùng sinh niên, không bắt sinh nhật/giờ sinh;
- năm/tháng/ngày/giờ của thời điểm chọn so với mệnh;
- Can-Chi giờ theo Ngũ Thử Độn;
- giờ Hoàng/Hắc đạo và các marker Q7 đã implement;
- giờ phá, hình, hại, Ngũ Bất Ngộ;
- giờ trợ ngày, tam hợp/lục hợp, Lộc, Mã;
- xung năm sinh ở trụ giờ.

### Q11

`han-q11-oracle.spec.ts` chép expected 宜/忌 độc lập cho:

- 嫁娶;
- 般移〈移徙同〉;
- 興造動土;
- 修宮室;
- 開市;
- 行幸遣使〈出行同〉;
- 安葬.

Kết quả:

- 6 vertical khớp Hán exact;
- XUAT_HANH lệch đúng một mục đã đăng ký: Hán Q11 có `月厭`, bản Việt Q11 p.849 không in.

## Discrepancy registry

Machine-readable registry:

`apps/api/src/sources/han-source-discrepancies.ts`.

Hiện có ít nhất:

1. Q11 Xuất hành — `月厭` có ở Hán, thiếu ở dòng Q11 Việt;
2. Q5 Vương/Quan — hậu truyền đổi vị trí, Hiệp Kỷ bác việc đổi;
3. Q5 鳴吠 — danh sách truyền cũ 14 ngày vs final 起例/立成 13 ngày;
4. Q5 重日 — transcription online có ambiguity `己/巳`, ngữ cảnh + bản Việt xác nhận 巳/亥;
5. Q10 劫煞 Tỵ/Hợi — relief pair source-exact là Thiên Đức + Nguyệt Đức Hợp.

Policy: khác biệt phải có ID và production policy rõ; không normalize âm thầm.

## Ý nghĩa các nhãn test

- `ORACLE_TESTED`: có expected độc lập với implementation; nguồn có thể là Việt, bảng sách hoặc external standard.
- `HAN_ORACLE_TESTED`: có thêm expected/vector độc lập lấy từ Hán source pin.
- `ORACLE_MOT_PHAN` ở manifest: chỉ một phần nội dung của cả quyển đã được Hán-oracle.
- Không có nhãn nào ở trên tự động nghĩa là “full quyển”.

## Exit criterion để được gọi “full hai nguồn”

Chỉ được nói full hai nguồn khi:

1. 36/36 quyển có section inventory;
2. mọi section có trạng thái rõ;
3. mọi functionality được encode hoặc explicit out-of-scope;
4. mọi functionality encoded có Việt oracle;
5. mọi functionality encoded có Hán oracle hoặc discrepancy registry;
6. không còn volume-level `CHUA_IMPLEMENT` nếu product claim là “toàn bộ sách”;
7. GitHub Verify xanh với toàn bộ double-entry suite.

Hiện chưa đạt criterion này.
