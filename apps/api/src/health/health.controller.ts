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

  @Get('live')
  kiemTraSong(): TrangThaiSucKhoe {
    return { trangThai: 'ok' };
  }

  @Get('ready')
  kiemTraSanSang(): TrangThaiSucKhoe {
    return { trangThai: 'ok' };
  }
}
