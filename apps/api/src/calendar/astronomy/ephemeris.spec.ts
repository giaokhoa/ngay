import { describe, expect, it } from 'vitest';

import { timThoiDiemMatTroiDatKinhDo, timThoiDiemPhaTrang } from './ephemeris';

const DAY = 86_400_000;

// Transition regression captured from astronomy-engine@2.1.19 before removing
// the runtime dependency. HKO remains the independent oracle in
// solar-term.service.spec.ts; these millisecond fixtures protect the port itself.
const SOLAR_2026 = [
  [285, '2026-01-05T08:23:03.114Z'],
  [300, '2026-01-20T01:44:42.360Z'],
  [315, '2026-02-03T20:01:54.541Z'],
  [330, '2026-02-18T15:51:32.389Z'],
  [345, '2026-03-05T13:58:43.971Z'],
  [0, '2026-03-20T14:45:36.044Z'],
  [15, '2026-04-04T18:39:59.161Z'],
  [30, '2026-04-20T01:39:09.897Z'],
  [45, '2026-05-05T11:49:09.475Z'],
  [60, '2026-05-21T00:37:16.958Z'],
  [75, '2026-06-05T15:48:59.457Z'],
  [90, '2026-06-21T08:25:00.316Z'],
  [105, '2026-07-07T01:57:22.386Z'],
  [120, '2026-07-22T19:13:18.217Z'],
  [135, '2026-08-07T11:42:56.663Z'],
  [150, '2026-08-23T02:18:58.412Z'],
  [165, '2026-09-07T14:41:44.296Z'],
  [180, '2026-09-23T00:05:38.617Z'],
  [195, '2026-10-08T06:29:58.055Z'],
  [210, '2026-10-23T09:38:24.266Z'],
  [225, '2026-11-07T09:52:33.362Z'],
  [240, '2026-11-22T07:23:34.115Z'],
  [255, '2026-12-07T02:52:47.191Z'],
  [270, '2026-12-21T20:50:22.187Z'],
] as const;

const NEW_MOON_REGRESSION = [
  ['2024-02-10T12:00:00Z', -35, '2024-02-09T22:59:42.001Z'],
  ['2025-01-29T12:00:00Z', -35, '2024-12-30T22:27:25.420Z'],
  ['2026-01-01T00:00:00Z', 35, '2026-01-18T19:52:39.367Z'],
  ['2030-06-15T00:00:00Z', 35, '2030-06-30T21:35:03.841Z'],
  ['1999-12-15T00:00:00Z', 35, '2000-01-06T18:14:24.574Z'],
] as const;

describe('self-contained ephemeris regression', () => {
  it('preserves all 24 solar longitude events captured before dependency removal', () => {
    let start = new Date('2026-01-01T00:00:00Z');

    for (const [longitude, expectedIso] of SOLAR_2026) {
      const actual = timThoiDiemMatTroiDatKinhDo(longitude, start, 10);
      expect(actual).not.toBeNull();
      expect(Math.abs(actual!.getTime() - new Date(expectedIso).getTime())).toBeLessThanOrEqual(2);
      start = new Date(actual!.getTime() + 10 * DAY);
    }
  });

  it.each(NEW_MOON_REGRESSION)(
    'preserves new-moon search from %s (%d days)',
    (startIso, days, expectedIso) => {
      const actual = timThoiDiemPhaTrang(0, new Date(startIso), days);
      expect(actual).not.toBeNull();
      expect(Math.abs(actual!.getTime() - new Date(expectedIso).getTime())).toBeLessThanOrEqual(2);
    },
  );
});
