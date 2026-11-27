import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { taoMayChuWeb } from './server.mjs';

const servers = [];
const dirs = [];

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise((resolve) => {
          server.close(() => resolve());
        }),
    ),
  );
  await Promise.all(dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe('production web server', () => {
  it('serves built SPA with history fallback and security headers', async () => {
    const distDir = await taoDist();
    const server = taoMayChuWeb({ distDir, apiOrigin: 'http://127.0.0.1:9' });
    const baseUrl = await listen(server);

    const page = await fetch(baseUrl + '/rules');
    expect(page.status).toBe(200);
    expect(await page.text()).toContain('<div id="root">demo</div>');
    expect(page.headers.get('content-security-policy')).toContain("default-src 'self'");
    expect(page.headers.get('x-frame-options')).toBe('DENY');
    expect(page.headers.get('cache-control')).toBe('no-cache');
    expect(page.headers.get('x-request-id')).toBeTruthy();

    const asset = await fetch(baseUrl + '/assets/app.js');
    expect(asset.status).toBe(200);
    expect(await asset.text()).toBe('console.log("demo");');
    expect(asset.headers.get('cache-control')).toContain('immutable');
  });

  it('proxies API paths same-origin and preserves a safe request id', async () => {
    const upstream = createServer((request, response) => {
      response.setHeader('content-type', 'application/json');
      response.setHeader('x-request-id', request.headers['x-request-id'] ?? '');
      response.end(
        JSON.stringify({
          url: request.url,
          requestId: request.headers['x-request-id'],
        }),
      );
    });
    const upstreamUrl = await listen(upstream);

    const distDir = await taoDist();
    const server = taoMayChuWeb({ distDir, apiOrigin: upstreamUrl });
    const baseUrl = await listen(server);

    const response = await fetch(baseUrl + '/knowledge/rules?activity=AN_TANG', {
      headers: { 'x-request-id': 'demo-request-123' },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('x-request-id')).toBe('demo-request-123');
    expect(await response.json()).toEqual({
      url: '/knowledge/rules?activity=AN_TANG',
      requestId: 'demo-request-123',
    });
  });

  it('proxies health but keeps metrics private to the API network', async () => {
    const upstream = createServer((request, response) => {
      response.statusCode = 200;
      response.end(request.url);
    });
    const upstreamUrl = await listen(upstream);

    const server = taoMayChuWeb({
      distDir: await taoDist(),
      apiOrigin: upstreamUrl,
    });
    const baseUrl = await listen(server);

    expect(await (await fetch(baseUrl + '/health/ready')).text()).toBe('/health/ready');

    const metrics = await fetch(baseUrl + '/metrics');
    expect(metrics.status).toBe(404);
    expect(await metrics.text()).toBe('Not found');
  });
});

async function taoDist() {
  const dir = await mkdtemp(join(tmpdir(), 'ngay-web-'));
  dirs.push(dir);
  await mkdir(join(dir, 'assets'));
  await writeFile(join(dir, 'index.html'), '<div id="root">demo</div>');
  await writeFile(join(dir, 'assets', 'app.js'), 'console.log("demo");');
  return dir;
}

async function listen(server) {
  servers.push(server);
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  return 'http://127.0.0.1:' + address.port;
}
