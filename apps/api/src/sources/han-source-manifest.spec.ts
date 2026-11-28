import { describe, expect, it } from 'vitest';

import { HAN_CORPUS_MANIFEST, KANRIPO_KR3G0051_REVISION } from './han-source-manifest';

describe('Hán source corpus manifest', () => {
  it('covers all 36 volumes exactly once', () => {
    expect(HAN_CORPUS_MANIFEST).toHaveLength(36);
    expect(HAN_CORPUS_MANIFEST.map((item) => item.quyen)).toEqual(
      Array.from({ length: 36 }, (_, index) => index + 1),
    );
    expect(new Set(HAN_CORPUS_MANIFEST.map((item) => item.quyen)).size).toBe(36);
  });

  it('pins Kanripo WYG to one exact revision', () => {
    const kanripo = HAN_CORPUS_MANIFEST.filter((item) => item.nguon === 'KANRIPO_WYG');

    expect(kanripo).toHaveLength(35);
    expect(kanripo.every((item) => item.revision === KANRIPO_KR3G0051_REVISION)).toBe(true);
    expect(kanripo.every((item) => /^[0-9a-f]{64}$/.test(item.sha256))).toBe(true);
  });

  it('does not hide the missing Kanripo 卷十四', () => {
    const q14 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 14);

    expect(q14).toEqual({
      quyen: 14,
      tenPhan: '年表一',
      nguon: 'WIKISOURCE_WYG_FALLBACK',
      revision: '627109',
      sha256: '0db8d3d973392758282bfb49b98e71de30447114d8a8bf06ff54ebeaf01c3c8e',
      trangThai: 'CHUA_IMPLEMENT',
      phamViOracle: 'Kanripo KR3g0051 hiện thiếu 卷十四; fallback Wikisource 四庫全書本.',
    });
  });

  it('maps the Kanripo filename shift after the missing 卷十四 explicitly', () => {
    expect(HAN_CORPUS_MANIFEST.find((item) => item.quyen === 13)?.tep).toBe('KR3g0051_013.txt');
    expect(HAN_CORPUS_MANIFEST.find((item) => item.quyen === 15)?.tep).toBe('KR3g0051_014.txt');
    expect(HAN_CORPUS_MANIFEST.find((item) => item.quyen === 36)?.tep).toBe('KR3g0051_035.txt');
  });

  it('records Q7 as 13/13 inventoried without claiming a full-volume oracle', () => {
    const q7 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 7);

    expect(q7?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q7?.phamViOracle).toContain('13/13 mục đã inventory');
    expect(q7?.phamViOracle).toMatch(/天乙.*四大吉.*貴登天門.*九醜/);
  });

  it('never labels any whole volume as fully implemented/oracle-tested', () => {
    expect(
      HAN_CORPUS_MANIFEST.every((item) =>
        ['CHUA_IMPLEMENT', 'ORACLE_MOT_PHAN'].includes(item.trangThai),
      ),
    ).toBe(true);
  });
});
