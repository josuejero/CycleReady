import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/CycleReady/',
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        releaseRoom: resolve(__dirname, 'release-room.html'),
        releaseSummary: resolve(__dirname, 'release-summary.html')
      }
    }
  }
});
