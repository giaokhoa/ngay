import { Injectable } from '@nestjs/common';

export interface MauDoHttp {
  method: string;
  route: string;
  statusCode: number;
  durationMs: number;
}

interface ThongKeHttp {
  count: number;
  durationMsSum: number;
}

@Injectable()
export class QuanSatHttpService {
  private readonly thongKe = new Map<string, ThongKeHttp>();

  ghiNhan(mauDo: MauDoHttp): void {
    const method = chuanHoaNhan(mauDo.method.toUpperCase());
    const route = chuanHoaNhan(mauDo.route);
    const status = nhomStatus(mauDo.statusCode);
    const key = JSON.stringify([method, route, status]);
    const hienTai = this.thongKe.get(key) ?? { count: 0, durationMsSum: 0 };

    hienTai.count += 1;
    hienTai.durationMsSum += Math.max(0, mauDo.durationMs);
    this.thongKe.set(key, hienTai);
  }

  xuatPrometheus(): string {
    const lines = [
      '# HELP ngay_http_requests_total Total HTTP requests by method, route and status class.',
      '# TYPE ngay_http_requests_total counter',
    ];

    for (const [key, value] of this.thongKe.entries()) {
      const [method, route, status] = JSON.parse(key) as [string, string, string];
      const labels = nhanPrometheus({ method, route, status });
      lines.push(`ngay_http_requests_total{${labels}} ${value.count}`);
    }

    lines.push(
      '# HELP ngay_http_request_duration_ms_sum Sum of HTTP request durations in milliseconds.',
      '# TYPE ngay_http_request_duration_ms_sum counter',
    );

    for (const [key, value] of this.thongKe.entries()) {
      const [method, route, status] = JSON.parse(key) as [string, string, string];
      const labels = nhanPrometheus({ method, route, status });
      lines.push(`ngay_http_request_duration_ms_sum{${labels}} ${value.durationMsSum.toFixed(3)}`);
    }

    lines.push(
      '# HELP ngay_http_request_duration_ms_count Number of HTTP request duration observations.',
      '# TYPE ngay_http_request_duration_ms_count counter',
    );

    for (const [key, value] of this.thongKe.entries()) {
      const [method, route, status] = JSON.parse(key) as [string, string, string];
      const labels = nhanPrometheus({ method, route, status });
      lines.push(`ngay_http_request_duration_ms_count{${labels}} ${value.count}`);
    }

    lines.push(
      '# HELP ngay_process_uptime_seconds Process uptime in seconds.',
      '# TYPE ngay_process_uptime_seconds gauge',
      `ngay_process_uptime_seconds ${process.uptime().toFixed(3)}`,
    );

    return lines.join('\n') + '\n';
  }
}

function nhomStatus(statusCode: number): string {
  if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) {
    return 'unknown';
  }
  return Math.floor(statusCode / 100) + 'xx';
}

function chuanHoaNhan(value: string): string {
  return value.trim() || 'unknown';
}

function nhanPrometheus(labels: Readonly<Record<string, string>>): string {
  return Object.entries(labels)
    .map(([key, value]) => `${key}="${escapePrometheus(value)}"`)
    .join(',');
}

function escapePrometheus(value: string): string {
  return value.replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll('"', '\\"');
}
