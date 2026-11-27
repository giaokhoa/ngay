import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { taoUngDung } from './bootstrap';

describe('production HTTP bootstrap', () => {
  let dongUngDung: (() => Promise<void>) | undefined;
  let databaseUrlCu: string | undefined;

  beforeEach(() => {
    databaseUrlCu = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
  });

  afterEach(async () => {
    await dongUngDung?.();
    dongUngDung = undefined;

    if (databaseUrlCu === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = databaseUrlCu;
    }
  });

  it('exposes liveness/readiness and baseline security headers', async () => {
    const ungDung = await taoUngDung({ batShutdownHooks: false });
    await ungDung.listen(0, '127.0.0.1');
    dongUngDung = () => ungDung.close();

    const baseUrl = await ungDung.getUrl();
    const [live, ready] = await Promise.all([
      fetch(baseUrl + '/health/live'),
      fetch(baseUrl + '/health/ready'),
    ]);

    expect(live.status).toBe(200);
    expect(await live.json()).toEqual({ trangThai: 'ok' });
    expect(ready.status).toBe(200);
    expect(await ready.json()).toEqual({ trangThai: 'ok' });

    expect(live.headers.get('x-powered-by')).toBeNull();
    expect(live.headers.get('x-content-type-options')).toBe('nosniff');
    expect(live.headers.get('x-frame-options')).toBeTruthy();
    expect(live.headers.get('content-security-policy')).toBeTruthy();
  });

  it('keeps knowledge catalog optional when DATABASE_URL is absent', async () => {
    const ungDung = await taoUngDung({ batShutdownHooks: false });
    await ungDung.listen(0, '127.0.0.1');
    dongUngDung = () => ungDung.close();

    const baseUrl = await ungDung.getUrl();
    const [status, stats] = await Promise.all([
      fetch(baseUrl + '/knowledge/status'),
      fetch(baseUrl + '/knowledge/stats'),
    ]);

    expect(status.status).toBe(200);
    expect(await status.json()).toEqual({
      configured: false,
      backend: 'postgres',
      evaluationUsesDatabase: false,
    });
    expect(stats.status).toBe(503);
  });
});
