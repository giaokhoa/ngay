import { Controller, Get } from '@nestjs/common';

export interface TrangThaiSucKhoe {
  trangThai: 'ok';
}

@Controller('health')
export class SucKhoeController {
  @Get()
  kiemTra(): TrangThaiSucKhoe {
    return { trangThai: 'ok' };
  }
}
