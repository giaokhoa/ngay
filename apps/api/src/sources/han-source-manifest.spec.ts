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

  it('keeps all twelve month-table volumes partial rather than claiming a 720-row oracle', () => {
    const monthly = HAN_CORPUS_MANIFEST.filter((item) => item.quyen >= 20 && item.quyen <= 31);

    expect(monthly).toHaveLength(12);
    expect(monthly.every((item) => item.trangThai === 'ORACLE_MOT_PHAN')).toBe(true);
    expect(monthly.map((item) => item.tep)).toEqual(
      Array.from(
        { length: 12 },
        (_, index) => `KR3g0051_${String(index + 19).padStart(3, '0')}.txt`,
      ),
    );
  });

  it('keeps Q14–19 annual tables unimplemented while preserving their six source blocks', () => {
    const annual = HAN_CORPUS_MANIFEST.filter((item) => item.quyen >= 14 && item.quyen <= 19);

    expect(annual).toHaveLength(6);
    expect(annual.every((item) => item.trangThai === 'CHUA_IMPLEMENT')).toBe(true);
    expect(annual[0]?.nguon).toBe('WIKISOURCE_WYG_FALLBACK');
    expect(annual.slice(1).every((item) => item.nguon === 'KANRIPO_WYG')).toBe(true);
    expect(annual.slice(1).map((item) => item.tep)).toEqual([
      'KR3g0051_014.txt',
      'KR3g0051_015.txt',
      'KR3g0051_016.txt',
      'KR3g0051_017.txt',
      'KR3g0051_018.txt',
    ]);
  });

  it('maps the Kanripo filename shift after the missing 卷十四 explicitly', () => {
    expect(HAN_CORPUS_MANIFEST.find((item) => item.quyen === 13)?.tep).toBe('KR3g0051_013.txt');
    expect(HAN_CORPUS_MANIFEST.find((item) => item.quyen === 15)?.tep).toBe('KR3g0051_014.txt');
    expect(HAN_CORPUS_MANIFEST.find((item) => item.quyen === 36)?.tep).toBe('KR3g0051_035.txt');
  });

  it('records the full Q9 Lập thành structure while keeping its oracle partial', () => {
    const q9 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 9);

    expect(q9?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q9?.phamViOracle).toMatch(
      /4\/4 phần.*10 biểu niên thần.*30 biểu nguyệt thần.*2 trang nhật thần.*6 biểu thời thần/,
    );
  });

  it('records Q1 as structurally complete while keeping its oracle partial', () => {
    const q1 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 1);

    expect(q1?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q1?.phamViOracle).toContain('17/17 mục Việt = 28/28 heading Hán');
    expect(q1?.phamViOracle).toMatch(/Ngũ Thử.*Ngũ Hổ.*Thổ Vượng/);
  });

  it('keeps inventoried Q2/Q12/Q13 volumes unimplemented and without oracle claims', () => {
    for (const quyen of [2, 12, 13]) {
      const item = HAN_CORPUS_MANIFEST.find((entry) => entry.quyen === quyen);
      expect(item?.trangThai).toBe('CHUA_IMPLEMENT');
      expect(item?.phamViOracle).toBeUndefined();
    }
  });

  it('keeps Q3 unimplemented after its annual/spatial inventory is documented', () => {
    const q3 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 3);

    expect(q3?.trangThai).toBe('CHUA_IMPLEMENT');
    expect(q3?.phamViOracle).toBeUndefined();
  });

  it('keeps Q8 unimplemented after its spatial inventory is documented', () => {
    const q8 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 8);

    expect(q8?.trangThai).toBe('CHUA_IMPLEMENT');
    expect(q8?.phamViOracle).toBeUndefined();
  });

  it('keeps appendix/refutation volumes unimplemented and out of oracle status', () => {
    for (const quyen of [35, 36]) {
      const item = HAN_CORPUS_MANIFEST.find((entry) => entry.quyen === quyen);
      expect(item?.trangThai).toBe('CHUA_IMPLEMENT');
      expect(item?.phamViOracle).toBeUndefined();
    }
  });

  it('records Q10 as 51 grouped sections while keeping semantic oracle vertical-scoped', () => {
    const q10 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 10);

    expect(q10?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q10?.phamViOracle).toMatch(/51\/51 mục Việt = 99\/99 heading TOC Hán/);
    expect(q10?.phamViOracle).toContain('34 vertical');
  });

  it('records Q11 as 73 canonical activities rather than the 60-item source subcatalog', () => {
    const q11 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 11);

    expect(q11?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q11?.phamViOracle).toMatch(/73\/73 canonical Dụng sự sections/);
    expect(q11?.phamViOracle).toContain('39 section còn lại out-of-scope');
    expect(q11?.phamViOracle).toContain('67/37/60 việc');
  });

  it('records Q32-Q34 structural inventories without claiming full-volume oracle', () => {
    const q32 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 32);
    const q33 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 33);
    const q34 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 34);

    expect(q32?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q32?.phamViOracle).toMatch(/3\/3.*貴登天門.*四大吉時/);
    expect(q33?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q33?.phamViOracle).toMatch(/14 mục Việt exact = 15 heading Hán.*論用盤針.*羅經圖.*相主/);
    expect(q34?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q34?.phamViOracle).toMatch(/12 heading Hán = 10 mục Việt exact.*時刻方位圖.*用時法/);
  });

  it('records Q4 as 29/29 section inventory without inventing standalone factors', () => {
    const q4 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 4);

    expect(q4?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q4?.phamViOracle).toContain('29/29 section đã inventory');
    expect(q4?.phamViOracle).toMatch(/月厭.*不將.*歲薄\/逐陣.*絕陰陽/);
  });

  it('records Q5 as 30/30 section inventory without claiming a full-volume oracle', () => {
    const q5 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 5);

    expect(q5?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q5?.phamViOracle).toContain('30/30 section đã inventory');
    expect(q5?.phamViOracle).toMatch(/天道.*無禄/);
  });

  it('records Q6 as 40/40 inventoried without claiming a full-volume oracle', () => {
    const q6 = HAN_CORPUS_MANIFEST.find((item) => item.quyen === 6);

    expect(q6?.trangThai).toBe('ORACLE_MOT_PHAN');
    expect(q6?.phamViOracle).toContain('40/40 mục đã inventory');
    expect(q6?.phamViOracle).toMatch(/反支.*月忌.*上朔/);
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
