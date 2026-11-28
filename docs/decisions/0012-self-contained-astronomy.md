# ADR 0012: Self-contained Sun/Moon ephemeris

Status: Accepted

## Bối cảnh

ADR 0004 ban đầu chọn `astronomy-engine` để giảm rủi ro khi tính instant tiết khí. Sau khi Q6 cần thêm thời điểm sóc và project bắt đầu mở các lớp thời gian/thiên văn sâu hơn, calendar core sẽ ngày càng phụ thuộc vào một package bên ngoài cho hai primitive nền tảng:

- địa tâm thị hoàng kinh Mặt Trời;
- pha Mặt Trăng / thời điểm sóc.

Yêu cầu mới của project là tự sở hữu implementation thay vì giữ runtime dependency.

Một công thức Mặt Trời rút gọn kiểu mean anomaly/equation-of-center đã được thử và **bị loại**: sai tới khoảng 14 phút so với HKO/Astronomy Engine, vượt xa tolerance hiện tại.

## Quyết định

Dùng module nội bộ `apps/api/src/calendar/astronomy/ephemeris.ts`.

Module chỉ giữ phần thiên văn calendar cần:

- Earth VSOP series;
- precession;
- IAU 2000B nutation;
- light-time/aberration cho apparent solar longitude;
- Brown / Improved Lunar Ephemeris series;
- geometric Sun-Moon longitude difference cho lunar phase;
- Delta-T Espenak/Meeus;
- deterministic root search cho solar longitude và lunar phase.

Không giữ dependency runtime `astronomy-engine`.

## Provenance và license

Phần coefficients/formulas được adapt từ Astronomy Engine 2.1.19 của Don Cross (MIT), cùng các nguồn khoa học mà package đó nêu: VSOP, IAU models, Nautical Almanac Office Improved Lunar Ephemeris và Espenak/Meeus.

Full MIT notice được giữ ngay trong source `ephemeris.ts`.

Đây là code nội bộ đã được thu gọn và đặt API/domain naming của project; không vendor toàn bộ library.

## Validation chuyển đổi

Trước khi xóa package:

- đủ 24 solar-longitude events năm 2026 được so với `SearchSunLongitude`, lệch tối đa ≤ 2 ms;
- lunar phase angle tại nhiều mốc năm khớp đến precision số thực;
- new-moon search nhiều mốc 1999–2030 lệch tối đa ≤ 2 ms.

Sau khi xóa package:

- static transition fixtures giữ các instant trên;
- HKO 2026 tiếp tục là oracle độc lập cho đủ 24 tiết khí ở độ phân giải phút;
- lunar civil-date tests giữ các ngày sóc/mồng 1 quan trọng, gồm case sóc xảy ra buổi tối 2025-01-29.

## Semantics bắt buộc

Hai longitude Mặt Trời không được trộn:

- **tiết khí** dùng apparent geocentric solar longitude, gồm light-time/aberration;
- **pha Trăng** dùng geometric solar longitude để khớp định nghĩa geocentric longitude difference với Mặt Trăng.

Đổi một loại sang loại kia làm sai thời điểm.

## Hệ quả

### Tích cực

- calendar core không còn runtime astronomy dependency;
- công thức cần cho Q7/Q12/Q32 có thể mở rộng tại một nơi;
- provenance, test và precision contract nằm trong repo.

### Rủi ro

- project tự chịu trách nhiệm maintenance của ephemeris code;
- khi mở rộng ngoài Sun/Moon hoặc ngoài khoảng năm đã test sâu, phải bổ sung oracle độc lập;
- transition fixtures chỉ chứng minh parity với implementation cũ, không thay oracle độc lập.

## Guardrail

Không “đơn giản hóa” periodic series/precession/nutation chỉ vì output hiện trông gần đúng.

Mọi thay đổi ephemeris phải qua:

1. HKO solar-term oracle;
2. transition regression;
3. lunar/new-moon regression;
4. boundary tests của calendar;
5. cập nhật research/ADR nếu semantics hoặc precision thay đổi.
