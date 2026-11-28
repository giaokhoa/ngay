/**
 * Self-contained Sun/Moon ephemeris for the calendar core.
 *
 * The VSOP Earth coefficients, Brown/Improved Lunar Ephemeris series, IAU 2000B
 * nutation model, precession model, and Delta-T polynomial structure in this file
 * are adapted from Astronomy Engine 2.1.19 by Don Cross (MIT License), which in
 * turn cites VSOP87, IAU models, the Nautical Almanac Office Improved Lunar
 * Ephemeris, and Espenak/Meeus. This project does NOT depend on astronomy-engine
 * at runtime; the adapted formulas/data are maintained here and validated against
 * independent HKO fixtures plus transition parity tests.
 *
 * MIT License
 * Copyright (c) 2019-2023 Don Cross <cosinekitty@gmail.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;
const TWO_PI = 2 * Math.PI;
const ARCSECONDS_PER_RADIAN = 3600 * RAD_TO_DEG;
const ARCSECONDS_TO_RADIAN = 4.84813681109536e-6;
const ARCSECONDS_PER_CIRCLE = 1_296_000;
const C_AU_PER_DAY = 173.1446326846693;
const DAYS_PER_TROPICAL_YEAR = 365.24217;
const DAYS_PER_MILLENNIUM = 365_250;
const MEAN_SYNODIC_MONTH = 29.530588;
const MILLIS_PER_DAY = 86_400_000;
const J2000_MILLIS = Date.parse('2000-01-01T12:00:00Z');

interface ThoiGianThienVan {
  ut: number;
  tt: number;
}

type Vec3 = readonly [number, number, number];
type Mat3 = readonly [Vec3, Vec3, Vec3];
type VsopTerm = readonly [number, number, number];
type VsopSeries = readonly VsopTerm[];
type VsopFormula = readonly VsopSeries[];
type VsopModel = readonly [VsopFormula, VsopFormula, VsopFormula];

interface ViTriTrang {
  kinhDo: number;
  viDo: number;
}

const VSOP_EARTH: VsopModel = [
  [
    [
      [1.75347045673, 0.0, 0.0],
      [0.03341656453, 4.66925680415, 6283.0758499914],
      [0.00034894275, 4.62610242189, 12566.1516999828],
      [0.00003417572, 2.82886579754, 3.523118349],
      [0.00003497056, 2.74411783405, 5753.3848848968],
      [0.00003135899, 3.62767041756, 77713.7714681205],
      [0.00002676218, 4.41808345438, 7860.4193924392],
      [0.00002342691, 6.13516214446, 3930.2096962196],
      [0.00001273165, 2.03709657878, 529.6909650946],
      [0.00001324294, 0.74246341673, 11506.7697697936],
      [0.00000901854, 2.04505446477, 26.2983197998],
      [0.00001199167, 1.10962946234, 1577.3435424478],
      [0.00000857223, 3.50849152283, 398.1490034082],
      [0.00000779786, 1.17882681962, 5223.6939198022],
      [0.0000099025, 5.23268072088, 5884.9268465832],
      [0.00000753141, 2.53339052847, 5507.5532386674],
      [0.00000505267, 4.58292599973, 18849.2275499742],
      [0.00000492392, 4.20505711826, 775.522611324],
      [0.00000356672, 2.91954114478, 0.0673103028],
      [0.00000284125, 1.89869240932, 796.2980068164],
      [0.00000242879, 0.34481445893, 5486.777843175],
      [0.00000317087, 5.84901948512, 11790.6290886588],
      [0.00000271112, 0.31486255375, 10977.078804699],
      [0.00000206217, 4.80646631478, 2544.3144198834],
      [0.00000205478, 1.86953770281, 5573.1428014331],
      [0.00000202318, 2.45767790232, 6069.7767545534],
      [0.00000126225, 1.08295459501, 20.7753954924],
      [0.00000155516, 0.83306084617, 213.299095438],
    ],
    [
      [6283.0758499914, 0.0, 0.0],
      [0.00206058863, 2.67823455808, 6283.0758499914],
      [0.00004303419, 2.63512233481, 12566.1516999828],
    ],
    [[0.00008721859, 1.07253635559, 6283.0758499914]],
  ],
  [
    [],
    [
      [0.00227777722, 3.4137662053, 6283.0758499914],
      [0.00003805678, 3.37063423795, 12566.1516999828],
    ],
  ],
  [
    [
      [1.00013988784, 0.0, 0.0],
      [0.01670699632, 3.09846350258, 6283.0758499914],
      [0.00013956024, 3.05524609456, 12566.1516999828],
      [0.0000308372, 5.19846674381, 77713.7714681205],
      [0.00001628463, 1.17387558054, 5753.3848848968],
      [0.00001575572, 2.84685214877, 7860.4193924392],
      [0.00000924799, 5.45292236722, 11506.7697697936],
      [0.00000542439, 4.56409151453, 3930.2096962196],
      [0.0000047211, 3.66100022149, 5884.9268465832],
      [0.00000085831, 1.27079125277, 161000.6857376741],
      [0.00000057056, 2.01374292245, 83996.84731811189],
      [0.00000055736, 5.2415979917, 71430.69561812909],
      [0.00000174844, 3.01193636733, 18849.2275499742],
      [0.00000243181, 4.2734953079, 11790.6290886588],
    ],
    [
      [0.00103018607, 1.10748968172, 6283.0758499914],
      [0.00001721238, 1.06442300386, 12566.1516999828],
    ],
    [[0.00004359385, 5.78455133808, 6283.0758499914]],
  ],
];

export function tinhKinhDoMatTroiBieuKien(thoiDiem: Date): number {
  const time = taoThoiGian(new Date(thoiDiem.getTime() - MILLIS_PER_DAY / C_AU_PER_DAY));
  return tinhKinhDoMatTroiTuThoiGian(time);
}

export function tinhPhaTrang(thoiDiem: Date): number {
  const time = taoThoiGian(thoiDiem);
  const moon = tinhViTriTrangThuc(time);
  const sun = tinhKinhDoMatTroiTuThoiGian(time);
  return chuanHoaDo(moon.kinhDo - sun);
}

export function timThoiDiemMatTroiDatKinhDo(
  kinhDoMucTieu: number,
  batDau: Date,
  soNgayGioiHan: number,
): Date | null {
  if (!(soNgayGioiHan > 0)) return null;
  const cuoi = new Date(batDau.getTime() + soNgayGioiHan * MILLIS_PER_DAY);
  return timNghiemTang(
    (date) => doLechGoc(tinhKinhDoMatTroiBieuKien(date) - kinhDoMucTieu),
    batDau,
    cuoi,
  );
}

export function timThoiDiemPhaTrang(
  kinhDoMucTieu: number,
  batDau: Date,
  soNgayGioiHan: number,
): Date | null {
  if (soNgayGioiHan === 0) return null;
  const batDauTime = batDau.getTime();
  let y = doLechGoc(tinhPhaTrang(batDau) - kinhDoMucTieu);
  const uncertainty = 1.5;
  let estDt: number;
  let dt1: number;
  let dt2: number;

  if (soNgayGioiHan < 0) {
    if (y < 0) y += 360;
    estDt = -(MEAN_SYNODIC_MONTH * y) / 360;
    dt2 = estDt + uncertainty;
    if (dt2 < soNgayGioiHan) return null;
    dt1 = Math.max(soNgayGioiHan, estDt - uncertainty);
  } else {
    if (y > 0) y -= 360;
    estDt = -(MEAN_SYNODIC_MONTH * y) / 360;
    dt1 = estDt - uncertainty;
    if (dt1 > soNgayGioiHan) return null;
    dt2 = Math.min(soNgayGioiHan, estDt + uncertainty);
  }

  return timNghiemTang(
    (date) => doLechGoc(tinhPhaTrang(date) - kinhDoMucTieu),
    new Date(batDauTime + dt1 * MILLIS_PER_DAY),
    new Date(batDauTime + dt2 * MILLIS_PER_DAY),
  );
}

function timNghiemTang(ham: (date: Date) => number, aDate: Date, bDate: Date): Date | null {
  let a = aDate.getTime();
  let b = bDate.getTime();
  if (a > b) [a, b] = [b, a];
  let ya = ham(new Date(a));
  let yb = ham(new Date(b));
  if (Math.abs(ya) < 1e-12) return new Date(a);
  if (Math.abs(yb) < 1e-12) return new Date(b);
  if (!(ya < 0 && yb > 0)) return null;

  while (b - a > 1) {
    const mid = Math.floor((a + b) / 2);
    const ym = ham(new Date(mid));
    if (ym >= 0) {
      b = mid;
      yb = ym;
    } else {
      a = mid;
      ya = ym;
    }
  }
  void ya;
  void yb;
  return new Date(Math.round((a + b) / 2));
}

function taoThoiGian(date: Date): ThoiGianThienVan {
  if (Number.isNaN(date.getTime())) throw new RangeError('Thời điểm thiên văn không hợp lệ');
  const ut = (date.getTime() - J2000_MILLIS) / MILLIS_PER_DAY;
  return { ut, tt: ut + tinhDeltaT(ut) / 86_400 };
}

function tinhDeltaT(ut: number): number {
  const y = 2000 + (ut - 14) / DAYS_PER_TROPICAL_YEAR;
  let u: number;
  if (y < -500) {
    u = (y - 1820) / 100;
    return -20 + 32 * u * u;
  }
  if (y < 500) {
    u = y / 100;
    return (
      10583.6 -
      1014.41 * u +
      33.78311 * u ** 2 -
      5.952053 * u ** 3 -
      0.1798452 * u ** 4 +
      0.022174192 * u ** 5 +
      0.0090316521 * u ** 6
    );
  }
  if (y < 1600) {
    u = (y - 1000) / 100;
    return (
      1574.2 -
      556.01 * u +
      71.23472 * u ** 2 +
      0.319781 * u ** 3 -
      0.8503463 * u ** 4 -
      0.005050998 * u ** 5 +
      0.0083572073 * u ** 6
    );
  }
  if (y < 1700) {
    u = y - 1600;
    return 120 - 0.9808 * u - 0.01532 * u ** 2 + u ** 3 / 7129;
  }
  if (y < 1800) {
    u = y - 1700;
    return 8.83 + 0.1603 * u - 0.0059285 * u ** 2 + 0.00013336 * u ** 3 - u ** 4 / 1174000;
  }
  if (y < 1860) {
    u = y - 1800;
    return (
      13.72 -
      0.332447 * u +
      0.0068612 * u ** 2 +
      0.0041116 * u ** 3 -
      0.00037436 * u ** 4 +
      0.0000121272 * u ** 5 -
      0.0000001699 * u ** 6 +
      0.000000000875 * u ** 7
    );
  }
  if (y < 1900) {
    u = y - 1860;
    return (
      7.62 +
      0.5737 * u -
      0.251754 * u ** 2 +
      0.01680668 * u ** 3 -
      0.0004473624 * u ** 4 +
      u ** 5 / 233174
    );
  }
  if (y < 1920) {
    u = y - 1900;
    return -2.79 + 1.494119 * u - 0.0598939 * u ** 2 + 0.0061966 * u ** 3 - 0.000197 * u ** 4;
  }
  if (y < 1941) {
    u = y - 1920;
    return 21.2 + 0.84493 * u - 0.0761 * u ** 2 + 0.0020936 * u ** 3;
  }
  if (y < 1961) {
    u = y - 1950;
    return 29.07 + 0.407 * u - u ** 2 / 233 + u ** 3 / 2547;
  }
  if (y < 1986) {
    u = y - 1975;
    return 45.45 + 1.067 * u - u ** 2 / 260 - u ** 3 / 718;
  }
  if (y < 2005) {
    u = y - 2000;
    return (
      63.86 +
      0.3345 * u -
      0.060374 * u ** 2 +
      0.0017275 * u ** 3 +
      0.000651814 * u ** 4 +
      0.00002373599 * u ** 5
    );
  }
  if (y < 2050) {
    u = y - 2000;
    return 62.92 + 0.32217 * u + 0.005589 * u * u;
  }
  if (y < 2150) {
    u = (y - 1820) / 100;
    return -20 + 32 * u * u - 0.5628 * (2150 - y);
  }
  u = (y - 1820) / 100;
  return -20 + 32 * u * u;
}

function tinhKinhDoMatTroiTuThoiGian(time: ThoiGianThienVan): number {
  const earth = tinhVsopEarth(time);
  let sun: Vec3 = [-earth[0], -earth[1], -earth[2]];
  sun = xoay(maTranTienDong(time), sun);
  sun = xoay(maTranChuongDong(time), sun);
  const ob = doNghieng(time).that * DEG_TO_RAD;
  const x = sun[0];
  const y = sun[1] * Math.cos(ob) + sun[2] * Math.sin(ob);
  return chuanHoaDo(Math.atan2(y, x) * RAD_TO_DEG);
}

function tinhVsopEarth(time: ThoiGianThienVan): Vec3 {
  const t = time.tt / DAYS_PER_MILLENNIUM;
  const lon = tinhVsop(VSOP_EARTH[0], t, true);
  const lat = tinhVsop(VSOP_EARTH[1], t, false);
  const radius = tinhVsop(VSOP_EARTH[2], t, false);
  const rCosLat = radius * Math.cos(lat);
  const eclip: Vec3 = [rCosLat * Math.cos(lon), rCosLat * Math.sin(lon), radius * Math.sin(lat)];
  return [
    eclip[0] + 0.00000044036 * eclip[1] - 0.000000190919 * eclip[2],
    -0.000000479966 * eclip[0] + 0.917482137087 * eclip[1] - 0.397776982902 * eclip[2],
    0.397776982902 * eclip[1] + 0.917482137087 * eclip[2],
  ];
}

function tinhVsop(formula: VsopFormula, t: number, clampAngle: boolean): number {
  let tPower = 1;
  let coord = 0;
  for (const series of formula) {
    let sum = 0;
    for (const [amplitude, phase, frequency] of series) {
      sum += amplitude * Math.cos(phase + t * frequency);
    }
    let increment = tPower * sum;
    if (clampAngle) increment %= TWO_PI;
    coord += increment;
    tPower *= t;
  }
  return coord;
}

function nutationIau2000b(time: ThoiGianThienVan): { dpsi: number; deps: number } {
  const mod = (x: number): number => (x % ARCSECONDS_PER_CIRCLE) * ARCSECONDS_TO_RADIAN;
  const t = time.tt / 36525;
  const elp = mod(1287104.79305 + t * 129596581.0481);
  const f = mod(335779.526232 + t * 1739527262.8478);
  const d = mod(1072260.70369 + t * 1602961601.209);
  const om = mod(450160.398036 - t * 6962890.5431);
  let s = Math.sin(om),
    c = Math.cos(om);
  let dp = (-172064161 - 174666 * t) * s + 33386 * c;
  let de = (92052331 + 9086 * t) * c + 15377 * s;
  let arg = 2 * (f - d + om);
  s = Math.sin(arg);
  c = Math.cos(arg);
  dp += (-13170906 - 1675 * t) * s - 13696 * c;
  de += (5730336 - 3015 * t) * c - 4587 * s;
  arg = 2 * (f + om);
  s = Math.sin(arg);
  c = Math.cos(arg);
  dp += (-2276413 - 234 * t) * s + 2796 * c;
  de += (978459 - 485 * t) * c + 1374 * s;
  arg = 2 * om;
  s = Math.sin(arg);
  c = Math.cos(arg);
  dp += (2074554 + 207 * t) * s - 698 * c;
  de += (-897492 + 470 * t) * c - 291 * s;
  s = Math.sin(elp);
  c = Math.cos(elp);
  dp += (1475877 - 3633 * t) * s + 11817 * c;
  de += (73871 - 184 * t) * c - 1924 * s;
  return { dpsi: -0.000135 + dp * 1e-7, deps: 0.000388 + de * 1e-7 };
}

function doNghiengTrungBinh(time: ThoiGianThienVan): number {
  const t = time.tt / 36525;
  const arcsec =
    ((((-0.0000000434 * t - 0.000000576) * t + 0.0020034) * t - 0.0001831) * t - 46.836769) * t +
    84381.406;
  return arcsec / 3600;
}

function doNghieng(time: ThoiGianThienVan): { trungBinh: number; that: number; dpsi: number } {
  const nut = nutationIau2000b(time);
  const trungBinh = doNghiengTrungBinh(time);
  return { trungBinh, that: trungBinh + nut.deps / 3600, dpsi: nut.dpsi };
}

function maTranTienDong(time: ThoiGianThienVan): Mat3 {
  const t = time.tt / 36525;
  let eps0 = 84381.406;
  let psia =
    ((((-0.0000000951 * t + 0.000132851) * t - 0.00114045) * t - 1.0790069) * t + 5038.481507) * t;
  let omegaa =
    ((((0.0000003337 * t - 0.000000467) * t - 0.00772503) * t + 0.0512623) * t - 0.025754) * t +
    eps0;
  let chia =
    ((((-0.000000056 * t + 0.000170663) * t - 0.00121197) * t - 2.3814292) * t + 10.556403) * t;
  eps0 *= ARCSECONDS_TO_RADIAN;
  psia *= ARCSECONDS_TO_RADIAN;
  omegaa *= ARCSECONDS_TO_RADIAN;
  chia *= ARCSECONDS_TO_RADIAN;
  const sa = Math.sin(eps0),
    ca = Math.cos(eps0),
    sb = Math.sin(-psia),
    cb = Math.cos(-psia),
    sc = Math.sin(-omegaa),
    cc = Math.cos(-omegaa),
    sd = Math.sin(chia),
    cd = Math.cos(chia);
  const xx = cd * cb - sb * sd * cc,
    yx = cd * sb * ca + sd * cc * cb * ca - sa * sd * sc,
    zx = cd * sb * sa + sd * cc * cb * sa + ca * sd * sc;
  const xy = -sd * cb - sb * cd * cc,
    yy = -sd * sb * ca + cd * cc * cb * ca - sa * cd * sc,
    zy = -sd * sb * sa + cd * cc * cb * sa + ca * cd * sc;
  const xz = sb * sc,
    yz = -sc * cb * ca - sa * cc,
    zz = -sc * cb * sa + cc * ca;
  return [
    [xx, xy, xz],
    [yx, yy, yz],
    [zx, zy, zz],
  ];
}

function maTranChuongDong(time: ThoiGianThienVan): Mat3 {
  const tilt = doNghieng(time),
    obm = tilt.trungBinh * DEG_TO_RAD,
    obt = tilt.that * DEG_TO_RAD,
    psi = tilt.dpsi * ARCSECONDS_TO_RADIAN;
  const cobm = Math.cos(obm),
    sobm = Math.sin(obm),
    cobt = Math.cos(obt),
    sobt = Math.sin(obt),
    cpsi = Math.cos(psi),
    spsi = Math.sin(psi);
  const xx = cpsi,
    yx = -spsi * cobm,
    zx = -spsi * sobm,
    xy = spsi * cobt,
    yy = cpsi * cobm * cobt + sobm * sobt,
    zy = cpsi * sobm * cobt - cobm * sobt,
    xz = spsi * sobt,
    yz = cpsi * cobm * sobt - sobm * cobt,
    zz = cpsi * sobm * sobt + cobm * cobt;
  return [
    [xx, xy, xz],
    [yx, yy, yz],
    [zx, zy, zz],
  ];
}

function xoay(m: Mat3, v: Vec3): Vec3 {
  return [
    m[0][0] * v[0] + m[1][0] * v[1] + m[2][0] * v[2],
    m[0][1] * v[0] + m[1][1] * v[1] + m[2][1] * v[2],
    m[0][2] * v[0] + m[1][2] * v[1] + m[2][2] * v[2],
  ];
}

function chuanHoaDo(value: number): number {
  const x = value % 360;
  return x < 0 ? x + 360 : x;
}

function doLechGoc(value: number): number {
  let x = chuanHoaDo(value);
  if (x > 180) x -= 360;
  return x;
}

function frac(value: number): number {
  return value - Math.floor(value);
}

function tinhViTriTrangThuc(time: ThoiGianThienVan): ViTriTrang {
  const moon = tinhViTriTrangTrungBinh(time);
  const cosLat = Math.cos(moon.viDo);
  const eclip: Vec3 = [
    cosLat * Math.cos(moon.kinhDo),
    cosLat * Math.sin(moon.kinhDo),
    Math.sin(moon.viDo),
  ];
  const obm = doNghiengTrungBinh(time) * DEG_TO_RAD;
  let equ: Vec3 = [
    eclip[0],
    eclip[1] * Math.cos(obm) - eclip[2] * Math.sin(obm),
    eclip[1] * Math.sin(obm) + eclip[2] * Math.cos(obm),
  ];
  equ = xoay(maTranChuongDong(time), equ);
  const obt = doNghieng(time).that * DEG_TO_RAD;
  const x = equ[0],
    y = equ[1] * Math.cos(obt) + equ[2] * Math.sin(obt),
    z = -equ[1] * Math.sin(obt) + equ[2] * Math.cos(obt);
  return {
    kinhDo: chuanHoaDo(Math.atan2(y, x) * RAD_TO_DEG),
    viDo: Math.atan2(z, Math.hypot(x, y)),
  };
}

function tinhViTriTrangTrungBinh(time: ThoiGianThienVan): ViTriTrang {
  const T = time.tt / 36525;
  type Bang = { min: number; values: number[][] };
  const make = (): Bang => ({
    min: -6,
    values: Array.from({ length: 13 }, () => Array<number>(4).fill(0)),
  });
  const co = make(),
    si = make();
  const get = (a: Bang, x: number, y: number): number => a.values[x - a.min]![y - 1]!;
  const set = (a: Bang, x: number, y: number, v: number): void => {
    a.values[x - a.min]![y - 1] = v;
  };
  const mul = (a: [number, number], b: [number, number]): [number, number] => [
    a[0] * b[0] - a[1] * b[1],
    a[1] * b[0] + a[0] * b[1],
  ];
  const sine = (phi: number): number => Math.sin(TWO_PI * phi);
  const T2 = T * T;
  let dlam = 0,
    ds = 0,
    gam1c = 0;
  const dl0 =
    0.84 * sine(0.19833 + 0.05611 * T) +
    0.31 * sine(0.27869 + 0.04508 * T) +
    14.27 * sine(0.16827 - 0.36903 * T) +
    7.26 * sine(0.34734 - 5.37261 * T) +
    0.28 * sine(0.10498 - 5.37899 * T) +
    0.24 * sine(0.42681 - 0.41855 * T);
  const dl =
    2.94 * sine(0.19833 + 0.05611 * T) +
    0.31 * sine(0.27869 + 0.04508 * T) +
    14.27 * sine(0.16827 - 0.36903 * T) +
    9.34 * sine(0.34734 - 5.37261 * T) +
    1.12 * sine(0.10498 - 5.37899 * T) +
    0.83 * sine(0.42681 - 0.41855 * T);
  const dls = -6.4 * sine(0.19833 + 0.05611 * T) - 1.89 * sine(0.42681 - 0.41855 * T);
  const df =
    0.21 * sine(0.19833 + 0.05611 * T) +
    0.31 * sine(0.27869 + 0.04508 * T) +
    14.27 * sine(0.16827 - 0.36903 * T) -
    88.7 * sine(0.34734 - 5.37261 * T) -
    15.3 * sine(0.10498 - 5.37899 * T) +
    0.24 * sine(0.42681 - 0.41855 * T) -
    1.86 * sine(0.14943 - 5.37511 * T);
  const dd = dl0 - dls;
  const dgam =
    -3332e-9 * sine(0.59734 - 5.37261 * T) -
    539e-9 * sine(0.35498 - 5.37899 * T) -
    64e-9 * sine(0.39943 - 5.37511 * T);
  const l0 =
    TWO_PI * frac(0.60643382 + 1336.85522467 * T - 0.00000313 * T2) + dl0 / ARCSECONDS_PER_RADIAN;
  const l =
    TWO_PI * frac(0.37489701 + 1325.55240982 * T + 0.00002565 * T2) + dl / ARCSECONDS_PER_RADIAN;
  const ls =
    TWO_PI * frac(0.99312619 + 99.99735956 * T - 0.00000044 * T2) + dls / ARCSECONDS_PER_RADIAN;
  const f =
    TWO_PI * frac(0.25909118 + 1342.2278298 * T - 0.00000892 * T2) + df / ARCSECONDS_PER_RADIAN;
  const d =
    TWO_PI * frac(0.82736186 + 1236.85308708 * T - 0.00000397 * T2) + dd / ARCSECONDS_PER_RADIAN;
  const args = [0, l, ls, f, d];
  const max = [0, 4, 3, 4, 6];
  const fac = [0, 1.000002208, 0.997504612 - 0.002495388 * T, 1.000002708 + 139.978 * dgam, 1];
  for (let i = 1; i <= 4; i++) {
    set(co, 0, i, 1);
    set(si, 0, i, 0);
    set(co, 1, i, Math.cos(args[i]!) * fac[i]!);
    set(si, 1, i, Math.sin(args[i]!) * fac[i]!);
    for (let j = 2; j <= max[i]!; j++) {
      const m = mul([get(co, j - 1, i), get(si, j - 1, i)], [get(co, 1, i), get(si, 1, i)]);
      set(co, j, i, m[0]);
      set(si, j, i, m[1]);
    }
    for (let j = 1; j <= max[i]!; j++) {
      set(co, -j, i, get(co, j, i));
      set(si, -j, i, -get(si, j, i));
    }
  }
  const term = (p: number, q: number, r: number, s: number): [number, number] => {
    let z: [number, number] = [1, 0];
    const is = [0, p, q, r, s];
    for (let k = 1; k <= 4; k++) {
      const n = is[k]!;
      if (n !== 0) z = mul(z, [get(co, n, k), get(si, n, k)]);
    }
    return z;
  };
  const addSol = (
    cl: number,
    cs: number,
    cg: number,
    _cp: number,
    p: number,
    q: number,
    r: number,
    s: number,
  ): void => {
    const z = term(p, q, r, s);
    dlam += cl * z[1];
    ds += cs * z[1];
    gam1c += cg * z[0];
  };
  addSol(13.902, 14.06, -0.001, 0.2607, 0, 0, 0, 4);
  addSol(0.403, -4.01, 0.394, 0.0023, 0, 0, 0, 3);
  addSol(2369.912, 2373.36, 0.601, 28.2333, 0, 0, 0, 2);
  addSol(-125.154, -112.79, -0.725, -0.9781, 0, 0, 0, 1);
  addSol(1.979, 6.98, -0.445, 0.0433, 1, 0, 0, 4);
  addSol(191.953, 192.72, 0.029, 3.0861, 1, 0, 0, 2);
  addSol(-8.466, -13.51, 0.455, -0.1093, 1, 0, 0, 1);
  addSol(22639.5, 22609.07, 0.079, 186.5398, 1, 0, 0, 0);
  addSol(18.609, 3.59, -0.094, 0.0118, 1, 0, 0, -1);
  addSol(-4586.465, -4578.13, -0.077, 34.3117, 1, 0, 0, -2);
  addSol(3.215, 5.44, 0.192, -0.0386, 1, 0, 0, -3);
  addSol(-38.428, -38.64, 0.001, 0.6008, 1, 0, 0, -4);
  addSol(-0.393, -1.43, -0.092, 0.0086, 1, 0, 0, -6);
  addSol(-0.289, -1.59, 0.123, -0.0053, 0, 1, 0, 4);
  addSol(-24.42, -25.1, 0.04, -0.3, 0, 1, 0, 2);
  addSol(18.023, 17.93, 0.007, 0.1494, 0, 1, 0, 1);
  addSol(-668.146, -126.98, -1.302, -0.3997, 0, 1, 0, 0);
  addSol(0.56, 0.32, -0.001, -0.0037, 0, 1, 0, -1);
  addSol(-165.145, -165.06, 0.054, 1.9178, 0, 1, 0, -2);
  addSol(-1.877, -6.46, -0.416, 0.0339, 0, 1, 0, -4);
  addSol(0.213, 1.02, -0.074, 0.0054, 2, 0, 0, 4);
  addSol(14.387, 14.78, -0.017, 0.2833, 2, 0, 0, 2);
  addSol(-0.586, -1.2, 0.054, -0.01, 2, 0, 0, 1);
  addSol(769.016, 767.96, 0.107, 10.1657, 2, 0, 0, 0);
  addSol(1.75, 2.01, -0.018, 0.0155, 2, 0, 0, -1);
  addSol(-211.656, -152.53, 5.679, -0.3039, 2, 0, 0, -2);
  addSol(1.225, 0.91, -0.03, -0.0088, 2, 0, 0, -3);
  addSol(-30.773, -34.07, -0.308, 0.3722, 2, 0, 0, -4);
  addSol(-0.57, -1.4, -0.074, 0.0109, 2, 0, 0, -6);
  addSol(-2.921, -11.75, 0.787, -0.0484, 1, 1, 0, 2);
  addSol(1.267, 1.52, -0.022, 0.0164, 1, 1, 0, 1);
  addSol(-109.673, -115.18, 0.461, -0.949, 1, 1, 0, 0);
  addSol(-205.962, -182.36, 2.056, 1.4437, 1, 1, 0, -2);
  addSol(0.233, 0.36, 0.012, -0.0025, 1, 1, 0, -3);
  addSol(-4.391, -9.66, -0.471, 0.0673, 1, 1, 0, -4);
  addSol(0.283, 1.53, -0.111, 0.006, 1, -1, 0, 4);
  addSol(14.577, 31.7, -1.54, 0.2302, 1, -1, 0, 2);
  addSol(147.687, 138.76, 0.679, 1.1528, 1, -1, 0, 0);
  addSol(-1.089, 0.55, 0.021, 0.0, 1, -1, 0, -1);
  addSol(28.475, 23.59, -0.443, -0.2257, 1, -1, 0, -2);
  addSol(-0.276, -0.38, -0.006, -0.0036, 1, -1, 0, -3);
  addSol(0.636, 2.27, 0.146, -0.0102, 1, -1, 0, -4);
  addSol(-0.189, -1.68, 0.131, -0.0028, 0, 2, 0, 2);
  addSol(-7.486, -0.66, -0.037, -0.0086, 0, 2, 0, 0);
  addSol(-8.096, -16.35, -0.74, 0.0918, 0, 2, 0, -2);
  addSol(-5.741, -0.04, 0.0, -0.0009, 0, 0, 2, 2);
  addSol(0.255, 0.0, 0.0, 0.0, 0, 0, 2, 1);
  addSol(-411.608, -0.2, 0.0, -0.0124, 0, 0, 2, 0);
  addSol(0.584, 0.84, 0.0, 0.0071, 0, 0, 2, -1);
  addSol(-55.173, -52.14, 0.0, -0.1052, 0, 0, 2, -2);
  addSol(0.254, 0.25, 0.0, -0.0017, 0, 0, 2, -3);
  addSol(0.025, -1.67, 0.0, 0.0031, 0, 0, 2, -4);
  addSol(1.06, 2.96, -0.166, 0.0243, 3, 0, 0, 2);
  addSol(36.124, 50.64, -1.3, 0.6215, 3, 0, 0, 0);
  addSol(-13.193, -16.4, 0.258, -0.1187, 3, 0, 0, -2);
  addSol(-1.187, -0.74, 0.042, 0.0074, 3, 0, 0, -4);
  addSol(-0.293, -0.31, -0.002, 0.0046, 3, 0, 0, -6);
  addSol(-0.29, -1.45, 0.116, -0.0051, 2, 1, 0, 2);
  addSol(-7.649, -10.56, 0.259, -0.1038, 2, 1, 0, 0);
  addSol(-8.627, -7.59, 0.078, -0.0192, 2, 1, 0, -2);
  addSol(-2.74, -2.54, 0.022, 0.0324, 2, 1, 0, -4);
  addSol(1.181, 3.32, -0.212, 0.0213, 2, -1, 0, 2);
  addSol(9.703, 11.67, -0.151, 0.1268, 2, -1, 0, 0);
  addSol(-0.352, -0.37, 0.001, -0.0028, 2, -1, 0, -1);
  addSol(-2.494, -1.17, -0.003, -0.0017, 2, -1, 0, -2);
  addSol(0.36, 0.2, -0.012, -0.0043, 2, -1, 0, -4);
  addSol(-1.167, -1.25, 0.008, -0.0106, 1, 2, 0, 0);
  addSol(-7.412, -6.12, 0.117, 0.0484, 1, 2, 0, -2);
  addSol(-0.311, -0.65, -0.032, 0.0044, 1, 2, 0, -4);
  addSol(0.757, 1.82, -0.105, 0.0112, 1, -2, 0, 2);
  addSol(2.58, 2.32, 0.027, 0.0196, 1, -2, 0, 0);
  addSol(2.533, 2.4, -0.014, -0.0212, 1, -2, 0, -2);
  addSol(-0.344, -0.57, -0.025, 0.0036, 0, 3, 0, -2);
  addSol(-0.992, -0.02, 0.0, 0.0, 1, 0, 2, 2);
  addSol(-45.099, -0.02, 0.0, -0.001, 1, 0, 2, 0);
  addSol(-0.179, -9.52, 0.0, -0.0833, 1, 0, 2, -2);
  addSol(-0.301, -0.33, 0.0, 0.0014, 1, 0, 2, -4);
  addSol(-6.382, -3.37, 0.0, -0.0481, 1, 0, -2, 2);
  addSol(39.528, 85.13, 0.0, -0.7136, 1, 0, -2, 0);
  addSol(9.366, 0.71, 0.0, -0.0112, 1, 0, -2, -2);
  addSol(0.202, 0.02, 0.0, 0.0, 1, 0, -2, -4);
  addSol(0.415, 0.1, 0.0, 0.0013, 0, 1, 2, 0);
  addSol(-2.152, -2.26, 0.0, -0.0066, 0, 1, 2, -2);
  addSol(-1.44, -1.3, 0.0, 0.0014, 0, 1, -2, 2);
  addSol(0.384, -0.04, 0.0, 0.0, 0, 1, -2, -2);
  addSol(1.938, 3.6, -0.145, 0.0401, 4, 0, 0, 0);
  addSol(-0.952, -1.58, 0.052, -0.013, 4, 0, 0, -2);
  addSol(-0.551, -0.94, 0.032, -0.0097, 3, 1, 0, 0);
  addSol(-0.482, -0.57, 0.005, -0.0045, 3, 1, 0, -2);
  addSol(0.681, 0.96, -0.026, 0.0115, 3, -1, 0, 0);
  addSol(-0.297, -0.27, 0.002, -0.0009, 2, 2, 0, -2);
  addSol(0.254, 0.21, -0.003, 0.0, 2, -2, 0, -2);
  addSol(-0.25, -0.22, 0.004, 0.0014, 1, 3, 0, -2);
  addSol(-3.996, 0.0, 0.0, 0.0004, 2, 0, 2, 0);
  addSol(0.557, -0.75, 0.0, -0.009, 2, 0, 2, -2);
  addSol(-0.459, -0.38, 0.0, -0.0053, 2, 0, -2, 2);
  addSol(-1.298, 0.74, 0.0, 0.0004, 2, 0, -2, 0);
  addSol(0.538, 1.14, 0.0, -0.0141, 2, 0, -2, -2);
  addSol(0.263, 0.02, 0.0, 0.0, 1, 1, 2, 0);
  addSol(0.426, 0.07, 0.0, -0.0006, 1, 1, -2, -2);
  addSol(-0.304, 0.03, 0.0, 0.0003, 1, -1, 2, 0);
  addSol(-0.372, -0.19, 0.0, -0.0027, 1, -1, -2, 2);
  addSol(0.418, 0.0, 0.0, 0.0, 0, 0, 4, 0);
  addSol(-0.33, -0.04, 0.0, 0.0, 3, 0, 2, 0);

  const addN = (cn: number, p: number, q: number, r: number, s: number): number =>
    cn * term(p, q, r, s)[1];
  let n = 0;
  n += addN(-526.069, 0, 0, 1, -2);
  n += addN(-3.352, 0, 0, 1, -4);
  n += addN(+44.297, +1, 0, 1, -2);
  n += addN(-6.0, +1, 0, 1, -4);
  n += addN(+20.599, -1, 0, 1, 0);
  n += addN(-30.598, -1, 0, 1, -2);
  n += addN(-24.649, -2, 0, 1, 0);
  n += addN(-2.0, -2, 0, 1, -2);
  n += addN(-22.571, 0, +1, 1, -2);
  n += addN(+10.985, 0, -1, 1, -2);

  dlam +=
    +0.82 * sine(0.7736 - 62.5512 * T) +
    0.31 * sine(0.0466 - 125.1025 * T) +
    0.35 * sine(0.5785 - 25.1042 * T) +
    0.66 * sine(0.4591 + 1335.8075 * T) +
    0.64 * sine(0.313 - 91.568 * T) +
    1.14 * sine(0.148 + 1331.2898 * T) +
    0.21 * sine(0.5918 + 1056.5859 * T) +
    0.44 * sine(0.5784 + 1322.8595 * T) +
    0.24 * sine(0.2275 - 5.7374 * T) +
    0.28 * sine(0.2965 + 2.6929 * T) +
    0.33 * sine(0.3132 + 6.3368 * T);
  const s = f + ds / ARCSECONDS_PER_RADIAN;
  const latSeconds =
    (1.000002708 + 139.978 * dgam) * (18518.511 + 1.189 + gam1c) * Math.sin(s) -
    6.24 * Math.sin(3 * s) +
    n;

  return {
    kinhDo: TWO_PI * frac((l0 + dlam / ARCSECONDS_PER_RADIAN) / TWO_PI),
    viDo: (Math.PI / (180 * 3600)) * latSeconds,
  };
}
