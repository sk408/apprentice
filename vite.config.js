import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

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
    }),
    visualizer({
      open: false,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      // Set up any path aliases you might have in your tsconfig
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  // Configure global environment variables similar to how CRA does it
  define: {
    'process.env': process.env,
  },
  // For GitHub Pages deployment
  base: '/audiometry_trainer/',
  build: {
    outDir: 'build',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': [
            'react', 
            'react-dom', 
            'react-router-dom',
          ],
          'vendor-mui': [
            '@mui/material', 
            '@mui/icons-material', 
            '@emotion/react', 
            '@emotion/styled'
          ],
          'vendor-three': [
            'three', 
            '@react-three/fiber', 
            '@react-three/drei'
          ],
          'vendor-charts': [
            'chart.js', 
            'react-chartjs-2', 
            'recharts'
          ],
          'vendor-utils': [
            'uuid', 
            'html2canvas', 
            'jspdf', 
            'qrcode.react'
          ],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    target: 'es2020',
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
  },
}); 