import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { boDinhTuyen } from './router';
import './styles.css';

const nutGoc = document.getElementById('root');

if (!nutGoc) {
  throw new Error('Khong tim thay phan tu root');
}

createRoot(nutGoc).render(
  <StrictMode>
    <RouterProvider router={boDinhTuyen} />
  </StrictMode>,
);
