import { DIA_CHI_THEO_THU_TU, DiaChi } from './domain/earthly-branch';
import { THAP_NHI_TRUC_THEO_THU_TU, ThapNhiTruc } from './domain/twelve-officer';

export function tinhThapNhiTruc(chiThang: DiaChi, chiNgay: DiaChi): ThapNhiTruc {
  const chiSoThang = DIA_CHI_THEO_THU_TU.indexOf(chiThang);
  const chiSoNgay = DIA_CHI_THEO_THU_TU.indexOf(chiNgay);
  const khoangCach =
    (chiSoNgay - chiSoThang + DIA_CHI_THEO_THU_TU.length) % DIA_CHI_THEO_THU_TU.length;
  const truc = THAP_NHI_TRUC_THEO_THU_TU[khoangCach];

  if (!truc) {
    throw new Error('Khong the tinh Thap Nhi Truc');
  }

  return truc;
}
