/*
 * @Author: zzz
 * @LastEditors: zzz
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'

import { projRoot } from './.vitepress/utils/paths'

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