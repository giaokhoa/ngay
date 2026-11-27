import { randomUUID } from 'node:crypto';
import { performance } from 'node:perf_hooks';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { QuanSatHttpService } from './http-metrics.service';

interface HttpRequestLike {
  method?: string;
  path?: string;
  route?: { path?: string };
  headers?: Readonly<Record<string, string | string[] | undefined>>;
}

interface HttpResponseLike {
  statusCode?: number;
  setHeader(name: string, value: string): void;
}

@Injectable()
export class QuanSatHttpInterceptor implements NestInterceptor {
  constructor(private readonly metrics: QuanSatHttpService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const http = context.switchToHttp();
    const request = http.getRequest<HttpRequestLike>();
    const response = http.getResponse<HttpResponseLike>();
    const requestId = layRequestId(request.headers?.['x-request-id']);
    const startedAt = performance.now();
    let daGhiNhan = false;

    response.setHeader('X-Request-Id', requestId);

    const ghiNhan = (statusCode: number): void => {
      if (daGhiNhan) return;
      daGhiNhan = true;

      const method = request.method ?? 'UNKNOWN';
      const route = layRoute(request);
      const durationMs = performance.now() - startedAt;

      this.metrics.ghiNhan({ method, route, statusCode, durationMs });

      if (process.env.NODE_ENV !== 'test') {
        console.log(
          JSON.stringify({
            level: 'info',
            event: 'http_request',
            requestId,
            method,
            route,
            statusCode,
            durationMs: Number(durationMs.toFixed(3)),
          }),
        );
      }
    };

    return next.handle().pipe(
      tap({
        next: () => ghiNhan(response.statusCode ?? 200),
        error: (error: unknown) => ghiNhan(layStatusLoi(error)),
      }),
    );
  }
}

function layRequestId(value: string | string[] | undefined): string {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (candidate && /^[A-Za-z0-9._:-]{1,128}$/.test(candidate)) {
    return candidate;
  }
  return randomUUID();
}

function layRoute(request: HttpRequestLike): string {
  const route = request.route?.path ?? request.path ?? 'unknown';
  return route.startsWith('/') ? route : '/' + route;
}

function layStatusLoi(error: unknown): number {
  if (
    typeof error === 'object' &&
    error !== null &&
    'getStatus' in error &&
    typeof error.getStatus === 'function'
  ) {
    const status = error.getStatus();
    if (typeof status === 'number') return status;
  }

  return 500;
}
