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

| Quyển | Hán mục     | Trạng thái      | Scope hiện có                                                                                               |
| ----: | ----------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
|     1 | 本原一      | ORACLE_MOT_PHAN | 17/17 mục Việt = 28/28 heading Hán inventory; Can/Chi, Ngũ Thử/Ngũ Hổ Độn, Thổ Vượng                        |
|     2 | 本原二      | CHUA_IMPLEMENT  | 12/12 section inventory; 24 sơn/ngũ hành địa lý/biến quẻ, thiếu spatial domain                              |
|     3 | 義例一      | CHUA_IMPLEMENT  | 36/36 mục đã inventory; annual spatial layer, current contract thiếu hướng/tọa-hướng                        |
|     4 | 義例二      | ORACLE_MOT_PHAN | 12 Trực shared identities, 月厭/厭對, 陰陽不將                                                              |
|     5 | 義例三      | ORACLE_MOT_PHAN | Đức/Hợp, special days, 王日/民日, 四廢/四忌/四窮/五墓/八專/復日/重日/鳴吠…                                  |
|     6 | 義例四      | ORACLE_MOT_PHAN | 40/40 mục inventory; 21 factor production-computable/Hán-oracle, gồm 上朔/反支/月忌 đã mở khóa              |
|     7 | 義例五      | ORACLE_MOT_PHAN | 13/13 mục đã inventory; safe subset đã oracle, 4 mục advanced bị block theo input/time model                |
|     8 | 義例六      | CHUA_IMPLEMENT  | 22/22 mục Việt inventory (24 heading Hán); phi cung/24 sơn/Cửu cung, thiếu spatial domain                   |
|     9 | 立成        | ORACLE_MOT_PHAN | full structure: 10 niên + 30 nguyệt + 2 trang nhật + 6 biểu thời; oracle subset                             |
|    10 | 宜忌        | ORACLE_MOT_PHAN | 51/51 mục Việt = 99/99 heading Hán inventoried; semantic oracle exact cho 9 current vertical                |
|    11 | 用事        | ORACLE_MOT_PHAN | 73/73 canonical activity sections inventoried; 9 oracle-tested, 64 out-of-scope current product             |
|    12 | 公規一      | CHUA_IMPLEMENT  | 8/8 top-level inventory; lịch quan/thiên văn, sunrise tables latitude-specific                              |
|    13 | 公規二      | CHUA_IMPLEMENT  | 2/2 top-level inventory; canh lậu/trung tinh + tinh đồ, bảng Kinh sư                                        |
|    14 | 年表一      | CHUA_IMPLEMENT  | exact T2 p5; 甲子→癸酉, Wikisource fallback; spatial year table                                             |
| 15–19 | 年表二–六   | CHUA_IMPLEMENT  | exact T2 p56/107/158/209/260; cùng Q14 phủ 60/60 Can-Chi; 3 己→巳 transcription errors source-locked        |
| 20–31 | 月表一–十二 | ORACLE_MOT_PHAN | exact T2 12/12 structure verified; month boundary/Trực/factor oracle subset, chưa claim 720-row full oracle |
|    32 | 日表        | ORACLE_MOT_PHAN | exact T2 3/3 mục verified; 60-day hour vectors partial, Quý Đăng/Tứ Đại Cát blocked                         |
|    33 | 利用一      | ORACLE_MOT_PHAN | exact T2 14 mục = 15 heading Hán; 論用盤針+羅經圖 gộp; 相主 oracle partial                                  |
|    34 | 利用二      | ORACLE_MOT_PHAN | exact T2 10 mục ↔ 12 Hán heading; 時刻方位圖 omitted; 用時法 oracle partial                                 |
|    35 | 附錄        | CHUA_IMPLEMENT  | exact T2 13 mục ↔ 16 Hán heading; 百忌/祀竈/洗頭 gộp; 竒門三元 omitted                                      |
|    36 | 辨訛        | CHUA_IMPLEMENT  | exact T2 26 mục ↔ 27 Hán heading; 章光+五合五離 gộp; TOC Thiên đạo → body Lục đạo/六道 typo                 |

Tổng hiện tại:

- 36 quyển được inventory;
- 23 quyển có Hán oracle **một phần**;
- 13 quyển chưa implement;
- **0 quyển** được đánh dấu full-volume oracle.

## Double-entry oracle hiện có

### Q1

`docs/research/q1-full-inventory.md` khóa **17/17 mục Việt = 28/28 heading Hán**. Oracle production hiện cover Can/Chi, Ngũ Thử/Ngũ Hổ Độn và Thổ Vượng; Bát quái/Nạp Giáp/thiên văn còn lại là foundation/reference hoặc spatial blocker.

### Q2

`docs/research/q2-full-inventory.md` khóa **12/12 section**. Đây là nền 24 sơn/ngũ hành địa lý/biến quẻ; giữ `CHUA_IMPLEMENT` vì current product thiếu spatial/compass/trigram target.

### Q3

`docs/research/q3-full-inventory.md` khóa **36/36 mục đánh số** của Quyển 3 (cộng closing `總論` không đánh số). Q3 vẫn `CHUA_IMPLEMENT`: calendar đã có Can Chi năm theo Lập Xuân nhưng factor/evaluation context không có spatial target; phần lớn Q3 là `所理之地/方/向`, không phải day factor. Các tên trùng `劫煞/災煞/小耗/官符/大煞` không được nhập với identity Q4/Q6 hiện có.

### Q8

`docs/research/q8-full-inventory.md` khóa **22/22 mục đánh số của bản Việt**. Hán có 24 heading do tách `歲禄/飛天禄` và `灸退/獨火`. Q8 vẫn `CHUA_IMPLEMENT`: output chủ yếu là phi cung/24 sơn/tọa-hướng/Cửu cung, current product chưa có spatial target/Nine-Palace domain.

### Q4

`docs/research/q4-full-inventory.md` khóa **29/29 section mục lục Q4**. Ngoài shared-position/Bất Tương oracle, Q10 layer đã source-lock hard days, Tuế Bạc/Trục Trận, Âm/Dương Thác và các nhánh Nguyệt Yếm. Các mục Hành Ngoan/Liễu Lệ/Cô Thần là semantic input, không bị biến thành factor độc lập.

Ngoài oracle vị trí/Âm Dương Bất Tương, Q10 hard-day coverage của các hội Âm/Dương Q4 đã được canonical hóa tại `q4-hard-days.ts`: 34 identity/vector từ `WYG_010-48a..49b`, gồm Đại/Tiểu Hội, Tam Âm, Âm Vị, các giao phá/xung, các Âm Thác hard-overlap và Tuyệt Âm/Tuyệt Dương. Cùng set này được test áp cho đủ 9 vertical; trước fix, Cưới hỏi bỏ sót toàn bộ lớp này và ba matrix cũ bỏ sót Tuyệt Âm/Tuyệt Dương.

- Nguyệt biểu

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

`docs/research/q5-full-inventory.md` khóa **30/30 section mục lục Q5**. Thiên Đạo giữ directional, Vô Lộc giữ context-dependent, các section ghép được đánh partial thay vì claim full.

### Q6

`han-q6-oracle.spec.ts` kiểm độc lập **toàn bộ factor Q6 hiện đang production**, không chỉ batch core ban đầu:

- core month→day-branch: 三合, 驛馬, 劫煞, 災煞, 月煞, 月刑, 月害, 六合, 五富, 天倉, 天賊;
- wedding/activity blockers: 大時, 天吏, 往亡;
- moving/auspicious factors: 天馬, 歸忌;
- earthwork factors: 土符 và 地囊;
- year/lunar-context factors: 上朔, 反支, 月忌日.

Riêng `地囊` oracle khóa bảng đính chính ở `WYG_006-57a..58a`, không dùng bảng `歴例` cũ mà chính sách nói sai 23/48 chữ.

`docs/research/q6-full-inventory.md` khóa **40/40 mục Quyển 6**. 21 factor hiện production-computable. Thượng Sóc/Phản Chi/Nguyệt Kị đã được mở khóa bằng Can Chi năm + astronomical new-moon/lunar-day context; các mục còn lại vẫn explicit `OUT_OF_SCOPE`/`META` hoặc blocker khác.

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

### Q14–19 Niên biểu

`docs/research/q14-q19-annual-tables.md` khóa 6/6 block niên biểu, range 60/60 Can-Chi. Q14 dùng fallback Wikisource revision pin vì Kanripo thiếu 卷十四; Q15–19 dùng Kanripo. Đây là spatial annual tables cho Q3/Q8, chưa phải day-selection oracle. Kanripo transcription có một số dị tự như `己`→`巳` ở row heading, nên không parse thẳng làm production data trước normalization/scan cross-check.

### Q35–36

- Q35: `docs/research/q35-full-inventory.md` exact-map **13 mục Việt ↔ 16 heading Hán**. Mục 6 gộp `百忌日/祀竈日/洗頭日`; `竒門三元` bị lược hoàn toàn khỏi exact T2 và đã vào discrepancy registry.
- Q36: `docs/research/q36-full-inventory.md` exact-map **26 mục Việt ↔ 27 heading Hán** do gộp `章光` + `五合五離`. TOC mục 24 in “Thiên đạo”, nhưng thân bài p982 là “Lục đạo/六道”; registry khóa đây là TOC typo.
- Cả hai giữ `CHUA_IMPLEMENT`; Q36 vẫn là **辨訛 — anti-oracle/refutation source**.

### Q12–13

- Q12: `docs/research/q12-full-inventory.md`, **8/8 top-level section**. Bảng sunrise/sunset in sách là cho Kinh sư 39°55′; source nói các tỉnh phải tính lại theo latitude + solar declination.
- Q13: `docs/research/q13-full-inventory.md`, **2/2 top-level section**. Canh lậu/trung tinh và tinh đồ cũng lấy Kinh sư làm local horizon.
- Cả hai giữ `CHUA_IMPLEMENT`; không được dùng bảng Bắc Kinh làm shortcut cho Q7.

### Q20–31 Nguyệt biểu

`docs/research/q20-q31-month-tables.md` exact-map **12/12 volume structure** từ Tập II: trang in 311/339/367/396/423/451/480/507/535/565/594/622. Mỗi quyển là một tháng tiết khí với trung khí/Nguyệt tướng + bảng 60 Can-Chi ngày. Oracle vẫn partial; exact scan đã gỡ blocker nguồn Việt nhưng chưa claim 720 row cell-by-cell.

### Q9

`docs/research/q9-full-inventory.md` khóa **4/4 phần = 10 biểu niên + 30 biểu nguyệt + 2 trang nhật + 6 biểu thời** từ scan Việt T1 PDF 717 / trang in 710 và Hán Q9. Q9 là oracle/index, không thay Nghĩa lệ làm calculator spec; coverage runtime vẫn partial.

### Q32–34

- Q32: `docs/research/q32-full-inventory.md`, exact T2 **3/3 mục** khớp Hán; 60-day hour table có oracle subset, `貴登天門` và `四大吉時` blocked theo location/time model.
- Q33: `docs/research/q33-full-inventory.md`, exact T2 **14 mục ↔ 15 heading Hán**; mục 13 gộp `論用盤針 + 羅經圖`; `相主` là production subset.
- Q34: `docs/research/q34-full-inventory.md`, exact T2 **10 mục ↔ 12 heading Hán**; `月吉/月凶` gộp và `時刻方位圖` bị lược. `用時法` là production subset, solar/spatial layer blocked.

### Q10

`docs/research/q10-full-inventory.md` khóa **51/51 mục đánh số bản Việt = 99/99 heading TOC Hán**. Raw grep 101 heading Hán có thêm hai heading nội dung lặp `以上所宜/以上所忌`, không phải denominator. Exact semantic oracle hiện vẫn giới hạn 9 vertical production; các nhóm khác source-only/blocked/out-of-scope có trạng thái explicit.

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

`docs/research/q11-full-inventory.md` khóa **73/73 section Dụng sự canonical**. Ba catalog đầu quyển 67 Ngự dụng / 37 Dân dụng / 60 Thông thư có overlap; thân quyển hợp thành 73 section chi tiết. Đây là lý do không dùng “60 việc” làm denominator full-volume; `修宮室` là một section production riêng ngoài list 60 Thông thư.

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

## Exact Tập II Việt/Hán

`docs/research/t2-exact-viet-han-crosscheck.md` khóa page map Q14–36 và các exact discrepancy của canonical Tập II 1001 trang. Từ audit này, secondary TOC không còn là bằng chứng chính cho Tập II.

## Structural inventory milestone

Sau các inventory note hiện tại, **36/36 quyển đã có structural denominator/scope explicit** ở mức phù hợp loại nguồn (section, table block, activity catalog hoặc appendix/refutation heading). Điều này chỉ đóng milestone **inventory**, không nâng bất kỳ quyển nào thành full-volume oracle và không thay các blocker exact Việt Tập 2 scan/spatial/time/location đã ghi.

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
