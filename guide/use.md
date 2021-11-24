---
title: 使用
---

# 基本使用
Vitepress 的使用，见官网 [https://vitepress.vuejs.org/](https://vitepress.vuejs.org/)。

主要介绍 vue 组件和 html 文件的预览。

## 写法
沿用 vitepress 的自定义容器，标志为 `demo`，空格后面跟组件的描述性语句。内容为文件在 `examples` 文件夹下的路径。
::: tip 注意
记得加上后缀名。
:::
```md
::: demo 描述语言

xxx/xxx.xxx

:::
```

## 示例
### 使用vue组件
md 代码示例
```md
::: demo 这是一个点一下加1的按钮

test/button.vue

:::
```


**效果**：
::: demo 这是一个点一下加1的按钮

test/button.vue

:::

::: info
特别强调一点，项目是按需引入 element-plus 的，使用 element 组件时需要在代码中引入。
:::

### 使用html
md 代码示例
```md
::: demo 这是 css 动画源码

test/action.html

:::
```

**效果**：
::: demo 这是 css 动画源码

test/action.html

:::
::: info
html 使用 ifarme 引入，各个例子之间不会相互影响。
:::