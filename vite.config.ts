import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Markdown from 'vite-plugin-md';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/.*\.(jpg|png|svg|json|js)$/]
      }
    }),
    AutoImport({
      dts: true
    }),
    Components({
      dts: true,
      deep: true,
      dirs: ['src/modules/components'],
      include: [/\.vue$/, /\.vue\?vue/]
    }),
    Markdown({
      markdownItOptions: {
        breaks: true,
        html: true,
        linkify: true,
        typographer: true
      },
      // markdownItSetup(md) {
      //   md.use(require('markdown-it-anchor'));
      //   md.use(require('markdown-it-attrs'));
      // },
      wrapperClasses: 'article'
    })
  ],
  worker: {
    format: 'es'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['lodash-es']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lodash-es': ['lodash-es'],
          'markdown-it': ['markdown-it'],
          comlink: ['comlink']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
