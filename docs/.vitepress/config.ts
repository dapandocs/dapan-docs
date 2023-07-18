import { defineConfig } from "vitepress";
import { resolve } from "node:path";
import { withPwa } from "@vite-pwa/vitepress";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import VueComponents from "unplugin-vue-components/vite";
import MarkdownTransform from "./plugins/vite-plugin-md-transform";
import { description, title, github } from "./scripts/meta";
import pwa from "./scripts/pwa";
import algolia from "./scripts/algolia";
import sidebar from "./scripts/sidebar";
import head from "./scripts/head";
import {
  getSiteUrlLinks,
  generateSiteMap,
  generateTodaySitemapTxtUrlLinks,
  generateSitemapJsonUrlLinks,
} from "./scripts/sitemap";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    title,
    // 与pwa的outDir保持一致
    outDir: resolve(__dirname, "../../dist"),
    description,
    appearance: "dark",
    lastUpdated: true,
    useWebFonts: false,
    cleanUrls: false,
    markdown: {
      lineNumbers: true,
    },
    pwa,
    head,
    vite: {
      resolve: {
        alias: {
          "@components": resolve(__dirname, "../components"),
          "@docs": resolve(__dirname, "../"),
          "@vitepress": resolve(__dirname, "../.vitepress"),
        },
      },
      plugins: [
        react(),
        UnoCSS(),
        MarkdownTransform(),
        VueComponents({
          dirs: "./components/vue",
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: "./components/vue/components.d.ts",
          transformer: "vue3",
        }),
      ],
      server: {
        proxy: {
          "/api": {
            target: "https://www.skillgroup.cn",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
          "/bing-api": {
            target: "https://www.bing.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/bing-api/, ""),
          },
          "/baidu-api": {
            target: "http://data.zz.baidu.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/baidu-api/, ""),
          },
        },
      },
    },
    locales: {
      root: { label: "简体中文", lang: "zh-CN" },
    },
    themeConfig: {
      search: {
        // provider: 'local',
        provider: "algolia",
        options: algolia,
      },
      sidebar,
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        {
          text: "🔥主流框架",
          items: [
            { text: "React", link: "/framework/react/" },
            { text: "Vue", link: "/framework/vue/" },
            { text: "VitePress", link: "/framework/vitepress/" },
            { text: "UnoCSS", link: "/framework/unocss/" },
          ],
        },
      ],
      logo: "/logo.svg",
      lastUpdatedText: "最后一次更新于",
      outline: "deep",
      docFooter: {
        prev: "上一篇",
        next: "下一篇",
      },
      returnToTopLabel: "返回顶部",
      outlineTitle: "大纲",
      darkModeSwitchLabel: "外观",
      sidebarMenuLabel: "目录",
      editLink: {
        pattern: `${github}/blob/master/docs/:path`,
        text: "为此页提供修改建议",
      },
      socialLinks: [{ icon: "github", link: github }],
    },
    transformHtml: (_, id, ctx) => {
      getSiteUrlLinks(id, ctx);
    },
    async buildEnd(siteConfig) {
      // 生成sitemap.xml
      generateSiteMap(siteConfig);
      // 生成sitemap.json
      generateSitemapJsonUrlLinks(siteConfig);
      // 生成today-sitemap.txt
      generateTodaySitemapTxtUrlLinks(siteConfig);
    },
  })
);
