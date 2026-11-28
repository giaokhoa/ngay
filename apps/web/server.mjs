import { randomUUID } from 'node:crypto';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DEFAULT_PORT = 8080;
const DEFAULT_HOST = '0.0.0.0';
const DEFAULT_API_ORIGIN = 'http://127.0.0.1:3000';
const PROXY_PREFIXES = ['/date-selection', '/health'];
const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
]);

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

export function taoMayChuWeb({
  distDir = resolve(fileURLToPath(new URL('.', import.meta.url)), 'dist'),
  apiOrigin = process.env.API_ORIGIN?.trim() || DEFAULT_API_ORIGIN,
} = {}) {
  const apiBase = new URL(apiOrigin);

  return createServer(async (request, response) => {
    const requestId = layRequestId(request.headers['x-request-id']);
    response.setHeader('X-Request-Id', requestId);
    datSecurityHeaders(response);

    try {
      const url = new URL(request.url || '/', 'http://localhost');

      if (
        url.pathname === '/metrics' ||
        url.pathname === '/knowledge' ||
        url.pathname.startsWith('/knowledge/')
      ) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end('Not found');
        return;
      }

      if (laDuongDanProxy(url.pathname)) {
        await proxyApi({ request, response, requestId, apiBase, url });
        return;
      }

      phucVuStatic({ request, response, distDir, pathname: url.pathname });
    } catch (error) {
      console.error(
        JSON.stringify({
          level: 'error',
          event: 'web_server_error',
          requestId,
          message: error instanceof Error ? error.message : String(error),
        }),
      );

      if (!response.headersSent) {
        response.statusCode = 502;
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      response.end(JSON.stringify({ message: 'Upstream hoặc web server không sẵn sàng.' }));
    }
  });
}

function laDuongDanProxy(pathname) {
  return PROXY_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'));
}

async function proxyApi({ request, response, requestId, apiBase, url }) {
  const target = new URL(url.pathname + url.search, apiBase);
  const headers = new Headers();

  for (const [name, value] of Object.entries(request.headers)) {
    if (HOP_BY_HOP.has(name.toLowerCase()) || value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) headers.append(name, item);
    } else {
      headers.set(name, value);
    }
  }

  headers.set('x-request-id', requestId);
  headers.set('x-forwarded-proto', 'http');
  headers.set('x-forwarded-host', request.headers.host || '');

  const method = request.method || 'GET';
  const body = method === 'GET' || method === 'HEAD' ? undefined : await docRequestBody(request);

  const upstream = await fetch(target, {
    method,
    headers,
    body,
    redirect: 'manual',
  });

  response.statusCode = upstream.status;

  upstream.headers.forEach((value, name) => {
    if (!HOP_BY_HOP.has(name.toLowerCase())) {
      response.setHeader(name, value);
    }
  });

  datSecurityHeaders(response);

  if (method === 'HEAD') {
    response.end();
    return;
  }

  const bodyBuffer = Buffer.from(await upstream.arrayBuffer());
  response.end(bodyBuffer);
}

function phucVuStatic({ request, response, distDir, pathname }) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.statusCode = 405;
    response.setHeader('Allow', 'GET, HEAD');
    response.end();
    return;
  }

  const decoded = decodeURIComponent(pathname);
  const candidate = resolve(distDir, '.' + decoded);
  const safePrefix = distDir.endsWith('/') ? distDir : distDir + '/';
  let filePath = candidate;

  if (candidate !== distDir && !candidate.startsWith(safePrefix)) {
    response.statusCode = 400;
    response.end('Bad request');
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = resolve(filePath, 'index.html');
  }

  const coPhanMoRong = extname(decoded) !== '';
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    if (coPhanMoRong) {
      response.statusCode = 404;
      response.end('Not found');
      return;
    }

    filePath = resolve(distDir, 'index.html');
  }

  if (!existsSync(filePath)) {
    response.statusCode = 503;
    response.end('Web build chưa tồn tại. Hãy chạy pnpm --filter @ngay/web build.');
    return;
  }

  const extension = extname(filePath).toLowerCase();
  response.statusCode = 200;
  response.setHeader('Content-Type', MIME[extension] || 'application/octet-stream');

  if (filePath.endsWith('index.html')) {
    response.setHeader('Cache-Control', 'no-cache');
  } else if (filePath.includes('/assets/')) {
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

function datSecurityHeaders(response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'",
  );
}

async function docRequestBody(request) {
  const chunks = [];
  let total = 0;
  const maxBytes = 1024 * 1024;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += buffer.length;
    if (total > maxBytes) {
      throw new Error('Request body vượt quá 1 MiB proxy limit');
    }
    chunks.push(buffer);
  }

  return chunks.length ? Buffer.concat(chunks) : undefined;
}

function layRequestId(value) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (candidate && /^[A-Za-z0-9._:-]{1,128}$/.test(candidate)) {
    return candidate;
  }
  return randomUUID();
}

function docCong(value) {
  if (value === undefined) return DEFAULT_PORT;
  const text = value.trim();
  if (!/^\d+$/.test(text)) throw new RangeError('PORT phải là số nguyên từ 1 đến 65535');
  const port = Number(text);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
    throw new RangeError('PORT phải là số nguyên từ 1 đến 65535');
  }
  return port;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const host = process.env.HOST?.trim() || DEFAULT_HOST;
  const port = docCong(process.env.PORT);
  const server = taoMayChuWeb();

  server.listen(port, host, () => {
    console.log(
      JSON.stringify({
        level: 'info',
        event: 'web_server_started',
        host,
        port,
        apiOrigin: process.env.API_ORIGIN?.trim() || DEFAULT_API_ORIGIN,
      }),
    );
  });

  const shutdown = (signal) => {
    console.log(JSON.stringify({ level: 'info', event: 'web_server_shutdown', signal }));
    server.close((error) => {
      if (error) {
        console.error(error);
        process.exitCode = 1;
      }
    });
  };

  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGINT', () => shutdown('SIGINT'));
}
