import { DieuKienDungSu, TacDongDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import {
  BoiCanhDanhGiaNgay,
  DauVetXungDot,
  DongGopDanhGia,
  TrangThaiDongGop,
} from './evaluation-domain';

export type PhepXuLyXungDot =
  | { loai: 'GIU_KY' }
  | { loai: 'BO_KY' }
  | { loai: 'CAN_BANG' }
  | { loai: 'CAM_MOI_VIEC' }
  | { loai: 'CHI_CON_QUAN_Y' }
  | { loai: 'DELEGATE'; den: DieuKienDungSu }
  | { loai: 'GIU_KY_DU_CO_CAT' }
  | { loai: 'THEM_KY' }
  | { loai: 'BO_NEN' };

export interface DieuKienQ10 {
  chiThang?: readonly DiaChi[];
  canNgay?: readonly ThienCan[];
  chiNgay?: readonly DiaChi[];
  coTatCaYeuTo?: readonly MaYeuTo[];
  coBatKyYeuTo?: readonly MaYeuTo[];
  khongCoBatKyYeuTo?: readonly MaYeuTo[];
  truc?: readonly ThapNhiTruc[];
}

export interface QuyTacXungDotDataDriven {
  ma: string;
  mucTieu?: DieuKienDungSu;
  dieuKien?: DieuKienQ10;
  phepXuLy: PhepXuLyXungDot;
  precedence: number;
  moTa: string;
  nguon: DauVetXungDot['nguon'];
  boNen?: readonly DieuKienDungSu[];
}

export interface KetQuaResolverQ10 {
  camMoiViec: boolean;
  coKyBoSung: boolean;
  xungDotDaApDung: readonly DauVetXungDot[];
}

interface KetQuaMucTieu {
  trangThai: TrangThaiDongGop;
  camMoiViec: boolean;
  boNen: readonly DieuKienDungSu[];
  dauVet: readonly DauVetXungDot[];
}

export function apDungResolverQ10(
  dongGop: DongGopDanhGia[],
  boiCanh: BoiCanhDanhGiaNgay,
  rules: readonly QuyTacXungDotDataDriven[],
): KetQuaResolverQ10 {
  const traces: DauVetXungDot[] = [];
  let camMoiViec = false;
  let coKyBoSung = false;

  const globalRules = rules
    .filter((rule) => !rule.mucTieu && khopDieuKien(rule.dieuKien, boiCanh))
    .sort((a, b) => b.precedence - a.precedence);

  for (const rule of globalRules) {
    const trace = taoTrace(rule);
    pushUniqueTrace(traces, [trace]);

    switch (rule.phepXuLy.loai) {
      case 'CAM_MOI_VIEC':
        camMoiViec = true;
        break;
      case 'THEM_KY':
        coKyBoSung = true;
        break;
      case 'BO_NEN':
        loaiNenTheoMucTieu(dongGop, rule.boNen ?? [], rule.moTa);
        break;
      default:
        throw new Error('Rule Q10 toàn cục dùng phép xử lý không hợp lệ: ' + rule.ma);
    }

    if (rule.boNen?.length) {
      loaiNenTheoMucTieu(dongGop, rule.boNen, rule.moTa);
    }
  }

  for (const item of dongGop) {
    if (item.quyTac.tacDong !== TacDongDungSu.KY || item.trangThai !== TrangThaiDongGop.HIEU_LUC) {
      continue;
    }

    const ketQua = resolveMucTieu(item.quyTac.dieuKien, boiCanh, rules, new Set());
    pushUniqueTrace(traces, ketQua.dauVet);

    if (ketQua.trangThai === TrangThaiDongGop.BI_LOAI) {
      item.trangThai = TrangThaiDongGop.BI_LOAI;
      item.lyDoLoai = ketQua.dauVet.at(-1)?.moTa ?? 'Bị loại theo Quyển 10.';
    }

    if (ketQua.boNen.length > 0) {
      loaiNenTheoMucTieu(dongGop, ketQua.boNen, ketQua.dauVet.at(-1)?.moTa);
    }

    if (ketQua.camMoiViec) {
      camMoiViec = true;
    }
  }

  if (camMoiViec) {
    for (const item of dongGop) {
      if (
        item.quyTac.tacDong === TacDongDungSu.NEN &&
        item.trangThai === TrangThaiDongGop.HIEU_LUC
      ) {
        item.trangThai = TrangThaiDongGop.BI_LOAI;
        item.lyDoLoai = 'Quyển 10 xác định trường hợp này mọi việc đều Kị.';
      }
    }
  }

  return {
    camMoiViec,
    coKyBoSung,
    xungDotDaApDung: traces,
  };
}

export function resolveMucTieuQ10ChoTest(
  mucTieu: DieuKienDungSu,
  boiCanh: BoiCanhDanhGiaNgay,
  rules: readonly QuyTacXungDotDataDriven[],
): TrangThaiDongGop {
  return resolveMucTieu(mucTieu, boiCanh, rules, new Set()).trangThai;
}

function resolveMucTieu(
  mucTieu: DieuKienDungSu,
  boiCanh: BoiCanhDanhGiaNgay,
  rules: readonly QuyTacXungDotDataDriven[],
  visited: Set<string>,
): KetQuaMucTieu {
  const key = khoaMucTieu(mucTieu);
  if (visited.has(key)) {
    throw new Error('Cycle trong Q10 delegation tại ' + key);
  }

  const nextVisited = new Set(visited);
  nextVisited.add(key);

  const candidates = rules.filter(
    (rule) =>
      rule.mucTieu && cungMucTieu(rule.mucTieu, mucTieu) && khopDieuKien(rule.dieuKien, boiCanh),
  );

  if (candidates.length === 0) {
    return {
      trangThai: TrangThaiDongGop.HIEU_LUC,
      camMoiViec: false,
      boNen: [],
      dauVet: [],
    };
  }

  const maxPrecedence = Math.max(...candidates.map((rule) => rule.precedence));
  const top = candidates.filter((rule) => rule.precedence === maxPrecedence);

  const signatures = new Set(top.map((rule) => signaturePhepXuLy(rule.phepXuLy)));
  if (signatures.size > 1) {
    throw new Error(
      'Xung đột Q10 cùng precedence cho ' + key + ': ' + top.map((rule) => rule.ma).join(', '),
    );
  }

  const primary = top[0]!;
  const traces = top.map(taoTrace);
  const boNenKhaiBao = uniqueMucTieu(top.flatMap((rule) => rule.boNen ?? []));

  switch (primary.phepXuLy.loai) {
    case 'GIU_KY':
    case 'GIU_KY_DU_CO_CAT':
      return {
        trangThai: TrangThaiDongGop.HIEU_LUC,
        camMoiViec: false,
        boNen: boNenKhaiBao,
        dauVet: traces,
      };

    case 'BO_KY':
    case 'CHI_CON_QUAN_Y':
      return {
        trangThai: TrangThaiDongGop.BI_LOAI,
        camMoiViec: false,
        boNen: boNenKhaiBao,
        dauVet: traces,
      };

    case 'CAN_BANG':
      return {
        trangThai: TrangThaiDongGop.BI_LOAI,
        camMoiViec: false,
        boNen: uniqueMucTieu([...boNenKhaiBao, ...suyRaNenCanBang(top, boiCanh)]),
        dauVet: traces,
      };

    case 'CAM_MOI_VIEC':
      return {
        trangThai: TrangThaiDongGop.HIEU_LUC,
        camMoiViec: true,
        boNen: boNenKhaiBao,
        dauVet: traces,
      };

    case 'DELEGATE': {
      kiemTraDelegateCoMat(primary.phepXuLy.den, boiCanh);
      const delegated = resolveMucTieu(primary.phepXuLy.den, boiCanh, rules, nextVisited);
      return {
        ...delegated,
        boNen: uniqueMucTieu([...boNenKhaiBao, ...delegated.boNen]),
        dauVet: [...traces, ...delegated.dauVet],
      };
    }

    case 'THEM_KY':
    case 'BO_NEN':
      throw new Error('Phép xử lý toàn cục không được dùng cho target Q10: ' + primary.ma);
  }
}

function khopDieuKien(condition: DieuKienQ10 | undefined, boiCanh: BoiCanhDanhGiaNgay): boolean {
  if (!condition) return true;

  const factorSet = new Set(boiCanh.yeuTo.map((item) => item.ma));

  if (condition.chiThang && !condition.chiThang.includes(boiCanh.chiThang)) return false;
  if (condition.canNgay && !condition.canNgay.includes(boiCanh.canNgay)) return false;
  if (condition.chiNgay && !condition.chiNgay.includes(boiCanh.chiNgay)) return false;
  if (condition.truc && !condition.truc.includes(boiCanh.truc)) return false;

  if (condition.coTatCaYeuTo && !condition.coTatCaYeuTo.every((ma) => factorSet.has(ma))) {
    return false;
  }

  if (condition.coBatKyYeuTo && !condition.coBatKyYeuTo.some((ma) => factorSet.has(ma))) {
    return false;
  }

  if (condition.khongCoBatKyYeuTo && condition.khongCoBatKyYeuTo.some((ma) => factorSet.has(ma))) {
    return false;
  }

  return true;
}

function suyRaNenCanBang(
  rules: readonly QuyTacXungDotDataDriven[],
  boiCanh: BoiCanhDanhGiaNgay,
): readonly DieuKienDungSu[] {
  const coMat = new Set(boiCanh.yeuTo.map((item) => item.ma));
  const factors = rules.flatMap((rule) => [
    ...(rule.dieuKien?.coTatCaYeuTo ?? []),
    ...(rule.dieuKien?.coBatKyYeuTo ?? []).filter((ma) => coMat.has(ma)),
  ]);
  return [...new Set(factors)].map((ma) => ({ loai: 'YEU_TO' as const, ma }));
}

function kiemTraDelegateCoMat(mucTieu: DieuKienDungSu, boiCanh: BoiCanhDanhGiaNgay): void {
  switch (mucTieu.loai) {
    case 'YEU_TO':
      if (!boiCanh.yeuTo.some((item) => item.ma === mucTieu.ma)) {
        throw new Error('Q10 delegate tới factor không có trong context: ' + mucTieu.ma);
      }
      return;
    case 'TRUC':
      if (boiCanh.truc !== mucTieu.truc) {
        throw new Error('Q10 delegate tới Trực không khớp context: ' + mucTieu.truc);
      }
      return;
    case 'CHI_NGAY':
      if (boiCanh.chiNgay !== mucTieu.chi) {
        throw new Error('Q10 delegate tới Chi ngày không khớp context: ' + mucTieu.chi);
      }
      return;
    case 'THO_VUONG':
      if (!boiCanh.dangThoVuong) {
        throw new Error('Q10 delegate tới Thổ Vượng nhưng context không đang Thổ Vượng');
      }
  }
}

function loaiNenTheoMucTieu(
  dongGop: DongGopDanhGia[],
  mucTieuCanLoai: readonly DieuKienDungSu[],
  lyDo?: string,
): void {
  for (const item of dongGop) {
    if (
      item.quyTac.tacDong === TacDongDungSu.NEN &&
      item.trangThai === TrangThaiDongGop.HIEU_LUC &&
      mucTieuCanLoai.some((mucTieu) => cungMucTieu(item.quyTac.dieuKien, mucTieu))
    ) {
      item.trangThai = TrangThaiDongGop.BI_LOAI;
      item.lyDoLoai = lyDo ?? 'Nên bị loại theo nhánh đặc biệt Quyển 10.';
    }
  }
}

function cungMucTieu(a: DieuKienDungSu, b: DieuKienDungSu): boolean {
  if (a.loai !== b.loai) return false;
  if (a.loai === 'YEU_TO' && b.loai === 'YEU_TO') return a.ma === b.ma;
  if (a.loai === 'TRUC' && b.loai === 'TRUC') return a.truc === b.truc;
  if (a.loai === 'CHI_NGAY' && b.loai === 'CHI_NGAY') return a.chi === b.chi;
  if (a.loai === 'THO_VUONG' && b.loai === 'THO_VUONG') return true;
  return false;
}

function khoaMucTieu(mucTieu: DieuKienDungSu): string {
  switch (mucTieu.loai) {
    case 'YEU_TO':
      return 'YEU_TO:' + mucTieu.ma;
    case 'TRUC':
      return 'TRUC:' + mucTieu.truc;
    case 'CHI_NGAY':
      return 'CHI_NGAY:' + mucTieu.chi;
    case 'THO_VUONG':
      return 'THO_VUONG';
  }
}

function signaturePhepXuLy(phepXuLy: PhepXuLyXungDot): string {
  if (phepXuLy.loai === 'DELEGATE') {
    return 'DELEGATE:' + khoaMucTieu(phepXuLy.den);
  }
  return phepXuLy.loai;
}

function taoTrace(rule: QuyTacXungDotDataDriven): DauVetXungDot {
  return {
    ma: rule.ma,
    moTa: rule.moTa,
    nguon: rule.nguon,
  };
}

function uniqueMucTieu(values: readonly DieuKienDungSu[]): readonly DieuKienDungSu[] {
  const result: DieuKienDungSu[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    const key = khoaMucTieu(value);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  }
  return result;
}

function pushUniqueTrace(target: DauVetXungDot[], incoming: readonly DauVetXungDot[]): void {
  const existing = new Set(target.map((item) => item.ma));
  for (const trace of incoming) {
    if (!existing.has(trace.ma)) {
      target.push(trace);
      existing.add(trace.ma);
    }
  }
}
