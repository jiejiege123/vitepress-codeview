import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'


export default defineConfig({
  server: {
    fs: {
      strict: true
    }
  },
  plugins: [
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  
})