# 主题 {#theming}

## 使用自定义主题 {#using-a-custom-theme}

你可以通过添加 `.vitepress/theme/index.js` 文件（主题入口文件）来启用自定义主题。

```bash
.
├─ docs
│  ├─ .vitepress
│  │  ├─ theme
│  │  │  └─ index.js
│  │  └─ config.js
│  └─ index.md
└─ package.json
```

VitePress 自定义主题只是一个包含三个属性的对象，定义如下：

```ts
interface Theme {
  Layout: Component // Vue 3 component
  NotFound?: Component
  enhanceApp?: (ctx: EnhanceAppContext) => void
}

interface EnhanceAppContext {
  app: App // Vue 3 app instance
  router: Router // VitePress router instance
  siteData: Ref<SiteData>
}
```

主题入口文件应该将主题作为它的默认导出：

```js
// .vitepress/theme/index.js
import Layout from './Layout.vue'

export default {
  Layout,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  }
}
```

...其中的 `Layout` 组件可以像这样：

```vue
<!-- .vitepress/theme/Layout.vue -->
<template>
  <h1>Custom Layout!</h1>
  <Content /><!-- this is where markdown content will be rendered -->
</template>
```

默认导出是定制主题的唯一约定。在你的自定义主题中，它就像一个正常的 Vite + Vue 3 应用程序。请注意，主题也需要是 [SSR 兼容](/guide/using-vue.html#browser-api-access-restrictions)。

要使用主题，只需在包入口导出对象。要使用外部主题，请从自定义主题入口导入再重新导出它：

```js
// .vitepress/theme/index.js
import Theme from 'awesome-vitepress-theme'
export default Theme
```

## 扩展默认主题 {#extending-the-default-theme}

如果你想扩展和自定义默认主题，你可以从 `vitepress/theme` 导入它，并在自定义主题入口中扩展它。下面是一些常见的自定义的例子：

### 注册全局组件 {#registering-global-components}

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component('MyGlobalComponent' /* ... */)
  }
}
```

由于我们正在使用 Vite，你还可以利用 Vite 的 [glob import 特性](https://cn.vitejs.dev/guide/features.html#glob-import) 来自动注册组件目录。

### 自定义 CSS {#customizing-css}

默认主题 CSS 是可以通过覆盖根级 CSS 变量来定制的：

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

```css
/* .vitepress/theme/custom.css */
:root {
  --c-brand: #646cff;
  --c-brand-light: #747bff;
}
```

参见可以被重写覆盖的 [默认主题 CSS 变量](https://github.com/vuejs/vitepress/blob/master/src/client/theme-default/styles/vars.css)。

### 布局插槽 {#layout-slots}

默认主题的 `<Layout/>` 组件有几个插槽，可以用来在页面的特定位置注入内容。下面是一个将组件注入到侧边栏顶部的例子：

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots
  Layout: MyLayout
}
```

```vue
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar-top> My custom sidebar top content </template>
  </Layout>
</template>
```

默认主题布局中可用的插槽的完整列表：

- `navbar-search`
- `sidebar-top`
- `sidebar-bottom`
- `page-top-ads`
- `page-top`
- `page-bottom`
- `page-bottom-ads`
- 只有当 `home: true` 通过 frontmatter 启用时可用:
  - `home-hero`
  - `home-features`
  - `home-footer`
