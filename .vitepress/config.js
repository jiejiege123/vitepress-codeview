/*
 * @Author: zzz
 * @LastEditors: zzz
 */

const { mdPlugin } = require('./plugins/plugins')

module.exports = {
  lang: 'zh-Hans',
  title: 'VitePress',
  description: 'Vite 与 Vue 驱动的静态站点生成器',

  themeConfig: {
    repo: 'docschina/vitepress-docs-cn',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页面',
    lastUpdated: '上次更新',

    algolia: {
      apiKey: 'c57105e511faa5558547599f120ceeba',
      indexName: 'vitepress'
    },

    carbonAds: {
      carbon: 'CEBDT27Y',
      custom: 'CKYD62QM',
      placement: 'vuejsorg'
    },

    nav: [
      { text: '指南', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: '配置参考',
        link: '/config/basics',
        activeMatch: '^/config/'
      },
      // {
      //   text: '发行说明',
      //   link: 'https://github.com/vuejs/vitepress/releases'
      // }
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/config/': getConfigSidebar(),
      '/': getGuideSidebar()
    }
  },

  markdown: {
    anchor: {
      renderPermalink: require('./plugins/render-perma-link')
    },
    config: (md) => mdPlugin(md),

  }
}

function getGuideSidebar() {
  return [
    {
      text: '介绍',
      children: [
        { text: '什么是 VitePress？', link: '/guide/api' },
      ]
    },
    // {
    //   text: '进阶',
    //   children: [
    //     { text: 'API 参考', link: '/guide/api' },
      
    //   ]
    // }
  ]
}

function getConfigSidebar() {
  return [
    {
      text: '应用设置',
      children: [{ text: '基础知识', link: '/config/basics' }]
    },
    // {
    //   text: '主题设置',
    //   children: [
    //     { text: '首页', link: '/config/homepage' },
    //   ]
    // }
  ]
}
