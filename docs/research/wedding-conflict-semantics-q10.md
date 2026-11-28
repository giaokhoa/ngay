# Research: CUOI_HOI conflict semantics Quyển 10

Status: VERIFIED

## Mục tiêu

Khóa cách Quyển 10 xử lý Kị khi đồng thời gặp Đức/Hợp/Xá/Nguyện hoặc một hung rule khác. Kết quả này dùng cho evaluator `CUOI_HOI`; không dùng phép cộng/trừ số lượng thần sát.

## Nguồn Việt

Hiệp Kỷ Biện Phương Thư, Tập 1, Quyển 10. Các trang quan trọng cho vertical slice:

- 790–793: nguyên tắc phân bậc cát/hung; hung chồng đại hung có trường hợp gặp Đức vẫn Kị mọi việc.
- 794–795: Thu nhật và quan hệ với Kiếp Sát / Đại Thời / Nguyệt Hình.
- 798–801: Kiếp Sát, Tai Sát, Nguyệt Sát.
- 802–810: Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm.
- 811: Yếm Đối.
- 811–812: Đại Thời.
- 813–814: Thiên Lại.
- 816–817: Tứ Phế.
- 817–818: Tứ Kị / Tứ Cùng.
- 819: Ngũ Mộ.
- 822: Vãng Vong.
- 824–825: Bát Chuyên.

Đối chiếu với Hán bản Kanripo revision pin của repo; riêng lớp Q4/Nguyệt Yếm dùng `WYG_010-47b..51a`. Các nhánh quyết định dưới đây có regression độc lập trong `q4-hard-days.spec.ts` và `q4-yem-special-days.spec.ts`.

## Kết luận representation

Evaluator phải biến đổi từng contribution có provenance, không dùng global boolean kiểu `hasDeSupport` và không dùng score.

Các operation tối thiểu:

- giữ Kị;
- bỏ Kị;
- bỏ contribution Nên liên quan;
- giữ Nên liên quan;
- không tự sinh Nên khi source chỉ nói “không Kị”;
- cấm mọi việc;
- delegate sang rule của factor/Trực khác.

## Regression vectors đã khóa

| Case                                           | Kết quả                                                  |
| ---------------------------------------------- | -------------------------------------------------------- |
| Nguyệt Phá + Thiên Đức                         | vẫn Kị; Đức không thắng blocker                          |
| Tứ Phế + Đức/Hợp                               | vẫn Kị                                                   |
| Tứ Phế + Nguyệt Phá                            | mọi việc đều Kị                                          |
| Tứ Cùng, tháng Dần, ngày Ất Hợi + Thiên Nguyện | bỏ Kị cưới hỏi; chỉ việc quân sự còn Kị                  |
| Ngũ Mộ tháng Ngọ + Nguyệt Đức                  | bỏ Kị                                                    |
| Ngũ Mộ tháng Tý + Nguyệt Đức                   | bỏ Kị                                                    |
| Bát Chuyên + Đức/Hợp                           | vẫn Kị                                                   |
| Bát Chuyên + Thiên Nguyện                      | bỏ Kị cưới hỏi; việc quân sự vẫn Kị                      |
| Vãng Vong + Thiên Xá                           | vẫn Kị                                                   |
| Yếm Đối + Thiên Xá                             | bỏ Kị                                                    |
| Nguyệt Hình tháng Tỵ + Nguyệt Đức              | bỏ Kị                                                    |
| Nguyệt Hình tháng Tý, không Đức/Hợp            | mọi việc đều Kị                                          |
| Thiên Lại tháng Dần + Thiên Đức                | bỏ Kị                                                    |
| Thiên Lại tháng Tý                             | theo Nguyệt Hình                                         |
| Thiên Lại tháng Ngọ                            | theo Bình nhật                                           |
| Thu nhật tháng Dần                             | theo Kiếp Sát                                            |
| Thu nhật tháng Mão                             | theo Nguyệt Hình                                         |
| Đại Thời tháng Dần                             | bỏ Kị nhưng không tự tạo Nên                             |
| Nguyệt Yếm tháng Tý/Ngọ, không Thiên Xá        | mọi việc đều Kị                                          |
| Nguyệt Yếm Thìn/Tuất/Tỵ/Hợi + đúng Đức thần    | cát hung cân bằng; bỏ cả Nên/Kị của cặp                  |
| Nguyệt Yếm Dần/Thân/Sửu/Mùi + Đức được nêu     | cưới hỏi vẫn Kị                                          |
| Tuế Bạc / Trục Trận                            | theo chỗ Kị của Nguyệt Yếm; 2 ngày còn bỏ Nên Đức/Nguyện |
| Âm Thác non-hard                               | theo chỗ Kị của Nguyệt Yếm                               |
| Dương Thác non-hard                            | theo Kiến; không tự sinh Kị 嫁娶                         |
| Dương Thác tháng Mùi Kỷ Mùi                    | bỏ Nguyệt Yếm Kị và không theo Nên Đức Hợp               |
| Q4 hard-day + Tuyệt Âm/Tuyệt Dương             | mọi việc đều Kị                                          |
| ngày Hợi                                       | typed blocker riêng; generic balance không được tự xóa   |

## Invariants cho evaluator

1. “Không Kị” không đồng nghĩa “Nên”.
2. Một Nên không liên quan không bị xóa chỉ vì một cặp Kị/Nên khác triệt tiêu.
3. Rule “mọi việc đều Kị” thắng các phép cân bằng cục bộ.
4. Delegation phải recursive nhưng cycle-safe.
5. Nếu hai override cùng match mà không có precedence được source định nghĩa, evaluator phải fail loud thay vì chọn tùy ý.
6. Hợi nhật là target `CHI_NGAY`, Bình/Thu/Bế là target `TRUC`; không tạo factor giả chỉ để ép schema.
7. Q11 có 20 mục Kị cho 嫁娶 khi tính cả Hợi nhật; không ghi 19.

## Trạng thái

- [x] Bản Việt Q10 LOCATED
- [x] Việt/Hán COMPARED
- [x] Các blocker của Q11 được rà trong Q10
- [x] Override semantics cho vertical slice VERIFIED
- [x] Regression vectors chốt
- [x] IMPLEMENTED
- [x] ORACLE_TESTED end-to-end
