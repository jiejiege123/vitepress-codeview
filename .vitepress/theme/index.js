/*
 * @Author: zzz
 * @LastEditors: zzz
 */
import 'element-plus/dist/index.css'

import DefaultTheme from 'vitepress/theme'

import VpDemo from '../vitepress/components/vp-demo.vue'

import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  // 取消引用，恢复系统默认文档目录
  Layout,
  enhanceApp({ app }) {
    app.component('VpDemo', VpDemo)
  }
}