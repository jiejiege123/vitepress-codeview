# 弄啥呢
vitepress-codeview 是基于 [vitepress](https://github.com/vuejs/vitepress)，针对组件开发和html展示场景做了一些功能增强和默认样式修改，是一个简单的写文档工具。

## 到底做了啥
说白了就写示例的时候，能方便的看到源码，一键复制源码。

其他的类似工具大多能在 `vue` 组件开发的时候显示效果和源码（例如：[element-plus/docs](https://github.com/element-plus/element-plus/tree/dev/docs)；[vitepress-for-component](https://github.com/dewfall123/vitepress-for-component)），却忽略了 `html` 示例的展示。

So~  在 `ctrl+c & ctrl+v` 了 element-plus 组件预览部分的基础上，加上了 `html` 的展示预览。

## 跑起来
没啥说的，
``` sh
# 克隆本仓库
$ git clone git@github.com:jiejiege123/vitepress-codeview.git

# 安装依赖
$ yarn

# 启动开发服务器
$ yarn dev
```
欢迎 [star](https://github.com/jiejiege123/vitepress-codeview) :smile: