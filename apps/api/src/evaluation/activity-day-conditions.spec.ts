import { describe, expect, it } from 'vitest';

import { LoaiCongViec, QuyTacDungSu, TacDongDungSu } from '../activities/activity-rule';
import { DiaChi } from '../calendar/domain/earthly-branch';
import { ThienCan } from '../calendar/domain/heavenly-stem';
import { ThapNhiTruc } from '../calendar/domain/twelve-officer';
import { DanhGiaNgayService } from './evaluation.service';

const service = new DanhGiaNgayService();

const RULES: readonly QuyTacDungSu[] = [
  {
    ma: 'TEST_CAN_DINH',
    congViec: LoaiCongViec.CUOI_HOI,
    dieuKien: { loai: 'CAN_NGAY', can: ThienCan.DINH },
    tacDong: TacDongDungSu.KY,
    nguon: [],
  },
  {
    ma: 'TEST_NGAY_AM_12',
    congViec: LoaiCongViec.CUOI_HOI,
    dieuKien: { loai: 'NGAY_AM', ngay: 12 },
    tacDong: TacDongDungSu.KY,
    nguon: [],
  },
  {
    ma: 'TEST_NGAY_AM_15',
    congViec: LoaiCongViec.CUOI_HOI,
    dieuKien: { loai: 'NGAY_AM', ngay: 15 },
    tacDong: TacDongDungSu.KY,
    nguon: [],
  },
];

describe('typed activity day conditions', () => {
  it('CAN_NGAY matches the exact heavenly stem only', () => {
    expect(matched({ canNgay: ThienCan.DINH, ngayAmTrongThang: 8 })).toEqual(['TEST_CAN_DINH']);
    expect(matched({ canNgay: ThienCan.BINH, ngayAmTrongThang: 8 })).toEqual([]);
  });

  it.each([12, 15] as const)('NGAY_AM matches exact astronomical-lunar day %s', (ngay) => {
    expect(matched({ canNgay: ThienCan.GIAP, ngayAmTrongThang: ngay })).toEqual([
      'TEST_NGAY_AM_' + ngay,
    ]);
  });

  it('CAN_NGAY and NGAY_AM may both contribute on the same civil date', () => {
    expect(matched({ canNgay: ThienCan.DINH, ngayAmTrongThang: 12 }).sort()).toEqual(
      ['TEST_CAN_DINH', 'TEST_NGAY_AM_12'].sort(),
    );
  });

  it('missing lunar context does not guess an NGAY_AM match', () => {
    expect(matched({ canNgay: ThienCan.GIAP })).toEqual([]);
  });
});

function matched(input: { canNgay: ThienCan; ngayAmTrongThang?: number }): string[] {
  return service
    .danhGia(RULES, {
      chiThang: DiaChi.DAN,
      canNgay: input.canNgay,
      chiNgay: DiaChi.TY,
      truc: ThapNhiTruc.DINH,
      ngayAmTrongThang: input.ngayAmTrongThang,
      dangThoVuong: false,
      yeuTo: [],
    })
    .dongGop.map((item) => item.quyTac.ma);
}
