import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { UngDungModule } from './app.module';
import { docCauHinhRuntime } from './runtime-config';

export interface TuyChonTaoUngDung {
  batShutdownHooks?: boolean;
}

export async function taoUngDung(tuyChon: TuyChonTaoUngDung = {}): Promise<INestApplication> {
  const ungDung = await NestFactory.create(UngDungModule);

  ungDung.useSecurityHeaders();

  if (tuyChon.batShutdownHooks ?? true) {
    ungDung.enableShutdownHooks();
  }

  return ungDung;
}

export async function khoiDong(env: NodeJS.ProcessEnv = process.env): Promise<void> {
  const cauHinh = docCauHinhRuntime(env);
  const ungDung = await taoUngDung();

  await ungDung.listen(cauHinh.cong, cauHinh.mayChu);
}
