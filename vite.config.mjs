// vite.config.mjs - ESM format
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      open: false, // Set to true to automatically open the stats file after build
      filename: 'stats.html', // Output file
      gzipSize: true, // Show gzipped sizes
      brotliSize: true, // Show brotli sizes
    }),
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
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
    // Optimize chunk strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and related packages
          'vendor-react': [
            'react', 
            'react-dom', 
            'react-router-dom',
          ],
          // Split MUI packages
          'vendor-mui': [
            '@mui/material', 
            '@mui/icons-material', 
            '@emotion/react', 
            '@emotion/styled'
          ],
          // Split Three.js and related packages
          'vendor-three': [
            'three', 
            '@react-three/fiber', 
            '@react-three/drei'
          ],
          // Split charting libraries
          'vendor-charts': [
            'chart.js', 
            'react-chartjs-2', 
            'recharts'
          ],
          // Split utility libraries
          'vendor-utils': [
            'uuid', 
            'html2canvas', 
            'jspdf', 
            'qrcode.react'
          ],
        },
        // Improve asset naming for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Increase the chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000, // Match CRA default port
  },
}); 