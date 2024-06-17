---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: 全栈小册
titleTemplate: 全链路学习网站，学习原来如此简单

hero:
  name: "全栈小册"
  text: "Full-stack Skill Learning Website"
  tagline: 全链路学习网站，学习原来如此简单
  image:
    src: /images/home.svg
    alt: 全栈小册
  actions:
    - theme: brand
      text: 开始阅读
      link: /framework/react/
    - theme: alt
      text: 面试宝典
      link: /interview/basic/

features:
  - title: 框架篇
    icon: 🦀
    link: /framework/react/
    linkText: 开始阅读
    details: 案例在线演示，轻松系统学习
  - title: 专栏篇
    icon: 🦐
    link: /column/javascript/
    linkText: 开始阅读
    details: 专栏文章，深入浅出，带你飞
  - title: 小记篇
    icon: 🐙
    link: /note/
    linkText: 开始阅读
    details: 零碎的知识点，记录在这里
  - title: 离线阅读
    icon: 👁️‍🗨️
    link: /framework/vitepress/pwa
    linkText: 去尝试
    details: 支持 PWA 离线阅读，没网也能看
  - title: 全局搜索
    icon: 🔎
    link: /framework/vitepress/algolia
    linkText: 去搜索
    details: 支持全局搜索，快速定位文章
  - title: 拥抱开源
    icon: 🚩
    link: https://github.com/dapandocs/danpan-docs
    linkText: 去star ⭐
    details: 文档内容开源，欢迎贡献PR
---

<DataPanel />
