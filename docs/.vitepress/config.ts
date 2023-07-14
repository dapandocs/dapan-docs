import { defineConfig } from "vitepress";
import { resolve } from "node:path";
import { withPwa } from "@vite-pwa/vitepress";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import VueComponents from "unplugin-vue-components/vite";
import { description, keywords, title, developerName, github } from "./meta";
import MarkdownTransform from "./plugins/vite-plugin-md-transform";
import { pwa } from "./scripts/pwa";
import algolia from "./scripts/algolia";
import { links, getSiteUrlLinks, generateSiteMap } from "./scripts/sitemap";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    pwa,
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
    vite: {
      resolve: {
        alias: {
          "@components": "/components",
          "@vitepress": "/.vitepress",
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
    head: [
      ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
      ["meta", { name: "keywords", content: keywords }],
      ["meta", { name: "author", content: developerName }],
      [
        "meta",
        {
          name: "google-site-verification",
          content: "8C08prB1osC3jsMbYZjmrkWEIM1zduj1OxedQjghNxs",
        },
      ],
      [
        "meta",
        { name: "baidu-site-verification", content: "codeva-xf7u8GA3Wp" },
      ],
      [
        "meta",
        {
          name: "360-site-verification",
          content: "37fc981df313cb2376c89f6fded04cfc",
        },
      ],
      [
        "meta",
        {
          name: "msvalidate.01",
          content: "95080530C3B969C7083402BB727761AA",
        },
      ],
      ["meta", { property: "og:type", content: "article" }],
      ["meta", { name: "application-name", content: developerName }],
      ["meta", { name: "apple-mobile-web-app-title", content: developerName }],
      [
        "meta",
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      ],
      ["link", { rel: "shortcut icon", href: "/logo.svg" }],
      ["link", { rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
      // webfont
      ["link", { rel: "dns-prefetch", href: "https://fonts.googleapis.com" }],
      ["link", { rel: "dns-prefetch", href: "https://fonts.gstatic.com" }],
      [
        "link",
        {
          rel: "preconnect",
          crossorigin: "anonymous",
          href: "https://fonts.googleapis.com",
        },
      ],
      [
        "link",
        {
          rel: "preconnect",
          crossorigin: "anonymous",
          href: "https://fonts.gstatic.com",
        },
      ],
    ],
    transformHtml: (_, id, ctx) => {
      getSiteUrlLinks(id, ctx);
    },
    async buildEnd(siteConfig) {
      generateSiteMap(siteConfig);
    },
  })
);
