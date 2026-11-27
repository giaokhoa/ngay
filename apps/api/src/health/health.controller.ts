import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';

import { KhoTriThucPostgresService } from '../knowledge/knowledge.service';

export interface TrangThaiSucKhoe {
  trangThai: 'ok';
}

@Controller('health')
export class SucKhoeController {
  constructor(private readonly khoTriThuc: KhoTriThucPostgresService) {}

  @Get()
  kiemTra(): TrangThaiSucKhoe {
    return { trangThai: 'ok' };
  }

  @Get('live')
  kiemTraSong(): TrangThaiSucKhoe {
    return { trangThai: 'ok' };
  }

  @Get('ready')
  async kiemTraSanSang(): Promise<TrangThaiSucKhoe> {
    if (!(await this.khoTriThuc.kiemTraKetNoi())) {
      throw new ServiceUnavailableException('Postgres knowledge catalog chưa sẵn sàng.');
    }
    return { trangThai: 'ok' };
  }
}
