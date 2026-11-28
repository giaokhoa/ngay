import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/date-selection': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
      '/metrics': 'http://localhost:3000',
    },
  },
});
