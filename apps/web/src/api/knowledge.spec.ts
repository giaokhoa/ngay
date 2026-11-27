import { describe, expect, it } from 'vitest';

import { taoUrlTimQuyTac } from './knowledge';

describe('taoUrlTimQuyTac', () => {
  it('builds deterministic Postgres query filters', () => {
    expect(
      taoUrlTimQuyTac({
        activity: 'AN_TANG',
        layer: 'Q10',
        effect: 'KY',
        target: 'PHUC_NHAT',
        book: 10,
        page: 823,
        q: 'Phục Nhật',
        limit: 25,
        offset: 5,
      }),
    ).toBe(
      '/knowledge/rules?activity=AN_TANG&layer=Q10&effect=KY&target=PHUC_NHAT&book=10&page=823&q=Ph%E1%BB%A5c+Nh%E1%BA%ADt&limit=25&offset=5',
    );
  });

  it('omits empty filters', () => {
    expect(taoUrlTimQuyTac({ q: '', limit: 50 })).toBe('/knowledge/rules?limit=50');
  });
});
