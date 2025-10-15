import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Weeker/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: 'index.html',
        navigateFallbackAllowlist: [/^\/Weeker\//],
      },
      manifest: {
        name: 'Weeker',
        short_name: 'Weeker',
        description:
          "Stay on top of your weekly schedule even when you're offline.",
        start_url: '.',
        scope: '.',
        display: 'standalone',
        background_color: '#1f2937',
        theme_color: '#f97316',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
