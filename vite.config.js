import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'group-user': [
            './src/views/Layout.vue',
            './src/views/Home.vue',
            './src/views/DetailAnime.vue',
            './src/views/GenresAnime.vue',
            './src/views/SectionAnime.vue',
            './src/components/Navbar.vue',
            './src/components/footer/Footer.vue',
          ],
        },
      },
    },
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['oh-vue-icons/icons'],
  },
})
