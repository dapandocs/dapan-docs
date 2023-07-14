---
sitemapTime: 2023/07/14
---

# VitePress 如何开启 PWA 功能

VitePress 默认支持 PWA，但需要你自己配置一些内容。本文将介绍如何开启 PWA 功能。

## 什么是 PWA

PWA（Progressive Web App）是一种渐进式 Web 应用，它可以像原生应用一样提供类似的体验。PWA 可以在离线时工作，可以在主屏幕上添加图标，可以接收推送通知等。

## 开启 PWA 功能

首先要先安装 `@vite-pwa/vitepress`：

```bash
yarn add @vite-pwa/vitepress
```

```js
// .vitepress/config.js
import { defineConfig } from "vite";
import { withPwa } from "@vite-pwa/vitepress";

export default withPwa(
  defineConfig({
  pwa: {
    outDir: ".vitepress/dist", // 输出目录
    registerType: "autoUpdate", // 注册类型为自动更新
    includeManifestIcons: false, // 不包含清单图标
    manifest: {
      id: "/", // 清单 ID
      name: title, // 应用名称
      short_name: title, // 应用的短名称
      description: description, // 应用的描述
      theme_color: "#ffffff", // 主题颜色
      icons: [
        {
          src: "/images/pwa-120x120.png", // 图标路径
          sizes: "120x120", // 图标尺寸
          type: "image/png", // 图标类型
        },
        {
          src: "/images/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/images/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"], // 匹配需要缓存的文件类型
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, // 匹配需要缓存的 Google 字体
          handler: "CacheFirst", // 缓存优先策略
          options: {
            cacheName: "google-fonts-cache", // 缓存名称
            expiration: {
              maxEntries: 10, // 最大缓存条目数
              maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
            },
            cacheableResponse: {
              statuses: [0, 200], // 缓存的响应状态码
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, // 匹配需要缓存的 Google 字体
          handler: "CacheFirst", // 缓存优先策略
          options: {
            cacheName: "gstatic-fonts-cache", // 缓存名称
            expiration: {
              maxEntries: 10, // 最大缓存条目数
              maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
            },
            cacheableResponse: {
              statuses: [0, 200], // 缓存的响应状态码
            },
          },
        },
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, // 匹配需要缓存的 jsdelivr 图片
          handler: "NetworkFirst", // 网络优先策略
          options: {
            cacheName: "jsdelivr-images-cache", // 缓存名称
            expiration: {
              maxEntries: 10, // 最大缓存条目数
              maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
            },
            cacheableResponse: {
              statuses: [0, 200], // 缓存的响应状态码
            },
          },
        },
      ],
    },
  },
})
);
```
 
## PWA 线上验证

![](/images/vitepress/pwa-install.png)

在浏览器中打开 VitePress 站点，然后按下 `F12` 打开开发者工具，切换到 `Network` 选项卡，然后点击 `Offline` 按钮，即可模拟离线状态。

或者，将本网站添加到主屏幕，然后断开网络，即可看到网站可以正常访问。





