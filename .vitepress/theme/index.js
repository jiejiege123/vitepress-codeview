import 'element-plus/dist/index.css'

import DefaultTheme from './theme-element'


import VpDemo from '../vitepress/components/vp-demo.vue'

import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('VpDemo', VpDemo)
  }
}