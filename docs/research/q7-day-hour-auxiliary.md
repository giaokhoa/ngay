# Hán Q7: Hoàng/Hắc đạo và thần giờ (internal source lock)

**Không đưa mã Q, số quyển/trang, revision/hash ra consumer UI.**

## Source

- Kanripo KR3g0051; base edition WYG / 文淵閣四庫全書.
- Revision `8b5522eb0299afbd575f1cb556e972c71c40c42a`.
- File `KR3g0051_007.txt`; SHA-256 đã pin ở `han-source-manifest.ts`.
- `WYG_007-3b..4a`: sáu thần Hoàng đạo và sáu Hắc đạo; **Hắc đạo kị** việc dựng đất/nhà, dời chỗ, đi xa, cưới hỏi, xuất quân. Không mở rộng sang khai trương/an táng khi chưa có nguồn cụ thể.
- `WYG_007-7b..9b`: thứ tự 12 thần: 青龍, 明堂, 天刑, 朱雀, 金匱, 天德/寶光, 白虎, 玉堂, 天牢, 元武, 司命, 勾陳. Dần/Thân khởi Thanh Long tại Tý, Mão/Dậu tại Dần, Thìn/Tuất tại Thìn, Tỵ/Hợi tại Ngọ, Tý/Ngọ tại Thân, Sửu/Mùi tại Tuất. **Ngày lấy Chi tháng, giờ lấy Chi ngày**.
- `WYG_007-11b..12a`: tên Bảo Quang được dùng thay cho Thiên Đức Hoàng đạo để tránh trùng với Thiên Đức khác.
- `WYG_007-19b..20b`: 天官貴人 (theo nhật Can), 福星貴人 (theo nhật Can sinh thời Can).
- `WYG_007-21b..22b`: 喜神 theo ngày Can, nhưng **không thắng được Nhật Phá**, được chính sách lấy Giáp/Kỷ ngày Dần giờ gặp Thân ngày làm phản ví dụ.
- `WYG_007-13b..18a`: 天乙貴人 phân Dương quý/Âm quý; ranh ngày đêm phải theo mặt trời mọc/lặn thực tế.
- `WYG_007-23b..24b`: 八祿 và 日建/日破/日合/日害/日刑. Kiến/Hợp thuận; Phá/Hình/Hại kị. Với việc đại sự, mới xét thêm xung với trụ năm/tháng.
- `WYG_007-25b..26b`: 四大吉時 / 四煞沒時 dùng Nguyệt tướng và mô hình `八干四卦`, có độ phân giải dưới 12 thời thần.
- `WYG_007-32b..36a`: 貴登天門 dùng Nguyệt tướng gia thời, Âm/Dương quý và phép ngày/đêm.
- `WYG_007-37b..39a`: 五不遇 và điều kiện không over-flag khi chi giờ tương sinh với nhật Can/Chi.
- `WYG_007-42b..44a`: 九醜; mười ngày danh nghĩa chưa đủ, phải có 大吉 thực sự lâm nhật chi theo Nguyệt tướng/giờ.
- `WYG_007-45b..47b`: 旬中空亡 và 截路空亡, cùng phần biện giải không cho blanket-veto.
- `KR3g0051_031.txt` (`WYG_031`): bảng ngày/giờ; Giáp Tý giờ Dần có Bạch Hổ đồng thời Lộc, Hỷ, Phúc Tinh, Mã — không được chấm điểm cộng cát thần để coi là giờ nên dùng.

## Đối chiếu bản Việt

Đã mở trực tiếp working scan Tập 1 Vũ Hoàng–Lân Bình được catalog trong `docs/source-catalog.md`. Working copy có thể đã repack nên không dùng hash của nó thay identity canonical; số trang dưới đây là **trang in** trong sách.

- p.568: sáu thần Hoàng đạo, sáu Hắc đạo và nhóm việc Hắc đạo kị khớp Hán `WYG_007-3b..4a`.
- p.572: thứ tự 12 thần, sáu cặp chi khởi Thanh Long, tháng khởi ngày và ngày khởi giờ khớp `WYG_007-7b..9b`.
- p.576–577: xác nhận dùng tên **Bảo Quang** để phân biệt Thiên Đức Hoàng đạo với Thiên Đức khác.
- p.579–584: Thiên Ất Quý Nhân khớp Dương/Âm quý; phần kết luận chọn mặt trời xuất/nhập làm ranh ngày đêm, không dùng Mão/Dậu mặc định.
- p.586–587: Thiên Quan Quý Nhân theo nhật Can khớp đủ các vị trí Hán `WYG_007-19b`.
- p.588–589: Phúc Tinh Quý Nhân theo nhật Can khớp `WYG_007-20b`.
- p.590–591: Hỷ Thần khớp năm cặp Can và chi giờ của `WYG_007-21b..22b`, đồng thời giữ ngoại lệ không thắng Nhật Phá.
- p.592: Bát Lộc là Lộc vị của nhật Can, khớp `WYG_007-23b`.
- p.593–594: Nhật Kiến/Hợp là cát, Nhật Phá/Hại/Hình là hung; việc lớn mới xét thêm năm/tháng, khớp `WYG_007-24b`.
- p.595–598: Tứ Đại Cát Thời khớp phép Tứ Sát Một và mô hình vị trí/khắc giờ của Hán.
- p.599–615: Quý Đăng Thiên Môn khớp Nguyệt tướng gia thời, Âm/Dương quý và phân ngày/đêm.
- p.616–618: Ngũ Bất Ngộ. Vòng trên của đồ p.616 khóa 10 cặp **Can ngày → Can giờ khắc**: Giáp→Canh, Ất→Tân, Bính→Nhâm, Đinh→Quý, Mậu→Giáp, Kỷ→Ất, Canh→Bính, Tân→Đinh, Nhâm→Mậu, Quý→Kỷ. Vòng dưới minh họa thuyết `時支尅日支` được dẫn ra để biện (Thủy↔Thổ, Mộc↔Kim, Hỏa↔Thủy...), **không phải exception lookup**. Phần Thích Ý/biện giải nói chi có khí tạp và nếu chi giờ tương sinh với nhật Can/Chi thì lại không phải Ngũ Bất Ngộ, thậm chí nêu ngày Thổ gặp giờ Dần/Mão làm phản ví dụ.
- p.619–622: Cửu Xú khớp danh sách mười ngày và điều kiện “chân Cửu Xú” phải có Đại Cát lâm nhật chi; không được chỉ nhìn day identity.
- p.623–625: Tuần trung Không vong — Giáp Tý tuần khuyết Tuất/Hợi; Giáp Tuất khuyết Thân/Dậu; Giáp Thân khuyết Ngọ/Mùi; Giáp Ngọ khuyết Thìn/Tỵ; Giáp Thìn khuyết Dần/Mão; Giáp Dần khuyết Tý/Sửu. Sách nói Không vong không thể đồng loạt coi là hung.
- p.626–627: Triệt lộ Không vong — Giáp/Kỷ→Thân/Dậu; Ất/Canh→Ngọ/Mùi; Bính/Tân→Thìn/Tỵ; Đinh/Nhâm→Dần/Mão; Mậu/Quý→Tý/Sửu/Tuất/Hợi. Phần Thích Ý không cho phép biến nó thành veto phổ quát.

Hán `WYG_007-37b..39a` xác nhận Ngũ Bất Ngộ. `WYG_007-45b..46b` xác nhận 旬中空亡 và lời bác cách coi mọi Không vong là hung; `WYG_007-47b` xác nhận 截路空亡.

### Tension nội bộ Q7 ↔ Q32 về Ngũ Bất Ngộ

Q7 prose và Q32 operational table không hoàn toàn hòa giải được bằng một công thức duy nhất:

- Q7 `WYG_007-38b..39a` nói sau khi Can giờ khắc Can ngày vẫn phải xét chi giờ có tương sinh với nhật Can/Chi hay không; nếu tương sinh thì “lại không phải 五不遇”, và đặt câu hỏi vì sao cứ ngày Thổ gặp giờ Dần/Mão lại gọi Ngũ Bất Ngộ.
- Nhưng Q32 `六十日時辰定局` vẫn đánh `五不遇` theo candidate cố định của Can ngày trong bảng 60 ngày × 12 giờ. Exact Việt Tập II xác nhận trực tiếp các case như **Bính Dần–Thìn, Đinh Mão–Mão, Mậu Thìn–Dần** và toàn 10 lớp Can đầu tiên; tức Mậu nhật giờ Dần vẫn được bảng vận hành đánh Ngũ Bất Ngộ.
- Vì module `selected-hour` đang hiện thực **bảng giờ vận hành Q32**, production theo Q32 concrete oracle, không tự áp hidden-qi cancellation từ prose Q7. Đây là policy có chủ đích, không phải bỏ sót lời biện.
- Tension được đăng ký ở `Q7_NGU_BAT_NGO_COMMENTARY_VS_Q32_TABLE`; nếu sau này có product mode riêng cho phép luận biện/khí tạp thì phải tách semantics thay vì âm thầm thay bảng Q32.

Kanripo Q32 còn có hai defect transcription đã được exact Việt source-lock:

- `WYG_031-17a..17b`: header `己亥` bị chép thành `巳亥`; Việt p.667–668 in **Kỷ Hợi**, và cả Sửu/Hợi đều có Ngũ Bất Ngộ.
- `WYG_031-23a`: Kanripo text nhảy từ `辛亥` sang `癸丑`, thiếu toàn row `壬子`; Việt p.671–672 có **Nhâm Tý**, trong đó giờ Thân in “Thanh Long / Ngũ Bất Ngộ”. Registry chỉ coi **text transcription** bị thiếu, không suy rằng ảnh WYG gốc thiếu row.

Ngoài tension nội bộ trên, không phát hiện discrepancy Việt/Hán làm thay đổi mapping operational Q7/Q32 đang production.

## Inventory đủ Quyển 7

Quyển 7 có 13 đầu mục theo mục lục Hán. Tất cả 13 mục đã được locate và đối chiếu đủ để quyết định trạng thái product; **inventory đủ không đồng nghĩa production implement đủ cả quyển**.

|   # | Mục                          | Research      | Product     | Lý do / blocker                                                                                                   |
| --: | ---------------------------- | ------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
|   1 | Hoàng đạo - Hắc đạo          | ORACLE_TESTED | IMPLEMENTED | Ngày theo chi tháng, giờ theo chi ngày; 12 thần có Q31 oracle                                                     |
|   2 | Thiên Ất Quý Nhân            | COMPARED      | BLOCKED     | Phải phân Âm/Dương quý theo ngày/đêm thực tế; sách chốt ranh bằng mặt trời mọc/lặn, cần location + solar-event    |
|   3 | Thiên Quan Quý Nhân          | ORACLE_TESTED | IMPLEMENTED | Lookup theo nhật Can, Q31 cross-check                                                                             |
|   4 | Phúc Tinh Quý Nhân           | ORACLE_TESTED | IMPLEMENTED | Lookup theo nhật Can và chi giờ, Q31 cross-check                                                                  |
|   5 | Hỷ Thần                      | ORACLE_TESTED | IMPLEMENTED | Lookup theo nhật Can; không thắng Nhật Phá                                                                        |
|   6 | Bát Lộc                      | ORACLE_TESTED | IMPLEMENTED | Lộc vị của nhật Can                                                                                               |
|   7 | Nhật Kiến/Phá/Hợp/Hại/Hình   | ORACLE_TESTED | IMPLEMENTED | Quan hệ chi ngày ↔ chi giờ                                                                                        |
|   8 | Tứ Đại Cát Thời / Tứ Sát Một | COMPARED      | BLOCKED     | Nguồn dùng 24 vị trí/`八干四卦` và các khắc trong giờ; model 12 thời thần hiện tại không đủ độ phân giải          |
|   9 | Quý Đăng Thiên Môn           | COMPARED      | BLOCKED     | Cần Nguyệt tướng, Âm/Dương quý theo sunrise/sunset và phép gia thời; không được rút xuống lookup 12 giờ           |
|  10 | Ngũ Bất Ngộ                  | ORACLE_TESTED | IMPLEMENTED | Production theo operational table Q32; Q7 prose có tension đã registry, không tự triệt theo tàng khí              |
|  11 | Cửu Xú                       | COMPARED      | BLOCKED     | “Chân Cửu Xú” cần Đại Cát lâm nhật chi theo Nguyệt tướng + giờ chính xác; biên tiết có thể đổi trong bucket 2 giờ |
|  12 | Tuần trung Không vong        | ORACLE_TESTED | INFO_MARKER | Sách tự bác cách coi toàn bộ Không vong là hung                                                                   |
|  13 | Triệt lộ Không vong          | ORACLE_TESTED | INFO_MARKER | Hiển thị tham khảo, không blanket veto                                                                            |

### Blocker của bốn mục chưa production

- **Thiên Ất Quý Nhân:** Hán `WYG_007-18a` chốt ngày/đêm bằng `日出入`; bản Việt p.584 cũng chọn mặt trời xuất/nhập thay vì mặc định Mão/Dậu. Chỉ timezone không đủ để tính sunrise/sunset.
- **Tứ Đại Cát Thời:** Hán `WYG_007-25b..26b` dùng `八干四卦` và nói đến các khắc phía trên của thời; bản Việt p.595–598 trình bày cùng mô hình. API hiện trả 12 bucket Địa Chi, nên ép vào đó sẽ làm mất nghĩa nguồn.
- **Quý Đăng Thiên Môn:** Hán `WYG_007-32b..36a` dùng Nguyệt tướng gia thời, Âm/Dương quý và mô hình thời chi tiết; bản Việt p.599–615 khớp. Cùng blocker location/sunrise-sunset với Thiên Ất.
- **Cửu Xú:** Hán `WYG_007-42b..44a` bác cách chỉ nhìn mười ngày danh nghĩa; phải có Đại Cát thực sự lâm nhật chi. Ví dụ khi Nguyệt tướng là Tý, Mậu Tý chỉ giờ Sửu và Mậu Ngọ chỉ giờ Mùi mới là Cửu Xú. Cần Nguyệt tướng tại instant giờ để an toàn qua biên tiết.

Bốn mục này được giữ ở `COMPARED`, không để một agent sau tự coi “công thức quen thuộc” là đủ VERIFIED.

## Product policy

- Các nhãn Hoàng/Hắc đạo là **supplementary source layer**, tuyệt đối không sửa `danhGia` gốc của Dụng sự/Nghi kị.
- Chỉ các việc được Hán liệt kê cụ thể mới bị Hắc đạo bổ sung điều kị (CUOI_HOI, DI_CHUYEN, DONG_THO, SUA_CUNG_THAT, XUAT_HANH). KHAI_TRUONG và AN_TANG không bị áp blocker Q7 này.
- Hoàng đạo tự thân không biến một ngày đang Kị thành Tốt; giờ Hoàng đạo cũng không thắng được Phá/Hình/Hại/Ngũ Bất Ngộ.
- Công khai tên thần, lý do thực dụng, không công khai mã nghiên cứu.
- Không suy luận Thiên Ất Quý Nhân khi thiếu vị trí và giờ mặt trời mọc/lặn. Chính Hán `WYG_007-18a` nói nên dùng ngày mọc/lặn thực tế thay vì ranh giới Mão/Dậu mặc định.
- `旬中空亡` / `截路空亡` được trả ra như dấu **tham khảo**, không thêm `lyDoTranh` và không tự đổi xếp loại giờ; sách Q7 bác cách áp đại trà như một blanket veto.

## Oracle/test

- `hoang-hac-dao.spec.ts`: 12 khởi điểm, vòng 12 thần, sáu Hoàng/sáu Hắc, Giáp Tý giờ theo bảng Hán, 4 cụm thần giờ và whitelist activity.
- `selected-hour.spec.ts`: ưu tiên điều kị dù cùng giờ có Phúc Tinh, Lộc, Hỷ, Mã; giờ Phá/Hình/Hại; Ngũ Bất Ngộ theo operational Q32, gồm regression Mậu nhật–Dần để không bị lời biện Q7 vô tình đổi semantics; Không vong chỉ là dấu tham khảo.
- `hoang-hac-dao.spec.ts`: oracle `旬空`/`路空` trực tiếp với Giáp Tý, Giáp Thìn và Mậu Tý theo bảng Q31.
- `date-selection.service.spec.ts`: cross-activity, same-month Hắc kị đúng năm nhóm, không ảnh hưởng `danhGia` gốc.

## Giới hạn claim

**Inventory Quyển 7 đã đủ 13/13 đầu mục.** Oracle/production coverage vẫn chỉ là một phần, không phải full-volume: Thiên Ất, Tứ Đại Cát Thời, Quý Đăng Thiên Môn và Cửu Xú được giữ ở `COMPARED` cho tới khi product có đúng input và time model mà nguồn đòi hỏi. Không có đầu mục Q7 nào còn ở trạng thái chưa locate/không rõ scope.
