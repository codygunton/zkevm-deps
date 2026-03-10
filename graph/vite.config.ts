import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-data',
      writeBundle(options) {
        const outDir = options.dir ?? 'dist';
        const dataIn = join(__dirname, 'data');
        const dataOut = join(outDir, 'data');
        mkdirSync(dataOut, { recursive: true });
        for (const file of readdirSync(dataIn)) {
          if (file.endsWith('.json')) {
            copyFileSync(join(dataIn, file), join(dataOut, file));
          }
        }
      },
    },
  ],
  base: '/zkevm-deps/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
