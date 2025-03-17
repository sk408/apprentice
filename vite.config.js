import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React automatic JSX runtime
      jsxRuntime: 'automatic',
      // Babel configuration if needed
      babel: {
        plugins: [],
        // Additional Babel presets if needed
        presets: [],
      }
    })
  ],
  resolve: {
    alias: {
      // Set up any path aliases you might have in your tsconfig
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Configure global environment variables similar to how CRA does it
  define: {
    'process.env': process.env,
  },
  // For GitHub Pages deployment
  base: '/audiometry_trainer/',
  build: {
    outDir: 'build', // Match CRA output dir
  },
  server: {
    port: 3000, // Match CRA default port
  },
}); 