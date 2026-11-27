import { createBrowserRouter } from 'react-router';

import { TrangChu } from './pages/home-page';
import { TrangCuoiHoi } from './pages/wedding-page';
import { DUONG_DAN } from './routes';

export const boDinhTuyen = createBrowserRouter([
  {
    path: DUONG_DAN.TRANG_CHU,
    Component: TrangChu,
  },
  {
    path: DUONG_DAN.CUOI_HOI,
    Component: TrangCuoiHoi,
  },
]);
