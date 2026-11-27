import { DiaChi } from './domain/earthly-branch';
import { Mua } from './domain/season';

export function tinhMuaTheoChiThang(chiThang: DiaChi): Mua {
  switch (chiThang) {
    case DiaChi.DAN:
    case DiaChi.MAO:
    case DiaChi.THIN:
      return Mua.XUAN;
    case DiaChi.TI:
    case DiaChi.NGO:
    case DiaChi.MUI:
      return Mua.HA;
    case DiaChi.THAN:
    case DiaChi.DAU:
    case DiaChi.TUAT:
      return Mua.THU;
    case DiaChi.HOI:
    case DiaChi.TY:
    case DiaChi.SUU:
      return Mua.DONG;
  }
}
