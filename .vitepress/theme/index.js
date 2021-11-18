/*
 * @Author: zzz
 * @LastEditors: zzz
 */
import DefaultTheme from 'vitepress/theme'

import VpDemo from '../../components/vp-demo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('VpDemo', VpDemo)
  }
}