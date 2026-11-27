import 'reflect-metadata';

import { khoiDong } from './bootstrap';

void khoiDong().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
