import { describe, expect, it } from 'vitest';

import { docCauHinhRuntime } from './runtime-config';

describe('docCauHinhRuntime', () => {
  it('dùng cấu hình mặc định deterministic', () => {
    expect(docCauHinhRuntime({})).toEqual({
      cong: 3000,
      mayChu: '0.0.0.0',
    });
  });

  it('đọc PORT và HOST hợp lệ', () => {
    expect(docCauHinhRuntime({ PORT: '8080', HOST: '127.0.0.1' })).toEqual({
      cong: 8080,
      mayChu: '127.0.0.1',
    });
  });

  it.each(['0', '65536', '-1', '3.14', 'abc', ''])('từ chối PORT không hợp lệ: %s', (PORT) => {
    expect(() => docCauHinhRuntime({ PORT })).toThrow('PORT phải là số nguyên từ 1 đến 65535');
  });

  it.each(['', '   ', 'host name'])('từ chối HOST không hợp lệ: %s', (HOST) => {
    expect(() => docCauHinhRuntime({ HOST })).toThrow('HOST không hợp lệ');
  });
});
