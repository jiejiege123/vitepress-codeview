<!--
 * @Author: zzz
 * @LastEditors: zzz
-->
# 配置

::: tip
项目基础结构 copy 自 [vitepress中文文档](https://github.com/docschina/vitepress-docs-cn)
:::

基于 [vitepress](https://github.com/vuejs/vitepress) 嘛，所以配置也就和 vitepress 一样了。请参考 [vitepress](https://vitepress.vuejs.org/)，或者直接沿用本项目配置。顺便说一句，官方文档配置参考略显简陋:cry:！

## 文章目录

新增了一种主题，主要用于将文章的目录移动到页面的右侧。

方法引用 Layout 组件，如不需要，注释该行代码并注释掉引用即可：

```js {10}
// .vitepress\theme\index.js
import 'element-plus/dist/index.css'
import DefaultTheme from 'vitepress/theme'
import VpDemo from '../vitepress/components/vp-demo.vue'

import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('VpDemo', VpDemo)
  }
}
```

默认主题：
![An image](/theme01.jpg)

目录右侧主题：
![An image](/theme02.jpg)