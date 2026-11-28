export type LoaiSaiKhacNguonHan =
  | 'VIET_HAN_NOI_DUNG'
  | 'VIET_TOC_TIEU_DE'
  | 'TRUYEN_BAN'
  | 'TRANSCRIPTION_GLYPH'
  | 'TRANSCRIPTION_OMISSION'
  | 'INTERNAL_SOURCE_TENSION'
  | 'SOURCE_CORRECTION';

export interface SaiKhacNguonHan {
  ma: string;
  loai: LoaiSaiKhacNguonHan;
  quyen: number;
  muc: string;
  anchorHan: string;
  moTa: string;
  chinhSachProduction: string;
}

export const SAI_KHAC_NGUON_HAN: readonly SaiKhacNguonHan[] = [
  {
    ma: 'Q11_TE_TU_VIET_THIEU_PHUC_SINH',
    loai: 'VIET_HAN_NOI_DUNG',
    quyen: 11,
    muc: '祭祀',
    anchorHan: 'KR3g0051_WYG_011-6a',
    moTa: 'Hán Q11 祭祀 ghi liền 普護、福生、聖心、益後、續世 trong dòng 宜. Exact Việt Tập I p.844 (working scan PDF page 850) in Phổ Hộ rồi nhảy sang Thánh Tâm, thiếu Phúc Sinh.',
    chinhSachProduction:
      'Production giữ Phúc Sinh là Nên Tế tự theo Hán Q11 + Q6 福生 source-lock. Các mục còn lại dùng Việt/Hán đồng thuận; không normalize ngầm bản scan Việt.',
  },
  {
    ma: 'Q11_QUAN_DAI_VIET_THEM_BE_NHAT',
    loai: 'VIET_HAN_NOI_DUNG',
    quyen: 11,
    muc: '冠帶',
    anchorHan: 'KR3g0051_WYG_011-11a / KR3g0051_WYG_010-37b..38a',
    moTa: 'Exact Việt Tập I p.848 in thêm “ngày Bế” trong Kị Quan đới. Hán Q11 冠帶 không có 閉日; mục 閉日 của cả Việt Q10 p.797 và Hán Q10 cũng không liệt kê 冠帶.',
    chinhSachProduction:
      'Không dùng Bế nhật như blocker Quan đới. Production theo Hán Q11 và Q10 Việt/Hán đồng thuận; giữ p.848 như discrepancy source có regression, không normalize ngầm bản scan Việt.',
  },
  {
    ma: 'Q11_XUAT_HANH_NGUYET_YEM',
    loai: 'VIET_HAN_NOI_DUNG',
    quyen: 11,
    muc: '行幸遣使〈出行同〉',
    anchorHan: 'KR3g0051_WYG_011-11a..11b',
    moTa: 'Hán Q11 có 月厭 trong dòng 忌; bản Việt Q11 p.849 không in Nguyệt Yếm.',
    chinhSachProduction:
      'Giữ exact Q11 Việt 16 Nên/15 Kị; Nguyệt Yếm đứng riêng như blocker Q10 có provenance Q10, không normalize ngầm Q11.',
  },
  {
    ma: 'Q5_VUONG_QUAN_LATER_SWAP',
    loai: 'TRUYEN_BAN',
    quyen: 5,
    muc: '王官守相民日',
    anchorHan: 'KR3g0051_WYG_005-34b..36a',
    moTa: 'Lịch lệ ghi 王日 Xuân Dần/Hạ Tỵ/Thu Thân/Đông Hợi và 官日 Xuân Mão/Hạ Ngọ/Thu Dậu/Đông Tý; hậu nhân đổi hai vị trí cho nhau.',
    chinhSachProduction:
      'Theo phần 按 của Hiệp Kỷ: giữ thuyết cũ cho Vương Nhật, không dùng swap hậu truyền.',
  },
  {
    ma: 'Q5_O_PHE_OLD_14_VS_FINAL_13',
    loai: 'SOURCE_CORRECTION',
    quyen: 5,
    muc: '鳴吠日',
    anchorHan: 'KR3g0051_WYG_005-64b..69b',
    moTa: 'Phần đầu chép danh sách truyền cũ 14 ngày; 起例/立成 cuối mục sửa thành 13 ngày và chỉ rõ 庚寅/壬寅 bị xếp nhầm, 甲午 phải thuộc 鳴吠.',
    chinhSachProduction: 'Dùng final 起例/立成 13 ngày; test negative 庚寅/壬寅 và positive 甲午.',
  },
  {
    ma: 'Q5_TRONG_NHAT_JI_SI_GLYPH',
    loai: 'TRANSCRIPTION_GLYPH',
    quyen: 5,
    muc: '重日',
    anchorHan: 'KR3g0051_WYG_005-56b..57a',
    moTa: 'Kanripo/Wikisource transcription có câu “重日者己亥二日也”, nhưng ngay phần giải thích đối xứng 巳 là cực dương với 亥 là cực âm; bản Việt cũng dùng Tỵ/Hợi.',
    chinhSachProduction:
      'Resolve theo ngữ cảnh thành 巳/亥 (Tỵ/Hợi). Không coi chữ 己 trong transcription online là Can Kỷ.',
  },
  {
    ma: 'Q15_KY_MAO_KANRIPO_JI_AS_SI',
    loai: 'TRANSCRIPTION_GLYPH',
    quyen: 15,
    muc: '己卯年表',
    anchorHan: 'KR3g0051_WYG_014-27a',
    moTa: 'Kanripo chép row title 太嵗巳卯; exact Việt Tập II p82 in Thái Tuế Kỷ Mão, đúng vị trí 己卯 trong 60 hoa giáp.',
    chinhSachProduction:
      'Normalize row title thành 己卯 khi xây annual-table oracle; không coi 巳卯 là Can-Chi hợp lệ.',
  },
  {
    ma: 'Q16_KY_SUU_KANRIPO_JI_AS_SI',
    loai: 'TRANSCRIPTION_GLYPH',
    quyen: 16,
    muc: '己丑年表',
    anchorHan: 'KR3g0051_WYG_015-27a',
    moTa: 'Kanripo chép row title 太歲巳丑; exact Việt Tập II p133 in Thái Tuế Kỷ Sửu, đúng vị trí 己丑.',
    chinhSachProduction:
      'Normalize row title thành 己丑 khi xây annual-table oracle; giữ raw transcription trong provenance.',
  },
  {
    ma: 'Q17_KY_HOI_KANRIPO_JI_AS_SI',
    loai: 'TRANSCRIPTION_GLYPH',
    quyen: 17,
    muc: '己亥年表',
    anchorHan: 'KR3g0051_WYG_016-27a',
    moTa: 'Kanripo chép row title 太歲巳亥; exact Việt Tập II p184 in Thái Tuế Kỷ Hợi, đúng vị trí 己亥.',
    chinhSachProduction:
      'Normalize row title thành 己亥 khi xây annual-table oracle; giữ raw transcription trong provenance.',
  },
  {
    ma: 'Q34_THOI_KHAC_PHUONG_VI_DO_OMITTED',
    loai: 'VIET_HAN_NOI_DUNG',
    quyen: 34,
    muc: '時刻方位圖',
    anchorHan: 'KR3g0051_WYG_033-47a..48a',
    moTa: 'Hán Q34 có 時刻方位圖 và 太陽到方圖 riêng. Exact Việt Tập II chỉ in “Đồ hình Thái dương đến phương” p818 rồi sang bảng p820; 時刻方位圖 bị lược.',
    chinhSachProduction:
      'Nếu implement solar/spatial time-direction layer, giữ 時刻方位圖 từ Hán như source riêng; không giả rằng bản Việt có đồ này.',
  },
  {
    ma: 'Q35_QIMEN_SANYUAN_OMITTED',
    loai: 'VIET_HAN_NOI_DUNG',
    quyen: 35,
    muc: '竒門三元',
    anchorHan: 'KR3g0051_WYG_034-52a..62b',
    moTa: 'Hán Q35 có section 竒門三元 dài sau 吉將加時. Exact Việt Tập II kết thúc Q35 sau “Cát tướng gia thêm vào giờ” rồi sang Q36; toàn section này bị lược.',
    chinhSachProduction:
      'Q35 vẫn CHUA_IMPLEMENT. Nếu mở Qimen, dùng Hán section làm source; không claim Việt double-entry cho 竒門三元.',
  },
  {
    ma: 'Q36_LUC_DAO_TOC_THIEN_DAO',
    loai: 'VIET_TOC_TIEU_DE',
    quyen: 36,
    muc: '六道',
    anchorHan: 'KR3g0051_WYG_035-54a..55b',
    moTa: 'TOC Việt exact mục 24 in “Thiên đạo”, nhưng thân bài p982 in “Lục đạo (sáu con đường)” và nội dung khớp Hán 六道.',
    chinhSachProduction:
      'Xem “Thiên đạo” ở TOC là typo title; canonical identity của section là Lục Đạo/六道, không tạo factor Thiên Đạo riêng.',
  },
  {
    ma: 'Q7_NGU_BAT_NGO_COMMENTARY_VS_Q32_TABLE',
    loai: 'INTERNAL_SOURCE_TENSION',
    quyen: 7,
    muc: '五不遇',
    anchorHan: 'KR3g0051_WYG_007-38b..39a / KR3g0051_WYG_031-2a..29a',
    moTa: 'Q7 biện rằng nếu chi giờ tương sinh với nhật Can/Chi thì lại không phải 五不遇, thậm chí nêu ngày Thổ gặp giờ Dần/Mão. Nhưng bảng vận hành Q32 六十日時辰定局 vẫn đánh 五不遇 theo các cặp Can cố định, gồm Mậu nhật giờ Dần; exact Việt Q32 cũng in như vậy.',
    chinhSachProduction:
      'Selected-hour theo Q32 operational table: giữ mapping Can ngày → giờ Ngũ Bất Ngộ hiện tại. Không tự thêm branch-khắc và không tự triệt theo tàng khí từ lời biện Q7; tension phải được giữ công khai trong provenance cho tới khi có source rule rõ hơn.',
  },
  {
    ma: 'Q32_KY_HOI_KANRIPO_JI_AS_SI',
    loai: 'TRANSCRIPTION_GLYPH',
    quyen: 32,
    muc: '六十日時辰定局・己亥日',
    anchorHan: 'KR3g0051_WYG_031-17a..17b',
    moTa: 'Kanripo text chép header 巳亥日十二時. Exact Việt Tập II p667–668 in Kỷ Hợi; vị trí trong vòng 60 ngày cũng bắt buộc là 己亥. Hai giờ Sửu/Hợi đều giữ Ngũ Bất Ngộ.',
    chinhSachProduction:
      'Normalize header thành 己亥 khi xây Q32 machine oracle; giữ raw 巳亥 chỉ trong provenance transcription.',
  },
  {
    ma: 'Q32_NHAM_TY_KANRIPO_ROW_OMITTED',
    loai: 'TRANSCRIPTION_OMISSION',
    quyen: 32,
    muc: '六十日時辰定局・壬子日',
    anchorHan: 'KR3g0051_WYG_031-23a',
    moTa: 'Kanripo text nhảy trực tiếp từ 辛亥 sang 癸丑, thiếu toàn row 壬子. Exact Việt Tập II p671–672 có đầy đủ Nhâm Tý; giờ Thân in Thanh Long / Ngũ Bất Ngộ. Registry chỉ kết luận text transcription bị thiếu, không kết luận ảnh WYG gốc thiếu row.',
    chinhSachProduction:
      'Khôi phục 壬子 theo exact Việt + thứ tự 60 Can-Chi khi xây Q32 oracle; không coi khoảng trống Kanripo text là nghiệp vụ “không có ngày”.',
  },
  {
    ma: 'Q10_KIEP_SAT_TI_HOI_RELIEF_PAIR',
    loai: 'SOURCE_CORRECTION',
    quyen: 10,
    muc: '劫煞',
    anchorHan: 'KR3g0051_WYG_010',
    moTa: 'Nhánh tháng Tỵ/Hợi dùng Thiên Đức + Nguyệt Đức Hợp; matrix cũ từng đảo thành Nguyệt Đức + Thiên Đức Hợp.',
    chinhSachProduction:
      'Dùng cặp source-exact Thiên Đức + Nguyệt Đức Hợp ở mọi vertical shared Q10.',
  },
];

export function laySaiKhacNguonHan(ma: string): SaiKhacNguonHan | undefined {
  return SAI_KHAC_NGUON_HAN.find((item) => item.ma === ma);
}
