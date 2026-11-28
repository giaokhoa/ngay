# Quyển 36 — Biện ngụy inventory

Status: HAN_INVENTORIED / VIET_EXACT_VERIFIED_WITH_TOC_TYPO / ANTI_ORACLE

## Vai trò đặc biệt

Q36 `辨訛` không phải danh sách “thần sát cần implement”. Lời mở đầu nói rõ thuật sĩ chuộng lạ, ham lợi làm ngụy thuyết sinh sôi; quyển này **biện bác sai lầm/ngụy tạo**.

Vì vậy Q36 là nguồn **anti-oracle / discrepancy authority**: nếu một rule Internet/thông thư bị Q36 bác, repo phải dùng nó để chặn hoặc hạ cấp rule, không được thấy heading rồi tạo `MaYeuTo` cùng tên.

Exact canonical Tập II đã được mở trực tiếp. Q36 bắt đầu p892; TOC exact có 26 mục và thân bài đã được kiểm ở các điểm mapping khác Hán.

## Hán inventory 27/27 heading

1. 男女合婚大利月
2. 諸家鑾駕星曜
3. 巡山二十四神煞
4. 驛馬臨官
5. 刀砧火血
6. 逆血刃九良星暗刀煞
7. 支退流財
8. 神煞同位異名
9. 斗首五行
10. 尊星帝星
11. 神在
12. 上吉七聖
13. 伏斷日宻日裁衣日
14. 上元下元
15. 四不祥
16. 紅沙
17. 章光
18. 五合五離
19. 的呼日
20. 殃煞出去方
21. 滿徳吉慶
22. 冰消瓦解滅門大禍
23. 楊公忌
24. 天狗
25. 六道
26. 五符擇時
27. 九僊時

## Exact Việt mapping

Exact Việt có **26 mục đánh số**. Cấu trúc chênh một vì mục 17 gộp “Chương quang – Ngũ hợp – Ngũ ly”, tương ứng hai heading Hán `章光` + `五合五離`; không thiếu nội dung.

Một typo title riêng đã được xác nhận: TOC Việt mục 24 in **“Thiên đạo”**, nhưng thân bài p982 in **“Lục đạo (sáu con đường)”** và nội dung khớp Hán `六道`. Registry ghi `Q36_LUC_DAO_TOC_THIEN_DAO` để không tạo nhầm identity “Thiên đạo”.

## Product policy

- `CHUA_IMPLEMENT` ở manifest là đúng: Q36 không phải calculator module.
- Không thêm factor chỉ vì tên xuất hiện trong Q36.
- Khi Q36 bác một phép đang được cân nhắc, kết quả research phải ghi `REFUTED`/`DEPRECATED_SOURCE_RULE` hoặc discrepancy tương đương.
- Các mục trùng tên factor đã production (ví dụ `五合五離`) không override Q5 semantics nếu chưa đọc đúng đoạn biện luận.
- Q36 nên được dùng ưu tiên trong **source review**, không phải runtime evaluation.

## Kết luận

**Q36 đã exact Việt/Hán mapping: 27 heading Hán ↔ 26 mục Việt do grouping `章光 + 五合五離`; TOC “Thiên đạo” là typo, thân bài `Lục đạo/六道` khớp Hán.** Quyển này được khóa vai trò `ANTI_ORACLE`, tránh lỗi nghiêm trọng “biện ngụy → implement”.
