import { describe, expect, it } from 'vitest';

import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { MaYeuTo } from '../factors/domain/factor-code';
import { TacDongDungSu } from './activity-rule';
import { QUY_TAC_KHAI_TRUONG } from './khai-truong-rules';

const NEN = new Set([
  'YEU_TO:THIEN_NGUYEN',
  'YEU_TO:DAN_NHAT',
  'TRUC:MAN',
  'TRUC:THANH',
  'TRUC:KHAI',
  'YEU_TO:NGU_PHU',
]);

const KY = new Set([
  'YEU_TO:NGUYET_PHA',
  'YEU_TO:DAI_HAO',
  'TRUC:BINH',
  'TRUC:THU',
  'TRUC:BE',
  'YEU_TO:KIEP_SAT',
  'YEU_TO:TAI_SAT',
  'YEU_TO:NGUYET_SAT',
  'YEU_TO:NGUYET_HINH',
  'YEU_TO:NGUYET_HAI',
  'YEU_TO:NGUYET_YEM',
  'YEU_TO:DAI_THOI',
  'YEU_TO:THIEN_LAI',
  'YEU_TO:TIEU_HAO',
  'YEU_TO:TU_HAO',
  'YEU_TO:TU_PHE',
  'YEU_TO:TU_CUNG',
  'YEU_TO:NGU_MO',
  'YEU_TO:CUU_KHONG',
]);

describe('Q11 KHAI_TRUONG exact rule set', () => {
  it('has exactly 6 Nên and 19 Kị', () => {
    expect(QUY_TAC_KHAI_TRUONG.filter((rule) => rule.tacDong === TacDongDungSu.NEN)).toHaveLength(
      6,
    );
    expect(QUY_TAC_KHAI_TRUONG.filter((rule) => rule.tacDong === TacDongDungSu.KY)).toHaveLength(
      19,
    );
    expect(QUY_TAC_KHAI_TRUONG).toHaveLength(25);
  });

  it('matches exact Q11 Nên targets', () => {
    expect(tap(TacDongDungSu.NEN)).toEqual(NEN);
  });

  it('matches exact Q11 Kị targets', () => {
    expect(tap(TacDongDungSu.KY)).toEqual(KY);
  });

  it('models Dân Nhật as factor, never as Chi Dần', () => {
    expect(NEN.has('YEU_TO:' + MaYeuTo.DAN_NHAT)).toBe(true);
    expect(NEN.has('CHI_NGAY:DAN')).toBe(false);
  });

  it('keeps Đại Hao and Nguyệt Phá as distinct Q11 identities', () => {
    expect(KY.has('YEU_TO:' + MaYeuTo.DAI_HAO)).toBe(true);
    expect(KY.has('YEU_TO:' + MaYeuTo.NGUYET_PHA)).toBe(true);
  });

  it('uses typed Trực for Mãn/Thành/Khai and Bình/Thu/Bế', () => {
    expect(NEN.has('TRUC:' + ThapNhiTruc.MAN)).toBe(true);
    expect(NEN.has('TRUC:' + ThapNhiTruc.THANH)).toBe(true);
    expect(NEN.has('TRUC:' + ThapNhiTruc.KHAI)).toBe(true);
    expect(KY.has('TRUC:' + ThapNhiTruc.BINH)).toBe(true);
    expect(KY.has('TRUC:' + ThapNhiTruc.THU)).toBe(true);
    expect(KY.has('TRUC:' + ThapNhiTruc.BE)).toBe(true);
  });

  it('every Q11 rule keeps verified Vietnamese + Hán provenance', () => {
    for (const rule of QUY_TAC_KHAI_TRUONG) {
      expect(rule.nguon).toHaveLength(2);
      expect(rule.nguon.every((nguon) => nguon.daXacMinh)).toBe(true);
    }
  });
});

function tap(tacDong: TacDongDungSu): Set<string> {
  return new Set(
    QUY_TAC_KHAI_TRUONG.filter((rule) => rule.tacDong === tacDong).map((rule) =>
      khoa(rule.dieuKien),
    ),
  );
}

function khoa(target: (typeof QUY_TAC_KHAI_TRUONG)[number]['dieuKien']): string {
  switch (target.loai) {
    case 'YEU_TO':
      return 'YEU_TO:' + target.ma;
    case 'TRUC':
      return 'TRUC:' + target.truc;
    case 'CHI_NGAY':
      return 'CHI_NGAY:' + target.chi;
    case 'THO_VUONG':
      return 'THO_VUONG';
  }
}
