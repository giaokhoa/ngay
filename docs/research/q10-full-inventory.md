# Quyển 10 — Nghi kị full inventory

Status: COMPARED / INVENTORIED / ORACLE_PARTIAL

## Denominator nguồn

- Việt T1: Quyển 10 mở tại **PDF 771 / trang in 764**; mục lục Việt chạy PDF 771–773 / trang in 764–766 và có **51 mục đánh số**.
- Hán Kanripo `KR3g0051_010.txt`, revision pin: TOC đầu quyển có **99 heading** trước phần `表例附`; bản Hán tách các identity mà Việt gộp chung trong một mục.
- Raw grep toàn file ra 101 heading vì còn hai heading nội dung lặp `以上所宜` / `以上所忌`; **101 không phải denominator**.
- Hai cấu trúc chứa cùng các nhóm cát/hung và phần phụ biểu. Bản Việt đánh số `Phụ biểu` trước `Bách kị`; Hán TOC đặt `百忌日` trước `表例附`. Đây là khác thứ tự trình bày, không đổi semantics production.

## Vai trò trong product

Q10 cung cấp **semantic conflict/exception layer**: một thần cát/hung có thể Nên/Kị khác nhau theo việc, có chế hóa, residual list và hard prohibition. Vì vậy:

- không biến Q10 thành một bảng điểm chung;
- identity/factor calculator vẫn lấy từ Q4–Q7;
- exact semantics hiện machine-oracle cho 21 vertical đang production;
- các mục còn lại được inventory rõ để không bị hiểu là “chưa đọc”.

## Inventory 51/51 mục Việt = 99 heading Hán

|   # | Nhóm Hán                               | Product status                 | Ghi chú                                                                                           |
| --: | -------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
|   1 | 天德・月德・天德合・月德合・月空・天恩 | ORACLE_TESTED_PARTIAL          | Q5 production subset; exact activity meaning remains Q10 resolver-specific                        |
|   2 | 天赦・母倉・天願                       | ORACLE_TESTED                  | Q5 identities production                                                                          |
|   3 | 月恩・四相・時德・陽德・陰德           | PARTIAL_IMPLEMENTED            | 月恩/四相/時德 production; 陽德/陰德 source-only                                                  |
|   4 | 王日・官日・守日・相日                 | PARTIAL_IMPLEMENTED            | 王日 production; remaining identities not standalone current factors                              |
|   5 | 民日・三合                             | ORACLE_TESTED                  | both used in current day/activity semantics                                                       |
|   6 | 臨日・驛馬〈天后〉・天馬・建日〈兵福〉 | PARTIAL_IMPLEMENTED            | 驛馬/天馬/建/兵福 consumed; aliases/reference not all standalone                                  |
|   7 | 除日〈吉期/兵寶〉・滿日〈天巫/福德〉   | PARTIAL_IMPLEMENTED            | Trực + several Q4 shared identities consumed                                                      |
|   8 | 平日・定日〈時陰〉・執日               | PARTIAL_IMPLEMENTED            | Trực semantics + 時陰 subset                                                                      |
|   9 | 破日・危日・成日〈天喜/天醫〉          | PARTIAL_IMPLEMENTED            | Trực semantics + 天喜/天醫 subset                                                                 |
|  10 | 收日                                   | IMPLEMENTED_FOUNDATION         | 12 Trực semantics                                                                                 |
|  11 | 開日〈時陽/生氣〉                      | PARTIAL_IMPLEMENTED            | Trực Khai + 時陽/生氣 subset                                                                      |
|  12 | 閉日・兵吉・六合・六儀・五富           | PARTIAL_IMPLEMENTED            | Bế/Lục Hợp/Lục Nghi/Ngũ Phú consumed; 兵吉 not standalone                                         |
|  13 | 天倉・不將・要安・敬安                 | PARTIAL_IMPLEMENTED            | 天倉 + 不將 production; 要安/敬安 source-only                                                     |
|  14 | 玉宇・金堂                             | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current production dependency                                                         |
|  15 | 普護・福生・聖心・益後・續世           | IMPLEMENTED_FOUNDATION         | all five factor identities production; Q10 activity semantics remain source-resolved per vertical |
|  16 | 解神・除神・五合                       | IMPLEMENTED_FACTOR_SET         | 解神 production; 除神 alias of 五離/NGU_LY; 五合 production                                       |
|  17 | 寶日・義日・制日                       | SOURCE_ONLY_CURRENT_PRODUCT    | located; no current production dependency                                                         |
|  18 | 青龍・明堂・金匱・寶光・玉堂・司命     | ORACLE_TESTED_Q7               | six Hoàng đạo spirits implemented as supplementary Q7 layer                                       |
|  19 | 鳴吠・鳴吠對・亥子日                   | PARTIAL_IMPLEMENTED            | 鳴吠/鳴吠對 production; 亥子日 not standalone current identity                                    |
|  20 | 午申日                                 | SOURCE_ONLY_CURRENT_PRODUCT    | located; no current production dependency                                                         |
|  21 | 月建〈小時/土府〉                      | PARTIAL_IMPLEMENTED            | Nguyệt Kiến/Tiểu Thời/Thổ Phủ represented in current source layer                                 |
|  22 | 月破〈大耗〉                           | ORACLE_TESTED                  | Nguyệt Phá + Đại Hao production semantics                                                         |
|  23 | 平日〈死神〉                           | PARTIAL_IMPLEMENTED            | Trực Bình + shared identity semantics                                                             |
|  24 | 收日                                   | IMPLEMENTED_FOUNDATION         | 12 Trực semantics                                                                                 |
|  25 | 滿日〈天狗〉・閉日〈血支〉             | PARTIAL_IMPLEMENTED            | Trực + Thiên Cẩu/Huyết Chi shared positions                                                       |
|  26 | 劫煞                                   | ORACLE_TESTED                  | Q6 production                                                                                     |
|  27 | 災煞〈天火〉・月煞〈月虛〉             | ORACLE_TESTED_PARTIAL          | Tai Sát/Nguyệt Sát production; aliases remain same-source semantics                               |
|  28 | 月刑                                   | ORACLE_TESTED                  | Q6 production                                                                                     |
|  29 | 月害・月厭〈地火〉                     | ORACLE_TESTED_PARTIAL          | Nguyệt Hại/Nguyệt Yếm production; Địa Hỏa shared identity                                         |
|  30 | 厭對〈招搖〉・大時〈大敗/咸池〉        | ORACLE_TESTED_PARTIAL          | Yếm Đối/Đại Thời production; aliases not all standalone                                           |
|  31 | 遊禍・天吏〈致死〉・死氣               | PARTIAL_IMPLEMENTED            | Du Họa + Thiên Lại production; 死氣 remains source-only                                           |
|  32 | 小耗・天賊・四擊・四耗                 | PARTIAL_IMPLEMENTED            | Tiểu Hao/Thiên Tặc/Tứ Hao production; Tứ Kích source-only                                         |
|  33 | 四廢                                   | ORACLE_TESTED                  | Q5 production                                                                                     |
|  34 | 四忌・四窮〈八龍/七鳥/九虎/六蛇〉      | ORACLE_TESTED_PARTIAL          | Tứ Kị/Tứ Cùng production; attached aliases not standalone                                         |
|  35 | 五虛                                   | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current production dependency                                                         |
|  36 | 八風・五墓・九空・九坎〈九焦〉         | PARTIAL_IMPLEMENTED            | Ngũ Mộ/Cửu Không production; remaining identities source-only                                     |
|  37 | 土符・地囊・兵禁・大煞                 | PARTIAL_IMPLEMENTED            | Thổ Phù/Địa Nang production; Binh Cấm/Đại Sát not current identities                              |
|  38 | 歸忌・血忌・往亡・氣往亡               | PARTIAL_IMPLEMENTED            | Quy Kị/Vãng Vong production; others source-only                                                   |
|  39 | 復日・重日・五離・八專                 | IMPLEMENTED                    | Phục/Trọng/Ngũ Ly/Bát Chuyên production for current dependencies                                  |
|  40 | 觸水龍・專日・伐日                     | OUT_OF_SCOPE_CURRENT_VERTICALS | located; no current production dependency                                                         |
|  41 | 天刑・朱雀・白虎・天牢・元武・勾陳     | ORACLE_TESTED_Q7               | six Hắc đạo spirits supplementary; not universal veto                                             |
|  42 | 無禄日                                 | IMPLEMENTED_CONTEXT_FACTOR     | 10 candidate + Q10 relief theo Đức/năm/tháng/trung khí; 癸亥 override                             |
|  43 | 反支                                   | IMPLEMENTED_FACTOR             | sóc/new-moon context production; semantics activity vẫn source-driven                             |
|  44 | 上朔・四離・四絶・晦日                 | IMPLEMENTED_FACTOR_SET         | all four identities production; activity semantics remain source-resolved                         |
|  45 | 冬至・夏至・春分・秋分                 | CALENDAR_REFERENCE             | solar-term calendar primitive, not standalone score factor                                        |
|  46 | 土王用事・伏社・朔弦望                 | PARTIAL_IMPLEMENTED            | Thổ Vượng + Sóc-Huyền-Vọng production; Phục Xã remains source-only                                |
|  47 | 月忌日・十五日                         | PARTIAL_IMPLEMENTED            | 月忌日 5/14/23 production; 十五日 remains source-only                                             |
|  48 | 人神所在日                             | OUT_OF_SCOPE_CURRENT_VERTICALS | located; body-location tradition not current product                                              |
|  49 | 長星・短星                             | IMPLEMENTED_FACTOR_SET         | production theo Q9 `WYG_009-33b` + Q19–30; Q10 dùng làm Kị 裁製等                                 |
|  50 | 表例附                                 | META                           | appendix/table examples, not factor identity                                                      |
|  51 | 百忌日                                 | REFERENCE_APPENDIX             | located; not current production rule                                                              |

## Coverage của 21 vertical

Current Q10 resolver/source vectors khóa exact semantics cho:

- Cưới hỏi;
- Di chuyển;
- An giường;
- Quan đới;
- Nhập học;
- Yến hội;
- Chúc mừng ban thưởng;
- Tế tự;
- Cầu phúc;
- Cầu tự;
- Giải trừ;
- Chỉnh dung, cắt tóc;
- Cầu y, trị bệnh;
- Sửa móng tay chân;
- May đo, cắt may quần áo;
- Lập khế ước, giao dịch;
- Động thổ;
- Sửa cung thất;
- Khai trương;
- Xuất hành;
- An táng.

`han-q10-semantic-oracle.spec.ts` kiểm mechanism độc lập (hard-all, relief, residual activity list, special exception, Phục/Trọng + 鳴吠, activity-specific difference), không copy nguyên production matrix.

## Kết luận

**Q10 đã inventory đủ 51/51 mục Việt, tương ứng 99/99 heading TOC Hán.** Oracle runtime vẫn partial theo 21 vertical; inventory đầy đủ không được dùng để claim mọi activity/rule Q10 đã encode.
