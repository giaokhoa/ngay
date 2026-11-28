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
- `WYG_007-23b..24b`: 八祿 và 日建/日破/日合/日害/日刑. Kiến/Hợp thuận; Phá/Hình/Hại kị. Với việc đại sự, mới xét thêm xung với trụ năm/tháng.
- `KR3g0051_031.txt` (`WYG_031`): bảng ngày/giờ; Giáp Tý giờ Dần có Bạch Hổ đồng thời Lộc, Hỷ, Phúc Tinh, Mã — không được chấm điểm cộng cát thần để coi là giờ nên dùng.

## Đối chiếu bản Việt

Đã mở trực tiếp working scan Tập 1 Vũ Hoàng–Lân Bình được catalog trong `docs/source-catalog.md`. Working copy có thể đã repack nên không dùng hash của nó thay identity canonical; số trang dưới đây là **trang in** trong sách.

- p.568: sáu thần Hoàng đạo, sáu Hắc đạo và nhóm việc Hắc đạo kị khớp Hán `WYG_007-3b..4a`.
- p.572: thứ tự 12 thần, sáu cặp chi khởi Thanh Long, tháng khởi ngày và ngày khởi giờ khớp `WYG_007-7b..9b`.
- p.576–577: xác nhận dùng tên **Bảo Quang** để phân biệt Thiên Đức Hoàng đạo với Thiên Đức khác.
- p.586–587: Thiên Quan Quý Nhân theo nhật Can khớp đủ các vị trí Hán `WYG_007-19b`.
- p.588–589: Phúc Tinh Quý Nhân theo nhật Can khớp `WYG_007-20b`.
- p.590–591: Hỷ Thần khớp năm cặp Can và chi giờ của `WYG_007-21b..22b`, đồng thời giữ ngoại lệ không thắng Nhật Phá.
- p.592: Bát Lộc là Lộc vị của nhật Can, khớp `WYG_007-23b`.
- p.593–594: Nhật Kiến/Hợp là cát, Nhật Phá/Hại/Hình là hung; việc lớn mới xét thêm năm/tháng, khớp `WYG_007-24b`.
- p.616–618: Ngũ Bất Ngộ không được suy thành mọi trường hợp “hành Can giờ khắc hành Can ngày”. Bảng khóa theo Can ngày: Giáp→Ngọ, Ất→Tỵ, Bính→Thìn, Đinh→Mão, Mậu→Dần, Kỷ→Sửu/Hợi, Canh→Tý/Tuất, Tân→Dậu, Nhâm→Thân, Quý→Mùi; phần Thích Ý còn nhấn mạnh phải xét chi giờ tương sinh với nhật Can/Chi trước khi kết luận.

Hán `WYG_007-37b..39a` xác nhận cùng điểm: định nghĩa mở đầu là thời Can khắc nhật Can, nhưng ngay sau đó loại trường hợp chi giờ có quan hệ tương sinh với nhật Can/Chi. Bảng 60 ngày `WYG_031` khớp đúng mapping giờ ở trên.

Không phát hiện discrepancy Việt/Hán trong scope Q7 đang implement.

## Product policy

- Các nhãn Hoàng/Hắc đạo là **supplementary source layer**, tuyệt đối không sửa `danhGia` gốc của Dụng sự/Nghi kị.
- Chỉ các việc được Hán liệt kê cụ thể mới bị Hắc đạo bổ sung điều kị (CUOI_HOI, DI_CHUYEN, DONG_THO, SUA_CUNG_THAT, XUAT_HANH). KHAI_TRUONG và AN_TANG không bị áp blocker Q7 này.
- Hoàng đạo tự thân không biến một ngày đang Kị thành Tốt; giờ Hoàng đạo cũng không thắng được Phá/Hình/Hại/Ngũ Bất Ngộ.
- Công khai tên thần, lý do thực dụng, không công khai mã nghiên cứu.
- Không suy luận Thiên Ất Quý Nhân khi thiếu vị trí và giờ mặt trời mọc/lặn. Chính Hán `WYG_007-18a` nói nên dùng ngày mọc/lặn thực tế thay vì ranh giới Mão/Dậu mặc định.
- Không coi 旬中空亡/截路空亡 là blanket veto; sách Q7 có tranh luận và bác cách áp đại trà.

## Oracle/test

- `hoang-hac-dao.spec.ts`: 12 khởi điểm, vòng 12 thần, sáu Hoàng/sáu Hắc, Giáp Tý giờ theo bảng Hán, 4 cụm thần giờ và whitelist activity.
- `selected-hour.spec.ts`: ưu tiên điều kị dù cùng giờ có Phúc Tinh, Lộc, Hỷ, Mã; giờ Phá/Hình/Hại.
- `date-selection.service.spec.ts`: cross-activity, same-month Hắc kị đúng năm nhóm, không ảnh hưởng `danhGia` gốc.

## Không claim

Q7 mới được **oracle một phần**, không phải triển khai đầy đủ. Thiên Ất, Quý Đăng Thiên Môn, Tứ Đại Cát Thời, Kỳ Môn và các thế thần phức tạp vẫn nằm ngoài scope này.
