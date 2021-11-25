import 'element-plus/dist/index.css'

import DefaultTheme from 'vitepress/theme'

import VpDemo from '../vitepress/components/vp-demo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('VpDemo', VpDemo)
  }
}