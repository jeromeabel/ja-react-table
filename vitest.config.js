import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    // css : true, // parsing CSS is slow
  },
  build: {
    lib: {
      entry: './index.ts',
      name: 'ja-react-table',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
  },
});
