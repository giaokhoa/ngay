export interface CauHinhRuntime {
  cong: number;
  mayChu: string;
}

const CONG_MAC_DINH = 3000;
const MAY_CHU_MAC_DINH = '0.0.0.0';

export function docCauHinhRuntime(env: NodeJS.ProcessEnv): CauHinhRuntime {
  return {
    cong: docCong(env.PORT),
    mayChu: docMayChu(env.HOST),
  };
}

function docCong(giaTri: string | undefined): number {
  if (giaTri === undefined) return CONG_MAC_DINH;

  const text = giaTri.trim();
  if (!/^\d+$/.test(text)) {
    throw new RangeError('PORT phải là số nguyên từ 1 đến 65535');
  }

  const cong = Number(text);
  if (!Number.isSafeInteger(cong) || cong < 1 || cong > 65535) {
    throw new RangeError('PORT phải là số nguyên từ 1 đến 65535');
  }

  return cong;
}

function docMayChu(giaTri: string | undefined): string {
  if (giaTri === undefined) return MAY_CHU_MAC_DINH;

  const mayChu = giaTri.trim();
  if (mayChu.length === 0 || /\s/.test(mayChu)) {
    throw new RangeError('HOST không hợp lệ');
  }

  return mayChu;
}
