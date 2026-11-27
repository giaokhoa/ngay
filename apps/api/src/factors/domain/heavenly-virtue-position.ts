export enum MaQuaiThienDuc {
  KHON = 'KHON',
  CAN_THIEN = 'CAN_THIEN',
  CAN_SON = 'CAN_SON',
  TON = 'TON',
}

export interface QuaiThienDuc {
  ma: MaQuaiThienDuc;
  ten: 'Khôn' | 'Càn' | 'Cấn' | 'Tốn';
  hanTu: '坤' | '乾' | '艮' | '巽';
}
