import { createBrowserRouter } from 'react-router';

import { TrangChu } from './pages/home-page';
import { DUONG_DAN } from './routes';

export const boDinhTuyen = createBrowserRouter([
  {
    path: DUONG_DAN.TRANG_CHU,
    Component: TrangChu,
  },
]);
