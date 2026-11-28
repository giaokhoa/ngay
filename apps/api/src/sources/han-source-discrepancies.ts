export type LoaiSaiKhacNguonHan =
  'VIET_HAN_NOI_DUNG' | 'TRUYEN_BAN' | 'TRANSCRIPTION_GLYPH' | 'SOURCE_CORRECTION';

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
