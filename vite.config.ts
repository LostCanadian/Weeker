// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Set this per target:
  //   IONOS root:        VITE_PUBLIC_BASE="/"
  //   GitHub Pages proj: VITE_PUBLIC_BASE="/Weeker/"
  const BASE = env.VITE_PUBLIC_BASE || '/';

  const stripTrailing = (s: string) => (s.endsWith('/') ? s.slice(0, -1) : s);
  const NAV_FALLBACK = `${stripTrailing(BASE)}/index.html`;

  return {
    base: BASE,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          navigateFallback: NAV_FALLBACK,
        },
        manifest: {
          name: 'Weeker',
          short_name: 'Weeker',
          description: "Stay on top of your weekly schedule even when you're offline.",
          start_url: BASE,
          scope: BASE,
          display: 'standalone',
          background_color: '#1f2937',
          theme_color: '#285943',
          orientation: 'portrait-primary',
          icons: [
            { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
            { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
          ],
        },
      }),
    ],
  };
});

