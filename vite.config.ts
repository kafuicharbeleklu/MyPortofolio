import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const projectRoot = process.cwd();
  const env = loadEnv(mode, projectRoot, '');
  const geminiApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';
  const usePolling =
    process.platform === 'win32' &&
    process.env.VITE_DISABLE_POLLING !== 'true';
  return {
    root: projectRoot,
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
    },
    optimizeDeps: {
      entries: ['src/main.tsx'],
    },
    resolve: {
      alias: {
        '@': path.resolve(projectRoot, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: usePolling
        ? {
            usePolling: true,
            interval: 300,
          }
        : undefined,
    },
  };
});
