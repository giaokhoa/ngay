# Source Catalog

Catalog này chỉ lưu fingerprint/provenance. Repository **không commit bản scan**.

## Bản Việt canonical do người dùng cung cấp

### Tập 1

- ID logic: BAN_VIET_HIEP_KY_TAP_1_FULL_SCAN
- Tên: Hiệp Kỷ Biện Phương Thư — Tập I
- Dịch giả: Vũ Hoàng, Lân Bình
- Full scan: 979 PDF pages
- SHA-256: 60908370f63cbb0e7c8d14a3a977053198e0aa8d0d732ef7f553e0df56d9829d
- Vai trò: nguồn Việt chính cho thuật ngữ, trang in, bảng và giải thích.

### Tập 2

- ID logic: BAN_VIET_HIEP_KY_TAP_2_FULL_SCAN
- Tên: Hiệp Kỷ Biện Phương Thư — Tập II
- Dịch giả: Vũ Hoàng, Lân Bình
- Full scan: 1001 PDF pages
- SHA-256: 2bd06dc981e8146c7de68243ebcf58d063ed7a9961c66dc66c3d5f173772672c
- Vai trò: nguồn Việt chính cho các quyển/niên biểu/nguyệt biểu/nhật biểu thuộc Tập II.

## Working copy hiện có trên remote agent

.sources/hiep-ky-tap1-979.pdf có SHA-256:

509750b7f20aa3f51a9719194dd65e8c59317952171b6380b9aa4f61aa989aa8

File này có thể là bản tải/copy đã được repack và **không byte-identical** với canonical Tập 1 ở trên.
Không được dùng hash của working copy để thay identity của file user upload.

## Hán bản

Hiện catalog chưa có fingerprint của một **file scan Hán bản do người dùng upload**.

Nguồn Hán online được pin để làm independent comparison/oracle:

### Kanripo KR3g0051

- Tác phẩm: `欽定協紀辨方書`
- Repository: `https://github.com/kanripo/KR3g0051`
- Corpus khai báo base edition: `WYG` — 文淵閣四庫全書
- Git revision:
  `8b5522eb0299afbd575f1cb556e972c71c40c42a`
- Vai trò: machine-readable Hán oracle / page-anchor source.
- Lưu ý: revision này chỉ có 35 file text và **thiếu 卷十四**.
  Sau Q13, file `KR3g0051_014.txt` là 卷十五.

SHA-256 từng file + mapping đúng số quyển nằm trong:

`apps/api/src/sources/han-source-manifest.ts`.

### Wikisource fallback cho 卷十四

- Tác phẩm: `欽定協紀辨方書 (四庫全書本)/卷14`
- Revision: `627109`
- Timestamp: `2016-10-14T03:23:42Z`
- Raw SHA-256:
  `0db8d3d973392758282bfb49b98e71de30447114d8a8bf06ff54ebeaf01c3c8e`
- Vai trò: lấp đúng gap Q14 của Kanripo; không dùng để giả rằng Kanripo có Q14.

### Quan hệ với bản Việt

Cấu trúc 36 quyển Hán khớp hệ của bản dịch Việt:

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

Do đó đây là cùng tác phẩm/cùng hệ văn bản và có thể dùng làm nguồn đối chiếu thứ hai.
Không được suy ra rằng hai bản giống từng dòng.

Chi tiết completeness/double-entry:
`docs/han-source-completeness.md`.

Quy tắc đối chiếu:

1. đọc đúng trang/bảng của bản Việt canonical trước;
2. đối chiếu Hán bản cùng quyển/mục;
3. nếu Hán bản chỉ truy cập qua transcription/số hóa online, ghi rõ đó là công cụ đối chiếu, không gọi là file user cung cấp;
4. discrepancy/transcription ambiguity phải vào registry, không normalize ngầm;
5. nếu sau này có Hán scan upload, thêm page count + SHA-256 vào catalog và ưu tiên ảnh scan khi có khác biệt transcription.

## Guardrail

- Không search web để thay thế bản Việt canonical khi file user upload đang truy cập được.
- Không nói "đã kiểm tra bản Việt" nếu execution context không mở được exact file/page.
- Source note phải ghi Tập/Quyển/trang in và, khi hữu ích, PDF page.
- Scan nằm ngoài Git; chỉ source note, fingerprint và test fixture được commit.
