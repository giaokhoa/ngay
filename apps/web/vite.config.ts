import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/date-selection': 'http://localhost:3000',
      '/knowledge': 'http://localhost:3000',
    },
  },
});
