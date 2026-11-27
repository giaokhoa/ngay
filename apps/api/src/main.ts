import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';

import { UngDungModule } from './app.module';

async function khoiDong(): Promise<void> {
  const ungDung = await NestFactory.create(UngDungModule);
  const cong = Number(process.env.PORT ?? 3000);

  await ungDung.listen(cong);
}

void khoiDong();
